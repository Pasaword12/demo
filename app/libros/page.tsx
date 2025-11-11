import { sql } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Book {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  publisher: string
  publishedYear: number
  availableCopies: number
  totalCopies: number
  location: string
}

export default async function LibrosPage() {
  const books = await sql<Book[]>`
    SELECT 
      id, title, author, isbn, category, publisher, 
      "publishedYear", "availableCopies", "totalCopies", location
    FROM "Book"
    ORDER BY title ASC
  `

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestión de Libros</h2>
          <p className="text-muted-foreground">Administra el catálogo de libros de la biblioteca</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agregar Libro
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catálogo de Libros</CardTitle>
          <CardDescription>
            {books.length} {books.length === 1 ? "libro" : "libros"} en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Buscar por título, autor, ISBN..." className="pl-10" />
            </div>
            <Button variant="outline">Filtros</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Autor</TableHead>
                  <TableHead>ISBN</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead className="text-center">Disponibles</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                      No hay libros registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{book.location}</TableCell>
                      <TableCell className="text-center">
                        <span className={book.availableCopies === 0 ? "text-destructive" : ""}>
                          {book.availableCopies}/{book.totalCopies}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
