window.APP_DATA = {
  blocks: [
    { id: 1, name: "Arquitecturas web y protocolo HTTP", shortName: "Arquitecturas y HTTP", topicRef: "Tema 1" },
    { id: 2, name: "Apache y XAMPP", shortName: "Apache y XAMPP", topicRef: "Temas 2, 4 y 5" },
    { id: 3, name: "Nginx", shortName: "Nginx", topicRef: "Temas 2, 3 y 4" },
    { id: 4, name: "PHP", shortName: "PHP", topicRef: "Temas 2 y 3" },
    { id: 5, name: "Docker", shortName: "Docker", topicRef: "Temas 2 y 6" },
    { id: 6, name: "HTTPS y certificados", shortName: "HTTPS y SSL/TLS", topicRef: "Temas 3 y 5" },
    { id: 7, name: "Seguridad, logs y rendimiento", shortName: "Seguridad y Logs", topicRef: "Temas 3 y 5" },
    { id: 8, name: "Tomcat y proxy inverso", shortName: "Tomcat y Proxy", topicRef: "Temas 6, 7 y 8" }
  ],

  testQuestions: [
    {
      id: 1,
      block: 1,
      question: "En el modelo cliente-servidor, ¿quién inicia la comunicación?",
      options: {
        a: "El servidor, enviando la página sin que se la pidan",
        b: "El cliente, enviando una petición",
        c: "Los dos a la vez",
        d: "Un router intermedio"
      },
      correct: "b",
      explanation: "El navegador (cliente) pide y el servidor responde."
    },
    {
      id: 2,
      block: 1,
      question: "En una arquitectura de dos capas...",
      options: {
        a: "Hay tres servidores separados",
        b: "No existe ningún servidor",
        c: "El cliente se comunica con un servidor que tiene a la vez la lógica y los datos",
        d: "Los clientes se comunican entre ellos sin servidor"
      },
      correct: "c",
      explanation: "En dos capas la lógica y los datos están en el mismo servidor."
    },
    {
      id: 3,
      block: 1,
      question: "¿Qué ventaja tiene llevar la base de datos a otro servidor (tres capas)?",
      options: {
        a: "Más seguridad y cada capa se puede ampliar por separado",
        b: "La web deja de necesitar Internet",
        c: "Ya no hace falta servidor web",
        d: "Desaparece el DNS"
      },
      correct: "a",
      explanation: "La base de datos no queda expuesta y cada capa crece de forma independiente."
    },
    {
      id: 4,
      block: 1,
      question: "¿Qué servicio traduce www.empresa.com a una dirección IP?",
      options: {
        a: "DNS",
        b: "HTTP",
        c: "FTP",
        d: "SSH"
      },
      correct: "a",
      explanation: "El DNS resuelve nombres de dominio a direcciones IP."
    },
    {
      id: 5,
      block: 1,
      question: "¿Qué fichero del equipo cliente permite asociar un nombre a una IP sin servidor DNS?",
      options: {
        a: "hosts",
        b: "php.ini",
        c: "httpd.conf",
        d: "server.xml"
      },
      correct: "a",
      explanation: "En Windows está en C:\\Windows\\System32\\drivers\\etc\\hosts."
    },
    {
      id: 6,
      block: 1,
      question: "¿Qué indica el código de estado 200?",
      options: {
        a: "La página no existe",
        b: "Error interno del servidor",
        c: "Redirección temporal",
        d: "La petición se ha atendido correctamente"
      },
      correct: "d",
      explanation: "200 OK: todo ha ido bien."
    },
    {
      id: 7,
      block: 1,
      question: "¿Qué indica el código 403?",
      options: {
        a: "Error interno del servidor",
        b: "La página no existe",
        c: "Redirección permanente",
        d: "El recurso existe, pero el acceso está prohibido"
      },
      correct: "d",
      explanation: "403 Forbidden: no tienes permiso para verlo."
    },
    {
      id: 8,
      block: 1,
      question: "Los códigos de estado que empiezan por 5 (5xx) indican...",
      options: {
        a: "Errores del servidor",
        b: "Errores del cliente",
        c: "Redirecciones",
        d: "Éxito"
      },
      correct: "a",
      explanation: "5xx = fallo en el servidor (por ejemplo, 500)."
    },
    {
      id: 9,
      block: 1,
      question: "Los códigos de estado que empiezan por 3 (3xx) indican...",
      options: {
        a: "Errores del servidor",
        b: "Redirecciones",
        c: "Éxito",
        d: "Errores del cliente"
      },
      correct: "b",
      explanation: "3xx = el recurso está en otra URL (301, 302)."
    },
    {
      id: 10,
      block: 1,
      question: "¿Qué método HTTP usa el navegador para pedir una página normal?",
      options: {
        a: "GET",
        b: "POST",
        c: "DELETE",
        d: "PUT"
      },
      correct: "a",
      explanation: "GET pide un recurso al servidor."
    },
    {
      id: 11,
      block: 1,
      question: "¿Qué método HTTP se usa normalmente para enviar un formulario de registro?",
      options: {
        a: "POST",
        b: "GET",
        c: "HEAD",
        d: "OPTIONS"
      },
      correct: "a",
      explanation: "POST envía los datos en el cuerpo de la petición."
    },
    {
      id: 12,
      block: 1,
      question: "¿Qué diferencia hay entre un servidor web y un servidor de aplicaciones?",
      options: {
        a: "No hay ninguna diferencia",
        b: "El servidor web solo funciona con bases de datos",
        c: "El servidor de aplicaciones no usa HTTP",
        d: "El de aplicaciones ejecuta lógica de negocio (por ejemplo, Java en Tomcat)"
      },
      correct: "d",
      explanation: "El servidor web sirve sobre todo contenido; el de aplicaciones ejecuta código."
    },
    {
      id: 13,
      block: 1,
      question: "¿Qué quiere decir que HTTP es un protocolo «sin estado»?",
      options: {
        a: "Que no cifra la información",
        b: "Que no usa puertos",
        c: "Que solo sirve imágenes",
        d: "Que cada petición es independiente y el servidor no recuerda las anteriores"
      },
      correct: "d",
      explanation: "Por eso se usan cookies y sesiones."
    },
    {
      id: 14,
      block: 1,
      question: "En la URL http://www.tienda.com:8080/ofertas, ¿qué parte indica el puerto?",
      options: {
        a: "http",
        b: "8080",
        c: "www.tienda.com",
        d: "/ofertas"
      },
      correct: "b",
      explanation: "El puerto va detrás de los dos puntos."
    },
    {
      id: 15,
      block: 1,
      question: "¿Qué significa desplegar una aplicación web?",
      options: {
        a: "Programarla desde cero",
        b: "Borrarla del servidor",
        c: "Publicarla en un servidor para que los usuarios puedan usarla",
        d: "Diseñar su logotipo"
      },
      correct: "c",
      explanation: "Desplegar = instalar y poner en marcha la aplicación en el servidor."
    },
    {
      id: 16,
      block: 2,
      question: "¿Qué es Apache HTTP Server?",
      options: {
        a: "Una base de datos",
        b: "Un servidor web de código abierto",
        c: "Un lenguaje de programación",
        d: "Un navegador"
      },
      correct: "b",
      explanation: "Es uno de los servidores web más usados."
    },
    {
      id: 17,
      block: 2,
      question: "En XAMPP, ¿desde dónde se arrancan y paran Apache y MySQL?",
      options: {
        a: "Desde phpMyAdmin",
        b: "Desde el panel de control de XAMPP (XAMPP Control Panel)",
        c: "Escribiendo localhost en el navegador",
        d: "Desde el fichero hosts"
      },
      correct: "b",
      explanation: "El Control Panel tiene botones Start/Stop para cada servicio."
    },
    {
      id: 18,
      block: 2,
      question: "En XAMPP, ¿en qué carpeta se guardan por defecto las webs?",
      options: {
        a: "htdocs",
        b: "webapps",
        c: "logs",
        d: "bin"
      },
      correct: "a",
      explanation: "Por defecto C:\\xampp\\htdocs."
    },
    {
      id: 19,
      block: 2,
      question: "Para ver la web guardada en htdocs/tienda de tu propio equipo, ¿qué escribes en el navegador?",
      options: {
        a: "http://tienda",
        b: "file://tienda",
        c: "http://localhost:3306/tienda",
        d: "http://localhost/tienda"
      },
      correct: "d",
      explanation: "localhost es tu propio equipo; 3306 es el puerto de MySQL."
    },
    {
      id: 20,
      block: 2,
      question: "¿Qué herramienta web incluye XAMPP para gestionar las bases de datos MySQL?",
      options: {
        a: "phpMyAdmin",
        b: "Tomcat Manager",
        c: "Docker Hub",
        d: "htpasswd"
      },
      correct: "a",
      explanation: "Se abre en http://localhost/phpmyadmin."
    },
    {
      id: 21,
      block: 2,
      question: "Apache no arranca en XAMPP porque el puerto 80 está ocupado. ¿Qué solución es válida?",
      options: {
        a: "Borrar la carpeta htdocs",
        b: "Reinstalar MySQL",
        c: "Cambiar el puerto con la directiva Listen en httpd.conf (por ejemplo, a 8080)",
        d: "Cambiar el puerto de MySQL"
      },
      correct: "c",
      explanation: "Listen indica el puerto en el que escucha Apache."
    },
    {
      id: 22,
      block: 2,
      question: "¿Qué directiva de Apache indica la carpeta donde están los ficheros de la web?",
      options: {
        a: "ServerName",
        b: "DocumentRoot",
        c: "Listen",
        d: "ErrorLog"
      },
      correct: "b",
      explanation: "DocumentRoot = carpeta raíz de la web."
    },
    {
      id: 23,
      block: 2,
      question: "¿Qué directiva de Apache indica el puerto en el que escucha el servidor?",
      options: {
        a: "DocumentRoot",
        b: "ServerAlias",
        c: "Listen",
        d: "Require"
      },
      correct: "c",
      explanation: "Por ejemplo, Listen 80."
    },
    {
      id: 24,
      block: 2,
      question: "¿Para qué sirve ServerAlias en un Virtual Host?",
      options: {
        a: "Para indicar otros nombres con los que también responde la web (por ejemplo, con www)",
        b: "Para cambiar el puerto",
        c: "Para indicar la carpeta de la web",
        d: "Para activar HTTPS"
      },
      correct: "a",
      explanation: "ServerName es el nombre principal; ServerAlias, los alternativos."
    },
    {
      id: 25,
      block: 2,
      question: "¿Qué es un host virtual (Virtual Host)?",
      options: {
        a: "Una máquina virtual",
        b: "Un contenedor Docker",
        c: "Un tipo de certificado",
        d: "Una forma de alojar varias webs en un mismo servidor"
      },
      correct: "d",
      explanation: "Un solo Apache puede servir muchas webs distintas."
    },
    {
      id: 26,
      block: 2,
      question: "Una empresa quiere publicar un panel interno en la misma IP pero en el puerto 8081. ¿Qué tipo de host virtual usa?",
      options: {
        a: "Basado en nombre",
        b: "Basado en puerto",
        c: "Basado en IP",
        d: "No es posible"
      },
      correct: "b",
      explanation: "Misma IP, distinto puerto."
    },
    {
      id: 27,
      block: 2,
      question: "Un servidor tiene dos IP y cada web debe responder en una IP distinta. ¿Qué tipo de host virtual usa?",
      options: {
        a: "Basado en nombre",
        b: "Basado en puerto",
        c: "Basado en IP",
        d: "Proxy inverso"
      },
      correct: "c",
      explanation: "Cada web se distingue por la IP a la que llega la petición."
    },
    {
      id: 28,
      block: 2,
      question: "En XAMPP, ¿en qué fichero se suelen escribir los Virtual Hosts?",
      options: {
        a: "php.ini",
        b: "tomcat-users.xml",
        c: "my.ini",
        d: "httpd-vhosts.conf (carpeta apache/conf/extra)"
      },
      correct: "d",
      explanation: "httpd.conf lo incluye con una línea Include."
    },
    {
      id: 29,
      block: 2,
      question: "¿Cómo se activa un módulo de Apache en httpd.conf?",
      options: {
        a: "Borrando su línea LoadModule",
        b: "Copiando el módulo en htdocs",
        c: "Quitando el # del principio de su línea LoadModule",
        d: "Creando un .htaccess con su nombre"
      },
      correct: "c",
      explanation: "Una línea que empieza por # está comentada (desactivada)."
    },
    {
      id: 30,
      block: 2,
      question: "Después de modificar httpd.conf, ¿qué hay que hacer para que se apliquen los cambios?",
      options: {
        a: "Reiniciar MySQL",
        b: "Borrar la caché del navegador",
        c: "Nada, se aplican solos",
        d: "Reiniciar Apache"
      },
      correct: "d",
      explanation: "Apache lee su configuración al arrancar."
    },
    {
      id: 31,
      block: 2,
      question: "¿Qué consigue Options -Indexes?",
      options: {
        a: "Borrar el index.html",
        b: "Activar PHP",
        c: "Que no se muestre el listado de ficheros de una carpeta sin página index",
        d: "Cambiar el puerto"
      },
      correct: "c",
      explanation: "Así nadie ve todos los ficheros de una carpeta."
    },
    {
      id: 32,
      block: 2,
      question: "¿Qué directiva permite que Apache tenga en cuenta los ficheros .htaccess?",
      options: {
        a: "AllowOverride",
        b: "DocumentRoot",
        c: "Listen",
        d: "ServerTokens"
      },
      correct: "a",
      explanation: "Con AllowOverride None, Apache ignora el .htaccess."
    },
    {
      id: 33,
      block: 2,
      question: "En un .htaccess con autenticación, ¿qué hace Require valid-user?",
      options: {
        a: "Deja entrar a todo el mundo",
        b: "Bloquea a todo el mundo",
        c: "Solo deja entrar a usuarios que están en el fichero de contraseñas",
        d: "Activa HTTPS"
      },
      correct: "c",
      explanation: "Pide usuario y contraseña válidos."
    },
    {
      id: 34,
      block: 2,
      question: "Ejecutas htpasswd -c sobre un fichero de contraseñas que ya existe. ¿Qué ocurre?",
      options: {
        a: "Añade el usuario sin borrar nada",
        b: "Da siempre un error",
        c: "Se crea de nuevo y se pierden los usuarios que tenía",
        d: "Cifra la web"
      },
      correct: "c",
      explanation: "-c solo se usa la primera vez; después, sin -c."
    },
    {
      id: 35,
      block: 2,
      question: "¿Qué hace Redirect permanent /antigua http://web.local/nueva?",
      options: {
        a: "Redirige con un código 302",
        b: "Borra la página antigua",
        c: "Bloquea /antigua",
        d: "Redirige /antigua a la nueva URL con un código 301"
      },
      correct: "d",
      explanation: "permanent = 301."
    },
    {
      id: 36,
      block: 3,
      question: "¿Qué es Nginx?",
      options: {
        a: "Una base de datos",
        b: "Un servidor de correo",
        c: "Un lenguaje de programación",
        d: "Un servidor web que también puede hacer de proxy inverso"
      },
      correct: "d",
      explanation: "Se usa como servidor web, proxy inverso y balanceador."
    },
    {
      id: 37,
      block: 3,
      question: "En Nginx, ¿qué directiva equivale a ServerName de Apache?",
      options: {
        a: "root",
        b: "listen",
        c: "server_name",
        d: "index"
      },
      correct: "c",
      explanation: "server_name indica el dominio."
    },
    {
      id: 38,
      block: 3,
      question: "¿Qué directiva de Nginx indica el fichero que se carga por defecto (index.html, index.php…)?",
      options: {
        a: "index",
        b: "root",
        c: "location",
        d: "server_name"
      },
      correct: "a",
      explanation: "Equivale a DirectoryIndex de Apache."
    },
    {
      id: 39,
      block: 3,
      question: "¿Cómo se llama en Nginx el bloque que define una web (equivalente al Virtual Host)?",
      options: {
        a: "Jaula",
        b: "Server Block",
        c: "Contenedor",
        d: "Connector"
      },
      correct: "b",
      explanation: "Se escribe con server { … }."
    },
    {
      id: 40,
      block: 3,
      question: "¿Qué comando recarga la configuración de Nginx sin pararlo?",
      options: {
        a: "nginx -t",
        b: "nginx -s reload",
        c: "nginx -v",
        d: "nginx -s stop"
      },
      correct: "b",
      explanation: "-s envía una señal; reload = recargar."
    },
    {
      id: 41,
      block: 3,
      question: "¿Qué comando para Nginx?",
      options: {
        a: "nginx -s reload",
        b: "nginx -t",
        c: "nginx -s stop",
        d: "nginx -v"
      },
      correct: "c",
      explanation: "stop detiene el servidor."
    },
    {
      id: 42,
      block: 3,
      question: "¿Admite Nginx ficheros .htaccess?",
      options: {
        a: "No, toda la configuración va en sus ficheros principales",
        b: "Sí, igual que Apache",
        c: "Solo con PHP",
        d: "Solo en el puerto 443"
      },
      correct: "a",
      explanation: "Por diseño, para ganar rendimiento."
    },
    {
      id: 43,
      block: 3,
      question: "¿Cómo se llama el fichero principal de configuración de Nginx?",
      options: {
        a: "nginx.conf",
        b: "httpd.conf",
        c: "php.ini",
        d: "server.xml"
      },
      correct: "a",
      explanation: "httpd.conf es el de Apache."
    },
    {
      id: 44,
      block: 3,
      question: "¿Qué bloque de Nginx se usa para configurar una ruta concreta, como /imagenes?",
      options: {
        a: "listen",
        b: "root",
        c: "index",
        d: "location"
      },
      correct: "d",
      explanation: "location /imagenes { … }"
    },
    {
      id: 45,
      block: 3,
      question: "¿Con qué tipo de contenido destaca Nginx por su rapidez?",
      options: {
        a: "Contenido estático (HTML, CSS, imágenes)",
        b: "Aplicaciones Java",
        c: "Bases de datos",
        d: "Correo electrónico"
      },
      correct: "a",
      explanation: "Sirve ficheros estáticos muy rápido y con poca memoria."
    },
    {
      id: 46,
      block: 4,
      question: "¿Dónde se ejecuta el código PHP?",
      options: {
        a: "En el navegador",
        b: "En el servidor",
        c: "En el DNS",
        d: "En el router"
      },
      correct: "b",
      explanation: "El navegador solo recibe el HTML resultante."
    },
    {
      id: 47,
      block: 4,
      question: "¿Qué función de PHP muestra toda la configuración de PHP del servidor?",
      options: {
        a: "echo()",
        b: "phpinfo()",
        c: "print_r()",
        d: "mysqli_connect()"
      },
      correct: "b",
      explanation: "Se suele crear un info.php con <?php phpinfo(); ?>."
    },
    {
      id: 48,
      block: 4,
      question: "¿Qué directiva de php.ini limita el tamaño máximo de cada fichero subido?",
      options: {
        a: "memory_limit",
        b: "upload_max_filesize",
        c: "display_errors",
        d: "max_execution_time"
      },
      correct: "b",
      explanation: "Por ejemplo, upload_max_filesize = 20M."
    },
    {
      id: 49,
      block: 4,
      question: "Un script PHP se corta siempre a los 30 segundos. ¿Qué directiva cambias?",
      options: {
        a: "upload_max_filesize",
        b: "post_max_size",
        c: "max_execution_time",
        d: "display_errors"
      },
      correct: "c",
      explanation: "Tiempo máximo de ejecución en segundos."
    },
    {
      id: 50,
      block: 4,
      question: "¿Qué directiva de php.ini limita la memoria que puede usar un script?",
      options: {
        a: "post_max_size",
        b: "log_errors",
        c: "short_open_tag",
        d: "memory_limit"
      },
      correct: "d",
      explanation: "Por ejemplo, memory_limit = 256M."
    },
    {
      id: 51,
      block: 4,
      question: "En XAMPP, ¿dónde está el fichero php.ini?",
      options: {
        a: "En la carpeta php de XAMPP (C:\\xampp\\php\\php.ini)",
        b: "En htdocs",
        c: "En webapps",
        d: "Junto al fichero hosts"
      },
      correct: "a",
      explanation: "También se abre desde el botón Config de Apache."
    },
    {
      id: 52,
      block: 4,
      question: "Después de cambiar php.ini en XAMPP, ¿qué tienes que hacer?",
      options: {
        a: "Reiniciar el ordenador obligatoriamente",
        b: "Reiniciar MySQL",
        c: "Reiniciar Apache",
        d: "Nada"
      },
      correct: "c",
      explanation: "PHP se carga con Apache."
    },
    {
      id: 53,
      block: 5,
      question: "¿Qué es un contenedor Docker?",
      options: {
        a: "Una máquina virtual con sistema operativo completo",
        b: "Un entorno aislado que lleva una aplicación con todo lo que necesita",
        c: "Una base de datos",
        d: "Un servidor físico"
      },
      correct: "b",
      explanation: "Empaqueta la aplicación y sus dependencias."
    },
    {
      id: 54,
      block: 5,
      question: "¿Qué es una imagen de Docker?",
      options: {
        a: "Un contenedor en marcha",
        b: "Una captura de pantalla",
        c: "La plantilla a partir de la cual se crean contenedores",
        d: "Un fichero de log"
      },
      correct: "c",
      explanation: "De una imagen se pueden lanzar muchos contenedores."
    },
    {
      id: 55,
      block: 5,
      question: "¿Qué es Docker Hub?",
      options: {
        a: "El panel de XAMPP",
        b: "Un servidor web",
        c: "Un registro público de imágenes de Docker",
        d: "Un antivirus"
      },
      correct: "c",
      explanation: "De ahí se descargan imágenes como nginx o httpd."
    },
    {
      id: 56,
      block: 5,
      question: "¿Qué comando lista las imágenes descargadas en tu equipo?",
      options: {
        a: "docker images",
        b: "docker ps",
        c: "docker logs",
        d: "docker rm"
      },
      correct: "a",
      explanation: "docker ps lista contenedores, no imágenes."
    },
    {
      id: 57,
      block: 5,
      question: "¿Qué comando muestra todos los contenedores, también los parados?",
      options: {
        a: "docker ps",
        b: "docker ps -a",
        c: "docker images",
        d: "docker start"
      },
      correct: "b",
      explanation: "-a = all (todos)."
    },
    {
      id: 58,
      block: 5,
      question: "¿Qué comando vuelve a arrancar el contenedor parado llamado web?",
      options: {
        a: "docker run web",
        b: "docker pull web",
        c: "docker logs web",
        d: "docker start web"
      },
      correct: "d",
      explanation: "docker run crearía un contenedor nuevo."
    },
    {
      id: 59,
      block: 5,
      question: "¿Qué comando borra el contenedor parado llamado web?",
      options: {
        a: "docker rm web",
        b: "docker rmi web",
        c: "docker stop web",
        d: "docker ps web"
      },
      correct: "a",
      explanation: "rm borra contenedores; rmi, imágenes."
    },
    {
      id: 60,
      block: 5,
      question: "¿Qué comando borra una imagen?",
      options: {
        a: "docker rmi",
        b: "docker rm",
        c: "docker stop",
        d: "docker logs"
      },
      correct: "a",
      explanation: "rmi = remove image."
    },
    {
      id: 61,
      block: 5,
      question: "¿Qué hace la opción -d de docker run?",
      options: {
        a: "Borra el contenedor al salir",
        b: "Publica un puerto",
        c: "Monta una carpeta",
        d: "Ejecuta el contenedor en segundo plano"
      },
      correct: "d",
      explanation: "-d = detached."
    },
    {
      id: 62,
      block: 5,
      question: "¿Qué hace la opción --name de docker run?",
      options: {
        a: "Elige la imagen",
        b: "Publica un puerto",
        c: "Indica la carpeta de la web",
        d: "Da un nombre al contenedor"
      },
      correct: "d",
      explanation: "Así se gestiona fácilmente: docker stop nombre."
    },
    {
      id: 63,
      block: 5,
      question: "¿Qué hace la opción -v de docker run?",
      options: {
        a: "Muestra la versión de Docker",
        b: "Monta una carpeta del anfitrión dentro del contenedor",
        c: "Publica un puerto",
        d: "Ejecuta en segundo plano"
      },
      correct: "b",
      explanation: "Los ficheros se editan desde fuera y no se pierden."
    },
    {
      id: 64,
      block: 5,
      question: "En docker run -p 9000:80 nginx, ¿qué representa el 80?",
      options: {
        a: "El puerto del anfitrión",
        b: "El puerto del contenedor",
        c: "El número de contenedores",
        d: "La versión de nginx"
      },
      correct: "b",
      explanation: "Formato: anfitrión:contenedor."
    },
    {
      id: 65,
      block: 5,
      question: "¿Qué comando muestra los mensajes (logs) del contenedor web?",
      options: {
        a: "docker ps web",
        b: "docker images web",
        c: "docker start web",
        d: "docker logs web"
      },
      correct: "d",
      explanation: "Muestra lo que el contenedor escribe en su salida."
    },
    {
      id: 66,
      block: 5,
      question: "¿Por qué un contenedor arranca más rápido que una máquina virtual?",
      options: {
        a: "Porque no usa memoria",
        b: "Porque no tiene ficheros",
        c: "Porque solo funciona sin red",
        d: "Porque no tiene que arrancar un sistema operativo completo"
      },
      correct: "d",
      explanation: "Comparte el núcleo del anfitrión."
    },
    {
      id: 67,
      block: 5,
      question: "¿Cómo se llama el fichero con las instrucciones para crear una imagen propia?",
      options: {
        a: "docker.ini",
        b: "httpd.conf",
        c: "Dockerfile",
        d: "compose.war"
      },
      correct: "c",
      explanation: "Se construye con docker build."
    },
    {
      id: 68,
      block: 6,
      question: "¿Qué muestra el navegador cuando una web usa HTTPS con un certificado válido?",
      options: {
        a: "Un aviso rojo de peligro",
        b: "Un candado junto a la dirección",
        c: "Nada, la web no carga",
        d: "El código 404"
      },
      correct: "b",
      explanation: "El candado indica conexión cifrada y certificado de confianza."
    },
    {
      id: 69,
      block: 6,
      question: "¿Qué protocolo se usa para cifrar la comunicación en HTTPS?",
      options: {
        a: "FTP",
        b: "TLS (antes SSL)",
        c: "DNS",
        d: "SMTP"
      },
      correct: "b",
      explanation: "HTTPS = HTTP sobre TLS."
    },
    {
      id: 70,
      block: 6,
      question: "¿Qué es una autoridad de certificación (CA)?",
      options: {
        a: "Una entidad de confianza que firma certificados",
        b: "Un tipo de servidor web",
        c: "Un virus",
        d: "Un módulo de PHP"
      },
      correct: "a",
      explanation: "Los navegadores confían en una lista de CA."
    },
    {
      id: 71,
      block: 6,
      question: "¿Qué es Let's Encrypt?",
      options: {
        a: "Una CA que emite certificados gratuitos",
        b: "Un servidor web",
        c: "Un cortafuegos",
        d: "Una versión de Apache"
      },
      correct: "a",
      explanation: "Sus certificados duran 90 días y se renuevan."
    },
    {
      id: 72,
      block: 6,
      question: "¿Qué herramienta permite crear un certificado autofirmado?",
      options: {
        a: "htpasswd",
        b: "phpMyAdmin",
        c: "OpenSSL",
        d: "ab"
      },
      correct: "c",
      explanation: "XAMPP la incluye en apache/bin."
    },
    {
      id: 73,
      block: 6,
      question: "¿Qué fichero no debe salir nunca del servidor?",
      options: {
        a: "El certificado (.crt)",
        b: "index.html",
        c: "La clave privada (.key)",
        d: "httpd.conf"
      },
      correct: "c",
      explanation: "Con la clave privada alguien podría suplantar al servidor."
    },
    {
      id: 74,
      block: 6,
      question: "¿Qué directiva activa el cifrado en un Virtual Host del puerto 443?",
      options: {
        a: "Listen 443",
        b: "RewriteEngine On",
        c: "ServerName",
        d: "SSLEngine on"
      },
      correct: "d",
      explanation: "Además hay que indicar el certificado y la clave."
    },
    {
      id: 75,
      block: 6,
      question: "¿Qué directiva indica en Apache el fichero del certificado?",
      options: {
        a: "SSLCertificateFile",
        b: "SSLCertificateKeyFile",
        c: "DocumentRoot",
        d: "AuthUserFile"
      },
      correct: "a",
      explanation: "SSLCertificateKeyFile indica la clave privada."
    },
    {
      id: 76,
      block: 6,
      question: "La web ya funciona por HTTPS, pero quien escribe http:// entra sin cifrar. ¿Qué falta?",
      options: {
        a: "Otro certificado",
        b: "Una redirección de HTTP a HTTPS en el Virtual Host del puerto 80",
        c: "Cerrar el puerto 443",
        d: "Reiniciar MySQL"
      },
      correct: "b",
      explanation: "Por ejemplo, Redirect permanent / https://dominio/."
    },
    {
      id: 77,
      block: 6,
      question: "¿Para qué entorno es adecuado un certificado autofirmado?",
      options: {
        a: "Una tienda online pública",
        b: "Pruebas, clase o redes internas",
        c: "La web de un banco",
        d: "Cualquier web en Internet"
      },
      correct: "b",
      explanation: "En Internet el aviso del navegador espantaría a los usuarios."
    },
    {
      id: 78,
      block: 7,
      question: "¿Qué datos aparecen en cada línea del access.log de Apache?",
      options: {
        a: "IP del cliente, fecha, petición y código de respuesta",
        b: "Solo los errores de PHP",
        c: "Las contraseñas de los usuarios",
        d: "La configuración de Apache"
      },
      correct: "a",
      explanation: "Registra cada petición recibida."
    },
    {
      id: 79,
      block: 7,
      question: "En XAMPP, ¿en qué carpeta están los logs de Apache?",
      options: {
        a: "htdocs",
        b: "php",
        c: "apache/logs",
        d: "mysql/data"
      },
      correct: "c",
      explanation: "Ahí están access.log y error.log."
    },
    {
      id: 80,
      block: 7,
      question: "¿Qué hace ServerTokens Prod en Apache?",
      options: {
        a: "Activa HTTPS",
        b: "Cambia el puerto",
        c: "Activa PHP",
        d: "Oculta la versión de Apache en las respuestas"
      },
      correct: "d",
      explanation: "Así se dan menos pistas a un atacante."
    },
    {
      id: 81,
      block: 7,
      question: "¿Por qué no conviene mostrar los errores de PHP en producción?",
      options: {
        a: "Porque ralentizan el DNS",
        b: "Porque borran la base de datos",
        c: "Porque desactivan HTTPS",
        d: "Porque pueden revelar rutas y datos internos a un atacante"
      },
      correct: "d",
      explanation: "Los errores se guardan en el log, no se muestran."
    },
    {
      id: 82,
      block: 7,
      question: "¿Por qué es importante mantener actualizados Apache y PHP?",
      options: {
        a: "Para corregir fallos de seguridad conocidos",
        b: "Para cambiar el diseño de la web",
        c: "Para dejar de usar HTTPS",
        d: "Para borrar los logs"
      },
      correct: "a",
      explanation: "Las versiones antiguas tienen vulnerabilidades públicas."
    },
    {
      id: 83,
      block: 7,
      question: "¿Para qué sirve ab (Apache Benchmark)?",
      options: {
        a: "Para crear certificados",
        b: "Para gestionar usuarios",
        c: "Para hacer pruebas de carga y medir el rendimiento",
        d: "Para desplegar ficheros .war"
      },
      correct: "c",
      explanation: "Simula muchas peticiones a la vez."
    },
    {
      id: 84,
      block: 7,
      question: "En el resultado de ab, ¿qué indica Failed requests?",
      options: {
        a: "Las peticiones por segundo",
        b: "Las peticiones que no se han atendido correctamente",
        c: "El tiempo medio por petición",
        d: "El número de usuarios registrados"
      },
      correct: "b",
      explanation: "Lo ideal es que sea 0."
    },
    {
      id: 85,
      block: 7,
      question: "En el resultado de ab, ¿qué indica Time per request?",
      options: {
        a: "Las peticiones fallidas",
        b: "Las peticiones totales",
        c: "El tiempo medio que tarda en responder cada petición",
        d: "El tamaño de la página"
      },
      correct: "c",
      explanation: "Se mide en milisegundos."
    },
    {
      id: 86,
      block: 7,
      question: "¿Qué medida mejora el rendimiento de una web?",
      options: {
        a: "Desactivar HTTPS",
        b: "Mostrar los errores de PHP",
        c: "Activar la compresión (mod_deflate) y la caché",
        d: "Borrar los logs cada hora"
      },
      correct: "c",
      explanation: "Se envían menos datos y se repite menos trabajo."
    },
    {
      id: 87,
      block: 7,
      question: "¿Qué puertos debería dejar abiertos el cortafuegos de un servidor web público?",
      options: {
        a: "Todos",
        b: "Ninguno",
        c: "Solo los necesarios, como el 80 y el 443",
        d: "Solo el 3306"
      },
      correct: "c",
      explanation: "Cuantos menos puertos abiertos, menos superficie de ataque."
    },
    {
      id: 88,
      block: 8,
      question: "¿Qué es Apache Tomcat?",
      options: {
        a: "Un servidor de bases de datos",
        b: "Un servidor de aplicaciones para aplicaciones web Java",
        c: "Un módulo de PHP",
        d: "Un navegador"
      },
      correct: "b",
      explanation: "Ejecuta servlets y JSP."
    },
    {
      id: 89,
      block: 8,
      question: "¿Qué necesita estar instalado para que funcione Tomcat?",
      options: {
        a: "PHP",
        b: "Java (JDK o JRE)",
        c: "MySQL",
        d: "Docker"
      },
      correct: "b",
      explanation: "Tomcat está hecho en Java."
    },
    {
      id: 90,
      block: 8,
      question: "¿En qué puerto escucha Tomcat por defecto?",
      options: {
        a: "8080",
        b: "80",
        c: "443",
        d: "3306"
      },
      correct: "a",
      explanation: "Se cambia en server.xml."
    },
    {
      id: 91,
      block: 8,
      question: "¿Qué carpeta de Tomcat contiene los ficheros de configuración?",
      options: {
        a: "webapps",
        b: "logs",
        c: "bin",
        d: "conf"
      },
      correct: "d",
      explanation: "Ahí están server.xml y tomcat-users.xml."
    },
    {
      id: 92,
      block: 8,
      question: "¿Qué carpeta de Tomcat contiene los scripts para arrancarlo y pararlo?",
      options: {
        a: "conf",
        b: "bin",
        c: "lib",
        d: "webapps"
      },
      correct: "b",
      explanation: "startup y shutdown (.bat en Windows)."
    },
    {
      id: 93,
      block: 8,
      question: "¿Dónde buscas los mensajes de arranque y los errores de Tomcat?",
      options: {
        a: "En webapps",
        b: "En htdocs",
        c: "En la carpeta logs",
        d: "En el fichero hosts"
      },
      correct: "c",
      explanation: "Por ejemplo, catalina.log."
    },
    {
      id: 94,
      block: 8,
      question: "Has desplegado tienda.war en Tomcat (servidor 192.168.1.30, puerto por defecto). ¿Qué URL usas?",
      options: {
        a: "http://192.168.1.30/tienda.war",
        b: "http://192.168.1.30:80",
        c: "https://tienda",
        d: "http://192.168.1.30:8080/tienda"
      },
      correct: "d",
      explanation: "El nombre del .war es la ruta de la aplicación."
    },
    {
      id: 95,
      block: 8,
      question: "¿Qué ruta abre el gestor web de aplicaciones de Tomcat?",
      options: {
        a: "/admin.php",
        b: "/manager/html",
        c: "/phpmyadmin",
        d: "/htdocs"
      },
      correct: "b",
      explanation: "Necesita un usuario con el rol adecuado."
    },
    {
      id: 96,
      block: 8,
      question: "¿Qué fichero de una aplicación Java, dentro de WEB-INF, describe su despliegue?",
      options: {
        a: "server.xml",
        b: "php.ini",
        c: "httpd.conf",
        d: "web.xml"
      },
      correct: "d",
      explanation: "Es el descriptor de despliegue."
    },
    {
      id: 97,
      block: 8,
      question: "¿Qué es un proxy inverso?",
      options: {
        a: "Un antivirus",
        b: "Un proxy que usan los alumnos para navegar",
        c: "Una base de datos",
        d: "Un servidor que recibe las peticiones de los clientes y las reenvía a servidores internos"
      },
      correct: "d",
      explanation: "El cliente solo habla con el proxy."
    },
    {
      id: 98,
      block: 8,
      question: "¿Qué directiva de Apache envía las peticiones a otro servidor cuando hace de proxy?",
      options: {
        a: "DocumentRoot",
        b: "Redirect",
        c: "ProxyPass",
        d: "Listen"
      },
      correct: "c",
      explanation: "ProxyPass / http://servidor:8080/"
    },
    {
      id: 99,
      block: 8,
      question: "¿Para qué sirve ProxyPassReverse?",
      options: {
        a: "Para corregir las cabeceras de redirección que devuelve el servidor interno",
        b: "Para cifrar la web",
        c: "Para bloquear IP",
        d: "Para borrar la caché"
      },
      correct: "a",
      explanation: "Así el usuario no ve la dirección interna."
    },
    {
      id: 100,
      block: 8,
      question: "¿Qué ventaja tiene poner Apache como proxy delante de Tomcat?",
      options: {
        a: "Tomcat deja de necesitar Java",
        b: "Se eliminan los logs",
        c: "Ya no hace falta DNS",
        d: "Los usuarios no escriben el puerto 8080 y Tomcat no queda expuesto"
      },
      correct: "d",
      explanation: "Además se puede centralizar el HTTPS en Apache."
    }
  ],

  theoryQuestions: [
    {
      id: 1,
      block: 1,
      title: "Ejercicio 1. Arquitecturas web",
      prompt: "Explica qué es una arquitectura cliente-servidor y qué es una red P2P. Después, explica la diferencia entre una arquitectura de dos capas y una de tres capas con un ejemplo de cada una.",
      modelAnswer: "Cliente-servidor: el cliente (por ejemplo, el navegador) envía peticiones y el servidor las atiende y responde. El servidor es un equipo central que da el servicio.\n\nP2P (peer to peer): no hay servidor central; todos los equipos son iguales y actúan a la vez como clientes y como servidores (por ejemplo, una red de intercambio de ficheros).\n\nDos capas: el cliente habla con un único servidor que tiene la lógica y los datos. Ejemplo: una web pequeña en XAMPP con Apache, PHP y MySQL en el mismo equipo.\n\nTres capas: se separan la presentación (navegador), la lógica (servidor web o de aplicaciones) y los datos (servidor de base de datos en otra máquina). Ejemplo: una tienda online con Tomcat en un servidor y MySQL en otro.",
      criteriaText: "Criterio: cliente-servidor y P2P (0,4) · dos capas con ejemplo (0,3) · tres capas con ejemplo (0,3).",
      criteria: [
        { label: "Cliente-servidor y P2P", maxPoints: 0.4 },
        { label: "Dos capas con ejemplo", maxPoints: 0.3 },
        { label: "Tres capas con ejemplo", maxPoints: 0.3 }
      ],
      maxPoints: 1
    },
    {
      id: 2,
      block: 1,
      title: "Ejercicio 2. ¿Qué pasa cuando escribimos una URL?",
      prompt: "Un usuario escribe http://www.academia.com en el navegador. Explica paso a paso qué ocurre hasta que ve la página, mencionando el DNS, el puerto, la petición y el código de respuesta.",
      modelAnswer: "1. El navegador pregunta al DNS qué IP tiene `www.academia.com` (antes mira su caché y el fichero `hosts`).\n2. Se conecta a esa IP por el puerto `80`, porque es HTTP (sería el `443` con HTTPS).\n3. Envía una petición `GET` pidiendo la página.\n4. El servidor web busca la web que corresponde a ese dominio, la prepara (por ejemplo, ejecuta el PHP) y responde con un código de estado: `200 OK` si todo va bien.\n5. El navegador muestra la página y pide el resto de recursos (CSS, imágenes, JS).",
      criteriaText: "Criterio: DNS (0,25) · puerto (0,25) · petición (0,25) · respuesta y código (0,25).",
      criteria: [
        { label: "Resolución DNS (caché / hosts / DNS)", maxPoints: 0.25 },
        { label: "Puerto correcto (80 HTTP / 443 HTTPS)", maxPoints: 0.25 },
        { label: "Petición HTTP GET", maxPoints: 0.25 },
        { label: "Respuesta del servidor y código (200 OK)", maxPoints: 0.25 }
      ],
      maxPoints: 1
    },
    {
      id: 3,
      block: 1,
      title: "Ejercicio 3. Códigos de estado HTTP",
      prompt: "Explica qué indica cada familia de códigos de estado (2xx, 3xx, 4xx y 5xx) y pon un ejemplo de situación en la que el servidor devolvería 200, 301, 302, 403, 404 y 500.",
      modelAnswer: "Familias de códigos:\n- **2xx**: éxito.\n- **3xx**: redirección.\n- **4xx**: error del cliente.\n- **5xx**: error del servidor.\n\nEjemplos de situaciones:\n- **200**: la página se carga sin problemas.\n- **301**: la empresa cambia de dominio para siempre y el antiguo redirige al nuevo.\n- **302**: la web está unos días en mantenimiento y redirige a una página de aviso.\n- **403**: se intenta entrar en una carpeta a la que no se tiene permiso.\n- **404**: el usuario escribe mal la URL o la página se ha borrado.\n- **500**: un script PHP tiene un error grave.",
      criteriaText: "Criterio: familias (0,4) · 0,1 por cada situación correcta.",
      criteria: [
        { label: "Familias 2xx, 3xx, 4xx y 5xx", maxPoints: 0.4 },
        { label: "Ejemplo código 200", maxPoints: 0.1 },
        { label: "Ejemplo código 301", maxPoints: 0.1 },
        { label: "Ejemplo código 302", maxPoints: 0.1 },
        { label: "Ejemplo código 403", maxPoints: 0.1 },
        { label: "Ejemplo código 404", maxPoints: 0.1 },
        { label: "Ejemplo código 500", maxPoints: 0.1 }
      ],
      maxPoints: 1
    },
    {
      id: 4,
      block: 1,
      title: "Ejercicio 4. Servidores web y servidores de aplicaciones",
      prompt: "Explica la diferencia entre un servidor web y un servidor de aplicaciones. Pon dos ejemplos de servidores web y uno de servidor de aplicaciones, e indica qué tipo de aplicación ejecutaría cada uno.",
      modelAnswer: "Un servidor web atiende peticiones HTTP y sirve sobre todo contenido (HTML, CSS, imágenes) o páginas generadas con PHP mediante un módulo. Ejemplos: **Apache** y **Nginx**.\n\nUn servidor de aplicaciones ejecuta la lógica de negocio de aplicaciones más complejas. Ejemplo: **Tomcat**, que ejecuta aplicaciones Java (servlets y JSP) desplegadas como ficheros `.war`.",
      criteriaText: "Criterio: diferencia (0,5) · ejemplos con su tipo de aplicación (0,5).",
      criteria: [
        { label: "Diferencia entre servidor web y de aplicaciones", maxPoints: 0.5 },
        { label: "2 ejemplos de servidor web + 1 de aplicaciones con su tipo de app", maxPoints: 0.5 }
      ],
      maxPoints: 1
    },
    {
      id: 5,
      block: 2,
      title: "Ejercicio 5. Hosts virtuales",
      prompt: "Explica los tres tipos de hosts virtuales (por nombre, por IP y por puerto). Para cada uno, indica cómo sabe el servidor qué web mostrar y pon un ejemplo de uso.",
      modelAnswer: "- **Por nombre**: todas las webs comparten IP y puerto; el servidor elige la web según el dominio que pide el navegador (`ServerName`). Es el más habitual: un hosting con muchas webs y una sola IP.\n- **Por IP**: cada web tiene una IP distinta del servidor; elige según la IP a la que llega la petición. Ejemplo: un servidor con dos tarjetas de red.\n- **Por puerto**: misma IP y distinto puerto (`Listen 8081`). Ejemplo: un panel de administración o una web de pruebas; el usuario tiene que escribir el puerto.",
      criteriaText: "Criterio: 0,33 por tipo bien explicado con su ejemplo.",
      criteria: [
        { label: "Por nombre + cómo distingue + ejemplo", maxPoints: 0.34 },
        { label: "Por IP + cómo distingue + ejemplo", maxPoints: 0.33 },
        { label: "Por puerto + cómo distingue + ejemplo", maxPoints: 0.33 }
      ],
      maxPoints: 1
    },
    {
      id: 6,
      block: 2,
      title: "Ejercicio 6. XAMPP",
      prompt: "Explica qué es XAMPP, qué programas incluye y para qué se usa. Indica también para qué sirven sus carpetas htdocs, apache/conf, apache/logs y php.",
      modelAnswer: "XAMPP es un paquete gratuito que instala de una vez un servidor web completo, sobre todo para desarrollo y pruebas en el propio equipo. Incluye Apache, MySQL/MariaDB, PHP, Perl, phpMyAdmin y otras herramientas. Los servicios se arrancan y paran desde el XAMPP Control Panel.\n\n- `htdocs`: carpeta de las webs (`DocumentRoot`); se accede con `http://localhost/carpeta`.\n- `apache/conf`: configuración de Apache (`httpd.conf` y `extra/httpd-vhosts.conf`).\n- `apache/logs`: registros de Apache (`access.log` y `error.log`).\n- `php`: instalación de PHP y su fichero `php.ini`.",
      criteriaText: "Criterio: qué es y para qué se usa (0,3) · programas (0,3) · carpetas (0,4).",
      criteria: [
        { label: "Qué es y para qué se usa", maxPoints: 0.3 },
        { label: "Programas que incluye", maxPoints: 0.3 },
        { label: "Función de htdocs, apache/conf, apache/logs y php", maxPoints: 0.4 }
      ],
      maxPoints: 1
    },
    {
      id: 7,
      block: 3,
      title: "Ejercicio 7. Apache y Nginx",
      prompt: "Explica cómo atienden Apache y Nginx muchas conexiones a la vez y por qué uno consume más memoria que el otro. Indica qué ventaja tiene Apache gracias a los ficheros .htaccess.",
      modelAnswer: "Apache atiende cada conexión con un proceso o un hilo; con muchas conexiones a la vez crea muchos y consume más memoria.\n\nNginx usa pocos procesos que trabajan de forma asíncrona, basada en eventos: cada uno atiende miles de conexiones, así que gasta menos memoria y es muy rápido con contenido estático.\n\nVentaja de Apache: admite `.htaccess`, que permite cambiar la configuración de una carpeta sin tocar la configuración principal ni reiniciar el servidor (muy útil en un hosting compartido). Nginx no lo admite.",
      criteriaText: "Criterio: Apache (0,3) · Nginx (0,4) · .htaccess (0,3).",
      criteria: [
        { label: "Funcionamiento de Apache y consumo de memoria", maxPoints: 0.3 },
        { label: "Funcionamiento asíncrono por eventos de Nginx", maxPoints: 0.4 },
        { label: "Ventaja de Apache con .htaccess", maxPoints: 0.3 }
      ],
      maxPoints: 1
    },
    {
      id: 8,
      block: 2,
      title: "Ejercicio 8. Ficheros .htaccess y protección con contraseña",
      prompt: "Explica qué es un fichero .htaccess y para qué se usa. Después explica los pasos para proteger una carpeta con usuario y contraseña y qué papel juega la directiva AllowOverride.",
      modelAnswer: "Un `.htaccess` es un fichero de configuración que se coloca en una carpeta y que Apache aplica a esa carpeta y a sus subcarpetas. Se usa para proteger carpetas, hacer redirecciones o páginas de error personalizadas.\n\nPasos para proteger una carpeta:\n1. Crear el fichero de contraseñas con `htpasswd` (con `-c` la primera vez).\n2. Escribir en el `.htaccess` `AuthType Basic`, `AuthName`, `AuthUserFile` (ruta del fichero de contraseñas) y `Require valid-user`.\n3. Comprobar que Apache tiene `AllowOverride All` (o `AuthConfig`) para esa carpeta.\n\n`AllowOverride` indica qué puede cambiar un `.htaccess`. Con `None`, Apache lo ignora.",
      criteriaText: "Criterio: qué es y usos (0,3) · pasos (0,4) · AllowOverride (0,3).",
      criteria: [
        { label: "Qué es .htaccess y usos", maxPoints: 0.3 },
        { label: "Pasos (htpasswd + directivas .htaccess)", maxPoints: 0.4 },
        { label: "Papel de AllowOverride", maxPoints: 0.3 }
      ],
      maxPoints: 1
    },
    {
      id: 9,
      block: 2,
      title: "Ejercicio 9. Redirecciones",
      prompt: "Explica la diferencia entre una redirección 301 y una 302 y cómo afecta cada una a los buscadores. Escribe la directiva de Apache que redirige toda una web del puerto 80 a su versión HTTPS.",
      modelAnswer: "`301` es una redirección permanente: los buscadores cambian la URL antigua por la nueva y le pasan su posicionamiento. `302` es temporal: los buscadores mantienen la URL original.\n\n```apache\n<VirtualHost *:80>\n    ServerName web.local\n    Redirect permanent / https://web.local/\n</VirtualHost>\n```\n\nTambién vale con `RewriteEngine` y `RewriteRule`.",
      criteriaText: "Criterio: diferencia 301/302 (0,3) · buscadores (0,3) · directiva (0,4). También vale con RewriteEngine y RewriteRule.",
      criteria: [
        { label: "Diferencia 301 vs 302", maxPoints: 0.3 },
        { label: "Efecto en los buscadores (SEO)", maxPoints: 0.3 },
        { label: "Directiva Apache HTTP -> HTTPS", maxPoints: 0.4 }
      ],
      maxPoints: 1
    },
    {
      id: 10,
      block: 5,
      title: "Ejercicio 10. Docker",
      prompt: "Explica qué es Docker y la diferencia entre una imagen y un contenedor. Compara después un contenedor con una máquina virtual en tamaño, tiempo de arranque y aislamiento.",
      modelAnswer: "Docker permite ejecutar aplicaciones dentro de contenedores, entornos aislados que llevan la aplicación con todo lo que necesita.\n\n- **Imagen**: plantilla de solo lectura (por ejemplo, `nginx`), que se descarga de Docker Hub.\n- **Contenedor**: una imagen en marcha. De una imagen se pueden lanzar muchos contenedores.\n\nComparación con una máquina virtual:\n- **Tamaño**: el contenedor ocupa megas; la máquina virtual, gigas, porque lleva un sistema operativo completo.\n- **Arranque**: segundos el contenedor; minutos la máquina virtual.\n- **Aislamiento**: la máquina virtual aísla más; el contenedor comparte el núcleo del anfitrión.",
      criteriaText: "Criterio: Docker (0,2) · imagen y contenedor (0,3) · comparación (0,5).",
      criteria: [
        { label: "Qué es Docker", maxPoints: 0.2 },
        { label: "Diferencia entre imagen y contenedor", maxPoints: 0.3 },
        { label: "Comparación tamaño, arranque y aislamiento vs VM", maxPoints: 0.5 }
      ],
      maxPoints: 1
    },
    {
      id: 11,
      block: 5,
      title: "Ejercicio 11. Opciones de docker run",
      prompt: "Explica qué significa cada parte de este comando y en qué URL se vería la web si el anfitrión tiene la IP 192.168.1.50:\ndocker run -d --name web -p 8080:80 -v C:/web:/usr/local/apache2/htdocs httpd",
      modelAnswer: "- `docker run`: crea y arranca un contenedor.\n- `-d`: en segundo plano.\n- `--name web`: el contenedor se llama `web` (`docker stop web`, `docker logs web`).\n- `-p 8080:80`: el puerto `8080` del anfitrión lleva al `80` del contenedor, donde escucha Apache.\n- `-v C:/web:/usr/local/apache2/htdocs`: la carpeta `C:/web` del anfitrión se ve dentro del contenedor como la carpeta de la web.\n- `httpd`: imagen oficial de Apache.\n\nURL: `http://192.168.1.50:8080`",
      criteriaText: "Criterio: 0,15 por cada parte bien explicada · URL (0,1).",
      criteria: [
        { label: "docker run", maxPoints: 0.15 },
        { label: "-d (segundo plano)", maxPoints: 0.15 },
        { label: "--name web", maxPoints: 0.15 },
        { label: "-p 8080:80 (mapeo de puertos)", maxPoints: 0.15 },
        { label: "-v C:/web:... (volumen)", maxPoints: 0.15 },
        { label: "httpd (imagen oficial Apache)", maxPoints: 0.15 },
        { label: "URL final http://192.168.1.50:8080", maxPoints: 0.1 }
      ],
      maxPoints: 1
    },
    {
      id: 12,
      block: 6,
      title: "Ejercicio 12. HTTPS y certificados",
      prompt: "Explica qué aporta HTTPS frente a HTTP, qué es un certificado y qué es una autoridad de certificación (CA). ¿Qué comprueba el navegador antes de mostrar el candado?",
      modelAnswer: "HTTPS cifra la comunicación con TLS: nadie puede leer ni cambiar los datos por el camino, y el usuario sabe que habla con el servidor correcto.\n\nEl certificado es un fichero que une la clave pública del servidor con su dominio. La CA es una entidad de confianza (por ejemplo, Let's Encrypt) que firma los certificados.\n\nEl navegador comprueba que el certificado está firmado por una CA de confianza, que no ha caducado y que el dominio coincide con el que se visita. Si algo falla (por ejemplo, un certificado autofirmado), muestra un aviso.",
      criteriaText: "Criterio: HTTPS (0,3) · certificado y CA (0,3) · comprobaciones (0,4).",
      criteria: [
        { label: "Qué aporta HTTPS frente a HTTP", maxPoints: 0.3 },
        { label: "Qué es certificado y qué es CA", maxPoints: 0.3 },
        { label: "Tres comprobaciones del navegador", maxPoints: 0.4 }
      ],
      maxPoints: 1
    },
    {
      id: 13,
      block: 7,
      title: "Ejercicio 13. Seguridad del servidor web",
      prompt: "Explica cinco medidas sencillas para proteger un servidor web publicado en Internet.",
      modelAnswer: "1. Usar HTTPS para cifrar contraseñas y datos.\n2. Ocultar la versión del servidor (`ServerTokens Prod` y `ServerSignature Off`).\n3. Desactivar el listado de carpetas (`Options -Indexes`).\n4. Proteger con usuario y contraseña las zonas privadas.\n5. No mostrar los errores de PHP al público (`display_errors = Off`).\n6. Tener un cortafuegos que solo abra los puertos necesarios (80 y 443).\n7. Mantener actualizados Apache, PHP y el resto del software.",
      criteriaText: "Criterio: 0,2 por cada medida bien explicada (máximo 1).",
      criteria: [
        { label: "Medida de seguridad 1", maxPoints: 0.2 },
        { label: "Medida de seguridad 2", maxPoints: 0.2 },
        { label: "Medida de seguridad 3", maxPoints: 0.2 },
        { label: "Medida de seguridad 4", maxPoints: 0.2 },
        { label: "Medida de seguridad 5", maxPoints: 0.2 }
      ],
      maxPoints: 1
    },
    {
      id: 14,
      block: 7,
      title: "Ejercicio 14. Logs y pruebas de rendimiento",
      prompt: "Explica qué guardan los ficheros access.log y error.log de Apache. Después explica qué es una prueba de carga, cómo se hace con ab y qué tres datos del resultado mirarías.",
      modelAnswer: "- `access.log`: una línea por cada petición: IP del cliente, fecha, petición, código de respuesta y tamaño.\n- `error.log`: errores y avisos del servidor (por ejemplo, la causa de un error 500).\n\nUna prueba de carga simula muchos usuarios a la vez para ver cómo responde el servidor. Con `ab`:\n```bash\nab -n 500 -c 20 http://localhost/\n```\n(500 peticiones, 20 a la vez).\n\nDatos del resultado: `Requests per second` (peticiones por segundo), `Time per request` (tiempo medio) y `Failed requests` (peticiones fallidas).",
      criteriaText: "Criterio: logs (0,4) · prueba de carga y comando (0,3) · datos (0,3).",
      criteria: [
        { label: "Qué guardan access.log y error.log", maxPoints: 0.4 },
        { label: "Prueba de carga y comando ab", maxPoints: 0.3 },
        { label: "Tres datos clave del resultado", maxPoints: 0.3 }
      ],
      maxPoints: 1
    },
    {
      id: 15,
      block: 8,
      title: "Ejercicio 15. Apache Tomcat",
      prompt: "Explica qué es Tomcat y para qué sirven sus carpetas bin, conf, webapps y logs y los ficheros server.xml y tomcat-users.xml. Describe dos formas de desplegar una aplicación .war.",
      modelAnswer: "Tomcat es un servidor de aplicaciones para aplicaciones web Java. Necesita Java instalado y escucha por defecto en el puerto `8080`.\n\n- `bin`: scripts para arrancarlo y pararlo (`startup` y `shutdown`).\n- `conf`: configuración. `server.xml` (puertos y conectores) y `tomcat-users.xml` (usuarios y roles del gestor).\n- `webapps`: aplicaciones desplegadas.\n- `logs`: registros de arranque y errores.\n\nFormas de desplegar un `.war`:\n1. Copiarlo en `webapps`: Tomcat lo despliega solo.\n2. Subirlo desde el gestor web (`/manager/html`) con un usuario con rol `manager-gui`.",
      criteriaText: "Criterio: qué es (0,2) · carpetas y ficheros (0,4) · formas de desplegar (0,4).",
      criteria: [
        { label: "Qué es Tomcat", maxPoints: 0.2 },
        { label: "Carpetas (bin, conf, webapps, logs) y ficheros (server.xml, tomcat-users.xml)", maxPoints: 0.4 },
        { label: "Dos formas de desplegar un .war", maxPoints: 0.4 }
      ],
      maxPoints: 1
    },
    {
      id: 16,
      block: 8,
      title: "Ejercicio 16. Proxy inverso",
      prompt: "Explica qué es un proxy inverso y dibuja o describe el camino de una petición cuando Apache hace de proxy de un Tomcat. Indica tres ventajas.",
      modelAnswer: "Un proxy inverso recibe las peticiones de los clientes y las reenvía a un servidor interno; el cliente nunca habla directamente con ese servidor.\n\nCamino: `navegador → Apache (puerto 80/443) → Tomcat (puerto 8080) → Apache → navegador`.\n\nVentajas:\n- URL limpia sin escribir el puerto 8080.\n- Tomcat no queda expuesto directamente a Internet.\n- El HTTPS se pone solo en Apache.\n- Se puede repartir la carga entre varios Tomcat.",
      criteriaText: "Criterio: definición (0,4) · camino (0,3) · ventajas (0,3).",
      criteria: [
        { label: "Definición de proxy inverso", maxPoints: 0.4 },
        { label: "Camino de la petición Apache <-> Tomcat", maxPoints: 0.3 },
        { label: "Tres ventajas", maxPoints: 0.3 }
      ],
      maxPoints: 1
    }
  ],

  practicalCases: [
    {
      id: 1,
      block: 2,
      title: "Caso 1. Dos webs por nombre y una por puerto en Apache (XAMPP)",
      context: "Tienes un servidor (192.168.30.10) con XAMPP. Una academia quiere publicar su web principal, su web de cursos y un panel interno.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe los Virtual Hosts de academia.local (ficheros en C:/xampp/htdocs/academia) y cursos.local (ficheros en C:/xampp/htdocs/cursos). Indica en qué fichero los escribes y qué haces después para que se apliquen.",
          modelAnswer: "Fichero `C:/xampp/apache/conf/extra/httpd-vhosts.conf`:\n\n```apache\n<VirtualHost *:80>\n    ServerName academia.local\n    DocumentRoot \"C:/xampp/htdocs/academia\"\n</VirtualHost>\n\n<VirtualHost *:80>\n    ServerName cursos.local\n    DocumentRoot \"C:/xampp/htdocs/cursos\"\n</VirtualHost>\n```\n\nDespués se reinicia Apache desde el XAMPP Control Panel (Stop y Start).",
          criteriaText: "Criterio: fichero (0,2) · ServerName y DocumentRoot de cada web (0,6) · reiniciar Apache (0,2).",
          criteria: [
            { label: "Fichero httpd-vhosts.conf", maxPoints: 0.2 },
            { label: "ServerName y DocumentRoot de ambas webs", maxPoints: 0.6 },
            { label: "Reiniciar Apache", maxPoints: 0.2 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "El panel interno (C:/xampp/htdocs/panel) debe publicarse en el puerto 8081 de la misma IP. Indica qué ficheros modificas y qué escribes en cada uno.",
          modelAnswer: "En `httpd.conf`, para que Apache escuche también en ese puerto:\n\n```apache\nListen 8081\n```\n\nEn `httpd-vhosts.conf`:\n\n```apache\n<VirtualHost *:8081>\n    DocumentRoot \"C:/xampp/htdocs/panel\"\n</VirtualHost>\n```",
          criteriaText: "Criterio: Listen 8081 en httpd.conf (0,5) · Virtual Host del puerto 8081 (0,5).",
          criteria: [
            { label: "Listen 8081 en httpd.conf", maxPoints: 0.5 },
            { label: "Virtual Host *:8081 en httpd-vhosts.conf", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe lo que hay que añadir al fichero hosts de un cliente para probar las webs e indica la URL de cada una de las tres.",
          modelAnswer: "```text\n192.168.30.10   academia.local\n192.168.30.10   cursos.local\n```\n\nURLs:\n- `http://academia.local`\n- `http://cursos.local`\n- `http://192.168.30.10:8081` (el panel va por puerto, no necesita nombre)",
          criteriaText: "Criterio: líneas de hosts (0,4) · 0,2 por cada URL.",
          criteria: [
            { label: "Líneas del fichero hosts", maxPoints: 0.4 },
            { label: "URL http://academia.local", maxPoints: 0.2 },
            { label: "URL http://cursos.local", maxPoints: 0.2 },
            { label: "URL http://192.168.30.10:8081", maxPoints: 0.2 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 2,
      block: 3,
      title: "Caso 2. Dos webs en Nginx",
      context: "Tienes un servidor (192.168.30.20) con Nginx. Hay que publicar un portfolio y la documentación de un proyecto.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe el Server Block de portfolio.local, por el puerto 80, con los ficheros en C:/nginx/html/portfolio y la página de inicio index.html.",
          modelAnswer: "```nginx\nserver {\n    listen 80;\n    server_name portfolio.local;\n    root C:/nginx/html/portfolio;\n    index index.html;\n}\n```",
          criteriaText: "Criterio: listen (0,25) · server_name (0,25) · root (0,25) · index (0,25).",
          criteria: [
            { label: "listen 80;", maxPoints: 0.25 },
            { label: "server_name portfolio.local;", maxPoints: 0.25 },
            { label: "root C:/nginx/html/portfolio;", maxPoints: 0.25 },
            { label: "index index.html;", maxPoints: 0.25 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "La documentación (C:/nginx/html/docs) debe verse en el puerto 8082 con el nombre docs.local. Escribe su Server Block.",
          modelAnswer: "```nginx\nserver {\n    listen 8082;\n    server_name docs.local;\n    root C:/nginx/html/docs;\n    index index.html;\n}\n```",
          criteriaText: "Criterio: listen 8082 (0,4) · resto del bloque (0,6).",
          criteria: [
            { label: "listen 8082;", maxPoints: 0.4 },
            { label: "Resto del bloque (server_name, root, index)", maxPoints: 0.6 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe el comando para comprobar que la configuración no tiene errores, el que recarga Nginx y las líneas del fichero hosts del cliente.",
          modelAnswer: "```bash\nnginx -t\nnginx -s reload\n```\n\nFichero `hosts`:\n```text\n192.168.30.20   portfolio.local\n192.168.30.20   docs.local\n```\n\nURL de la documentación: `http://docs.local:8082`",
          criteriaText: "Criterio: nginx -t (0,3) · nginx -s reload (0,3) · hosts (0,4).",
          criteria: [
            { label: "nginx -t", maxPoints: 0.3 },
            { label: "nginx -s reload", maxPoints: 0.3 },
            { label: "Líneas del fichero hosts", maxPoints: 0.4 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 3,
      block: 4,
      title: "Caso 3. Ajustes de php.ini",
      context: "Una plataforma de la academia, en XAMPP, permite a los alumnos subir sus trabajos en PDF de hasta 20 MB.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Indica qué directivas de php.ini hay que cambiar para que se puedan subir ficheros de 20 MB y qué valores pondrías.",
          modelAnswer: "```ini\nupload_max_filesize = 20M\npost_max_size = 25M\n```\n\n`post_max_size` tiene que ser algo mayor, porque incluye el fichero y el resto del formulario.",
          criteriaText: "Criterio: upload_max_filesize (0,5) · post_max_size mayor o igual (0,5).",
          criteria: [
            { label: "upload_max_filesize = 20M", maxPoints: 0.5 },
            { label: "post_max_size >= 20M (ej. 25M)", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Algunos scripts tardan unos 2 minutos y usan bastante memoria. Indica qué directivas cambias y qué valores pondrías.",
          modelAnswer: "```ini\nmax_execution_time = 120\nmemory_limit = 256M\n```",
          criteriaText: "Criterio: max_execution_time (0,5) · memory_limit (0,5).",
          criteria: [
            { label: "max_execution_time = 120", maxPoints: 0.5 },
            { label: "memory_limit (ej. 256M)", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "La web pasa a producción. Indica cómo configurarías los errores de PHP, dónde está php.ini en XAMPP y qué haces después de cambiarlo.",
          modelAnswer: "```ini\ndisplay_errors = Off\nlog_errors = On\n```\n\nAsí los errores no se muestran a los visitantes, pero se guardan en el log.\n\n`php.ini` está en `C:/xampp/php/php.ini` (o en el botón Config de Apache del panel). Después hay que reiniciar Apache.",
          criteriaText: "Criterio: directivas (0,5) · ubicación (0,25) · reiniciar Apache (0,25).",
          criteria: [
            { label: "display_errors = Off y log_errors = On", maxPoints: 0.5 },
            { label: "Ubicación C:/xampp/php/php.ini", maxPoints: 0.25 },
            { label: "Reiniciar Apache", maxPoints: 0.25 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 4,
      block: 2,
      title: "Caso 4. Proteger una zona privada en Apache",
      context: "La tienda de la academia está en C:/xampp/htdocs/tienda. La carpeta privado solo deben verla los usuarios ana y luis.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe los comandos que crean el fichero de contraseñas C:/xampp/claves/.htpasswd con los dos usuarios.",
          modelAnswer: "El programa está en `C:/xampp/apache/bin`. El primer comando lleva `-c` (crea el fichero); el segundo no, para no borrar a `ana`:\n\n```bash\nhtpasswd -c C:/xampp/claves/.htpasswd ana\nhtpasswd C:/xampp/claves/.htpasswd luis\n```",
          criteriaText: "Criterio: primer comando con -c (0,5) · segundo sin -c (0,5).",
          criteria: [
            { label: "Primer comando con -c", maxPoints: 0.5 },
            { label: "Segundo comando sin -c", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Escribe el contenido del fichero .htaccess de la carpeta privado.",
          modelAnswer: "```apache\nAuthType Basic\nAuthName \"Zona privada\"\nAuthUserFile \"C:/xampp/claves/.htpasswd\"\nRequire valid-user\n```",
          criteriaText: "Criterio: 0,25 por cada línea.",
          criteria: [
            { label: "AuthType Basic", maxPoints: 0.25 },
            { label: "AuthName \"Zona privada\"", maxPoints: 0.25 },
            { label: "AuthUserFile \"C:/xampp/claves/.htpasswd\"", maxPoints: 0.25 },
            { label: "Require valid-user", maxPoints: 0.25 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe lo que necesita la configuración de Apache para que funcione el .htaccess. Además, la carpeta imagenes no tiene index.html y se ve la lista de ficheros: ¿cómo lo evitas?",
          modelAnswer: "```apache\n<Directory \"C:/xampp/htdocs/tienda/privado\">\n    AllowOverride All\n</Directory>\n\n<Directory \"C:/xampp/htdocs/tienda/imagenes\">\n    Options -Indexes\n</Directory>\n```\n\nDespués se reinicia Apache.",
          criteriaText: "Criterio: AllowOverride (0,5) · Options -Indexes (0,5).",
          criteria: [
            { label: "AllowOverride All en privado", maxPoints: 0.5 },
            { label: "Options -Indexes en imagenes", maxPoints: 0.5 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 5,
      block: 2,
      title: "Caso 5. Redirecciones",
      context: "Una empresa cambia su dominio antigua.local por nueva.local. Las dos webs están en el mismo servidor Apache.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe el Virtual Host de antigua.local que redirija para siempre todas sus páginas a http://nueva.local/.",
          modelAnswer: "```apache\n<VirtualHost *:80>\n    ServerName antigua.local\n    Redirect permanent / http://nueva.local/\n</VirtualHost>\n```",
          criteriaText: "Criterio: ServerName (0,3) · Redirect permanent (0,7).",
          criteria: [
            { label: "ServerName antigua.local", maxPoints: 0.3 },
            { label: "Redirect permanent / http://nueva.local/", maxPoints: 0.7 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Durante el Black Friday, la página /ofertas de nueva.local debe llevar temporalmente a http://nueva.local/black-friday. Escribe la línea que añades al Virtual Host de nueva.local.",
          modelAnswer: "```apache\nRedirect temp /ofertas http://nueva.local/black-friday\n```\n\nTambién vale `Redirect 302 /ofertas ...`.",
          criteriaText: "Criterio: temp o 302 (0,5) · rutas correctas (0,5).",
          criteria: [
            { label: "Redirect temp o Redirect 302", maxPoints: 0.5 },
            { label: "Rutas origen y destino correctas", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Indica qué código HTTP devuelve cada redirección anterior y qué efecto tiene cada una en los buscadores.",
          modelAnswer: "- La del dominio: **301 (permanente)**. Los buscadores cambian la URL antigua por la nueva y conservan el posicionamiento.\n- La de ofertas: **302 (temporal)**. Los buscadores mantienen indexada `/ofertas`.",
          criteriaText: "Criterio: códigos (0,4) · efecto en buscadores (0,6).",
          criteria: [
            { label: "Códigos HTTP 301 y 302", maxPoints: 0.4 },
            { label: "Efecto en los buscadores (SEO)", maxPoints: 0.6 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 6,
      block: 6,
      title: "Caso 6. HTTPS con certificado autofirmado",
      context: "La web de reservas de la academia (reservas.local, ficheros en C:/xampp/htdocs/reservas) debe funcionar solo por HTTPS. Es una web interna, así que se usará un certificado autofirmado.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Indica con qué herramienta creas el certificado autofirmado, qué dos ficheros obtienes y qué módulo de Apache debe estar activo.",
          modelAnswer: "Herramienta: **OpenSSL** (en XAMPP, en `apache/bin`). Ejemplo:\n\n```bash\nopenssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout reservas.key -out reservas.crt\n```\n\nSe obtienen el certificado (`reservas.crt`) y la clave privada (`reservas.key`).\nMódulo: `mod_ssl` (línea `LoadModule ssl_module` sin `#` en `httpd.conf`).",
          criteriaText: "Criterio: OpenSSL (0,3) · dos ficheros (0,4) · mod_ssl (0,3). No es obligatorio escribir el comando completo.",
          criteria: [
            { label: "Herramienta OpenSSL", maxPoints: 0.3 },
            { label: "Dos ficheros: certificado (.crt) y clave privada (.key)", maxPoints: 0.4 },
            { label: "Módulo mod_ssl activo", maxPoints: 0.3 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Escribe el Virtual Host del puerto 443. Los ficheros están en C:/xampp/apache/conf/ssl.",
          modelAnswer: "```apache\n<VirtualHost *:443>\n    ServerName reservas.local\n    DocumentRoot \"C:/xampp/htdocs/reservas\"\n    SSLEngine on\n    SSLCertificateFile \"C:/xampp/apache/conf/ssl/reservas.crt\"\n    SSLCertificateKeyFile \"C:/xampp/apache/conf/ssl/reservas.key\"\n</VirtualHost>\n```",
          criteriaText: "Criterio: ServerName y DocumentRoot (0,3) · SSLEngine on (0,3) · las dos rutas (0,4).",
          criteria: [
            { label: "ServerName y DocumentRoot", maxPoints: 0.3 },
            { label: "SSLEngine on", maxPoints: 0.3 },
            { label: "SSLCertificateFile y SSLCertificateKeyFile", maxPoints: 0.4 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe el Virtual Host del puerto 80 que lleva a HTTPS y explica qué verá el usuario la primera vez que entre y por qué.",
          modelAnswer: "```apache\n<VirtualHost *:80>\n    ServerName reservas.local\n    Redirect permanent / https://reservas.local/\n</VirtualHost>\n```\n\nLa primera vez el navegador mostrará un **aviso de sitio no seguro**, porque el certificado no está firmado por ninguna CA de confianza. La comunicación sí va cifrada.",
          criteriaText: "Criterio: redirección (0,5) · explicación del aviso (0,5).",
          criteria: [
            { label: "VirtualHost *:80 con redirección a HTTPS", maxPoints: 0.5 },
            { label: "Explicación del aviso de sitio no seguro (sin CA)", maxPoints: 0.5 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 7,
      block: 5,
      title: "Caso 7. Web de folletos en un contenedor Apache",
      context: "En un servidor con Docker (192.168.30.40) hay que publicar los folletos de la academia con la imagen oficial de Apache (httpd). Dentro del contenedor, la carpeta de la web es /usr/local/apache2/htdocs.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe el comando que descarga la imagen y el que lanza en segundo plano un contenedor llamado folletos que sirva la carpeta C:/folletos del anfitrión por el puerto 8088.",
          modelAnswer: "```bash\ndocker pull httpd\ndocker run -d --name folletos -p 8088:80 -v C:/folletos:/usr/local/apache2/htdocs httpd\n```",
          criteriaText: "Criterio: docker pull (0,2) · -d (0,2) · --name (0,2) · -p (0,2) · -v (0,2).",
          criteria: [
            { label: "docker pull httpd", maxPoints: 0.2 },
            { label: "-d (segundo plano)", maxPoints: 0.2 },
            { label: "--name folletos", maxPoints: 0.2 },
            { label: "-p 8088:80", maxPoints: 0.2 },
            { label: "-v C:/folletos:/usr/local/apache2/htdocs", maxPoints: 0.2 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Escribe los comandos para comprobar que está en marcha y para ver sus logs. ¿Con qué URL entra un cliente?",
          modelAnswer: "```bash\ndocker ps\ndocker logs folletos\n```\n\nURL: `http://192.168.30.40:8088`",
          criteriaText: "Criterio: docker ps (0,3) · docker logs (0,3) · URL (0,4).",
          criteria: [
            { label: "docker ps", maxPoints: 0.3 },
            { label: "docker logs folletos", maxPoints: 0.3 },
            { label: "URL http://192.168.30.40:8088", maxPoints: 0.4 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe los comandos para parar el contenedor, volver a arrancarlo y, al final, borrarlo. ¿Qué pasa con los ficheros de C:/folletos al borrar el contenedor?",
          modelAnswer: "```bash\ndocker stop folletos\ndocker start folletos\ndocker stop folletos\ndocker rm folletos\n```\n\nLos ficheros de `C:/folletos` no se pierden: están en el anfitrión y el contenedor solo los usaba a través del volumen.",
          criteriaText: "Criterio: stop, start y rm (0,6) · explicación de los ficheros (0,4).",
          criteria: [
            { label: "Comandos stop, start y rm", maxPoints: 0.6 },
            { label: "Explicación de que los ficheros persisten en el anfitrión", maxPoints: 0.4 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 8,
      block: 5,
      title: "Caso 8. Dos versiones de una web con Nginx en Docker",
      context: "Quieres probar dos versiones de una web con la imagen nginx, cada una en un contenedor distinto.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Escribe los comandos para lanzar en segundo plano el contenedor v1 por el puerto 8081 y el contenedor v2 por el puerto 8082.",
          modelAnswer: "```bash\ndocker run -d --name v1 -p 8081:80 nginx\ndocker run -d --name v2 -p 8082:80 nginx\n```",
          criteriaText: "Criterio: 0,5 por cada comando.",
          criteria: [
            { label: "Comando contenedor v1 en puerto 8081", maxPoints: 0.5 },
            { label: "Comando contenedor v2 en puerto 8082", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Lanzas un tercer contenedor v3 con -p 8081:80. ¿Qué ocurre y cómo lo solucionas?",
          modelAnswer: "Da error, porque el puerto `8081` del anfitrión ya lo usa `v1`. Dos contenedores no pueden publicar el mismo puerto del anfitrión. Se soluciona usando otro puerto:\n\n```bash\ndocker run -d --name v3 -p 8083:80 nginx\n```",
          criteriaText: "Criterio: explicación (0,5) · solución (0,5).",
          criteria: [
            { label: "Explicación del conflicto de puerto 8081", maxPoints: 0.5 },
            { label: "Solución usando otro puerto anfitrión (ej. 8083:80)", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe los comandos para ver todos los contenedores (también los parados), ver las imágenes descargadas y borrar la imagen nginx. ¿Qué hay que hacer antes de borrar la imagen?",
          modelAnswer: "```bash\ndocker ps -a\ndocker images\ndocker rmi nginx\n```\n\nAntes hay que parar y borrar los contenedores que usan esa imagen (`docker stop` y `docker rm`).",
          criteriaText: "Criterio: 0,2 por cada comando · paso previo (0,4).",
          criteria: [
            { label: "docker ps -a", maxPoints: 0.2 },
            { label: "docker images", maxPoints: 0.2 },
            { label: "docker rmi nginx", maxPoints: 0.2 },
            { label: "Paso previo: parar y borrar contenedores asociados", maxPoints: 0.4 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 9,
      block: 8,
      title: "Caso 9. Configuración de Tomcat",
      context: "En un servidor (192.168.30.50) está instalado Tomcat. Hay que preparar el gestor web y desplegar la aplicación notas.war.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Crea el usuario admintomcat con contraseña Clave2026 que pueda usar el gestor web. Indica el fichero y las líneas.",
          modelAnswer: "Fichero `conf/tomcat-users.xml`, dentro de `<tomcat-users>`:\n\n```xml\n<role rolename=\"manager-gui\"/>\n<user username=\"admintomcat\" password=\"Clave2026\" roles=\"manager-gui\"/>\n```",
          criteriaText: "Criterio: fichero (0,3) · rol manager-gui (0,4) · usuario (0,3).",
          criteria: [
            { label: "Fichero conf/tomcat-users.xml", maxPoints: 0.3 },
            { label: "Rol manager-gui", maxPoints: 0.4 },
            { label: "Usuario admintomcat con contraseña y rol", maxPoints: 0.3 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Tomcat debe escuchar en el puerto 8081. Indica el fichero, la línea que cambias y qué haces después.",
          modelAnswer: "Fichero `conf/server.xml`, en el `Connector` HTTP:\n\n```xml\n<Connector port=\"8081\" protocol=\"HTTP/1.1\"\n           connectionTimeout=\"20000\" redirectPort=\"8443\" />\n```\n\nDespués se reinicia Tomcat (`shutdown` y `startup` en la carpeta `bin`).",
          criteriaText: "Criterio: fichero (0,3) · port=\"8081\" (0,4) · reiniciar (0,3).",
          criteria: [
            { label: "Fichero conf/server.xml", maxPoints: 0.3 },
            { label: "port=\"8081\" en el Connector", maxPoints: 0.4 },
            { label: "Reiniciar Tomcat", maxPoints: 0.3 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Explica dos formas de desplegar notas.war e indica la URL de la aplicación.",
          modelAnswer: "1. Copiar `notas.war` en la carpeta `webapps`: Tomcat lo despliega solo.\n2. Entrar en `http://192.168.30.50:8081/manager/html` con `admintomcat` y subirlo en «WAR file to deploy».\n\nURL: `http://192.168.30.50:8081/notas`",
          criteriaText: "Criterio: 0,35 por cada forma · URL (0,3).",
          criteria: [
            { label: "Forma 1: copiar en webapps", maxPoints: 0.35 },
            { label: "Forma 2: subir desde /manager/html", maxPoints: 0.35 },
            { label: "URL http://192.168.30.50:8081/notas", maxPoints: 0.3 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 10,
      block: 8,
      title: "Caso 10. Apache como proxy de Tomcat",
      context: "La aplicación de notas del caso anterior (192.168.30.50:8081/notas) debe verse como http://notas.academia.local, a través del Apache de otro servidor (192.168.30.60).",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Indica qué módulos de Apache hay que activar y escribe sus líneas en httpd.conf.",
          modelAnswer: "```apache\nLoadModule proxy_module modules/mod_proxy.so\nLoadModule proxy_http_module modules/mod_proxy_http.so\n```\n\nSe activan quitando el `#` del principio y reiniciando Apache.",
          criteriaText: "Criterio: mod_proxy (0,5) · mod_proxy_http (0,5).",
          criteria: [
            { label: "mod_proxy (LoadModule proxy_module)", maxPoints: 0.5 },
            { label: "mod_proxy_http (LoadModule proxy_http_module)", maxPoints: 0.5 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Escribe el Virtual Host.",
          modelAnswer: "```apache\n<VirtualHost *:80>\n    ServerName notas.academia.local\n    ProxyPreserveHost On\n    ProxyPass / http://192.168.30.50:8081/notas/\n    ProxyPassReverse / http://192.168.30.50:8081/notas/\n</VirtualHost>\n```",
          criteriaText: "Criterio: ServerName (0,2) · ProxyPass (0,4) · ProxyPassReverse (0,4). ProxyPreserveHost es opcional.",
          criteria: [
            { label: "ServerName notas.academia.local", maxPoints: 0.2 },
            { label: "ProxyPass / http://192.168.30.50:8081/notas/", maxPoints: 0.4 },
            { label: "ProxyPassReverse / http://192.168.30.50:8081/notas/", maxPoints: 0.4 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "Escribe la línea del fichero hosts del cliente y explica dos ventajas de hacerlo así.",
          modelAnswer: "```text\n192.168.30.60   notas.academia.local\n```\n(Apunta al Apache, no al Tomcat).\n\nVentajas:\n- Los alumnos usan una URL limpia, sin puerto.\n- Tomcat no queda expuesto directamente.\n- Se puede poner HTTPS solo en Apache.",
          criteriaText: "Criterio: hosts (0,4) · 0,3 por cada ventaja.",
          criteria: [
            { label: "Línea hosts apuntando a 192.168.30.60", maxPoints: 0.4 },
            { label: "Ventaja 1", maxPoints: 0.3 },
            { label: "Ventaja 2", maxPoints: 0.3 }
          ],
          maxPoints: 1
        }
      ]
    },
    {
      id: 11,
      block: 7,
      title: "Caso 11. Logs y prueba de carga",
      context: "La web academia.local va lenta en época de matrícula y quieres analizar qué pasa.",
      maxPoints: 3,
      parts: [
        {
          partNumber: 1,
          prompt: "Explica qué significa cada dato de esta línea del access.log:\n192.168.1.25 - - [20/Nov/2026:10:15:32 +0100] \"GET /cursos.php HTTP/1.1\" 200 5320",
          modelAnswer: "- `192.168.1.25`: IP del cliente.\n- `[20/Nov/2026:10:15:32 +0100]`: fecha y hora de la petición.\n- `GET /cursos.php HTTP/1.1`: método, recurso pedido y versión de HTTP.\n- `200`: código de respuesta (correcto).\n- `5320`: tamaño de la respuesta en bytes.",
          criteriaText: "Criterio: 0,2 por cada dato.",
          criteria: [
            { label: "IP del cliente", maxPoints: 0.2 },
            { label: "Fecha y hora", maxPoints: 0.2 },
            { label: "Método, recurso y versión HTTP", maxPoints: 0.2 },
            { label: "Código de respuesta 200", maxPoints: 0.2 },
            { label: "Tamaño de la respuesta en bytes", maxPoints: 0.2 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 2,
          prompt: "Escribe el comando de ab que lanza 200 peticiones en total, 10 a la vez, contra http://academia.local/.",
          modelAnswer: "```bash\nab -n 200 -c 10 http://academia.local/\n```\n\n- `-n`: número total de peticiones.\n- `-c`: peticiones a la vez (concurrencia).",
          criteriaText: "Criterio: -n (0,4) · -c (0,4) · URL (0,2).",
          criteria: [
            { label: "Parámetro -n 200", maxPoints: 0.4 },
            { label: "Parámetro -c 10", maxPoints: 0.4 },
            { label: "URL http://academia.local/", maxPoints: 0.2 }
          ],
          maxPoints: 1
        },
        {
          partNumber: 3,
          prompt: "El resultado muestra Requests per second: 85.40, Time per request: 117.1 ms y Failed requests: 12. Explica cada dato, dónde mirarías por qué fallan peticiones y dos medidas de mejora.",
          modelAnswer: "- `Requests per second 85.40`: el servidor atiende unas 85 peticiones por segundo.\n- `Time per request 117.1 ms`: cada petición tarda de media 117 milisegundos.\n- `Failed requests 12`: 12 peticiones no se atendieron bien; debería ser 0.\n\nLas causas se buscan en el `error.log` de Apache (`C:/xampp/apache/logs`).\n\nMejoras: activar la compresión (`mod_deflate`) y la caché, optimizar los scripts PHP y la base de datos, o servir el contenido estático con Nginx.",
          criteriaText: "Criterio: datos (0,4) · error.log (0,2) · dos medidas (0,4).",
          criteria: [
            { label: "Explicación de los 3 datos de ab", maxPoints: 0.4 },
            { label: "Mirar en error.log de Apache", maxPoints: 0.2 },
            { label: "Dos medidas de mejora", maxPoints: 0.4 }
          ],
          maxPoints: 1
        }
      ]
    }
  ],

  quickIndex: [
    { question: "¿HTTP, HTML, URL? ¿P2P, cliente-servidor o tres capas?", topicId: 1, topicLabel: "Tema 1" },
    { question: "¿Apache, Nginx o IIS? ¿Cómo instalo LAMP? ¿Docker?", topicId: 2, topicLabel: "Tema 2" },
    { question: "¿HTTPS, php.ini, logs, módulos, rendimiento?", topicId: 3, topicLabel: "Tema 3" },
    { question: "¿Cómo alojo varias webs en un servidor? ¿Redirecciones?", topicId: 4, topicLabel: "Tema 4" },
    { question: "¿Certificados, Let's Encrypt, contraseñas, cortafuegos?", topicId: 5, topicLabel: "Tema 5" },
    { question: "¿Qué es Tomcat? ¿Node.js? ¿Un WAR?", topicId: 6, topicLabel: "Tema 6" },
    { question: "¿Dónde se configura Tomcat? ¿HTTPS en Tomcat o Node?", topicId: 7, topicLabel: "Tema 7" },
    { question: "¿LDAP, sesiones, proxy, Jenkins, Forever?", topicId: 8, topicLabel: "Tema 8" }
  ],

  commonErrors: [
    {
      problem: "Los cambios de configuración no se aplican",
      cause: "No se ha reiniciado el servicio",
      solution: "sudo systemctl restart apache2 (o nginx, tomcat9)"
    },
    {
      problem: "Nginx no arranca tras editar la configuración",
      cause: "Hay un error de sintaxis",
      solution: "sudo nginx -t (en Apache: sudo apache2ctl configtest)"
    },
    {
      problem: "Nginx muestra el código PHP o lo descarga",
      cause: "PHP no está activado en el sitio",
      solution: "Activar PHP (php-fpm) en el fichero de sites-available"
    },
    {
      problem: "Sale la página por defecto en lugar de mi web",
      cause: "DocumentRoot o ServerName mal configurados",
      solution: "Revisar el Virtual Host y reiniciar"
    },
    {
      problem: "No se encuentra la web por nombre",
      cause: "Falta la entrada en el fichero hosts o en el DNS",
      solution: "Añadir IP nombre en /etc/hosts (o C:\\Windows\\System32\\drivers\\etc\\hosts)"
    },
    {
      problem: "Error de «default server duplicado» en Nginx",
      cause: "default_server repetido en varios Server Blocks",
      solution: "Quitar default_server de las líneas listen"
    },
    {
      problem: "No deja subir ficheros grandes",
      cause: "Límites de PHP",
      solution: "Subir upload_max_filesize y post_max_size en php.ini"
    },
    {
      problem: "El navegador avisa de «sitio no seguro»",
      cause: "Certificado autofirmado",
      solution: "Usar un certificado de una CA (Let's Encrypt con Certbot)"
    },
    {
      problem: "Error 403",
      cause: "Acceso prohibido (.htaccess, <Directory> o permisos)",
      solution: "Revisar las reglas de acceso y los permisos de www-data"
    },
    {
      problem: ".htaccess no hace nada",
      cause: "Falta AllowOverride All",
      solution: "Activarlo en la configuración de Apache"
    },
    {
      problem: "«Address already in use» / el puerto está en uso",
      cause: "Otro servicio o contenedor usa ese puerto",
      solution: "Cambiar el puerto (server.xml, .listen(), Listen, -p en Docker)"
    },
    {
      problem: "No puedo entrar en el gestor de Tomcat",
      cause: "Falta el usuario con rol manager-gui",
      solution: "Añadirlo en tomcat-users.xml"
    },
    {
      problem: "Algo falla y no sé qué",
      cause: "Falta revisar los registros de errores",
      solution: "Mirar los logs: /var/log/apache2, /var/log/nginx, catalina.out"
    }
  ],

  referenceTables: {
    ports: [
      { port: "80", protocol: "TCP", service: "HTTP", notes: "Tráfico web sin cifrar (Apache, Nginx, IIS)" },
      { port: "443", protocol: "TCP", service: "HTTPS", notes: "HTTP cifrado con SSL/TLS" },
      { port: "8080", protocol: "TCP", service: "Apache Tomcat / Jenkins", notes: "Puerto por defecto de Tomcat y Jenkins (y habitual en pruebas)" },
      { port: "8081 / 8082 / 8088", protocol: "TCP", service: "Virtual Hosts / Docker", notes: "Puertos alternativos en hosts por puerto o mapeo -p" },
      { port: "8443", protocol: "TCP", service: "Tomcat HTTPS (redirectPort)", notes: "Puerto de redirección SSL típico en Connector de server.xml" },
      { port: "3000", protocol: "TCP", service: "Node.js", notes: "Puerto típico de aplicaciones Node.js (definido en app.js)" },
      { port: "3306", protocol: "TCP", service: "MySQL / MariaDB", notes: "Puerto de base de datos relacional" },
      { port: "389", protocol: "TCP", service: "LDAP", notes: "Autenticación centralizada (JNDIRealm / ldap-authentication)" },
      { port: "22", protocol: "TCP", service: "SSH", notes: "Administración remota segura (protegido con UFW y Fail2Ban)" },
      { port: "21", protocol: "TCP", service: "FTP", notes: "Transferencia de ficheros (ejemplo típico bloqueado con ufw deny 21)" }
    ],
    configFiles: [
      { file: "httpd.conf", path: "C:\\xampp\\apache\\conf\\httpd.conf (o /etc/apache2/apache2.conf)", role: "Configuración principal de Apache: Listen, LoadModule, Include de vhosts, ServerTokens" },
      { file: "httpd-vhosts.conf", path: "C:\\xampp\\apache\\conf\\extra\\httpd-vhosts.conf", role: "Virtual Hosts de Apache en XAMPP (sites-available/sites-enabled en Ubuntu)" },
      { file: "ports.conf", path: "/etc/apache2/ports.conf", role: "Puertos en los que escucha Apache en Ubuntu" },
      { file: ".htaccess", path: "Dentro de la carpeta web a configurar", role: "Configuración por carpeta en Apache (requiere AllowOverride All); no compatible con Nginx" },
      { file: "nginx.conf", path: "/etc/nginx/nginx.conf", role: "Configuración principal de Nginx: worker_processes, worker_connections" },
      { file: "sites-available / default", path: "/etc/nginx/sites-available/default", role: "Server Blocks de Nginx (se activan con enlace simbólico en sites-enabled)" },
      { file: "php.ini", path: "C:\\xampp\\php\\php.ini", role: "upload_max_filesize, post_max_size, memory_limit, max_execution_time, display_errors, log_errors" },
      { file: "server.xml", path: "conf/server.xml (Tomcat)", role: "Conectores y puertos (Connector), HTTPS (keystore), Sesiones persistentes (PersistentManager), Válvulas (Valve)" },
      { file: "tomcat-users.xml", path: "conf/tomcat-users.xml (Tomcat)", role: "Usuarios y roles para acceder al gestor web /manager/html (rol manager-gui)" },
      { file: "web.xml", path: "WEB-INF/web.xml (WAR) / conf/web.xml", role: "Descriptor de despliegue Java EE (servlets, url-pattern) o parámetros generales de Tomcat" },
      { file: "hosts", path: "C:\\Windows\\System32\\drivers\\etc\\hosts o /etc/hosts", role: "Resolución local de nombres de dominio a IP sin servidor DNS" },
      { file: "jail.local", path: "/etc/fail2ban/jail.local", role: "Reglas personalizadas de Fail2Ban (copiada de jail.conf)" },
      { file: "package.json", path: "Raíz del proyecto Node.js", role: "Dependencias y metadatos de la aplicación Node.js (equivalente al web.xml)" }
    ]
  },

  studyGuide: [
    {
      id: 1,
      title: "Tema 1 · Arquitecturas web",
      oneLiner: "La web funciona gracias a HTTP, HTML y las URL, y se organiza en tres modelos de arquitectura: P2P, cliente-servidor y tres capas.",
      cheatBullets: [
        "HTTP (puerto 80, capa 7) + HTML + URL = WWW (Berners-Lee). El W3C pone los estándares.",
        "URL: esquema://servidor/directorio/archivo",
        "P2P: Todos son cliente y servidor (Torrent) | + Si cae uno, siguen los demás | − Datos duplicados",
        "Cliente-servidor: Un servidor central | + Fácil de mantener | − Si cae, no hay servicio",
        "Tres capas: Cliente → servidor web → servidor BD | + Más seguro y rápido | − Más servidores y tráfico"
      ],
      theoryBlocks: [
        {
          heading: "Origen de la web y W3C",
          text: "En los años 90, Tim Berners-Lee creó tres cosas que, juntas, dieron lugar a la WWW (World Wide Web). En 1994 Berners-Lee fundó el W3C (World Wide Web Consortium), que crea los estándares de la web.",
          table: {
            headers: ["Invento", "Qué es"],
            rows: [
              ["HTTP (HyperText Transfer Protocol)", "Protocolo para transferir documentos HTML. Usa el puerto TCP 80. Está en la capa 7 (aplicación) del modelo OSI. La conexión siempre la inicia el cliente"],
              ["HTML (HyperText Markup Language)", "Lenguaje de etiquetas para crear páginas. La versión actual es HTML5 (2014), que mejora el audio y el vídeo"],
              ["URL (Uniform Resource Locator)", "Dirección para localizar un recurso: esquema://servidor/directorio/archivo (ej.: http://apache.org/)"]
            ]
          }
        },
        {
          heading: "Ventajas de las aplicaciones web frente a aplicaciones de escritorio",
          bullets: [
            "Fácil desplegar software nuevo (no hay que instalar nada en cada equipo).",
            "Información centralizada.",
            "Mejor seguridad (por ejemplo, SSO, Single Sign-On: un único inicio de sesión).",
            "Funcionan en cualquier sistema operativo con un navegador.",
            "Menos costes: valen equipos sencillos (thin clients)."
          ]
        },
        {
          heading: "Los tres modelos de arquitectura web",
          table: {
            headers: ["Modelo", "Cómo funciona", "Ventajas", "Inconvenientes"],
            rows: [
              ["P2P (peer to peer)", "Red en malla: todos los equipos están conectados y cada uno es cliente y servidor a la vez. Ejemplo: Torrent", "Descentralizado (si cae un nodo, los demás siguen); escalable (más nodos = mejor); carga repartida", "Información duplicada o inconsistente; muchos equipos que mantener"],
              ["Cliente-servidor (C/S)", "Toda la información está en un servidor que responde a los clientes (navegadores)", "Solo hay que mantener un servidor; información centralizada y segura; permite balanceo de carga", "Riesgo de congestión; si el servidor cae, no hay servicio; necesita un hardware potente"],
              ["Tres capas", "Evolución del C/S con servidores especializados: cliente → servidor web → servidor de base de datos", "Más seguridad (permisos por niveles); más flexible; mejor rendimiento", "Más servidores; más tráfico de red; riesgo si se configura mal; puede tardar más en responder"]
            ]
          }
        },
        {
          heading: "Cómo funciona el modelo de tres capas",
          bullets: [
            "1. El cliente pide algo al servidor web.",
            "2. El servidor web consulta al servidor de base de datos.",
            "3. El servidor de base de datos responde solo al servidor web.",
            "4. El servidor web devuelve la respuesta al cliente."
          ]
        }
      ],
      practiceBlocks: [
        {
          heading: "Saber leer una URL",
          text: "Ejemplo con https://www.medac.es/cursos/index.html. Otros esquemas: http, ftp, file, mailto.",
          table: {
            headers: ["Parte", "En https://www.medac.es/cursos/index.html"],
            rows: [
              ["Esquema (protocolo)", "https"],
              ["Servidor", "www.medac.es"],
              ["Directorio", "/cursos/"],
              ["Archivo", "index.html"]
            ]
          }
        },
        {
          heading: "Saber elegir el modelo de arquitectura",
          table: {
            headers: ["Situación", "Modelo"],
            rows: [
              ["Compartir archivos entre muchos usuarios sin un servidor central", "P2P"],
              ["Web pequeña con poco tráfico", "Cliente-servidor"],
              ["Tienda online con mucha información en una base de datos", "Tres capas"]
            ]
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué tres inventos de Berners-Lee dieron lugar a la WWW?", a: "HTTP, HTML y las URL." },
        { q: "¿Qué puerto usa HTTP por defecto? ¿En qué capa del modelo OSI está?", a: "El puerto TCP 80. Está en la capa 7 (aplicación)." },
        { q: "¿Qué es el W3C?", a: "El consorcio que crea los estándares de la web, fundado por Berners-Lee en 1994." },
        { q: "Nombra tres ventajas de las aplicaciones web frente a las de escritorio.", a: "Fácil despliegue, información centralizada, funcionan en cualquier sistema operativo, mejor seguridad y menos costes (cualquiera de estas)." },
        { q: "Compara el modelo P2P y el cliente-servidor: una ventaja y un inconveniente de cada uno.", a: "P2P: ventaja, si cae un nodo los demás siguen; inconveniente, información duplicada. C/S: ventaja, solo hay que mantener un servidor; inconveniente, si el servidor cae no hay servicio." },
        { q: "Explica cómo funciona el modelo de tres capas.", a: "El cliente pide al servidor web, este consulta al servidor de base de datos, la base de datos responde al servidor web y este responde al cliente." }
      ]
    },
    {
      id: 2,
      title: "Tema 2 · Introducción a los servidores web",
      oneLiner: "Un servidor web es el programa (o la máquina) que escucha las peticiones de los navegadores y les devuelve las páginas; los más usados son Apache, Nginx e IIS, y también se pueden desplegar en contenedores Docker.",
      cheatBullets: [
        "Apache (Libre): el más usado. Nginx (Libre, Nginx Plus de pago): alto rendimiento. IIS (Microsoft, solo Windows): C:\\inetpub\\wwwroot.",
        "Cliente: HTML, CSS, JS. Servidor: PHP, Python… (necesita preprocesador).",
        "LAMP = Linux + Apache + MySQL + PHP. LEMP = con Nginx.",
        "En Nginx, PHP (php-fpm) se activa a mano en el fichero del sitio.",
        "Docker: más ligero que una máquina virtual. docker run -d -p 8080:80 httpd (puerto anfitrión:contenedor)."
      ],
      theoryBlocks: [
        {
          heading: "Servidor web y código en cliente vs servidor",
          text: "Servidor web: software que escucha continuamente las peticiones de los clientes y les devuelve la página o un mensaje de error. También se llama así al equipo físico. Para guardar datos hace falta un gestor de bases de datos: MySQL (o MariaDB, PostgreSQL, SQLite).",
          table: {
            headers: ["Se ejecuta en…", "Lenguajes", "Qué necesita"],
            rows: [
              ["Cliente (navegador)", "HTML, CSS, JavaScript", "Nada, lo abre el navegador"],
              ["Servidor", "PHP, Python, Perl, Ruby", "Un preprocesador instalado en el servidor"]
            ]
          }
        },
        {
          heading: "Tipos de servidores web según la licencia",
          text: "Libres (Open Source): gratuitos (Apache y Nginx). Propietarios: necesitan licencia (Microsoft IIS y Nginx Plus).",
          table: {
            headers: ["Servidor", "Características"],
            rows: [
              ["Apache", "Open Source, multiplataforma. Desde 1995. El más usado del mundo"],
              ["Nginx", "Open Source, multiplataforma. Desde 2004. Destaca por su alto rendimiento"],
              ["IIS (Internet Information Services)", "De Microsoft, solo Windows. Desde 1995. Se instala como «característica» (Windows 10) o como «rol» (Windows Server). Carpeta raíz: C:\\inetpub\\wwwroot"]
            ]
          }
        },
        {
          heading: "Pilas de software y Docker",
          text: "LAMP: Linux + Apache + MySQL + PHP. LEMP: Linux + Nginx (se pronuncia «Engine-x») + MySQL + PHP. Un contenedor Docker aísla una aplicación con todas sus dependencias para desplegarla en minutos. Cada contenedor mapea su puerto interno a un puerto del anfitrión, que no puede estar ocupado por otro contenedor.",
          table: {
            headers: ["Contenedor (Docker)", "Máquina virtual"],
            rows: [
              ["Comparte los recursos del sistema anfitrión", "Emula un sistema operativo completo"],
              ["Más ligero y eficiente", "Más pesada"],
              ["Funciona igual en cualquier equipo (no faltan dependencias)", "Requiere configurar sistema e instalación"],
              ["Se pueden ejecutar muchos en el mismo equipo", "Consume mucha RAM y disco por cada VM"]
            ]
          }
        }
      ],
      practiceBlocks: [
        {
          heading: "Instalar IIS en Windows",
          text: "Windows 10 → Panel de control → Programas → Activar o desactivar características de Windows → IIS. En Windows Server → Administrador del servidor → Agregar roles y características → Servidor web (IIS)."
        },
        {
          heading: "Instalar LAMP (Apache + MySQL + PHP) en Ubuntu",
          code: {
            lang: "bash",
            title: "Instalación de LAMP",
            content: "sudo apt update && sudo apt upgrade              # 1. actualizar repositorios y paquetes\nsudo apt install apache2 apache2-utils           # 2. Apache\nsudo apt install mysql-server                    # 3. MySQL\nsudo mysql_secure_installation                   #    contraseña de root y seguridad\nsudo apt install php libapache2-mod-php php-mysql php-common   # 4. PHP y sus módulos\nsudo systemctl restart apache2                   # 5. reiniciar para activar PHP"
          }
        },
        {
          heading: "Instalar LEMP (Nginx + MySQL + PHP) en Ubuntu",
          text: "Diferencia clave: en Apache, PHP funciona con solo reiniciar. En Nginx hay que activarlo a mano en el fichero del sitio.",
          code: {
            lang: "bash",
            title: "Instalación de LEMP",
            content: "sudo apt install nginx nginx-common\nsudo apt install mysql-server\nsudo apt install php-fpm php-mysql               # PHP para Nginx (FastCGI Process Manager)\nsudo nano /etc/nginx/sites-available/default     # en Nginx hay que activar PHP a mano\nsudo nginx -t                                    # comprobar que la configuración es correcta\nsudo systemctl reload nginx"
          }
        },
        {
          heading: "Comprobar PHP y levantar Apache con Docker",
          text: "Crear info.php en la carpeta raíz (/var/www/html) y abrirlo en el navegador. En Docker, -p 8080:80 mapea el puerto 80 del contenedor al 8080 del anfitrión.",
          code: {
            lang: "bash",
            title: "info.php y comandos Docker básicos",
            content: "# /var/www/html/info.php\n<?php phpinfo(); ?>\n\n# Levantar Apache con Docker\ndocker run -dit --name mi-apache -p 8080:80 httpd\ndocker ps              # ver los contenedores en marcha\ndocker stop mi-apache  # pararlo"
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué es un servidor web?", a: "Un software (o equipo) que escucha las peticiones de los navegadores y les devuelve las páginas o un error." },
        { q: "¿Qué diferencia hay entre el código que se ejecuta en el cliente y el que se ejecuta en el servidor? Pon ejemplos.", a: "El del cliente lo ejecuta el navegador (HTML, CSS, JavaScript); el del servidor necesita un preprocesador en el servidor (PHP, Python)." },
        { q: "Clasifica Apache, Nginx e IIS en libres o propietarios.", a: "Libres: Apache y Nginx. Propietario: IIS (y Nginx Plus)." },
        { q: "¿Qué significan LAMP y LEMP?", a: "LAMP = Linux, Apache, MySQL y PHP. LEMP = Linux, Nginx, MySQL y PHP." },
        { q: "¿Qué diferencia hay entre Apache y Nginx a la hora de activar PHP?", a: "En Apache, PHP funciona al reiniciar; en Nginx hay que activarlo a mano en el fichero del sitio." },
        { q: "Nombra dos ventajas de Docker frente a una máquina virtual. ¿Qué significa -p 8080:80?", a: "Es más ligero y comparte los recursos del anfitrión; funciona igual en cualquier equipo. -p 8080:80 conecta el puerto 80 del contenedor con el 8080 del anfitrión." }
      ]
    },
    {
      id: 3,
      title: "Tema 3 · Administración de servidores",
      oneLiner: "Para administrar un servidor web hay que saber qué ficheros de configuración tocar (PHP, MySQL, Apache, Nginx), cómo activar HTTPS, qué módulos añadir, dónde mirar los logs y cómo medir el rendimiento.",
      cheatBullets: [
        "PHP: php.ini → upload_max_filesize, post_max_size (≥), memory_limit",
        "MySQL: /etc/mysql/ → bind-address, max_connections",
        "Nginx: /etc/nginx/nginx.conf → worker_processes, worker_connections",
        "Apache: /etc/apache2/apache2.conf",
        "Sitios: sites-available (todos) → sites-enabled (activos)",
        "Logs: /var/log/apache2 y /var/log/nginx → access.log, error.log",
        "HTTPS: puerto 443, cifra con SSL/TLS. Certificado autofirmado = «sitio no seguro».",
        "Módulos Apache: mod_ssl (HTTPS), mod_rewrite (redirecciones), mod_auth_digest.",
        "Rendimiento: ab -n 2000 -c 200 http://IP/ (n = peticiones, c = simultáneas)."
      ],
      theoryBlocks: [
        {
          heading: "HTTPS y certificados",
          text: "HTTPS es la versión segura de HTTP. Usa el puerto TCP 443 y cifra los datos con SSL/TLS, así que nadie puede leerlos aunque capture los paquetes. Inconvenientes: necesita un certificado firmado por una CA (Autoridad de Certificación), que normalmente cuesta dinero (aunque hay opciones gratuitas, como Certbot); el servidor trabaja más al cifrar, así que puede ir algo más lento. Un certificado autofirmado (como snake-oil o uno creado con OpenSSL) cifra, pero el navegador avisa de «sitio no seguro» porque no lo ha firmado una CA."
        },
        {
          heading: "Ficheros de configuración más importantes",
          text: "Regla de oro en PHP: post_max_size debe ser mayor o igual que upload_max_filesize.",
          table: {
            headers: ["Componente", "Fichero", "Parámetros clave"],
            rows: [
              ["PHP", "php.ini", "memory_limit (memoria por script), upload_max_filesize (tamaño máximo de los ficheros subidos), post_max_size (tamaño máximo de una petición POST)"],
              ["MySQL", "/etc/mysql/", "bind-address (desde dónde se puede conectar; por defecto 127.0.0.1), key_buffer_size, max_connections"],
              ["Nginx", "/etc/nginx/nginx.conf", "worker_processes (uno por núcleo de CPU), worker_connections (peticiones simultáneas por worker)"],
              ["Apache", "/etc/apache2/apache2.conf", "Opciones generales y de rendimiento"]
            ]
          }
        },
        {
          heading: "Carpetas de Apache y Nginx, y Logs",
          table: {
            headers: ["Elemento", "Para qué sirve"],
            rows: [
              ["sites-available", "Configuración de todos los sitios (activos o no)"],
              ["sites-enabled", "Sitios activados (son enlaces a los de sites-available)"],
              ["mods-available / mods-enabled (Apache)", "Módulos disponibles / activados"],
              ["ports.conf (Apache)", "Puertos en los que escucha"],
              ["/var/log/apache2", "access.log (quién ha pedido qué) y error.log (errores)"],
              ["/var/log/nginx", "access.log y error.log"]
            ]
          }
        },
        {
          heading: "Módulos y pruebas de rendimiento (Apache Benchmark)",
          table: {
            headers: ["Módulo / Parámetro", "Significado"],
            rows: [
              ["Módulos de PHP", "Conectar PHP con Apache, Nginx, MySQL, LDAP, correo…"],
              ["Módulos de Nginx", "Cinco grupos: Core, Event, HTTP, Mail y Stream. Se listan con nginx -V"],
              ["mod_ssl (Apache)", "Activar HTTPS (SSL/TLS)"],
              ["mod_auth_digest (Apache)", "Autenticación con Digest (MD5)"],
              ["mod_rewrite (Apache)", "Redirecciones de URL. Necesario para .htaccess"],
              ["ab -n", "Número total de peticiones"],
              ["ab -c", "Peticiones simultáneas (concurrencia)"],
              ["ab -k", "Usar keep-alive"],
              ["ab -g fichero.csv", "Guardar los resultados en un CSV"],
              ["ab -H", "Añadir una cabecera (por ejemplo, para imitar un navegador)"]
            ]
          }
        }
      ],
      practiceBlocks: [
        {
          heading: "Subir límites en php.ini",
          text: "Problema típico: «no me deja subir ficheros grandes». Solución: en php.ini, subir los límites y reiniciar Apache.",
          code: {
            lang: "ini",
            title: "php.ini",
            content: "upload_max_filesize = 64M\npost_max_size = 64M        ; mayor o igual que upload_max_filesize\nmemory_limit = 256M"
          }
        },
        {
          heading: "Activar HTTPS en Apache y sitios en Nginx",
          code: {
            lang: "bash",
            title: "HTTPS en Apache y activar sitio Nginx",
            content: "# Activar HTTPS en Apache:\nsudo a2enmod ssl                      # activar el módulo SSL\nsudo a2ensite default-ssl.conf        # activar el sitio HTTPS que trae Apache\nsudo systemctl restart apache2\n\n# En el Virtual Host del sitio:\n# SSLEngine on\n# SSLCertificateFile    /ruta/certificado/certificado.pem\n# SSLCertificateKeyFile /ruta/certificado/certificado.key\n\n# Activar un sitio en Nginx (enlace en sites-enabled):\nsudo ln -s /etc/nginx/sites-available/misitio /etc/nginx/sites-enabled/\nsudo nginx -t                         # comprobar la configuración\nsudo systemctl restart nginx"
          }
        },
        {
          heading: "Ver logs en directo y prueba de carga con ab",
          text: "Datos a mirar en ab: Requests per second (cuantas más, mejor), Time per request (cuanto menos, mejor) y Failed requests (deberían ser 0).",
          code: {
            lang: "bash",
            title: "Logs y Apache Benchmark",
            content: "sudo tail -f /var/log/apache2/error.log\n\nsudo apt install apache2-utils\nab -k -n 2000 -c 200 -g ab.csv http://IP_DEL_SERVIDOR/"
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué puerto usa HTTPS? ¿Qué ventaja tiene y qué inconvenientes?", a: "El 443. Ventaja: cifra los datos. Inconvenientes: necesita un certificado (que suele costar dinero) y puede ir algo más lento." },
        { q: "¿Por qué el navegador dice «sitio no seguro» con un certificado autofirmado?", a: "Porque no lo ha firmado una Autoridad de Certificación, así que no se puede comprobar la identidad del servidor." },
        { q: "Un usuario no puede subir un fichero de 50 MB pero sí uno de 2 MB. ¿Qué parámetros revisarías y en qué fichero?", a: "upload_max_filesize y post_max_size, en php.ini." },
        { q: "¿Qué diferencia hay entre sites-available y sites-enabled?", a: "sites-available tiene todos los sitios configurados; sites-enabled solo los activados." },
        { q: "¿Dónde están los logs de Apache y qué guarda cada uno?", a: "En /var/log/apache2: access.log guarda los accesos y error.log los errores." },
        { q: "¿Para qué sirve mod_rewrite? ¿Y Apache Benchmark?", a: "mod_rewrite sirve para hacer redirecciones de URL. Apache Benchmark mide el rendimiento de un servidor web." }
      ]
    },
    {
      id: 4,
      title: "Tema 4 · Hosts virtuales",
      oneLiner: "Con los hosts virtuales un solo servidor puede alojar varias webs distintas (multisiting), cada una con su nombre de dominio y su carpeta.",
      cheatBullets: [
        "Varias webs en un mismo servidor (multisiting). Por IP o por nombre (lo normal).",
        "<VirtualHost *:80> con ServerName www.web1.local y DocumentRoot /var/www/web1.",
        "Apache: sudo a2ensite web1.conf && sudo systemctl restart apache2",
        "Nginx (Server Block): sudo ln -s /etc/nginx/sites-available/web1 /etc/nginx/sites-enabled/",
        "En pruebas locales: añadir IP nombre al fichero hosts.",
        "Redirección 301 = permanente (pasa el SEO). 302 = temporal.",
        "Forzar HTTPS en Apache: a2enmod rewrite + RewriteEngine On / RewriteCond / RewriteRule."
      ],
      theoryBlocks: [
        {
          heading: "Host virtual, Hosting y FQDN",
          text: "Host virtual (Virtual Host): técnica para simular varias máquinas en un mismo servidor y alojar varios sitios web en él (multisiting). Ahorra costes, ya sea en un VPS (Servidor Virtual Privado en la nube) o en un servidor físico. Hosting: negocio que consiste en alojar las webs de muchos clientes en un mismo servidor (paneles: ISPConfig código abierto, cPanel de pago). FQDN (Fully Qualified Domain Name): nombre de dominio completo y único (ej.: www.ejemplo1.local). Para que funcione por nombre en internet, el registro A del DNS del dominio debe apuntar a la IP del servidor. En pruebas locales se usa el fichero hosts del equipo.",
          table: {
            headers: ["Tipo", "Cómo funciona"],
            rows: [
              ["Basado en IP", "El servidor tiene varias IP, una para cada web"],
              ["Basado en nombre", "El servidor tiene una sola IP y distingue las webs por su nombre DNS (el más habitual)"]
            ]
          }
        },
        {
          heading: "Directivas en Apache y Nginx, y Redirecciones",
          table: {
            headers: ["Concepto", "Detalle"],
            rows: [
              ["Apache vs Nginx", "Virtual Host (a2ensite) vs Server Block / Virtual Block (enlace simbólico en sites-enabled)"],
              ["<VirtualHost *:80>", "Escucha en el puerto 80"],
              ["ServerName", "Nombre del dominio"],
              ["DocumentRoot", "Carpeta donde están los ficheros de esa web"],
              ["Redirección 301 (permanente)", "Cambio definitivo (ej. de dominio). Se traspasa la reputación SEO al nuevo dominio"],
              ["Redirección 302 (temporal)", "Mantenimiento. No se traspasa el SEO"]
            ]
          }
        }
      ],
      practiceBlocks: [
        {
          heading: "Alojar dos webs en Apache (Ubuntu)",
          text: "Caso típico: «al abrir mi web aparece la página por defecto de Apache». Solución: el DocumentRoot del Virtual Host está mal; corrígelo y reinicia Apache.",
          code: {
            lang: "bash",
            title: "Virtual Hosts en Apache y fichero hosts",
            content: "# 1. Crear carpetas y dar permisos a www-data\nsudo mkdir -p /var/www/web1 /var/www/web2\nsudo chown -R www-data:www-data /var/www/web1 /var/www/web2\necho \"<h1>Web 1</h1>\" | sudo tee /var/www/web1/index.html\necho \"<h1>Web 2</h1>\" | sudo tee /var/www/web2/index.html\n\n# 2. /etc/apache2/sites-available/web1.conf\n<VirtualHost *:80>\n    ServerName www.web1.local\n    DocumentRoot /var/www/web1\n</VirtualHost>\n\n# 3. Activar sitio y reiniciar\nsudo a2ensite web1.conf\nsudo systemctl restart apache2\n\n# 4. En el equipo cliente (/etc/hosts)\n192.168.1.10   www.web1.local\n192.168.1.10   www.web2.local"
          }
        },
        {
          heading: "Server Block en Nginx y Redirecciones",
          code: {
            lang: "nginx",
            title: "Nginx Server Block y Rewrite / Apache HTTPS",
            content: "# Nginx Server Block (¡sin default_server, o dará error de duplicado!)\nserver {\n    listen 80;\n    server_name www.web1.local;\n    root /var/www/web1;\n    index index.html;\n}\n\n# Activar en Nginx:\n# sudo ln -s /etc/nginx/sites-available/web1 /etc/nginx/sites-enabled/\n# sudo nginx -t && sudo systemctl restart nginx\n\n# Redirigir en Nginx (permanente, 301):\n# server_name www.nginx1.com;\n# rewrite ^/(.*)$ http://www.nginx2.com/$1 permanent;\n\n# Forzar HTTPS en Apache (sudo a2enmod rewrite, dentro de VirtualHost *:80):\nRewriteEngine On\nRewriteCond %{HTTPS} !=on\nRewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R,L]"
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué es un host virtual y para qué sirve?", a: "Una técnica para alojar varios sitios web en un mismo servidor (multisiting)." },
        { q: "¿Qué diferencia hay entre un host virtual basado en IP y uno basado en nombre?", a: "El basado en IP usa una IP por web; el basado en nombre usa una sola IP y distingue las webs por su nombre DNS." },
        { q: "¿Qué indican ServerName y DocumentRoot?", a: "ServerName es el nombre del dominio y DocumentRoot la carpeta donde están los ficheros de la web." },
        { q: "¿Cómo se activa un sitio en Apache? ¿Y en Nginx?", a: "En Apache con a2ensite; en Nginx con un enlace simbólico en sites-enabled. En los dos casos, reiniciando después." },
        { q: "¿Qué diferencia hay entre una redirección 301 y una 302?", a: "La 301 es permanente y traspasa el SEO; la 302 es temporal y no lo traspasa." },
        { q: "¿Qué módulo de Apache necesitas para forzar HTTPS?", a: "mod_rewrite." }
      ]
    },
    {
      id: 5,
      title: "Tema 5 · Autenticación y control de acceso",
      oneLiner: "Para proteger un servidor web usamos certificados SSL (para cifrar y demostrar quiénes somos), limitamos el acceso a carpetas, pedimos usuario y contraseña (Basic o Digest) y bloqueamos ataques con un cortafuegos (UFW) y con Fail2Ban.",
      cheatBullets: [
        "Certificado SSL: demuestra la identidad y cifra. Lo firma una CA.",
        "Let's Encrypt: CA gratuita, certificados de 3 meses. Certbot los instala y renueva: sudo certbot --apache.",
        "Bloquear carpetas: .htaccess (Deny from all, error 403) o, mejor, <Directory> en el Virtual Host. Requiere AllowOverride All.",
        "Autenticación: Basic (htpasswd, texto plano) vs Digest (htdigest, cifrada, más segura).",
        "UFW: ufw enable / ufw status numbered / ufw allow 443 / ufw deny 21 / ufw allow from IP to any port 22.",
        "Fail2Ban: bloquea IP con muchos intentos fallidos. Configurar en jail.local, no en jail.conf."
      ],
      theoryBlocks: [
        {
          heading: "Certificados SSL, CA y Let's Encrypt",
          text: "Certificado SSL: acredita la identidad del servidor (verifica nombre DNS e IP) y cifra los datos. Los buscadores penalizan en SEO las webs sin certificado firmado. CA (Autoridad de Certificación): organización que verifica y emite certificados (Comodo, GeoTrust, Symantec). Let's Encrypt: CA gratuita, automatizada y abierta; sus certificados duran 3 meses. Certbot instala los certificados, configura el Virtual Host y los renueva automáticamente vía crontab.",
          table: {
            headers: ["Tipo de certificado", "¿El navegador lo acepta?"],
            rows: [
              ["Autofirmado (creado por nosotros)", "No: cifra, pero aparece «sitio no seguro»"],
              ["De una CA propia (creada con OpenSSL)", "Solo en los equipos donde instalemos el certificado de nuestra CA"],
              ["De una CA oficial", "Sí"]
            ]
          }
        },
        {
          heading: "Control de acceso a carpetas y autenticación",
          text: "Para que Apache lea .htaccess hay que tener AllowOverride All en la configuración.",
          table: {
            headers: ["Mecanismo", "Características / Seguridad"],
            rows: [
              ["Fichero .htaccess", "Deny from all o Deny from IP. Da error 403. Apache no lo recomienda porque baja el rendimiento"],
              ["Virtual Host (<Directory>)", "Forma recomendada para limitar acceso a carpetas"],
              ["Basic (mod_auth_basic)", "Contraseña viaja en texto plano. Baja seguridad (usar solo con HTTPS)"],
              ["Digest (mod_auth_digest)", "Contraseña viaja cifrada. Más segura"]
            ]
          }
        },
        {
          heading: "UFW y Fail2Ban",
          table: {
            headers: ["Herramienta", "Qué hace"],
            rows: [
              ["UFW (Uncomplicated Firewall)", "Cortafuegos sencillo de Linux (interfaz de iptables). Permite o bloquea puertos e IP"],
              ["Fail2Ban", "Protege contra fuerza bruta: lee logs y bloquea IP que fallan muchos logins. Escrito en Python. Protege puertos 22 (SSH), 80 y 443. Configurar en /etc/fail2ban/jail.local (no en jail.conf)"]
            ]
          }
        }
      ],
      practiceBlocks: [
        {
          heading: "Certbot y bloqueo de carpetas",
          code: {
            lang: "bash",
            title: "Certbot y bloqueo de carpetas",
            content: "# Certificado gratuito con Certbot (Let's Encrypt)\nsudo apt install certbot python3-certbot-apache\nsudo certbot --apache          # pide el certificado y configura el Virtual Host solo\nsudo certbot renew --dry-run   # probar la renovación automática\n\n# Bloquear una carpeta con .htaccess (/var/www/html/privado/.htaccess)\nDeny from all\n\n# Bloquear una carpeta desde el Virtual Host (forma recomendada)\n<Directory /var/www/html/privado>\n    Require ip 127.0.0.1        # solo se puede acceder desde el propio servidor\n</Directory>"
          }
        },
        {
          heading: "Autenticación Basic y Digest en Apache",
          code: {
            lang: "bash",
            title: "Basic (htpasswd) y Digest (htdigest)",
            content: "# Autenticación Basic:\nsudo htpasswd -c /etc/apache2/basicAuth.txt usuario1\n# En <Directory /var/www/html/privado>:\n# AuthType Basic\n# AuthName \"Zona privada\"\n# AuthUserFile /etc/apache2/basicAuth.txt\n# Require valid-user\n\n# Autenticación Digest:\nsudo a2enmod auth_digest\nsudo htdigest -c /etc/apache2/digest.txt \"Zona privada\" usuario1\nsudo chown www-data:www-data /etc/apache2/digest.txt\n# En <Directory /var/www/html/privado>:\n# AuthType Digest\n# AuthName \"Zona privada\"\n# AuthUserFile /etc/apache2/digest.txt\n# Require valid-user"
          }
        },
        {
          heading: "Comandos UFW y Fail2Ban",
          table: {
            headers: ["Comando UFW", "Qué hace"],
            rows: [
              ["sudo ufw enable / disable", "Activa / desactiva el cortafuegos"],
              ["sudo ufw status numbered", "Muestra el estado y las reglas numeradas"],
              ["sudo ufw allow 80", "Permite el tráfico al puerto 80"],
              ["sudo ufw deny 21", "Bloquea el puerto 21"],
              ["sudo ufw delete 1", "Borra la regla número 1"],
              ["sudo ufw reload", "Recarga para aplicar cambios"]
            ]
          },
          code: {
            lang: "bash",
            title: "Reglas avanzadas UFW y Fail2Ban",
            content: "# Permitir SSH solo desde una IP concreta\nsudo ufw allow from 12.23.34.5 to any port 22 comment 'SSH solo desde la oficina'\n# Bloquear el tráfico de salida hacia una IP\nsudo ufw deny out to 1.1.1.1\n\n# Fail2Ban\nsudo apt install fail2ban\nsudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local   # trabajar siempre sobre jail.local"
          }
        }
      ],
      checkYourself: [
        { q: "¿Para qué sirve un certificado SSL? ¿Qué es una CA?", a: "Acredita la identidad del servidor y cifra la comunicación. Una CA es la organización que verifica la identidad y emite los certificados." },
        { q: "¿Por qué un certificado autofirmado da el aviso de «sitio no seguro»?", a: "Porque no lo ha firmado una CA oficial y el navegador no puede comprobar la identidad del servidor." },
        { q: "¿Cuánto dura un certificado de Let's Encrypt? ¿Qué herramienta lo renueva solo?", a: "Tres meses. Certbot." },
        { q: "¿Qué diferencia hay entre la autenticación Basic y la Digest?", a: "En Basic la contraseña viaja en texto plano; en Digest viaja cifrada, así que es más segura." },
        { q: "¿Por qué Apache recomienda limitar el acceso con el Virtual Host y no con .htaccess?", a: "Porque los .htaccess bajan el rendimiento del servidor." },
        { q: "¿Qué diferencia hay entre UFW y Fail2Ban? Escribe el comando para permitir el puerto 443.", a: "UFW es un cortafuegos que permite o bloquea puertos e IP; Fail2Ban bloquea las IP que hacen ataques de fuerza bruta. sudo ufw allow 443." }
      ]
    },
    {
      id: 6,
      title: "Tema 6 · Introducción a los servidores de aplicación",
      oneLiner: "Un servidor de aplicaciones (como Tomcat o Node.js) ejecuta aplicaciones escritas en Java o JavaScript en el servidor; las aplicaciones Java se empaquetan en un fichero WAR para desplegarlas.",
      cheatBullets: [
        "Servidor web = contenido estático. Servidor de aplicaciones = ejecuta código (middleware).",
        "Tomcat (Java, puerto 8080, necesita JRE): contenedor de Servlets y JSP. Node.js: JavaScript, motor V8, asíncrono.",
        "WAR = todo para desplegar una app web Java (un JAR solo lleva clases).",
        "WAR: / (HTML, CSS, JSP), /WEB-INF/web.xml (descriptor), /WEB-INF/classes, /WEB-INF/lib, /META-INF.",
        "Node.js usa package.json en lugar de web.xml. Se lanza con node app.js."
      ],
      theoryBlocks: [
        {
          heading: "Servidor web frente a servidor de aplicaciones",
          text: "Servidor de aplicaciones: software intermedio (middleware) que ejecuta el código de una aplicación en el servidor (Java, JavaScript…), se comunica con la base de datos y entrega el resultado al navegador. A menudo trabajan juntos: el servidor web recibe la petición y la pasa al de aplicaciones (hace de proxy).",
          table: {
            headers: ["Servidor web", "Servidor de aplicaciones"],
            rows: [
              ["Sirve contenido estático (HTML, CSS) que se ejecuta en el cliente", "Ejecuta código en el servidor"],
              ["Para contenido dinámico (PHP) necesita software extra", "Lleva incluido todo lo necesario"],
              ["Organiza las webs con Virtual Hosts", "Organiza las aplicaciones en contenedores, cada una en un puerto"]
            ]
          }
        },
        {
          heading: "Servidores de aplicaciones más conocidos y modos de Tomcat",
          text: "Apache Tomcat: servidor de aplicaciones Open Source (1999). Es servidor web y contenedor de Servlets y JSP. Multiplataforma (Java, necesita JRE). Puerto por defecto: 8080.",
          table: {
            headers: ["Lenguaje / Modo", "Servidor / Funcionamiento", "Licencia / Detalle"],
            rows: [
              ["Java", "Apache Tomcat", "Libre (Apache v2)"],
              ["Java", "WildFly (Red Hat)", "Libre (LGPL)"],
              ["Java", "WebLogic (Oracle)", "Propietaria"],
              ["Java", "WebSphere (IBM)", "Propietaria"],
              ["JavaScript", "Node.js / Wakanda", "Libre (MIT) / Community & Enterprise"],
              ["Tomcat Independiente", "Hace de servidor de aplicaciones y de servidor web", "Atiende directamente en el 8080"],
              ["Tomcat junto a servidor web", "Solo ejecuta Servlets/JSP", "El servidor web le pasa peticiones y responde al cliente"]
            ]
          }
        },
        {
          heading: "Fichero WAR, web.xml, Node.js y Docker",
          text: "Fichero WAR (Web Application Archive): un solo fichero con todo lo necesario para desplegar una app web Java (un JAR solo guarda clases compiladas). Descriptor web.xml: describe servlets y rutas sin tocar el código (IDE: NetBeans o Eclipse Java EE). Node.js usa motor V8 de Google, modelo de E/S asíncrono (non-blocking) dirigido por eventos y package.json. Desplegar con Docker aporta escalabilidad, independencia de SO/librerías y mantenimiento fácil.",
          table: {
            headers: ["Carpeta del WAR", "Contiene"],
            rows: [
              ["/ (raíz)", "HTML, CSS, imágenes y páginas JSP"],
              ["/WEB-INF", "El descriptor de despliegue (web.xml)"],
              ["/WEB-INF/classes", "Las clases y los Servlets"],
              ["/WEB-INF/lib", "Las librerías (por ejemplo, para la base de datos)"],
              ["/META-INF", "El manifiesto (MANIFEST.MF)"]
            ]
          }
        }
      ],
      practiceBlocks: [
        {
          heading: "Instalar Tomcat y ejemplo de web.xml",
          code: {
            lang: "xml",
            title: "Tomcat en Ubuntu + WEB-INF/web.xml",
            content: "<!-- Instalar Tomcat en Ubuntu:\nsudo apt install default-jre\nsudo apt install tomcat9 tomcat9-admin\nsudo systemctl status tomcat9\nNavegador: http://IP_DEL_SERVIDOR:8080 -->\n\n<web-app version=\"2.4\">\n    <display-name>Hola Mundo</display-name>\n    <servlet>\n        <servlet-name>HelloServlet</servlet-name>\n        <servlet-class>mypackage.Hello</servlet-class>\n    </servlet>\n    <servlet-mapping>\n        <servlet-name>HelloServlet</servlet-name>\n        <url-pattern>/hello</url-pattern>\n    </servlet-mapping>\n</web-app>"
          }
        },
        {
          heading: "Instalar Node.js y Hola Mundo",
          text: "Elección rápida: Java (Servlets, JSP) → Apache Tomcat; JavaScript → Node.js.",
          code: {
            lang: "javascript",
            title: "Node.js app.js",
            content: "// Instalar Node.js:\n// curl -sL https://deb.nodesource.com/setup_lts.x | sudo -E bash -\n// sudo apt install -y nodejs\n\nconst http = require('http');\nconst hostname = '127.0.0.1';\nconst port = 3000;\n\nconst server = http.createServer((req, res) => {\n    res.statusCode = 200;\n    res.setHeader('Content-Type', 'text/plain');\n    res.end('Hola Mundo');\n});\n\nserver.listen(port, hostname, () => {\n    console.log(`Servidor en http://${hostname}:${port}/`);\n});\n// Ejecutar con: node app.js"
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué diferencia hay entre un servidor web y un servidor de aplicaciones?", a: "El servidor web sirve contenido estático; el de aplicaciones ejecuta código en el servidor." },
        { q: "¿Qué es Apache Tomcat? ¿Qué necesita para funcionar y qué puerto usa?", a: "Un servidor de aplicaciones Java Open Source y contenedor de Servlets y JSP. Necesita el JRE y usa el puerto 8080." },
        { q: "Explica los dos modos de funcionamiento de Tomcat.", a: "Independiente: hace de servidor web y de aplicaciones. Junto a un servidor web: solo ejecuta los Servlets/JSP y el servidor web atiende al cliente." },
        { q: "¿Qué es un fichero WAR? ¿En qué se diferencia de un JAR?", a: "Un fichero con todo lo necesario para desplegar una aplicación web Java. El JAR solo guarda clases compiladas." },
        { q: "¿Qué es el descriptor de despliegue y en qué carpeta está?", a: "El fichero web.xml, que describe cómo desplegar la aplicación. Está en WEB-INF." },
        { q: "¿Qué significa que Node.js sea asíncrono? ¿Qué fichero usa en lugar de web.xml?", a: "Que no espera a que termine una operación para seguir con la siguiente. Usa package.json." }
      ]
    },
    {
      id: 7,
      title: "Tema 7 · Administración de servidores de aplicaciones",
      oneLiner: "Administrar Tomcat y Node.js es saber dónde están sus ficheros de configuración y sus logs, cómo cambiar el puerto y cómo activar HTTPS.",
      cheatBullets: [
        "Tomcat (conf): server.xml (conectores: puerto, HTTPS), tomcat-users.xml (usuarios manager-gui), web.xml (parámetros generales).",
        "catalina.sh = arrancar, parar, ver versión.",
        "Logs: catalina.out (errores) y localhost_access_log (accesos).",
        "HTTPS en Tomcat: certificado en un keystore (keytool) + conector puerto 443 en server.xml.",
        "Node.js: todo se configura en app.js. HTTPS con el módulo https. ¿Puerto ocupado? Cambia .listen(PUERTO).",
        "MongoDB: base de datos no relacional, muy usada con Node."
      ],
      theoryBlocks: [
        {
          heading: "Carpetas, ficheros y logs de Apache Tomcat (/usr/share/tomcat9/)",
          text: "Si hay un servidor web delante del de aplicaciones, es arquitectura de tres capas; si no, cliente-servidor. catalina.sh es el script para iniciar, parar, comprobar configuración o ver la versión. Para HTTPS en Tomcat, el certificado se guarda en un keystore (creado con keytool) y se activa un conector en el puerto 443.",
          table: {
            headers: ["Elemento", "Para qué sirve"],
            rows: [
              ["conf", "Ficheros de configuración (web.xml, tomcat-users.xml, server.xml)"],
              ["bin", "Scripts para arrancar y parar (como catalina.sh, startup, shutdown)"],
              ["logs", "Registros"],
              ["webapps", "Las aplicaciones desplegadas"],
              ["lib", "Librerías"],
              ["conf/web.xml", "Parámetros generales del servidor"],
              ["conf/tomcat-users.xml", "Usuarios que pueden entrar a la administración de Tomcat"],
              ["conf/server.xml", "Conectores: cada uno define un puerto de escucha (cambiar puerto o activar HTTPS)"],
              ["catalina.out", "Fichero principal de log: errores y eventos del servidor"],
              ["catalina.*.log", "Un fichero diario con eventos"],
              ["localhost_access_log.*.txt", "Accesos: IP del cliente, fecha, petición y código de respuesta (200, 404...)"]
            ]
          }
        },
        {
          heading: "Configuración en Node.js",
          text: "No necesita ficheros de configuración en el servidor: todo se define en el app.js de cada proyecto (puerto, protocolo…). Cada módulo tiene su package.json y las librerías están en /usr/lib/node_modules. MongoDB es una base de datos no relacional muy usada con Node.js por su rapidez. Para HTTPS se usa el módulo https de Node con los certificados en la ruta de la app."
        }
      ],
      practiceBlocks: [
        {
          heading: "Administrar Tomcat (catalina.sh, tomcat-users.xml, server.xml y HTTPS)",
          code: {
            lang: "xml",
            title: "Comandos, tomcat-users.xml y server.xml",
            content: "<!-- Comandos:\nsudo /usr/share/tomcat9/bin/catalina.sh version\nsudo systemctl restart tomcat9\nsudo tail -f /var/log/tomcat9/catalina.out -->\n\n<!-- conf/tomcat-users.xml -->\n<tomcat-users>\n    <role rolename=\"manager-gui\"/>\n    <user username=\"admin\" password=\"1234\" roles=\"manager-gui\"/>\n</tomcat-users>\n\n<!-- Cambiar puerto en conf/server.xml -->\n<Connector port=\"8081\" protocol=\"HTTP/1.1\" connectionTimeout=\"20000\"/>\n\n<!-- Activar HTTPS tras crear keystore con:\nkeytool -genkey -alias tomcat -keyalg RSA -keystore /root/.tomcatKeystore -->\n<Connector protocol=\"org.apache.coyote.http11.Http11NioProtocol\"\n           port=\"443\" maxThreads=\"200\" scheme=\"https\" secure=\"true\"\n           SSLEnabled=\"true\" keystoreFile=\"/root/.tomcatKeystore\"\n           keystorePass=\"usuario\" clientAuth=\"false\" sslProtocol=\"TLS\"/>"
          }
        },
        {
          heading: "HTTPS en Node.js",
          text: "Caso típico: «Node.js no arranca porque el puerto ya está en uso». Solución: cambiar el puerto en .listen(PUERTO) del app.js (o usar otro servidor).",
          code: {
            lang: "javascript",
            title: "OpenSSL + Node.js HTTPS",
            content: "// 1. Crear certificado autofirmado:\n// openssl genrsa -out key.pem\n// openssl req -new -key key.pem -out csr.pem\n// openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem\n\n// 2. app.js\nconst https = require('https');\nconst fs = require('fs');\nconst options = {\n    key: fs.readFileSync('./key.pem'),\n    cert: fs.readFileSync('./cert.pem')\n};\nhttps.createServer(options, (req, res) => {\n    res.writeHead(200);\n    res.end(\"hola mundo\\n\");\n}).listen(443);"
          }
        }
      ],
      checkYourself: [
        { q: "¿Para qué sirven tomcat-users.xml y server.xml?", a: "tomcat-users.xml define los usuarios de la administración; server.xml define los conectores y sus puertos." },
        { q: "¿Qué es catalina.sh?", a: "El script que inicia, para, comprueba y muestra la versión de Tomcat." },
        { q: "¿Qué fichero de log mirarías para ver los errores de Tomcat? ¿Y para ver las IP que han accedido?", a: "catalina.out para los errores; localhost_access_log.*.txt para los accesos." },
        { q: "¿Qué es un keystore y con qué comando se crea?", a: "Un almacén donde se guardan los certificados. Se crea con keytool." },
        { q: "¿Dónde se configura una aplicación Node.js? ¿Qué es MongoDB?", a: "En el app.js de cada proyecto. MongoDB es una base de datos no relacional." },
        { q: "Node.js no arranca porque el puerto 3000 está ocupado. ¿Qué haces?", a: "Cambiar el puerto en .listen() del app.js." }
      ]
    },
    {
      id: 8,
      title: "Tema 8 · Gestión de despliegues",
      oneLiner: "Para desplegar bien aplicaciones hay que gestionar usuarios (LDAP), mantener las sesiones (cookies, sesiones persistentes), registrar lo que pasa (válvulas), poner un servidor web delante como proxy y automatizar con Jenkins y Forever.",
      cheatBullets: [
        "LDAP (puerto 389): un usuario y contraseña para todos los servicios. En Tomcat: Realm.",
        "HTTP no tiene estado → se usan sesiones (cookies, JSESSIONID).",
        "Sesiones persistentes (Tomcat, server.xml): si se reinicia, el usuario sigue donde estaba.",
        "Válvulas (Tomcat): filtran peticiones y crean registros.",
        "Proxy: Apache recibe y reenvía a Tomcat → a2enmod proxy proxy_http + ProxyPass / http://IP:8080/.",
        "Desplegar WAR: jar cvf app.war ... → gestor de Tomcat → Desplegar.",
        "Jenkins: automatiza integración y despliegue (DevOps). Forever.js: mantiene Node siempre en marcha (forever start app.js)."
      ],
      theoryBlocks: [
        {
          heading: "LDAP, Sesiones y Válvulas en Tomcat",
          bullets: [
            "LDAP (puerto 389): autenticación centralizada con un solo usuario y contraseña para varios servicios. En Tomcat se conecta con JNDIRealm; en Node.js con el paquete ldap-authentication.",
            "Sesiones: HTTP es sin estado; se usan cookies (en Tomcat, JSESSIONID).",
            "Sesiones persistentes (Tomcat): guardan en disco las sesiones activas en server.xml con PersistentManager. Así, si el servidor se reinicia, el usuario no pierde su carrito.",
            "Válvulas (valves) de Tomcat: filtros propios de Tomcat en server.xml o context.xml que rastrean peticiones y crean registros (registro de accesos, control de accesos, autenticación, estado, errores y proxies)."
          ]
        },
        {
          heading: "Proxy inverso, WAR, DevOps, Jenkins y Forever.js",
          bullets: [
            "Servidor web como proxy: Apache recibe peticiones por FQDN y reenvía a Tomcat/Node.js (módulos proxy y proxy_http). Ventajas: acceder a varios servidores con una sola IP, más seguridad y autenticación centralizada.",
            "Desplegar un WAR en Tomcat: desde el gestor web (Manager), subir .war y pulsar Desplegar (creado con IDE o comando jar).",
            "DevOps: unir desarrollo y operaciones. Jenkins: servidor de automatización en Java (puerto por defecto 8080) para integración continua y despliegue de WAR.",
            "Forever.js: paquete de npm que mantiene un script de Node.js siempre en marcha y lo relanza si cae o se reinicia."
          ]
        }
      ],
      practiceBlocks: [
        {
          heading: "Sesiones persistentes, Válvulas y LDAP en Tomcat (server.xml)",
          text: "Caso típico: «cada vez que el servidor se reinicia, los usuarios pierden lo que tenían en el carrito». Solución: activar sesiones persistentes en Tomcat.",
          code: {
            lang: "xml",
            title: "PersistentManager, AccessLogValve y JNDIRealm",
            content: "<!-- Sesiones persistentes -->\n<Manager className=\"org.apache.catalina.session.PersistentManager\"\n         saveOnRestart=\"true\">\n    <Store className=\"org.apache.catalina.session.FileStore\"/>\n</Manager>\n\n<!-- Válvula de registro de accesos -->\n<Valve className=\"org.apache.catalina.valves.AccessLogValve\"\n       directory=\"logs\" prefix=\"localhost_access_log\" suffix=\".txt\"\n       pattern=\"%h %l %u %t &quot;%r&quot; %s %b\"/>\n\n<!-- Conector LDAP -->\n<Realm className=\"org.apache.catalina.realm.JNDIRealm\"\n       connectionURL=\"ldap://servidor.ldap:389/\" userPattern=\"{0}\"/>"
          }
        },
        {
          heading: "Apache como proxy inverso de Tomcat",
          code: {
            lang: "apache",
            title: "mod_proxy + VirtualHost",
            content: "# Activar módulos:\n# sudo a2enmod proxy proxy_http\n# sudo systemctl restart apache2\n\n<VirtualHost *:80>\n    ServerName websrv.local\n    DocumentRoot /var/www/html\n</VirtualHost>\n\n<VirtualHost *:80>\n    ServerName appsrv.local\n    ProxyRequests Off\n    ProxyPreserveHost On\n    ProxyPass        / http://172.19.0.9:8080/\n    ProxyPassReverse / http://172.19.0.9:8080/\n</VirtualHost>"
          }
        },
        {
          heading: "Empaquetar WAR, Jenkins y Forever.js",
          code: {
            lang: "bash",
            title: "WAR, Jenkins y Forever",
            content: "# Crear el WAR desde la terminal (después subir en /manager)\njar cvf app.war index.jsp WEB-INF\n\n# Jenkins en otro puerto\njava -jar jenkins.war --httpPort=9090\n\n# Forever.js\nsudo npm install forever -g\nforever start app.js        # lanzarlo y mantenerlo siempre en marcha\nforever list                # ver los procesos\nforever stop app.js         # pararlo"
          }
        }
      ],
      checkYourself: [
        { q: "¿Qué es LDAP y qué ventaja tiene?", a: "Un protocolo de autenticación centralizada: con un solo usuario y contraseña se accede a varios servicios." },
        { q: "¿Por qué se dice que HTTP es un protocolo sin estado? ¿Cómo se soluciona?", a: "Porque no recuerda las acciones anteriores del usuario. Se soluciona con sesiones (cookies)." },
        { q: "¿Para qué sirven las sesiones persistentes? ¿En qué fichero se configuran?", a: "Para que, si el servidor se reinicia, el usuario siga donde lo dejó. Se configuran en server.xml." },
        { q: "¿Qué es una válvula de Tomcat?", a: "Un filtro que rastrea las peticiones y genera registros personalizados." },
        { q: "Nombra dos ventajas de poner un servidor web como proxy delante del servidor de aplicaciones. ¿Qué módulos de Apache hacen falta?", a: "Acceder a varios servidores con una sola IP, más seguridad y autenticación centralizada. Los módulos proxy y proxy_http." },
        { q: "¿Para qué sirven Jenkins y Forever.js?", a: "Jenkins automatiza la integración y el despliegue; Forever.js mantiene siempre en marcha un script de Node.js." }
      ]
    }
  ]
};
