"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { notifications as initialNotifications, type Notification } from "@/lib/data"
import {
  Bell,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  CheckCircle2,
  Trash2,
  BellOff,
} from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return Calendar
      case "report":
        return FileText
      case "medicine":
        return Pill
      case "billing":
        return CreditCard
      default:
        return Bell
    }
  }

  const getIconColor = (type: Notification["type"]) => {
    switch (type) {
      case "appointment":
        return "bg-primary/10 text-primary"
      case "report":
        return "bg-accent/10 text-accent"
      case "medicine":
        return "bg-warning/10 text-warning"
      case "billing":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return "Just now"
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All as Read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" onClick={clearAll}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BellOff className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Notifications</h3>
            <p className="text-muted-foreground text-center">
              You&apos;re all caught up! Check back later for updates.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>
              {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => {
                const Icon = getIcon(notification.type)
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${
                      notification.read
                        ? "bg-secondary/30"
                        : "bg-secondary/70 border-l-4 border-primary"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${getIconColor(notification.type)}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className={`font-medium ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notification.title}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(notification.date)}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Mark as Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
