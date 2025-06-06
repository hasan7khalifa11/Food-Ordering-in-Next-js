"use client"
import { SessionProvider } from 'next-auth/react'

const GetSessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default GetSessionProvider