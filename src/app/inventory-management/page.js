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
  const [editingItem, setEditingItem] = useState(null)
  const [error, setError] = useState(null)

  // Obtener elementos del inventario al cargar el componente
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/inventory')
        if (!response.ok) {
          throw new Error('Error al obtener los elementos del inventario')
        }
        const data = await response.json()
        setInventoryItems(data)
      } catch (error) {
        console.error('Error:', error)
        setError('Failed to fetch inventory items')
      }
    }

    fetchInventoryItems()
  }, [])

  // Agregar o actualizar un elemento en el inventario
  const handleAddOrUpdateItem = async (e) => {
    e.preventDefault()
    const item = {
      name: newItem.name,
      quantity: Number(newItem.quantity),
      price: Number(newItem.price)
    }

    if (editingItem) {
      // Actualizar el elemento existente
      try {
        const response = await fetch(`http://localhost:8000/inventory/${editingItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })

        if (!response.ok) {
          throw new Error('Error al actualizar el elemento')
        }

        const updatedItem = await response.json()
        setInventoryItems(inventoryItems.map(i => (i.id === updatedItem.id ? updatedItem : i)))
        setEditingItem(null)
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      // Agregar un nuevo elemento
      try {
        const response = await fetch('http://localhost:8000/inventory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        })

        if (!response.ok) {
          throw new Error('Error al agregar el elemento')
        }

        const addedItem = await response.json()
        setInventoryItems([...inventoryItems, addedItem])
      } catch (error) {
        console.error('Error:', error)
      }
    }

    setNewItem({ name: '', quantity: '', price: '' })
  }

  // Iniciar la edición de un elemento
  const handleEditItem = (item) => {
    setNewItem({ name: item.name, quantity: item.quantity, price: item.price })
    setEditingItem(item)
  }

  // Eliminar un elemento del inventario
  const handleDeleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/inventory/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Error al eliminar el elemento')
      }

      setInventoryItems(inventoryItems.filter(item => item.id !== id))
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Limpiar el formulario
  const handleClearForm = () => {
    setNewItem({ name: '', quantity: '', price: '' })
    setEditingItem(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Inventory Management</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</CardTitle>
            <CardDescription>Enter the details for the inventory item</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddOrUpdateItem} className="flex space-x-2">
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
              <Button type="submit">{editingItem ? 'Update Item' : 'Add Item'}</Button>
              <Button type="button" onClick={handleClearForm}>Clear</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>A list of all items in your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <div className="error-message">{error}</div>}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button onClick={() => handleEditItem(item)}>editar</Button>
                        <Button onClick={() => handleDeleteItem(item.id)}>eliminar</Button>
                      </div>
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