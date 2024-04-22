REINSTALACIÓN DE DEPENDENCIAS AL DESINSTALAR NODE LOCAL:

Al cambiar la versión de Node.js, es posible que las dependencias instaladas previamente no sean compatibles con la nueva versión.
Por lo tanto, es necesario reinstalar las dependencias para asegurar la compatibilidad y el correcto funcionamiento del proyecto.

FALLO AL USAR "npm run start" DESPUÉS DE BORRAR package-lock.json:

Cuando borras package-lock.json y luego intentas ejecutar npm run start, es posible que ocurran fallas. Esto se debe a que npm, al no encontrar package-lock.json,
puede intentar instalar las dependencias con versiones más recientes o diferentes de las que estaban registradas previamente en package-lock.json.
Las diferencias en las versiones de las dependencias pueden llevar a conflictos o a que el entorno de desarrollo no funcione correctamente,
lo que puede provocar fallos al intentar ejecutar el script de inicio con npm run start.

USO DE yarn.lock Y package-lock.json:

yarn.lock y package-lock.json son archivos de bloqueo que garantizan la reproducibilidad de las instalaciones de dependencias.
Contienen información sobre las versiones exactas de las dependencias instaladas, incluyendo las dependencias transitivas.
Estos archivos aseguran que las instalaciones de dependencias sean coherentes y reproducibles entre diferentes sistemas y entornos de desarrollo.
Cuando se utiliza yarn install o npm install, se basan en estos archivos para mantener la coherencia de las versiones.
