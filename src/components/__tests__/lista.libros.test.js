import { describe, it, expect } from 'vitest';
import { ref, computed } from 'vue';

describe('Filtrado de libros', () => {
  const paginasMaximas = ref(500);
  const generoSeleccionado = ref("");

  const librosHijo = ref([
    { book: { title: 'Corto Fantasía', pages: 300, genre: 'Fantasía' } },
    { book: { title: 'Medio Ciencia Ficción', pages: 500, genre: 'Ciencia ficción' } },
    { book: { title: 'Largo Terror', pages: 700, genre: 'Terror' } }
  ]);

  const librosFiltrados = computed(() => {
    return librosHijo.value.filter(libro => {
      const cumpleGenero = !generoSeleccionado.value || libro.book.genre === generoSeleccionado.value;
      const cumplePaginas = libro.book.pages <= paginasMaximas.value;
      return cumpleGenero && cumplePaginas;
    });
  });

  it('filtra los libros según el número de páginas', () => {
    expect(librosFiltrados.value.length).toBe(2);

    paginasMaximas.value = 800;

    expect(librosFiltrados.value.length).toBe(3);
  });

  it('filtra los libros por género', () => {
    generoSeleccionado.value = "Fantasía";

    expect(librosFiltrados.value.length).toBe(1);

    generoSeleccionado.value = "Ciencia ficción";

    expect(librosFiltrados.value.length).toBe(1);

    generoSeleccionado.value = "";

    expect(librosFiltrados.value.length).toBe(2);
  });
});
