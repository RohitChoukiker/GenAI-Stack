from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from DTO.canvas_schema import CanvasSaveRequest
from services.canvas_service import save_canvas_service , get_canvas_service

router = APIRouter(prefix="/stacks")

@router.post("/{stack_id}/canvas", tags=["Stack Canvas"])
def save_stack_canvas(
    stack_id: int,
    payload: CanvasSaveRequest,
    db: Session = Depends(get_db)
):
    return save_canvas_service(
        stack_id=stack_id,
        canvas_data=payload.dict(),
        db=db
    )
    
@router.get("/{stack_id}/canvas", tags=["Stack Canvas"])
def get_stack_canvas(stack_id: int, db: Session = Depends(get_db)):
    return get_canvas_service(stack_id=stack_id,db=db)