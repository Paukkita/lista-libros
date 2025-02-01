<template>
    <nav>
        <section id="filtros">
            <article id="filtro-genero">
                <div class="tabs">
                    <input type="radio" id="genero-todos" name="genero" value="" v-model="generoSeleccionado" checked>
                    <label class="tab" for="genero-todos">Todos</label>

                    <input type="radio" id="genero-fantasia" name="genero" value="Fantasía" v-model="generoSeleccionado">
                    <label class="tab" for="genero-fantasia">Fantasía</label>

                    <input type="radio" id="genero-ciencia" name="genero" value="Ciencia ficción" v-model="generoSeleccionado">
                    <label class="tab" for="genero-ciencia">Ciencia Ficción</label>

                    <input type="radio" id="genero-zombies" name="genero" value="Zombies" v-model="generoSeleccionado">
                    <label class="tab" for="genero-zombies">Zombies</label>

                    <input type="radio" id="genero-terror" name="genero" value="Terror" v-model="generoSeleccionado">
                    <label class="tab" for="genero-terror">Terror</label>

                    <span class="glider"></span>
                </div>
            </article>

            <article id="filtro-paginas">
                <div class="PB-range-slider-div">
                    <input id="paginas" type="range" v-model="paginasMaximas" min="0" max="1500" step="50" class="PB-range-slider" />
                    <p class="PB-range-slidervalue">{{ paginasMaximas }} páginas</p>
                </div>
            </article>
        </section>
    </nav>

    <ul>
        <li @click="cambiarLibro(libro)" v-for="libro in librosFiltrados" :key="libro.book.ISBN">
            <img :src="libro.book.cover" :alt="libro.book.title" >
        </li>
    </ul>
    <article id="pie">
        Cantidad de libros disponibles {{ librosHijo.length }}
    </article>
</template>

<script setup>
import { inject, ref, computed } from 'vue';

const librosHijo = inject('books'); 
const librosDeseados = inject('librosDeseados');

const generoSeleccionado = ref("");
const paginasMaximas = ref(1500);

const cambiarLibro = (libro) => {
    const existe = librosDeseados.some(l => l.book.ISBN === libro.book.ISBN);
    if (!existe) {
        librosDeseados.push(libro);
        const index = librosHijo.findIndex(l => l.book.ISBN === libro.book.ISBN);
        if (index !== -1) {
            librosHijo.splice(index, 1);
        }
    }
};

const librosFiltrados = computed(() => {
    return librosHijo.filter(libro => {
        const cumpleGenero = !generoSeleccionado.value || libro.book.genre === generoSeleccionado.value;
        const cumplePaginas = libro.book.pages <= paginasMaximas.value;
        return cumpleGenero && cumplePaginas;
    });
});
</script>

<style scoped>
/* Contenedor de filtros */
#filtros {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    width: 100%;
    gap: 15px;
}

/* Contenedor de tabs y slider */
.tabs, .PB-range-slider-div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(24, 94, 224, 0.2);
    padding: 0.75rem;
    border-radius: 99px;
    max-width: 350px; 
    height: 50px;
    margin: auto;
}

.tabs{
    max-width: 500px;
}
/* Ocultar radios en tabs */
.tabs input[type="radio"] {
    display: none;
}

/* Estilos de cada pestaña */
.tab {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 35px; /* Igual al slider */
    width: 100px;
    font-size: 1rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
}

/* Pestaña activa */
.tabs input[type="radio"]:checked + label {
    color: white;
    background-color: #4b0082; /* Morado oscuro */
}

/* Movimiento del slider (glider) */
.tabs input[id="genero-todos"]:checked ~ .glider {
    transform: translateX(0);
}

/* Estilo del slider */
.PB-range-slider-div {
    gap: 0.5rem;
}

/* Slider */
.PB-range-slider {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    border-radius: 5px;
    background: #e6eef9;
    outline: none;
    opacity: 0.8;
    transition: opacity .2s;
}

.PB-range-slider:hover {
    opacity: 1;
}

/* "Thumb" del slider en Webkit */
.PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #4b0082;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.PB-range-slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 8px rgba(24, 94, 224, 0.3);
}

/* "Thumb" en Firefox */
.PB-range-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #4b0082;
    cursor: pointer;
}

/* Valor dinámico del slider */
.PB-range-slidervalue {
    font-weight: 600;
    color: #4b0082;
    font-size: 1rem;
    min-width: 80px;
    text-align: center;
}
/* Estilos internos para el componente lista-libros */

/* Contenedor de la lista de libros */
ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
    padding: 20px;
    list-style-type: none;
    margin: 0;
}

/* Elemento individual de la lista de libros */
li {
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

li:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

/* Imagen del libro */
li img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

/* Pie de la lista de libros (cantidad de libros disponibles) */
#pie {
    background-color: #4b0082; /* Morado oscuro */
    color: white;
    padding: 10px;
    text-align: center;
    font-size: 1rem;
    border-radius: 8px;
    margin-top: 20px;
}

</style>
