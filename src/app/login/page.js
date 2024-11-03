'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión')
      }

      const data = await response.json()
      console.log('Inicio de sesión exitoso:', data)

      // Guarda el token en el almacenamiento local o en las cookies
      localStorage.setItem('token', data.token)

      // Redirige al usuario a la página de inicio
      router.push('/home')
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
    }
  }

  const handleRegister = () => {
    router.push('/register')
  }

  const handleForgotPassword = () => {
    router.push('/forgot-password')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={handleRegister}>Register</Button>
              <Button type="submit">Login</Button>
            </div>
            <Button 
              variant="link" 
              className="text-sm" 
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}