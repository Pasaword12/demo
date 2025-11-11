import { BookMarked } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center gap-4 px-6">
        <div className="flex items-center gap-3">
          <BookMarked className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-foreground">Sistema de Biblioteca</h1>
            <p className="text-xs text-muted-foreground">DGAC - Dirección General de Aeronáutica Civil</p>
          </div>
        </div>
      </div>
    </header>
  )
}
