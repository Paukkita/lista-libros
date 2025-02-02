<template>
    <!-- titulo basico -->
    <h2>Lista de compra</h2>
    <!-- lista donde se guardab los libros deseados. -->
    <ul>
        <li v-for="(libro, index) in librosDeseados" :key="libro.book.ISBN">
            <img :src="libro.book.cover" :alt="libro.book.title" class="cover" />
            <button @click="eliminarLibro(libro,index)">Eliminar</button>
        </li>
    </ul>
    <!-- boton ficticio para comprar cosas -->
    <section id="contenedor-comprar">
        <button @click="comprar" class="comprar">Comprar libros</button>
    </section>
    <!-- cantidad de libros deseados -->
    <article id="pie">
        Cantidad de libros deseados {{ librosDeseados.length }}
    </article>
</template>

<script setup>
import { inject } from 'vue';
//insertamos los array
const librosDeseados = inject('librosDeseados');
const librosHijo = inject('books');

//funcion para eliminar libros de librosdeseados
const eliminarLibro = (libro,index) => {
    librosDeseados.splice(index, 1);
    librosHijo.push(libro);
};
//funcion para simular compra de libros
const comprar=()=>{
    alert("Has comprado todos estos libros")
}
</script>

<style scoped>
#contenedor-comprar{
    display: flex;
    justify-content: center;
    align-items: center;
}
.comprar{
    background-color: green;
    font-size: 1.3em;
}
/* Contenedor de la lista de libros deseados */
ul {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 20px;
    list-style-type: none;
    margin: 0;
}

/* Cada libro en la lista */
li {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    width: 120px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column; /* Cambiado a columna para apilar los elementos */
    align-items: center; /* Centra los elementos dentro del li */
    justify-content: space-between;
    position: relative;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Efecto hover sobre cada libro */
li:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Imagen de cada libro (igual que en el componente lista-libros) */
.cover {
    width: 100px;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
}

/* Estilo del botón de eliminar */
button {
    background-color: #c62828; /* Rojo brillante para el botón de eliminar */
    color: white;
    border: none;
    padding: 6px 12px;
    font-size: 0.9rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 10px; /* Separación entre la imagen y el botón */
}

/* Hover sobre el botón de eliminar */
button:hover {
    background-color: #d32f2f; /* Rojo más claro al pasar el cursor */
}

/* Título de la lista de compra */
h2 {
    text-align: center;
    color: #4b0082; /* Morado oscuro */
    font-size: 1.5rem;
    margin-bottom: 20px;
}

/* Pie de la lista de compra */
#pie {
    text-align: center;
    font-size: 1rem;
    color: white;
    background-color: #4b0082; /* Morado oscuro */
    padding: 10px;
    margin-top: 20px;
    border-radius: 8px;
}

</style>

