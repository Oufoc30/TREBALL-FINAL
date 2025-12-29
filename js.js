console.log("Hola Mundo");

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => document.body.classList.add('animate'), 1000);
});


//*Pagina carga de contenido *//

		// Duración total de la animación en milisegundos
		const DURATION = 3000;
		const REDIRECT_TO = 'pregunta1.html';

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
