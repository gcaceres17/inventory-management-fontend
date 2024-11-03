// app/purchase-order/page.js
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from '@/components/Navigation'

export default function PurchaseOrder() {
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Purchase order submitted:', { itemName, quantity, price })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <div className="container mx-auto p-8 flex justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create Purchase Order</CardTitle>
            <CardDescription>Enter the details for the new purchase order</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input id="itemName" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Enter quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="price">Price per Unit</Label>
                  <Input id="price" type="number" step="0.01" placeholder="Enter price per unit" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit">Create Order</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}