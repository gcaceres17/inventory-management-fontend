// components/Navigation.js
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()

  const handleLogout = async () => {
    // Si tienes un endpoint de logout, puedes llamarlo aquí
    await fetch('http://localhost:8000/logout', { method: 'POST' })
    console.log('Logout exitoso')

    // Limpia el token de autenticación
    localStorage.removeItem('token')
    
    // Redirige al usuario a la página de inicio de sesión
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-md p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" className="text-xl font-bold">
          Sistema de Inventario
        </Link>
        <div className="space-x-2">
          <Link href="/home">
            <Button variant="ghost">Inicio</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link href="/inventory-management">
            <Button variant="ghost">Inventario</Button>
          </Link>
          <Link href="/customer-registration">
            <Button variant="ghost">Clientes</Button>
          </Link>
          <Link href="/purchase-order">
            <Button variant="ghost">Órdenes</Button>
          </Link>
          <Button variant="ghost" onClick={handleLogout}>Salir</Button>
        </div>
      </div>
    </nav>
  )
}