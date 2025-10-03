// Funcionalidad de multijugador para Quién Miente
class MultiplayerManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.currentRoom = null;
    this.playerName = '';
    this.isHost = false;
    this.gameState = 'menu'; // menu, lobby, revealing, playing, finished
    this.players = [];
    this.myRole = null;
    this.famoso = null;
    this.famosoData = null;
    this.timer = null;
    this.timerDuration = 0;
    this.timerRemaining = 0;
    this.wakeLock = null; 
  }
// En multiplayer.js, DENTRO de la clase MultiplayerManager
// (por ejemplo, después del constructor y antes de connect())

// ================= MÉTODOS WAKE LOCK =================

/**
 * Solicita al navegador que mantenga la pantalla encendida.
 */
async requestWakeLock() {
  // Comprueba si el navegador soporta la API
  if ('wakeLock' in navigator) {
    try {
      // Solicita el bloqueo de pantalla
      this.wakeLock = await navigator.wakeLock.request('screen');
      console.log('✅ Bloqueo de pantalla (Wake Lock) activado.');

      // Agrega un escuchador en caso de que el sistema fuerce la liberación (ej: el usuario presiona el botón de apagado)
      this.wakeLock.addEventListener('release', () => {
        console.log('⚠️ Bloqueo de pantalla (Wake Lock) liberado por el sistema.');
        this.wakeLock = null; // Limpia la referencia
      });
      
    } catch (err) {
      // Si el usuario niega el permiso o hay otro error
      console.error('❌ Error al solicitar Wake Lock:', err.name, err.message);
      // No mostramos alerta, solo es un extra de usabilidad
    }
  }
}

/**
 * Libera el bloqueo para que la pantalla pueda apagarse normalmente.
 */
