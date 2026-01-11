from fastapi import APIRouter , Depends
from DTO.stack_schema import StackCreate, StackListResponse
from sqlalchemy.orm import Session
from db import get_db
from services.stack_service import create_stack_service, get_all_stacks_service, get_stack_by_id

router = APIRouter(prefix="/stacks")

@router.post("/create-stack", tags=["Stacks"])
async def create_stack(
    payload: StackCreate,
    db: Session = Depends(get_db)
):
    stack = create_stack_service(db, payload)

    return {
        "status": "success",
        "data": {
            "id": stack.id,
            "name": stack.name,
            "description": stack.description
        },
        "message": "Stack created successfully"
    }

@router.get("/get-all-stacks",response_model=StackListResponse,tags=["Stacks"])
def get_all_stacks(db: Session = Depends(get_db)):
    return get_all_stacks_service(db)

@router.get("/{id}", tags=["Stacks"])
def get_stack(id:int, db: Session = Depends(get_db)):
     return get_stack_by_id(id, db)
       