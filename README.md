# CampusBuzz - React Native Learning App

Learning project for mastering React Native + Supabase before building **HogletHub** (production app).

**Tech Stack:** Expo SDK 54, React Native, TypeScript, Supabase (Edge Functions), TanStack Query

---

## 🔥 Critical Issues & Fixes

### Critical Issues Encountered

#### 1. **Package Compatibility Hell **

**Problem:** Using `^` (caret) in package.json caused npm to install bleeding-edge versions that were incompatible with Expo SDK 54.

**Symptoms:**
```
java.lang.String cannot be cast to java.lang.Boolean
Infinite loading spinner on Android
```

**Root Cause:**
- `nativewind@^4.2.1` → installed v4.2.1 (buggy with Expo 54)
- `tailwindcss@^4.1.18` → installed v4.x (Tailwind v4 too new for RN)
- `zod@^4.3.6` → installed v4.x (Zod v4 just released, untested)

**Solution:** **LOCK ALL VERSIONS** - never use `^` or `~`:
```json
{
  "nativewind": "4.1.23",  // NOT ^4.1.23
  "tailwindcss": "3.4.17",
  "zod": "3.24.1"
}
```

**Lesson:** For production apps, always lock exact versions that have been tested together.

---

#### 2. **Windows Environment Variables **

**Problem:** Unix-style environment variables don't work in Windows PowerShell:
```json
// ❌ FAILS on Windows
"scripts": {
  "dev": "EXPO_PUBLIC_APP_ENV=development expo start"
}
```

**Solution:** Use `cross-env` package:
```json
// ✅ WORKS on Windows, Mac, Linux
"scripts": {
  "dev": "cross-env EXPO_PUBLIC_APP_ENV=development expo start"
}
```

**Installation:**
```bash
npm install cross-env --save-dev
```

---

#### 3. **Edge Functions 401 Unauthorized - CRITICAL**

**Problem:** After deploying Edge Functions, ALL requests returned `401 Unauthorized` even with valid auth tokens. No logs appeared in Supabase dashboard.

**Symptoms:**
```
POST | 401 | https://xxx.supabase.co/functions/v1/create-post
Error: Edge Function returned a non-2xx status code
```

**Root Cause:** Supabase's new API key system (`sb_publishable_...`) has a bug with Edge Functions JWT verification. The gateway blocks requests before they reach the function.

**Related GitHub Issue:** https://github.com/orgs/supabase/discussions/41834

**Solution:** Disable JWT verification at gateway level in `supabase/config.toml`:

```toml
[functions.create-post]
enabled = true
verify_jwt = false  # ← This is the fix
import_map = "./functions/create-post/deno.json"
entrypoint = "./functions/create-post/index.ts"
```

**Why This Works:** 
- Gateway JWT verification is broken with new API keys
- We handle auth **inside** the Edge Function instead
- Function checks `Authorization` header manually
- Bypasses the buggy gateway verification

**Security Note:** Our functions still verify auth using `supabaseClient.auth.getUser()` - this is secure.

---

#### 4. **Metro Config ESM Error on Windows **

**Problem:**
```
Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported
Received protocol 'c:'
```

**Solution:** Use `path.resolve()` for Windows compatibility:
```javascript
// metro.config.js
const path = require('path');

module.exports = {
  // ❌ WRONG - breaks on Windows
  input: './app/global.css',
  
  // ✅ CORRECT - works everywhere
  input: path.resolve(__dirname, 'app/global.css'),
};
```

---

#### 5. **Supabase Client Must Use SecureStore **

**Problem:** Storing auth tokens in `AsyncStorage` is insecure (unencrypted).

**Solution:** Use `expo-secure-store` for encrypted token storage:

```typescript
// lib/supabase.ts
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(url, key, {
  auth: { storage: ExpoSecureStoreAdapter }
});
```

**Why:** Tokens stored in SecureStore are encrypted at OS level and isolated per app.

---

#### 6. **PostgREST Join Fails - Foreign Key Must Point to Correct Table **

**Problem:** Edge Function `get-posts` returned 500 error when trying to join `posts` with `profiles`:
```
Error: Could not find a relationship between 'posts' and 'profiles' in the schema cache
```

**Root Cause:** The foreign key `posts.user_id` was pointing to `auth.users.id` instead of `profiles.id`. PostgREST requires foreign keys to exist for automatic joins to work.

**How We Found It:**
```sql
-- Check existing constraints
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'posts'::regclass;

-- Result showed:
-- posts_user_id_fkey → REFERENCES auth.users(id)  ← Wrong!
```

