# Task Management App

A full-stack task management application built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## 🔗 Live Demo

**Deployed Application**: [https://task-manager-nextjs-firebase.vercel.app](https://task-manager-nextjs-firebase.vercel.app)

## Code :- [github code](https://github.com/Sufalthakre18/task-manager-nextjs-firebase)

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4+
- **Authentication**: Firebase Authentication (Email/Password)
- **Database**: Firebase Firestore
- **Date Handling**: date-fns
- **Deployment**: Vercel

## 🔐 Authentication Flow

### How Authentication Works

1. **User Registration (Sign Up)**
   - User enters email and password on the auth page
   - Firebase Authentication creates a new user account
   - Credentials are securely stored in Firebase Auth backend
   - User receives a unique `userId` (UID)

2. **User Login**
   - User provides email and password
   - Firebase validates credentials against stored data
   - On success, Firebase issues a JWT token
   - Token is stored in the browser session

3. **Session Management**
   - Firebase automatically manages authentication state
   - `onAuthStateChanged` listener detects login/logout events
   - Custom `useAuth` hook provides user state to components
   - Protected routes check authentication before rendering

4. **Authorization**
   - Every API request includes the authentication token
   - Firebase verifies token validity on each request
   - User identity (`userId`) is used to filter database queries

5. **Logout**
   - `signOut()` function clears the session


## 🗄️ Database Structure

### Firestore Collection: `tasks`

Each task document contains the following fields:

```javascript
{
  id: "auto-generated-document-id",
  title: "Complete project documentation",
  description: "Write comprehensive README with all setup instructions",
  dueDate: "2026-01-30", 
  status: "in-progress",
  userId: "firebase-user-uid", 
  createdAt: "2026-01-27T14:30:00.000Z" 
}
```

### How Tasks are Linked to Users

**User-Task Relationship:**
- Each task has a `userId` field that stores the Firebase UID of the user who created it
- When fetching tasks, a `where` clause filters by the current user's ID:

```typescript
const q = query(
  collection(db, 'tasks'),
  where('userId', '==', user.uid), 
  orderBy('createdAt', 'desc')
);
```

**Data Isolation:**
- Users can only see their own tasks
- Firestore security rules enforce this at the database level
- Even if someone tries to access another user's task directly, the rules deny access


## ✅ Functional Requirements

### 1. Authentication 
- [x] Email + Password signup
- [x] Email + Password login
- [x] Secure session management with Firebase Auth
- [x] Protected routes (dashboard only accessible when logged in)
- [x] Logout functionality

### 2. Task Management (CRUD) 
- [x] **Create**: Add new tasks with title, description, due date, and status
- [x] **Read**: View all tasks belonging to the current user
- [x] **Update**: Edit existing tasks (all fields editable)
- [x] **Delete**: Remove tasks with confirmation dialog
- [x] Real-time updates using Firestore listeners

### 3. Task Status + Filters 
- [x] Three status types: `Todo`, `In Progress`, `Done`
- [x] Filter tasks by status (All, Todo, In Progress, Done)
- [x] Sort tasks by due date (Ascending/Descending)
- [x] Combined filtering and sorting (can be used together)

### 4. User Isolation ✓
- [x] Each user sees only their own tasks


## 🎨 UI/UX Features

### Responsive Design
- Fully responsive layout for mobile, tablet, and desktop
- Mobile-first approach with Tailwind CSS
- Optimized touch targets for mobile users
- Adaptive layouts using flexbox and grid

### User Experience
- **Loading States**: Spinners during data fetch and authentication
- **Error Handling**: User-friendly error messages for failed operations
- **Confirmation Dialogs**: "Are you sure?" prompt before deleting tasks
- **Form Validation**: Required fields and minimum length constraints
- **Visual Feedback**: Color-coded task status badges
- **Instant Updates**: Real-time synchronization with Firestore

## 🐛 One Bug Faced & Solution

### Problem: Firestore Query Error with Composite Index

**Context:**
When implementing the real-time task fetching functionality, I needed to query tasks that belonged to the current user AND sort them by creation date. This required combining a `where` clause with an `orderBy` clause:

```typescript
const q = query(
  collection(db, 'tasks'),
  where('userId', '==', user.uid),
  orderBy('createdAt', 'desc')
);
```

**Root Cause:**
Firestore requires a composite index when you:
1. Filter by a field (`where('userId', '==', ...)`)
2. Sort by a different field (`orderBy('createdAt', ...)`)

By default, Firestore doesn't have this index, causing the query to fail.

**Solution:**
1. Firebase provided a direct link in the error message to create the required index
2. Clicked the link, which opened Firebase Console
3. Confirmed the index creation with fields:
   - `userId` (Ascending)
   - `createdAt` (Descending)
4. Waited ~2-3 minutes for index to build
5. Refreshed the application - query worked perfectly!

**Learning:**
This taught me that Firestore optimizes performance through strategic indexing. For complex queries, always check if composite indexes are needed. The error messages are actually helpful - they provide direct links to fix the issue!


## 🎯 Code Quality & Best Practices

- **TypeScript**: Full type safety across the application
- **Component Architecture**: Reusable, single-responsibility components
- **Custom Hooks**: Encapsulated authentication logic
- **Error Handling**: Try-catch blocks with user-friendly messages
- **Loading States**: Proper UX during async operations
- **Code Organization**: Clear separation of concerns (lib, components, app)
- **Environment Variables**: Sensitive data kept out of source code
- **Security**: Firestore rules enforce data access policies
- **Real-time Updates**: Efficient use of Firestore listeners
- **Responsive Design**: Mobile-first approach with Tailwind

## 🚀 Future Enhancements

If this project were to scale or continue development:

1. **Task Categories/Tags**: Organize tasks with custom labels
2. **Search Functionality**: Full-text search across tasks
3. **Pagination**: Load tasks in batches for better performance
4. **Task Priority**: High/Medium/Low priority levels
5. **Recurring Tasks**: Support for daily/weekly tasks
6. **Notifications**: Email reminders for upcoming due dates
7. **Collaboration**: Share tasks with other users


## 👨‍💻 Author

**Sufal Thakre**  
Full Stack Developer
---