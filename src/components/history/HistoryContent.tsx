"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock01Icon, Location01Icon, UserMultipleIcon, Cancel01Icon } from "hugeicons-react";
import { Button } from "@/src/components/ui/Button";

interface Order {
  id: string;
  packageId: string;
  packageTitle: string;
  packageImage: string;
  packageLocation: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  adults: number;
  children: number;
  travelDate: string;
  totalAmount: number;
  createdAt: string;
}

const statusStyles: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  completed: "bg-primary/10 text-primary",
  cancelled: "bg-red-100 text-red-600",
};

export function HistoryContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/users/me/orders");
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    setCancellingId(orderId);
    try {
      const response = await fetch(`/api/orders/${orderId}/cancel`, {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
    } finally {
      setCancellingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#F8FAFC] rounded-[2rem] p-6 animate-pulse"
          >
            <div className="flex gap-6">
              <div className="w-32 h-32 bg-slate-200 rounded-2xl"></div>
              <div className="flex-1">
                <div className="h-6 bg-slate-200 rounded-lg w-48 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded-lg w-32 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded-lg w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 rounded-full bg-[#F8FAFC] flex items-center justify-center mx-auto mb-6">
          <Clock01Icon className="w-10 h-10 text-text/30" />
        </div>
        <h2 className="text-2xl font-bold font-heading mb-4">
          No bookings yet
        </h2>
        <p className="text-text/60 mb-8 max-w-md mx-auto">
          You haven&apos;t made any travel bookings. Start exploring our
          packages and plan your next adventure!
        </p>
        <Link href="/packages">
          <Button>Explore Packages</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#F8FAFC] rounded-[2rem] p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div
              className="w-full md:w-40 h-40 rounded-2xl flex-shrink-0 bg-cover bg-center"
              style={{ backgroundImage: `url("${order.packageImage}")` }}
            ></div>

            {/* Details */}
            <div className="flex-1 flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold font-heading mb-2">
                    {order.packageTitle}
                  </h3>
                  <div className="flex items-center gap-2 text-text/60 text-sm">
                    <Location01Icon className="w-4 h-4" />
                    <span>{order.packageLocation}</span>
                  </div>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-text/70 mb-4">
                <div className="flex items-center gap-2">
                  <Clock01Icon className="w-4 h-4" />
                  <span>
                    {new Date(order.travelDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserMultipleIcon className="w-4 h-4" />
                  <span>
                    {order.adults} Adult{order.adults > 1 ? "s" : ""}
                    {order.children > 0 &&
                      `, ${order.children} Child${order.children > 1 ? "ren" : ""}`}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4">
                <div>
                  <span className="text-sm text-text/60">Total</span>
                  <p className="text-2xl font-bold text-primary font-heading">
                    ${order.totalAmount}
                  </p>
                </div>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingId === order.id}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <Cancel01Icon className="w-4 h-4" />
                    {cancellingId === order.id ? "Cancelling..." : "Cancel Booking"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
