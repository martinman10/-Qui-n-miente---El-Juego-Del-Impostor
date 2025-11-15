// ===== Evitar zoom por doble-tap y pellizco en móviles (pero permitir botones) =====
(function() {
  // Evita pinch-to-zoom (más de un dedo)
  document.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Evita double-tap zoom solo si no es botón, enlace o input
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function (e) {
    const now = Date.now();
    const tag = e.target.tagName.toLowerCase();

    // Si no es botón, enlace o input, prevenir zoom
    if (now - lastTouchEnd <= 300 && !['button', 'a', 'input', 'textarea'].includes(tag)) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
})();

document.addEventListener("DOMContentLoaded", () => {
function mostrarBotonesPantallasFijas() {
  const btnsTematicas = document.querySelector('#pantalla-seleccionar-tematicas .fixed-buttons');
  if (btnsTematicas) btnsTematicas.style.display = 'block';

  const btnsNombres = document.querySelector('#pantalla-editar-nombres .fixed-buttons');
  if (btnsNombres) btnsNombres.style.display = 'block';
}


const selJugadores = document.getElementById("jugadores");
const selImpostores = document.getElementById("impostores");

// Llenar jugadores con opción "Más..."
for (let i = 3; i <= 15; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i;
  if (i === 5) opt.selected = true; // valor por defecto
  selJugadores.appendChild(opt);
}

// Agregar opción "Más..."
const optMas = document.createElement("option");
optMas.value = "mas";
optMas.textContent = "Más...";
selJugadores.appendChild(optMas);

// Evento para manejar el caso "Más..."
selJugadores.addEventListener("change", function () {
  if (this.value === "mas") {
    const num = prompt("Ingrese el número de jugadores:");
    if (num && !isNaN(num) && parseInt(num) >= 3) {
      const valor = parseInt(num);

      // Si no existe una opción con ese valor, la creamos
      let existe = Array.from(this.options).some(opt => opt.value == valor);
      if (!existe) {
        const nuevaOpcion = document.createElement("option");
        nuevaOpcion.value = valor;
        nuevaOpcion.textContent = valor;
        // Insertar antes de la opción "Más..."
        this.insertBefore(nuevaOpcion, this.querySelector('option[value="mas"]'));
      }

      this.value = valor;
      actualizarOpcionesImpostores();
    } else {
      this.value = 5; // valor por defecto
      actualizarOpcionesImpostores();
    }
  } else {
    actualizarOpcionesImpostores();
  }
});

// Función para llenar impostores dinámicamente
function actualizarOpcionesImpostores() {
  let jugadores = parseInt(selJugadores.value);

  // Si el valor ingresado es inválido, poner mínimo 3
  if (isNaN(jugadores) || jugadores < 3) {
    jugadores = 3;
  }

  selImpostores.innerHTML = ""; // limpiar opciones actuales

  for (let i = 1; i < jugadores; i++) { // hasta jugadores - 1
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    if (i === 1) opt.selected = true; // valor por defecto
    selImpostores.appendChild(opt);
  }
}


// Generar impostores iniciales
actualizarOpcionesImpostores();

// Actualizar cada vez que cambie el número de jugadores
selJugadores.addEventListener("change", actualizarOpcionesImpostores);

const selDuracion = document.getElementById("duracion");
for (let i = 1; i <= 60; i++) {
  const opt = document.createElement("option");
  opt.value = i;
  opt.textContent = i + (i === 1 ? " minuto" : " minutos");
  if (i === 3) opt.selected = true; // valor por defecto
  selDuracion.appendChild(opt);
}

 localStorage.removeItem('nombresPersonalizados');
 localStorage.removeItem('nombresPersonalizados');
localStorage.removeItem('jugadores');
localStorage.removeItem('impostores');
localStorage.removeItem('tematica');
localStorage.removeItem('duracion');
localStorage.removeItem('famososExcluidosPorTematica');

  function ajustarAltura() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', ajustarAltura);
window.addEventListener('orientationchange', ajustarAltura);
ajustarAltura();
  

  console.log("DOMContentLoaded cargado — registrando eventos de temática");

  // Recuperar exclusiones guardadas
  let excluidosPorTematica = JSON.parse(localStorage.getItem('famososExcluidosPorTematica') || '{}');

  // Función para obtener famosos disponibles
  function obtenerFamososDisponiblesPara(tematica) {
    const base = famososPorTematica[tematica] ? [...famososPorTematica[tematica]] : [];
    const excluidos = excluidosPorTematica[tematica] || [];
    return base.filter(n => !excluidos.includes(n));
  }

// Botón lápiz - Editar temática (versión robusta sin cortar el DOMContentLoaded)
// --- Editor de temática basado en 'window.tematicasSeleccionadas' ---
function abrirEditorTematica() {
  console.log("Click en botón lápiz");

  // Validación: tiene que haber al menos una temática elegida
  if (!window.tematicasSeleccionadas || window.tematicasSeleccionadas.length === 0) {
    alert('Seleccioná al menos una temática para editar.');
    return;
  }

  // Unir todos los famosos de las temáticas seleccionadas
 // Unir todas las temáticas seleccionadas sin duplicados
let lista = [];
window.tematicasSeleccionadas.forEach(t => {
  lista = lista.concat(famososPorTematica[t] || []);
});
// Eliminar duplicados
lista = [...new Set(lista)];


  // Si no hay famosos, limpiamos exclusiones de esas temáticas
  if (lista.length === 0) {
    alert('No hay famosos en las temáticas seleccionadas.');
    window.tematicasSeleccionadas.forEach(t => excluidosPorTematica[t] = []);
  }

  // Pintar checkboxes
  const cont = document.getElementById('lista-famosos-tematica');
  cont.innerHTML = lista.map(nombre => {
    const checked = !window.tematicasSeleccionadas.some(
      t => (excluidosPorTematica[t] || []).includes(nombre)
    );
    const safeNombre = String(nombre).replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    return `<label class="famoso-item" style="display:block; margin:4px 0;">
              <input type="checkbox" value="${safeNombre}" ${checked ? 'checked' : ''}>
              ${safeNombre}
            </label>`;
  }).join('');

  // Mostrar pantalla de edición
  document.getElementById('pantalla-inicial').style.display = 'none';
  document.getElementById('pantalla-editar-nombres').style.display = 'none';
  document.querySelector(".container")?.classList.add("editar-nombres-activa");
  document.getElementById('pantalla-editar-tematica').style.display = 'block';
}
// Guardar cambios de temática (sin <select>)
document.getElementById('btnGuardarTematica').addEventListener('click', () => {
  const seleccionados = Array.from(
    document.querySelectorAll('#lista-famosos-tematica input:checked')
  ).map(i => i.value);

  // Para cada temática elegida, guardamos los excluidos
  window.tematicasSeleccionadas.forEach(t => {
    const originales = famososPorTematica[t] || [];
    excluidosPorTematica[t] = originales.filter(n => !seleccionados.includes(n));
  });

  localStorage.setItem('famososExcluidosPorTematica', JSON.stringify(excluidosPorTematica));

  document.getElementById('pantalla-editar-tematica').style.display = 'none';
  document.getElementById('pantalla-inicial').style.display = 'block';
});

// Cancelar sin guardar
document.getElementById('btnCancelarTematica').addEventListener('click', () => {
  document.getElementById('pantalla-editar-tematica').style.display = 'none';
  document.getElementById('pantalla-inicial').style.display = 'block';
});
window.tematicasSeleccionadas = window.tematicasSeleccionadas || [];

// Listener robusto para el botón ✏️
(function asegurarBotonEditarTematica() {
  const btn = document.getElementById('btnEditarTematica');
  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      abrirEditorTematica();
    });
  } else {
    // Delegación por si el botón se renderiza después
    document.addEventListener('click', (e) => {
      const t = e.target;
      if (t && (t.id === 'btnEditarTematica' || t.closest?.('#btnEditarTematica'))) {
        e.preventDefault();
        abrirEditorTematica();
      }
    });
  }
})();


    let totalJugadores = 0;
    let totalImpostores = 0;
    let jugadorActual = 1;
    let impostoresArray = [];
    let famosoElegido = "";
    let tematicaSeleccionada = "todos"; // para mantener la selección actual
