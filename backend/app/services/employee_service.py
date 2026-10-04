from typing import List, Dict
import uuid
from app.models.domain import Employee, EmployeeCreate

# Simple in-memory storage for P02
EMPLOYEES_DB: Dict[str, Employee] = {}

class EmployeeService:
    @staticmethod
    def create_employee(employee_in: EmployeeCreate) -> Employee:
        new_id = str(uuid.uuid4())
        employee = Employee(id=new_id, **employee_in.model_dump())
        EMPLOYEES_DB[new_id] = employee
        return employee

    @staticmethod
    def get_employees() -> List[Employee]:
        return list(EMPLOYEES_DB.values())

    @staticmethod
    def get_employee(employee_id: str) -> Employee | None:
        return EMPLOYEES_DB.get(employee_id)
