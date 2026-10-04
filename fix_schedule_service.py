import re

file_path = "app/services/schedule_service.py"
with open(file_path, "r") as f:
    content = f.read()

# Insert explicit check for missing baseline
check_code = """
        current_schedule = self.store.get_schedule()
        week_start = self.store.get_week_start()
        
        if not current_schedule or not week_start:
            raise ValueError("No baseline schedule exists. Run /optimize first.")
"""

# Replace the specific lines
content = re.sub(
    r"current_schedule = self\.store\.get_schedule\(\)\n\s+week_start = self\.store\.get_week_start\(\)",
    check_code.strip('\n'),
    content
)

with open(file_path, "w") as f:
    f.write(content)

