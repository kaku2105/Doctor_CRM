"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"
import {
  User,
  Building2,
  Lock,
  Palette,
  Save,
  CheckCircle2,
} from "lucide-react"

export default function SettingsPage() {
  const { doctor, updateProfile } = useAuth()
  const { theme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  const [profileData, setProfileData] = useState({
    name: doctor?.name || "",
    email: doctor?.email || "",
    phone: doctor?.phone || "",
    specialization: doctor?.specialization || "",
  })

  const [clinicData, setClinicData] = useState({
    clinicName: doctor?.clinicName || "",
    address: "123 Medical Plaza, Healthcare District",
    city: "New Delhi",
    phone: "+91 11 2345 6789",
    email: "contact@medcare.com",
    timing: "9:00 AM - 6:00 PM",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    updateProfile(profileData)
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleSaveClinic = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-success/10 text-success border border-success/20">
          <CheckCircle2 className="h-5 w-5" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="clinic" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Clinic</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                  {profileData.name.charAt(0) || "D"}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{profileData.name || "Doctor"}</h3>
                  <p className="text-muted-foreground">{profileData.specialization}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                    placeholder="Dr. Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                    placeholder="doctor@clinic.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Specialization</label>
                  <Input
                    value={profileData.specialization}
                    onChange={(e) =>
                      setProfileData({ ...profileData, specialization: e.target.value })
                    }
                    placeholder="Pediatric Neurology"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clinic Settings */}
        <TabsContent value="clinic">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Details</CardTitle>
              <CardDescription>
                Manage your clinic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Clinic Name</label>
                  <Input
                    value={clinicData.clinicName}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, clinicName: e.target.value })
                    }
                    placeholder="Clinic Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={clinicData.phone}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, phone: e.target.value })
                    }
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={clinicData.address}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, address: e.target.value })
                    }
                    placeholder="Clinic Address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={clinicData.city}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, city: e.target.value })
                    }
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={clinicData.email}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, email: e.target.value })
                    }
                    placeholder="contact@clinic.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Working Hours</label>
                  <Input
                    value={clinicData.timing}
                    onChange={(e) =>
                      setClinicData({ ...clinicData, timing: e.target.value })
                    }
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleSaveClinic} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm New Password</label>
                  <Input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleChangePassword}
                  disabled={isSaving || !passwordData.currentPassword || !passwordData.newPassword}
                >
                  <Lock className="h-4 w-4 mr-2" />
                  {isSaving ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Palette className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                </div>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setTheme("light")}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    theme === "light"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="h-24 rounded-lg bg-white border mb-3 flex items-center justify-center">
                    <div className="w-16 h-2 rounded bg-gray-200" />
                  </div>
                  <p className="font-medium">Light</p>
                  <p className="text-sm text-muted-foreground">
                    Clean and bright interface
                  </p>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    theme === "dark"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="h-24 rounded-lg bg-gray-900 border border-gray-800 mb-3 flex items-center justify-center">
                    <div className="w-16 h-2 rounded bg-gray-700" />
                  </div>
                  <p className="font-medium">Dark</p>
                  <p className="text-sm text-muted-foreground">
                    Easy on the eyes
                  </p>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
