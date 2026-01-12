from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_openai import OpenAIEmbeddings

CHROMA_PATH = "./chroma_db"

def get_chroma(
    stack_id: int,
    embedding_provider: str = "local", 
    api_key: str | None = None
):
    if embedding_provider == "openai":
        embeddings = OpenAIEmbeddings(
            openai_api_key=api_key
        )
    else:
        embeddings = HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2"
        )

    return Chroma(
        collection_name=f"stack_{stack_id}",
        embedding_function=embeddings,
        persist_directory=CHROMA_PATH
    )
