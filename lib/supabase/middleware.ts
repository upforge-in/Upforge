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
        // This specific type definition fixes the build error
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          // Sync cookies with the request
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          
          // Create a new response to ensure headers are updated
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          // Sync cookies with the response to send back to the browser
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This is required to trigger session refreshing and use the setAll method
  await supabase.auth.getUser()

  return response
}
