import { Header } from "@/components/layout/header"
import { ProfileCard } from "@/components/profile/profile-card"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export const runtime = "edge"

export default async function ProfilePage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 h-screen">
      <div className="container mx-auto h-full px-4 lg:px-8 max-w-[1600px]">
        <Header />
        <main className="h-full">
          <div className="pt-20 pb-5 h-full">
            <ProfileCard user={session.user} />
          </div>
        </main>
      </div>
    </div>
  )
} 