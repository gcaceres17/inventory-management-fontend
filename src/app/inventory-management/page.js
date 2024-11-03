// app/inventory-management/page.js
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from '@/components/Navigation'

export default function InventoryManagement() {
  const [inventoryItems, setInventoryItems] = useState([])
  const [newItem, setNewItem] = useState({ name: '', quantity: '', price: '' })

  useEffect(() => {
    setInventoryItems([
      { id: 1, name: 'Widget A', quantity: 100, price: 9.99 },
      { id: 2, name: 'Gadget B', quantity: 50, price: 19.99 },
      { id: 3, name: 'Doohickey C', quantity: 75, price: 14.99 },
    ])
  }, [])

  const handleAddItem = (e) => {
    e.preventDefault()
    const item = {
      id: inventoryItems.length + 1,
      name: newItem.name,
      quantity: Number(newItem.quantity),
      price: Number(newItem.price)
    }
    setInventoryItems([...inventoryItems, item])
    setNewItem({ name: '', quantity: '', price: '' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
            <CardDescription>Enter the details for the new inventory item</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddItem} className="flex space-x-2">
              <Input 
                placeholder="Item name" 
                value={newItem.name} 
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
              <Input 
                type="number" 
                placeholder="Quantity" 
                value={newItem.quantity} 
                onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              />
              <Input 
                type="number"
                step="0.01"
                placeholder="Price" 
                value={newItem.price} 
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
              />
              <Button type="submit">Add Item</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
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