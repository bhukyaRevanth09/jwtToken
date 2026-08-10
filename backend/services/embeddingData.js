

import ollama from "ollama";

export async function generateEmbeddings(chunks) {

    const results = [];

    for (const chunk of chunks) {

        const response = await ollama.embed({
            model: "nomic-embed-text",
            input: chunk.text
        });

        results.push({
            ...chunk,
            embedding: response.embeddings[0]
        });

    }

    return results;
}