"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { patients } from "@/lib/data"
import { ArrowLeft, Save, Printer, Upload } from "lucide-react"

function NewReportForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preSelectedPatientId = searchParams.get("patientId")

  const [formData, setFormData] = useState({
    patientId: preSelectedPatientId || "",
    date: new Date().toISOString().split("T")[0],
    temperature: "",
    bp: "",
    pulse: "",
    sugarLevel: "",
    diagnosis: "",
    cerebralFluidShrink: false,
    cerebralFluidExpand: false,
    conditions: {
      autism: false,
      adhd: false,
      speechDisorder: false,
      hyperactive: false,
      sleepProblem: false,
      concentration: false,
      movementIssues: false,
      upperLimb: false,
      lowerLimb: false,
    },
    doctorNotes: "",
  })

  const selectedPatient = patients.find((p) => p.id === formData.patientId)

  const handleConditionChange = (condition: keyof typeof formData.conditions) => {
    setFormData({
      ...formData,
      conditions: {
        ...formData.conditions,
        [condition]: !formData.conditions[condition],
      },
    })
  }

  const handleSave = () => {
    // In a real app, this would save to a database
    console.log("Saving report:", formData)
    router.push("/dashboard/reports")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/reports">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">New Medical Report</h1>
          <p className="text-muted-foreground">Create a detailed patient medical report</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Patient Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>Select patient and enter visit details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Patient</label>
                <Select
                  value={formData.patientId}
                  onValueChange={(value) => setFormData({ ...formData, patientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map((patient) => (
                      <SelectItem key={patient.id} value={patient.id}>
                        {patient.name} ({patient.id})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date of Visit</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>

            {selectedPatient && (
              <div className="p-4 rounded-lg bg-secondary/50 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Name</p>
                  <p className="font-medium">{selectedPatient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Father&apos;s Name</p>
                  <p className="font-medium">{selectedPatient.fatherName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Place</p>
                  <p className="font-medium">{selectedPatient.place}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{selectedPatient.weight} kg</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vitals */}
        <Card>
          <CardHeader>
            <CardTitle>Vitals</CardTitle>
            <CardDescription>Record patient vitals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Temperature (F)</label>
              <Input
                type="number"
                step="0.1"
                placeholder="98.6"
                value={formData.temperature}
                onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Blood Pressure</label>
              <Input
                placeholder="120/80"
                value={formData.bp}
                onChange={(e) => setFormData({ ...formData, bp: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Pulse (bpm)</label>
              <Input
                type="number"
                placeholder="72"
                value={formData.pulse}
                onChange={(e) => setFormData({ ...formData, pulse: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sugar Level (mg/dL)</label>
              <Input
                type="number"
                placeholder="100"
                value={formData.sugarLevel}
                onChange={(e) => setFormData({ ...formData, sugarLevel: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Diagnosis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Diagnosis</CardTitle>
            <CardDescription>Enter diagnosis and medical findings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Primary Diagnosis</label>
              <Input
                placeholder="Enter diagnosis"
                value={formData.diagnosis}
                onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
              />
            </div>

            {/* Cerebral Fluid */}
            <div className="p-4 rounded-lg border">
              <p className="font-medium mb-3">Cerebral Fluid</p>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.cerebralFluidShrink}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, cerebralFluidShrink: !!checked })
                    }
                  />
                  <span className="text-sm">Shrink</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={formData.cerebralFluidExpand}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, cerebralFluidExpand: !!checked })
                    }
                  />
                  <span className="text-sm">Expand</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>Check applicable conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
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
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={formData.conditions[key as keyof typeof formData.conditions]}
                    onCheckedChange={() =>
                      handleConditionChange(key as keyof typeof formData.conditions)
                    }
                  />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Doctor Notes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Doctor&apos;s Notes</CardTitle>
            <CardDescription>Add observations and recommendations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Enter detailed notes, observations, and treatment recommendations..."
              rows={5}
              value={formData.doctorNotes}
              onChange={(e) => setFormData({ ...formData, doctorNotes: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Upload Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Reports</CardTitle>
            <CardDescription>Attach scanned reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline" size="sm">
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function NewReportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewReportForm />
    </Suspense>
  )
}
