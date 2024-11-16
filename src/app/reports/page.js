'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import Sidebar from '@/components/sidebar'

export default function ReportsPage() {
  const [inventorySummary] = useState({
    totalItems: 1500,
    totalValue: 75000,
    lowStockItems: 5,
    outOfStockItems: 2
  })

  const [monthlySales] = useState([
    { month: 'Ene', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Abr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
  ])

  const [topSellingProducts] = useState([
    { id: 1, name: 'Widget A', sales: 500, revenue: 5000 },
    { id: 2, name: 'Gadget B', sales: 350, revenue: 7000 },
    { id: 3, name: 'Device C', sales: 200, revenue: 6000 },
    { id: 4, name: 'Tool D', sales: 150, revenue: 3000 },
    { id: 5, name: 'Accessory E', sales: 100, revenue: 1000 },
  ])

  const [inventoryDistribution] = useState([
    { name: 'Electrónicos', value: 400 },
    { name: 'Ropa', value: 300 },
    { name: 'Alimentos', value: 200 },
    { name: 'Hogar', value: 100 },
  ])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    
    <div className="min-h-screen bg-gray-100">
        <Sidebar />
      <div className="container mx-auto p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8">Reportes</h1>

        {/* Resumen del Inventario */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Resumen del Inventario</CardTitle>
            <CardDescription>Vista general del estado actual del inventario</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{inventorySummary.totalItems}</div>
                  <p className="text-sm text-muted-foreground">Total de Artículos</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">${inventorySummary.totalValue}</div>
                  <p className="text-sm text-muted-foreground">Valor Total del Inventario</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{inventorySummary.lowStockItems}</div>
                  <p className="text-sm text-muted-foreground">Artículos con Bajo Stock</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">{inventorySummary.outOfStockItems}</div>
                  <p className="text-sm text-muted-foreground">Artículos Agotados</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Ventas Mensuales */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Ventas Mensuales</CardTitle>
            <CardDescription>Tendencia de ventas en los últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabla de Productos Más Vendidos */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Productos Más Vendidos</CardTitle>
            <CardDescription>Los 5 productos con mayor volumen de ventas</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Unidades Vendidas</TableHead>
                  <TableHead className="text-right">Ingresos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topSellingProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">${product.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Gráfico de Distribución del Inventario */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución del Inventario</CardTitle>
            <CardDescription>Distribución de artículos por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {inventoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}