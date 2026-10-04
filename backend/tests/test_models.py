from app.models.domain import EmployeeCreate, Availability, ShiftBase, StaffingRequirementBase, TimeOffBase, ScheduleAssignmentBase
from datetime import time, date
import pytest
from pydantic import ValidationError

def test_employee_creation_valid():
    emp = EmployeeCreate(
        name="Alice",
        role="Barista",
        hourly_pay=15.0,
        max_weekly_hours=40.0,
        availability=[Availability(day_of_week=0, start_time=time(9,0), end_time=time(17,0))]
    )
    assert emp.name == "Alice"
    assert emp.hourly_pay == 15.0

def test_employee_creation_invalid_pay():
    with pytest.raises(ValidationError):
        EmployeeCreate(
            name="Bob",
            role="Barista",
            hourly_pay=-5.0,
            max_weekly_hours=40.0
        )

def test_shift_valid():
    shift = ShiftBase(
        name="Morning Shift",
        shift_date=date(2023, 10, 1),
        start_time=time(8, 0),
        end_time=time(16, 0),
        required_role="Barista"
    )
    assert shift.name == "Morning Shift"

def test_staffing_requirement_valid():
    req = StaffingRequirementBase(
        shift_id="shift1",
        min_employees=2
    )
    assert req.min_employees == 2

def test_time_off_valid():
    to = TimeOffBase(
        employee_id="emp1",
        start_date=date(2023, 11, 1),
        end_date=date(2023, 11, 5)
    )
    assert to.status == "pending"

def test_schedule_assignment_valid():
    assign = ScheduleAssignmentBase(
        employee_id="emp1",
        shift_id="shift1",
        assigned_date=date(2023, 10, 1)
    )
    assert assign.employee_id == "emp1"
