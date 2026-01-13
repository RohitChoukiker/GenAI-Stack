# GenAI Stack API – Code Documentation

A full-stack GenAI application that allows users to visually create AI workflows using nodes, upload documents, and interact with them using a RAG (Retrieval-Augmented Generation) based chat system.

---

## 1. Frontend Overview

The frontend is responsible for providing a visual interface where users can create, configure, and run AI stacks and workflows. It communicates with backend APIs to store data, execute workflows, and fetch results.

### Frontend Tech Stack
- Framework: React  
- Styling: Tailwind CSS  
- State Management: Context API  
- Flow Builder: React Flow  
- Icons: lucide-react  

---

### Key UI Components

#### LLMNode
- Renders UI for configuring LLM models  
- Handles API key input and visibility toggle  
- Exposes input/output handles for flow connections  

#### Canvas
- Main workflow builder using React Flow  
- Manages nodes and edges  
- Syncs canvas state with backend  

---

### Frontend Setup & Installation

```bash
git clone https://github.com/RohitChoukiker/GenAI-Stack.git
cd Client
npm install
npm run dev
```


## Backend Overview

The backend provides APIs to manage AI stacks, canvases, and knowledge bases.  
It is built using **FastAPI** and follows a **controller–service architecture** to ensure clean separation of concerns and scalability.

---

### Backend Responsibilities
- Handle API requests from the frontend  
- Manage stack and canvas creation  
- Process knowledge base document uploads  
- Generate embeddings and store them in a vector database  
- Execute RAG-based workflows  
- Communicate with the LLM provider and return responses  

---

### Backend Tech Stack
- Language: Python  
- Framework: FastAPI  
- Server: Uvicorn  
- Database: SQLAlchemy + PostgreSQL  
- Vector Database: ChromaDB  
- LLM: OpenAI  
- Embedding Model: Sentence-Transformers (all-MiniLM-L6-v2)  

---

### Backend Setup & Installation

```bash
git clone https://github.com/RohitChoukiker/GenAI-Stack.git
cd Server
pip install -r requirements.txt
uvicorn main:app --reload
```
