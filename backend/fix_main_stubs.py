import re
with open("app/main.py", "r") as f:
    content = f.read()

content = content.replace("from .api.leave import router as leave_router",
                          "from .api.leave import router as leave_router\nfrom .api.demo import router as demo_router\nfrom .api.comparison import router as comparison_router")
content = content.replace("app.include_router(leave_router,     prefix=PREFIX)",
                          "app.include_router(leave_router,     prefix=PREFIX)\napp.include_router(demo_router)\napp.include_router(comparison_router)")

with open("app/main.py", "w") as f:
    f.write(content)
