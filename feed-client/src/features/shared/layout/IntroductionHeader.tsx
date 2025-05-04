"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {WavesIcon as WaveIcon} from "lucide-react"
import {cn} from "@/lib/utils"
import {usePathname} from "next/navigation"
import {signOut, useSession} from "next-auth/react";

export function IntroductionHeader() {
    const pathname = usePathname()
    const { status } = useSession();
    const isAuthenticated = status === 'authenticated';

    return (
        <header className="mx-auto w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Branding */}
                    <Link href="/" className="flex items-center gap-2">
                        <WaveIcon className="h-6 w-6 text-yellow-500" />
                        <span className="font-bold text-lg">Hello there</span>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/docs"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === "/docs" ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            Docs
                        </Link>
                        <Link
                            href="/pricing"
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === "/pricing" ? "text-primary" : "text-muted-foreground",
                            )}
                        >
                            Pricing
                        </Link>
                    </nav>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2">
                    {!isAuthenticated && <Link
                        href="/login"
                        className={cn(
                            "text-sm font-medium transition-colors hover:text-primary",
                            pathname === "/login" ? "text-primary" : "text-muted-foreground",
                        )}
                    >
                        Login
                    </Link>}
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                        Contact
                    </Link>
                    {!isAuthenticated && <Button asChild size="sm" className="ml-4">
                        <Link href="/signup">Sign Up</Link>
                    </Button>}
                    {isAuthenticated && <Button size="sm" className="ml-4 cursor-pointer" onClick={() => signOut({
                        callbackUrl: '/',
                    })}>Log out</Button>}
                </div>
            </div>
        </header>
    )
}
