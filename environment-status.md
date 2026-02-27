# CampusBuzz — Environment Status

_Last updated: 2026-02-26 (Day 5)_

---

## Project Overview

A React Native learning app built with Expo SDK 54 + Supabase (Edge Functions) + TanStack Query.
Goal: master the stack before building **HogletHub** (production app).

---

## Tech Stack Versions (all locked — no `^` or `~`)

| Package                  | Version      | Notes                                    |
|--------------------------|--------------|------------------------------------------|
| expo                     | ~54.0.33     | SDK 54                                   |
| react-native             | 0.81.5       |                                          |
| react                    | 19.1.0       |                                          |
| @supabase/supabase-js    | ^2.97.0      | Edge Functions + Auth + SecureStore      |
| @tanstack/react-query    | ^5.90.21     | Server state management                  |
| expo-router              | ~6.0.23      | File-based routing                       |
| expo-secure-store        | ~15.0.8      | Encrypted auth token storage             |
| typescript               | ~5.9.2       |                                          |

---

## Backend — Supabase

| Resource            | Status   | Notes                                                             |
|---------------------|----------|-------------------------------------------------------------------|
| Supabase project    | ✅ Live   | Linked via `supabase link`                                        |
| Auth (email)        | ✅ Live   | Email/password sign-up + sign-in working                          |
| `profiles` table    | ✅ Live   | Auto-created on sign-up via trigger                               |
| `posts` table       | ✅ Live   | FK → `profiles.id` (NOT `auth.users.id`)                          |
| `likes` table       | ✅ Live   | Unique constraint on (user_id, post_id)                           |
| Edge Functions      | ✅ Live   | All 6 deployed; `verify_jwt = false` in config.toml (workaround) |

### Edge Functions

| Function         | Method | Auth    | Status   |
|------------------|--------|---------|----------|
| `get-posts`      | GET    | Manual  | ✅ Working |
| `create-post`    | POST   | Manual  | ✅ Working |
| `delete-post`    | POST   | Manual  | ✅ Working |
| `toggle-like`    | POST   | Manual  | ✅ Working |
| `get-profile`    | GET    | Manual  | ✅ Working |
| `update-profile` | POST   | Manual  | ✅ Working |

> **Note on `verify_jwt = false`:** Supabase's new `sb_publishable_*` API keys have a bug with
> gateway-level JWT verification. All functions verify auth internally via
> `supabaseClient.auth.getUser()`. This is secure.

---

## App Features — Completed by Day

### Day 1–4 (Foundation)
- [x] Expo + Supabase project setup
- [x] Environment variables (cross-env for Windows)
- [x] SecureStore auth token storage
- [x] Custom design system (colors, spacing, typography, shadows)
- [x] UI component library: Button, Card, Input, Avatar, Typography
- [x] Auth flow: sign-in / sign-out
- [x] Auth-gated feed
- [x] Create / delete posts
- [x] Like / unlike posts
- [x] Profile hooks (get + update)

### Day 5 (Finishing Touches)
- [x] Empty state with "Be the First to Post!" CTA button
- [x] Loading spinner (`ActivityIndicator`) while feed loads
- [x] Error state in feed with retry button
- [x] Consistent 48px min-height on `md` buttons
- [x] `onError` alerts in `useToggleLike` and `useDeletePost`

---

## Known Issues / Workarounds

| Issue                              | Workaround                                            |
|------------------------------------|-------------------------------------------------------|
| Edge Functions 401 with new API keys | `verify_jwt = false` + manual auth inside function  |
| Metro ESM error on Windows         | `path.resolve()` in metro.config.js                   |
| Unix env vars don't work on Windows | `cross-env` package                                  |
| PostgREST join failure             | FK changed from `auth.users` → `profiles`            |
| `confirm()` not in React Native    | Use `Alert.alert()` instead                          |

---

## Running the App

```bash
# Development (Expo Go)
npm run dev           # starts with EXPO_PUBLIC_APP_ENV=development
npm run dev:android   # opens directly on Android emulator/device

# Build APK (for real device testing)
npx eas build --platform android --profile preview
```

### End-to-End Happy Path

1. Sign Up → confirm email
2. Log In
3. View Feed (posts load with spinner)
4. Create Post (form → submit → post appears)
5. Like Post (heart toggles, count updates)
6. View Profile
7. Log Out

---

## Next Steps (HogletHub prep)

- [ ] Add React Navigation tabs (Feed / Profile / Create)
- [ ] Profile page with edit functionality
- [ ] Image uploads via Supabase Storage
- [ ] Push notifications (Expo Notifications)
- [ ] Deep links (campus-specific feeds)
