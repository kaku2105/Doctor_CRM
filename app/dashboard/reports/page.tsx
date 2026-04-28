"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { medicalReports, patients } from "@/lib/data"
import { Search, Plus, FileText, Eye, Download, Filter } from "lucide-react"

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [dateFilter, setDateFilter] = useState<string>("all")

  const filteredReports = medicalReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Medical Reports</h1>
          <p className="text-muted-foreground">
            View and manage patient medical reports
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/reports/new">
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports by patient name, diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const patient = patients.find((p) => p.id === report.patientId)
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.patientName}</CardTitle>
                      <CardDescription>{report.id}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{report.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Age/Gender</p>
                    <p className="font-medium">
                      {report.age} / {report.gender}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Diagnosis</p>
                  <p className="font-medium">{report.diagnosis}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(report.conditions)
                    .filter(([, value]) => value)
                    .slice(0, 3)
                    .map(([key]) => (
                      <span
                        key={key}
                        className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full"
                      >
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    ))}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/dashboard/reports/${report.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Reports Found</h3>
            <p className="text-muted-foreground text-center mb-4">
              No medical reports match your search criteria.
            </p>
            <Button asChild>
              <Link href="/dashboard/reports/new">Create New Report</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
