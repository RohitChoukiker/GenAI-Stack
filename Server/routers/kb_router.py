from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from db import get_db
from services.knowledge_service import upload_pdf_service

router = APIRouter(prefix="/stacks")


@router.post("/{stack_id}/kb/upload", tags=["Knowledge Base"])
def upload_pdf_knowledge(
    stack_id: int,
    file: UploadFile = File(...),
    embedding_model: str = Form(...),
    api_key: str = Form(...)
):
    return upload_pdf_service(
        stack_id=stack_id,
        file=file,
        embedding_model=embedding_model,
        api_key=api_key
    )