from fastapi import FastAPI
import uvicorn
import os

app = FastAPI()

@app.get("/")
async def read_root():
    return {"message": "GenAI-Stack API Server is running"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",         
        host="127.0.0.1",
        port=8080,
        reload=False,       
        workers=1,         
        log_level="info"
    )
