// Slider automático rápido (sin transición suave)
document.addEventListener('DOMContentLoaded', function() {
  var slider = document.querySelector('.slider');
  if (!slider) return;
  var images = slider.getElementsByTagName('img');
  var current = 0;
  function showImage(idx) {
    for (var i = 0; i < images.length; i++) {
      images[i].classList.toggle('active', i === idx);
    }
  }
  showImage(current);
  setInterval(function() {
    current = (current + 1) % images.length;
    showImage(current);
  }, 600);
});
// Interactividad para las tarjetas: permitir toggle en táctil y accesibilidad por teclado
document.addEventListener('DOMContentLoaded', () => {
    // Interacción para el botón COMENZAR en paginainicial.html
    const homeBtn = document.querySelector('.home-btn');
    if (homeBtn && window.location.pathname.endsWith('paginainicial.html')) {
      homeBtn.addEventListener('click', () => {
        window.location.href = 'cargando.html';
      });
      homeBtn.style.cursor = 'pointer';
    }
  const cards = document.querySelectorAll('.card');

  // Detectar si estamos en index.html
  const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (window.location.pathname.endsWith('internal2.html')) {
        window.location.href = 'cargando.html?next=foto.html';
      } else if (isIndex) {
        window.location.href = 'internal.html';
      } else {
        window.location.href = 'internal2.html';
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (window.location.pathname.endsWith('internal2.html')) {
          window.location.href = 'cargando.html?next=foto.html';
        } else if (isIndex) {
          window.location.href = 'internal.html';
        } else {
          window.location.href = 'internal2.html';
        }
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

  // Hacer que el botón Flechas de la esquina izquierda navegue a la página correspondiente
  const leftFlechas = document.querySelector('.corner-controls:not(.right) .flechas');
  if (leftFlechas) {
    leftFlechas.addEventListener('click', () => {
      if (isIndex) {
        window.location.href = 'internal.html';
      } else {
        window.location.href = 'internal2.html';
      }
    });
  }

  // Hacer que el botón Flechas2.png (derecha) regrese a la página anterior correspondiente
  const rightFlechas = document.querySelector('.corner-controls.right .flechas-right');
  if (rightFlechas) {
    rightFlechas.addEventListener('click', () => {
      if (window.location.pathname.endsWith('internal2.html')) {
        window.location.href = 'internal.html';
      } else if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        window.location.href = 'paginainicial.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }

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