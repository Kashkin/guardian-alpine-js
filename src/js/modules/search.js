// Limit imports to those in use
import Alpine from "alpinejs"
// import collapse from "@alpinejs/collapse"
import focus from "@alpinejs/focus"
// import intersect from "@alpinejs/intersect"
import persist from "@alpinejs/persist"
import mask from "@alpinejs/mask"
// Alpine.plugin(collapse)
Alpine.plugin(focus)
// Alpine.plugin(intersect)
Alpine.plugin(persist)
Alpine.plugin(mask)

// Can't search pillars, so I loosely mapped sections to pillars.
// Chat GPT tried to help, but was worse at it than I was.
import pillarsToSections from "../data/pillarsToSections"

// This has to be a store so that it can be referenced from search results
// and from pinned articles.
Alpine.store("pinnedArticles", {
	articles: Alpine.$persist([]),

	isPinned(article) {
		return this.articles.some((o) => o.id === article.id)
	},

	toggle(article) {
		if (this.isPinned(article)) {
			this.articles = this.articles.filter((o) => o.id !== article.id)
		} else {
			this.articles.push(article)
		}
	},
})

// This doesn't need to be a store. I abstracted it trying to fix something,
// and it was easier to leave it this way. ¯\_(ツ)_/¯
Alpine.store("search", {
	results: Alpine.$persist(null).as("searchResults"),
	update(results) {
		this.results = results
	},
})

const searchData = function () {
	return {
		apiKey: this.$persist(import.meta.env.VITE_GUARDIAN_API_KEY ?? null),
		apiKeyError: null,
		paramKeywords: this.$persist(""),
		paramSection: this.$persist(null),
		paramSort: this.$persist("relevance"),
		paramPage: this.$persist(1),
		loading: false,
		async retrieveResults() {
			// If viewing purely by section, let's get the latest
			if (this.paramKeywords.length === 0) {
				this.paramSort = "newest"
			}
			this.loading = true
			let json
			try {
				// Double await should catch errors
				const response = await fetch(this._queryGuardian())
				json = await response.json()
			} catch (error) {
				if (error instanceof SyntaxError) {
					// Unexpected token in JSON
					alert(`There was an SyntaxError: ${error.message}`)
				} else {
					alert(`There was an error: ${error.message}`)
				}
			}
			if (json) {
				if (import.meta.env.DEV) {
					console.log(json)
				}
				this.$store.search.update(json.response)
				this.loading = false
				this.$refs.input.scrollIntoView()
			} else {
				this.loading = false
			}
		},
		// Check the provided key length
		confirmApiKey() {
			const providedKey = this.$refs.apiKeyInput.value
			if (providedKey.length == 31) {
				this.apiKey = providedKey
				this.apiKeyError = null
			} else {
				this.apiKeyError = "Please enter a 31 digit key"
			}
		},
		// Returns API query URL
		_queryGuardian() {
			const url = new URL("https://content.guardianapis.com/search")
			let params = {
				"api-key": this.apiKey,
				q: this.paramKeywords,
				page: this.paramPage,
				section: this.paramSection
					? pillarsToSections[this.paramSection].join("|")
					: null,
				"page-size": 10,
				"order-by": this.paramSort,
				"show-fields":
					"thumbnail,wordcount,byline,trailText,liveBloggingNow,isLive,lastModified",
			}
			return this._addSearchParams(url, params)
		},
		// Helper for appending new params to existing params
		// Also removes params with empty values
		_addSearchParams(url, params = {}) {
			let validParams = Object.keys(params)
				.filter((k) => params[k] != null)
				.reduce((a, k) => ({ ...a, [k]: params[k] }), {})
			console.log(validParams)
			return new URL(
				`${url.origin}${url.pathname}?${new URLSearchParams([
					...Array.from(url.searchParams.entries()),
					...Object.entries(validParams),
				])}`
			)
		},
	}
}

Alpine.data("search", searchData)

window.Alpine = Alpine

window.Alpine.start()
