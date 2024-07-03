const puppeteer = require('puppeteer')
const { Client } = require('@notionhq/client')
// const { notion2md_node } = require('notion2md-node')

require('dotenv').config()

// const n2g = new notion2md_node()

// Initialize Notion client with API key
// const notion = new Client({ auth: process.env.NOTION_SECRET })

// Function to get page content
// async function getPageContent(page_id) {
// 	const response = await notion.blocks.children.list({ block_id: page_id })

// 	return response.results
// }

// // Main function to execute
// ;(async () => {
// 	const pageId = '4aea76a6ad524983ad4d8c03dad284aa' // Replace with your page ID
// 	console.log('Fetching Notion Page Content:')
// 	const content = await getPageContent(pageId)

// 	console.log('::----------start----------::')

// 	content.forEach(block => {
// 		console.log('\n------------\n', block.type)
// 		console.dir(block)

// 		const md = n2g.get(block)

// 		console.log('markdown: ', md)
// 	})
// })()


;(async () => {
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// 노션 로그인 페이지로 이동
await page.goto('https://www.notion.so/login');

// 로그인 정보 입력 및 로그인
await page.type('input[name=email]', 'yoo.hwanyong@gmail.com');
await page.type('input[name=password]', 'Stj*thAt0m0s');
await page.click('button[type=submit]');

// 로그인 완료 후 페이지 이동을 기다림
await page.waitForNavigation();

// https://www.notion.so/uhd-kr/Test-case-4aea76a6ad524983ad4d8c03dad284aa
const pageId = '4aea76a6ad524983ad4d8c03dad284aa'
// 익스포트할 노션 페이지로 이동
await page.goto(`https://www.notion.so/${pageId}`); // https://www.notion.so/4aea76a6ad524983ad4d8c03dad284aa

// Export 버튼을 클릭하여 익스포트 메뉴 열기
await page.waitForSelector('div[aria-label="Export"]');
await page.click('div[aria-label="Export"]');

// 마크다운 형식 선택
await page.waitForSelector('button[data-action="Export markdown"]');
await page.click('button[data-action="Export markdown"]');

// 다운로드를 완료할 때까지 기다림 (필요에 따라 적절한 대기 시간 조정)
await page.waitForTimeout(5000);

// 브라우저 닫기
await browser.close();
})()