# Clerk Authentication Setup

This guide will help you set up Clerk.dev authentication for your Budget App.

## 1. Create a Clerk Account

1. Go to [clerk.dev](https://clerk.dev)
2. Sign up for a free account
3. Create a new application

## 2. Get Your Publishable Key

1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_` or `pk_live_`)
3. Update the `.env` file in the `client` directory:

```bash
# Replace with your actual Clerk publishable key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your-actual-key-here
```

## 3. Configure Clerk Settings

### Authentication Methods
1. Go to **User & Authentication** → **Email, Phone, Username**
2. Enable the authentication methods you want:
   - Email address
   - Username
   - Phone number

### Social Connections (Optional)
1. Go to **User & Authentication** → **Social Connections**
2. Enable providers like:
   - Google
   - GitHub
   - Apple

### Redirect URLs
1. Go to **Paths** → **Redirect URLs**
2. Add these URLs:
   - `http://localhost:5174/dashboard` (for development)
   - `http://localhost:5174/sign-in`
   - `http://localhost:5174/sign-up`

## 4. Start the Application

1. **Start the backend:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the app:**
   - Frontend: http://localhost:5174
   - You'll be redirected to sign-in if not authenticated

## 5. Test the Authentication

1. Visit http://localhost:5174
2. You should be redirected to the sign-in page
3. Create a new account or sign in
4. You'll be redirected to the dashboard after successful authentication

## 6. Integration with Backend (Optional)

If you want to integrate Clerk with your backend API:

1. Install Clerk backend SDK:
   ```bash
   cd server
   npm install @clerk/clerk-sdk-node
   ```

2. Add your Clerk secret key to `server/.env`:
   ```
   CLERK_SECRET_KEY=sk_test_your-secret-key-here
   ```

3. Use Clerk's backend SDK to verify tokens in your API routes.

## Features Included

✅ **Sign In/Sign Up pages** with Clerk components
✅ **Protected routes** that redirect unauthenticated users
✅ **User dashboard** with Clerk user data
✅ **Settings page** showing user information
✅ **Sign out functionality**
✅ **Responsive design** with Tailwind CSS

## Next Steps

- Customize the Clerk components appearance
- Add more authentication methods
- Integrate with your backend API
- Add user profile management
- Implement role-based access control 