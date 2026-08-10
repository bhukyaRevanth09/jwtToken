
import { searchingQueryEmbedding } from "./searchEmbedding.js";
import { qdrant , COLLECTION} from "../config/qdrant.js";
import { buildContext } from "./searchContext.js";
import { response } from "express";
import { cleanContext } from "../services/symbolRemover.js";
import { askGroq } from "../aiGrok.js";

export async function searchDocuments(query, limit = 2) {
    

    const vector = await searchingQueryEmbedding(query);

    const results = await qdrant.search(COLLECTION, {
        vector,
        limit,
        with_payload: true,
        with_vector: false
    });
     const filtered = results.filter(r => r.score >= 0.40);
      
    const context = buildContext(filtered);
    const finalContext = await cleanContext(context)
 
    return {
      finalContext
    }
    
    
}



