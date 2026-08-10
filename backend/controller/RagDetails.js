import axios from "axios";
import { getQuestionCount } from "../utils/totalQuestion.js";

const QDRANT_URL = "http://localhost:6333";
const COLLECTION_NAME = "documents";

export const getRagStats = async (req, res) => {
  try {

    // 1. Get collection statistics
    const response = await axios.get(
      `${QDRANT_URL}/collections/${COLLECTION_NAME}`
    );

    const collection = response.data.result;

    console.log("Qdrant collection:");
    console.log(response.data);


    // 2. Get all points with payload
    const scrollResponse = await axios.post(
      `${QDRANT_URL}/collections/${COLLECTION_NAME}/points/scroll`,
      {
        limit: 10000,
        with_payload: true,
        with_vector: false
      }
    );

    const points = scrollResponse.data.result.points;


    // 3. Find unique document IDs
    const documentIds = new Set();

    for (const point of points) {

      const documentId = point.payload?.documentId;

      if (documentId) {
        documentIds.add(documentId);
      }
    }


  
    const documentCount = documentIds.size;
    const askedQuestion = await getQuestionCount()

    // 5. Send response
    return res.status(200).json({

      success: true,

      message: {

        collection: COLLECTION_NAME,

        documents: documentCount,
        
         totalQuestion :askedQuestion ,

        chunks: collection.points_count ?? 0,

        embeddings: collection.points_count ?? 0,

        indexedVectors:
          collection.indexed_vectors_count ?? 0,

        vectorSize:
          collection.config?.params?.vectors?.size ?? null,

        distance:
          collection.config?.params?.vectors?.distance ?? null,

        status: collection.status
      }
    });

  } catch (error) {

    console.error(
      "Qdrant Stats Error:",
      error.message
    );

    return res.status(500).json({

      success: false,

      message: "Failed to fetch RAG statistics from Qdrant",

      error: error.message
    });
  }
};