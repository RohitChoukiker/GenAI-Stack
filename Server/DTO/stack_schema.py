from pydantic import BaseModel

class StackCreate(BaseModel):
    name: str
    description: str | None = None

class StackResponse(StackCreate):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True