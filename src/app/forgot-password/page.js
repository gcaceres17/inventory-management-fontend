'use client'

import { useRouter } from 'next/navigation'
// ... imports existentes ...

export default function ForgotPassword() {
  const router = useRouter()
  // ... estados existentes ...

  const handleBackToLogin = () => {
    router.push('/login')
  }

  return (
    // ... código existente ...
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBackToLogin}>Back to Login</Button>
            <Button type="submit">Reset Password</Button>
          </CardFooter>
    // ... código existente ...
  )
} 