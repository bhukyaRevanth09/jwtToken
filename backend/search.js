import fs from "fs";
import ollama from "ollama";

const vectors = JSON.parse(
  fs.readFileSync("./knowledgeData/vectors.json", "utf8")
);

function cosineSimilarity(a, b) {
    
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  return dotProduct / (magnitudeA * magnitudeB);
}

export async function retrieve(question) {

  const response = await ollama.embed({
    model: "nomic-embed-text",
    input: question
  });

  const questionEmbedding = response.embeddings[0];

  const results = [];

  for (const item of vectors) {

    const score = cosineSimilarity(
      questionEmbedding,
      item.embedding
    );

    results.push({
      text: item.text,
      score
    });

  }

  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 3);
}