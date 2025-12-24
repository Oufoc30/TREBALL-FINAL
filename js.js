// Interactividad para las tarjetas: permitir toggle en táctil y accesibilidad por teclado
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    // Habilitar toggle por click (útil en móviles sin hover)
    card.addEventListener('click', (e) => {
      card.classList.toggle('active');
    });

    // Soporte por teclado: Enter/Space para abrir, Escape para cerrar
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('active');
      } else if (e.key === 'Escape') {
        card.classList.remove('active');
      }
    });
  });

  // Cerrar overlays si se hace click fuera de cualquier tarjeta
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.card')) {
      cards.forEach(c => c.classList.remove('active'));
    }
  });

  // Ajuste inicial y en redimensionado: escalar fila de tarjetas para que quepa sin scroll (segunda opción)
  function debounce(fn, wait = 100){
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }

  const fitCards = () => {
    const container = document.querySelector('.container');
    const cardsRow = document.querySelector('.cards');
    if (!container || !cardsRow) return;

    // No aplicar en móviles con comportamiento columna
    if (window.innerWidth <= 640) {
      cardsRow.style.transform = '';
      cardsRow.style.transition = '';
      cardsRow.style.transformOrigin = '';
      return;
    }

    // Medir ancho requerido (sin transform)
    cardsRow.style.transform = 'none';
    const children = Array.from(cardsRow.children);
    const gapPx = parseFloat(getComputedStyle(cardsRow).gap) || 0;
    const requiredWidth = children.reduce((acc, el) => acc + el.getBoundingClientRect().width, 0) + Math.max(0, children.length - 1) * gapPx;
    const availableWidth = container.clientWidth;

    const scale = Math.min(1, availableWidth / requiredWidth);

    if (scale < 1) {
      cardsRow.style.transformOrigin = 'center top';
      cardsRow.style.transition = 'transform 240ms ease';
      cardsRow.style.transform = `scale(${scale})`;
    } else {
      cardsRow.style.transform = '';
      cardsRow.style.transition = '';
      cardsRow.style.transformOrigin = '';
    }
  };

  const fitCardsDebounced = debounce(fitCards, 60);
  window.addEventListener('resize', fitCardsDebounced);
  // Re-run after images load (in case images change widths)
  window.addEventListener('load', fitCards);
  // Also observe DOM changes (e.g., font load) and re-fit
  const observer = new MutationObserver(debounce(fitCards, 120));
  observer.observe(document.querySelector('.cards'), { childList:true, subtree:true, attributes:true });

  // Initial call
  fitCards();
});