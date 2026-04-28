"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { appointments as initialAppointments, patients, type Appointment } from "@/lib/data"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  Edit,
  Trash2,
} from "lucide-react"

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    type: "Consultation",
    notes: "",
  })

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "scheduled" && appointment.status === "Scheduled") ||
      (activeTab === "completed" && appointment.status === "Completed") ||
      (activeTab === "cancelled" && appointment.status === "Cancelled")
    return matchesSearch && matchesTab
  })

  const handleAddAppointment = () => {
    const patient = patients.find((p) => p.id === newAppointment.patientId)
    if (patient) {
      const appointment: Appointment = {
        id: `A${String(appointments.length + 1).padStart(3, "0")}`,
        patientId: newAppointment.patientId,
        patientName: patient.name,
        date: newAppointment.date,
        time: newAppointment.time,
        type: newAppointment.type,
        status: "Scheduled",
        notes: newAppointment.notes,
      }
      setAppointments([...appointments, appointment])
      setIsAddDialogOpen(false)
      setNewAppointment({
        patientId: "",
        date: new Date().toISOString().split("T")[0],
        time: "09:00",
        type: "Consultation",
        notes: "",
      })
    }
  }

  const handleUpdateStatus = (id: string, status: Appointment["status"]) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status } : a))
    )
  }

  const handleDeleteAppointment = (id: string) => {
    setAppointments(appointments.filter((a) => a.id !== id))
  }

  const handleEditAppointment = () => {
    if (editingAppointment) {
      setAppointments(
        appointments.map((a) =>
          a.id === editingAppointment.id ? editingAppointment : a
        )
      )
      setEditingAppointment(null)
    }
  }

  const appointmentTypes = [
    "Consultation",
    "Follow-up",
    "Check-up",
    "Therapy Session",
    "Evaluation",
    "Emergency",
  ]

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "14:00", "14:30", "15:00", "15:30", "16:00",
    "16:30", "17:00", "17:30", "18:00",
  ]

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Scheduled":
        return "bg-primary/10 text-primary"
      case "Completed":
        return "bg-success/10 text-success"
      case "Cancelled":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-muted-foreground">
            Manage patient appointments and schedules
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Create a new appointment for a patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Patient</label>
                <Select
                  value={newAppointment.patientId}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, patientId: value })
                  }
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) =>
                      setNewAppointment({ ...newAppointment, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={newAppointment.time}
                    onValueChange={(value) =>
                      setNewAppointment({ ...newAppointment, time: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Appointment Type</label>
                <Select
                  value={newAppointment.type}
                  onValueChange={(value) =>
                    setNewAppointment({ ...newAppointment, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes (Optional)</label>
                <Input
                  placeholder="Any additional notes..."
                  value={newAppointment.notes}
                  onChange={(e) =>
                    setNewAppointment({ ...newAppointment, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddAppointment} disabled={!newAppointment.patientId}>
                Schedule Appointment
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{appointment.patientName}</CardTitle>
                        <CardDescription>{appointment.id}</CardDescription>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 text-xs bg-secondary rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  {appointment.notes && (
                    <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                  )}
                  <div className="flex gap-2 pt-2">
                    {appointment.status === "Scheduled" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleUpdateStatus(appointment.id, "Completed")}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Complete
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUpdateStatus(appointment.id, "Cancelled")}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingAppointment(appointment)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteAppointment(appointment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAppointments.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Appointments Found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  No appointments match your current filters.
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  Schedule Appointment
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Appointment Dialog */}
      <Dialog open={!!editingAppointment} onOpenChange={() => setEditingAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>
              Update appointment details
            </DialogDescription>
          </DialogHeader>
          {editingAppointment && (
            <div className="space-y-4 py-4">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="font-medium">{editingAppointment.patientName}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={editingAppointment.date}
                    onChange={(e) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={editingAppointment.time}
                    onValueChange={(value) =>
                      setEditingAppointment({
                        ...editingAppointment,
                        time: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Appointment Type</label>
                <Select
                  value={editingAppointment.type}
                  onValueChange={(value) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      type: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {appointmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editingAppointment.status}
                  onValueChange={(value) =>
                    setEditingAppointment({
                      ...editingAppointment,
                      status: value as Appointment["status"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingAppointment(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditAppointment}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
