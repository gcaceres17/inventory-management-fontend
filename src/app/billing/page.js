'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Sidebar from '@/components/sidebar'
import Link from 'next/link'

export default function Billing() {
  const [orders] = useState([
    {
      id: 1,
      orderNumber: "PO-2024-001",
      customer: "Acme Inc",
      date: "2024-01-15",
      items: [
        { name: "Widget A", quantity: 5, price: 10.99 },
        { name: "Gadget B", quantity: 2, price: 24.99 }
      ],
      status: "pending",
      total: 104.93
    },
    {
      id: 2,
      orderNumber: "PO-2024-002",
      customer: "TechCorp",
      date: "2024-01-16",
      items: [
        { name: "Widget C", quantity: 3, price: 15.99 }
      ],
      status: "paid",
      total: 47.97
    }
  ])

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Facturación de Órdenes</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumen de Facturación</CardTitle>
            <CardDescription>Vista general de todas las órdenes y su estado de facturación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">$152.90</div>
                  <p className="text-sm text-gray-500">Total Facturado</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-sm text-gray-500">Órdenes Pendientes</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-sm text-gray-500">Órdenes Pagadas</p>
                </CardContent>
              </Card>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Número de Orden</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === 'paid' ? 'success' : 'warning'}>
                        {order.status === 'paid' ? 'Pagado' : 'Pendiente'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-2">
                        <Link href={`/invoice/${order.id}`}>
                          Ver Detalles
                        </Link>
                      </Button>
                      {order.status === 'pending' && (
                        <Button size="sm">Marcar como Pagado</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}