'use client'

/* eslint-disable import/no-unused-modules */
import '@styles/globals.css'

import React, { ReactNode } from 'react'
import { Open_Sans } from 'next/font/google'
import QueryClientProvider from '@contexts/QueryClientProvider'
import { cn } from '@utils/helpers'

const openSans = Open_Sans({
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(openSans.variable, 'font-sans')}>
        <QueryClientProvider>{children}</QueryClientProvider>
      </body>
    </html>
  )
}
