"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface Doctor {
  id: string
  name: string
  email: string
  specialization: string
  clinicName: string
  phone: string
  avatar?: string
}

interface AuthContextType {
  doctor: Doctor | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (data: Partial<Doctor>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockDoctor: Doctor = {
  id: "D001",
  name: "Dr. Arun Mehta",
  email: "dr.arun@medcare.com",
  specialization: "Pediatric Neurology",
  clinicName: "MedCare Clinic",
  phone: "+91 99887 76655",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem("doctor_auth")
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth)
      setDoctor(parsed)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call an API
    if (email && password.length >= 4) {
      const doctorData = { ...mockDoctor, email }
      setDoctor(doctorData)
      setIsAuthenticated(true)
      localStorage.setItem("doctor_auth", JSON.stringify(doctorData))
      return true
    }
    return false
  }

  const logout = () => {
    setDoctor(null)
    setIsAuthenticated(false)
    localStorage.removeItem("doctor_auth")
  }

  const updateProfile = (data: Partial<Doctor>) => {
    if (doctor) {
      const updated = { ...doctor, ...data }
      setDoctor(updated)
      localStorage.setItem("doctor_auth", JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider value={{ doctor, isAuthenticated, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
