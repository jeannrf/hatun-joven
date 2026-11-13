# Panel del equipo (/admin)

**Dirección:** https://hatun-joven.web.app/admin
**Acceso:** solo contraseña (pídela al responsable del proyecto; no se guarda en este repositorio).

## Qué se puede hacer

- **Resumen:** total de inscritos, sponsors, comunidades y registros de los últimos 7 días.
- **Pestañas:** Inscripciones, Sponsors y Comunidades.
- **Buscar** por nombre, colegio, organización, celular o correo.
- **Contactar:** el celular abre WhatsApp y el correo abre un mensaje nuevo.
- **Exportar a Excel:** descarga lo que se ve en pantalla (pestaña, filtro y búsqueda) en `.csv` (separado por `;`, se abre bien en Excel en español).
- **Borrar** un registro (pide confirmación y no se puede deshacer).
- **Actualizar** para traer los registros más nuevos, y **Salir** para cerrar la sesión.

Los registros no se pueden editar, solo ver, exportar o borrar.

## Cambiar la contraseña

Consola de Firebase → **Authentication** → **Usuarios** → fila `admin@hatun-joven.web.app` → menú ⋮ → **Restablecer contraseña**.

Ese correo es solo un identificador interno: no es un buzón real y nadie lo escribe al entrar.

## Datos personales

Los registros incluyen datos de menores de edad. Solo deben verlos las personas del equipo que los necesiten, y los archivos exportados no deben compartirse fuera del equipo.

## Edades

El formulario acepta **cualquier edad**, para que nadie ponga una edad falsa; el público objetivo es de **14 a 20 años**. Los menores de 14 deben marcar que un adulto responsable sabe que asisten (columna «Adulto responsable»). En la pestaña Inscripciones:

- El filtro **«De 14 a 20 años» / «Fuera de 14 a 20»** muestra solo esas filas.
- Las edades fuera del rango aparecen en rojo con la nota «fuera de rango».
- El resumen cuenta cuántos inscritos están fuera del rango.
- **Exportar a Excel** descarga exactamente lo que se ve (con filtro y búsqueda aplicados).
