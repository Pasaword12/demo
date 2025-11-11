-- Insert sample books
INSERT INTO "Book" ("id", "title", "author", "isbn", "category", "publisher", "publishedYear", "availableCopies", "totalCopies", "location", "description", "updatedAt")
VALUES
  ('book1', 'Manual de Navegación Aérea', 'Carlos González', '978-0-123456-78-9', 'Aviación', 'Editorial Aeronáutica', 2020, 3, 5, 'Estante A-1', 'Manual completo de navegación aérea para pilotos comerciales', CURRENT_TIMESTAMP),
  ('book2', 'Meteorología Aeronáutica', 'María Rodríguez', '978-0-234567-89-0', 'Meteorología', 'Editorial Cielo', 2019, 4, 5, 'Estante A-2', 'Fundamentos de meteorología aplicada a la aviación', CURRENT_TIMESTAMP),
  ('book3', 'Mantenimiento de Aeronaves', 'Juan Pérez', '978-0-345678-90-1', 'Mantenimiento', 'Editorial Técnica', 2021, 2, 3, 'Estante B-1', 'Procedimientos de mantenimiento preventivo y correctivo', CURRENT_TIMESTAMP),
  ('book4', 'Derecho Aeronáutico Internacional', 'Ana López', '978-0-456789-01-2', 'Legislación', 'Editorial Jurídica', 2022, 5, 5, 'Estante C-1', 'Normativa internacional de aviación civil', CURRENT_TIMESTAMP),
  ('book5', 'Factores Humanos en Aviación', 'Roberto Martínez', '978-0-567890-12-3', 'Psicología', 'Editorial Mente', 2020, 3, 4, 'Estante A-3', 'Estudio de factores humanos y ergonomía en aviación', CURRENT_TIMESTAMP);

-- Insert sample users
INSERT INTO "User" ("id", "name", "email", "phone", "userType", "department", "status", "updatedAt")
VALUES
  ('user1', 'Pedro Sánchez', 'pedro.sanchez@dgac.cl', '+56912345678', 'Piloto', 'Operaciones', 'Activo', CURRENT_TIMESTAMP),
  ('user2', 'Laura Torres', 'laura.torres@dgac.cl', '+56923456789', 'Personal Técnico', 'Mantenimiento', 'Activo', CURRENT_TIMESTAMP),
  ('user3', 'Diego Ramírez', 'diego.ramirez@dgac.cl', '+56934567890', 'Personal Administrativo', 'Recursos Humanos', 'Activo', CURRENT_TIMESTAMP),
  ('user4', 'Carmen Muñoz', 'carmen.munoz@dgac.cl', '+56945678901', 'Piloto', 'Instrucción', 'Activo', CURRENT_TIMESTAMP),
  ('user5', 'Francisco Silva', 'francisco.silva@dgac.cl', '+56956789012', 'Personal Técnico', 'Ingeniería', 'Inactivo', CURRENT_TIMESTAMP);

-- Insert sample loans
INSERT INTO "Loan" ("id", "bookId", "userId", "loanDate", "dueDate", "status", "updatedAt")
VALUES
  ('loan1', 'book1', 'user1', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP + INTERVAL '4 days', 'Activo', CURRENT_TIMESTAMP),
  ('loan2', 'book3', 'user2', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '6 days', 'Vencido', CURRENT_TIMESTAMP),
  ('loan3', 'book5', 'user4', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP + INTERVAL '9 days', 'Activo', CURRENT_TIMESTAMP);
