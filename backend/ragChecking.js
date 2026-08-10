import ollama from "ollama";
import crypto from "crypto";
import { qdrant, COLLECTION } from "../config/qdrant.js";

export async function handlingChunks(chunks) {

    if (!Array.isArray(chunks) || chunks.length === 0) {
        return 0;
    }

    const BATCH_SIZE = 20;

    let totalInserted = 0;

    for (let start = 0; start < chunks.length; start += BATCH_SIZE) {

        const batch = chunks.slice(start, start + BATCH_SIZE);

        const embeddings = await Promise.all(

            batch.map(async (chunk) => {

                try {

                    const result = await ollama.embed({
                        model: "nomic-embed-text",
                        input: chunk.text
                    });

                    return {
                        success: true,
                        embedding: result.embeddings[0]
                    };

                } catch (err) {

                    console.error(
                        `Embedding failed for chunk ${chunk.chunkIndex}`,
                        err.message
                    );

                    return {
                        success: false
                    };
                }

            })

        );

        const points = [];

        for (let i = 0; i < batch.length; i++) {

            if (!embeddings[i].success) continue;

            const chunk = batch[i];

            points.push({

                id: crypto.randomUUID(),

                vector: embeddings[i].embedding,

                payload: {

                    documentId: chunk.documentId,

                    chunkIndex: chunk.chunkIndex,

                    section: chunk.section,

                    heading: chunk.heading,

                    startWord: chunk.startWord,

                    endWord: chunk.endWord,

                    wordCount: chunk.wordCount,

                    text: chunk.text,

                    fileName: chunk.metadata.fileName,

                    fileType: chunk.metadata.fileType,

                    source: chunk.metadata.source,

                    page: chunk.metadata.page,

                    indexedAt: new Date().toISOString()

                }

            });

        }

        if (points.length) {

            await qdrant.upsert(COLLECTION, {
                wait: true,
                points
            });

            totalInserted += points.length;
        }

    }

    return totalInserted;
}