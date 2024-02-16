# Prueba técnica frontend

Prueba técnica que se realiza a los candidatos al cargo de Frontend Developer.

## Objetivos

Nota: para la maquetacion del Frontend puedes usar Next JS y ten en cuenta que no habra guia de diseño lo que corresponde que es totalmente abierto en como deseas maquetar el Frontend.

Solo se adjuntara una guia para como se deberian ver las diferrentes cards en el Frontend

![Logo](https://res.cloudinary.com/dwx09pwkr/image/upload/v1696868567/Holafly/s4dryoh9rtu1cshyys18.png)

![Logo](https://res.cloudinary.com/dwx09pwkr/image/upload/v1696868567/Holafly/wq0ci1pyltmdcx6qwi96.png)

- Realizar un sistema de autenticacion (LOGIN) con NodeJs que permita ingresar a un usuario, no hace falta que hagas un registro lo puedes tener ya creado en la BD.

- Crear un GET que retorne el perfil del usuario con el id del usuario y el nombre.

- Crear un GET que retorne 3 tipos de tarjetas las cuales cada una de ellas tendran un estado (Expired - Pending - Active), que datos contendran cada una, aqui te dejamos un JSON de ejemplo.

```javascript
[
  {
        status: "Expired",
        dateStart: "01/01/2023",
        dateEnd: "04/01/2023",
        comsuption: null,
        flag:"", // URL de la imagen del country
        country: 'Colombia'
        plan: "4 dias, 3GB"
    },
     {
        status: "Expired",
        dateStart: "02/01/2023",
        dateEnd: "02/01/2023",
        comsuption: null,
        flag:"",
        country: 'Colombia'
        plan: "30 dias, 25GB"
    },
     {
        status: "Pending",
        dateStart: "01/01/2024",
        dateEnd: null,
        comsuption: {
            totalComsumption: 1468006.4,
        },
        flag:"", // URL de la imagen del country
        country: 'Peru'
        plan: "1 dia, 1.4GB"
    },
     {
        status: "Active",
        dateStart: "06/10/2023",
        dateEnd: "16/10/2023",
        comsuption: {
            totalComsumption: 12582912,
        },
        flag:"", // URL de la imagen del country
        country: 'España'
        plan: "10 dias, 12GB"
    }
]
```

- Crear al menos dos usuarios que contengan informacion diferrentes.

- Realizar la maquetacion de un login con su funcionalidad.

- Crear una vista llamada Home que permita ver las tarjetas que tiene ese usuario y que divida las tarjetas por secciones ejemplo: al hacer click en un Tab muestre las activas y las pendiente por lo cual al tocar el opuesto de ese Tab se mostraran las expiradas.

## Requisitos Back

- Manejar el control de versiones (Git)

- Usar Typescript

- Crear la api con NodeJs.

- Manejar una buena estructura de carpetas - puedes manejarla con la Arquitectura Hexagonal (Opcional la forma en que deseas manejarla o puedes preferir otra).

- Implementar JWT para el Login.

- Desplegar el servicio de los endpoints creados.

## Requisitos Fronted

- Manejar el control de versiones (Git)

- Usar Typescript

- Manejar una buena estructura de carpetas - puedes manejarla con la Arquitectura Hexagonal (Opcional la forma en que deseas manejarla o puedes preferir otra).

- Mostrar las diferrentes cards del servicio creado del lado del Back

- Convertir el totalComsuption de KB a GB y mostrarlos en las cards

- Usar Tailwindcss para los estilos del frontend

- Manejar el responsive en las vistas del Login y del Home

- Manejar las cargas de los estados usando LazyLoading, Loaders

- Desplegar el proyecto finalizado

## Bonus

- Realizar las pruebas unitarias correspondientes

- Manejar la cache

- Usar zustand o cualquier otro gestor de estado

Al terminar la prueba enviar el link donde este desplegado el proyecto y tambien enviar el link del repositorio al correo donde se te envio la prueba tecnica.
