export interface Patient {
  id: string
  name: string
  fatherName: string
  age: number
  gender: "Male" | "Female" | "Other"
  weight: number
  contact: string
  email: string
  address: string
  place: string
  diseaseHistory: string[]
  createdAt: string
  lastVisit: string
  status: "Active" | "Inactive"
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  date: string
  time: string
  type: string
  status: "Scheduled" | "Completed" | "Cancelled"
  notes?: string
}

export interface MedicalReport {
  id: string
  patientId: string
  patientName: string
  fatherName: string
  place: string
  date: string
  age: number
  gender: string
  weight: number
  temperature: number
  bp: string
  pulse: number
  diagnosis: string
  sugarLevel: number
  cerebralFluidShrink: boolean
  cerebralFluidExpand: boolean
  conditions: {
    autism: boolean
    adhd: boolean
    speechDisorder: boolean
    hyperactive: boolean
    sleepProblem: boolean
    concentration: boolean
    movementIssues: boolean
    upperLimb: boolean
    lowerLimb: boolean
  }
  doctorNotes: string
  uploadedReports: string[]
}

export interface Medicine {
  id: string
  name: string
  dosage: string
  morning: boolean
  afternoon: boolean
  night: boolean
  duration: number
  instructions: string
}

export interface Prescription {
  id: string
  patientId: string
  patientName: string
  date: string
  medicines: Medicine[]
  notes: string
}

export interface Invoice {
  id: string
  patientId: string
  patientName: string
  date: string
  items: { description: string; amount: number }[]
  total: number
  status: "Paid" | "Pending" | "Overdue"
}

export interface Notification {
  id: string
  type: "appointment" | "report" | "medicine" | "billing"
  title: string
  message: string
  date: string
  read: boolean
}

export const patients: Patient[] = [
  {
    id: "P001",
    name: "Rahul Sharma",
    fatherName: "Vijay Sharma",
    age: 32,
    gender: "Male",
    weight: 72,
    contact: "+91 98765 43210",
    email: "rahul.sharma@email.com",
    address: "123, MG Road, Sector 15",
    place: "New Delhi",
    diseaseHistory: ["Hypertension", "Diabetes Type 2"],
    createdAt: "2024-01-15",
    lastVisit: "2024-03-20",
    status: "Active",
  },
  {
    id: "P002",
    name: "Priya Patel",
    fatherName: "Rajesh Patel",
    age: 28,
    gender: "Female",
    weight: 58,
    contact: "+91 87654 32109",
    email: "priya.patel@email.com",
    address: "45, Green Avenue, Andheri West",
    place: "Mumbai",
    diseaseHistory: ["Asthma", "Allergies"],
    createdAt: "2024-02-10",
    lastVisit: "2024-03-18",
    status: "Active",
  },
  {
    id: "P003",
    name: "Amit Kumar",
    fatherName: "Suresh Kumar",
    age: 45,
    gender: "Male",
    weight: 85,
    contact: "+91 76543 21098",
    email: "amit.kumar@email.com",
    address: "78, Lake View, Koramangala",
    place: "Bangalore",
    diseaseHistory: ["Cardiac Issues", "High Cholesterol"],
    createdAt: "2023-11-20",
    lastVisit: "2024-03-15",
    status: "Active",
  },
  {
    id: "P004",
    name: "Sneha Reddy",
    fatherName: "Krishna Reddy",
    age: 8,
    gender: "Female",
    weight: 25,
    contact: "+91 65432 10987",
    email: "krishna.reddy@email.com",
    address: "12, Hill Road, Banjara Hills",
    place: "Hyderabad",
    diseaseHistory: ["ADHD", "Speech Delay"],
    createdAt: "2024-01-05",
    lastVisit: "2024-03-22",
    status: "Active",
  },
  {
    id: "P005",
    name: "Mohammed Ali",
    fatherName: "Abdul Ali",
    age: 55,
    gender: "Male",
    weight: 78,
    contact: "+91 54321 09876",
    email: "mohammed.ali@email.com",
    address: "90, Park Street",
    place: "Kolkata",
    diseaseHistory: ["Arthritis", "Diabetes Type 2"],
    createdAt: "2023-09-12",
    lastVisit: "2024-03-10",
    status: "Inactive",
  },
  {
    id: "P006",
    name: "Ananya Singh",
    fatherName: "Rakesh Singh",
    age: 12,
    gender: "Female",
    weight: 35,
    contact: "+91 43210 98765",
    email: "rakesh.singh@email.com",
    address: "56, Civil Lines",
    place: "Lucknow",
    diseaseHistory: ["Autism Spectrum"],
    createdAt: "2024-02-28",
    lastVisit: "2024-03-25",
    status: "Active",
  },
]

