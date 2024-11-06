'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Printer } from 'lucide-react'

export default function InvoiceDetails({ params }) {
  const [invoice, setInvoice] = useState(null)

  useEffect(() => {
    // En una aplicación real, aquí harías una llamada a la API para obtener los detalles de la factura
    // Usando el ID de la factura que viene en params.id
    setInvoice({
      //id: params.id,
      orderNumber: "PO-2024-001",
      customer: {
        name: "Acme Inc",
        address: "123 Business St, Suite 100, City, State, 12345",
        email: "accounting@acmeinc.com"
      },
      date: "2024-01-15",
      dueDate: "2024-02-15",
      items: [
        { name: "Widget A", quantity: 5, price: 10.99 },
        { name: "Gadget B", quantity: 2, price: 24.99 }
      ],
      status: "pending",
      total: 104.93
    })
  }, [])

  const handlePrint = () => {
    window.print()
  }

  if (!invoice) {
    return <div>Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Factura #{invoice.orderNumber}</CardTitle>
          <Button onClick={handlePrint} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" /> Imprimir Factura
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold">De:</h3>
              <p>Tu Empresa S.A.</p>
              <p>Calle Principal 123</p>
              <p>Ciudad, Estado, CP</p>
              <p>info@tuempresa.com</p>
            </div>
            <div>
              <h3 className="font-semibold">Para:</h3>
              <p>{invoice.customer.name}</p>
              <p>{invoice.customer.address}</p>
              <p>{invoice.customer.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p><span className="font-semibold">Fecha de emisión:</span> {invoice.date}</p>
              <p><span className="font-semibold">Fecha de vencimiento:</span> {invoice.dueDate}</p>
            </div>
            <div>
              <p><span className="font-semibold">Estado:</span> 
                <Badge variant={invoice.status === 'paid' ? 'success' : 'warning'} className="ml-2">
                  {invoice.status === 'paid' ? 'Pagado' : 'Pendiente'}
                </Badge>
              </p>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Precio Unitario</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 text-right">
            <p className="text-lg font-semibold">Total: ${invoice.total.toFixed(2)}</p>
          </div>

          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold mb-2">Términos y condiciones:</h3>
            <p className="text-sm text-gray-600">
              Por favor, realice el pago dentro de los 30 días posteriores a la fecha de la factura.
              Agradecemos su puntualidad y su negocio.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}