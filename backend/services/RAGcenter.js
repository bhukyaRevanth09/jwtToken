import { insertVectors } from "./vectorDB";
import { generateEmbeddings } from "./embeddingData";

export async function  ragDataHandling(chunks) {
    const embeddingchunks = await generateEmbeddings(chunks)
    insertVectors(embeddingchunks)
}