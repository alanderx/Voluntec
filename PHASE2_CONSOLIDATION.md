# Voluntec Development Plan - Phase 2 Consolidation

## Current State Summary

**Backend:** 100% functional
- Database schema: `Voluntec.sql` executed with all tables (user, project, skill, task, etc.)
- All PHP API endpoints working: user management, skill management, project management, task management
- Authentication and session management complete
- Naming conventions standardized (singular tables, clean English field names)

**Frontend:** Partial implementation, needs cleanup and enhancement
- Existing HTML files in `registro/` directory
- Existing JS files in `assets/js/` (login, projeto, user_task, usuario)
- Field names and endpoints may not match backend
- Missing complete UI flows

---

## Phase 1: JavaScript and HTML Cleanup

**Objective:** Ensure all existing frontend code correctly interfaces with the backend API

**Status:** Ready to start

### Tasks

#### 1.1. Audit JavaScript files for correct field names
**Files to check:**
- `assets/js/login.js` - Should use `email` and `senha` (not old names)
- `assets/js/usuario/create_user.js` - Should use: `name`, `email`, `password`, `birth_date`, `city`, `state`, `country`
- `assets/js/usuario/read _user.js` - Should use: `name`, `email`, `city`, `state`, `country`
- `assets/js/usuario/update_user.js` - Should use: `name`, `email`, `city`, `state`, `country`
- `assets/js/usuario/delete_user.js` - Verify functionality

**Project management files:**
- `assets/js/projeto/create_project.js` - Should use: `name`, `description`
- `assets/js/projeto/read_project.js` - Should use: `name`, `description`
- `assets/js/projeto/update_project.js` - Should use: `name`, `description`, `id`
- `assets/js/projeto/delete_project.js` - Should use: `id`
- `assets/js/projeto/listar_projetos.js` - Check response field names: `name`, `description`, `created_at`, `full_name`
- `assets/js/projeto/meus_projetos.js` - Check response field names: `name`, `description`, `created_at`
- `assets/js/projeto/ver_projeto.js` - Check response field names: `name`, `description`, `created_at`, `full_name`

**Task management files:**
- `assets/js/user_task/create_task.js` - Should use: `task_id`, `start_date`, `end_date`, `status`
- `assets/js/user_task/list_tasks.js` - Check response field names
- `assets/js/user_task/update_task.js` - Should use: `id`, `task_id`, `start_date`, `end_date`, `status`
- `assets/js/user_task/delete_task.js` - Should use: `id`

#### 1.2. Audit JavaScript files for correct endpoint paths
**Check all fetch() calls point to:**
- `/app/user/` (not `/app/usuario/`)
- `/app/project/` (not `/app/projeto/`)
- `/app/skill/` (not `/app/skills/`)
- `/app/user_task/` (not `/app/user-task/`)

**Specific checks:**
- Old Portuguese endpoints → New English endpoints
  - `usuario_ler.php` → `read_user.php`
  - `usuario_update.php` → `update_user.php`
  - `apaga_usuario.php` → `delete_user.php`
  - `novo_projeto.php` → `create_project.php`
  - `ler_projeto.php` → `read_project.php`
  - `altera_projeto.php` → `update_project.php`
  - `apaga_projeto.php` → `delete_project.php`

#### 1.3. Audit HTML files for correct form field names
**Check these files:**

`registro/create_user.html`:
- Fields should be: `name`, `email`, `password`, `birth_date`, `city`, `state`, `country`
- NOT: `name_user`, `email_user`, `password_user`, `uf`

`registro/create_project.html`:
- Fields should be: `name`, `description`
- NOT: `nm_projeto`, `desc_projeto`

`registro/update-&-delete_usuario.html`:
- Fields should match backend expectations: `name`, `email`, `city`, `state`, `country`
- Script references: `read_user.js`, `update_user.js`, `delete_user.js`

`registro/update-&-delete_project.html`:
- Fields should be: `name`, `description`, `id`
- Script references: `read_project.js`, `update_project.js`, `delete_project.js`

`registro/users'-projects.html`:
- Links should point to: `create_project.html`, `update-&-delete_project.html`
- Script references: `meus_projetos.js`, `delete_project.js`

`registro/ver_projeto.html`:
- Script reference: `ver_projeto.js`

`registro/project.html`:
- Verify kanban board functionality

#### 1.4. Fix internal navigation links
**Check all navigation menus in:**
- `index.html`
- `login/index.html`
- All files in `registro/` directory

**Verify:**
- Menu links point to correct files
- Navigation paths are relative and consistent
- No broken links to old file names

**Common navigation:**
- Home → `index.html` or `../index.html`
- My Projects → `users'-projects.html` or `meus_projetos.html`
- Settings → `update-&-delete_usuario.html` or `lerAlteraApaga_usuario.html`
- Create Project → `create_project.html` or `novo_projeto.html`

