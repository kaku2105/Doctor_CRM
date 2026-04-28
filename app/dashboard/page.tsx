"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  dashboardStats,
  patientGrowthData,
  appointmentData,
  revenueData,
  appointments,
  patients,
} from "@/lib/data"
import {
  Users,
  Calendar,
  FileText,
  Activity,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Clock,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import Link from "next/link"

const statCards = [
  {
    title: "Total Patients",
    value: dashboardStats.totalPatients,
    icon: Users,
    trend: "+12%",
    trendUp: true,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Today's Appointments",
    value: dashboardStats.todayAppointments,
    icon: Calendar,
    trend: "+3",
    trendUp: true,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Pending Reports",
    value: dashboardStats.pendingReports,
    icon: FileText,
    trend: "-5",
    trendUp: false,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Active Treatments",
    value: dashboardStats.activeTreatments,
    icon: Activity,
    trend: "+8%",
    trendUp: true,
    color: "bg-success/10 text-success",
  },
]

export default function DashboardPage() {
  const { doctor } = useAuth()

  const todayAppointments = appointments
    .filter((a) => a.status === "Scheduled")
    .slice(0, 5)

  const recentPatients = patients.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome back, {doctor?.name?.split(" ")[0] || "Doctor"}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s happening at your clinic today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/patients">
              <Users className="h-4 w-4 mr-2" />
              Add Patient
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trendUp ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-destructive rotate-180" />
                    )}
                    <span className={stat.trendUp ? "text-success" : "text-destructive"}>
                      {stat.trend}
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Revenue</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold flex items-center">
                  <IndianRupee className="h-6 w-6" />
                  {dashboardStats.monthlyRevenue.toLocaleString()}
                </span>
                <span className="text-sm text-success flex items-center">
                  <ArrowUpRight className="h-4 w-4" />
                  +18.2%
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-xl font-semibold flex items-center justify-end">
                <IndianRupee className="h-4 w-4" />
                {dashboardStats.weeklyRevenue.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.55 0.15 240)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="oklch(0.55 0.15 240)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 240)" />
                <XAxis dataKey="month" stroke="oklch(0.5 0.02 240)" fontSize={12} />
                <YAxis stroke="oklch(0.5 0.02 240)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(1 0 0)",
                    border: "1px solid oklch(0.9 0.01 240)",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="oklch(0.55 0.15 240)"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Patient Growth Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Growth</CardTitle>
            <CardDescription>New patients over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 240)" />
                  <XAxis dataKey="month" stroke="oklch(0.5 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0.02 240)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="patients"
                    stroke="oklch(0.65 0.18 160)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.65 0.18 160)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Appointments</CardTitle>
            <CardDescription>Appointments scheduled this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.01 240)" />
                  <XAxis dataKey="day" stroke="oklch(0.5 0.02 240)" fontSize={12} />
                  <YAxis stroke="oklch(0.5 0.02 240)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.01 240)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="appointments"
                    fill="oklch(0.55 0.15 240)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today&apos;s Appointments</CardTitle>
              <CardDescription>Scheduled for today</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/appointments">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No appointments scheduled for today
                </p>
              ) : (
                todayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {appointment.time}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Patients</CardTitle>
              <CardDescription>Latest patient registrations</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/patients">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-semibold">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} yrs | {patient.gender}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      patient.status === "Active"
                        ? "bg-success/10 text-success"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {patient.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
