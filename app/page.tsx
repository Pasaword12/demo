import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, FileText, TrendingUp, Plus } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Panel de Control</h2>
          <p className="text-muted-foreground">Bienvenido al sistema de gestión de biblioteca DGAC</p>
        </div>

        <Link href="/usuarios/registro">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Registrar Usuario
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Libros</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+12 desde el mes pasado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+8 nuevos miembros</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Préstamos Activos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">15 vencen esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Circulación</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+4% vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Préstamos Recientes</CardTitle>
            <CardDescription>Últimos 5 préstamos realizados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { book: "Manual de Navegación Aérea", user: "Pedro Sánchez", date: "Hace 2 horas" },
                { book: "Meteorología Aeronáutica", user: "Laura Torres", date: "Hace 5 horas" },
                { book: "Derecho Aeronáutico", user: "Carmen Muñoz", date: "Hace 1 día" },
                { book: "Factores Humanos", user: "Diego Ramírez", date: "Hace 1 día" },
                { book: "Mantenimiento de Aeronaves", user: "Roberto Silva", date: "Hace 2 días" },
              ].map((loan, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{loan.book}</p>
                    <p className="text-xs text-muted-foreground">{loan.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{loan.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préstamos Próximos a Vencer</CardTitle>
            <CardDescription>Libros que deben devolverse pronto</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { book: "Manual de Vuelo", user: "Ana López", days: "2 días" },
                { book: "Sistemas de Navegación", user: "Carlos García", days: "3 días" },
                { book: "Regulaciones FAA", user: "María Fernández", days: "4 días" },
                { book: "Aerodinámica Básica", user: "Juan Pérez", days: "5 días" },
                { book: "Comunicaciones Aéreas", user: "Isabel Rojas", days: "6 días" },
              ].map((loan, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{loan.book}</p>
                    <p className="text-xs text-muted-foreground">{loan.user}</p>
                  </div>
                  <p className="text-xs font-medium text-orange-600">{loan.days}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