let famososDisponibles = [];        // para evitar repetidos
let tematicaAnterior = "todos";
let duracionRonda = 3;
let juegoIniciado = false;

const btnVolverConfiguracion = document.getElementById('btnVolverConfiguracion');

btnVolverConfiguracion.addEventListener('click', () => {
  // 🆕 limpiar UI de juego al salir
  const container = document.getElementById('main');
  if (window.intervalo) { clearInterval(window.intervalo); window.intervalo = null; }
  container.querySelectorAll('.game-fixed, .card').forEach(el => el.remove());

  // Ocultar todas las pantallas
  document.querySelectorAll('.container > div').forEach(div => div.style.display = 'none');
  // Mostrar pantalla de configuraciones
  document.getElementById('pantalla-inicial').style.display = 'block';
  // Ocultar el botón de volver
  btnVolverConfiguracion.style.display = 'none';
});

    function comenzarJuego() {
  totalJugadores = parseInt(document.getElementById("jugadores").value);
  totalImpostores = parseInt(document.getElementById("impostores").value);
  if (Array.isArray(window.tematicasSeleccionadas) && window.tematicasSeleccionadas.length > 0) {
  const i = Math.floor(Math.random() * window.tematicasSeleccionadas.length);
  tematicaSeleccionada = window.tematicasSeleccionadas[i];
} else {
  tematicaSeleccionada = "todos";
}


  duracionRonda = parseInt(document.getElementById("duracion").value);

  // 🔹 Validaciones de límites
  if (totalJugadores > 100) totalJugadores = 100;
  if (totalImpostores > 50) totalImpostores = 50;
  if (duracionRonda > 60) duracionRonda = 60;

  // 🔹 Evitar más impostores que jugadores
  if (totalImpostores >= totalJugadores) {
    alert("El número de impostores debe ser menor que el número de jugadores.");
    return;
  }

  btnVolverConfiguracion.style.display = 'block';
  juegoIniciado = true;

  // Si es una temática nueva o se agotaron los disponibles, reiniciar la lista
  if (tematicaSeleccionada !== tematicaAnterior || famososDisponibles.length === 0) {
    famososDisponibles = obtenerFamososDisponiblesPara(tematicaSeleccionada);
    tematicaAnterior = tematicaSeleccionada;
  }

  // 🔹 VERIFICAR QUE HAY FAMOSOS DISPONIBLES
  if (!famososDisponibles || famososDisponibles.length === 0) {
    alert("No hay famosos disponibles para la temática seleccionada. Por favor, selecciona otra temática o revisa las exclusiones.");
    return;
  }

  jugadorActual = 1;
  impostoresArray = [];

  // Elegimos un famoso aleatorio de los disponibles y lo eliminamos de la lista
  const randomIndex = Math.floor(Math.random() * famososDisponibles.length);
  const nombreElegido = famososDisponibles.splice(randomIndex, 1)[0];
  
  // 🔹 VERIFICAR QUE EL NOMBRE ELEGIDO NO SEA NULL O UNDEFINED
  if (!nombreElegido) {
    alert("Error: No se pudo seleccionar un famoso. Reinicia el juego.");
    return;
  }
  
  famosoElegido = famosos.find(f => f.nombre === nombreElegido);
  
  // 🔹 VERIFICAR QUE SE ENCONTRÓ EL FAMOSO EN LA LISTA
  if (!famosoElegido) {
    alert(`Error: No se encontró información para ${nombreElegido}. Reinicia el juego.`);
    return;
  }

  while (impostoresArray.length < totalImpostores) {
    let random = Math.floor(Math.random() * totalJugadores) + 1;
    if (!impostoresArray.includes(random)) {
      impostoresArray.push(random);
    }
  }

  mostrarSiguiente();
}

    function mostrarSiguiente() {
  const pantallaInicial = document.getElementById("pantalla-inicial");
  const pantallaEditar = document.getElementById("pantalla-editar-nombres");
  const pantallaJuego = document.getElementById("pantalla-juego");
btnVolverConfiguracion.style.display = 'block';

  if (pantallaInicial) pantallaInicial.style.display = "none";
  if (pantallaEditar) pantallaEditar.style.display = "none";
  if (pantallaJuego) pantallaJuego.style.display = "none";

  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".game-fixed");
  botonesViejos.forEach(b => b.remove());

  const card = document.createElement("div");
