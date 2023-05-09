/* eslint-disable import/no-unused-modules */
import '@styles/globals.scss'
export const runtime = 'edge' // 'nodejs' (default) | 'edge'

import { ReactNode } from 'react'

export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}

export default function RootLayout({
  children,
  parallel,
}: {
  children: ReactNode
  parallel: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {parallel}
      </body>
    </html>
  )
}
