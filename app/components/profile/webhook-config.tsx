/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Send } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function WebhookConfig() {
  const [enabled, setEnabled] = useState(false)
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetch("/api/webhook")
      .then(res => res.json() as Promise<{ enabled: boolean; url: string }>)
      .then(data => {
        setEnabled(data.enabled)
        setUrl(data.url)
      })
      .catch(console.error)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    try {
      const res = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, enabled })
      })

      if (!res.ok) throw new Error("Failed to save")

      toast({
        title: "保存成功",
        description: "Webhook 配置已更新"
      })
    } catch (_error) {
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleTest = async () => {
    if (!url) return

    setTesting(true)
    try {
      const res = await fetch("/api/webhook/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
      })

      if (!res.ok) throw new Error("测试失败")

      toast({
        title: "测试成功",
        description: "Webhook 调用成功,请检查目标服务器是否收到请求"
      })
    } catch (_error) {
      toast({
        title: "测试失败",
        description: "请检查 URL 是否正确且可访问",
        variant: "destructive"
      })
    } finally {
      setTesting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>启用 Webhook</Label>
          <div className="text-sm text-muted-foreground">
            当收到新邮件时通知指定的 URL
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={setEnabled}
        />
      </div>

      {enabled && (
        <div className="space-y-2">
          <Label htmlFor="webhook-url">Webhook URL</Label>
          <div className="flex gap-2">
            <Input
              id="webhook-url"
              placeholder="https://example.com/webhook"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
            />
            <Button type="submit" disabled={loading} className="w-20">
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "保存"
              )}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleTest}
                    disabled={testing || !url}
                  >
                    {testing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>发送测试消息到此 Webhook</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-xs text-muted-foreground">
            我们会向此 URL 发送 POST 请求,包含新邮件的相关信息
          </p>
        </div>
      )}
    </form>
  )
} 