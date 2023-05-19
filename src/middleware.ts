import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const homeURL = new URL('/', request.url).toString()
  const joinURL = new URL('/join', request.url).toString()
  const dossierURL = new URL('/dossier', request.url).toString()
  const isAgent = request.cookies.get('isAgent')?.value

  if (!request.cookies.has('isAgent') && request.url !== homeURL) {
    return NextResponse.redirect(homeURL, {
      headers: {
        'Set-Cookie': `redirectTo=${homeURL}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  if (isAgent === 'true' && request.url !== dossierURL) {
    return NextResponse.redirect(dossierURL, {
      headers: {
        'Set-Cookie': `redirectTo=${dossierURL}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  if (isAgent === 'false' && request.url !== joinURL) {
    return NextResponse.redirect(joinURL, {
      headers: {
        'Set-Cookie': `redirectTo=${joinURL}; Path=/; HttpOnly; max-age=20`,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/join', '/dossier'],
}
