export { default } from 'next-auth/middleware'


export const config = {
  matcher: ['/at/:spaceId*', '/dashboard/:path*', '/spaces/:path*'],
}
