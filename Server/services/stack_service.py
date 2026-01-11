from sqlalchemy.orm import Session
from models.stack_model import Stack
from DTO.stack_schema import StackCreate
from fastapi import HTTPException, status




def create_stack_service(db: Session, payload: StackCreate) -> Stack:
    
    already_exists = db.query(Stack).filter(Stack.name == payload.name).first()
    if already_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Stack with this name already exists."
        )
    
    
    stack = Stack(
        name=payload.name,
        description=payload.description
    )
    

    db.add(stack)
    db.commit()
    db.refresh(stack)

    return stack


def get_all_stacks_service(db: Session):
    stacks = db.query(Stack).order_by(Stack.id.desc()).all()

    return {
        "status": "success",
        "count": len(stacks),
        "data": stacks
    }
 

def get_stack_by_id(id: int, db: Session):
    stack = db.query(Stack).filter(Stack.id == id).first()

    if not stack:
        raise HTTPException(
            status_code=404,
            detail="Stack not found"
        )

    return {
        "status": "success",
        "data": stack
    } 