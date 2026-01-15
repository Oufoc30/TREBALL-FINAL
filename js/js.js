console.log("Hola Mundo");

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => document.body.classList.add('animate'), 1000);
});


//*Pagina carga de contenido *//

		// Duración total de la animación en milisegundos
		const DURATION = 3000;
		const REDIRECT_TO = 'index.html';

		function startProgress(duration){
			const el = document.getElementById('progress');
			const pct = document.getElementById('percent');
			let start = null;

			function step(timestamp){
				if(!start) start = timestamp;
				const elapsed = timestamp - start;
				const progress = Math.min(elapsed / duration, 1);
				const percent = Math.floor(progress * 100);
				el.style.width = percent + '%';
				pct.textContent = percent + '%';
				if(progress < 1){
					window.requestAnimationFrame(step);
				} else {
					setTimeout(()=> window.location.href = REDIRECT_TO, 250);
				}
			}
			window.requestAnimationFrame(step);
		}

		window.addEventListener('load', ()=>{
			// Pequeña espera visual antes de iniciar
			setTimeout(()=> startProgress(DURATION), 250);
		});

//* Animacion Foto lugar *//

document.addEventListener('DOMContentLoaded', function(){
    const slides = document.querySelectorAll('.slider img');
    if(!slides || slides.length === 0) return;
    let idx = 0;
    slides.forEach((img,i)=>{
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.2s ease-in-out';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
    });
    slides[0].style.opacity = '1';
    setInterval(()=>{
        slides[idx].style.opacity = '0';
        idx = (idx + 1) % slides.length;
        slides[idx].style.opacity = '1';
    }, 300);

    // Espera 2 segundos
setTimeout(() => {
  // Activa la animación
  document.body.classList.add("fade-out");

  // Espera a que termine la transición (1s)
  setTimeout(() => {
    window.location.href = "destino.html";
  }, 2000);

}, 2000);
});


//INTERACCIONES DEKSTOP JULIA  //
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
    // Interacción para el botón COMENZAR en home.html
    const homeBtn = document.querySelector('.home-btn');
    if (homeBtn && window.location.pathname.endsWith('home.html')) {
      homeBtn.addEventListener('click', () => {
        window.location.href = 'cargando.html';
      });
      homeBtn.style.cursor = 'pointer';
    }
  const cards = document.querySelectorAll('.card');

  // Detectar en qué página estamos y guardar la respuesta seleccionada
  const path = window.location.pathname;
  // index.html: experiencia, internal.html: presupuesto, internal2.html: duracion
  let pregunta = null;
  if (path.endsWith('index.html') || path.endsWith('/')) pregunta = 'experiencia';
  else if (path.endsWith('internal.html')) pregunta = 'presupuesto';
  else if (path.endsWith('internal2.html')) pregunta = 'duracion';

  if (pregunta) {
    cards.forEach(card => {
      card.addEventListener('click', function() {
        // Obtener valor de la respuesta según alt o texto
        let valor = '';
        if (pregunta === 'experiencia') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').toLowerCase();
        } else if (pregunta === 'presupuesto') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').replace(/[^+]/g, '+').toLowerCase();
          if (!valor) valor = 'indiferente';
        } else if (pregunta === 'duracion') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').toLowerCase();
          if (valor.includes('indiferente')) valor = 'indiferente';
          else if (valor.match(/1.*3/)) valor = '1-3';
          else if (valor.match(/4.*7/)) valor = '4-7';
          else if (valor.match(/8|\+8/)) valor = '+8';
        }
        sessionStorage.setItem(pregunta, valor);
      });
    });
  }

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


//Revelacion// 
 document.addEventListener('DOMContentLoaded', function() {
    var btn = document.querySelector('.destino-btn');
      if (btn) {
      btn.addEventListener('click', function() {
        window.location.href = 'masinfo.html';});
}
});

