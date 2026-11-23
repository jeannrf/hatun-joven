# Panel del equipo (/admin)

**Dirección:** https://hatun-joven.web.app/admin
**Acceso:** solo contraseña (pídela al responsable del proyecto; no se guarda en este repositorio).

El panel es ahora el **Event Management Hub**: ponentes, participantes, postulaciones, organizaciones, sponsors, finanzas y equipo. Su diseño y plan están en [Event Hub](07-event-hub.md). Esta página explica lo que ya funciona con datos reales.

## Dónde está cada registro

| Registros | Dónde |
| --- | --- |
| Inscripciones | **Participantes** (`/admin/participantes`) |
| Postulaciones de sponsor | **Postulaciones** → pestaña «Sponsors» |
| Postulaciones de comunidad | **Postulaciones** → pestaña «Comunidades» |

## Qué se puede hacer

- **Indicadores:** inscritos, de 14 a 20 años, menores de 18, últimos 7 días, inscripciones por semana y por edad.
- **Buscar** por nombre, colegio, organización, celular o correo.
- **Ordenar** pulsando el título de cualquier columna.
- **Contactar:** el celular abre WhatsApp y el correo abre un mensaje nuevo.
- **Exportar a Excel:** descarga lo que se ve en pantalla (pestaña, filtro y búsqueda) en `.csv` (separado por `;`, se abre bien en Excel en español).
- **Borrar** un registro (pide confirmación en una ventana y no se puede deshacer).
- **Actualizar** para traer los registros más nuevos, y **Salir** para cerrar la sesión.

Los registros no se pueden editar, solo ver, exportar o borrar.

## Cambiar la contraseña

Consola de Firebase → **Authentication** → **Usuarios** → fila `admin@hatun-joven.web.app` → menú ⋮ → **Restablecer contraseña**.

Ese correo es solo un identificador interno: no es un buzón real y nadie lo escribe al entrar.

## Datos personales

Los registros incluyen datos de menores de edad. Solo deben verlos las personas del equipo que los necesiten, y los archivos exportados no deben compartirse fuera del equipo.

## Edades

El formulario acepta **cualquier edad**, para que nadie ponga una edad falsa; el público objetivo es de **14 a 20 años**. Los menores de 14 deben marcar que un adulto responsable sabe que asisten (columna «Adulto responsable»). En Participantes:

- El filtro **Edad** muestra «De 14 a 20 años», «Fuera de 14 a 20» o «Menores de 18».
- Las edades fuera del rango aparecen en rojo con la nota «fuera de rango».
- Los indicadores cuentan los inscritos en el rango y los menores de 18.
- **Exportar a Excel** descarga exactamente lo que se ve (con filtro y búsqueda aplicados).
