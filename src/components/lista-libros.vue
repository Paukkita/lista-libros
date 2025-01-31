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
            <img :src="libro.book.cover" :alt="libro.book.title" class="cover">
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
    color: white;
    text-align: center;
    width: 100%;
}
/* Contenedor de tabs y slider: mismos estilos */
.tabs, .PB-range-slider-div {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 2px 4px rgba(24, 94, 224, 0.2);
    padding: 0.75rem;
    border-radius: 99px;
    max-width: 350px; /* Tamaño igual para ambos */
    height: 50px; /* Mantener misma altura */
    margin: auto;
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
    width: 100px; /* Ajustado para que encaje */
    font-size: 0.9rem;
    color: black;
    font-weight: 500;
    border-radius: 99px;
    cursor: pointer;
    transition: color 0.15s ease-in;
}

/* Pestaña activa */
.tabs input[type="radio"]:checked+label {
    color: #185ee0;
}

/* Movimiento del slider (glider) */
.tabs input[id="genero-todos"]:checked~.glider {
    transform: translateX(0);
}

/* Contenedor del slider */
.PB-range-slider-div {
    gap: 0.5rem;
}

/* Estilo del slider */
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

/* Estilo del "thumb" del slider en Webkit (Chrome, Safari) */
.PB-range-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #185ee0;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.PB-range-slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 8px rgba(24, 94, 224, 0.3);
}

/* Estilo del "thumb" en Firefox */
.PB-range-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #185ee0;
    cursor: pointer;
}

/* Valor dinámico del slider */
.PB-range-slidervalue {
    font-weight: 600;
    color: #185ee0;
    font-size: 1rem;
    min-width: 80px;
    text-align: center;
}
ul {
    width: 100%;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
}

li {
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
}

li:hover {
    transform: scale(1.1);
}

.cover {
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
}

li:hover .cover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

</style>