card.classList.add("card", "carta-turno");

  const nombreJugador = nombresPersonalizados.length
  ? nombresPersonalizados[jugadorActual - 1]
  : `Jugador ${jugadorActual}`;

card.innerHTML = `
  <h2>Turno de <span class="nombre-turno">${nombreJugador}</span></h2>
`;


  const botones = document.createElement("div");
  botones.classList.add("fixed-buttons", "game-fixed");
  botones.innerHTML = `<button onclick="revelar()">Revelar</button>`;

  container.appendChild(card);
  container.appendChild(botones);
}


function revelar() {
  const container = document.getElementById("main");
btnVolverConfiguracion.style.display = 'block';

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".game-fixed");
  botonesViejos.forEach(b => b.remove());

  const esImpostor = impostoresArray.includes(jugadorActual);

  const card = document.createElement("div");
  card.classList.add("card");

  // Estilos generales
  card.style.overflowY = "auto";
  card.style.display = "flex";
  card.style.flexDirection = "column";
  card.style.alignItems = "center";
  card.style.padding = "16px";
  card.style.boxSizing = "border-box";

  // 💡 Responsive
  if (window.innerWidth < 768) {
    card.style.height = "auto";
    card.style.justifyContent = "flex-start";
  } else {
    card.style.height = "calc(100vh - 80px)";
    card.style.justifyContent = "center";
  }

  const nombreJugador = nombresPersonalizados.length
    ? nombresPersonalizados[jugadorActual - 1]
    : `Jugador ${jugadorActual}`;

  card.innerHTML = `
    <h2 style="margin-bottom: 20px;"><span class="nombre-jugador">${nombreJugador}</span></h2>
    ${
      esImpostor
        ? `<div style="width: 52vw; max-width: 290px; height: 280px; overflow: hidden; background: white; padding: 0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
             <img src="img/impostor.jpg"
                  alt="Impostor"
                  style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px;">
           </div>
           <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: red;">
             IMPOSTOR
           </p>`
        : `<div style="width: 52vw; max-width: 290px; height: 280px; overflow: hidden; background: white; padding: 0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
             <div class="loader"></div>
             <img src="${famosoElegido && famosoElegido.foto ? famosoElegido.foto : 'img/default.jpg'}"
                  alt="${famosoElegido && famosoElegido.nombre ? famosoElegido.nombre : 'Famoso'}"
                  style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display:none;">
           </div>
           <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: #2ecc71;">
             ${famosoElegido && famosoElegido.nombre ? famosoElegido.nombre : 'Famoso'}
           </p>`
    }
  `;

  // --- Paso 3: loader solo si NO es impostor ---
  if (!esImpostor) {
    const imgEl = card.querySelector('img');
    const loaderEl = card.querySelector('.loader');

    if (imgEl) {
      imgEl.style.display = 'none';

      if (imgEl.complete && imgEl.naturalWidth !== 0) {
        if (loaderEl) loaderEl.style.display = 'none';
        imgEl.style.display = 'block';
      } else {
        imgEl.addEventListener('load', () => {
          if (loaderEl) loaderEl.style.display = 'none';
          imgEl.style.display = 'block';
        });

        imgEl.addEventListener('error', () => {
          if (loaderEl) loaderEl.style.display = 'none';
          imgEl.src = 'img/default.jpg';
          imgEl.style.display = 'block';
        });
      }
    }
  }

  const botones = document.createElement("div");
  botones.classList.add("fixed-buttons", "game-fixed");

  botones.innerHTML = jugadorActual < totalJugadores
    ? `<button onclick="siguiente()">Continuar</button>`
    : `<button onclick="mostrarPantallaDeJuego()">¡A jugar!</button>`;

  container.appendChild(card);
  container.appendChild(botones);
}

