
# CapturaWeb

CapturaWeb es una herramienta para capturar párrafos de páginas web y sus subpáginas utilizando Node y la libreria Puppeteer que controla el navegador.

## Instalación

Para utilizar CapturaWeb, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/andresgarcia0313/CapturaParrafosWeb.git
   ```

2. Instala las dependencias del proyecto utilizando npm:
   ```bash
   npm install
   ```

3. Ejecuta el script principal para capturar los párrafos:
   ```bash
   npm start
   ```

## Uso

Después de instalar y ejecutar CapturaWeb, puedes proporcionar la URL de la página principal que deseas capturar y el script se encargará de extraer los párrafos de esa página y de todas sus subpáginas.

## Ejemplos

```javascript
// Ejemplo de uso del script para capturar párrafos de www.yourweb.com
const puppeteer = require('puppeteer');
const { captureSubpagesParagraphs } = require('./capturaWeb');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = "www.yourweb.com";
  const baseUrl = 'https://' + url;
  const domain = new URL(baseUrl).hostname;
  const allParagraphs = await captureSubpagesParagraphs(page, baseUrl, domain);

  fs.writeFileSync('parrafos.txt' + url, allParagraphs.join('\n\n'));

  await browser.close();
})();
```

## Contribución

¡Las contribuciones son bienvenidas! Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tus cambios: `git checkout -b mi-cambio`.
3. Realiza tus cambios y haz commit: `git commit -am 'Añade mi cambio'`.
4. Empuja tus cambios a la rama: `git push origin mi-cambio`.
5. Envía una solicitud de extracción.

## Documentación adicional

Para obtener más información sobre el proyecto y su funcionamiento, consulta e interpreta cada linea del código.

## Estado del proyecto

Este proyecto se encuentra en desarrollo activo y en su primera versión y se está trabajando continuamente para mejorar y agregar nuevas características que tu solicites en issues de github

## Licencia

Este proyecto está bajo la licencia GNU. Para más detalles, consulta la licencia GNU.

## Contacto

Para preguntas o comentarios sobre el proyecto, puedes ponerte en contacto con el equipo de desarrollo en [correo electrónico andresgarcia0313@gmail.com](mailto:andresgarcia0313@gmail.com).
