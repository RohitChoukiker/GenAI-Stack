from fastapi import APIRouter , Depends
from DTO.stack_schema import StackCreate
from sqlalchemy.orm import Session
from db import get_db
from models.stack_model import Stack


router = APIRouter(prefix="/stacks")

@router.post("/create-stack", tags=["Stacks"])
async def create_stack(payload: StackCreate, db:Session=Depends(get_db)): 
    stack = Stack(
        name=payload.name,
        description=payload.description
    )
    db.add(stack)
    db.commit()
    db.refresh(stack)
    return {
        "status": "success",
        "data": {
            "id": stack.id,
            "name": stack.name,
            "description": stack.description
        },
        "message": "Stack created successfully"
    }

