// components/Navigation.js
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navigation() {
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
          <Link href="/purchase-order">
            <Button variant="ghost">Órdenes</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">Salir</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}