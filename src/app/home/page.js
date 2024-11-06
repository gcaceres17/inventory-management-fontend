'use client'

import Sidebar from '@/components/sidebar'

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-3xl font-bold mb-8">Bienvenido al Sistema de Gestión de Inventario</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Inventario Total</h3>
                <p className="text-sm text-muted-foreground mb-4">Gestiona tu inventario actual</p>
                <div className="text-3xl font-bold">1,234</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Órdenes Pendientes</h3>
                <p className="text-sm text-muted-foreground mb-4">Órdenes que requieren atención</p>
                <div className="text-3xl font-bold">23</div>
              </div>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Clientes Activos</h3>
                <p className="text-sm text-muted-foreground mb-4">Total de clientes registrados</p>
                <div className="text-3xl font-bold">156</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}