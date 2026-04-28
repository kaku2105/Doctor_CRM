"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patients, appointments, medicalReports, prescriptions, invoices } from "@/lib/data"
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Activity,
  Edit,
} from "lucide-react"

interface PatientProfilePageProps {
  params: Promise<{ id: string }>
}

export default function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { id } = use(params)
  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    notFound()
  }

  const patientAppointments = appointments.filter((a) => a.patientId === patient.id)
  const patientReports = medicalReports.filter((r) => r.patientId === patient.id)
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient.id)
  const patientInvoices = invoices.filter((i) => i.patientId === patient.id)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/patients">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Patient Profile</h1>
          <p className="text-muted-foreground">View and manage patient information</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Patient Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary text-3xl font-bold">
                {patient.name.charAt(0)}
              </div>
              <span
                className={`mt-3 px-3 py-1 text-sm rounded-full ${
                  patient.status === "Active"
                    ? "bg-success/10 text-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {patient.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="flex-1 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Full Name</span>
                </div>
                <p className="font-medium">{patient.name}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span className="text-sm">Father&apos;s Name</span>
                </div>
                <p className="font-medium">{patient.fatherName}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Age / Gender / Weight</span>
                </div>
                <p className="font-medium">
                  {patient.age} yrs / {patient.gender} / {patient.weight} kg
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">Contact</span>
                </div>
                <p className="font-medium">{patient.contact}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">Email</span>
                </div>
                <p className="font-medium">{patient.email}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Address</span>
                </div>
                <p className="font-medium">
                  {patient.address}, {patient.place}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Patient Since</span>
                </div>
                <p className="font-medium">{patient.createdAt}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Last Visit</span>
                </div>
                <p className="font-medium">{patient.lastVisit}</p>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm">Disease History</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {patient.diseaseHistory.map((disease, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                    >
                      {disease}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Prescriptions
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Appointment History</CardTitle>
              <CardDescription>
                All appointments for this patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patientAppointments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No appointments found
                </p>
              ) : (
                <div className="space-y-4">
                  {patientAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === "Completed"
                            ? "bg-success/10 text-success"
                            : appointment.status === "Cancelled"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Medical Reports</CardTitle>
                <CardDescription>
                  All medical reports and assessments
                </CardDescription>
              </div>
              <Button asChild>
                <Link href={`/dashboard/reports/new?patientId=${patient.id}`}>
                  Add Report
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {patientReports.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No reports found
                </p>
              ) : (
                <div className="space-y-4">
                  {patientReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">{report.diagnosis}</p>
                        <p className="text-sm text-muted-foreground">
                          {report.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/reports/${report.id}`}>
                          View Report
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescriptions</CardTitle>
              <CardDescription>
                All prescriptions issued to this patient
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patientPrescriptions.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No prescriptions found
                </p>
              ) : (
                <div className="space-y-4">
                  {patientPrescriptions.map((prescription) => (
                    <div
                      key={prescription.id}
                      className="p-4 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className="font-medium">
                          Prescription #{prescription.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {prescription.date}
                        </p>
                      </div>
                      <div className="space-y-2">
                        {prescription.medicines.map((medicine) => (
                          <div
                            key={medicine.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span>
                              {medicine.name} ({medicine.dosage})
                            </span>
                            <span className="text-muted-foreground">
                              {[
                                medicine.morning && "Morning",
                                medicine.afternoon && "Afternoon",
                                medicine.night && "Night",
                              ]
                                .filter(Boolean)
                                .join(", ")}{" "}
                              - {medicine.duration} days
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>
                All invoices and payment records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {patientInvoices.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No invoices found
                </p>
              ) : (
                <div className="space-y-4">
                  {patientInvoices.map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                    >
                      <div>
                        <p className="font-medium">Invoice #{invoice.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">
                          Rs. {invoice.total.toLocaleString()}
                        </p>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            invoice.status === "Paid"
                              ? "bg-success/10 text-success"
                              : invoice.status === "Overdue"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
