// app/customer-registration/page.js
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Sidebar from '@/components/sidebar'

export default function CustomerRegistration() {
    const [customers, setCustomers] = useState([])
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' })
    const [error, setError] = useState(null)
    const [editingCustomer, setEditingCustomer] = useState(null)

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetch('http://localhost:8000/customers/')
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes')
                }
                const data = await response.json()
                setCustomers(data)
            } catch (error) {
                console.error('Error:', error)
                setError('Failed to fetch customers')
            }
        }

        fetchCustomers()
    }, [])

    const handleCloseDialog = () => {
        setShowDialog(false)
        setDialogMessage('')
    }   

    const showSuccessDialog = (message) => {
        setDialogMessage(message)
        setShowDialog(true)
        setTimeout(handleCloseDialog, 3000)
    }

    const validateFields = () => {
        if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
            setError('Todos los campos son requeridos')
            return false
        }
        setError(null)
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateFields()) return

        const customer = {
            id: editingCustomer ? editingCustomer.id : customers.length + 1,
            ...newCustomer
        }

        try {
            const response = await fetch(`http://localhost:8000/customers/${editingCustomer ? editingCustomer.id : ''}`, {
                method: editingCustomer ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customer),
            })

            if (!response.ok) {
                throw new Error('Error al registrar el cliente')
            }

            const createdCustomer = await response.json()
            if (editingCustomer) {
                setCustomers(customers.map(c => c.id === createdCustomer.id ? createdCustomer : c))
                setEditingCustomer(null)
            } else {
                setCustomers([...customers, createdCustomer])
            }
            setNewCustomer({ name: '', email: '', phone: '' })
            showSuccessDialog('Cliente registrado exitosamente')
        } catch (error) {
            console.error('Error:', error)
            setError('Failed to register customer')
        }
    }

    const handleEdit = (customer) => {
        setNewCustomer(customer)
        setEditingCustomer(customer)
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/customers/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Error al eliminar el cliente')
            }

            setCustomers(customers.filter(customer => customer.id !== id))
            showSuccessDialog('Cliente eliminado exitosamente')
        } catch (error) {
            console.error('Error:', error)
            setError('Failed to delete customer')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Sidebar />
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Alta de Clientes</h1>
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>{editingCustomer ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}</CardTitle>
                        <CardDescription>Ingrese los datos del {editingCustomer ? 'cliente a editar' : 'nuevo cliente'}</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Nombre</Label>
                                <Input
                                    id="name"
                                    placeholder="Nombre del cliente"
                                    value={newCustomer.name}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email del cliente"
                                    value={newCustomer.email}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">Teléfono</Label>
                                <Input
                                    id="phone"
                                    placeholder="Teléfono del cliente"
                                    value={newCustomer.phone}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">{editingCustomer ? 'Actualizar Cliente' : 'Registrar Cliente'}</Button>
                        </CardFooter>
                    </form>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Clientes Registrados</CardTitle>
                        <CardDescription>Lista de todos los clientes registrados</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>{customer.id}</TableCell>
                                        <TableCell>{customer.name}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-4">
                                                <Button onClick={() => handleEdit(customer)}>Editar</Button>
                                                <Button variant="destructive" onClick={() => handleDelete(customer.id)}>Eliminar</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-800 rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    )
}