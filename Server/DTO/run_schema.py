from pydantic import BaseModel

class RunStackRequest(BaseModel):
    query: str
