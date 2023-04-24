# Digital Booking

Acceso al sitio: http://pigrupo7marzo2023web.s3-website.us-east-2.amazonaws.com  
Acceso a la documentación de la API: http://18.188.163.166/swagger-ui/index.html  

![Captura de pantalla del sitio](https://melogno.lol/assets/img/digitalbooking.webp "DB Desktop")

## 📖 Acerca del proyecto

El **objetivo del proyecto** es integrar todas las [herramientas](tecnologías-utilizadas) aprendidas a lo largo de la carrera [Certified Tech Developer](https://www.digitalhouse.com/ar/productos/programacion/certified-tech-developer) de DigitalHouse.
  
Este proyecto consiste en el **desarrollo de una página web de alquiler de vehículos** de forma temporal. La plataforma permite a los usuarios registrarse en el sitio, buscar (con herramientas de filtrado) vehículos disponibles, reservarlos en un rango de fechas específico, y acceder a sus reservas. Además, la página cuenta con un sistema de roles, la cual permite a los usuarios administradores ingresar vehículos nuevos y ver la información de cada usuario.

## Metodología de trabajo

La **metodología de trabajo** utilizada fue [Scrum](https://es.wikipedia.org/wiki/Scrum_(desarrollo_de_software)), un marco ágil para la gestión de proyectos de software. Este enfoque se basa en la iteración y la entrega incremental de un producto, con la idea de maximizar la flexibilidad y la capacidad de respuesta del equipo ante los cambios en los requisitos del proyecto.  

Respecto a la **asignación de roles**, el equipo se organizó de manera horizontal, con cada miembro asumiendo responsabilidades en diferentes áreas según sus habilidades y preferencias. Tuvimos a Johanna Bellofatto como Scrum Master para coordinar el proceso y asegurar que se cumplieran los objetivos de cada iteración.  

A la hora de **repartir las tareas**, se utilizó GitLab Issues y Notion como herramientas de gestión de tareas en línea para asignar y hacer seguimiento de las tareas pendientes y en progreso. Se realizaron reuniones diarias de seguimiento para mantener al equipo alineado y asegurarse de que todos estuvieran avanzando en la misma dirección.  

## Instalacion y ejecución del proyecto

### Instalación del proyecto
El primer paso es clonar el repositorio usando `git clone`. Utiliza el siguiente comando:  

```
git clone https://gitlab.ctd.academy/ctd/hispanos/proyecto-integrador-1/proyecto-integrador-0223/0522ft-c3/grupo-07.git
```

Una vez clonado el repositorio, podremos ejecutar en nuestra máquina tanto el Frontend como el Backend.

### Ejecución del Frontend
Lo primero es estar en la carpeta `front` del repositorio, asumiendo que ya estamos ahí y estamos usando la cli utilizamos el siguiente comando para movernos de carpeta:
```
cd front
```
Una vez dentro de la carpeta lo primero que tenemos que hacer es instalar las dependencias de node utilizando el comando:
```
npm i
```
Ten en cuenta que tienes que tener node instalado. Una vez descargadas las dependencias podremos ejecutar el proyecto en modo desarrollo utilizando el siguiente comando:
```
npm run dev
```
Y listo, el Frontend debería estar corriendo en http://127.0.0.1:5173/

### Ejecución del Backend
Para poder ejecutar el Backend primero tendremos que buildearlo con maven. Primero tendremos que ir a la carpeta `back/ProyectoIntegrador` utilizando el comando:
```
cd back/ProyectoIntegrador
```
Ahora que estamos acá podremos buildearlo utilizando el siguiente comando en caso de estar usando bash u otro shell de Linux/macOS:
```
./mvnw clean install -DskipTests
```
O si estás usando Windows shell:
```
mvnw.cmd clean install -DskipTests
```
Una vez hecho esto deberíamos tener un nuevo archivo .jar en la carpeta `target`. Usamos este comando para ejecutarlo:
```
java -jar target/ProyectoIntegrador-0.0.1-SNAPSHOT.jar
```
Y listo, ya deberíamos tener en ejecución el Backend en el puerto 8080. Podemos ver la documentación de la API yendo a http://localhost:8080/swagger-ui/index.html 