window.revelar = revelar;


function siguiente() {
  const container = document.getElementById("main");
btnVolverConfiguracion.style.display = 'block';

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".game-fixed");
  botonesViejos.forEach(b => b.remove());

  if (jugadorActual < totalJugadores) {
    const nombreProximo = nombresPersonalizados.length > 0
      ? nombresPersonalizados[jugadorActual]
      : `jugador ${jugadorActual + 1}`;

    const card = document.createElement("div");
card.classList.add("card", "carta-pasar");

    card.innerHTML = `
  <h2>Pasá el teléfono</h2>
  <p>Pasá el dispositivo al <strong class="nombre-jugador">${nombreProximo}</strong> sin mostrar tu rol.</p>
`;

    const botones = document.createElement("div");
    botones.classList.add("fixed-buttons", "game-fixed");
    botones.innerHTML = `<button onclick="continuarSiguiente()">Listo</button>`;

    container.appendChild(card);
    container.appendChild(botones);
  } else {
    reiniciar();
  }
}
window.siguiente = siguiente;

function continuarSiguiente() {
  const container = document.getElementById("main");
btnVolverConfiguracion.style.display = 'block';

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());

  jugadorActual++;
  mostrarSiguiente();
}


window.continuarSiguiente = continuarSiguiente;
function reiniciar() {
    // 🆕 limpiar UI de juego
  const container = document.getElementById('main');
  if (window.intervalo) { clearInterval(window.intervalo); window.intervalo = null; }
  container.querySelectorAll('.game-fixed, .card').forEach(el => el.remove());

  juegoIniciado = false;

  const pantallaInicial = document.getElementById("pantalla-inicial");
  const pantallaEditar = document.getElementById("pantalla-editar-nombres");
  const pantallaJuego = document.getElementById("pantalla-juego");

  if (pantallaInicial) pantallaInicial.style.display = "block";
  if (pantallaEditar) pantallaEditar.style.display = "none";
  if (pantallaJuego) pantallaJuego.style.display = "none";
}

