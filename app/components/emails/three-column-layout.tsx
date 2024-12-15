"use client"

import { useState } from "react"
import { EmailList } from "./email-list"
import { MessageList } from "./message-list"
import { MessageView } from "./message-view"
import { cn } from "@/lib/utils"

interface Email {
  id: string
  address: string
}

export function ThreeColumnLayout() {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null)
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null)

  const columnClass = "border-2 border-primary/20 bg-background rounded-lg overflow-hidden flex flex-col"
  const headerClass = "p-2 border-b-2 border-primary/20 flex items-center justify-between shrink-0"
  const titleClass = "text-sm font-bold px-2"

  // 移动端视图逻辑
  const getMobileView = () => {
    if (selectedMessageId) return "message"
    if (selectedEmail) return "emails"
    return "list"
  }

  const mobileView = getMobileView()

  return (
    <div className="pb-5 pt-20 h-full flex flex-col">
      {/* 桌面端三栏布局 */}
      <div className="hidden lg:grid grid-cols-12 gap-4 h-full min-h-0">
        <div className={cn("col-span-3", columnClass)}>
          <div className={headerClass}>
            <h2 className={titleClass}>我的邮箱</h2>
          </div>
          <div className="flex-1 overflow-auto">
            <EmailList 
              onEmailSelect={setSelectedEmail}
              selectedEmailId={selectedEmail?.id}
            />
          </div>
        </div>

        <div className={cn("col-span-4", columnClass)}>
          <div className={headerClass}>
            <h2 className={titleClass}>
              {selectedEmail ? (
                <span className="truncate block">{selectedEmail.address}</span>
              ) : (
                "选择邮箱查看消息"
              )}
            </h2>
          </div>
          {selectedEmail && (
            <div className="flex-1 overflow-auto">
              <MessageList
                email={selectedEmail}
                onMessageSelect={setSelectedMessageId}
                selectedMessageId={selectedMessageId}
              />
            </div>
          )}
        </div>

        <div className={cn("col-span-5", columnClass)}>
          <div className={headerClass}>
            <h2 className={titleClass}>
              {selectedMessageId ? "邮件内容" : "选择邮件查看详情"}
            </h2>
          </div>
          {selectedEmail && selectedMessageId && (
            <div className="flex-1 overflow-auto">
              <MessageView
                emailId={selectedEmail.id}
                messageId={selectedMessageId}
                onClose={() => setSelectedMessageId(null)}
              />
            </div>
          )}
        </div>
      </div>

      {/* 移动端单栏布局 */}
      <div className="lg:hidden h-full min-h-0">
        <div className={cn("h-full", columnClass)}>
          {mobileView === "list" && (
            <>
              <div className={headerClass}>
                <h2 className={titleClass}>我的邮箱</h2>
              </div>
              <div className="flex-1 overflow-auto">
                <EmailList 
                  onEmailSelect={(email) => {
                    setSelectedEmail(email)
                  }}
                  selectedEmailId={selectedEmail?.id}
                />
              </div>
            </>
          )}
          
          {mobileView === "emails" && selectedEmail && (
            <div className="h-full flex flex-col">
              <div className={headerClass}>
                <button
                  onClick={() => {
                    setSelectedEmail(null)
                  }}
                  className="text-sm text-primary"
                >
                  ← 返回邮箱列表
                </button>
                <span className="text-sm font-medium truncate">
                  {selectedEmail.address}
                </span>
              </div>
              <div className="flex-1 overflow-auto">
                <MessageList
                  email={selectedEmail}
                  onMessageSelect={setSelectedMessageId}
                  selectedMessageId={selectedMessageId}
                />
              </div>
            </div>
          )}
          
          {mobileView === "message" && selectedEmail && selectedMessageId && (
            <div className="h-full flex flex-col">
              <div className={headerClass}>
                <button
                  onClick={() => setSelectedMessageId(null)}
                  className="text-sm text-primary"
                >
                  ← 返回消息列表
                </button>
                <span className="text-sm font-medium">邮件内容</span>
              </div>
              <div className="flex-1 overflow-auto">
                <MessageView
                  emailId={selectedEmail.id}
                  messageId={selectedMessageId}
                  onClose={() => setSelectedMessageId(null)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 