import { NextRequest, NextResponse } from 'next/server';

// Lingue supportate
const locales = ['it', 'en'] as const;
const defaultLocale = 'it' as const;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Controlla se l'URL ha già un locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Se l'URL non ha un locale, reindirizza al locale di default
  if (!pathnameHasLocale) {
    // Per la root, reindirizza a /it
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/it', request.url));
    }
    
    // Per altri percorsi, aggiungi /it all'inizio
    if (!pathname.startsWith('/studio') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
      return NextResponse.redirect(new URL(`/it${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Applica il middleware a tutti i percorsi eccetto:
    // - API routes
    // - _next (Next.js internals)
    // - file statici
    '/((?!api|_next|studio|.*\\..*).*)',
  ],
};