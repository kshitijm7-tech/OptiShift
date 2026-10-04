from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.employees import router as employees_router
from app.api.optimize import router as optimize_router

app = FastAPI(title="OptiShift API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(employees_router)
app.include_router(optimize_router)