export const appointments: Appointment[] = [
  {
    id: "A001",
    patientId: "P001",
    patientName: "Rahul Sharma",
    date: "2024-03-27",
    time: "09:00",
    type: "Follow-up",
    status: "Scheduled",
  },
  {
    id: "A002",
    patientId: "P002",
    patientName: "Priya Patel",
    date: "2024-03-27",
    time: "10:30",
    type: "Consultation",
    status: "Scheduled",
  },
  {
    id: "A003",
    patientId: "P004",
    patientName: "Sneha Reddy",
    date: "2024-03-27",
    time: "14:00",
    type: "Therapy Session",
    status: "Scheduled",
  },
  {
    id: "A004",
    patientId: "P003",
    patientName: "Amit Kumar",
    date: "2024-03-26",
    time: "11:00",
    type: "Check-up",
    status: "Completed",
  },
  {
    id: "A005",
    patientId: "P006",
    patientName: "Ananya Singh",
    date: "2024-03-28",
    time: "15:30",
    type: "Evaluation",
    status: "Scheduled",
  },
  {
    id: "A006",
    patientId: "P005",
    patientName: "Mohammed Ali",
    date: "2024-03-25",
    time: "16:00",
    type: "Follow-up",
    status: "Cancelled",
  },
]

export const medicalReports: MedicalReport[] = [
  {
    id: "R001",
    patientId: "P004",
    patientName: "Sneha Reddy",
    fatherName: "Krishna Reddy",
    place: "Hyderabad",
    date: "2024-03-22",
    age: 8,
    gender: "Female",
    weight: 25,
    temperature: 98.6,
    bp: "100/70",
    pulse: 88,
    diagnosis: "ADHD with Speech Delay",
    sugarLevel: 95,
    cerebralFluidShrink: false,
    cerebralFluidExpand: false,
    conditions: {
      autism: false,
      adhd: true,
      speechDisorder: true,
      hyperactive: true,
      sleepProblem: false,
      concentration: true,
      movementIssues: false,
      upperLimb: false,
      lowerLimb: false,
    },
    doctorNotes: "Patient shows improvement in speech therapy. Continue current medication and therapy sessions.",
    uploadedReports: ["speech_assessment.pdf", "eeg_report.pdf"],
  },
  {
    id: "R002",
    patientId: "P006",
    patientName: "Ananya Singh",
    fatherName: "Rakesh Singh",
    place: "Lucknow",
    date: "2024-03-25",
    age: 12,
    gender: "Female",
    weight: 35,
    temperature: 98.4,
    bp: "105/68",
    pulse: 82,
    diagnosis: "Autism Spectrum Disorder - Mild",
    sugarLevel: 88,
    cerebralFluidShrink: false,
    cerebralFluidExpand: false,
    conditions: {
      autism: true,
      adhd: false,
      speechDisorder: false,
      hyperactive: false,
      sleepProblem: true,
      concentration: true,
      movementIssues: false,
      upperLimb: false,
      lowerLimb: false,
    },
    doctorNotes: "Behavioral therapy showing positive results. Recommend continuing occupational therapy.",
    uploadedReports: ["behavioral_assessment.pdf"],
  },
]

