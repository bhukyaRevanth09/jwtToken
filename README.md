# RAG Chatbot

## Overview

This project is a **Retrieval-Augmented Generation (RAG) Chatbot** designed to answer questions specifically about company-related information.

The chatbot does not use the vector database as a general-purpose knowledge source. The documents stored in the vector database contain **only company-related information**, such as:

* Company information
* Company policies
* Employee benefits
* Workplace rules
* Frequently asked questions
* Company procedures
* Internal documentation
* Other approved company information

The chatbot retrieves relevant information from the company knowledge base and provides that information to **Groq AI**, which generates the final response.

---

# Company Assistant

The chatbot is designed to act as a company assistant.

The frontend displays the following welcome message:

```text
Hi!

I'm the company assistant.

I'm here to help with company-related questions,
policies, benefits, and other workplace information.
```

This message is part of the **chatbot user interface**.

It is not used as the company's knowledge base unless it is explicitly stored as a document in Qdrant.

---

# Knowledge Base

The most important rule of this RAG system is:

> **Only company-related documents are stored in the vector database.**

For example:

```text
Company Documents
       │
       ├── Company Information
       │
       ├── Company Policies
       │
       ├── Employee Benefits
       │
       ├── HR Guidelines
       │
       ├── Workplace Rules
       │
       ├── FAQs
       │
       └── Company Documentation
```

These documents are processed and stored as vector embeddings in Qdrant.

The chatbot uses these documents when answering user questions.

---

# RAG Pipeline

```text
                         RAG CHATBOT
                              │
                              ├── Upload / Collect
                              │
                              ├── Parse
                              │
                              ├── Clean
                              │
                              ├── Chunk
                              │
                              ├── Embed
                              │
                              ├── Store in Qdrant
                              │
                              ├── Retrieve
                              │
                              ├── Generate Answer using Groq AI
                              │
                              └── Return Response
```

---

# 1. Upload / Collect Company Documents

The first step is collecting company-related documents.

Example:

```text
company.md
company-policies.md
employee-benefits.md
hr-faq.md
leave-policy.pdf
company-rules.pdf
```

Only approved company information should be added to the knowledge base.

For example:

```text
Company Leave Policy

Employees are eligible for 20 paid leave days per year.

Leave requests must be submitted through the employee portal.
```

This information will eventually be stored in Qdrant.

---

# 2. Parse

Documents can have different formats.

The parsing stage extracts readable text from those files.

```text
PDF
 ↓
PDF Parser
 ↓
Text
```

```text
Markdown
 ↓
Markdown/Text Parser
 ↓
Text
```

The goal is to convert the documents into text that can be processed by the RAG pipeline.

---

# 3. Clean

Extracted documents may contain unnecessary formatting, spaces, headers, or other noise.

The cleaning stage prepares the text for processing.

Example:

```text
Before:

Company Policy



Page 1



Employees are eligible for 20 days leave.



Company Confidential
```

After cleaning:

```text
Company Policy

Employees are eligible for 20 days leave.
```

Cleaning improves the quality of the chunks and embeddings.

---

# 4. Chunk

Large documents are divided into smaller pieces called **chunks**.

For example:

```text
Company Leave Policy

Employees are eligible for 20 paid leave days per year.

Leave requests must be submitted through the employee portal.

Emergency leave must be reported to the manager.
```

Can become:

```text
Chunk 1

Company Leave Policy

Employees are eligible for 20 paid leave days per year.
```

```text
Chunk 2

Leave requests must be submitted through the employee portal.

Emergency leave must be reported to the manager.
```

Each chunk is processed separately.

Chunk metadata can contain information such as:

```json
{
  "documentId": "company-leave-policy",
  "fileName": "leave-policy.pdf",
  "fileType": "pdf",
  "page": 2,
  "chunkIndex": 1
}
```

---

# 5. Embed

Each chunk is converted into a numerical vector using an embedding model.

For example:

```text
Company employees are eligible for 20 paid leave days.
```

becomes something similar to:

```text
[0.12, -0.45, 0.78, 0.21, ...]
```

The vector represents the semantic meaning of the text.

The same embedding model should be used when converting:

```text
Company document chunks
```

and

```text
User questions
```

into vectors.

---

# 6. Store in Qdrant

The generated embeddings are stored in **Qdrant**.

Qdrant stores:

```text
Vector
+
Payload / Metadata
```

Example:

```json
{
  "id": 1,
  "vector": [0.12, -0.45, 0.78, 0.21],
  "payload": {
    "text": "Employees are eligible for 20 paid leave days per year.",
    "documentId": "company-leave-policy",
    "fileName": "leave-policy.pdf",
    "fileType": "pdf",
    "page": 2,
    "chunkIndex": 1
  }
}
```

Therefore, Qdrant contains the company's searchable knowledge.

---

# 7. Retrieve

When a user asks a question, the question is converted into an embedding.

Example:

```text
User:

How many paid leaves do employees get?
```

The question becomes a vector:

```text
Question
   ↓
Embedding Model
   ↓
Question Vector
```

The question vector is then searched against the company-related vectors stored in Qdrant.