releaseWakeLock() {
  if (this.wakeLock) {
    this.wakeLock.release(); // Libera la solicitud
    this.wakeLock = null;     // Limpia la referencia
    console.log('🚫 Bloqueo de pantalla (Wake Lock) liberado.');
  }
}
// ======================================================
  // Conectar al servidor
  connect() {
    if (this.isConnected) return;
    
    this.socket = window.socket;
    
    if (this.socket.connected) {
      this.isConnected = true;
      console.log('✅ Usando conexión Socket.IO existente');
    } else {
      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('✅ Conectado al servidor multijugador');
      });
    }

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('⚠️ Desconectado del servidor multijugador');
      this.showError('Conexión perdida con el servidor');
    });

    // Eventos del juego
    this.setupGameEvents();
  }

  setupGameEvents() {
    // Sala creada
    this.socket.on('room-created', (data) => {
      this.currentRoom = data.roomCode;
      this.isHost = true;
      this.players = data.players;
      this.showLobby();
      // ✅ INSERCIÓN: Activar el bloqueo
      this.requestWakeLock();
    });

    // Jugador se unió - FIX 1: Mostrar lobby cuando se une exitosamente
    this.socket.on('player-joined', (data) => {
      this.players = data.players;
      
      // Si soy el jugador que se acaba de unir, mostrar el lobby
      const myPlayer = this.players.find(p => p.name === this.playerName);
      if (myPlayer && !this.isHost) {
        this.showLobby();
        // ✅ INSERCIÓN: Activar el bloqueo
        this.requestWakeLock(); 
      } 
      
      this.showMessage(`${data.newPlayer} se unió a la sala`);
    });

    // Jugador se fue
    this.socket.on('player-left', (data) => {
      this.players = data.players;
      this.updatePlayersList();
      this.showMessage(`${data.leftPlayer} abandonó la sala`);
      
      // Verificar si soy el nuevo host
      const myPlayer = this.players.find(p => p.name === this.playerName);
      if (myPlayer && myPlayer.isHost) {
        this.isHost = true;
        this.updateHostControls();
      }
    });

    // Juego iniciado
    this.socket.on('game-started', (data) => {
      this.gameState = 'revealing';
      this.showRevealingPhase();
    });

    // Rol revelado - FIX PRINCIPAL: Mejorar manejo de datos del famoso
    this.socket.on('role-revealed', (data) => {
      console.log('🎯 Role revealed data received:', data);
      this.myRole = data.role;
      
      if (data.role === 'famoso') {
        this.famoso = data.famoso || 'Famoso Desconocido';
        this.famosoData = data.famosoData || {
          nombre: data.famoso || 'Famoso Desconocido',
          foto: 'img/default.jpg'
        };
        console.log('🎭 Famoso asignado:', this.famoso, 'Data:', this.famosoData);
      }
      
      this.showMyRole();
    });

    // Todos vieron su rol - FIX 2: Solo cuando todos presionen continuar
    this.socket.on('all-roles-seen', () => {
      this.gameState = 'playing';
      if (this.isHost) {
        this.showStartTimerButton();
      } else {
        this.showWaitingForHost();
      }
    });

    // Temporizador iniciado
    this.socket.on('timer-started', (data) => {
      this.startTimer(data.duration);
    });

    // Temporizador terminado
    this.socket.on('timer-finished', () => {
      this.showMessage('¡Tiempo terminado!');
      this.stopTimer();
    });

    // Ronda terminada
    this.socket.on('round-ended', () => {
      this.gameState = 'finished';
      this.showGameFinished();
    });

    // Juego reiniciado
    this.socket.on('game-restarted', (data) => {
      this.gameState = 'lobby';
      this.players = data.players;
      this.myRole = null;
      this.famoso = null;
      this.famosoData = null;
      this.stopTimer();
      this.showLobby();
    });

    // Errores
    this.socket.on('error', (message) => {
      this.showError(message);
    });
  }

  // FIX 3: Enviar datos de famosos al servidor de forma más robusta
  sendFamososData() {
    if (!this.isHost || !this.socket) return;
    // Asegurar que los datos estén disponibles
    const famososData = {
      famosos: window.famosos || [],
      famososPorTematica: window.famososPorTematica || {}
    };
    // Log explícito para depuración
    console.log('📤 Enviando datos de famosos al servidor:', {
      famososCount: famososData.famosos.length,
      tematicasCount: Object.keys(famososData.famososPorTematica).length,
      nombres: famososData.famosos.map(f => f.nombre)
    });
    if (!famososData.famosos.length) {
      alert('¡ATENCIÓN! La lista de famosos está vacía. Revisa famosos.js');
    }
    this.socket.emit('send-famosos-data', famososData);
  }

  // Crear sala
  createRoom(playerName) {
    if (!this.isConnected) {
      this.showError('No conectado al servidor');
      return;
    }
    
    this.playerName = playerName;
    this.socket.emit('create-room', playerName);
  }

  // Unirse a sala - FIX 1: Mejorar manejo de unión exitosa
  joinRoom(roomCode, playerName) {
    if (!this.isConnected) {
      this.showError('No conectado al servidor');
      return;
    }
    
    this.playerName = playerName;
    this.currentRoom = roomCode;
    this.socket.emit('join-room', { roomCode, playerName });
  }

  // Iniciar juego con configuración completa
  startGame() {
    if (!this.isHost || !this.currentRoom) return;
    
    // Enviar datos de famosos antes de iniciar el juego
    this.sendFamososData();
    
    // Esperar un momento para que lleguen los datos al servidor
    setTimeout(() => {
      const gameConfig = {
        jugadores: this.players.length,
        impostores: parseInt(document.getElementById("multiImpostores").value),
        duracion: parseInt(document.getElementById("multiDuracion").value),
        tematicasSeleccionadas: window.tematicasSeleccionadas || []
      };
      
      console.log('🎮 Iniciando juego con configuración:', gameConfig);
      this.socket.emit('start-game', gameConfig);
    }, 500);
  }

  // Ver mi rol
  revealMyRole() {
    this.socket.emit('reveal-role');
  }

  // FIX 2: Confirmar que vi mi rol y estoy listo para continuar
  confirmRoleSeen() {
    this.socket.emit('ready-to-continue');
    
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>Esperando otros jugadores...</h2>
        <p>Esperando que todos los jugadores vean su rol y estén listos</p>
        <div class="loader" style="margin: 20px auto;"></div>
      </div>
    `;
  }

  // Iniciar temporizador
  startGameTimer() {
    if (!this.isHost) return;
    this.socket.emit('start-timer');
  }

  // Terminar ronda
  endRound() {
    if (!this.isHost) return;
    this.socket.emit('end-round');
  }

  // Reiniciar juego
  restartGame() {
    if (!this.isHost) return;
    this.socket.emit('restart-game');
  }

  // Función para copiar código al portapapeles
  copyRoomCode() {
    if (!this.currentRoom) return;
    
    if (navigator.clipboard && window.isSecureContext) {
      // Usar la API moderna del portapapeles
      navigator.clipboard.writeText(this.currentRoom).then(() => {
        this.showMessage('¡Código copiado al portapapeles!');
      }).catch(() => {
        this.fallbackCopyTextToClipboard(this.currentRoom);
      });
    } else {
      // Fallback para navegadores más antiguos
      this.fallbackCopyTextToClipboard(this.currentRoom);
    }
  }

  // Método fallback para copiar texto
  fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        this.showMessage('¡Código copiado al portapapeles!');
      } else {
        this.showMessage(`Código: ${text} (copia manual)`);
      }
    } catch (err) {
      this.showMessage(`Código: ${text} (copia manual)`);
    }
    
    document.body.removeChild(textArea);
  }

  // UI Methods
  showMultiplayerMenu() {
    const pantallaMulti = document.getElementById('pantalla-multijugador');
    if (!pantallaMulti) {
      console.error('No se encontró #pantalla-multijugador en el DOM');
      return;
    }

    // Conectar al socket si no está conectado
    if (!this.isConnected) {
      this.connect();
    }

    // Ocultar la pantalla inicial y las demás
    const pantallaInicial = document.getElementById('pantalla-inicial');
    if (pantallaInicial) pantallaInicial.style.display = 'none';
    document.querySelectorAll('#main > div').forEach(div => {
      if (div.id !== 'pantalla-multijugador') div.style.display = 'none';
    });

    // Mostrar el contenedor multijugador y poblar su HTML
    pantallaMulti.style.display = 'block';
    pantallaMulti.innerHTML = `
      <div class="card">
        <h2>Multijugador Online</h2>
        <p>Juga con tus amigos, cada uno en su dispositivo</p>

        <div style="margin: 20px 0;">
          <input type="text" id="playerNameInput" placeholder="Tu nombre" maxlength="20" style="width:100%; margin-bottom:12px;">
        </div>

        <button id="btnCrearSalaMulti" style="margin: 10px 0;">Crear Sala</button>
        <button id="btnMostrarUnirseMulti" style="margin: 10px 0;">Unirse a Sala</button>
        <button id="btnVolverMenuMulti" style="margin: 10px 0; background: #6c757d;">Volver al Menú</button>
      </div>
    `;

    // Eventos
    const btnCrear = pantallaMulti.querySelector('#btnCrearSalaMulti');
    const btnUnirse = pantallaMulti.querySelector('#btnMostrarUnirseMulti');
    const btnVolver = pantallaMulti.querySelector('#btnVolverMenuMulti');

    if (btnCrear) btnCrear.addEventListener('click', () => this.showCreateRoom());
    if (btnUnirse) btnUnirse.addEventListener('click', () => this.showJoinRoom());
    if (btnVolver) btnVolver.addEventListener('click', () => this.backToMainMenu());
  }

  showCreateRoom() {
    const playerName = document.getElementById('playerNameInput').value.trim();
    if (!playerName) {
      this.showError('Ingresa tu nombre');
      return;
    }
    
    if (!this.isConnected) {
      this.connect();
      // Esperar un momento para la conexión
      setTimeout(() => {
        this.createRoom(playerName);
      }, 1000);
    } else {
      this.createRoom(playerName);
    }
  }

  showJoinRoom() {
    const playerName = document.getElementById('playerNameInput').value.trim();
    if (!playerName) {
      this.showError('Ingresa tu nombre');
      return;
    }
    
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>Unirse a Sala</h2>
        
        <div style="margin: 20px 0;">
          <input type="text" id="roomCodeInput" placeholder="Código de sala" maxlength="6" style="width: 100%; margin-bottom: 15px; text-transform: uppercase;">
        </div>
        
        <button onclick="multiplayerManager.joinRoomWithCode('${playerName}')" style="margin: 10px 0;">
          Unirse
        </button>
        
        <button onclick="multiplayerManager.showMultiplayerMenu()" style="margin: 10px 0; background: #6c757d;">
          Volver
        </button>
      </div>
    `;
  }

  joinRoomWithCode(playerName) {
    const roomCode = document.getElementById('roomCodeInput').value.trim().toUpperCase();
    if (!roomCode) {
      this.showError('Ingresa el código de sala');
      return;
    }
    
    if (!this.isConnected) {
      this.connect();
      setTimeout(() => {
        this.joinRoom(roomCode, playerName);
      }, 1000);
    } else {
      this.joinRoom(roomCode, playerName);
    }
  }

  showLobby() {
    // Enviar datos de famosos cuando se muestra el lobby (si es host)
    if (this.isHost) {
      this.sendFamososData();
    }
    
    const container = document.getElementById('main');
    const hostControls = this.isHost ? `
      <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
        <h3>Configuración del Juego</h3>
        
        <label for="multiImpostores">Número de impostores:</label>
        <select id="multiImpostores" style="margin-bottom: 10px;"></select>
        
        <label for="multiDuracion">Duración de la ronda (minutos):</label>
        <select id="multiDuracion" style="margin-bottom: 10px;"></select>
        
        <label>Temáticas:</label>
        <div style="margin: 10px 0;">
          <button id="btnSeleccionarTematicasMulti" style="margin-bottom: 10px;">Elegir temáticas</button>
          <div id="tematicasSeleccionadasMulti" style="font-size: 0.9rem; color: #666;">
            Ninguna temática seleccionada
          </div>
        </div>
        
        <button onclick="multiplayerManager.startGame()" style="margin-top: 15px;">
          Iniciar Juego
        </button>
      </div>
    ` : `
      <div style="margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px;">
        <p>Esperando que el host inicie el juego...</p>
      </div>
    `;
    
    container.innerHTML = `
      <div class="card">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <h2 style="margin: 0;">Sala: ${this.currentRoom}</h2>
          <button onclick="multiplayerManager.copyRoomCode()" style="margin: 0; padding: 8px 12px; font-size: 0.9rem; background: #28a745; min-width: auto; width: auto;">
            📋 Copiar
          </button>
        </div>
        <p style="font-size: 0.9rem; color: #666;">Comparte este código con tus amigos</p>
        
        <div id="playersList" style="margin: 20px 0;">
          <h3>Jugadores (${this.players.length})</h3>
          <div id="playersContainer"></div>
        </div>
        
        ${hostControls}
        
        <button onclick="multiplayerManager.leaveLobby()" style="margin: 10px 0; background: #dc3545;">
          Salir de la Sala
        </button>
      </div>
    `;
    
    this.updatePlayersList();
    
    if (this.isHost) {
      this.setupHostControls();
      this.setupThemeSelection();
    }
  }

  setupHostControls() {
    const impostoresSelect = document.getElementById('multiImpostores');
    const duracionSelect = document.getElementById('multiDuracion');
    
    // Llenar opciones de impostores
    impostoresSelect.innerHTML = '';
    for (let i = 1; i < this.players.length; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      if (i === 1) option.selected = true;
      impostoresSelect.appendChild(option);
    }
    
    // Llenar opciones de duración
    duracionSelect.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i + (i === 1 ? ' minuto' : ' minutos');
      if (i === 3) option.selected = true;
      duracionSelect.appendChild(option);
    }
  }

  setupThemeSelection() {
    const btnTematicas = document.getElementById('btnSeleccionarTematicasMulti');
    if (btnTematicas) {
      btnTematicas.addEventListener('click', () => {
        this.showThemeSelectionMulti();
      });
    }
  }

  showThemeSelectionMulti() {
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>Selecciona las temáticas</h2>
        <p class="subtitle">Toca las temáticas que quieras incluir en el juego</p>
        
        <div id="lista-tematicas-cards-multi" class="tematicas-grid">
          <!-- Las tarjetas se generarán dinámicamente aquí -->
        </div>

        <div class="selected-counter">
          <span id="contador-seleccionadas-multi">0 temáticas seleccionadas</span>
        </div>

        <div style="margin-top: 20px;">
          <button id="btnConfirmarTematicasMulti" class="btn-primary">Confirmar selección</button>
          <button onclick="multiplayerManager.showLobby()" class="btn-secondary" style="margin-top: 10px;">Cancelar</button>
        </div>
      </div>
    `;

    this.generateThemeCardsMulti();
  }

  generateThemeCardsMulti() {
    const contenedor = document.getElementById("lista-tematicas-cards-multi");
    contenedor.innerHTML = "";

    // Usar famososPorTematica si existe
    const tematicas = window.famososPorTematica || {};

    Object.keys(tematicas).forEach((tematica, index) => {
      const cantidad = tematicas[tematica].length;
      const estaSeleccionada = (window.tematicasSeleccionadas || []).includes(tematica);
      
      const tarjeta = document.createElement("div");
      tarjeta.className = `tematica-card ${estaSeleccionada ? 'selected' : ''}`;
      tarjeta.dataset.tematica = tematica;
      
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
          window.tematicasSeleccionadas = (window.tematicasSeleccionadas || []).filter(t => t !== tematica);
        } else {
          // Seleccionar
          tarjeta.classList.add('selected');
          window.tematicasSeleccionadas = window.tematicasSeleccionadas || [];
          window.tematicasSeleccionadas.push(tematica);
        }
        
        this.updateThemeCounterMulti();
      });
      
      contenedor.appendChild(tarjeta);
    });

    this.updateThemeCounterMulti();

    // Configurar botón confirmar
    const btnConfirmar = document.getElementById('btnConfirmarTematicasMulti');
    if (btnConfirmar) {
      btnConfirmar.addEventListener('click', () => {
        this.showLobby();
        this.updateThemeTextMulti();
      });
    }
  }

  updateThemeCounterMulti() {
    const contador = document.getElementById("contador-seleccionadas-multi");
    const cantidad = (window.tematicasSeleccionadas || []).length;
    
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

  updateThemeTextMulti() {
    const texto = document.getElementById("tematicasSeleccionadasMulti");
    if (!texto) return;
    
    if (!window.tematicasSeleccionadas || window.tematicasSeleccionadas.length === 0) {
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

  updatePlayersList() {
    const container = document.getElementById('playersContainer');
    if (!container) return;
    
    container.innerHTML = this.players.map(player => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; margin: 5px 0; background: white; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <span>${player.name}</span>
        ${player.isHost ? '<span style="color: #ff4757; font-weight: bold;">HOST</span>' : ''}
      </div>
    `).join('');
    
    // Actualizar contador
    const playersTitle = document.querySelector('#playersList h3');
    if (playersTitle) {
      playersTitle.textContent = `Jugadores (${this.players.length})`;
    }
  }

  updateHostControls() {
    if (this.isHost && document.getElementById('multiImpostores')) {
      this.setupHostControls();
    }
  }

  showRevealingPhase() {
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>¡El juego ha comenzado!</h2>
        <p>Toca el botón para ver tu rol</p>
        <p style="font-size: 0.9rem; color: #666;">Asegúrate de que nadie más pueda ver tu pantalla</p>
        
        <button onclick="multiplayerManager.revealMyRole()" style="margin: 20px 0; font-size: 1.2rem; padding: 15px;">
          Ver Mi Rol
        </button>
      </div>
    `;
  }

  showMyRole() {
    const container = document.getElementById('main');
    
    if (this.myRole === 'impostor') {
      container.innerHTML = `
        <div class="card">
          <h2><span class="nombre-jugador">${this.playerName}</span></h2>
          <div style="width: 52vw; max-width: 290px; height: 280px; overflow: hidden; background: white; padding: 0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; margin: 20px auto;">
            <img src="img/impostor.jpg" alt="Impostor" style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px;">
          </div>
          <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: red;">
            IMPOSTOR
          </p>
          
          <div style="margin-top: 20px;">
            <button onclick="multiplayerManager.confirmRoleSeen()" style="margin: 10px 0; font-size: 1.1rem; padding: 12px;">
              Continuar
            </button>
          </div>
        </div>
      `;
    } else {
      // FIX PRINCIPAL: Usar los datos del famoso recibidos del servidor de forma más robusta
      const foto = this.famosoData?.foto || 'img/default.jpg';
      const nombre = this.famosoData?.nombre || this.famoso || 'Famoso Desconocido';
      
      console.log('🎭 Mostrando famoso:', nombre, 'Foto:', foto);
      
      container.innerHTML = `
        <div class="card">
          <h2><span class="nombre-jugador">${this.playerName}</span></h2>
          <div style="width: 52vw; max-width: 290px; height: 280px; overflow: hidden; background: white; padding: 0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; margin: 20px auto;">
            <div class="loader"></div>
            <img src="${foto}" alt="${nombre}" style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display:none;" onerror="this.src='img/default.jpg'">
          </div>
          <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: #2ecc71;">
            ${nombre}
          </p>
          
          <div style="margin-top: 20px;">
            <button onclick="multiplayerManager.confirmRoleSeen()" style="margin: 10px 0; font-size: 1.1rem; padding: 12px;">
              Continuar
            </button>
          </div>
        </div>
      `;
      
      // Manejar carga de imagen
      const imgEl = container.querySelector('img');
      const loaderEl = container.querySelector('.loader');
      
      if (imgEl) {
        imgEl.addEventListener('load', () => {
          if (loaderEl) loaderEl.style.display = 'none';
          imgEl.style.display = 'block';
        });

        imgEl.addEventListener('error', () => {
          if (loaderEl) loaderEl.style.display = 'none';
          imgEl.src = 'img/default.jpg';
          imgEl.style.display = 'block';
        });
        
        // Si la imagen ya está cargada
        if (imgEl.complete && imgEl.naturalWidth !== 0) {
          if (loaderEl) loaderEl.style.display = 'none';
          imgEl.style.display = 'block';
        }
      }
    }
  }

  showStartTimerButton() {
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>¡Todos han visto su rol!</h2>
        <p>Como host, puedes iniciar el temporizador cuando estén listos para jugar</p>
        
        <button onclick="multiplayerManager.startGameTimer()" style="margin: 20px 0; font-size: 1.2rem; padding: 15px;">
          Iniciar Temporizador
        </button>
      </div>
    `;
  }

  showWaitingForHost() {
    const container = document.getElementById('main');
    container.innerHTML = `
      <div class="card">
        <h2>¡Todos han visto su rol!</h2>
        <p>Esperando que el host inicie el temporizador...</p>
        <div class="loader" style="margin: 20px auto;"></div>
      </div>
    `;
  }

  startTimer(duration) {
    this.timerDuration = duration;
    this.timerRemaining = duration;
    
    const container = document.getElementById('main');
    const endButton = this.isHost ? `
      <button onclick="multiplayerManager.endRound()" style="margin-top: 20px;">
        Terminar Ronda
      </button>
    ` : '';
    
    container.innerHTML = `
      <div class="card" style="text-align:center;">
        <h2>⏳ ¡Empieza la ronda!</h2>
        <div class="timer-container">
          <svg>
            <circle class="circle-bg" cx="100" cy="100" r="90"></circle>
            <circle class="circle-progress" cx="100" cy="100" r="90" stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
          </svg>
          <div class="timer-text" id="tiempoRonda">${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}</div>
        </div>
        <p>¡A jugar! Hagan preguntas y traten de descubrir a los impostores</p>
        ${endButton}
      </div>
    `;
    
    const circle = container.querySelector('.circle-progress');
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = circumference;
    
    this.timer = setInterval(() => {
      this.timerRemaining--;
      
      const minutes = Math.floor(this.timerRemaining / 60);
      const seconds = this.timerRemaining % 60;
      const tiempoFormateado = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      const tiempoEl = document.getElementById("tiempoRonda");
      if (tiempoEl) {
        tiempoEl.textContent = tiempoFormateado;
        
        const progreso = circumference - (this.timerRemaining / this.timerDuration) * circumference;
        circle.style.strokeDashoffset = progreso;
        
        if (this.timerRemaining <= 30) {
          tiempoEl.classList.add('warning');
          circle.style.stroke = '#e84118';
        } else {
          tiempoEl.classList.remove('warning');
          circle.style.stroke = '#ff4757';
        }
      }
      
      if (this.timerRemaining <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  showGameFinished() {
    const container = document.getElementById('main');
    const hostControls = this.isHost ? `
      <button onclick="multiplayerManager.restartGame()" style="margin: 10px 0;">
        Jugar Otra Vez
      </button>
      <button onclick="multiplayerManager.leaveLobby()" style="margin: 10px 0; background: #dc3545;">
        Salir de la Sala
      </button>
    ` : `
      <p>Esperando que el host decida si jugar otra vez...</p>
      <button onclick="multiplayerManager.leaveLobby()" style="margin: 10px 0; background: #dc3545;">
        Salir de la Sala
      </button>
    `;
    
    container.innerHTML = `
      <div class="card">
        <h2>¡Ronda Terminada!</h2>
        <p>¿Pudieron descubrir a los impostores?</p>
        <p>Ahora pueden discutir y votar</p>
        
        ${hostControls}
      </div>
    `;
  }

  leaveLobby() {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.reset();
    this.backToMainMenu();
  }

  backToMainMenu() {
    const container = document.getElementById('main');

    // Mostrar solo la pantalla inicial
    const pantallaInicial = document.getElementById('pantalla-inicial');
    if (pantallaInicial) pantallaInicial.style.display = 'block';

    // Ocultar las demás pantallas dentro de #main
    document.querySelectorAll('#main > div').forEach(div => {
      if (div.id !== 'pantalla-inicial') {
        div.style.display = 'none';
      }
    });

    // Limpiar el contenido dinámico que pueda haber en la pantalla multijugador
    const pantallaMulti = document.getElementById('pantalla-multijugador');
    if (pantallaMulti) {
      pantallaMulti.style.display = 'none';
      pantallaMulti.innerHTML = '';
    }

    // Limpiar tarjetas temporales que puedan quedar
    container.querySelectorAll('.card, .game-fixed').forEach(el => el.remove());
  }

  reset() {
    this.currentRoom = null;
    this.playerName = '';
    this.isHost = false;
    this.gameState = 'menu';
    this.players = [];
    this.myRole = null;
    this.famoso = null;
    this.famosoData = null;
    this.stopTimer();
    this.isConnected = false;
  // ✅ INSERCIÓN: Liberar el bloqueo de pantalla
    this.releaseWakeLock(); 
  }

  showError(message) {
    alert(message);
  }

  showMessage(message) {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4757;
      color: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 10000;
      font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}

// Instancia global del manager
const multiplayerManager = new MultiplayerManager();