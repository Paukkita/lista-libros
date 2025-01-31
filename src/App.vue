<template>
  <header>
    <h1> Título provisional proyecto lista libros </h1>
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

const cargarDatos = () => {
  const storedLibros = localStorage.getItem('libros');
  const storedLibrosDeseados = localStorage.getItem('librosDeseados');

  if (storedLibros) {
    libros.splice(0, libros.length, ...JSON.parse(storedLibros));
  } else {
    libros.splice(0, libros.length, ...books.library);
    localStorage.setItem('libros', JSON.stringify(books.library));
  }

  if (storedLibrosDeseados) {
    librosDeseados.splice(0, librosDeseados.length, ...JSON.parse(storedLibrosDeseados));
  }
};

onMounted(() => {
  cargarDatos();

  window.addEventListener('storage', (event) => {
    if (event.key === 'libros' || event.key === 'librosDeseados') {
      cargarDatos();
    }
  });
});

watch([libros, librosDeseados], ([newLibros, newLibrosDeseados]) => {
  localStorage.setItem('libros', JSON.stringify(newLibros));
  localStorage.setItem('librosDeseados', JSON.stringify(newLibrosDeseados));
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