window.reiniciar = reiniciar;
window.pedirNombres = pedirNombres;
window.comenzarJuego = comenzarJuego;
window.mostrarPantallaDeJuego = mostrarPantallaDeJuego;
    
function mostrarPantallaDeJuego() {
  const pantallaInicial = document.getElementById("pantalla-inicial");
  const pantallaEditar = document.getElementById("pantalla-editar-nombres");
  const pantallaJuego = document.getElementById("pantalla-juego");
btnVolverConfiguracion.style.display = 'block';

  if (!pantallaJuego) {
    alert("Error: No se encontró el contenedor de juego.");
    return;
  }

  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".game-fixed");
  botonesViejos.forEach(b => b.remove());

  if (pantallaInicial) pantallaInicial.style.display = "none";
  if (pantallaEditar) pantallaEditar.style.display = "none";
  pantallaJuego.style.display = "block";

  pantallaJuego.innerHTML = `
    <div class="card" style="text-align:center;">
      <h2>⏳ ¡Empieza la ronda!</h2>
      <div class="timer-container">
        <svg>
          <circle class="circle-bg" cx="100" cy="100" r="90"></circle>
          <circle class="circle-progress" cx="100" cy="100" r="90" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
        </svg>
        <div class="timer-text" id="tiempoRonda">${duracionRonda}:00</div>
      </div>
      <p>Cuando estén listos, pueden votar antes que se acabe el tiempo.</p>
    </div>
  `;

  const botones = document.createElement("div");
  botones.classList.add("fixed-buttons", "game-fixed");
  botones.innerHTML = `<button id="terminarRondaBtn">Terminar ronda</button>`;
  container.appendChild(botones);

  const circle = pantallaJuego.querySelector('.circle-progress');
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;

  let totalSeconds = duracionRonda * 60;
  let segundosRestantes = totalSeconds;

  function actualizarTemporizador() {
    let minutos = Math.floor(segundosRestantes / 60);
    let segundos = segundosRestantes % 60;
    const tiempoFormateado = `${minutos}:${segundos.toString().padStart(2, '0')}`;
    const tiempoEl = document.getElementById("tiempoRonda");
    tiempoEl.textContent = tiempoFormateado;

    const progreso = circumference - (segundosRestantes / totalSeconds) * circumference;
    circle.style.strokeDashoffset = progreso;

    if (segundosRestantes <= 30) {
      tiempoEl.classList.add('warning');
      circle.style.stroke = '#e84118';
    } else {
      tiempoEl.classList.remove('warning');
      circle.style.stroke = '#ff4757';
    }

    if (segundosRestantes === 0) {
      clearInterval(intervalo);
      tiempoEl.textContent = "¡Tiempo terminado!";
      document.getElementById("terminarRondaBtn").textContent = "Terminar Ronda";
    }

    segundosRestantes--;
  }

  actualizarTemporizador();
  // Evitar múltiples temporizadores
