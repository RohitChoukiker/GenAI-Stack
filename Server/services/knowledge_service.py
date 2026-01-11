import os
import uuid
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from utils.pdf_loader import load_pdf_documents
from utils.chunk_split import split_documents

CHROMA_PATH = "./chroma_db"

def upload_pdf_service(
    stack_id: int,
    file,
    embedding_model: str,
    api_key: str
):

    file_id = str(uuid.uuid4())
    temp_path = f"/tmp/{file_id}_{file.filename}"

    with open(temp_path, "wb") as f:
        f.write(file.file.read())

  
    documents = load_pdf_documents(temp_path)

    if not documents:
        os.remove(temp_path)
        return {"status": "error", "message": "No text found in PDF"}

   
    chunks = split_documents(documents)

   
    embeddings = OpenAIEmbeddings(
        model=embedding_model,
        openai_api_key=api_key
    )


    vectordb = Chroma(
        collection_name=f"stack_{stack_id}",
        embedding_function=embeddings,
        persist_directory=CHROMA_PATH
    )


    vectordb.add_documents(chunks)
    vectordb.persist()

    os.remove(temp_path)

    return {
        "status": "success",
        "chunks": len(chunks),
        "message": "PDF knowledge uploaded successfully"
    }