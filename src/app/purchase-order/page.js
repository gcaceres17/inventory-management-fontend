'use client'
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from '@/components/sidebar';
import { InfoIcon } from '@/components/ui/icons';
import { Select, SelectItem } from "@nextui-org/select";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

  const handleProductSelect = (selectedOption) => {
    const selectedItem = inventoryItems.find(item => item.id === selectedOption.value);
    if (selectedItem) {
      setFormData({
        ...formData,
        product: selectedItem.name,
        itemName: selectedItem.name,
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

  const productOptions = inventoryItems.map((product) => ({
    key: product.id,
    value: product.id,
    label: product.name,
  }));

  console.log('inventoryItems:', inventoryItems);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="container mx-auto p-8 ml-64">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  <div className="space-y-4">
                  <Select
                      items={productOptions}
                      onChange={handleProductSelect}
                      placeholder="Seleccione un producto"
                      variant='filled'
                      className="max-w-xs"
                      aria-label="Seleccionar Producto" // Añade este atributo
                    >
                      {(productOptions) => <SelectItem key={productOptions.key}>{productOptions.label}</SelectItem>}
                    </Select>
                  </div>
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
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: e.target.value })}
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

         </div>
      </div>
    </div>
  );
}