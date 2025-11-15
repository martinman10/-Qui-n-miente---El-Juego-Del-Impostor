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


// =========================================================
// INSERCIÓN EN server.js (Después de 'rooms' y 'normalizarNombre')
// Importar los famosos y temáticas para que el servidor maneje la selección
// =========================================================
const { famosos: todosLosFamosos } = require('./famosos');
const { famososPorTematica } = require('./tematicas');

// Almacén de salas en memoria
const rooms = new Map(); // Esta línea ya debería estar
// ... y aquí va el resto de tu código

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
    
   // =========================================================
  // REEMPLAZO COMPLETO: Evento 'start-game'
  // El servidor selecciona el famoso, asigna roles y notifica a cada cliente.
  // =========================================================
  socket.on('start-game', ({ roomCode, maxImpostores, duracion, tematica }) => {
    const room = rooms.get(roomCode);
    
    if (!room || room.host !== socket.id) {
      return socket.emit('error', 'No tienes permiso para iniciar el juego o la sala no existe.');
    }

    // 1. Obtener la lista de famosos de la temática seleccionada (del archivo tematicas.js)
    const famososDisponibles = famososPorTematica[tematica];

    if (!famososDisponibles || famososDisponibles.length === 0) {
        // Enviar error al host
        return socket.emit('error', `La temática "${tematica}" no tiene famosos disponibles.`);
    }
    
    // 2. Seleccionar UN famoso de la lista (el que será el impostor/falso)
    const famosoNombre = famososDisponibles[Math.floor(Math.random() * famososDisponibles.length)];
    
    // 3. Buscar el objeto completo del famoso (con la foto) (del archivo famosos.js)
    const famosoSeleccionado = todosLosFamosos.find(f => f.nombre === famosoNombre);

    if (!famosoSeleccionado) {
         // Error de sincronización si el nombre no existe en el objeto completo
         return socket.emit('error', 'Error interno: Famoso seleccionado no encontrado.');
    }
    
    // 4. Asignar roles y el famoso a cada jugador
    const players = room.players;
    const playersCount = players.length;
    // Asegura que no haya más impostores que jugadores - 1
    const impostoresCount = Math.min(maxImpostores, playersCount - 1); 
    
    // Mezcla de jugadores para asignar roles al azar
    const shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < playersCount; i++) {
      const player = shuffledPlayers[i];
      // Asigna rol: 'impostor' para los primeros, 'civil' para el resto
      player.role = i < impostoresCount ? 'impostor' : 'civil';
      // Asignar el objeto del famoso a cada jugador
      player.famoso = famosoSeleccionado; 
    }
    
    // 5. Actualizar la sala y notificar
    room.state = 'playing';
    room.famoso = famosoSeleccionado; // Guardar el famoso en la sala (para consultas futuras)
    room.duration = duracion; // Guardar la duración

    // Notificar a TODOS en la sala que el juego ha comenzado
    io.to(roomCode).emit('game-started', { 
      players: players.map(p => ({ id: p.id, name: p.name, isHost: p.isHost })), 
      duration: duracion,
      gameState: 'playing'
    });
    
    // 6. Enviar a CADA jugador su rol y el famoso (mensaje privado)
    // El impostor ve al civil. El civil ve al famoso real.
    shuffledPlayers.forEach(player => {
      io.to(player.id).emit('your-role', {
        role: player.role,
        famoso: player.famoso // Enviar objeto completo (nombre y foto)
      });
    });

    console.log(`▶️ Juego iniciado en sala ${roomCode}: Famoso: ${famosoSeleccionado.nombre}, Impostores: ${impostoresCount}`);
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