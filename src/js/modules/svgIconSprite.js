import svgSprite from "../../sprite.svg?raw"

const parser = new DOMParser()
const spriteDoc = parser.parseFromString(svgSprite, "text/html")
const spriteEl = spriteDoc.body.childNodes[0]
spriteEl.setAttribute("style", "display: none;")
spriteEl.setAttribute("aria-hidden", true)
document.querySelector("body").prepend(spriteEl)
