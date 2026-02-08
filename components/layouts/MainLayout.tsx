'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className={`min-h-screen flex flex-col ${isHome ? 'overflow-hidden' : ''}`}>
      <Header className={isHome ? "fixed top-0 left-0 z-50" : "sticky top-0"} />
      <main className={`flex-grow ${isHome ? 'overflow-hidden' : ''}`}>
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  )
}
