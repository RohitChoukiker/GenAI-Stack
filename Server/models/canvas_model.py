from sqlalchemy import Column, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.sql import func
from db import Base

class StackCanvas(Base):
    __tablename__ = "stack_canvas"

    id = Column(Integer, primary_key=True, index=True)

    stack_id = Column(
        Integer,
        ForeignKey("stacks.id", ondelete="CASCADE"),
        nullable=False,
        unique=True
    )

    canvas_json = Column(JSON, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True),server_default=func.now(),onupdate=func.now() )
