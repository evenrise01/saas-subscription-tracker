// app/(protected)/layout.tsx
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import {Sidebar, SidebarProvider, SidebarTrigger} from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
// import Header from '@/components/Header'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen">
       <SidebarProvider>
        <AppSidebar/>
      <div className="flex-1">
        {/* <Header /> */}
        <main className="p-4">
        <SidebarTrigger />
          {children}
        </main>
      </div>
      </SidebarProvider>
    </div>
  )
}