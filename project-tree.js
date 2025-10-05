const fs = require('fs');
const path = require('path');

function printDirectoryStructure(dir, depth = 0, maxDepth = Infinity, ignore = [], extensions = [], specialFiles = [], specialDirs = []) {
  if (depth > maxDepth && !specialDirs.includes(path.basename(dir))) return;

  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      if (ignore.includes(file)) return;

      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      const ext = path.extname(file).toLowerCase();
      const currentDir = path.basename(dir);
      
      if (stats.isDirectory()) {
        console.log('  '.repeat(depth) + '├── ' + file + '/');
        const nextDepth = specialDirs.includes(currentDir) ? Infinity : depth + 1;
        printDirectoryStructure(filePath, depth + 1, nextDepth, ignore, extensions, specialFiles, specialDirs);
      } else if (
        (specialDirs.includes(currentDir) && extensions.includes(ext)) ||
        extensions.includes(ext) || 
        specialFiles.includes(file) || 
        file.startsWith('.env')
      ) {
        console.log('  '.repeat(depth) + '│   ' + file);
      }
    });
  } catch (error) {
    console.log(`Error al leer el directorio ${dir}:`, error.message);
  }
}

// Configuración para proyecto Next.js
const maxDepth = 4; // Profundidad general del árbol
const ignoreList = [
  'node_modules', 
  '.git', 
  '.next', 
  'build', 
  'dist',
  '.vercel'
]; // Directorios a ignorar

const extensions = [
  '.ts', '.tsx', '.js', '.jsx',  // Código
  '.css', '.scss',                // Estilos
  '.json',                        // Configuración
  '.md',                          // Documentación
  '.svg', '.png', '.jpg', '.jpeg', '.webp', '.ico'  // Imágenes
]; // Extensiones a mostrar

const specialFiles = [
  '.gitignore',
  '.env',
  '.env.local',
  '.env.example',
  'README.md',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'next.config.js',
  'next.config.mjs',
  'tailwind.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'postcss.config.mjs'
]; // Archivos especiales a mostrar

const specialDirs = [
  'app',        // Carpeta de rutas Next.js
  'components', // Componentes React
  'content',    // Contenido JSON
  'lib',        // Utilidades
  'public',     // Archivos estáticos
  'ui',         // Componentes UI
  'servicios',  // Páginas
  'productos',
  'contacto',
  'legal'
]; // Directorios importantes

console.log('\n📂 Estructura del proyecto UMEP (Next.js)\n');
console.log('umep/');
printDirectoryStructure('.', 0, maxDepth, ignoreList, extensions, specialFiles, specialDirs);
console.log('\n✅ Estructura generada exitosamente\n');

// Nota: Ejecutar este script en la raíz del proyecto Next.js
// Comando: node project-tree.js