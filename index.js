const { Client } = require('@notionhq/client')
require('dotenv').config()

// Initialize Notion client with API key
const notion = new Client({ auth: process.env.NOTION_SECRET })

// Function to get page content
async function getPageContent(page_id) {
	const response = await notion.blocks.children.list({ block_id: page_id })

	return response.results
}

// Main function to execute
;(async () => {
	const pageId = 'a78fb4adc96c4ee3a41215fc846c4def' // Replace with your page ID
	console.log('Fetching Notion Page Content:')
	const content = await getPageContent(pageId)
	console.dir(content)
})()