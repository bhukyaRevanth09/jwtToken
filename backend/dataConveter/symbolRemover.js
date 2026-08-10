import fs from 'fs'
import path from 'path'
import crypto from "crypto";


import {mdCleaner} from './mdDataCleaning.js'
import { pdfCleaner } from './pdfDataCleaning.js';
import { createChunks } from '../services/chunkData.js';

import { generateEmbeddings } from '../services/embeddingData.js';
import { insertVectors } from '../services/vectorDB.js';

const file= '../rawData/dresscode_policy.md'

const documentId = crypto.randomUUID();

const ext = path.extname(file).toLowerCase();

const dataText = fs.readFileSync(file,'utf-8')


const cleaners = {
  ".pdf": pdfCleaner,
  ".md": mdCleaner,

};

const cleaner = cleaners[ext] || commonCleaner;
const text = cleaner(dataText);

const metadata = {
    fileName: path.basename(file),
    fileType: path.extname(file),
    source: file,
    page:1,
    documentId
};
export async function ragCenter(text, metadata) {

    const chunks = createChunks(text, metadata);

    const embeddedChunks = await generateEmbeddings(chunks);

    const inserted = await insertVectors(embeddedChunks);

    return {
        documentId: chunks[0]?.documentId,
        totalChunks: chunks.length,
        insertedVectors: inserted
    };
}

ragCenter(text,metadata)
.then(data=>console.log(data))
.catch(error =>console.log(error))