#### 1.5. Remove unused/duplicate files
**Scan for:**
- Old PHP files with Portuguese names (should all be deleted already)
- Duplicate JS files with old naming
- Test/temporary files
- Backup files (*.bak, *.old, etc.)

**Expected outcome:** Clean file structure with consistent naming

### Deliverables
- All JS files correctly call backend endpoints with proper field names
- All HTML forms submit data that backend expects
- All internal links functional
- Clean, consistent codebase with no unused files

**Dependencies:** None (backend is complete)

**Expected Outcome:** Frontend code fully aligned with backend, ready for testing

---

## Phase 2: Documentation - User Stories

**Objective:** Create comprehensive user story documentation for AI contextualization and project reference

**Status:** Waiting for Phase 1 completion

### Tasks

#### 2.1. Create `USER_STORIES.md` in root directory
**Content structure:**
```
# User Stories - Voluntec

## Overview
Brief description of the system and its purpose

## Actors
- Volunteer
- Project Manager
- System Admin

## User Stories by Feature Area

### User Management
- US1.AC1 - User Registration
- US1.AC2 - Edit Account Settings
- US1.AC3 - Delete Account
...

### Project Management
...

### Task Management
...

### Skill Management
...
```

**For each story, include:**
- Story ID and title
- User role (volunteer, project manager, admin)
- Story description: "As a [role], I want [action] so that [benefit]"
- Acceptance criteria (numbered list)
- API endpoints involved (with HTTP methods)
- Database tables involved
- Implementation status: Complete / Partial / Not Started

#### 2.2. Map user stories to existing implementation
**Process:**
1. Go through each user story
2. Identify which files implement it (PHP, JS, HTML)
3. Mark status: Complete / Partial / Not Started
4. Note any gaps between stories and implementation
5. Document missing features

**Create a tracking table:**
| Story ID | Title | Status | Backend | Frontend | Gap Analysis |
|----------|-------|--------|---------|----------|--------------|
| US1.AC1 | Registration | Complete | ✅ | ✅ | None |
| US1.AC2 | Edit Account | Partial | ✅ | ⚠️ | Frontend missing inline edit |
| ... | ... | ... | ... | ... | ... |

### Deliverables
- `USER_STORIES.md` with all user stories documented
- Clear mapping of stories to code with file references
- Gap analysis for missing features
- Implementation status tracking

**Dependencies:** Phase 1 cleanup (to accurately assess implementation status)

**Expected Outcome:** Complete project documentation that serves as AI context and development reference

---

## Phase 3: Documentation - UML Diagrams

**Objective:** Create comprehensive UML diagrams for system architecture documentation

**Status:** Waiting for Phase 2 completion

### Tools
- **Astah** or **Miro** for diagram creation
- Export diagrams as PNG files
- Place in `docs/uml/` directory

### Tasks

#### 3.1. Create Use Case Diagram
**Content:**
- Actors: Volunteer, Project Manager, System Admin
- All use cases from USER_STORIES.md
- Relationships (includes, extends)
- System boundary

**Export:** `docs/uml/use-case-diagram.png`

#### 3.2. Create Class Diagram
**Content:**
- Entities: User, Project, Skill, Task, Task_User, Interest_Area, etc.
- Attributes for each entity (from database schema)
- Relationships with cardinalities
- Foreign keys shown
- Methods (if applicable from PHP classes)

**Export:** `docs/uml/class-diagram.png`

#### 3.3. Create Sequence Diagrams (key flows)

**Required diagrams:**

**Registration Flow:**
- Actor → Frontend → create_user.php → Database
- Actor → Frontend → get_skills_by_interest.php → Database
- Actor → Frontend → add_user_skills.php → Database

**Login Flow:**
- Actor → Frontend → login.php → Database
- Response → Session creation

**Project Creation:**
- Actor → Frontend → create_project.php → Database
- Response → Project list update

**Task Assignment:**
- Manager → Frontend → create_task.php → Database
- Volunteer → Frontend → list_tasks.php → Database

**Export:** 
- `docs/uml/sequence-registration.png`
- `docs/uml/sequence-login.png`
- `docs/uml/sequence-project-creation.png`
- `docs/uml/sequence-task-assignment.png`

#### 3.4. Create Object Diagram (optional)
**Content:**
- Example instances of User, Project, Task
- Real-world data examples
- Relationships between instances

**Export:** `docs/uml/object-diagram.png`

