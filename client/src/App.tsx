import { OrderList } from "@/components/order-list";
import { OrderDetails } from "@/components/order-detail";
import { OrderForm } from "@/components/order-form";
import { useState } from "react";
import { ToasterEventListener } from "@/components/toaster-event-listener";

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState<null | string>(null);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const handleSelectOrder = (id: string | null) => {
    setSelectedOrder(id);
  };
  const handleSelectMode = (mode: "create" | "edit" | null) => {
    setMode(mode);
  };
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-foreground">
            Order Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and track all your orders
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderList
              handleSelectOrder={handleSelectOrder}
              handleSelectMode={handleSelectMode}
            />
          </div>

          <div className="lg:col-span-1">
            {mode !== null && (
              <OrderForm
                id={selectedOrder}
                onClose={() => {
                  handleSelectOrder(null);
                  handleSelectMode(null);
                }}
                mode={mode}
              />
            )}

            {selectedOrder && mode === null && (
              <OrderDetails
                onClose={() => handleSelectOrder(null)}
                id={selectedOrder}
              />
            )}

            {!selectedOrder && mode === null && (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">
                  Select an order to view details or create a new order
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <ToasterEventListener />
    </div>
  );
}
