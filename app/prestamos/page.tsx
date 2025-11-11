import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, CheckCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Loan {
  id: string
  bookTitle: string
  bookAuthor: string
  userName: string
  userEmail: string
  loanDate: Date
  dueDate: Date
  returnDate: Date | null
  status: string
  renewalCount: number
}

export default async function PrestamosPage() {
  const loans = await sql<Loan[]>`
    SELECT 
      l.id,
      b.title as "bookTitle",
      b.author as "bookAuthor",
      u.name as "userName",
      u.email as "userEmail",
      l."loanDate",
      l."dueDate",
      l."returnDate",
      l.status,
      l."renewalCount"
    FROM "Loan" l
    INNER JOIN "Book" b ON l."bookId" = b.id
    INNER JOIN "User" u ON l."userId" = u.id
    ORDER BY l."loanDate" DESC
  `

  const activeLoans = loans.filter((l) => l.status === "Activo")
  const overdueLoans = loans.filter((l) => l.status === "Vencido")
  const returnedLoans = loans.filter((l) => l.status === "Devuelto")

  function getDaysRemaining(dueDate: Date): number {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Préstamos</h2>
          <p className="text-muted-foreground">Administra los préstamos de libros de la biblioteca</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Préstamo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Préstamos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeLoans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueLoans.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Devueltos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{returnedLoans.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro de Préstamos</CardTitle>
          <CardDescription>Historial completo de préstamos de la biblioteca</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por libro, usuario..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Libro</TableHead>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Fecha Préstamo</TableHead>
                  <TableHead>Fecha Vencimiento</TableHead>
                  <TableHead>Días Restantes</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Renovaciones</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loans.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No hay préstamos registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  loans.map((loan) => {
                    const daysRemaining = getDaysRemaining(loan.dueDate)
                    const isOverdue = daysRemaining < 0 && loan.status !== "Devuelto"

                    return (
                      <TableRow key={loan.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{loan.bookTitle}</p>
                            <p className="text-xs text-muted-foreground">{loan.bookAuthor}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{loan.userName}</p>
                            <p className="text-xs text-muted-foreground">{loan.userEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{new Date(loan.loanDate).toLocaleDateString("es-CL")}</TableCell>
                        <TableCell className="text-sm">{new Date(loan.dueDate).toLocaleDateString("es-CL")}</TableCell>
                        <TableCell>
                          {loan.status === "Devuelto" ? (
                            <span className="text-sm text-muted-foreground">-</span>
                          ) : (
                            <span
                              className={`text-sm font-medium ${
                                isOverdue ? "text-red-600" : daysRemaining <= 3 ? "text-orange-600" : "text-green-600"
                              }`}
                            >
                              {isOverdue ? `${Math.abs(daysRemaining)} días vencido` : `${daysRemaining} días`}
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              loan.status === "Devuelto"
                                ? "secondary"
                                : loan.status === "Vencido"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {loan.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center text-sm">{loan.renewalCount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {loan.status !== "Devuelto" && (
                              <>
                                <Button variant="ghost" size="icon" title="Marcar como devuelto">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" title="Renovar préstamo">
                                  <RefreshCw className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
