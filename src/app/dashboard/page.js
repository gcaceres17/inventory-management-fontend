// app/dashboard/page.js
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/sidebar'

export default function Dashboard() {
  const [inventoryItems, setInventoryItems] = useState([])

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/inventory/')
        if (!response.ok) {
          throw new Error('Error al obtener los productos del inventario')
        }
        const data = await response.json()
        setInventoryItems(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchInventoryItems()
  }, [])

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toFixed(2)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryItems.reduce((sum, item) => sum + item.quantity, 0)}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>A list of all items in your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
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