<template>
<!--   titulo sencilllo modificable a futuras mejoras y añadir mas cosas -->
  <header>
    <h1> Libreria </h1>
  </header>
  <!--  Contenedor main donde se gestiona toda la estructura de la gestion de libros con dos componentes -->
  <main id="contenedor">
    <section id="lista-libros">
      <libreria />
    </section>
    <aside id="lista-compra">
      <listaCompra />
    </aside>
  </main>
  <!--   Pie de pagina con los creditos de autor-->
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

/* defino las dos variables reactivas donde se gestionaran todos los datos de los libros */
const libros = reactive([]);
const librosDeseados = reactive([]);

// Funcion definida por Vue la cual se cargara cada vez que se monte una app #mount, do
onMounted(() => {
  /* ejecutaremos la funcion cargar datos para cada pestaña que se cargue */
  cargarDatos();
  //Un addevent listener el cual cada vez que se modifique el localstorage en otra ventana se ejecute la funcion cargar datos para asegurar la sincronicidad
  window.addEventListener('storage', (event) => {
    //nos permite que este evento solo se active en la ventana inactiva ya que lo gestionaremos correctamente el la parte de abajo
    if (!document.hasFocus()) { // Solo actualiza si es otra pestaña
      //si el localstorage es igual a lo que necesitamos que se ejecute la funcion cargar datos
      if (event.key === 'libros' || event.key === 'librosDeseados') {
        cargarDatos();
      }
    }
  });
});

// Evento que viene en vue que se activa al haber un cambio en las variables introducidas la cual nos permite modificar el el localstorage interactivamente
watch([libros, librosDeseados], () => {
  localStorage.setItem('libros', JSON.stringify(libros));
  localStorage.setItem('librosDeseados', JSON.stringify(librosDeseados));
}, { deep: true });//nos permite modificar todos los cambios a nivel profundo tambien, no es obligatorio pero ayuda

// Arrow function la cual al cargar la pagina y los arrays con los datos del localstorage para permitirnos mantener los datos de sesiones anteriores
const cargarDatos = () => {
  const librosGuardados = localStorage.getItem('libros');
  const librosDeseadosGuardados = localStorage.getItem('librosDeseados');

  //si existe pues copiamos los datos del localstorage en caso contrario pues importamos los datos del array json.
  if (librosGuardados) {
    libros.splice(0, libros.length, ...JSON.parse(librosGuardados));
  } else {
    //mejora añadida para que no se añadan los libros dos veces en caso de que los todos los libros esten en librosdeseados
    if (!librosDeseadosGuardados) {
      libros.splice(0, libros.length, ...books.library);
      localStorage.setItem('libros', libros);
    }
  }
  //Si existe el localstorage pues le metemos los datos, si no existe es que nunca se ha introducido nada por lo que no debemos gestionar nada
  if (librosDeseadosGuardados) {
    librosDeseados.splice(0, librosDeseados.length, ...JSON.parse(librosDeseadosGuardados));
  }
};


//pasamos los datos a los componentes hijos
provide('books', libros);
provide('librosDeseados', librosDeseados);
</script>

<style scoped>
#github {
  width: 40px;
  height: 40px;
}
</style>
