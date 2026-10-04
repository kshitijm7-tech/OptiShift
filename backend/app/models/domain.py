from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date, time, datetime

class Business(BaseModel):
    id: str
    name: str
    location: str

class Availability(BaseModel):
    day_of_week: int = Field(ge=0, le=6, description="0=Monday, 6=Sunday")
    start_time: time
    end_time: time

class EmployeeBase(BaseModel):
    name: str
    role: str
    skills: List[str] = []
    hourly_pay: float = Field(ge=0)
    max_weekly_hours: float = Field(ge=0)
    availability: List[Availability] = []
    status: str = "active"

class EmployeeCreate(EmployeeBase):
    pass

class Employee(EmployeeBase):
    id: str

class ShiftBase(BaseModel):
    name: str
    shift_date: date
    start_time: time
    end_time: time
    required_role: Optional[str] = None

class Shift(ShiftBase):
    id: str

class StaffingRequirementBase(BaseModel):
    shift_id: str
    min_employees: int = Field(ge=0)
    required_skills: List[str] = []

class StaffingRequirement(StaffingRequirementBase):
    id: str

class TimeOffBase(BaseModel):
    employee_id: str
    start_date: date
    end_date: date
    status: str = "pending"
    reason: Optional[str] = None

class TimeOff(TimeOffBase):
    id: str

class ScheduleAssignmentBase(BaseModel):
    employee_id: str
    shift_id: str
    assigned_date: date

class ScheduleAssignment(ScheduleAssignmentBase):
    id: str