if (window.intervalo) {
  clearInterval(window.intervalo);
}

actualizarTemporizador();
window.intervalo = setInterval(actualizarTemporizador, 1000);

  document.getElementById("terminarRondaBtn").addEventListener("click", () => {
      // 🆕 frenar temporizador si está corriendo
  if (window.intervalo) { clearInterval(window.intervalo); window.intervalo = null; }
    btnVolverConfiguracion.style.display = "none"; // Ocultar flecha atrás

    // Ocultar pantalla de juego y mostrar pantalla inicial (configuración)
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";


    if (pantallaInicial) pantallaInicial.style.display = "block";
    if (pantallaEditar) pantallaEditar.style.display = "none";
    if (pantallaJuego) pantallaJuego.style.display = "none";

    const botonesViejos = container.querySelectorAll(".game-fixed");
botonesViejos.forEach(b => b.remove());
  });
}
window.mostrarPantallaDeJuego = mostrarPantallaDeJuego;


    function abrirModal() {
      document.getElementById('modal').classList.add('active');
    }

    function cerrarModal() {
      document.getElementById('modal').classList.remove('active');
    }

    // Cerrar modal con tecla ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === "Escape") {
        cerrarModal();
      }
    })
    
   let nombresPersonalizados = JSON.parse(localStorage.getItem('nombresPersonalizados')) || [];

function pedirNombres() {
  const cantidad = parseInt(document.getElementById("jugadores").value);
  const contenedorInputs = document.getElementById("inputs-nombres");
  contenedorInputs.innerHTML = "";

  for (let i = 1; i <= cantidad; i++) {
    const valor = nombresPersonalizados.length > 0 ? nombresPersonalizados[i - 1] || "" : "";
    const input = document.createElement("input");
    input.type = "text";
    input.name = `nombre${i}`;
    input.placeholder = `Jugador ${i}`;
    input.value = valor;
    contenedorInputs.appendChild(input);
  }

  // Mostrar pantalla de edición
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-editar-nombres").style.display = "block";


}


function reiniciarNombres() {
localStorage.removeItem('nombresPersonalizados');
localStorage.removeItem('jugadores');
localStorage.removeItem('impostores');
localStorage.removeItem('tematica');
localStorage.removeItem('duracion');
  nombresPersonalizados = [];

  // Mostrar cartel de confirmación
  document.getElementById('modalReinicio').style.display = 'flex';
}

function cerrarModalReinicio() {
  document.getElementById('modalReinicio').style.display = 'none';
  reiniciar(); // Esto llama a la función que ya usás para volver a la pantalla principal
}
document.getElementById("btnAyuda").addEventListener("click", () => {
  document.getElementById("modal").classList.add("active");
});

document.getElementById("btnCerrarModal").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("active");
});
document.getElementById("btnComenzarJuego").addEventListener("click", comenzarJuego);
document.getElementById("btnEditarNombres").addEventListener("click", pedirNombres);
document.getElementById("btnGuardarNombres").addEventListener("click", () => {
  const cantidad = parseInt(document.getElementById("jugadores").value);
  const nuevosNombres = [];

  for (let i = 0; i < cantidad; i++) {
    const valor = document.querySelector(`#inputs-nombres input[name="nombre${i + 1}"]`).value.trim();
    if (!valor) return alert("Todos los nombres son obligatorios");
    nuevosNombres.push(valor);
  }

  nombresPersonalizados = nuevosNombres;
  alert("Nombres listos para esta partida");
  reiniciar();
});


