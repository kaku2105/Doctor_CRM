"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { medicalReports } from "@/lib/data"
import {
  ArrowLeft,
  Download,
  Printer,
  Edit,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react"

interface ReportDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ReportDetailPage({ params }: ReportDetailPageProps) {
  const { id } = use(params)
  const report = medicalReports.find((r) => r.id === id)

  if (!report) {
    notFound()
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading report:", report.id)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/reports">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Medical Report</h1>
          <p className="text-muted-foreground">Report #{report.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid gap-6 lg:grid-cols-3 print:grid-cols-1">
        {/* Patient Information */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Patient Information</CardTitle>
                <CardDescription>Personal and visit details</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Date of Visit</p>
                <p className="font-semibold">{report.date}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Patient Name</p>
                <p className="font-medium">{report.patientName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Father&apos;s Name</p>
                <p className="font-medium">{report.fatherName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Patient ID</p>
                <p className="font-medium">{report.patientId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{report.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{report.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{report.weight} kg</p>
              </div>
              <div className="sm:col-span-3">
                <p className="text-sm text-muted-foreground">Place</p>
                <p className="font-medium">{report.place}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        <Card>
          <CardHeader>
            <CardTitle>Vitals</CardTitle>
            <CardDescription>Recorded measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Temperature</span>
              <span className="font-semibold">{report.temperature}°F</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Blood Pressure</span>
              <span className="font-semibold">{report.bp} mmHg</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Pulse</span>
              <span className="font-semibold">{report.pulse} bpm</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-muted-foreground">Sugar Level</span>
              <span className="font-semibold">{report.sugarLevel} mg/dL</span>
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
            <CardDescription>Medical findings and assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-1">Primary Diagnosis</p>
              <p className="font-medium text-lg">{report.diagnosis}</p>
            </div>

            <div className="p-4 rounded-lg border">
              <p className="font-medium mb-3">Cerebral Fluid Status</p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  {report.cerebralFluidShrink ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span>Shrink</span>
                </div>
                <div className="flex items-center gap-2">
                  {report.cerebralFluidExpand ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <XCircle className="h-5 w-5 text-muted-foreground" />
                  )}
                  <span>Expand</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Identified conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { key: "autism", label: "Autism" },
                { key: "adhd", label: "ADHD" },
                { key: "speechDisorder", label: "Speech Disorder" },
                { key: "hyperactive", label: "Hyperactive" },
                { key: "sleepProblem", label: "Sleep Problem" },
                { key: "concentration", label: "Concentration Issues" },
                { key: "movementIssues", label: "Movement Issues" },
                { key: "upperLimb", label: "Upper Limb Issues" },
                { key: "lowerLimb", label: "Lower Limb Issues" },
              ].map(({ key, label }) => {
                const isActive = report.conditions[key as keyof typeof report.conditions]
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-2 p-2 rounded-lg ${
                      isActive ? "bg-accent/10" : "bg-secondary/30"
                    }`}
                  >
                    {isActive ? (
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                    ) : (
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className={isActive ? "font-medium" : "text-muted-foreground"}>
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Doctor's Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doctor&apos;s Notes</CardTitle>
            <CardDescription>Observations and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="whitespace-pre-wrap">{report.doctorNotes}</p>
            </div>
          </CardContent>
        </Card>

        {/* Uploaded Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Attached Files</CardTitle>
            <CardDescription>Uploaded reports and documents</CardDescription>
          </CardHeader>
          <CardContent>
            {report.uploadedReports.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No files attached
              </p>
            ) : (
              <div className="space-y-2">
                {report.uploadedReports.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{file}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
