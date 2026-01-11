from db import Base
from sqlalchemy import Column, Integer, String, Text

class Stack(Base):
    __tablename__ = 'stacks'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False)
    description = Column(Text, nullable=True)