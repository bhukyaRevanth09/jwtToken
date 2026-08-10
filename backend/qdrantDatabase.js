import { qdrant, COLLECTION } from "./config/qdrant.js";

await qdrant.createCollection(COLLECTION, {
    vectors: {
        size: 768,
        distance: "Cosine"
    }
});