"use client"

import { User } from "next-auth"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Github, Mail, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { WebhookConfig } from "./webhook-config"

interface ProfileCardProps {
  user: User
}

export function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 用户信息卡片 */}
      <div className="bg-background rounded-lg border-2 border-primary/20 p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name || "用户头像"}
                width={80}
                height={80}
                className="rounded-full ring-2 ring-primary/20"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold truncate">{user.name}</h2>
              <div className="flex items-center gap-1 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                <Github className="w-3 h-3" />
                已关联
              </div>
            </div>
            <p className="text-sm text-muted-foreground truncate mt-1">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      {/* Webhook 配置卡片 */}
      <div className="bg-background rounded-lg border-2 border-primary/20 p-6">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Webhook 配置</h2>
        </div>
        <WebhookConfig />
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 px-1">
        <Button 
          onClick={() => router.push("/moe")}
          className="gap-2 flex-1"
        >
          <Mail className="w-4 h-4" />
          返回邮箱
        </Button>
        <Button 
          variant="outline" 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex-1"
        >
          退出登录
        </Button>
      </div>
    </div>
  )
} 