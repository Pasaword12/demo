"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type FormValues = {
  name: string
  email: string
  phone?: string
  userType?: string
  department?: string
}

export default function RegistroUsuarioPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch('/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Error en el registro')
      }

      // Redirigir al listado de usuarios
      router.push('/usuarios')
    } catch (err) {
      console.error(err)
      // En una mejora futura mostrar un toast amigable
      alert('No se pudo registrar el usuario. Revisa la consola para más detalles.')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Registro de Usuario</h2>
        <p className="text-muted-foreground">Crea un nuevo miembro para la biblioteca</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nuevo Usuario</CardTitle>
          <CardDescription>Completa los datos para registrar a un nuevo miembro</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-2xl gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">Nombre</label>
              <Input {...register('name', { required: 'Nombre es requerido' })} />
              {errors.name && <p className="text-destructive text-sm mt-1">{String(errors.name.message)}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <Input type="email" {...register('email', { required: 'Email es requerido' })} />
              {errors.email && <p className="text-destructive text-sm mt-1">{String(errors.email.message)}</p>}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Teléfono</label>
              <Input {...register('phone')} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Tipo de Usuario</label>
              <select {...register('userType')} className="h-9 w-full rounded-md border bg-transparent px-3 py-1">
                <option value="Piloto">Piloto</option>
                <option value="Personal Técnico">Personal Técnico</option>
                <option value="Personal Administrativo">Personal Administrativo</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Departamento</label>
              <Input {...register('department')} />
            </div>

            <div className="pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Guardando...' : 'Registrar Usuario'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
