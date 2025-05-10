import { create } from "zustand"

// Product interface
export interface Product {
    id: string
    name: string
    price: number
    rating: number
    image: string
    color: string
    material: string
    size: string
    isNewArrival: boolean
    isBestSeller: boolean
    inStock: boolean
    style: string[]
}

// Cart item interface
export interface CartItem extends Product {
    quantity: number
}

// Filter interface
export interface Filters {
    colors: string[]
    priceRange: { min: number; max: number }
    materials: string[]
    sizes: string[]
    tags: string[]
    availability: string
    minRating: number
    styles: string[]
    searchQuery: string
}

// Initial products data
const initialProducts: Product[] = [
    {
        id: "1",
        name: "Monocle Canvas Tote Bag",
        price: 213.99,
        rating: 4.9,
        color: "beige",
        material: "canvas",
        size: "large",
        isNewArrival: true,
        isBestSeller: true,
        inStock: true,
        style: ["everyday", "work"],
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/The%20Best%20Media%20Tote%20Bags,%20Ranked.jpg-z2O2nGPSTrjey8xEM1cc5aTI2ggjXE.jpeg",
    },
    {
        id: "2",
        name: "Square One District Tote",
        price: 189.99,
        rating: 4.9,
        color: "black",
        material: "canvas",
        size: "medium",
        isNewArrival: false,
        isBestSeller: true,
        inStock: true,
        style: ["minimalist", "work"],
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg",
    },
    {
        id: "3",
        name: "Sporty & Rich Canvas Tote",
        price: 221.99,
        rating: 4.9,
        color: "white",
        material: "canvas",
        size: "large",
        isNewArrival: true,
        isBestSeller: false,
        inStock: true,
        style: ["everyday", "travel"],
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download%20(2).jpg-zbeT25jMphcVf4DmpAlTVsGALg88Zn.jpeg",
    },
    {
        id: "4",
        name: "Eco-Friendly Jute Tote",
        price: 49.99,
        rating: 4.7,
        color: "brown",
        material: "jute",
        size: "medium",
        isNewArrival: false,
        isBestSeller: false,
        inStock: true,
        style: ["eco-friendly", "everyday"],
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "5",
        name: "Premium Leather Tote",
        price: 299.99,
        rating: 4.8,
        color: "brown",
        material: "leather",
        size: "large",
        isNewArrival: false,
        isBestSeller: true,
        inStock: true,
        style: ["work", "minimalist"],
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "6",
        name: "Pastel Cotton Mini Tote",
        price: 39.99,
        rating: 4.5,
        color: "pastel",
        material: "cotton",
        size: "small",
        isNewArrival: true,
        isBestSeller: false,
        inStock: true,
        style: ["everyday", "boho"],
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "7",
        name: "Limited Edition Art Tote",
        price: 149.99,
        rating: 4.9,
        color: "bright",
        material: "canvas",
        size: "medium",
        isNewArrival: true,
        isBestSeller: false,
        inStock: false,
        style: ["boho", "travel"],
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "8",
        name: "Recycled Plastic Beach Tote",
        price: 79.99,
        rating: 4.6,
        color: "bright",
        material: "recycled",
        size: "large",
        isNewArrival: false,
        isBestSeller: false,
        inStock: true,
        style: ["travel", "eco-friendly"],
        image: "/placeholder.svg?height=400&width=400",
    },
    {
        id: "9",
        name: "Minimalist Black Canvas Tote",
        price: 89.99,
        rating: 4.8,
        color: "black",
        material: "canvas",
        size: "medium",
        isNewArrival: false,
        isBestSeller: true,
        inStock: true,
        style: ["minimalist", "work"],
        image: "/placeholder.svg?height=400&width=400",
    },
]

// Default filters
const defaultFilters: Filters = {
    colors: [],
    priceRange: { min: 0, max: 300 },
    materials: [],
    sizes: [],
    tags: [],
    availability: "all",
    minRating: 0,
    styles: [],
    searchQuery: "",
}

// Store interface
interface ToteStore {
    // State
    products: Product[]
    filteredProducts: Product[]
    cartItems: CartItem[]
    filters: Filters
    sortOption: string
    showMobileFilters: boolean

