from utils.chroma import get_chroma

def retrieve_context(
    stack_id: int,
    query: str,
    embedding_provider: str = "local",
    api_key: str | None = None,
    k: int = 4
) -> str:
    vectordb = get_chroma(
        stack_id=stack_id,
        embedding_provider=embedding_provider,
        api_key=api_key
    )

    docs = vectordb.similarity_search(query, k=k)
    return "\n\n".join(doc.page_content for doc in docs)
