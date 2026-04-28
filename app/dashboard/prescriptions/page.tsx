"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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
import { prescriptions as initialPrescriptions, patients, type Medicine, type Prescription } from "@/lib/data"
import { Search, Plus, Printer, Eye, Pill, Trash2 } from "lucide-react"

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(initialPrescriptions)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewingPrescription, setViewingPrescription] = useState<Prescription | null>(null)
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    notes: "",
    medicines: [] as Medicine[],
  })
  const [newMedicine, setNewMedicine] = useState<Partial<Medicine>>({
    name: "",
    dosage: "",
    morning: false,
    afternoon: false,
    night: false,
    duration: 7,
    instructions: "",
  })

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    prescription.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addMedicine = () => {
    if (newMedicine.name && newMedicine.dosage) {
      const medicine: Medicine = {
        ...newMedicine as Medicine,
        id: `M${Date.now()}`,
      }
      setNewPrescription({
        ...newPrescription,
        medicines: [...newPrescription.medicines, medicine],
      })
      setNewMedicine({
        name: "",
        dosage: "",
        morning: false,
        afternoon: false,
        night: false,
        duration: 7,
        instructions: "",
      })
    }
  }

  const removeMedicine = (id: string) => {
    setNewPrescription({
      ...newPrescription,
      medicines: newPrescription.medicines.filter((m) => m.id !== id),
    })
  }

  const handleSavePrescription = () => {
    const patient = patients.find((p) => p.id === newPrescription.patientId)
    if (patient && newPrescription.medicines.length > 0) {
      const prescription: Prescription = {
        id: `PR${String(prescriptions.length + 1).padStart(3, "0")}`,
        patientId: newPrescription.patientId,
        patientName: patient.name,
        date: new Date().toISOString().split("T")[0],
        medicines: newPrescription.medicines,
        notes: newPrescription.notes,
      }
      setPrescriptions([...prescriptions, prescription])
      setIsAddDialogOpen(false)
      setNewPrescription({ patientId: "", notes: "", medicines: [] })
    }
  }

  const handlePrint = (prescription: Prescription) => {
    // In a real app, this would open a print dialog with formatted prescription
    console.log("Printing prescription:", prescription.id)
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">
            Manage patient prescriptions and medications
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Prescription</DialogTitle>
              <DialogDescription>
                Add medicines and dosage instructions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Patient Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Patient</label>
                <Select
                  value={newPrescription.patientId}
                  onValueChange={(value) =>
                    setNewPrescription({ ...newPrescription, patientId: value })
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

              {/* Add Medicine Form */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Add Medicine</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Medicine Name</label>
                      <Input
                        placeholder="Enter medicine name"
                        value={newMedicine.name}
                        onChange={(e) =>
                          setNewMedicine({ ...newMedicine, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Dosage</label>
                      <Input
                        placeholder="e.g., 500mg, 10ml"
                        value={newMedicine.dosage}
                        onChange={(e) =>
                          setNewMedicine({ ...newMedicine, dosage: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={newMedicine.morning}
                        onCheckedChange={(checked) =>
                          setNewMedicine({ ...newMedicine, morning: !!checked })
                        }
                      />
                      <span className="text-sm">Morning</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={newMedicine.afternoon}
                        onCheckedChange={(checked) =>
                          setNewMedicine({ ...newMedicine, afternoon: !!checked })
                        }
                      />
                      <span className="text-sm">Afternoon</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={newMedicine.night}
                        onCheckedChange={(checked) =>
                          setNewMedicine({ ...newMedicine, night: !!checked })
                        }
                      />
                      <span className="text-sm">Night</span>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Duration (days)</label>
                      <Input
                        type="number"
                        value={newMedicine.duration}
                        onChange={(e) =>
                          setNewMedicine({
                            ...newMedicine,
                            duration: parseInt(e.target.value) || 7,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Special Instructions</label>
                      <Input
                        placeholder="e.g., Take after meals"
                        value={newMedicine.instructions}
                        onChange={(e) =>
                          setNewMedicine({ ...newMedicine, instructions: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={addMedicine} variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </Button>
                </CardContent>
              </Card>

              {/* Added Medicines List */}
              {newPrescription.medicines.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">
                      Medicines ({newPrescription.medicines.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {newPrescription.medicines.map((medicine) => (
                        <div
                          key={medicine.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                        >
                          <div>
                            <p className="font-medium">
                              {medicine.name} ({medicine.dosage})
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {[
                                medicine.morning && "Morning",
                                medicine.afternoon && "Afternoon",
                                medicine.night && "Night",
                              ]
                                .filter(Boolean)
                                .join(", ")}{" "}
                              - {medicine.duration} days
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMedicine(medicine.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea
                  placeholder="Any additional instructions or notes..."
                  value={newPrescription.notes}
                  onChange={(e) =>
                    setNewPrescription({ ...newPrescription, notes: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSavePrescription}
                disabled={!newPrescription.patientId || newPrescription.medicines.length === 0}
              >
                Save Prescription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search prescriptions by patient name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPrescriptions.map((prescription) => (
          <Card key={prescription.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{prescription.patientName}</CardTitle>
                    <CardDescription>{prescription.id}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{prescription.date}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Medicines ({prescription.medicines.length})
                </p>
                <div className="space-y-1">
                  {prescription.medicines.slice(0, 2).map((medicine) => (
                    <p key={medicine.id} className="text-sm">
                      {medicine.name} - {medicine.dosage}
                    </p>
                  ))}
                  {prescription.medicines.length > 2 && (
                    <p className="text-sm text-muted-foreground">
                      +{prescription.medicines.length - 2} more
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setViewingPrescription(prescription)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePrint(prescription)}
                >
                  <Printer className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Prescription Dialog */}
      <Dialog open={!!viewingPrescription} onOpenChange={() => setViewingPrescription(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
            <DialogDescription>
              {viewingPrescription?.id} - {viewingPrescription?.date}
            </DialogDescription>
          </DialogHeader>
          {viewingPrescription && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="font-medium text-lg">{viewingPrescription.patientName}</p>
              </div>

              <div>
                <p className="font-medium mb-3">Medicines</p>
                <div className="space-y-3">
                  {viewingPrescription.medicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className="p-3 rounded-lg border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{medicine.name}</p>
                          <p className="text-sm text-muted-foreground">{medicine.dosage}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {medicine.duration} days
                        </span>
                      </div>
                      <div className="flex gap-2 mb-2">
                        {medicine.morning && (
                          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                            Morning
                          </span>
                        )}
                        {medicine.afternoon && (
                          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                            Afternoon
                          </span>
                        )}
                        {medicine.night && (
                          <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                            Night
                          </span>
                        )}
                      </div>
                      {medicine.instructions && (
                        <p className="text-sm text-muted-foreground">
                          Note: {medicine.instructions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {viewingPrescription.notes && (
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground mb-1">Additional Notes</p>
                  <p>{viewingPrescription.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingPrescription(null)}>
              Close
            </Button>
            <Button onClick={() => viewingPrescription && handlePrint(viewingPrescription)}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