    // Actions
    setShowMobileFilters: (show: boolean) => void
    setSortOption: (option: string) => void
    updateFilter: (filterType: keyof Filters, value: any) => void
    resetFilters: () => void
    addToCart: (product: Product) => void
    updateQuantity: (itemId: string, change: number) => void
    clearCart: () => void
    applyFilters: () => void
}

// Create the store
export const useToteStore = create<ToteStore>()(
        (set, get) => ({
            // Initial state
            products: initialProducts,
            filteredProducts: initialProducts,
            cartItems: [],
            filters: defaultFilters,
            sortOption: "featured",
            showMobileFilters: false,

            // Actions
            setShowMobileFilters: (show) => set({ showMobileFilters: show }),

            setSortOption: (option) => {
                set({ sortOption: option })
                get().applyFilters()
            },

            updateFilter: (filterType, value) => {
                set((state) => ({
                    filters: {
                        ...state.filters,
                        [filterType]: value,
                    },
                }))
                get().applyFilters()
            },

            resetFilters: () => {
                set({ filters: defaultFilters })
                get().applyFilters()
            },

            applyFilters: () => {
                const { products, filters, sortOption } = get()
                let result = [...products]

                // Filter by search query
                if (filters.searchQuery) {
                    const query = filters.searchQuery.toLowerCase()
                    result = result.filter(
                        (product) => product.name.toLowerCase().includes(query) || product.material.toLowerCase().includes(query),
                    )
                }

                // Filter by colors
                if (filters.colors.length > 0) {
                    result = result.filter((product) => filters.colors.includes(product.color))
                }

                // Filter by price range
                result = result.filter(
                    (product) => product.price >= filters.priceRange.min && product.price <= filters.priceRange.max,
                )

                // Filter by materials
                if (filters.materials.length > 0) {
                    result = result.filter((product) => filters.materials.includes(product.material))
                }

                // Filter by sizes
                if (filters.sizes.length > 0) {
                    result = result.filter((product) => filters.sizes.includes(product.size))
                }

                // Filter by tags (new arrivals, best sellers)
                if (filters.tags.length > 0) {
                    result = result.filter(
                        (product) =>
                            (filters.tags.includes("new") && product.isNewArrival) ||
                            (filters.tags.includes("bestseller") && product.isBestSeller),
                    )
                }

                // Filter by availability
                if (filters.availability === "instock") {
                    result = result.filter((product) => product.inStock)
                } else if (filters.availability === "preorder") {
                    result = result.filter((product) => !product.inStock)
                }

                // Filter by minimum rating
                if (filters.minRating > 0) {
                    result = result.filter((product) => product.rating >= filters.minRating)
                }

                // Filter by styles
                if (filters.styles.length > 0) {
                    result = result.filter((product) => product.style.some((style) => filters.styles.includes(style)))
                }

                // Apply sorting
                if (sortOption === "price-asc") {
                    result.sort((a, b) => a.price - b.price)
                } else if (sortOption === "price-desc") {
                    result.sort((a, b) => b.price - a.price)
                } else if (sortOption === "rating") {
                    result.sort((a, b) => b.rating - a.rating)
                }
                // "featured" sorting is default order

                set({ filteredProducts: result })
            },

            addToCart: (product) => {
                const { cartItems } = get()
                const existingItem = cartItems.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        cartItems: cartItems.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                        ),
                    })
                } else {
                    set({
                        cartItems: [...cartItems, { ...product, quantity: 1 }],
                    })
                }
            },

            updateQuantity: (itemId, change) => {
                const { cartItems } = get()
                const updatedItems = cartItems
                    .map((item) => {
                        if (item.id === itemId) {
                            const newQuantity = Math.max(0, item.quantity + change)
                            if (newQuantity === 0) {
                                return null
                            }
                            return { ...item, quantity: newQuantity }
                        }
                        return item
                    })
                    .filter(Boolean) as CartItem[]

                set({ cartItems: updatedItems })
            },

            clearCart: () => set({ cartItems: [] }),
        }),
)