document.getElementById("btnCancelarEdicion").addEventListener("click", reiniciar);
document.getElementById("btnEliminarNombres").addEventListener("click", () => {
  localStorage.removeItem('nombresPersonalizados');
  nombresPersonalizados = [];
  alert("Nombres eliminados");
  reiniciar();
});

// ====== NUEVA FUNCIONALIDAD: SELECCIÓN DE TEMÁTICAS CON TARJETAS ======

// Variable global para almacenar las temáticas elegidas
window.tematicasSeleccionadas = [];

// Función para generar las tarjetas de temáticas
function generarTarjetasTematicas() {
  const contenedor = document.getElementById("lista-tematicas-cards");
  contenedor.innerHTML = "";

  // Crear un objeto de ejemplo de temáticas (reemplaza con tu famososPorTematica real)
  const tematicasEjemplo = {
    "actores": ["Leonardo DiCaprio", "Meryl Streep", "Tom Hanks", "Scarlett Johansson"],
    "cantantes": ["Taylor Swift", "Ed Sheeran", "Beyoncé", "Justin Bieber"],
    "deportistas": ["Lionel Messi", "Cristiano Ronaldo", "Serena Williams", "LeBron James"],
    "políticos": ["Barack Obama", "Angela Merkel", "Justin Trudeau", "Jacinda Ardern"],
    "youtubers": ["PewDiePie", "MrBeast", "Markiplier", "Emma Chamberlain"],
    "influencers": ["Kylie Jenner", "James Charles", "Charli D'Amelio", "Addison Rae"]
  };

  // Usar famososPorTematica si existe, sino usar el ejemplo
  const tematicas = typeof famososPorTematica !== 'undefined' ? famososPorTematica : tematicasEjemplo;

  Object.keys(tematicas).forEach((tematica, index) => {
    const cantidad = tematicas[tematica].length;
    const estaSeleccionada = window.tematicasSeleccionadas.includes(tematica);
    
    const tarjeta = document.createElement("div");
    tarjeta.className = `tematica-card ${estaSeleccionada ? 'selected' : ''}`;
    tarjeta.dataset.tematica = tematica;
    tarjeta.style.animationDelay = `${index * 0.05}s`;
    
    tarjeta.innerHTML = `
      <div class="tematica-name">${tematica.charAt(0).toUpperCase() + tematica.slice(1)}</div>
      <div class="tematica-count">${cantidad} famosos</div>
    `;
    
    // Evento de click para seleccionar/deseleccionar
    tarjeta.addEventListener('click', () => {
      const isSelected = tarjeta.classList.contains('selected');
      
      if (isSelected) {
        // Deseleccionar
        tarjeta.classList.remove('selected');
        window.tematicasSeleccionadas = window.tematicasSeleccionadas.filter(t => t !== tematica);
      } else {
        // Seleccionar
        tarjeta.classList.add('selected');
        window.tematicasSeleccionadas.push(tematica);
      }
      
      actualizarContadorSeleccionadas();
      actualizarBotonConfirmar();
    });
    
    contenedor.appendChild(tarjeta);
  });
}

// Función para actualizar el contador de temáticas seleccionadas
function actualizarContadorSeleccionadas() {
  const contador = document.getElementById("contador-seleccionadas");
  const cantidad = window.tematicasSeleccionadas.length;
  
  if (cantidad === 0) {
    contador.textContent = "0 temáticas seleccionadas";
    contador.style.color = "#6c757d";
  } else if (cantidad === 1) {
    contador.textContent = "1 temática seleccionada";
    contador.style.color = "#ff4757";
  } else {
    contador.textContent = `${cantidad} temáticas seleccionadas`;
    contador.style.color = "#ff4757";
  }
}

// Función para actualizar el estado del botón confirmar
function actualizarBotonConfirmar() {
  const boton = document.getElementById("btnConfirmarTematicas");
  const cantidad = window.tematicasSeleccionadas.length;
  
  if (cantidad === 0) {
    boton.disabled = true;
    boton.textContent = "Selecciona al menos una temática";
  } else {
    boton.disabled = false;
    boton.textContent = `Confirmar ${cantidad} temática${cantidad > 1 ? 's' : ''}`;
  }
}

