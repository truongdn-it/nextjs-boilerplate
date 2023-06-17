import React from 'react'
import { Open_Sans } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-sans',
})

function Layout({ children }: { children: React.ReactNode }) {
  return <main className={openSans.className}>{children}</main>
}

export default Layout
