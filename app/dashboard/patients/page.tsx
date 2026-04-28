"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { patients as initialPatients, type Patient } from "@/lib/data"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Filter,
} from "lucide-react"
import Link from "next/link"

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [genderFilter, setGenderFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    name: "",
    fatherName: "",
    age: 0,
    gender: "Male",
    weight: 0,
    contact: "",
    email: "",
    address: "",
    place: "",
    diseaseHistory: [],
    status: "Active",
  })

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.contact.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    const matchesGender = genderFilter === "all" || patient.gender === genderFilter
    return matchesSearch && matchesStatus && matchesGender
  })

  const handleAddPatient = () => {
    const patient: Patient = {
      ...newPatient as Patient,
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      createdAt: new Date().toISOString().split("T")[0],
      lastVisit: new Date().toISOString().split("T")[0],
    }
    setPatients([...patients, patient])
    setIsAddDialogOpen(false)
    setNewPatient({
      name: "",
      fatherName: "",
      age: 0,
      gender: "Male",
      weight: 0,
      contact: "",
      email: "",
      address: "",
      place: "",
      diseaseHistory: [],
      status: "Active",
    })
  }

  const handleEditPatient = () => {
    if (editingPatient) {
      setPatients(patients.map((p) => (p.id === editingPatient.id ? editingPatient : p)))
      setEditingPatient(null)
    }
  }

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Patient Management</h1>
          <p className="text-muted-foreground">
            Manage and view all patient records
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>
                  Enter the patient&apos;s information below
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                      value={newPatient.name}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, name: e.target.value })
                      }
                      placeholder="Patient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Father&apos;s Name</label>
                    <Input
                      value={newPatient.fatherName}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, fatherName: e.target.value })
                      }
                      placeholder="Father's name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Age</label>
                    <Input
                      type="number"
                      value={newPatient.age || ""}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Age"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Gender</label>
                    <Select
                      value={newPatient.gender}
                      onValueChange={(value) =>
                        setNewPatient({ ...newPatient, gender: value as Patient["gender"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Weight (kg)</label>
                    <Input
                      type="number"
                      value={newPatient.weight || ""}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, weight: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Weight"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Contact</label>
                    <Input
                      value={newPatient.contact}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, contact: e.target.value })
                      }
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={newPatient.email}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, email: e.target.value })
                      }
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={newPatient.address}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, address: e.target.value })
                      }
                      placeholder="Full address"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Place/City</label>
                    <Input
                      value={newPatient.place}
                      onChange={(e) =>
                        setNewPatient({ ...newPatient, place: e.target.value })
                      }
                      placeholder="City"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient}>Add Patient</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name, ID, or contact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Gender</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Patients</CardTitle>
          <CardDescription>
            {filteredPatients.length} patient{filteredPatients.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-xs text-muted-foreground">{patient.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {patient.age} yrs / {patient.gender}
                    </TableCell>
                    <TableCell>{patient.contact}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          patient.status === "Active"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setEditingPatient(patient)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeletePatient(patient.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Patient Dialog */}
      <Dialog open={!!editingPatient} onOpenChange={() => setEditingPatient(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>
              Update the patient&apos;s information
            </DialogDescription>
          </DialogHeader>
          {editingPatient && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={editingPatient.name}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Father&apos;s Name</label>
                  <Input
                    value={editingPatient.fatherName}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, fatherName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Age</label>
                  <Input
                    type="number"
                    value={editingPatient.age}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        age: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Gender</label>
                  <Select
                    value={editingPatient.gender}
                    onValueChange={(value) =>
                      setEditingPatient({
                        ...editingPatient,
                        gender: value as Patient["gender"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input
                    type="number"
                    value={editingPatient.weight}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        weight: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact</label>
                  <Input
                    value={editingPatient.contact}
                    onChange={(e) =>
                      setEditingPatient({ ...editingPatient, contact: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select
                    value={editingPatient.status}
                    onValueChange={(value) =>
                      setEditingPatient({
                        ...editingPatient,
                        status: value as Patient["status"],
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingPatient(null)}>
              Cancel
            </Button>
            <Button onClick={handleEditPatient}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
