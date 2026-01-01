# MongoDB Migration - Local Storage to Backend

## Overview
This document outlines the changes made to migrate from local storage to MongoDB backend for data persistence.

## Changes Made

### 1. Dashboard.tsx (`apps/client/src/pages/Dashboard.tsx`)
**Changed:** Workflows loading mechanism
- **Before:** Fetched workflows from `localStorage`
- **After:** Fetches workflows from MongoDB backend using `apiListWorkflows()` API call
- **Benefits:** Real-time data sync, persistent storage across sessions and devices

```tsx
// Now uses API instead of localStorage
const workflows = await apiListWorkflows();
```

**Also Updated:**
- Logout button now uses `setAuthToken(null)` instead of `localStorage.removeItem('token')`
- Imported required functions from `@/lib/http`

---

### 2. CreateWorkflow.tsx (`apps/client/src/components/CreateWorkflow.tsx`)
**Changed:** Workflow creation and workflow list management
- **Before:** Saved workflows to `localStorage` directly
- **After:** Uses `apiCreateWorkflow()` to save to MongoDB backend

**Key Updates:**
```tsx
// Old: localStorage.setItem('workflows', JSON.stringify(next));
// New: Uses apiCreateWorkflow which persists to MongoDB

// Loading workflows on component mount
useEffect(() => {
  const loadWorkflows = async () => {
    const data = await apiListWorkflows();
    const formattedWorkflows = data.map((w: any) => ({
      id: w._id,
      name: w.name || `Workflow ${w._id.slice(0, 6)}`
    }));
    setWorkflows(formattedWorkflows);
  };
  loadWorkflows();
}, []);
```

---

### 3. Auth.tsx (`apps/client/src/pages/Auth.tsx`)
**Changed:** Authentication API calls
- **Before:** Direct fetch calls with manual token management
- **After:** Uses centralized `apiSignup()` and `apiSignin()` functions

**Benefits:**
- Consistent error handling
- Automatic token management via `setAuthToken()`
- Cleaner code with centralized API logic

```tsx
// Now uses API utilities
const data = await apiSignin(body);
// or
await apiSignup(body);
```

---

### 4. http.ts (`apps/client/src/lib/http.ts`)
**Enhanced:** Auth token management
- Updated `apiSignup()` to automatically set the auth token (same as `apiSignin()`)
- Ensures tokens are properly stored using the centralized `setAuthToken()` function

```tsx
export async function apiSignup(body: { username: string; password: string}): Promise<SigninResponse> {
    const res = await api.post<SigninResponse>('/signup', body);
    setAuthToken(res.data.token);
    return res.data;
}
```

---

## Backend API Endpoints (Already Implemented)

The following endpoints in `apps/backend/index.ts` handle MongoDB operations:

### Authentication
- `POST /signup` - Create new user
- `POST /signin` - Login user

### Workflows
- `POST /workflow` - Create new workflow
- `GET /workflows` - List all user workflows
- `GET /workflow/:workflowId` - Get specific workflow
- `PUT /workflow/:workflowId` - Update workflow
- `GET /workflow/executions/:workflowId` - Get workflow executions

### Other
- `GET /nodes` - Get available nodes

---

## Database Models

All data is stored in MongoDB using the following models (from `db/client`):

- **UserModel** - User accounts with auth
- **WorkflowModel** - Workflow definitions
- **ExecutionModel** - Workflow execution history
- **NodesModel** - Available action/trigger nodes

---

## Migration Checklist

✅ Dashboard workflows now fetch from MongoDB
✅ CreateWorkflow saves to MongoDB backend
✅ Auth uses centralized API functions
✅ Token management uses `setAuthToken()` utility
✅ All localStorage calls removed from workflow/auth logic
✅ API functions properly typed with TypeScript

---

## Token Storage

**Important:** Auth tokens are still stored in `localStorage` via `setAuthToken()` function in `http.ts`. This is intentional as:
1. Tokens need to persist across page refreshes
2. They're used for API authentication headers
3. localStorage is suitable for this use case as tokens are non-sensitive session data

---

## Environment Variables

Ensure your `.env` files have:

```env
# Frontend (.env.local or .env)
VITE_API_BASE_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000

# Backend (.env)
MONGO_URL=mongodb://your-mongodb-url
JWT_SECRET=your-jwt-secret
PORT=3000
```

---

## Testing

1. **Sign up/Sign in**: Verify users are created in MongoDB
2. **Create workflow**: Check workflows appear in MongoDB
3. **Dashboard**: Verify workflows load from backend
4. **Logout**: Verify auth token is cleared
5. **Page refresh**: Verify data persists from MongoDB

---

## Future Enhancements

- Add workflow names/descriptions to MongoDB schema
- Implement workflow versioning
- Add execution result storage
- Implement real-time sync with WebSockets
- Add data export functionality