#### 3.5. Create `docs/UML_DOCUMENTATION.md`
**Content:**
```
# UML Documentation

## Overview
Brief explanation of the UML diagrams and their purpose

## Use Case Diagram
Explanation of actors and use cases
How to read the relationships

## Class Diagram
Explanation of entities and relationships
Database design decisions

## Sequence Diagrams
Explanation of each flow
Step-by-step walkthrough

## Object Diagram
Example instances
Real-world scenarios

## How to Use These Diagrams
- For developers: understanding system architecture
- For stakeholders: visualizing functionality
- For AI: providing context
```

### Deliverables
- Complete UML diagram set in `docs/uml/` directory (minimum 6-7 diagrams)
- `docs/UML_DOCUMENTATION.md` explaining each diagram
- Visual documentation of system architecture

**Dependencies:** Phase 2 (user stories provide use case context)

**Expected Outcome:** Professional UML documentation for stakeholders, developers, and AI contextualization

---

## Phase 4: Figma Integration and Frontend Development

**Objective:** Generate complete, production-ready frontend from Figma design with auto-layout and component system

**Status:** Waiting for Phase 1 completion, Figma file pending

### Tasks

#### 4.1. Figma Design Review
**When Figma file is provided:**
- Review all pages: login, registration, dashboard, projects, tasks, profile
- Verify auto-layout is used throughout
- Check components and variables are properly defined
- Review design tokens: colors, typography, spacing
- Document any issues or missing pages

#### 4.2. Figma-to-Code Export Setup
**Evaluation of tools:**
- Figma's built-in "Inspect" for CSS
- Figma plugins: Anima, Locofy, Builder.io
- Manual extraction if tools don't meet quality standards

**Document chosen approach** in notes or `docs/FIGMA_INTEGRATION.md`

#### 4.3. Generate HTML/CSS from Figma
**Process:**
1. Export HTML structure for each page
2. Extract CSS (use CSS custom properties for design tokens)
3. Ensure responsive design is preserved
4. Maintain component structure from Figma

**Files to generate/update:**
- Login page
- Registration page (2-step with skill selection)
- Dashboard
- Project list
- Project creation
- Project detail
- Task kanban board
- User profile
- Settings

#### 4.4. Integrate with existing backend
**Steps:**
1. Replace existing HTML in `registro/` with Figma-generated HTML
2. Update or rewrite JS files to work with new HTML structure
3. Ensure form submissions call correct PHP endpoints
4. Preserve backend field name requirements:
   - `name`, `email`, `password`, `state`, `country`, etc. (NOT `name_user`, `uf`, etc.)

**Critical:** Maintain backend API contract (no changes to PHP files needed)

#### 4.5. Test complete user flows
**Test scenarios:**

**Registration Flow:**
1. Fill personal info form
2. Submit to `create_user.php`
3. Select interest areas
4. Get skills dynamically from `get_skills_by_interest.php`
5. Select multiple skills
6. Submit to `add_user_skills.php`
7. Redirect to login or dashboard

**Login Flow:**
1. Enter email and password
2. Submit to `login.php`
3. Verify session creation
4. Redirect to dashboard

**Project Management:**
1. Create project
2. List my projects
3. View project details
4. Update project
5. Delete project

**Task Management:**
1. Create task assignment
2. View task list for project
3. Update task status
4. Delete task

**Profile Management:**
1. View profile
2. Update profile
3. Verify changes persist

#### 4.6. Frontend testing and polish
**Checklist:**
- Cross-browser testing: Chrome, Firefox, Safari, Edge
- Responsive testing: mobile (320px-768px), tablet (768px-1024px), desktop (1024px+)
- Accessibility:
  - Keyboard navigation works
  - ARIA labels present
  - Color contrast meets WCAG AA
  - Screen reader compatibility
- Performance:
  - Image optimization (WebP, lazy loading)
  - CSS minification
  - JavaScript bundling (if needed)
- UX refinements based on testing

#### 4.7. Figma Dev Mode Integration (if applicable)
**Explore:**
- Figma Dev Mode features for ongoing design-code sync
- Component inspection workflow
- Design token extraction

**Document:** Process for future design updates in `docs/FIGMA_INTEGRATION.md`

### Deliverables
- Complete, production-ready frontend built from Figma
- All HTML pages in `registro/` updated with Figma-generated code
- All JS files in `assets/js/` working with new HTML
- CSS files organized with design tokens
- Working user flows end-to-end
- Cross-browser and responsive tested frontend
- Documentation: `docs/FIGMA_INTEGRATION.md`

**Dependencies:** Phase 1 (ensures backend interface is solid before major frontend rewrite)

**Expected Outcome:** Professional, production-ready frontend fully integrated with backend

---

## Phase 5: Final Testing and Production Readiness

**Objective:** Comprehensive system testing and preparation for production deployment

**Status:** Waiting for Phases 1-4 completion

### Tasks

#### 5.1. Backend API Testing
**Use:** `BACKEND_TESTING.md` guide

