// app/purchase-order/page.js
'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Sidebar from '@/components/sidebar'
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';

import { InfoIcon } from '@/components/ui/icons';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';


export default function PurchaseOrder() {
  const [formData, setFormData] = useState({
    product: '',
    itemName: '',
    quantity: '',
    pricePerUnit: ''
  });

  const [orders, setOrders] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/purchase-orders/');
        if (!response.ok) {
          throw new Error('Error al obtener las órdenes de compra');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch purchase orders');
      }
    };

    const fetchInventoryItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/inventory/');
        if (!response.ok) {
          throw new Error('Error al obtener los productos del inventario');
        }
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch inventory items');
      }
    };

    fetchOrders();
    fetchInventoryItems();
  }, []);

  const handleProductSelect = (e) => {
    const selectedItem = inventoryItems.find(item => item.id === Number(e.target.value));
    if (selectedItem) {
      setFormData({
        ...formData,
        product: selectedItem.name,
        quantity: selectedItem.quantity,
        pricePerUnit: selectedItem.price
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      item_name: formData.itemName,
      quantity: Number(formData.quantity),
      price: Number(formData.pricePerUnit)
    };

    try {
      const response = await fetch('http://localhost:8000/purchase-orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden de compra');
      }

      const createdOrder = await response.json();
      setOrders([...orders, createdOrder]);
      setFormData({
        product: '',
        itemName: '',
        quantity: '',
        pricePerUnit: ''
      });

      setConfirmationMessage(`Order created successfully! Item: ${createdOrder.item_name}, Quantity: ${createdOrder.quantity}, Price: $${createdOrder.price.toFixed(2)}`);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to create purchase order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-8 ml-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Orden de Compra */}
          <Card className="lg:sticky lg:top-8">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Crear Orden de Compra</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                Complete los detalles para generar una nueva orden de compra
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="product" className="text-base font-semibold">
                    Seleccionar Producto
                    <span className="text-sm font-normal text-gray-500 block">
                      Elija un producto del catálogo existente
                    </span>
                  </Label>
                  <Select
                    value={formData.product}
                    onValueChange={(value) => setFormData({ ...formData, product: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Seleccione un producto" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventoryItems.map((product) => (
                        <SelectItem key={product.id} value={product.id.toString()}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label htmlFor="itemName" className="text-base font-semibold">
                    Nombre del Artículo
                    <span className="text-sm font-normal text-gray-500 block">
                      Ingrese el nombre específico del artículo
                    </span>
                  </Label>
                  <Input
                    id="itemName"
                    className="h-12"
                    placeholder="Ej: Widget Premium A-123"
                    value={formData.itemName}
                    onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="quantity" className="text-base font-semibold">
                    Cantidad
                    <span className="text-sm font-normal text-gray-500 block">
                      Especifique la cantidad de unidades a ordenar
                    </span>
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    className="h-12"
                    placeholder="Ej: 10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>

                <div className="space-y-4">
                  <Label htmlFor="pricePerUnit" className="text-base font-semibold">
                    Precio por Unidad
                    <span className="text-sm font-normal text-gray-500 block">
                      Ingrese el precio unitario en dólares
                    </span>
                  </Label>
                  <Input
                    id="pricePerUnit"
                    type="number"
                    step="0.01"
                    className="h-12"
                    placeholder="Ej: 99.99"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({...formData, pricePerUnit: e.target.value})}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="h-12 px-6"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit"
                    className="h-12 px-6 bg-blue-600 hover:bg-blue-700"
                  >
                    Crear Orden
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Lista de Órdenes Recientes */}
          <Card>
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Órdenes Recientes</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <InfoIcon className="h-4 w-4" />
                Listado de las últimas órdenes de compra generadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Producto</TableHead>
                    <TableHead className="font-semibold text-right">Cantidad</TableHead>
                    <TableHead className="font-semibold text-right">Precio/Unidad</TableHead>
                    <TableHead className="font-semibold text-right">Total</TableHead>
                    <TableHead className="font-semibold">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.product}</TableCell>
                      <TableCell className="text-right">{order.quantity}</TableCell>
                      <TableCell className="text-right">${order.pricePerUnit}</TableCell>
                      <TableCell className="text-right font-semibold">
                        ${((order.total !== undefined ? order.total : order.quantity * order.pricePerUnit) || 0).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={order.status === 'completed' ? 'success' : 'warning'}
                          className="capitalize"
                        >
                          {order.status === 'completed' ? 'Completado' : 'Pendiente'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}