import express from 'express';
import * as url from 'url';
import path from 'path';
import { scrapeData } from './scrapeData.js';
import { fillTemplate } from './fillTemplate.js';
import { zipFiles } from './zipFiles.js'


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello to scrappy-script API")
})

app.get('/download', (req, res) => {
    try {
        req.header('Content-Type', 'application/zip')
        const docPath = path.join(__dirname, 'mydocuments.zip')
        res.download(docPath)
    } catch (error) {
        console.log(error)
        res.status(500).end()
    }
})

app.post('/generateFiles', async (req, res) => {
    try {
        const url  = req.body.params.url
        const selectedDocuments = req.body.params.selectedDocuments
        const context =  await scrapeData(url)

        fillTemplate(context, selectedDocuments).then(zipFiles(selectedDocuments))
        res.status(200).send("Documents generated")  
    } catch (error) {
        res.status(500).end()
    }
})

app.listen(PORT, () => { console.log('Listening on ' + PORT)})


    
    
    