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
import { invoices as initialInvoices, patients, type Invoice } from "@/lib/data"
import {
  Search,
  Plus,
  Download,
  Eye,
  IndianRupee,
  Filter,
  Trash2,
  CheckCircle2,
} from "lucide-react"

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null)
  const [newInvoice, setNewInvoice] = useState({
    patientId: "",
    items: [{ description: "", amount: 0 }],
  })

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0)
  const paidRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.total, 0)
  const pendingRevenue = invoices
    .filter((inv) => inv.status === "Pending")
    .reduce((sum, inv) => sum + inv.total, 0)
  const overdueRevenue = invoices
    .filter((inv) => inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.total, 0)

  const addInvoiceItem = () => {
    setNewInvoice({
      ...newInvoice,
      items: [...newInvoice.items, { description: "", amount: 0 }],
    })
  }

  const removeInvoiceItem = (index: number) => {
    setNewInvoice({
      ...newInvoice,
      items: newInvoice.items.filter((_, i) => i !== index),
    })
  }

  const updateInvoiceItem = (index: number, field: "description" | "amount", value: string | number) => {
    const updatedItems = [...newInvoice.items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setNewInvoice({ ...newInvoice, items: updatedItems })
  }

  const handleCreateInvoice = () => {
    const patient = patients.find((p) => p.id === newInvoice.patientId)
    if (patient && newInvoice.items.some((item) => item.description && item.amount > 0)) {
      const validItems = newInvoice.items.filter((item) => item.description && item.amount > 0)
      const total = validItems.reduce((sum, item) => sum + item.amount, 0)
      const invoice: Invoice = {
        id: `INV${String(invoices.length + 1).padStart(3, "0")}`,
        patientId: newInvoice.patientId,
        patientName: patient.name,
        date: new Date().toISOString().split("T")[0],
        items: validItems,
        total,
        status: "Pending",
      }
      setInvoices([...invoices, invoice])
      setIsAddDialogOpen(false)
      setNewInvoice({ patientId: "", items: [{ description: "", amount: 0 }] })
    }
  }

  const handleMarkAsPaid = (id: string) => {
    setInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status: "Paid" as const } : inv)))
  }

  const getStatusColor = (status: Invoice["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success"
      case "Pending":
        return "bg-warning/10 text-warning"
      case "Overdue":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage invoices and track payments
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Invoice</DialogTitle>
              <DialogDescription>
                Generate a new invoice for a patient
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Patient</label>
                <Select
                  value={newInvoice.patientId}
                  onValueChange={(value) => setNewInvoice({ ...newInvoice, patientId: value })}
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

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Invoice Items</label>
                  <Button variant="outline" size="sm" onClick={addInvoiceItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                {newInvoice.items.map((item, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateInvoiceItem(index, "description", e.target.value)}
                      className="flex-1"
                    />
                    <div className="relative w-32">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="number"
                        placeholder="Amount"
                        value={item.amount || ""}
                        onChange={(e) =>
                          updateInvoiceItem(index, "amount", parseFloat(e.target.value) || 0)
                        }
                        className="pl-9"
                      />
                    </div>
                    {newInvoice.items.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeInvoiceItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <div className="flex justify-end pt-2 border-t">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold flex items-center">
                      <IndianRupee className="h-5 w-5" />
                      {newInvoice.items
                        .reduce((sum, item) => sum + (item.amount || 0), 0)
                        .toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateInvoice} disabled={!newInvoice.patientId}>
                Create Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <IndianRupee className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Paid</p>
                <p className="text-2xl font-bold flex items-center text-success">
                  <IndianRupee className="h-5 w-5" />
                  {paidRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-success/10 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold flex items-center text-warning">
                  <IndianRupee className="h-5 w-5" />
                  {pendingRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold flex items-center text-destructive">
                  <IndianRupee className="h-5 w-5" />
                  {overdueRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices by patient name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>
            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.patientName}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell className="font-semibold flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {invoice.total.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewingInvoice(invoice)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        {invoice.status !== "Paid" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkAsPaid(invoice.id)}
                          >
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Invoice Dialog */}
      <Dialog open={!!viewingInvoice} onOpenChange={() => setViewingInvoice(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>
              {viewingInvoice?.id} - {viewingInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          {viewingInvoice && (
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-medium">{viewingInvoice.patientName}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(viewingInvoice.status)}`}>
                  {viewingInvoice.status}
                </span>
              </div>

              <div>
                <p className="font-medium mb-3">Items</p>
                <div className="space-y-2">
                  {viewingInvoice.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span>{item.description}</span>
                      <span className="font-medium flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {item.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="font-medium">Total Amount</span>
                <span className="text-xl font-bold flex items-center">
                  <IndianRupee className="h-5 w-5" />
                  {viewingInvoice.total.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingInvoice(null)}>
              Close
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