**Solution:** Change the foreign key to reference `profiles` instead:
```sql
-- Drop old foreign key
ALTER TABLE posts DROP CONSTRAINT posts_user_id_fkey;

-- Add new foreign key to profiles
ALTER TABLE posts 
ADD CONSTRAINT posts_user_id_fkey 
FOREIGN KEY (user_id) 
REFERENCES profiles(id) 
ON DELETE CASCADE;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
```

**Then use join syntax in Edge Function:**
```typescript
const { data: posts } = await supabaseClient
  .from('posts')
  .select(`
    id,
    content,
    profiles (
      id,
      username,
      avatar_url
    )
  `);
```

**Lesson:** PostgREST (Supabase's REST API) uses foreign keys to enable automatic joins. If the foreign key points to the wrong table, joins will fail even if the data relationship logically exists.

---

#### 7. **React Native Does Not Have `confirm()` Function **

**Problem:** Using `confirm()` for delete confirmation crashed the app:
```
Property 'confirm' doesn't exist
```

**Root Cause:** `confirm()` is a web browser API, not available in React Native.

**Solution:** Use React Native's `Alert.alert()` instead:
```typescript
// ❌ WRONG - Web only
if (confirm('Delete this post?')) {
  deletePost.mutate(postId);
}

// ✅ CORRECT - React Native
import { Alert } from 'react-native';

Alert.alert(
  'Delete Post',
  'Are you sure?',
  [
    { text: 'Cancel', style: 'cancel' },
    { 
      text: 'Delete', 
      style: 'destructive',
      onPress: () => deletePost.mutate(postId)
    }
  ]
);
```

**Lesson:** Many Web APIs don't exist in React Native. Always use RN-specific components (Alert, Modal, etc.) instead of browser APIs.

---

## ⚡ Quick Setup

### Prerequisites
- Node.js 20+ LTS
- Docker Desktop (for Edge Functions)
- Supabase CLI: `npx supabase --version`
- Expo Go app on your phone

### Installation

```bash
# Clone and install
git clone https://github.com/your-username/campusbuzz.git
cd campusbuzz
npm install --legacy-peer-deps  # ALWAYS use this flag

# Set up .env files (see .env.example)
# Copy Supabase URL and anon key from dashboard

# Link Supabase project
supabase login
supabase link --project-ref your-project-ref

# Deploy Edge Functions (Docker must be running!)
supabase functions deploy create-post

# Start development
npm run dev
```

---

## 📁 Project Structure

```
campusbuzz/
├── app/                         # Expo Router pages
│   ├── index.tsx                # Main feed (Gen Z UI)
│   └── design-system.tsx        # Component showcase
├── components/ui/               # Reusable UI components (Design System)
│   ├── Button.tsx               # 5 variants, 3 sizes
│   ├── Card.tsx                 # 3 variants + sub-components
│   ├── Input.tsx                # With labels, icons, errors
│   ├── Avatar.tsx               # Initials, badges, groups
│   └── Typography.tsx           # Headings, body, captions
├── lib/                         # Core utilities
│   ├── design-system.ts         # Colors, spacing, typography, shadows
│   ├── supabase.ts              # Supabase client with SecureStore
│   ├── api.ts                   # API client for Edge Functions
│   └── env.ts                   # Type-safe environment variables
├── hooks/                       # React hooks (TanStack Query)
│   ├── useAuth.ts               # Auth state management
│   ├── usePosts.ts              # Fetch posts query
│   ├── useCreatePost.ts         # Create post mutation
│   ├── useDeletePost.ts         # Delete post mutation
│   └── useToggleLike.ts         # Like/unlike mutation
├── supabase/
│   ├── config.toml              # IMPORTANT: verify_jwt = false
│   └── functions/               # Edge Functions (Deno)
├── .env.development             # Environment variables (gitignored)
└── package.json                 # LOCKED versions (no ^ or ~)
```

---

## 🎨 Design System

Built with production-grade design tokens (no Tailwind/NativeWind):
- **Colors:** Vibrant primary (red), secondary (purple), semantic colors
- **Typography:** Scale from 12px to 36px with consistent weights
- **Spacing:** 4px to 64px scale
- **Shadows:** 4 levels (sm, md, lg, xl)
- **Components:** Button, Card, Input, Avatar, Typography

**Why no NativeWind?** Using design tokens is the industry standard for production apps (Airbnb, Instagram, Uber all use this approach). More control, type-safe, zero dependencies.

---