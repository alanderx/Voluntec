# Backend Testing Guide

This guide helps you test all backend endpoints without building a frontend.

## Prerequisites

1. ✅ MySQL database with `Voluntec.sql` executed
2. ✅ PHP server running (XAMPP, WAMP, LAMP, or similar)
3. ✅ curl installed (or use Postman)

## Testing with curl

### Step 1: Test Public Endpoints

**List all projects** (public):
```bash
curl http://localhost/Voluntec/app/project/list_projects.php
```

**List all skills** (public):
```bash
curl http://localhost/Voluntec/app/skill/list_skills.php
```

**List skills by type**:
```bash
# Hard skills only
curl "http://localhost/Voluntec/app/skill/list_skills.php?type=hard"

# Soft skills only
curl "http://localhost/Voluntec/app/skill/list_skills.php?type=soft"
```

**Get skills by interest area**:
```bash
curl "http://localhost/Voluntec/app/skill/get_skills_by_interest.php?areas=design,development"
```

**List task types**:
```bash
curl http://localhost/Voluntec/app/task/list_task_types.php
```

---

### Step 2: Create a Test User

**Create user** (registration):
```bash
curl -X POST http://localhost/Voluntec/app/user/create_user.php \
  -d "name=John Doe" \
  -d "email=john@example.com" \
  -d "password=SecurePass123" \
  -d "birth_date=1990-05-15" \
  -d "city=São Paulo" \
  -d "state=SP" \
  -d "country=Brazil"
```

Expected response:
```json
{
  "msg": "Usuário cadastrado com sucesso!",
  "codigo": true,
  "id": 1
}
```

**Add skills to user**:
```bash
curl -X POST http://localhost/Voluntec/app/skill/add_user_skills.php \
  -d 'skills=["1","2","3","15"]'
```

---

### Step 3: Authenticate

**Login** (save cookies):
```bash
curl -c cookies.txt -X POST http://localhost/Voluntec/app/login.php \
  -d "email=john@example.com" \
  -d "senha=SecurePass123"
```

Expected response:
```json
{
  "codigo": true,
  "msg": "Login realizado com sucesso!"
}
```

---

### Step 4: Test User Management

**Read my profile**:
```bash
curl -b cookies.txt http://localhost/Voluntec/app/user/read_user.php
```

**Update my profile**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/user/update_user.php \
  -d "name=John Updated" \
  -d "email=john@example.com" \
  -d "city=Rio de Janeiro" \
  -d "state=RJ" \
  -d "country=Brazil"
```

**Get my skills**:
```bash
curl -b cookies.txt http://localhost/Voluntec/app/skill/get_user_skills.php
```

---

### Step 5: Test Project Management

**Create a project**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/project/create_project.php \
  -d "name=My Awesome Project" \
  -d "description=This project will change the world!"
```

Expected response:
```json
{
  "codigo": true,
  "msg": "Projeto criado com sucesso!",
  "id": 1
}
```

**List my projects**:
```bash
curl -b cookies.txt http://localhost/Voluntec/app/project/my_projects.php
```

**Read a project**:
```bash
curl -b cookies.txt "http://localhost/Voluntec/app/project/read_project.php?id=1"
```

**Update a project**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/project/update_project.php \
  -d "id=1" \
  -d "name=My UPDATED Project" \
  -d "description=This is the updated description"
```

**Delete a project**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/project/delete_project.php \
  -d "id=1"
```

---

### Step 6: Test Task Management

**Create a task assignment**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/user_task/create_task.php \
  -d "task_id=1" \
  -d "project_id=1" \
  -d "start_date=2024-01-01" \
  -d "end_date=2024-01-31" \
  -d "status=A Fazer"
```

**List tasks for a project**:
```bash
curl -b cookies.txt "http://localhost/Voluntec/app/user_task/list_tasks.php?project_id=1"
```

**Read a specific task**:
```bash
curl -b cookies.txt "http://localhost/Voluntec/app/user_task/read_user's-task.php?id=1"
```

**Update a task**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/user_task/update_task.php \
  -d "id=1" \
  -d "task_id=1" \
  -d "start_date=2024-01-01" \
  -d "end_date=2024-02-15" \
  -d "status=Em Progresso"
```

**Delete a task**:
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/user_task/delete_task.php \
  -d "id=1"
```

---

### Step 7: Delete Test Account

**Delete user** (cleans up test data):
```bash
curl -b cookies.txt -X POST http://localhost/Voluntec/app/user/delete_user.php
```

---

## Expected Response Format

### Success Response
```json
{
  "codigo": true,
  "msg": "Success message in Portuguese",
  "data": {...}  // optional
}
```

### Error Response
```json
{
  "codigo": false,
  "msg": "Error message in Portuguese"
}
```

### List Response
```json
[
  {
    "id": 1,
    "name": "Project Name",
    "description": "...",
    ...
  },
  ...
]
```

---

## Troubleshooting

### "Usuário não logado" (User not logged in)
- Make sure you used `-c cookies.txt` on login
- Make sure you use `-b cookies.txt` on protected endpoints
- Check that session is still valid

### "Database connection failed"
- Verify MySQL is running
- Check database name is `Voluntec` (capital V)
- Verify `app/connection.php` credentials

### "Table doesn't exist"
- Make sure you executed `Voluntec.sql`
- Check table names are singular: `user`, `project`, `skill`, `task`

---

## Testing Checklist

Use this checklist to verify everything works:

- [ ] List projects (public)
- [ ] List skills
- [ ] Get skills by interest area
- [ ] Create user
- [ ] Login
- [ ] Read user profile
- [ ] Update user profile
- [ ] Add skills to user
- [ ] Get user skills
- [ ] Create project
- [ ] List my projects
- [ ] Read project
- [ ] Update project
- [ ] Create task
- [ ] List tasks
- [ ] Update task
- [ ] Delete task
- [ ] Delete project
- [ ] Delete user

---

## Next Steps

Once all backend tests pass:

1. ✅ Backend is ready for frontend development
2. Build HTML forms
3. Connect JavaScript to APIs
4. Style with CSS
5. Add user experience improvements

