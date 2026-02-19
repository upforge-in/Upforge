import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        // Explicitly typing 'cookiesToSet' to resolve the 'any' type error
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // Update the request cookies
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          // Create a new response with the updated request headers
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          // Set the cookies on the response so they reach the browser
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This part refreshes the session - IMPORTANT for working auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // OPTIONAL: Redirect logic
  // If no user and trying to access protected route (e.g., /admin)
  if (!user && request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  return response
}
