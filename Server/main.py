from fastapi import FastAPI
import uvicorn
from db import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from routers import stack_router
from routers import canvas_router
from routers import kb_router
from routers.run_router import router as run_router

app = FastAPI(title="GenAI-Stack API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://localhost:3000",  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "GenAI-Stack API Server is running"}

@app.on_event("startup")
async def startup_event():
    print(" Starting GenAI-Stack API Server...")

    try:
        with engine.connect() as connection:
            print("Database connected")
            Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f" Database connection failed: {e}")
        
    app.include_router(stack_router.router, prefix="/api")
    app.include_router(canvas_router.router, prefix="/api")
    app.include_router(kb_router.router, prefix="/api")
    app.include_router(run_router, prefix="/api")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8080,
        reload=False,
        workers=1,
        log_level="info"
    )
