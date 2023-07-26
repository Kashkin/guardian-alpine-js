#!/usr/bin/env node
"use strict"

import svgstore from "svgstore"
import { readFileSync, writeFileSync } from "fs"
import { globSync } from "glob"
import { resolve, relative } from "path"
import { optimize } from "svgo"

// const svgSprite = (cb) => {
const sprite = svgstore()
const files = globSync(`src/icons/**/*.svg`)

const svgoConfig = {
	plugins: [
		{
			name: "preset-default",
			params: {
				overrides: {
					convertColors: {
						currentColor: true,
					},
					removeViewBox: false,
				},
			},
			removeDimensions: true,
		},
	],
}

const optimizerTasks = []
for (let file of files) {
	let result = optimize(readFileSync(resolve(file)), svgoConfig)
	optimizerTasks.push([result, file])
}

Promise.all(optimizerTasks).then((optimisedTaskResults) => {
	optimisedTaskResults.forEach(([optimised, file]) => {
		sprite.add(
			relative("src/icons", file).replace(/.svg$/i, ""),
			optimised.data
		)
	})
	writeFileSync(resolve(`src/sprite.svg`), sprite.toString())
})
