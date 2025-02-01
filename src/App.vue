<template>
  <header>
    <h1> Libreria </h1>
  </header>
  
  <main id="contenedor">
    <section id="lista-libros">
      <libreria />
    </section>
    <aside id="lista-compra">
      <listaCompra />
    </aside>
  </main>
  
  <footer id="pie">
    <p>Proyecto realizado por: <strong>Paukkita</strong> <br />
      <a href="https://github.com/Paukkita">
        <img id="github" src="/logo-github.png" alt="logo de github">
      </a>
    </p>
  </footer>
</template>

<script setup>
import { provide, reactive, watch, onMounted } from 'vue';
import libreria from './components/lista-libros.vue';
import listaCompra from './components/lista-compra.vue';
import books from './data/books.json';

const libros = reactive([]);
const librosDeseados = reactive([]);

// Cargar datos desde localStorage o inicializar con valores por defecto
const cargarDatos = () => {
  const librosGuardados = localStorage.getItem('libros');
  const librosDeseadosGuardados = localStorage.getItem('librosDeseados');

  if (librosGuardados) {
    libros.splice(0, libros.length, ...JSON.parse(librosGuardados));
  } else {
    libros.splice(0, libros.length, ...books.library);
    localStorage.setItem('libros', JSON.stringify(books.library));
  }

  if (librosDeseadosGuardados) {
    librosDeseados.splice(0, librosDeseados.length, ...JSON.parse(librosDeseadosGuardados));
  }
};

// Sincronizar entre pestañas
onMounted(() => {
  cargarDatos();
  window.addEventListener('storage', (event) => {
    if (!document.hasFocus()) { // Solo actualiza si es otra pestaña
      if (event.key === 'libros' || event.key === 'librosDeseados') {
        cargarDatos();
      }
    }
  });
});


// Guardar automáticamente cuando hay cambios
watch([libros, librosDeseados], () => {
  localStorage.setItem('libros', JSON.stringify(libros));
  localStorage.setItem('librosDeseados', JSON.stringify(librosDeseados));
}, { deep: true });

provide('books', libros);
provide('librosDeseados', librosDeseados);
</script>

<style scoped>
#github {
  width: 40px;
  height: 40px;
}
</style>
