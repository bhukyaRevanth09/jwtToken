import Groq from "groq-sdk";
import dotenv from "dotenv";
import { searchDocuments } from "./searchingQdrant/searchingDoc.js";

dotenv.config({quiet:true});

const groq = new Groq({
  apiKey: process.env.AIKEY,
});

let userContext 

export async function askGroq(question,context) {



 

try {
    const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content:`You are a helpful AI assistant.

Answer ONLY using the provided context.

If the answer is not present in the context, reply:

"I couldn't find that information. ask about company related question !"
`
      },
      {
        role: "user",
        content: `
Context:
${context}

Question:
${question}
`
      }
    ]
  });
 
  return response.choices[0]?.message?.content;
  
} catch (error) {
   if (error){
    return
   }
}
}

