import { defineConfig } from "vite"
import copy from "rollup-plugin-copy"

export default defineConfig(() => ({
	build: {
		emptyOutDir: true,
		outDir: "./public/",
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name.split(".").pop()
					if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
						extType = "images"
					}
					return `assets/${extType}/[name]-[hash][extname]`
				},
				entryFileNames: "assets/js/[name]-[hash].js",
			},
			plugins: [
				copy({
					targets: [
						{
							src: "src/static/*",
							dest: "public/assets",
						},
					],
					flatten: true,
					hook: "writeBundle",
				}),
			],
		},
	},
	server: {
		host: true,
		port: 3007,
	},
}))
