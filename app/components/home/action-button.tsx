"use client"

import { Button } from "@/components/ui/button"
import { Mail, Github } from "lucide-react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

interface ActionButtonProps {
  isLoggedIn?: boolean
}

export function ActionButton({ isLoggedIn }: ActionButtonProps) {
  const router = useRouter()

  if (isLoggedIn) {
    return (
      <Button 
        size="lg" 
        onClick={() => router.push("/moe")}
        className="gap-2 bg-primary hover:bg-primary/90 text-white px-8"
      >
        <Mail className="w-5 h-5" />
        进入邮箱
      </Button>
    )
  }

  return (
    <Button 
      size="lg" 
      onClick={() => signIn("github", { callbackUrl: "/moe" })}
      className="gap-2 bg-primary hover:bg-primary/90 text-white px-8"
    >
      <Github className="w-5 h-5" />
      使用 GitHub 登录
    </Button>
  )
} 