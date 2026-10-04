# Demo dataset (P06) — the UrbanBrew Café sample business.
#
# Backend-owned, deterministic scenario used by Demo Mode. Entering Demo
# Mode never touches the user's team (EMPLOYEES_DB) or the user's current
# schedule (ScheduleService): the dataset is served read-only and solved
# inside the demo workspace only.
#
# Determinism: the people, skills, pay, hours, shift times and staffing
# needs are fixed constants. The scheduling horizon is the current calendar
# week (Mon–Sun containing today) so the demo always looks current; dates
# are derived, everything else is stable.
#
# The scenario is designed so a reasonable manual (roster-order) schedule
# and the P03 optimum differ for real reasons: pay rates differ between
# equally-qualified people, and scarce availability must be protected. The
# optimizer is NOT tuned for this dataset in any way.

from datetime import date, time, timedelta
from typing import List

from pydantic import BaseModel

from app.models.domain import (
    Availability,
    Business,
    Employee,
    Shift,
    StaffingRequirement,
)

DEMO_BUSINESS_ID = "urbanbrew-mumbai"
DEMO_BUSINESS_NAME = "UrbanBrew Café"
DEMO_BUSINESS_LOCATION = "Mumbai"
DEMO_CURRENCY = "INR"
DEMO_CURRENCY_SYMBOL = "₹"
DEMO_HORIZON_DAYS = 7

DEMO_DESCRIPTION = (
    "UrbanBrew Café is a Mumbai speciality coffee shop. Every day needs two "
    "people on the espresso machine for the morning and evening rushes, and "
    "two on the counter through the afternoon. Weekend rushes and weekday "
    "colleges mean availability varies across the team, and pay rates range "
    "from trainee to head barista. One team member (Nisha) is on study leave "
    "and must not be scheduled."
)

# Shift windows repeat every day of the week.
DEMO_SHIFT_WINDOWS = [
    ("morning", "Morning", time(8, 0), time(12, 0), 2, ["coffee"]),
    ("afternoon", "Afternoon", time(12, 0), time(16, 0), 2, []),
    ("evening", "Evening", time(16, 0), time(20, 0), 2, ["coffee"]),
]

_AVAIL_TIMES = (time(8, 0), time(20, 0))


def _avail(days: List[int]) -> List[Availability]:
    return [
        Availability(day_of_week=d, start_time=_AVAIL_TIMES[0], end_time=_AVAIL_TIMES[1])
        for d in days
    ]


ALL_DAYS = [0, 1, 2, 3, 4, 5, 6]  # Monday=0 .. Sunday=6


def _demo_employees() -> List[Employee]:
    """Fixed roster. Ids and attributes never change between runs."""
    return [
        Employee(
            id="aarav", name="Aarav Sharma", role="Barista",
            skills=["coffee", "cashier"], hourly_pay=140.0,
            max_weekly_hours=24.0, availability=_avail(ALL_DAYS),
            status="active",
        ),
        Employee(
            id="diya", name="Diya Patel", role="Barista",
            skills=["coffee"], hourly_pay=120.0,
            max_weekly_hours=30.0, availability=_avail([1, 2, 3, 4, 5, 6]),
            status="active",
        ),
        Employee(
            id="ishaan", name="Ishaan Rao", role="Cook",
            skills=["kitchen"], hourly_pay=105.0,
            max_weekly_hours=25.0, availability=_avail([2, 3, 4, 5, 6]),
            status="active",
        ),
        Employee(
            id="kabir", name="Kabir Mehta", role="Barista",
            skills=["coffee", "kitchen"], hourly_pay=130.0,
            max_weekly_hours=30.0, availability=_avail(ALL_DAYS),
            status="active",
        ),
        Employee(
            id="meera", name="Meera Iyer", role="Head Barista",
            skills=["coffee", "cashier"], hourly_pay=190.0,
            max_weekly_hours=40.0, availability=_avail(ALL_DAYS),
            status="active",
        ),
        Employee(
            id="nisha", name="Nisha Nair", role="Barista",
            skills=["coffee", "cashier"], hourly_pay=130.0,
            max_weekly_hours=30.0, availability=_avail(ALL_DAYS),
            # On study leave: inactive, must never be scheduled (H6).
            status="inactive",
        ),
        Employee(
            id="rohan", name="Rohan Kulkarni", role="Cook",
            skills=["kitchen"], hourly_pay=110.0,
            max_weekly_hours=30.0, availability=_avail(ALL_DAYS),
            status="active",
        ),
        Employee(
            id="sana", name="Sana Shaikh", role="Cashier",
            skills=["cashier"], hourly_pay=100.0,
            max_weekly_hours=25.0, availability=_avail([0, 1, 2, 3, 4]),
            status="active",
        ),
        Employee(
            id="vikram", name="Vikram Singh", role="Barista",
            skills=["coffee"], hourly_pay=115.0,
            max_weekly_hours=28.0, availability=_avail(ALL_DAYS),
            status="active",
        ),
    ]


def _week_start(today: date) -> date:
    """Monday of the week containing `today` (matches the frontend week view)."""
    return today - timedelta(days=today.weekday())


def _demo_shifts(week_start: date) -> List[Shift]:
    shifts: List[Shift] = []
    for offset in range(DEMO_HORIZON_DAYS):
        day = week_start + timedelta(days=offset)
        for slug, name, start, end, _min_staff, _skills in DEMO_SHIFT_WINDOWS:
            shifts.append(
                Shift(
                    id=f"{slug}-{day.isoformat()}",
                    name=name,
                    shift_date=day,
                    start_time=start,
                    end_time=end,
                    required_role=None,
                )
            )
    return shifts


def _demo_requirements(shifts: List[Shift]) -> List[StaffingRequirement]:
    window_by_prefix = {slug: (min_staff, skills) for slug, _n, _s, _e, min_staff, skills in DEMO_SHIFT_WINDOWS}
    requirements: List[StaffingRequirement] = []
    for shift in shifts:
        prefix = shift.id.split("-", 1)[0]
        min_staff, skills = window_by_prefix[prefix]
        requirements.append(
            StaffingRequirement(
                id=f"req-{shift.id}",
                shift_id=shift.id,
                min_employees=min_staff,
                required_skills=list(skills),
            )
        )
    return requirements


class DemoDataset(BaseModel):
    """Read-only demo scenario served by GET /api/v1/demo."""

    business: Business
    description: str
    horizon_days: int
    week_start: date
    week_end: date
    currency: str
    currency_symbol: str
    employees: List[Employee]
    shifts: List[Shift]
    requirements: List[StaffingRequirement]


def get_demo_dataset() -> DemoDataset:
    """Build the deterministic UrbanBrew Café scenario for the current week."""
    week_start = _week_start(date.today())
    shifts = _demo_shifts(week_start)
    return DemoDataset(
        business=Business(
            id=DEMO_BUSINESS_ID,
            name=DEMO_BUSINESS_NAME,
            location=DEMO_BUSINESS_LOCATION,
        ),
        description=DEMO_DESCRIPTION,
        horizon_days=DEMO_HORIZON_DAYS,
        week_start=week_start,
        week_end=week_start + timedelta(days=DEMO_HORIZON_DAYS - 1),
        currency=DEMO_CURRENCY,
        currency_symbol=DEMO_CURRENCY_SYMBOL,
        employees=_demo_employees(),
        shifts=shifts,
        requirements=_demo_requirements(shifts),
    )