For example:

```text
Leave Policy              → 0.96
Employee Benefits         → 0.82
Company Information       → 0.41
IT Policy                 → 0.15
```

The most relevant chunks are retrieved.

```text
Retrieved Context:

Employees are eligible for 20 paid leave days per year.
```

---

# 8. Generate Answer Using Groq AI

The retrieved company information is provided to Groq AI along with the user's question.

Conceptually:

```text
Context:

Employees are eligible for 20 paid leave days per year.

Question:

How many paid leaves do employees get?
```

Groq AI generates the final response:

```text
Employees are eligible for 20 paid leave days per year.
```

The LLM is instructed to answer using the retrieved company context.

If the requested information is not available in the company knowledge base, the chatbot should not invent an answer.

For example:

```text
User:

What is the weather today?
```

The chatbot can respond:

```text
I couldn't find that information. Ask about company-related questions!
```

This keeps the chatbot focused on its intended purpose.

---

# 9. Return Response

The generated response is returned from the backend to the React frontend.

The complete question-answering flow is:

```text
User
 │
 │ Company Question
 ▼
React Chatbot
 │
 ▼
Backend API
 │
 ▼
Create Question Embedding
 │
 ▼
Qdrant
 │
 │ Search company knowledge
 ▼
Relevant Company Chunks
 │
 ▼
Groq AI
 │
 │ Generate answer
 ▼
Backend
 │
 ▼
React Chatbot
 │
 ▼
User
```

---

# Knowledge Restriction

This chatbot is intentionally restricted to the company's knowledge base.

```text
                 USER QUESTION
                       │
                       ▼
                Question Embedding
                       │
                       ▼
                    QDRANT
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
       Relevant Company    No Relevant
          Information       Information
              │                 │
              ▼                 ▼
           Groq AI        "Information not
              │            found in company
              │             knowledge base"
              ▼
        Final Response
```

The chatbot should therefore be used for questions such as:

```text
What are the company working hours?

What is the leave policy?

What employee benefits are available?

How can I apply for leave?

What is the company refund policy?

Who should I contact for HR-related issues?
```

It should not be treated as a general-purpose chatbot for unrelated questions.

---

# Complete Architecture

```text
                  COMPANY DOCUMENTS
                         │
                         ▼
                Upload / Collect
                         │
                         ▼
                       Parse
                         │
                         ▼
                       Clean
                         │
                         ▼
                      Chunk
                         │
                         ▼
                     Embedding
                         │
                         ▼
                    ┌─────────┐
                    │ QDRANT  │
                    │         │
                    │ Company │
                    │  Data   │
                    └────┬────┘
                         │
                         │
              ┌──────────▼──────────┐
              │                     │
              │    USER QUESTION    │
              │                     │
              └──────────┬──────────┘
                         │
                         ▼
                  Create Embedding
                         │
                         ▼
                 Search Qdrant
                         │
                         ▼
              Relevant Company Chunks
                         │
                         ▼
                  ┌────────────┐
                  │  GROQ AI   │
                  │    LLM     │
                  └─────┬──────┘
                        │
                        ▼
                  Final Response
                        │
                        ▼
                   React Chatbot
                        │
                        ▼
                       User
```

---

# Technologies Used

| Component           | Technology               |
| ------------------- | ------------------------ |
| Frontend            | React.js                 |
| Backend             | Node.js + Express.js     |
| Embedding           | Ollama / Embedding Model |
| Vector Database     | Qdrant                   |
| LLM                 | Groq AI                  |
| API                 | REST API                 |
| Document Processing | File Parsers             |
| Metadata            | Qdrant Payload           |

---

# Important Distinction

There are two different types of information in the application.

### 1. UI Information

The chatbot displays:

```text
Hi!

I'm the company assistant.

I'm here to help with company-related questions,
policies, benefits, and other workplace information.
```

This is a **frontend welcome message**.

### 2. Knowledge Base Information

Qdrant contains:

```text
Company Documents
       ↓
Parsed Text
       ↓
Cleaned Text
       ↓
Chunks
       ↓
Embeddings
       ↓
Qdrant
```

This is the information actually used to answer questions.

Therefore:

> **The welcome message introduces the assistant, while Qdrant contains the actual company knowledge used for answering questions.**

---

# Final RAG Flow

```text
COMPANY DOCUMENTS
       │
       ▼
     PARSE
       │
       ▼
     CLEAN
       │
       ▼
     CHUNK
       │
       ▼
     EMBED
       │
       ▼
    QDRANT
       │
       │
       │
USER QUESTION
       │
       ▼
QUESTION EMBEDDING
       │
       ▼
SEARCH QDRANT
       │
       ▼
RELEVANT COMPANY CONTEXT
       │
       ▼
    GROQ AI
       │
       ▼
GENERATED ANSWER
       │
       ▼
     USER
```

## Core Principle

> **This RAG chatbot uses Qdrant as a company-specific knowledge base. It retrieves relevant company information from stored document chunks and provides that context to Groq AI to generate an answer. If the required information is not available in the company knowledge base, the chatbot should not make up an answer.**
