# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Online Application for Business Permit System (OABP) - A full-stack web application for managing business permit applications and renewals. The system serves two user types: business owners and administrators.

## Technology Stack

**Backend:**
- Node.js with Express.js
- Supabase (PostgreSQL database)
- bcrypt for password hashing
- CORS enabled for cross-origin requests

**Frontend:**
- React 19.1.0 with React Router DOM
- Bootstrap 5.3.6 with custom CSS
- Lucide React for icons
- Axios for API calls

## Development Commands

### Backend
```bash
cd backend
npm install
npm start          # Starts server on port 3000 (or PORT env variable)
```

### Frontend
```bash
cd frontend
npm install
npm start          # Starts React dev server on http://localhost:3000
npm run build      # Production build
npm test           # Run tests
```

## Architecture

### Backend Structure (`backend/`)
- **server.js** - Main Express server with authentication endpoints
- **testserver.js** - Test/development server
- **.env** - Environment variables (SUPABASE_URL, SUPABASE_KEY, PORT)

**Key API Endpoints:**
- `POST /api/main/register` - Admin registration
- `POST /api/main/login` - Admin login
- `POST /api/user/register` - Business owner registration
- `POST /api/user/login` - Business owner login

All endpoints return JSON with `{success: boolean, message?: string, error?: string}` structure.

### Frontend Structure (`frontend/src/`)

**Entry Points:**
- **index.js** - React app root with Bootstrap imports
- **App.js** - Route definitions using React Router

**User Roles & Portals:**

1. **Public Pages** (`pages/`)
   - Home, Requirements, Tracking, ContactUs, About
   - Accessible without authentication

2. **Business Owner Portal** (`userpages/`)
   - Components: UserLogin, UserRegister, Forgot
   - Main pages: DashboardUser, NewApplication, Renewal, Transaction, ApplicationChecklist
   - Document forms: BrgyClearance, Cooperatives, Foundation, Lease, Occupancy, Partnership, SingleSole
   - Routes: `/oabps/user/*`, `/business/*`, `/transactions/*`, `/documents/*`

3. **Admin Portal** (`mainadminpage/`)
   - Components: MainLogin, MainRegister
   - Main pages: DashboardMain, MainDocuments, MainDocCategory, MainRequests, MainPayments, MainTransactions, MainRoles, MainUsers, MainLogAudits
   - Routes: `/oabps/main/*`, `/main/*`

**Shared Components** (`includes/`)
- **UserSideBar** - Navigation for business owner portal
- **MainSideBar** - Navigation for admin portal
- **Header** - Public site header
- **UserTopBar** - Business owner top bar

### Database Schema (Supabase)

**Tables:**
- **Admins** - Admin users (admin_id, fullname, email, username, password, created_at)
- **Owners** - Business owners (owner_id, fullname, email, username, password, created_at)

### Authentication Flow

1. User credentials sent to backend API
2. Backend queries Supabase by username or email
3. bcrypt compares hashed password
4. Simple base64 token generated: `Buffer.from(${user.id}:${Date.now()}).toString("base64")`
5. Token and user data stored in localStorage
6. Frontend redirects to appropriate dashboard

**Note:** Current token implementation is basic. Consider upgrading to JWT for production.

### Routing Structure

The app uses duplicate route structures:
- New routes: `/oabps/user/*`, `/oabps/main/*`
- Legacy routes: `/loginfinal/*`, `/main/*`

Both sets are maintained in App.js for backward compatibility.

## Environment Setup

### Backend `.env` file required:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```

### Frontend API Configuration
API base URL is hardcoded in components:
- Production: `https://oabs-f7by.onrender.com`
- Local: `http://localhost:3000`

When developing locally, update API URLs in login/register components to point to local backend.

## Key Development Patterns

**Component Structure:**
- Most pages use layout components (UserSideBar, MainSideBar) as wrappers
- Children prop pattern for content injection
- useState for local state, useNavigate for routing, useLocation for active states

**API Calls:**
- Axios with async/await
- Error handling with try/catch
- Loading states tracked with useState
- Errors displayed to user via state

**Styling:**
- Bootstrap classes for layout and components
- Custom CSS in `style.css` and `App.css`
- Responsive design with Bootstrap grid system
- Lucide React icons throughout

## Common Tasks

**Adding a new business document type:**
1. Create component in `frontend/src/userpages/documentz/`
2. Add route in `App.js`
3. Add navigation link in `UserSideBar.js`
4. Follow pattern from existing document components (BrgyClearance, etc.)

**Adding a new admin feature:**
1. Create component in `frontend/src/mainadminpage/`
2. Add route in `App.js` (both `/oabps/main/*` and `/main/*` routes)
3. Add menu item in `MainSideBar.js`
4. Create corresponding backend API endpoint in `server.js`

**Modifying authentication:**
- Backend logic in `server.js` (lines 27-332)
- Frontend login components: `UserLogin.js`, `MainLogin.js`
- Registration components: `UserRegister.js`, `MainRegister.js`
