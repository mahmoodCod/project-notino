"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  name: string | null
  phone: string | null
  profileImage: string | null
  university: string | null
  field: string | null
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // بررسی وضعیت احراز هویت از localStorage
    const userLoggedIn = localStorage.getItem("userLoggedIn")
    
    if (userLoggedIn === "true") {
      const userData: User = {
        name: localStorage.getItem("userName") || localStorage.getItem("userFullName"),
        phone: localStorage.getItem("userPhone"),
        profileImage: localStorage.getItem("userProfileImage"),
        university: localStorage.getItem("userUniversity"),
        field: localStorage.getItem("userField"),
      }
      setUser(userData)
    }
    
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("userLoggedIn", "true")
    if (userData.name) localStorage.setItem("userName", userData.name)
    if (userData.phone) localStorage.setItem("userPhone", userData.phone)
    if (userData.profileImage) localStorage.setItem("userProfileImage", userData.profileImage)
    if (userData.university) localStorage.setItem("userUniversity", userData.university)
    if (userData.field) localStorage.setItem("userField", userData.field)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("userLoggedIn")
    localStorage.removeItem("userName")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userProfileImage")
    localStorage.removeItem("userUniversity")
    localStorage.removeItem("userField")
    localStorage.removeItem("userProfileComplete")
    localStorage.removeItem("userFullName")
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    const updatedUser = { ...user, ...userData } as User
    setUser(updatedUser)
    
    if (userData.name) localStorage.setItem("userName", userData.name)
    if (userData.phone) localStorage.setItem("userPhone", userData.phone || "")
    if (userData.profileImage) localStorage.setItem("userProfileImage", userData.profileImage)
    if (userData.university) localStorage.setItem("userUniversity", userData.university)
    if (userData.field) localStorage.setItem("userField", userData.field)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
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