export const prescriptions: Prescription[] = [
  {
    id: "PR001",
    patientId: "P001",
    patientName: "Rahul Sharma",
    date: "2024-03-20",
    medicines: [
      {
        id: "M001",
        name: "Metformin",
        dosage: "500mg",
        morning: true,
        afternoon: false,
        night: true,
        duration: 30,
        instructions: "Take after meals",
      },
      {
        id: "M002",
        name: "Amlodipine",
        dosage: "5mg",
        morning: true,
        afternoon: false,
        night: false,
        duration: 30,
        instructions: "Take before breakfast",
      },
    ],
    notes: "Monitor blood sugar levels weekly. Follow low-sodium diet.",
  },
  {
    id: "PR002",
    patientId: "P004",
    patientName: "Sneha Reddy",
    date: "2024-03-22",
    medicines: [
      {
        id: "M003",
        name: "Methylphenidate",
        dosage: "10mg",
        morning: true,
        afternoon: false,
        night: false,
        duration: 30,
        instructions: "Take with breakfast",
      },
    ],
    notes: "Continue speech therapy sessions twice a week.",
  },
]

export const invoices: Invoice[] = [
  {
    id: "INV001",
    patientId: "P001",
    patientName: "Rahul Sharma",
    date: "2024-03-20",
    items: [
      { description: "Consultation Fee", amount: 500 },
      { description: "Blood Tests", amount: 1200 },
      { description: "ECG", amount: 800 },
    ],
    total: 2500,
    status: "Paid",
  },
  {
    id: "INV002",
    patientId: "P004",
    patientName: "Sneha Reddy",
    date: "2024-03-22",
    items: [
      { description: "Consultation Fee", amount: 500 },
      { description: "Therapy Session", amount: 1500 },
      { description: "Assessment Report", amount: 2000 },
    ],
    total: 4000,
    status: "Pending",
  },
  {
    id: "INV003",
    patientId: "P003",
    patientName: "Amit Kumar",
    date: "2024-03-15",
    items: [
      { description: "Consultation Fee", amount: 500 },
      { description: "Cardiac Tests", amount: 3500 },
    ],
    total: 4000,
    status: "Paid",
  },
  {
    id: "INV004",
    patientId: "P005",
    patientName: "Mohammed Ali",
    date: "2024-02-28",
    items: [
      { description: "Consultation Fee", amount: 500 },
      { description: "X-Ray", amount: 1000 },
    ],
    total: 1500,
    status: "Overdue",
  },
]

export const notifications: Notification[] = [
  {
    id: "N001",
    type: "appointment",
    title: "Upcoming Appointment",
    message: "Rahul Sharma has an appointment at 09:00 AM today",
    date: "2024-03-27T08:00:00",
    read: false,
  },
  {
    id: "N002",
    type: "report",
    title: "Pending Report",
    message: "Blood test results for Priya Patel are ready for review",
    date: "2024-03-26T14:30:00",
    read: false,
  },
  {
    id: "N003",
    type: "medicine",
    title: "Medicine Refill",
    message: "Amit Kumar&apos;s prescription expires in 5 days",
    date: "2024-03-25T10:00:00",
    read: true,
  },
  {
    id: "N004",
    type: "billing",
    title: "Payment Overdue",
    message: "Invoice #INV004 for Mohammed Ali is overdue",
    date: "2024-03-20T09:00:00",
    read: true,
  },
]

export const dashboardStats = {
  totalPatients: 156,
  todayAppointments: 8,
  pendingReports: 12,
  activeTreatments: 45,
  monthlyRevenue: 285000,
  weeklyRevenue: 68500,
}

export const patientGrowthData = [
  { month: "Jan", patients: 120 },
  { month: "Feb", patients: 132 },
  { month: "Mar", patients: 145 },
  { month: "Apr", patients: 156 },
  { month: "May", patients: 168 },
  { month: "Jun", patients: 180 },
]

export const appointmentData = [
  { day: "Mon", appointments: 12 },
  { day: "Tue", appointments: 15 },
  { day: "Wed", appointments: 10 },
  { day: "Thu", appointments: 18 },
  { day: "Fri", appointments: 14 },
  { day: "Sat", appointments: 8 },
]

export const revenueData = [
  { month: "Jan", revenue: 245000 },
  { month: "Feb", revenue: 268000 },
  { month: "Mar", revenue: 285000 },
  { month: "Apr", revenue: 302000 },
  { month: "May", revenue: 318000 },
  { month: "Jun", revenue: 342000 },
]
