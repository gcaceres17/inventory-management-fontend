// app/home/page.js
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sistema de Gestión de Inventario</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Ver resumen del inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">Ir al Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Inventario</CardTitle>
            <CardDescription>Administrar items del inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/inventory-management">
              <Button className="w-full">Gestionar Inventario</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Órdenes de Compra</CardTitle>
            <CardDescription>Crear nuevas órdenes de compra</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/purchase-order">
              <Button className="w-full">Crear Orden de Compra</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}