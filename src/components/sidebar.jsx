'use client'

import Link from 'next/link'


import {
    LayoutDashboard,
    BarChart3,
    Boxes,
    ShoppingCart,
    UserPlus,
    Receipt
} from 'lucide-react'

const handleLogout = async () => {
    // Si tienes un endpoint de logout, puedes llamarlo aquí
    await fetch('http://localhost:8000/logout', { method: 'POST' })
    console.log('Logout exitoso')

    // Limpia el token de autenticación
    localStorage.removeItem('token')
    
    // Redirige al usuario a la página de inicio de sesión
    router.push('/login')
  }

export default function Sidebar() {
    return (
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r overflow-y-auto">
            <div className="flex flex-col h-full">
                <div className="flex-1">
                    <div className="flex items-center gap-2 px-4 py-6">
                        <Boxes className="h-6 w-6 text-inventory-blue" />
                        <span className="text-lg font-semibold">Inventory System</span>
                    </div>
                    <nav className="mt-6">
                        <div className="px-4 space-y-1">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/inventory-management"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <Boxes className="h-4 w-4" />
                                Inventario
                            </Link>
                            <Link
                                href="/purchase-order"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Órdenes
                            </Link>
                            <Link
                                href="/customer-registration"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <UserPlus className="h-4 w-4" />
                                Clientes
                            </Link>
                            
                            <Link
                                href="/billing"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <Receipt className="h-4 w-4" />
                                Facturación
                            </Link>
                            
                            <Link
                                href="/reports"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-inventory-gray"
                            >
                                <BarChart3 className="h-4 w-4" />
                                Reportes
                            </Link>
                        </div>

                    </nav>
                </div>

                <div className="border-t p-4">
                    <div className="flex items-center gap-3 hover:bg-inventory-gray rounded-lg p-2 cursor-pointer transition-colors duration-200">
                        <img
                            className="h-8 w-8 rounded-full"
                            src="/placeholder.svg?height=32&width=32"
                            alt="User avatar"
                        />
                        <div>
                            <p className="text-sm font-medium">Tom Cook</p>
                            <p className="text-xs text-gray-500">tom@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}