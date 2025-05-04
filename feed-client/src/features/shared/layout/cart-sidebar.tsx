"use client"

import Image from "next/image"
import { useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface CartItem {
    id: string
    name: string
    price: number
    size: string
    quantity: number
    image: string
}

interface CartSidebarProps {
    cartItems: CartItem[]
    updateQuantity: (itemId: string, change: number) => void
}

export function CartSidebar({ cartItems, updateQuantity }: CartSidebarProps) {
    const calculateTotal = useCallback((items: CartItem[]) => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
    }, [])

    const cartTotal = calculateTotal(cartItems)

    return (
        <aside className="w-96 border-l px-8 py-8 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
                <h3 className="text-2xl font-semibold">My Cart</h3>
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-2">
                    <span className="sr-only">Back</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15 19L8 12L15 5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Button>
            </div>

            <div className="space-y-8 flex-grow overflow-auto">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-6 bg-white rounded-3xl p-4 shadow-sm">
                        <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="h-[100px] w-[100px] rounded-2xl bg-[#e0e5ce] object-cover"
                        />
                        <div className="flex-1">
                            <div className="mb-4 flex items-start justify-between">
                                <div>
                                    <h4 className="font-semibold text-lg">{item.name}</h4>
                                    <p className="text-sm text-[#338838] mt-1">SIZE {item.size}</p>
                                    <p className="font-semibold mt-2">$ {item.price}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -item.quantity)}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                            fill="currentColor"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Button>
                            </div>
                            <div className="flex items-center justify-end">
                                <div className="flex items-center gap-4 bg-[#f7f7f7] rounded-full px-4 py-1">
                                    <button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={() => updateQuantity(item.id, -1)}
                                        aria-label={`Decrease quantity of ${item.name}`}
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                        className="text-gray-500 hover:text-gray-700"
                                        onClick={() => updateQuantity(item.id, 1)}
                                        aria-label={`Increase quantity of ${item.name}`}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between text-base">
                    <p className="text-gray-600">Sub Total</p>
                    <p className="font-semibold">$ {cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between text-base">
                    <p className="text-gray-600">Shipping</p>
                    <p className="text-[#338838]">FREE</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg font-semibold">
                    <p>Total</p>
                    <p>$ {cartTotal.toFixed(2)}</p>
                </div>
                <Button className="w-full bg-[#415444] hover:bg-[#415444]/90 rounded-2xl h-14 text-lg font-semibold mt-4">
                    Checkout
                </Button>
            </div>
        </aside>
    )
}
