from sqlalchemy.orm import Session
from models.canvas_model import StackCanvas
from utils.retriever import retrieve_context
from utils.web_search import web_search
from openai import OpenAI

def run_stack_service(
    stack_id: int,
    query: str,
    db: Session
):
   
    canvas = db.query(StackCanvas).filter(
        StackCanvas.stack_id == stack_id
    ).first()

    if not canvas:
        raise Exception("Canvas not found")

    canvas_json = canvas.canvas_json
    nodes = canvas_json["nodes"]


    llm_node = next(n for n in nodes if n["type"] == "llm")
    llm_data = llm_node["data"]

    model = llm_data["model"]
    api_key = llm_data["apiKey"]
    temperature = llm_data.get("temperature", 0.7)
    prompt_template = llm_data["prompt"]

    web_search_enabled = llm_data.get("webSearchEnabled", False)
    serp_api_key = llm_data.get("serpApiKey")

    
    if web_search_enabled:
        if not serp_api_key:
            raise Exception("WebSearch enabled but SERP API key missing")

        context = web_search(
            query=query,
            serp_api_key=serp_api_key
        )
    else:
     
        context = retrieve_context(
            stack_id=stack_id,
            query=query
        )


    final_prompt = (
        prompt_template
        .replace("{context}", context)
        .replace("{query}", query)
    )

    
    client = OpenAI(api_key=api_key)

    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "user", "content": final_prompt}
        ],
        temperature=temperature
    )

    return {
        "answer": response.choices[0].message.content,
        "source": "web" if web_search_enabled else "pdf"
    }
