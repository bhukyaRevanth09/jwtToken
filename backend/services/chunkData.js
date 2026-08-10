import { generateEmbeddings } from "./embeddingData.js";
import { insertVectors } from "./vectorDB.js";
export  function createChunks(text, options = {}) {

    const {
        maxWords = 150,
        fileName = null,
        fileType = null,
        source = null,
        page = null,
        documentId = null
    } = options;

    if (!text || typeof text !== "string") {
        return [];
    }

   
    const sections = text
        .split(/(?=\n?\d+\.\s+)/)
        .map(section => section.trim())
        .filter(Boolean);

    const chunks = [];

    let globalWordStart = 0;

    for (const section of sections) {

        const words = section.split(/\s+/);

   
        const headingMatch = section.match(/^(\d+)\.\s+([^\n]+)/);

        const sectionNumber = headingMatch
            ? Number(headingMatch[1])
            : null;

        const heading = headingMatch
            ? headingMatch[2].trim()
            : "Introduction";

        if (words.length <= maxWords) {

            chunks.push({

                chunkIndex: chunks.length,

                documentId,

                section: sectionNumber,

                heading,

                startWord: globalWordStart,

                endWord: globalWordStart + words.length,

                wordCount: words.length,

                text: section,

                metadata: {
                    fileName,
                    fileType,
                    source,
                    page
                }

            });

        } else {

            for (let i = 0; i < words.length; i += maxWords) {

                const chunkWords = words.slice(i, i + maxWords);

                chunks.push({

                    chunkIndex: chunks.length,

                    documentId,

                    section: sectionNumber,

                    heading,

                    startWord: globalWordStart + i,

                    endWord: globalWordStart + i + chunkWords.length,

                    wordCount: chunkWords.length,

                    text: chunkWords.join(" "),

                    metadata: {
                        fileName,
                        fileType,
                        source,
                        page
                    }

                });

            }

        }

        globalWordStart += words.length;
    }

   return chunks
    
}