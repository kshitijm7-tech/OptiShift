from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.comparison import router as comparison_router
from app.api.demo import router as demo_router
from app.api.employees import router as employees_router
from app.api.optimize import router as optimize_router
from app.api.schedule import router as schedule_router
from app.api.schedules import router as schedules_router

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
app.include_router(schedule_router)
app.include_router(schedules_router)
app.include_router(comparison_router)
app.include_router(demo_router)