// Función para mostrar la pantalla de selección de temáticas
function mostrarPantallaSeleccionTematicas() {
  generarTarjetasTematicas();
  actualizarContadorSeleccionadas();
  actualizarBotonConfirmar();
  
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "block";
}

// Función para actualizar el texto de temáticas seleccionadas en la pantalla inicial
function actualizarTextoTematicasSeleccionadas() {
  const texto = document.getElementById("tematicasSeleccionadasTexto");
  
  if (window.tematicasSeleccionadas.length === 0) {
    texto.textContent = "Ninguna temática seleccionada";
    texto.style.color = "#999";
  } else {
    const nombres = window.tematicasSeleccionadas.map(t => 
      t.charAt(0).toUpperCase() + t.slice(1)
    ).join(", ");
    texto.textContent = nombres;
    texto.style.color = "#333";
  }
}

// Event listeners para los botones de temáticas
document.getElementById("btnSeleccionarTematicas").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantallaSeleccionTematicas();
});

// Confirmar selección
document.getElementById("btnConfirmarTematicas").addEventListener("click", () => {
  if (window.tematicasSeleccionadas.length === 0) {
    alert("Debes seleccionar al menos una temática");
    return;
  }

  // Actualizar el texto en la pantalla inicial
  actualizarTextoTematicasSeleccionadas();

  // Volver a pantalla inicial
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});

// Cancelar selección
document.getElementById("btnCancelarTematicas").addEventListener("click", () => {
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});

// ====== FIN NUEVA FUNCIONALIDAD ======

});

// ====== Tema claro/oscuro con recordatorio y visibilidad por pantalla ======
(function () {
  const THEME_KEY = 'tema'; // 'claro' | 'oscuro'

  function applyTheme(theme) {
    const isDark = theme === 'oscuro';
    document.body.classList.toggle('tema-oscuro', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'oscuro' : 'claro');

    // Actualizar <meta name="theme-color"> para que combine con el tema (PWA / barra del navegador)
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      // usamos --surface para que la barra tome el color del "panel"
      const surface = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
      metaTheme.setAttribute('content', surface || (isDark ? '#151a22' : '#ffffff'));
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved ?? (systemPrefersDark ? 'oscuro' : 'claro'));
    updateThemeIcon();
  }

  function toggleTheme() {
    const isDark = !document.body.classList.contains('tema-oscuro');
    applyTheme(isDark ? 'oscuro' : 'claro');
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('btnTema');
    if (!btn) return;
    // Icono: si está oscuro, mostramos ☀️ para indicar que pasarías a claro; si está claro, 🌙
    const isDark = document.body.classList.contains('tema-oscuro');
    btn.textContent = isDark ? '☀️' : '🌙';
  }

  // Mostrar el botón SOLO cuando la pantalla de configuración está visible
  function updateThemeButtonVisibility() {
    const btn = document.getElementById('btnTema');
    const pantallaInicial = document.getElementById('pantalla-inicial');
    if (!btn || !pantallaInicial) return;

    const visible = getComputedStyle(pantallaInicial).display !== 'none';
    btn.style.display = visible ? 'flex' : 'none';
  }

  // Iniciar cuando cargue el DOM
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnTema');
    if (btn) btn.addEventListener('click', toggleTheme);

    initTheme();
    updateThemeButtonVisibility();

    // Observamos cambios en el árbol para detectar cuando cambiás de pantalla
    const main = document.getElementById('main');
    if (main) {
      const observer = new MutationObserver(updateThemeButtonVisibility);
      observer.observe(main, { attributes: true, childList: true, subtree: true });
    }

    // Por si algún estilo cambia por viewport
    window.addEventListener('resize', updateThemeButtonVisibility);
  });
  // =========================================================
// REGISTRO DEL SERVICE WORKER (PARA CAPACIDADES OFFLINE / PWA)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('✅ Service Worker registrado con éxito. Scope:', registration.scope);
        })
        .catch(error => {
          console.error('❌ Falló el registro del Service Worker:', error);
        });
    });
  }
});

})();