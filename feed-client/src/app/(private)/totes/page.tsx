"use client"

import {Filter, Search, SlidersHorizontal} from "lucide-react"
import Image from "next/image"

import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {useToteStore} from "@/features/totes/totes.store"
import {ToteFilters} from "@/features/totes/tote-filters";
import {useSearchTotesDashboardQuery} from "@/shared/graphql/operations";
import {useEffect} from "react";

export default function TotesPage() {
    // Get state and actions from the store
    const {
        filteredProducts,
        products,
        filters,
        sortOption,
        showMobileFilters,
        setShowMobileFilters,
        setSortOption,
        updateFilter,
        resetFilters,
        addToCart,
    } = useToteStore()

    const { data } = useSearchTotesDashboardQuery({
        variables: {
            page: 1,
            size: 20
        }
    })

    useEffect(() => {
        if (data !== undefined) {
            useToteStore.setState({
                products: data.totes,
                filteredProducts: data.totes
            })
        }
    }, [data])

    // Handle adding to cart with toast notification
    const handleAddToCart = (product: any) => {
        addToCart(product)
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
                                    onChange={(e) => updateFilter("searchQuery", e.target.value)}
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
                                <ToteFilters />
                            </div>
                            <div className="mt-6 flex gap-4">
                                <Button variant="outline" className="flex-1" onClick={resetFilters}>
                                    Clear All
                                </Button>
                                <Button
                                    className="flex-1 bg-[#415444] hover:bg-[#415444]/90"
                                    onClick={() => setShowMobileFilters(false)}
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
                                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                                        Clear All
                                    </Button>
                                </div>
                                <ToteFilters />
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
                                                        updateFilter(
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
                                                        updateFilter(
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
                                                        updateFilter(
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
                                                        updateFilter(
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
                                                        updateFilter(
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
                                                <button className="ml-2" onClick={() => updateFilter("availability", "all")}>
                                                    ×
                                                </button>
                                            </Badge>
                                        )}
                                        {filters.minRating > 0 && (
                                            <Badge variant="secondary" className="px-3 py-1">
                                                {filters.minRating}+ Stars
                                                <button className="ml-2" onClick={() => updateFilter("minRating", 0)}>
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
                                                    src={product.bannerURL || "/placeholder.svg"}
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
                                                        onClick={() => handleAddToCart(product)}
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
