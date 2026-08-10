import ollama from "ollama";


export async function searchingQueryEmbedding(query) {
    const response = await ollama.embed({
        model:'nomic-embed-text',
        input:query
    })
    
    return response.embeddings[0]
}

