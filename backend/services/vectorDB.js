// services/vector.service.js

import crypto from "crypto";
import { qdrant, COLLECTION } from "../config/qdrant.js";

export async function insertVectors(chunks) {

    const points = chunks.map(chunk => ({

        id: crypto.randomUUID(),

        vector: chunk.embedding,

        payload: {

            documentId: chunk.documentId,

            chunkIndex: chunk.chunkIndex,

            section: chunk.section,

            heading: chunk.heading,

            startWord: chunk.startWord,

            endWord: chunk.endWord,

            wordCount: chunk.wordCount,

            text: chunk.text,

            ...chunk.metadata,

            indexedAt: new Date().toISOString()

        }

    }));

    await qdrant.upsert(COLLECTION, {
        wait: true,
        points
    });

    return points.length;
}