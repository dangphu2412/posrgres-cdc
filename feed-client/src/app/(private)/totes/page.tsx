"use client"

import {Filter, Search, SlidersHorizontal} from "lucide-react"
import Image from "next/image"
import {useCallback, useEffect, useState} from "react"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {toast} from "sonner"
import {ToteFilters} from "@/features/totes/tote-filters";
import {useGetTotesListingQuery} from "@/shared/graphql-client/api/graphql";

// Product interface
interface Product {
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
interface CartItem extends Product {
    quantity: number
}

export default function TotesPage() {
    // State for mobile filter drawer
    const [showMobileFilters, setShowMobileFilters] = useState(false)

    // State for cart items
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const { data } = useGetTotesListingQuery({
        variables: {
            page: 1,
            size: 10,
        }
    });

    // State for products with initial data
    const [products, setProducts] = useState<Product[]>([
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
    ])

    // State for filtered products
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

    // State for filters
    const [filters, setFilters] = useState({
        colors: [] as string[],
        priceRange: { min: 0, max: 300 },
        materials: [] as string[],
        sizes: [] as string[],
        tags: [] as string[],
        availability: "all",
        minRating: 0,
        styles: [] as string[],
        searchQuery: "",
    })

    // State for sorting
    const [sortOption, setSortOption] = useState("featured")

    // Update quantity in cart
    const updateQuantity = useCallback((itemId: string, change: number) => {
        setCartItems(
            (prevItems) =>
                prevItems
                    .map((item) => {
                        if (item.id === itemId) {
                            const newQuantity = Math.max(0, item.quantity + change)
                            if (newQuantity === 0) {
                                toast("Item removed", {
                                    description: `${item.name} has been removed from your cart.`,
                                })
                                return null
                            }
                            return { ...item, quantity: newQuantity }
                        }
                        return item
                    })
                    .filter(Boolean) as CartItem[],
        )
    }, [])

    // Add to cart function
    const addToCart = useCallback((product: Product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === product.id)
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === product.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
                )
            }
            toast("Item added to cart", {
                description: `${product.name} has been added to your cart.`,
            })
            return [...prevItems, { ...product, quantity: 1 }]
        })
    }, [])

    // Apply filters function
    const applyFilters = useCallback(() => {
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

        setFilteredProducts(result)
    }, [filters, products, sortOption])

    // Apply filters whenever filters or sort option changes
    useEffect(() => {
        applyFilters()
    }, [filters, sortOption, applyFilters])

    // Handle filter changes
    const handleFilterChange = (filterType: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }))
    }

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-[#fcfdfd]">
                {/* Main Content */}
                <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
                    <header className="mb-8 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="md:hidden" />
                            <div>
                                <h2 className="text-2xl font-semibold">Tote Bag Collection</h2>
                                <p className="text-gray-500">Find your perfect tote bag</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <Input
                                    className="w-64 pl-10"
                                    placeholder="Search totes..."
                                    value={filters.searchQuery}
                                    onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                                />
                            </div>
                        </div>
                    </header>

                    <div className="lg:grid lg:grid-cols-4 gap-6">
                        {/* Mobile filter button */}
                        <div className="flex items-center justify-between mb-4 lg:hidden">
                            <Button
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => setShowMobileFilters(!showMobileFilters)}
                            >
                                <Filter className="h-4 w-4" />
                                Filters
                            </Button>
                            <div className="flex items-center gap-2">
                                <Select value={sortOption} onValueChange={setSortOption}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="featured">Featured</SelectItem>
                                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Mobile filters drawer */}
                        <div
                            className={`
              fixed inset-0 z-50 bg-white p-6 transition-transform duration-300 transform 
              ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}
              lg:hidden
            `}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold">Filters</h3>
                                <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18 6L6 18M6 6L18 18"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Button>
                            </div>
                            <div className="overflow-y-auto h-[calc(100vh-120px)]">
                                <ToteFilters filters={filters} onFilterChange={handleFilterChange} />
                            </div>
                            <div className="mt-6 flex gap-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => {
                                        setFilters({
                                            colors: [],
                                            priceRange: { min: 0, max: 300 },
                                            materials: [],
                                            sizes: [],
                                            tags: [],
                                            availability: "all",
                                            minRating: 0,
                                            styles: [],
                                            searchQuery: "",
                                        })
                                    }}
                                >
                                    Clear All
                                </Button>
                                <Button
                                    className="flex-1 bg-[#415444] hover:bg-[#415444]/90"
                                    onClick={() => {
                                        applyFilters()
                                        setShowMobileFilters(false)
                                    }}
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </div>

                        {/* Desktop filters sidebar */}
                        <div className="hidden lg:block lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Filters</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setFilters({
                                                colors: [],
                                                priceRange: { min: 0, max: 300 },
                                                materials: [],
                                                sizes: [],
                                                tags: [],
                                                availability: "all",
                                                minRating: 0,
                                                styles: [],
                                                searchQuery: "",
                                            })
                                        }}
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                <ToteFilters filters={filters} onFilterChange={handleFilterChange} />
                            </div>
                        </div>

                        {/* Product grid */}
                        <div className="lg:col-span-3">
                            {/* Desktop sorting */}
                            <div className="hidden lg:flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500">
                                        Showing {filteredProducts.length} of {products.length} products
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="h-4 w-4 text-gray-500" />
                                    <Select value={sortOption} onValueChange={setSortOption}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="featured">Featured</SelectItem>
                                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                                            <SelectItem value="rating">Highest Rated</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Active filters */}
                            {(filters.colors.length > 0 ||
                                filters.materials.length > 0 ||
                                filters.sizes.length > 0 ||
                                filters.tags.length > 0 ||
                                filters.styles.length > 0 ||
                                filters.availability !== "all" ||
                                filters.minRating > 0) && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {filters.colors.map((color) => (
                                            <Badge key={color} variant="secondary" className="px-3 py-1">
                                                {color.charAt(0).toUpperCase() + color.slice(1)}
                                                <button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "colors",
                                                            filters.colors.filter((c) => c !== color),
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                        {filters.materials.map((material) => (
                                            <Badge key={material} variant="secondary" className="px-3 py-1">
                                                {material.charAt(0).toUpperCase() + material.slice(1)}
                                                <button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "materials",
                                                            filters.materials.filter((m) => m !== material),
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                        {filters.sizes.map((size) => (
                                            <Badge key={size} variant="secondary" className="px-3 py-1">
                                                {size.charAt(0).toUpperCase() + size.slice(1)}
                                                <button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "sizes",
                                                            filters.sizes.filter((s) => s !== size),
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                        {filters.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="px-3 py-1">
                                                {tag === "new" ? "New Arrival" : "Best Seller"}
                                                <button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "tags",
                                                            filters.tags.filter((t) => t !== tag),
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                        {filters.styles.map((style) => (
                                            <Badge key={style} variant="secondary" className="px-3 py-1">
                                                {style.charAt(0).toUpperCase() + style.slice(1)}
                                                <button
                                                    className="ml-2"
                                                    onClick={() =>
                                                        handleFilterChange(
                                                            "styles",
                                                            filters.styles.filter((s) => s !== style),
                                                        )
                                                    }
                                                >
                                                    ×
                                                </button>
                                            </Badge>
                                        ))}
                                        {filters.availability !== "all" && (
                                            <Badge variant="secondary" className="px-3 py-1">
                                                {filters.availability === "instock" ? "In Stock" : "Pre-order"}
                                                <button className="ml-2" onClick={() => handleFilterChange("availability", "all")}>
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {filters.minRating > 0 && (
                                            <Badge variant="secondary" className="px-3 py-1">
                                                {filters.minRating}+ Stars
                                                <button className="ml-2" onClick={() => handleFilterChange("minRating", 0)}>
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Products */}
                            {filteredProducts.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="text-center">
                                        <h3 className="text-lg font-semibold mb-2">No products found</h3>
                                        <p className="text-gray-500">Try adjusting your filters or search query</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <Card
                                            key={product.id}
                                            className="group border-0 bg-[#e0e5ce] rounded-[24px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                        >
                                            <CardHeader className="p-0 relative">
                                                <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 z-10" />
                                                <Button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 transform scale-95 transition-all group-hover:opacity-100 group-hover:scale-100 bg-white text-black hover:bg-white/90">
                                                    Quick View
                                                </Button>
                                                {(product.isNewArrival || product.isBestSeller) && (
                                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                                        {product.isNewArrival && <Badge className="bg-[#338838] hover:bg-[#338838]">New</Badge>}
                                                        {product.isBestSeller && (
                                                            <Badge className="bg-[#d4a017] hover:bg-[#d4a017]">Best Seller</Badge>
                                                        )}
                                                    </div>
                                                )}
                                                {!product.inStock && (
                                                    <Badge variant="outline" className="absolute top-4 right-4 z-10 bg-white/80">
                                                        Pre-order
                                                    </Badge>
                                                )}
                                                <Image
                                                    src={product.image || "/placeholder.svg"}
                                                    alt={product.name}
                                                    width={400}
                                                    height={400}
                                                    className="h-[280px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </CardHeader>
                                            <CardContent className="p-6 space-y-4">
                                                <div>
                                                    <h4 className="text-lg font-semibold mb-1 line-clamp-1">{product.name}</h4>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex items-center">
                                                            {[...Array(5)].map((_, i) => (
                                                                <svg
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                >
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            ))}
                                                        </div>
                                                        <span className="text-sm text-gray-600">({product.rating})</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[#338838] text-xl font-semibold">$ {product.price.toFixed(2)}</p>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="rounded-full hover:bg-[#415444] hover:text-white transition-colors"
                                                        onClick={() => addToCart(product)}
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
