<template>
    <h2>Lista de compra</h2>
    <ul>
        <li v-for="(libro, index) in librosDeseados" :key="libro.book.ISBN">
            <img :src="libro.book.cover" :alt="libro.book.title" class="cover" />
            <button @click="eliminarLibro(libro,index)">Eliminar</button>
        </li>
    </ul>
    <article id="pie">
        Cantidad de libros deseados {{ librosDeseados.length }}
    </article>
</template>

<script setup>
import { inject } from 'vue';

const librosDeseados = inject('librosDeseados');
const librosHijo = inject('books');

const eliminarLibro = (libro,index) => {
    librosDeseados.splice(index, 1);
    librosHijo.push(libro);
};
</script>

<style scoped>
ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    padding: 0;
}

li {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
}

.cover {
    width: 80px;
    border-radius: 5px;
}

button {
    background-color: #c62828;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}

h2 {
    text-align: center;
    color: #333;
}
#pie {
    text-align: center;
    position: bottom;
}
</style>

