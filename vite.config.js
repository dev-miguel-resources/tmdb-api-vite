import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { // me permite cambiar el puerto del local para desarrollo
    port: 3030 
  },
  preview: { // me permite cambiar el puerto del servidor de prueba pre-productivo
    port: 4270
  },
  build: { // optimizaciones del build para que el código final sea generado de mejor manera
    incremental: true, // acelerar la generación del build
    babel: { // me permite ayudar a babel al reconocimiento del entorno en el cual vas a manipular las versiones del js (opcional)
      presets: ["@babel/preset-env", "@babel/preset-react"],
    },
    // Configuración opcional para TS
    /*typescript: {
      tsconfig: "./tsconfig.json"
    }*/
    cache: true, // verificar si el código sigue siendo el mismo o no y cachear el código del build
    minify: true, // Habilitar la opción de compresión para minificar el tamaño de los archivos generados por el build para js
    cssMinify: true, // Habilitar la opción de compresión para minificar el tamaño del css generado por el build
    mode: "production", // Especificar un contexto de salida que será para un entorno de producción (opcional)
    chunks: true, // Habilitar el particionamiento para proveer por trozos el js
    moduleBundling: true, // me permite tomar el código de las librerías del proyecto para producción y bajarles el tamaño
    prerenderPaths: ["/"], // pre-carga en memoria de rutas pesadas
    watch: true, // observable de los cambios del código asociado al build
    modulePreload: true, // me permite a las rutas de pre-render ya tener a mano su código
    outDir: "build" // me permite cambiarle el nombre al directorio de salida
  }
})
