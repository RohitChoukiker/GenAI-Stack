from pydantic import BaseModel
from pydantic import field_validator
from typing import List

class StackCreate(BaseModel):
    name: str
    description: str | None = None

    @field_validator("name", mode="before")
    @classmethod
    def trim_name(cls, v: str):
        return v.strip()

    @field_validator("description", mode="before")
    @classmethod
    def trim_description(cls, v):
        if v is None:
            return None
        return v.strip()

class StackResponse(StackCreate):
    id: int

    class Config:
        from_attributes = True
        orm_mode = True
        
    

class GetStack(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True    
        orm_mode = True
        
class StackListResponse(BaseModel):
    status: str
    count: int
    data: List[GetStack]     
    
class StackDealResponse(GetStack):
    status: str
    message: str      