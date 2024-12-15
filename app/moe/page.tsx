import { Header } from "@/components/layout/header"
import { ThreeColumnLayout } from "@/components/emails/three-column-layout"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const runtime = "edge"

export default async function MoePage() {
  const session = await auth()
  
  if (!session) {
    redirect("/")
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 h-screen">
      <div className="container mx-auto h-full px-4 lg:px-8 max-w-[1600px]">
        <Header />
        <main className="h-full">
          <ThreeColumnLayout />
        </main>
      </div>
    </div>
  )
} 