// Lista de destinos (puedes añadir más)
            const destinos = [
                { imagen: 'img/Pais Vasco.jpg', titulo: 'País Vasco', subtitulo: 'España' },
                { imagen: 'img/Paris.jpg', titulo: 'París', subtitulo: 'Francia' },
                { imagen: 'img/Albania.jpg', titulo: 'Albania', subtitulo: 'Europa' },
                { imagen: 'img/Atenas.jpg', titulo: 'Atenas', subtitulo: 'Grecia' },
                { imagen: 'img/Budapest.webp', titulo: 'Budapest', subtitulo: 'Hungría' },
                { imagen: 'img/Cananda.jpg', titulo: 'Toronto', subtitulo: 'Canadá' },
                { imagen: 'img/Chiang Mai.jpg', titulo: 'Chiang Mai', subtitulo: 'Tailandia' },
                { imagen: 'img/Costa Amalfitana, Italia.jpg', titulo: 'Costa Amalfitana', subtitulo: 'Italia' },
                { imagen: 'img/Costa Rica.jpg', titulo: 'Costa Rica', subtitulo: 'America Central' },
                { imagen: 'img/El cairo.jpg', titulo: 'El Cairo', subtitulo: 'Egipto' },
                { imagen: 'img/Eslovenia.jpg', titulo: 'Eslovenia', subtitulo: 'Europa' },
                { imagen: 'img/Estambul.jpg', titulo: 'Estambul', subtitulo: 'Turquía' },
                { imagen: 'img/Maldivas.jpg', titulo: 'Maldivas', subtitulo: 'Asia Meridional' },
                { imagen: 'img/Nicaragua.jpg', titulo: 'Nicaragua', subtitulo: 'America Central' },
                { imagen: 'img/nueva zelanda.jpg', titulo: 'Nueva Zelanda', subtitulo: 'Oceanía' },
                { imagen: 'img/Patagonia.jpg', titulo: 'Patagonia', subtitulo: 'Argentina/Chile' },
                { imagen: 'img/Polonia.png', titulo: 'Polonia', subtitulo: 'Europa' }
            ];
            // Función de decisión según reglas
            function obtenerDestinos(experiencia, presupuesto, duracion) {
                experiencia = experiencia.toLowerCase();
                presupuesto = presupuesto.toLowerCase();
                duracion = duracion.toLowerCase();
                const reglas = {
                    calma: {"+":{"1-3":["Albania","Polonia"],"4-7":["Asturias","Albania","Nicaragua"],"+8":["Nicaragua"],"indiferente":["Albania","Polonia","Asturias","Nicaragua"]},"++":{"1-3":["País Vasco"],"4-7":["Asturias","País Vasco","Eslovenia"],"+8":["Costa Rica"],"indiferente":["Asturias","País Vasco","Eslovenia","Costa Rica"]},"+++":{"1-3":["Costa Amalfitana"],"4-7":["Costa Amalfitana"],"+8":["Maldivas"],"indiferente":["Costa Amalfitana","Maldivas"]},"indiferente":{"1-3":["País Vasco","Polonia"],"4-7":["Asturias","Albania","Eslovenia"],"+8":["Maldivas","Nicaragua"],"indiferente":["Albania","Polonia","Asturias","Nicaragua","País Vasco","Eslovenia","Costa Rica","Costa Amalfitana","Maldivas"]}},
                    aventura: {"+":{"1-3":["Albania"],"4-7":["Albania","Nicaragua"],"+8":["Nicaragua"],"indiferente":["Albania","Nicaragua"]},"++":{"1-3":["Eslovenia"],"4-7":["Costa Rica","Eslovenia"],"+8":["Costa Rica"],"indiferente":["Costa Rica","Eslovenia"]},"+++":{"1-3":[],"4-7":["Canadá"],"+8":["Canadá","Nueva Zelanda","Patagonia"],"indiferente":["Canadá","Nueva Zelanda","Patagonia"]},"indiferente":{"1-3":["Albania","Eslovenia"],"4-7":["Costa Rica","Eslovenia"],"+8":["Canadá","Nueva Zelanda","Patagonia"],"indiferente":["Albania","Nicaragua","Eslovenia","Costa Rica","Canadá","Nueva Zelanda","Patagonia"]}},
                    cultural: {"+":{"1-3":["Budapest","Polonia"],"4-7":["Budapest","Polonia","El Cairo"],"+8":["El Cairo"],"indiferente":["Budapest","Polonia","El Cairo"]},"++":{"1-3":["Estambul","Atenas","País Vasco"],"4-7":["Estambul","Atenas"],"+8":["Chiang Mai"],"indiferente":["Estambul","Atenas","Chiang Mai","País Vasco"]},"+++":{"1-3":["París"],"4-7":["París"],"+8":[],"indiferente":["París"]},"indiferente":{"1-3":["París","Budapest","Estambul"],"4-7":["Atenas","Chiang Mai"],"+8":["El Cairo"],"indiferente":["Budapest","Polonia","El Cairo","Estambul","Atenas","Chiang Mai","País Vasco","París"]}},
                    indiferente: {"+":{"1-3":["Budapest","Polonia"],"4-7":["Albania","Chiang Mai"],"+8":["Nicaragua"],"indiferente":["Albania","Polonia","Budapest","Chiang Mai","Nicaragua"]},"++":{"1-3":["País Vasco","Estambul"],"4-7":["Asturias","Grecia","Eslovenia"],"+8":["Costa Rica"],"indiferente":["País Vasco","Asturias","Grecia","Eslovenia","Costa Rica"]},"+++":{"1-3":["París"],"4-7":["Costa Amalfitana"],"+8":["Maldivas","Nueva Zelanda","Patagonia"],"indiferente":["París","Costa Amalfitana","Maldivas","Nueva Zelanda","Patagonia"]},"indiferente":{"1-3":["París","Budapest"],"4-7":["Asturias","Grecia"],"+8":["Canadá","Maldivas"],"indiferente":["Albania","Asturias","Budapest","Canadá","Chiang Mai","Costa Amalfitana","Costa Rica","El Cairo","Eslovenia","Estambul","Grecia","Maldivas","Nicaragua","Nueva Zelanda","País Vasco","París","Patagonia","Polonia"]}}
                };
                const exp = experiencia === "cultural" ? "cultural"
                                    : experiencia === "aventura" ? "aventura"
                                    : experiencia === "calma" ? "calma"
                                    : "indiferente";
                const pres = ["+", "++", "+++"] .includes(presupuesto) ? presupuesto : "indiferente";
                const dur = ["1-3", "4-7", "+8"].includes(duracion) ? duracion : "indiferente";
                if (reglas[exp] && reglas[exp][pres] && reglas[exp][pres][dur]) {
                    return reglas[exp][pres][dur];
                }
                return [];
            }

            // Leer respuestas del usuario
            const experiencia = sessionStorage.getItem('experiencia') || 'indiferente';
            const presupuesto = sessionStorage.getItem('presupuesto') || 'indiferente';
            const duracion = sessionStorage.getItem('duracion') || 'indiferente';
            // Obtener destinos posibles
            const posibles = obtenerDestinos(experiencia, presupuesto, duracion);
            // Filtrar info de destinos
            const posiblesInfo = destinos.filter(d => posibles.includes(d.titulo));
            // Elegir uno al azar
            const destino = posiblesInfo.length > 0 ? posiblesInfo[Math.floor(Math.random() * posiblesInfo.length)] : destinos[Math.floor(Math.random() * destinos.length)];
            // Cambiar imagen de fondo y principal
            document.getElementById('bg-blur').src = destino.imagen;
            document.getElementById('destino-img').src = destino.imagen;
            document.getElementById('destino-img').alt = destino.titulo;
            // Cambiar título y subtítulo
            document.getElementById('destino-titulo').childNodes[0].nodeValue = destino.titulo + '\n';
            document.getElementById('destino-sub').textContent = destino.subtitulo;

            // Botón "saber más" navega a masinfo.html
            const btnSaberMas = document.getElementById('saber-mas');
            if (btnSaberMas) {
                btnSaberMas.addEventListener('click', function() {
                    window.location.href = 'masinfo.html';
                });
            }

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

  // Detectar en qué página estamos y guardar la respuesta seleccionada
  const path = window.location.pathname;
  // index.html: experiencia, internal.html: presupuesto, internal2.html: duracion
  let pregunta = null;
  if (path.endsWith('index.html') || path.endsWith('/')) pregunta = 'experiencia';
  else if (path.endsWith('internal.html')) pregunta = 'presupuesto';
  else if (path.endsWith('internal2.html')) pregunta = 'duracion';

  if (pregunta) {
    cards.forEach(card => {
      card.addEventListener('click', function() {
        // Obtener valor de la respuesta según alt o texto
        let valor = '';
        if (pregunta === 'experiencia') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').toLowerCase();
        } else if (pregunta === 'presupuesto') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').replace(/[^+]/g, '+').toLowerCase();
          if (!valor) valor = 'indiferente';
        } else if (pregunta === 'duracion') {
          valor = (card.querySelector('h3')?.textContent || card.querySelector('img')?.alt || '').toLowerCase();
          if (valor.includes('indiferente')) valor = 'indiferente';
          else if (valor.match(/1.*3/)) valor = '1-3';
          else if (valor.match(/4.*7/)) valor = '4-7';
          else if (valor.match(/8|\+8/)) valor = '+8';
        }
        sessionStorage.setItem(pregunta, valor);
      });
    });
  }

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
  