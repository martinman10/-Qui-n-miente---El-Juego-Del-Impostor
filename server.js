const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
// AÑADE pingInterval y pingTimeout
// En server.js, modifica la configuración de io:
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  // Mantenemos un intervalo de ping razonable
  pingInterval: 25000, 
  // ¡Aumenta el tiempo de espera a 2 minutos! (120,000 milisegundos)
  pingTimeout: 120000 
});


app.use(express.static(path.join(__dirname,)));

// Almacén de salas en memoria
const rooms = new Map();

// Agrega aquí la función:
function normalizarNombre(nombre) {
  return nombre
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

io.on('connection', (socket) => {
  // ...resto del código...
  // Mover la lógica de búsqueda de famoso dentro de 'start-game' y guardar el objeto completo para todos los jugadores
  console.log('Usuario conectado:', socket.id);

  // Crear sala
  socket.on('create-room', (playerName) => {
    const roomCode = generateRoomCode();
    const room = {
      code: roomCode,
      host: socket.id,
      players: [{
        id: socket.id,
        name: playerName,
        isHost: true,
        role: null,
        hasSeenRole: false,
        readyToContinue: false
      }],
      gameStarted: false,
      gameConfig: null,
      currentPlayerIndex: 0,
      gamePhase: 'waiting', // waiting, revealing, playing, finished
      famososData: null // Para almacenar los datos de famosos del cliente
    };
    
    rooms.set(roomCode, room);
    socket.join(roomCode);
    socket.roomCode = roomCode;
    
    socket.emit('room-created', { roomCode, players: room.players });
    console.log(`Sala creada: ${roomCode} por ${playerName}`);
  });

  // Recibir datos de famosos del cliente (bien ubicado, solo una vez)
  socket.on('send-famosos-data', (data) => {
    // Iniciar juego
    socket.on('start-game', (gameConfig) => {
      const roomCode = socket.roomCode;
      const room = rooms.get(roomCode);
      if (!room || room.host !== socket.id) {
        socket.emit('error', 'No tienes permisos para iniciar el juego');
        return;
      }
      if (room.players.length < 3) {
        socket.emit('error', 'Se necesitan al menos 3 jugadores');
        return;
      }
      // Asignar roles
      const totalPlayers = room.players.length;
      const numImpostors = Math.min(gameConfig.impostores, totalPlayers - 1);
      // Seleccionar impostores aleatoriamente
      const playerIndices = Array.from({ length: totalPlayers }, (_, i) => i);
      const impostorIndices = [];
      for (let i = 0; i < numImpostors; i++) {
        const randomIndex = Math.floor(Math.random() * playerIndices.length);
        impostorIndices.push(playerIndices.splice(randomIndex, 1)[0]);
      }
      // Seleccionar famoso aleatorio y guardar el objeto completo
      let famosoElegido = null;
      if (room.famososData && room.famososData.famosos && room.famososData.famososPorTematica) {
        let famososDisponibles = [];
        if (gameConfig.tematicasSeleccionadas && gameConfig.tematicasSeleccionadas.length > 0) {
          gameConfig.tematicasSeleccionadas.forEach(tematica => {
            if (room.famososData.famososPorTematica[tematica]) {
              famososDisponibles = famososDisponibles.concat(room.famososData.famososPorTematica[tematica]);
            }
          });
        } else {
          Object.keys(room.famososData.famososPorTematica).forEach(tematica => {
            if (tematica !== 'todos') {
              famososDisponibles = famososDisponibles.concat(room.famososData.famososPorTematica[tematica]);
            }
          });
        }
        // Eliminar duplicados
        famososDisponibles = [...new Set(famososDisponibles)];
        if (famososDisponibles.length > 0) {
          const nombreElegido = famososDisponibles[Math.floor(Math.random() * famososDisponibles.length)];
          // Buscar el objeto completo del famoso
          famosoElegido = room.famososData.famosos.find(f => normalizarNombre(f.nombre) === normalizarNombre(nombreElegido));
          if (!famosoElegido) {
            // Si no se encuentra, buscar por inclusión parcial
            famosoElegido = room.famososData.famosos.find(f => normalizarNombre(f.nombre).includes(normalizarNombre(nombreElegido)));
          }
        }
      }
      // Fallback total
      if (!famosoElegido) {
        famosoElegido = { nombre: 'Famoso Desconocido', foto: 'img/default.jpg' };
      }
      console.log('🎯 Famoso elegido para el juego:', famosoElegido);
      // Asignar roles a jugadores y guardar el famoso completo en cada jugador
      room.players.forEach((player, index) => {
        if (impostorIndices.includes(index)) {
          player.role = 'impostor';
          player.famoso = null;
          player.famosoData = null;
        } else {
          player.role = 'famoso';
          player.famoso = famosoElegido.nombre;
          player.famosoData = famosoElegido;
        }
        player.hasSeenRole = false;
        player.readyToContinue = false;
      });
      room.gameStarted = true;
      room.gameConfig = gameConfig;
      room.gamePhase = 'revealing';
      room.currentPlayerIndex = 0;
      // Notificar inicio del juego
      io.to(roomCode).emit('game-started', {
        totalPlayers: totalPlayers,
        gamePhase: 'revealing'
      });
      console.log(`🎮 Juego iniciado en sala ${roomCode} con ${totalPlayers} jugadores`);
      console.log('👥 Roles asignados:', room.players.map(p => ({ name: p.name, role: p.role, famoso: p.famoso })));
    });

    if (room.famososData && room.famososData.famosos && room.famososData.famososPorTematica) {
      let famososDisponibles = [];

      // Si hay temáticas seleccionadas, usar solo esas
      if (gameConfig.tematicasSeleccionadas && gameConfig.tematicasSeleccionadas.length > 0) {
        gameConfig.tematicasSeleccionadas.forEach(tematica => {
          if (room.famososData.famososPorTematica[tematica]) {
            famososDisponibles = famososDisponibles.concat(room.famososData.famososPorTematica[tematica]);
          }
        });
      } else {
        // Si no hay temáticas seleccionadas, usar todas excepto "todos"
        Object.keys(room.famososData.famososPorTematica).forEach(tematica => {
          if (tematica !== 'todos') {
            famososDisponibles = famososDisponibles.concat(room.famososData.famososPorTematica[tematica]);
          }
        });
      }

      // Eliminar duplicados
      famososDisponibles = [...new Set(famososDisponibles)];

      if (famososDisponibles.length > 0) {
        const nombreElegido = famososDisponibles[Math.floor(Math.random() * famososDisponibles.length)];

        // Logs para depuración de nombres
        console.log('Buscando famoso:', nombreElegido);
        const listaFamosos = room.famososData.famosos.map(f => f.nombre);
        console.log('Lista de famosos:', listaFamosos);
        // Buscar el famoso completo con foto usando comparación flexible
        famosoElegido = room.famososData.famosos.find(f => 
          normalizarNombre(f.nombre) === normalizarNombre(nombreElegido)
        );
        if (!famosoElegido) {
          // Mostrar los nombres que no coinciden
          const diferencias = listaFamosos.map(n => ({
            original: n,
            normalizado: normalizarNombre(n)
          }));
          console.log('No se encontró famoso exacto para:', nombreElegido, 'normalizado:', normalizarNombre(nombreElegido));
          console.log('Nombres normalizados en la lista:', diferencias);
          famosoElegido = { nombre: nombreElegido, foto: 'img/default.jpg' };
        }
      }
    }

    // Fallback total
    if (!famosoElegido) {
      famosoElegido = { nombre: 'Famoso Desconocido', foto: 'img/default.jpg' };
    }

    console.log('🎯 Famoso elegido para el juego:', famosoElegido);
    
    // Asignar roles a jugadores
    room.players.forEach((player, index) => {
      if (impostorIndices.includes(index)) {
        player.role = 'impostor';
      } else {
        player.role = 'famoso';
        player.famoso = famosoElegido.nombre;
        player.famosoData = famosoElegido;
      }
      player.hasSeenRole = false;
      player.readyToContinue = false;
    });
    
    room.gameStarted = true;
    room.gameConfig = gameConfig;
    room.gamePhase = 'revealing';
    room.currentPlayerIndex = 0;
    
    // Notificar inicio del juego
    io.to(roomCode).emit('game-started', {
      totalPlayers: totalPlayers,
      gamePhase: 'revealing'
    });
    
    console.log(`🎮 Juego iniciado en sala ${roomCode} con ${totalPlayers} jugadores`);
    console.log('👥 Roles asignados:', room.players.map(p => ({ name: p.name, role: p.role, famoso: p.famoso })));
  });

  // Jugador ve su rol
  socket.on('reveal-role', () => {
    const roomCode = socket.roomCode;
    const room = rooms.get(roomCode);

    if (!room || !room.gameStarted) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    player.hasSeenRole = true;

    // Enviar rol al jugador
    if (player.role === 'impostor') {
      console.log('🎭 Revealed impostor:', player.name);
      socket.emit('role-revealed', { role: 'impostor' });
    } else {
      console.log('🎯 Revealed famoso:', player.name, 'Famoso:', player.famoso, 'Data:', player.famosoData);
      
      // MEJORAR: Asegurar que enviamos datos completos y válidos
      const responseData = { 
        role: 'famoso', 
        famoso: player.famoso || 'Famoso Desconocido',
        famosoData: {
          nombre: player.famosoData?.nombre || player.famoso || 'Famoso Desconocido',
          foto: player.famosoData?.foto || 'img/default.jpg'
        }
      };
      
      console.log('📤 Sending data to client:', responseData);
      socket.emit('role-revealed', responseData);
    }
  });

  // FIX 2: Jugador confirma que vio su rol y está listo para continuar
  socket.on('ready-to-continue', () => {
    const roomCode = socket.roomCode;
    const room = rooms.get(roomCode);
    
    if (!room || !room.gameStarted) return;
    
    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;
    
    player.readyToContinue = true;
    
    // Verificar si todos están listos para continuar
    const allReady = room.players.every(p => p.readyToContinue);
    if (allReady) {
      room.gamePhase = 'playing';
      io.to(roomCode).emit('all-roles-seen');
      console.log('✅ Todos los jugadores han visto su rol en sala', roomCode);
    }
  });

  // Iniciar temporizador de juego
  socket.on('start-timer', () => {
    const roomCode = socket.roomCode;
    const room = rooms.get(roomCode);
    
    if (!room || room.host !== socket.id || room.gamePhase !== 'playing') return;
    
    const duration = room.gameConfig.duracion * 60; // convertir a segundos
    
    io.to(roomCode).emit('timer-started', { duration });
    console.log(`⏰ Temporizador iniciado en sala ${roomCode} por ${duration} segundos`);
    
    // Temporizador del servidor
    setTimeout(() => {
      if (rooms.has(roomCode)) {
        io.to(roomCode).emit('timer-finished');
        console.log(`⏰ Temporizador terminado en sala ${roomCode}`);
      }
    }, duration * 1000);
  });

  // Terminar ronda
  socket.on('end-round', () => {
    const roomCode = socket.roomCode;
    const room = rooms.get(roomCode);
    
    if (!room || room.host !== socket.id) return;
    
    room.gamePhase = 'finished';
    io.to(roomCode).emit('round-ended');
    console.log(`🏁 Ronda terminada en sala ${roomCode}`);
  });

  // Reiniciar juego
  socket.on('restart-game', () => {
    const roomCode = socket.roomCode;
    const room = rooms.get(roomCode);
    
    if (!room || room.host !== socket.id) return;
    
    // Resetear estado del juego
    room.gameStarted = false;
    room.gamePhase = 'waiting';
    room.players.forEach(player => {
      player.role = null;
      player.hasSeenRole = false;
      player.readyToContinue = false;
      player.famoso = null;
      player.famosoData = null;
    });
    
    io.to(roomCode).emit('game-restarted', { players: room.players });
    console.log(`🔄 Juego reiniciado en sala ${roomCode}`);
  });

  // Desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
    
    const roomCode = socket.roomCode;
    if (roomCode && rooms.has(roomCode)) {
      const room = rooms.get(roomCode);
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      
      if (playerIndex !== -1) {
        const disconnectedPlayer = room.players[playerIndex];
        room.players.splice(playerIndex, 1);
        
        if (room.players.length === 0) {
          // Eliminar sala si no quedan jugadores
          rooms.delete(roomCode);
          console.log(`🗑️ Sala ${roomCode} eliminada - sin jugadores`);
        } else {
          // Si el host se desconecta, asignar nuevo host
          if (disconnectedPlayer.isHost && room.players.length > 0) {
            room.players[0].isHost = true;
            room.host = room.players[0].id;
            console.log(`👑 Nuevo host asignado en sala ${roomCode}:`, room.players[0].name);
          }
          
          // Notificar a los jugadores restantes
          io.to(roomCode).emit('player-left', { 
            players: room.players,
            leftPlayer: disconnectedPlayer.name 
          });
        }
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});