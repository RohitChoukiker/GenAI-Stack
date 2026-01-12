from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db import get_db
from DTO.run_schema import RunStackRequest
from services.run_service import run_stack_service

router = APIRouter(prefix="/stacks")

@router.post("/{stack_id}/run", tags=["Run Stack"])
def run_stack(
    stack_id: int,
    payload: RunStackRequest,
    db: Session = Depends(get_db)
):
    return run_stack_service(
        stack_id=stack_id,
        query=payload.query,
        db=db
    )
