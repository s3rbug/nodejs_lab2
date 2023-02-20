import request from "request"
import * as cheerio from "cheerio"
import fs from "fs"
import http from "http"
import ejs from "ejs"

const URL = "https://dou.ua/lenta/"
const FOLDER_NAME = "articles"
const SERVER_PORT = 3000

type ArticleType = {
	title: string
	url: string
	html: string
	filename: string
}

let articles = [] as ArticleType[]

function parseURL(url: string) {
	console.log(`Parsing ${url}`)
	request(url, (error, _, body) => {
		if (!error) {
			const $ = cheerio.load(body)
			createArticleFolder(FOLDER_NAME)
			$(".b-lenta .title a")
				.toArray()
				.forEach(element => {
					const title = $(element).text().replace(/\n|\t/gm, "")
					const url = $(element).attr("href")
					if (!url) {
						return
					}
					parseArticleHtml(url, html => {
						const filename: string | undefined = url.split("/").at(-2)

						if (!html || !filename) {
							return
						}

						const newArticle = { title, url, html, filename }

						if (articles.every(article => article.url !== newArticle.url)) {
							articles.push(newArticle)
						} else {
							articles.map(article =>
								article.url === newArticle.url ? { ...newArticle } : article
							)
						}

						createArticleFile(FOLDER_NAME, newArticle)
					})
				})
		} else {
			console.log(error)
		}
	})
}

function parseArticleHtml(
	url: string,
	callback: (parsed: string | null | undefined) => void
): void {
	request(url, (error, _, body) => {
		if (!error) {
			const $ = cheerio.load(body)
			$("article .tg-promo").remove()
			$("article .b-post-tags").remove()
			const parsedHtml = $("article").html()
			callback(parsedHtml)
		} else {
			console.log(error)
			callback(undefined)
		}
	})
}

function createArticleFolder(folderName: string): void {
	try {
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName)
		}
	} catch (err) {
		console.error(err)
	}
}

function createArticleFile(folderName: string, article: ArticleType) {
	fs.writeFile(
		`${folderName}/${article.filename}.html`,
		article.html,
		error => {
			if (error) {
				console.log(error)
			}
		}
	)
}

function createServer(host: string, port: number) {
	const server = http.createServer((req, res) => {
		if (req.url === "/") {
			res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
			ejs.renderFile("index.ejs", { URL, articles }).then(html => {
				res.write(html)
				res.end()
			})
			return
		}
		articles.forEach(article => {
			if (req.url === `/${article.filename}`) {
				res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" })
				fs.readFile(
					`${FOLDER_NAME}/${article.filename}.html`,
					{
						encoding: "utf-8",
					},
					(error, html) => {
						if (error) {
							console.log(error)
							return
						}
						res.write(html)
						res.end()
					}
				)
			}
		})
	})
	server.listen(port, host, () => {
		console.log(`Server is running on http://${host}:${port}`)
	})
}
parseURL(URL)
setInterval(() => {
	parseURL(URL)
}, 60000)
createServer("localhost", SERVER_PORT)