**Tests:**
1. Test all endpoints with curl/Postman
2. Verify all CRUD operations work correctly
3. Test authentication and session management
4. Test error handling and edge cases
5. Verify all response formats match expectations

**Document:** Any issues found in tracking system

#### 5.2. Integration Testing
**Scenarios:**
1. Complete user journeys end-to-end
2. Verify data flows correctly between frontend and backend
3. Test concurrent user scenarios (if possible)
4. Verify session timeout behavior
5. Test logout and re-login flows
6. Test browser refresh with active session

**Document:** Test results and any failures

#### 5.3. Security Review
**Checklist:**
- Password hashing: Using `password_hash()` and `password_verify()`
- SQL injection: All queries use prepared statements
- XSS: Input sanitization and output escaping
- Session security: HTTP-only cookies, secure flag (for HTTPS)
- CSRF: Consider adding tokens for state-changing operations
- Input validation: All user input validated
- Error messages: Don't leak sensitive information

**Document:** Security review findings and fixes

#### 5.4. Update Documentation
**Files to update:**
- `O_QUE_FALTA.md` - Update with final status
- `README.md` - Add setup instructions, prerequisites
- `BACKEND_TESTING.md` - Verify all examples work
- Create `DEPLOYMENT.md` - Production deployment guide
- Verify code comments are in English
- Verify user-facing messages are in Portuguese

**Check:**
- Installation instructions
- Configuration steps
- Database setup
- Server requirements
- Environment variables needed

#### 5.5. Production Preparation
**Checklist:**
- Configure production database settings (in `.env` or config file)
- Set up error logging (log files, monitoring)
- Configure PHP session settings for production
- Set up backup procedures
- Document server requirements (PHP version, MySQL version, extensions)
- Set up SSL/HTTPS
- Configure CORS if needed
- Set up monitoring and alerts

### Deliverables
- Fully tested, production-ready application
- Complete documentation set
- Deployment guide (`DEPLOYMENT.md`)
- Known issues documented

**Dependencies:** Phases 1-4 complete

**Expected Outcome:** Application ready for production deployment

---

## Implementation Notes

### Backend
- **NO changes required** - 100% complete and tested
- All PHP endpoints working correctly
- Database schema stable

### Frontend
- Focus: Cleanup, documentation, Figma integration
- Preserve existing backend API contracts
- All changes should maintain compatibility

### Naming Conventions
- Code and comments: English
- User-facing messages: Portuguese (BR)
- Database name: `Voluntec` (capital V)
- Field names: Clean English (`name`, `email`, `state`, etc.)

### Project Structure
```
Voluntec/
├── app/
│   ├── connection.php
│   ├── login.php
│   ├── user/ (create, read, update, delete)
│   ├── project/ (create, read, update, delete, list, my)
│   ├── skill/ (list, get_by_interest, add_user)
│   ├── task/ (list_task_types)
│   └── user_task/ (create, list, read, update, delete)
├── assets/
│   └── js/
│       ├── login.js
│       ├── usuario/ (create, read, update, delete)
│       ├── projeto/ (create, read, update, delete, list, ver)
│       └── user_task/ (create, read, update, delete, list)
├── registro/
│   ├── create_user.html
│   ├── create_project.html
│   ├── update-&-delete_usuario.html
│   ├── update-&-delete_project.html
│   ├── users'-projects.html
│   ├── ver_projeto.html
│   └── project.html
├── docs/
│   ├── uml/
│   ├── UML_DOCUMENTATION.md
│   └── FIGMA_INTEGRATION.md
├── login/
│   └── index.html
├── index.html
├── BACKEND_TESTING.md
├── O_QUE_FALTA.md
├── PHASE2_CONSOLIDATION.md
├── USER_STORIES.md (to be created)
├── DEPLOYMENT.md (to be created)
└── README.md
```

---

## Success Criteria

1. All frontend code aligned with backend API ✅
2. Complete UML documentation available ✅
3. All user stories documented and mapped to implementation ✅
4. Production-ready frontend from Figma fully integrated ✅
5. All tests passing (backend API, integration, user flows) ✅
6. Application ready for production deployment ✅

---

## Timeline Estimate

**Phase 1:** 2-3 days (JS/HTML cleanup)
**Phase 2:** 1-2 days (User stories documentation)
**Phase 3:** 3-5 days (UML diagrams)
**Phase 4:** 5-7 days (Figma integration and frontend development)
**Phase 5:** 2-3 days (Testing and production readiness)

**Total:** ~13-20 days

---

## Next Action

**Start with Phase 1, Task 1.1:** Audit JavaScript files for correct field names

Begin by checking `assets/js/login.js` and verifying it uses the correct field names and endpoints.

