"use client"


import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export function CharacterSearchSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/characters?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/characters")
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Explora el Universo Marvel</h2>
        <p className="text-lg text-muted-foreground mb-8 text-pretty">
          Busca entre miles de personajes, cómics y eventos del universo Marvel
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar personajes (ej: Spider-Man, Iron Man...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90">
            Buscar
          </Button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/characters")}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            Ver Personajes
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/comics")}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            Ver Cómics
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/events")}
            className="hover:bg-primary/10 hover:text-primary hover:border-primary"
          >
            Ver Eventos
          </Button>
        </div>
      </div>
    </section>
  )
}
