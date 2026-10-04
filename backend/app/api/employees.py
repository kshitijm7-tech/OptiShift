from fastapi import APIRouter, HTTPException
from typing import List
from app.models.domain import Employee, EmployeeCreate
from app.services.employee_service import EmployeeService

router = APIRouter(prefix="/api/v1/employees", tags=["employees"])

@router.post("", response_model=Employee, status_code=201)
def create_employee(employee: EmployeeCreate):
    return EmployeeService.create_employee(employee)

@router.get("", response_model=List[Employee])
def get_employees():
    return EmployeeService.get_employees()

@router.get("/{employee_id}", response_model=Employee)
def get_employee(employee_id: str):
    employee = EmployeeService.get_employee(employee_id)
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee
