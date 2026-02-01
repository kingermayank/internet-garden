# Password Protection

Simple password gate to protect site access.

## Setup

Add this to your `.env.local` file:

```bash
SITE_PASSWORD=your_secret_password_here
```

That's it! Visitors will need to enter this password to access the site.

## How It Works

1. Visitor goes to any page
2. Middleware checks for `site-auth` cookie
3. If no cookie → redirect to `/login`
4. Visitor enters password
5. Password checked against `SITE_PASSWORD` env var
6. If correct → cookie set for 30 days, redirect to home

## Files

- `middleware.ts` - Checks auth cookie on every request
- `app/login/page.tsx` - Password entry form
- `app/api/auth/route.ts` - Validates password, sets cookie

## Changing the Password

1. Update `SITE_PASSWORD` in `.env.local`
2. Restart the dev server
3. Existing users will stay logged in (cookie still valid)
4. To force everyone to re-enter: change the cookie name in `middleware.ts` and `app/api/auth/route.ts`
