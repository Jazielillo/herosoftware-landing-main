'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronDown } from 'lucide-react';

const servicios = [
    { id: 'migracion', label: 'Migración a la nube' },
    { id: 'despliegue', label: 'Despliegue' },
    { id: 'landingpage', label: 'Landing Page' },
    { id: 'uxui', label: 'Diseño UX/UI' },
    { id: 'branding', label: 'Identidad de marca' },
    { id: 'sistema', label: 'Sistema' },
    { id: 'contenido', label: 'Diseño de contenido' },
    { id: 'redes', label: 'Manejo de redes sociales' },
    { id: 'google', label: 'Negocio en Google' },
    { id: 'invitaciones', label: 'Invitaciones' },
    { id: 'tarjetas', label: 'Tarjetas de lealtad' },
    { id: 'menu', label: 'Menú' }
];

const formSchema = z.object({
    nombre: z.string().min(2, {
        message: 'El nombre debe tener al menos 2 caracteres.',
    }),
    email: z.string().email({
        message: 'Por favor ingresa un email válido.',
    }),
    telefono: z.string().optional(),
    servicios: z.array(z.string()).min(1, {
        message: 'Debes seleccionar al menos un servicio.',
    }),
    mensaje: z.string().optional(),
});

export default function ContactForm() {
    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('[data-combobox]')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: '',
            email: '',
            telefono: '',
            servicios: [],
            mensaje: '',
        },
    });

    function onSubmit(values: unknown) {
        console.log(values);
        alert('Formulario enviado correctamente');
    }

    const selectedServices = form.watch('servicios');
    const displayText = selectedServices.length > 0
        ? servicios
            .filter(s => selectedServices.includes(s.id))
            .map(s => s.label)
            .join(', ')
        : 'Personalizado';

    return (
        <div className="w-full mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    {/* Nombre de contacto */}
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">
                                    Nombre de contacto
                                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full ml-1 align-middle" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ej. Jhon Doe"
                                        className="bg-white dark:bg-background"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">
                                    E-mail
                                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full ml-1 align-middle" />
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ej. tuCorreo@mail.com"
                                        type="email"
                                        className="bg-white dark:bg-background"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Teléfono */}
                    <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Teléfono</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ej. 00 01 23 45 67"
                                        className="bg-white dark:bg-background"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Producto de interés */}
                    <FormField
                        control={form.control}
                        name="servicios"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">
                                    Producto de interés
                                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full ml-1 align-middle" />
                                </FormLabel>
                                <div className="relative" data-combobox>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="flex w-full items-center justify-between rounded-md border border-input bg-white dark:bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    >
                                        <span className={selectedServices.length === 0 ? 'text-muted-foreground' : ''}>
                                            {displayText}
                                        </span>
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </button>

                                    {isOpen && (
                                        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white dark:bg-background shadow-lg">
                                            <div className="p-2 space-y-2">
                                                {servicios.map((servicio) => (
                                                    <FormField
                                                        key={servicio.id}
                                                        control={form.control}
                                                        name="servicios"
                                                        render={({ field }) => {
                                                            return (
                                                                <div
                                                                    key={servicio.id}
                                                                    className="flex items-center space-x-2 hover:bg-accent rounded-sm p-2"
                                                                >
                                                                    <Checkbox
                                                                        checked={field.value?.includes(servicio.id)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, servicio.id])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== servicio.id
                                                                                    )
                                                                                );
                                                                        }}
                                                                    />
                                                                    <label
                                                                        className="text-sm font-normal cursor-pointer flex-1"
                                                                        onClick={() => {
                                                                            const isChecked = field.value?.includes(servicio.id);
                                                                            if (isChecked) {
                                                                                field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== servicio.id
                                                                                    )
                                                                                );
                                                                            } else {
                                                                                field.onChange([...field.value, servicio.id]);
                                                                            }
                                                                        }}
                                                                    >
                                                                        {servicio.label}
                                                                    </label>
                                                                </div>
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mensaje */}
                    <FormField
                        control={form.control}
                        name="mensaje"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-normal">Mensaje</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Cuéntanos sobre tu proyecto o dudas..."
                                        className="h-20 resize-none bg-white dark:bg-background"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Botón Enviar */}
                    <div className="space-y-2">
                        <Button
                            type="submit"
                            className="w-full bg-neutral-500 hover:bg-neutral-600 text-white"
                        >
                            Enviar
                        </Button>
                        <p className="text-xs text-neutral-400">
                            Protegemos tu privacidad. Solo usaremos tu información para responderte.
                        </p>
                    </div>
                </form>
            </Form>
        </div>
    );
}