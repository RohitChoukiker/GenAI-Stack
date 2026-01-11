from pydantic import BaseModel
from typing import Any, Dict, List

class CanvasSaveRequest(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]
    viewport: Dict[str, Any]


