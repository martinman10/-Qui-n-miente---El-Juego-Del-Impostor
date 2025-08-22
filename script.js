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
  
   const famosos = [
  { nombre: "Alex Pelao", foto: "img/alex_pelao.jpg" },
  { nombre: "Marcos Da Costa", foto: "img/marcosdacosta.jpg" },
  { nombre: "The La Planta", foto: "img/thelaplanta.jpg" },
  { nombre: "El Zaraza", foto: "img/zaraza.jpg" },  
  { nombre: "Momi Giardina", foto: "img/momi.jpg" },
  { nombre: "Marito Baracus", foto: "img/marito_baracus.jpg" },
  { nombre: "Chano", foto: "img/chano.jpg" },
  { nombre: "El Tano Pasman", foto: "img/tanopasman.jpg" },
  { nombre: "Santi Maratea", foto: "img/santimaratea.jpg" },
  { nombre: "Santiago del Moro", foto: "img/delmoro.jpg" },
  { nombre: "Rafa Cotelo", foto: "img/cotelo.jpg" },
  { nombre: "Sebastián Abreu", foto: "img/abreu.jpg" },
  { nombre: "Diego Lugano", foto: "img/lugano.jpg" },
  { nombre: "Peso Pluma", foto: "img/pesopluma.jpg" },
  { nombre: "Eladio Carrión", foto: "img/eladio.jpg" },
  { nombre: "Myke Towers", foto: "img/myketowers.jpg" },
  { nombre: "Mauro Icardi", foto: "img/mauro_icardi.jpg" },
  { nombre: "Nicolás de la Cruz", foto: "img/nicolas_de_la_cruz.jpg" },
  { nombre: "Luis Suárez", foto: "img/luis_suarez.jpg" },
  { nombre: "Lionel Messi", foto: "img/lionel_messi.jpg" },
  { nombre: "Diego Forlán", foto: "img/diego_forlan.jpg" },
  { nombre: "Cristiano Ronaldo", foto: "img/cristiano_ronaldo.jpg" },
  { nombre: "Keylor Navas", foto: "img/keylor_navas.jpg" },
  { nombre: "Manuel Neuer", foto: "img/manuel_neuer.jpg" },
  { nombre: "Martín Palermo", foto: "img/martin_palermo.jpg" },
  { nombre: "Luciano Boggio", foto: "img/boggio.jpg" },
  { nombre: "Nico López", foto: "img/nico_lopez.jpg" },
  { nombre: "Gonzalo Petit", foto: "img/petit.jpg" },
  { nombre: "Eduardo Vargas", foto: "img/eduardo_vargas.jpg" },
  { nombre: "Gonzalo Carneiro", foto: "img/carneiro.jpg" },
  { nombre: "Luis Mejía", foto: "img/mejia.jpg" },
  { nombre: "Diego Maradona", foto: "img/diego_maradona.jpg" },
  { nombre: "Pelé", foto: "img/pele.jpg" },
  { nombre: "Gabriel Batistuta", foto: "img/gabriel_batistuta.jpg" },
  { nombre: "Andrés Iniesta", foto: "img/andres_iniesta.jpg" },
  { nombre: "Sergio Agüero", foto: "img/sergio_aguero.jpg" },
  { nombre: "Fernando Muslera", foto: "img/fernando_muslera.jpg" },
  { nombre: "Carlos Tévez", foto: "img/carlos_tevez.jpg" },
  { nombre: "Javier Mascherano", foto: "img/javier_mascherano.jpg" },
  { nombre: "Juan Román Riquelme", foto: "img/juan_roman_riquelme.jpg" },
  { nombre: "Fede Valverde", foto: "img/fede_valverde.jpg" },
  { nombre: "Paulo Dybala", foto: "img/paulo_dybala.jpg" },
  { nombre: "Ángel Di María", foto: "img/angel_di_maria.jpg" },
  { nombre: "Alfonso Espino", foto: "img/alfonso_espino.jpg" },
  { nombre: "Rodrigo Bentancur", foto: "img/rodrigo_bentancur.jpg" },
  { nombre: "Facundo Pellistri", foto: "img/facundo_pellistri.jpg" },
  { nombre: "Kylian Mbappé", foto: "img/kylian_mbappe.jpg" },
  { nombre: "Neymar Jr.", foto: "img/neymar_jr.jpg" },
  { nombre: "Erling Haaland", foto: "img/erling_haaland.jpg" },
  { nombre: "Robert Lewandowski", foto: "img/robert_lewandowski.jpg" },
  { nombre: "Cole Palmer", foto: "img/colepalmer.jpg" },
  { nombre: "Luka Modrić", foto: "img/luka_modric.jpg" },
  { nombre: "Toni Kroos", foto: "img/toni_kroos.jpg" },
  { nombre: "Mohamed Salah", foto: "img/mohamed_salah.jpg" },
  { nombre: "Virgil van Dijk", foto: "img/virgil_van_dijk.jpg" },
  { nombre: "Kevin De Bruyne", foto: "img/kevin_de_bruyne.jpg" },
  { nombre: "Harry Kane", foto: "img/harry_kane.jpg" },
  { nombre: "Antoine Griezmann", foto: "img/antoine_griezmann.jpg" },
  { nombre: "Gerard Piqué", foto: "img/gerard_pique.jpg" },
  { nombre: "Sergio Ramos", foto: "img/sergio_ramos.jpg" },
  { nombre: "Marcelo", foto: "img/marcelo.jpg" },
  { nombre: "Gianluigi Buffon", foto: "img/gianluigi_buffon.jpg" },
  { nombre: "Iker Casillas", foto: "img/iker_casillas.jpg" },
  { nombre: "Francesco Totti", foto: "img/francesco_totti.jpg" },
  { nombre: "Ronaldinho", foto: "img/ronaldinho.jpg" },
  { nombre: "Shakira", foto: "img/shakira.jpg" },
  { nombre: "Bad Bunny", foto: "img/bad_bunny.jpg" },
  { nombre: "María Becerra", foto: "img/maria_becerra.jpg" },
  { nombre: "Duki", foto: "img/duki.jpg" },
  { nombre: "Ricky Martin", foto: "img/ricky_martin.jpg" },
  { nombre: "Nathy Peluso", foto: "img/nathy_peluso.jpg" },
  { nombre: "Paulo Londra", foto: "img/paulo_londra.jpg" },
  { nombre: "Bizarrap", foto: "img/bizarrap.jpg" },
  { nombre: "Charly García", foto: "img/charly_garcia.jpg" },
  { nombre: "Fito Páez", foto: "img/fito_paez.jpg" },
  { nombre: "Gustavo Cerati", foto: "img/gustavo_cerati.jpg" },
  { nombre: "Alejandro Sanz", foto: "img/alejandro_sanz.jpg" },
  { nombre: "Diego Torres", foto: "img/diego_torres.jpg" },
  { nombre: "Feid", foto: "img/feid.jpg" },
  { nombre: "The Weeknd", foto: "img/the_weeknd.jpg" },
  { nombre: "Ariana Grande", foto: "img/ariana_grande.jpg" },
  { nombre: "Ed Sheeran", foto: "img/ed_sheeran.jpg" },
  { nombre: "Bruno Mars", foto: "img/bruno_mars.jpg" },
  { nombre: "Maluma", foto: "img/maluma.jpg" },
  { nombre: "Farruko", foto: "img/farruko.jpg" },
  { nombre: "Ozuna", foto: "img/ozuna.jpg" },
  { nombre: "J Balvin", foto: "img/j_balvin.jpg" },
  { nombre: "Tini Stoessel", foto: "img/tini.jpg" },
  { nombre: "Agustín Casanova", foto: "img/agustin_casanova.jpg" },
  { nombre: "Karol G", foto: "img/karol.jpg" },
  { nombre: "Natalia Oreiro", foto: "img/natalia_oreiro.jpg" },
  { nombre: "Don Omar", foto: "img/donomar.jpg" },
  { nombre: "Joaquín Sabina", foto: "img/joaquin_sabina.jpg" },
  { nombre: "Sofía Reyes", foto: "img/sofia_reyes.jpg" },
  { nombre: "Daddy Yankee", foto: "img/daddy.jpg" },
  { nombre: "Luis Fonsi", foto: "img/luis_fonsi.jpg" },
  { nombre: "Camila Cabello", foto: "img/camila_cabello.jpg" },
  { nombre: "Selena Gomez", foto: "img/selena_gomez.jpg" },
  { nombre: "Billie Eilish", foto: "img/billie_eilish.jpg" },
  { nombre: "Dua Lipa", foto: "img/dua_lipa.jpg" },
  { nombre: "Camilo", foto: "img/camilo.jpg" },
  { nombre: "Sebastián Yatra", foto: "img/sebastian_yatra.jpg" },
  { nombre: "Paulina Rubio", foto: "img/paulina_rubio.jpg" },
  { nombre: "Ricardo Montaner", foto: "img/ricardo_montaner.jpg" },
  { nombre: "Marc Anthony", foto: "img/marc_anthony.jpg" },
  { nombre: "Carlos Vives", foto: "img/carlos_vives.jpg" },
  { nombre: "Rauw Alejandro", foto: "img/rauw.jpg" },
  { nombre: "Ricardo Arjona", foto: "img/ricardo_arjona.jpg" },
  { nombre: "Juanes", foto: "img/juanes.jpg" },
  { nombre: "Quevedo", foto: "img/quevedo.jpg" },
  { nombre: "Luana", foto: "img/luana.jpg" },
  { nombre: "Luck Ra", foto: "img/luckra.jpg" },
  { nombre: "Chacho Ramos", foto: "img/chacho.jpg" },
  { nombre: "La Joaqui", foto: "img/joaqui.jpg" },
  { nombre: "Martín Piña", foto: "img/martinpiña.jpg" },
  { nombre: "Lucas Sugo", foto: "img/lucassugo.jpg" },
  { nombre: "Lali Esposito", foto: "img/lali.jpg" },
  { nombre: "Nicki Nicole", foto: "img/nicki.jpg" },
  { nombre: "Cazzu", foto: "img/cazzu.jpg" },
  { nombre: "Ruben Rada", foto: "img/rubenrada.jpg" },
  { nombre: "Leonardo DiCaprio", foto: "img/leonardo_dicaprio.jpg" },
  { nombre: "Brad Pitt", foto: "img/brad_pitt.jpg" },
  { nombre: "Tom Cruise", foto: "img/tom_cruise.jpg" },
  { nombre: "Robert De Niro", foto: "img/robert_de_niro.jpg" },
  { nombre: "Al Pacino", foto: "img/al_pacino.jpg" },
  { nombre: "Morgan Freeman", foto: "img/morgan_freeman.jpg" },
  { nombre: "Denzel Washington", foto: "img/denzel_washington.jpg" },
  { nombre: "Will Smith", foto: "img/will_smith.jpg" },
  { nombre: "Johnny Depp", foto: "img/johnny_depp.jpg" },
  { nombre: "Keanu Reeves", foto: "img/keanu_reeves.jpg" },
  { nombre: "Matt Damon", foto: "img/matt_damon.jpg" },
  { nombre: "Christian Bale", foto: "img/christian_bale.jpg" },
  { nombre: "Tom Hanks", foto: "img/tom_hanks.jpg" },
  { nombre: "Hugh Jackman", foto: "img/hugh_jackman.jpg" },
  { nombre: "Ryan Reynolds", foto: "img/ryan_reynolds.jpg" },
  { nombre: "Chris Hemsworth", foto: "img/chris_hemsworth.jpg" },
  { nombre: "Chris Evans", foto: "img/chris_evans.jpg" },
  { nombre: "Mark Ruffalo", foto: "img/mark_ruffalo.jpg" },
  { nombre: "Robert Downey Jr.", foto: "img/robert_downey_jr.jpg" },
  { nombre: "Scarlett Johansson", foto: "img/scarlett_johansson.jpg" },
  { nombre: "Natalie Portman", foto: "img/natalie_portman.jpg" },
  { nombre: "Emma Stone", foto: "img/emma_stone.jpg" },
  { nombre: "Jennifer Lawrence", foto: "img/jennifer_lawrence.jpg" },
  { nombre: "Margot Robbie", foto: "img/margot_robbie.jpg" },
  { nombre: "Zendaya", foto: "img/zendaya.jpg" },
  { nombre: "Anne Hathaway", foto: "img/anne_hathaway.jpg" },
  { nombre: "Julia Roberts", foto: "img/julia_roberts.jpg" },
  { nombre: "Angelina Jolie", foto: "img/angelina_jolie.jpg" },
  { nombre: "Sandra Bullock", foto: "img/sandra_bullock.jpg" },
  { nombre: "Nicole Kidman", foto: "img/nicole_kidman.jpg" },
  { nombre: "Emma Watson", foto: "img/emma_watson.jpg" },
  { nombre: "Samuel L. Jackson", foto: "img/samuel_l_jackson.jpg" },
  { nombre: "Vin Diesel", foto: "img/vin_diesel.jpg" },
  { nombre: "The Rock", foto: "img/dwayne_johnson.jpg" },
  { nombre: "Guillermo Francella", foto: "img/guillermo_francella.jpg" },
  { nombre: "Ricardo Darín", foto: "img/ricardo_darin.jpg" },
  { nombre: "Miley Cyrus", foto: "img/miley.jpg" },
  { nombre: "Edinson Cavani", foto: "img/edinson_cavani.jpg" },
  { nombre: "Darwin Núñez", foto: "img/darwin_nunez.jpg" },
  { nombre: "Sebastián Coates", foto: "img/sebastian_coates.jpg" },
  { nombre: "Martín Cáceres", foto: "img/martin_caceres.jpg" },
  { nombre: "Diego Godín", foto: "img/diego_godin.jpg" },
  { nombre: "Óscar Tabárez", foto: "img/oscar_tabarez.jpg" },
  { nombre: "Álvaro Recoba", foto: "img/alvaro_recoba.jpg" },
  { nombre: "Rubén Sosa", foto: "img/ruben_sosa.jpg" },
  { nombre: "Enzo Francescoli", foto: "img/enzo_francescoli.jpg" },
  { nombre: "Lucas Torreira", foto: "img/lucas_torreira.jpg" },
  { nombre: "Jonathan Rodríguez", foto: "img/jonathan_rodriguez.jpg" },
  { nombre: "Agustín Canobbio", foto: "img/agustin_canobbio.jpg" },
  { nombre: "Brian Rodríguez", foto: "img/brian_rodriguez.jpg" },
  { nombre: "Brian Ocampo", foto: "img/braianocampo.jpg" },
  { nombre: "Jorge Drexler", foto: "img/jorge_drexler.jpg" },
  { nombre: "Matias Valdez", foto: "img/matiasvaldez.jpg" },
  { nombre: "Flavio Perchman", foto: "img/perchman.jpg" },
  { nombre: "Yao Cabrera", foto: "img/yao.jpg" },
  { nombre: "Cacho de la Cruz", foto: "img/cacho_de_la_cruz.jpg" },
  { nombre: "Omar Gutiérrez", foto: "img/omar_gutierrez.jpg" },
  { nombre: "El Bananero", foto: "img/el_bananero.jpg" },
  { nombre: "Alberto Sonsol", foto: "img/alberto_sonsol.jpg" },
  { nombre: "Martín Kesman", foto: "img/martin_kesman.jpg" },
  { nombre: "Sergio Gorzy", foto: "img/sergio_gorzy.jpg" },
  { nombre: "Bambino Pons ", foto: "img/bambino.jpg" },
  { nombre: "Martin Charquero", foto: "img/charquero.jpg" },
  { nombre: "Rodrigo Romano", foto: "img/rodrigo_romano.jpg" },
  { nombre: "Juan Carlos Scelza", foto: "img/scelza.jpg" },
  { nombre: "Ignacio Álvarez", foto: "img/ignacio_alvarez.jpg" },
  { nombre: "Denis Elías", foto: "img/denis_elias.jpg" },
  { nombre: "Nico Furtado", foto: "img/nico_furtado.jpg" },
  { nombre: "Pepe Guerra", foto: "img/pepe_guerra.jpg" },
  { nombre: "Lucía Topolansky", foto: "img/lucia_topolansky.jpg" },
  { nombre: "José Mujica", foto: "img/jose_mujica.jpg" },
  { nombre: "Adolf Hitler", foto: "img/adolf_hitler.jpg" },
  { nombre: "Iósif Stalin", foto: "img/iosif_stalin.jpg" },
  { nombre: "Luis Lacalle Pou", foto: "img/luis_lacalle_pou.jpg" },
  { nombre: "Julio María Sanguinetti", foto: "img/julio_maria_sanguinetti.jpg" },  
  { nombre: "Joe Biden", foto: "img/joe_biden.jpg" },
  { nombre: "Donald Trump", foto: "img/donald_trump.jpg" },
  { nombre: "Barack Obama", foto: "img/barack_obama.jpg" },
  { nombre: "Hillary Clinton", foto: "img/hillary_clinton.jpg" },
  { nombre: "Bill Clinton", foto: "img/bill_clinton.jpg" },
  { nombre: "George W. Bush", foto: "img/george_bush.jpg" },
  { nombre: "Ronald Reagan", foto: "img/ronald_reagan.jpg" },
  { nombre: "John F. Kennedy", foto: "img/john_kennedy.jpg" },
  { nombre: "Kamala Harris", foto: "img/kamala_harris.jpg" },
  { nombre: "Michelle Obama", foto: "img/michelle_obama.jpg" },
  { nombre: "Vladimir Putin", foto: "img/vladimir_putin.jpg" },
  { nombre: "Kim Jong-un", foto: "img/kim_jong_un.jpg" },
  { nombre: "Nicolás Maduro", foto: "img/nicolas_maduro.jpg" },
  { nombre: "Javier Milei", foto: "img/javier_milei.jpg" },
  { nombre: "José Batlle y Ordóñez", foto: "img/josebatlle.jpg" },
  { nombre: "Wilson Ferreira Aldunate", foto: "img/wilsonferreira.jpg" },
  { nombre: "Tabaré Vázquez", foto: "img/tabare_vazquez.jpg" },
  { nombre: "Juan María Bordaberry", foto: "img/juliomariabordaberry.jpg" },
  { nombre: "Ibai Llanos", foto: "img/ibai.jpg" },
  { nombre: "AuronPlay", foto: "img/auronplay.jpg" },
  { nombre: "El Rubius", foto: "img/el_rubius.jpg" },
  { nombre: "TheGrefg", foto: "img/thegrefg.jpg" },
  { nombre: "Vegetta777", foto: "img/vegetta777.jpg" },
  { nombre: "Willyrex", foto: "img/willyrex.jpg" },
  { nombre: "DjMaRiiO", foto: "img/djmario.jpg" },
  { nombre: "Coscu", foto: "img/coscu.jpg" },
  { nombre: "SantiCAP", foto: "img/santicap.jpg" },
  { nombre: "Tussi Warriors", foto: "img/tussi.jpg" },
  { nombre: "Peke 77", foto: "img/peke.jpg" },
  { nombre: "Lea Sosa", foto: "img/leasosa.jpg" },
  { nombre: "Johnny Te Cuento", foto: "img/johnny-te-cuento.jpg" },
  { nombre: "GuilleFutbol", foto: "img/guillefutbol.jpg" },
  { nombre: "Javo Machado", foto: "img/javomachado.jpg" },
  { nombre: "Vale Sulca", foto: "img/valesulca.jpg" },
  { nombre: "Dross", foto: "img/dross.jpg" },
  { nombre: "Luisito Comunica", foto: "img/luisito_comunica.jpg" },
  { nombre: "Fernanfloo", foto: "img/fernanfloo.jpg" },
  { nombre: "MrBeast", foto: "img/mrbeast.jpg" },
  { nombre: "IShowSpeed", foto: "img/ishowspeed.jpg" },
  { nombre: "Spreen", foto: "img/spreen.jpg" },
  { nombre: "Homero Simpson", foto: "img/homero_simpson.jpg" },
  { nombre: "Marge Simpson", foto: "img/marge_simpson.jpg" },
  { nombre: "Bart Simpson", foto: "img/bart_simpson.jpg" },
  { nombre: "Lisa Simpson", foto: "img/lisa_simpson.jpg" },
  { nombre: "Maggie Simpson", foto: "img/maggie_simpson.jpg" },
  { nombre: "Bob Esponja", foto: "img/bob_esponja.jpg" },
  { nombre: "Patricio", foto: "img/patricio_estrella.jpg" },
  { nombre: "Calamardo", foto: "img/calamardo.jpg" },
  { nombre: "Goku", foto: "img/goku.jpg" },
  { nombre: "Vegeta", foto: "img/vegeta.jpg" },
  { nombre: "Piccolo", foto: "img/piccolo.jpg" },
  { nombre: "Gohan", foto: "img/gohan.jpg" },
  { nombre: "Freezer", foto: "img/freezer.jpg" },
  { nombre: "Naruto", foto: "img/naruto.jpg" },
  { nombre: "Sasuke", foto: "img/sasuke.jpg" },
  { nombre: "Mickey Mouse", foto: "img/mickey_mouse.jpg" },
  { nombre: "Minnie Mouse", foto: "img/minnie_mouse.jpg" },
  { nombre: "Pato Donald", foto: "img/pato_donald.jpg" },
  { nombre: "Pluto", foto: "img/pluto.jpg" },
  { nombre: "Shrek", foto: "img/shrek.jpg" },
  { nombre: "Burro", foto: "img/burro.jpg" },
  { nombre: "Fiona", foto: "img/fiona.jpg" },
  { nombre: "Buzz Lightyear", foto: "img/buzz_lightyear.jpg" },
  { nombre: "Woody", foto: "img/woody.jpg" },
  { nombre: "Iron Man", foto: "img/iron_man.jpg" },
  { nombre: "Capitán América", foto: "img/capitan_america.jpg" },
  { nombre: "Thor", foto: "img/thor.jpg" },
  { nombre: "Hulk", foto: "img/hulk.jpg" },
  { nombre: "Spider-Man", foto: "img/spiderman.jpg" },
  { nombre: "Batman", foto: "img/batman.jpg" },
  { nombre: "Superman", foto: "img/superman.jpg" },
  { nombre: "Joker", foto: "img/joker.jpg" },
  { nombre: "Harley Quinn", foto: "img/harley_quinn.jpg" },
  { nombre: "Darth Vader", foto: "img/darth_vader.jpg" },
  { nombre: "Yoda", foto: "img/yoda.jpg" },
  { nombre: "Chewbacca", foto: "img/chewbacca.jpg" },
  { nombre: "Harry Potter", foto: "img/harry_potter.jpg" },
  { nombre: "Hermione Granger", foto: "img/hermione.jpg" },
  { nombre: "Lilo", foto: "img/lilo.jpg" },
  { nombre: "Stitch", foto: "img/stitch.jpg" },
  { nombre: "Chimuelo", foto: "img/chimuelo.jpg" },
  { nombre: "Ted", foto: "img/ted.jpg" },
  { nombre: "Mario", foto: "img/mario.jpg" },
  { nombre: "Luigi", foto: "img/luigi.jpg" },
  { nombre: "La Sirenita", foto: "img/sirenita.jpg" },
  { nombre: "Emilia Mernes", foto: "img/emilia.jpg" },
  { nombre: "DeadPool", foto: "img/deadpool.jpg" },
  { nombre: "Mike Wazowski", foto: "img/mikewazowski.jpg" },
  { nombre: "Venom", foto: "img/venom.jpg" },
  { nombre: "Walter White", foto: "img/walter.jpg" },
  { nombre: "Kick Buttowski", foto: "img/kick.jpg" },
  { nombre: "Tom", foto: "img/tom.jpg" },
  { nombre: "Jerry", foto: "img/jerry.jpg" },
  { nombre: "Scooby Doo", foto: "img/scooby.jpg" },
  { nombre: "Pikachu", foto: "img/pikachu.jpg" },
  { nombre: "Sonic", foto: "img/sonic.jpg" },
  { nombre: "Pedro Picapiedra", foto: "img/pedropica.jpg" },
  { nombre: "Goofy", foto: "img/goofy.jpg" },
  { nombre: "Popeye", foto: "img/popeye.jpg" },
  { nombre: "Garfield", foto: "img/garfield.jpg" },
  { nombre: "La Pantera Rosa", foto: "img/lapantera.jpg" },
  { nombre: "Yanina Latorre", foto: "img/yanina.jpg" },
  { nombre: "Wanda Nara", foto: "img/wanda_nara.jpg" },
  { nombre: "Marcelo Tinelli", foto: "img/marcelo_tinelli.jpg" },
  { nombre: "Mirtha Legrand", foto: "img/mirtha_legrand.jpg" },
  { nombre: "Susana Giménez", foto: "img/susana_gimenez.jpg" },
  { nombre: "Carmen Barbieri", foto: "img/carmen_barbieri.jpg" },
  { nombre: "Graciela Alfano", foto: "img/graciela_alfano.jpg" },
  { nombre: "Pampita", foto: "img/pampita.jpg" },
  { nombre: "Nico Occhiato", foto: "img/nicoocchiato.jpg" },
  { nombre: "Florencia Peña", foto: "img/florencia_pena.jpg" },
  { nombre: "Adrián Suar", foto: "img/adrian_suar.jpg" },
  { nombre: "Marley", foto: "img/marley.jpg" },
  { nombre: "Nacho Elizalde", foto: "img/nachoelizalde.jpg" },
  { nombre: "Jorge Rial", foto: "img/jorge_rial.jpg" },
  { nombre: "Ángel De Brito", foto: "img/angel_de_brito.jpg" },
  { nombre: "Homero Pettinato", foto: "img/homeropettinato.jpg" },
  { nombre: "Moria Casán", foto: "img/moria_casan.jpg" },
  { nombre: "Miguel Granados", foto: "img/miguegranados.jpg" },
  { nombre: "Flor Jazmín", foto: "img/florjazmin.jpg" },
  { nombre: "Lizy Tagliani", foto: "img/lizytagliani.jpg" },
  { nombre: "Tomas Mazza", foto: "img/tomasmazza.jpg" },
  { nombre: "Martin Cirio", foto: "img/martincirio.jpg" },
  { nombre: "Moski", foto: "img/moski.jpg" },
  { nombre: "Gaspi", foto: "img/gaspi.jpg" },
  { nombre: "Luquitas Rodriguez", foto: "img/luquitas.jpg" },
  { nombre: "Nacho Ruglio", foto: "img/ruglio.jpg" },
  { nombre: "Flavio Azzaro", foto: "img/azzaro.jpg" },
  { nombre: "Maxi de la Cruz", foto: "img/maxidelacruz.jpg" },
  { nombre: "Tiago PZK", foto: "img/tiagopzk.jpg" },  
  { nombre: "Bad Gyal", foto: "img/BadGyal.jpg" },
  { nombre: "Young Miko", foto: "img/youngmiko.jpg" },
  { nombre: "Cristina Morán", foto: "img/cristina_moran.jpg" },
  { nombre: "China Zorrilla", foto: "img/china_zorrilla.jpg" },
  { nombre: "Eduardo Galeano", foto: "img/eduardo_galeano.jpg" },
  { nombre: "Mario Benedetti", foto: "img/mario_benedetti.jpg" },
  { nombre: "Hugo Burel", foto: "img/hugo_burel.jpg" },
  { nombre: "Tabaré Cardozo", foto: "img/tabare_cardozo.jpg" },
  { nombre: "Cacho Castaña (UY)", foto: "img/cacho_castana.jpg" },
  { nombre: "Alvaro Navia", foto: "img/alvaro_navia.jpg" },
  { nombre: "Petru Valensky", foto: "img/petru_valensky.jpg" },
  { nombre: "Cecilia Bonino", foto: "img/cecilia_bonino.jpg" },
  { nombre: "Kairo Herrera", foto: "img/kairo_herrera.jpg" },
  { nombre: "María Noel Riccetto", foto: "img/maria_noel_riccetto.jpg" },
  { nombre: "Daniel Viglietti", foto: "img/daniel_viglietti.jpg" },
  { nombre: "Alfredo Zitarrosa", foto: "img/zitarrosa.jpg" },
  { nombre: "Los Fatales (Fabián Delgado)", foto: "img/losfatales.jpg" },
  { nombre: "Jeremia Recoba", foto: "img/recoba_jr.jpg" },
  { nombre: "Andrés Cunha", foto: "img/andres_cunha.jpg" },
  { nombre: "Esteban Ostojich", foto: "img/esteban_ostojich.jpg" },
  { nombre: "Sebastián Giovanelli", foto: "img/giovanelli.jpg" },
  { nombre: "Federico Buysan", foto: "img/buysan.jpg" },
  { nombre: "Shawn Mendes", foto: "img/shawn_mendes.jpg" },
  { nombre: "Post Malone", foto: "img/post_malone.jpg" },
  { nombre: "Travis Scott", foto: "img/travis_scott.jpg" },
  { nombre: "Kendrick Lamar", foto: "img/kendrick_lamar.jpg" },
  { nombre: "Drake", foto: "img/drake.jpg" },
  { nombre: "Taylor Swift", foto: "img/taylor_swift.jpg" },
  { nombre: "Jay-Z", foto: "img/jay_z.jpg" },
  { nombre: "Kanye West", foto: "img/kanye_west.jpg" },
  { nombre: "Snoop Dogg", foto: "img/snoop_dogg.jpg" },
  { nombre: "Eminem", foto: "img/eminem.jpg" },
  { nombre: "50 Cent", foto: "img/50cent.jpg" },
  { nombre: "Doja Cat", foto: "img/doja_cat.jpg" },
  { nombre: "Rosalía", foto: "img/rosalia.jpg" },
  { nombre: "Anuel AA", foto: "img/anuel.jpg" },
  { nombre: "Sech", foto: "img/sech.jpg" },
  { nombre: "Arcangel", foto: "img/arcangel.jpg" },
  { nombre: "Wisin", foto: "img/wisin.jpg" },
  { nombre: "Yandel", foto: "img/yandel.jpg" },
  { nombre: "Prince Royce", foto: "img/prince_royce.jpg" },
  { nombre: "Romeo Santos", foto: "img/romeo_santos.jpg" },
  { nombre: "Chespirito", foto: "img/chespirito.jpg" },
  { nombre: "El Chavo del 8", foto: "img/chavo.jpg" },
  { nombre: "Quico", foto: "img/quico.jpg" },
  { nombre: "La Chilindrina", foto: "img/chilindrina.jpg" },
  { nombre: "Doña Florinda", foto: "img/dona_florinda.jpg" },
  { nombre: "Don Ramón", foto: "img/don_ramon.jpg" },
  { nombre: "Profesor Jirafales", foto: "img/jirafales.jpg" },
  { nombre: "El Chapulín Colorado", foto: "img/chapulin.jpg" },
  { nombre: "Cantinflas", foto: "img/cantinflas.jpg" },
  { nombre: "Tin Tin", foto: "img/tintin.jpg" },
  { nombre: "Diego Simeone", foto: "img/simeone.jpg" },
  { nombre: "José Mourinho", foto: "img/mourinho.jpg" },
  { nombre: "Pep Guardiola", foto: "img/guardiola.jpg" },
  { nombre: "Carlo Ancelotti", foto: "img/ancelotti.jpg" },
  { nombre: "Zinedine Zidane", foto: "img/zidane.jpg" },
  { nombre: "Andrés Calamaro", foto: "img/calamaro.jpg" },
  { nombre: "Residente", foto: "img/residente.jpg" },
  { nombre: "Kurt Cobain", foto: "img/kurt_cobain.jpg" },
  { nombre: "Elvis Presley", foto: "img/elvis.jpg" },
  { nombre: "Michael Jackson", foto: "img/michael_jackson.jpg" },
  { nombre: "Whitney Houston", foto: "img/whitney.jpg" },
  { nombre: "Madonna", foto: "img/madonna.jpg" },
  { nombre: "Britney Spears", foto: "img/britney.jpg" },
  { nombre: "Christina Aguilera", foto: "img/christina_aguilera.jpg" },
  { nombre: "Katy Perry", foto: "img/katy_perry.jpg" },
  { nombre: "Jennifer Lopez", foto: "img/jlo.jpg" },
  { nombre: "Beyoncé", foto: "img/beyonce.jpg" },
  { nombre: "Adele", foto: "img/adele.jpg" },
  { nombre: "Enrique Iglesias", foto: "img/enrique_iglesias.jpg" },
  { nombre: "Gonzalo Bergessio", foto: "img/gonzalo_bergessio.jpg" },
  { nombre: "Freddie Mercury", foto: "img/freddie_mercury.jpg" },
  { nombre: "Nicolas Lodeiro", foto: "img/nico_lodeiro.jpg" },
  { nombre: "Luis Artime", foto: "img/luis_artime.jpg" },
  { nombre: "Héctor Scarone", foto: "img/scarone.jpg" },
  { nombre: "Atilio García", foto: "img/atilio_garcia.jpg" },
  { nombre: "Felipe Carballo", foto: "img/felipe_carballo.jpg" },
  { nombre: "Matías Viña", foto: "img/matias_vina.jpg" },
  { nombre: "Felipe Carvalho", foto: "img/felipe_carvalho.jpg" },
  { nombre: "Guillermo Cotugno", foto: "img/guillermo_cotugno.jpg" },
  { nombre: "Ignacio Lores", foto: "img/ignacio_lores.jpg" },
  { nombre: "Franco Fagúndez", foto: "img/franco_fagundez.jpg" },
  { nombre: "Facundo Machado", foto: "img/facundo_machado.jpg" },
  { nombre: "Yonatan Rodríguez", foto: "img/yonatan_rodriguez.jpg" },
  { nombre: "Christian Oliva", foto: "img/christian_oliva.jpg" },
  { nombre: "Sergio Rochet", foto: "img/sergio_rochet.jpg" },
  { nombre: "Emiliano Velázquez", foto: "img/emiliano_velazquez.jpg" },
  { nombre: "Gabriel Báez", foto: "img/gabriel_baez.jpg" },
  { nombre: "Paolo Calione", foto: "img/paolo_calione.jpg" },
  { nombre: "Lucas Villalba", foto: "img/lucas_villalba.jpg" },
  { nombre: "Exequiel Mereles", foto: "img/exequiel_mereles.jpg" },
  { nombre: "Bruno Arady", foto: "img/bruno_arady.jpg" },
  { nombre: "Brayan Cortés", foto: "img/brayan_cortes.jpg" },
  { nombre: "Gastón Silva", foto: "img/gaston_silva.jpg" },
  { nombre: "Damián Suárez", foto: "img/damian_suarez.jpg" },
  { nombre: "Emanuel Gularte", foto: "img/emanuel_gularte.jpg" },
  { nombre: "Maximiliano Olivera", foto: "img/maximiliano_olivera.jpg" },
  { nombre: "Léo Coelho", foto: "img/leo_coelho.jpg" },
  { nombre: "Pedro Milans", foto: "img/pedro_milans.jpg" },
  { nombre: "Ignacio Sosa", foto: "img/ignacio_sosa.jpg" },
  { nombre: "Leonardo Fernández", foto: "img/leonardo_fernandez.jpg" },
  { nombre: "Eduardo Darias", foto: "img/eduardo_darias.jpg" },
  { nombre: "Jesús Trindade", foto: "img/jesus_trindade.jpg" },
  { nombre: "Eric Remedi", foto: "img/eric_remedi.jpg" },
  { nombre: "David Terans", foto: "img/david_terans.jpg" },
  { nombre: "Javier Cabrera", foto: "img/javier_cabrera.jpg" },
  { nombre: "Héctor Villalba", foto: "img/hector_villalba.jpg" },
  { nombre: "Maximiliano Silvera", foto: "img/maximiliano_silvera.jpg" },
  { nombre: "Matías Arezo", foto: "img/matias_arezo.jpg" },
  { nombre: "Fernando Morena", foto: "img/fernando_morena.jpg" },
  { nombre: "Obdulio Varela", foto: "img/obdulio_varela.jpg" },
  { nombre: "Abraham Simpson", foto: "img/abraham.jpg" },
{ nombre: "Ned Flanders", foto: "img/flanders.jpg" },
{ nombre: "Milhouse Van Houten", foto: "img/milhouse.jpg" },
{ nombre: "Nelson Muntz", foto: "img/nelson.jpg" },
{ nombre: "Moe Szyslak", foto: "img/moe.jpg" },
{ nombre: "Barney Gómez", foto: "img/barney.jpg" },
{ nombre: "Apu Nahasapeemapetilon", foto: "img/apu.jpg" },
{ nombre: "Mr. Burns", foto: "img/burns.jpg" },
{ nombre: "Smithers", foto: "img/smithers.jpg" },
{ nombre: "Krusty el Payaso", foto: "img/krusty.jpg" },
{ nombre: "Bob Patiño", foto: "img/bobpatino.jpg" },
{ nombre: "Kylie Jenner", foto: "img/kylie.jpg" },
{ nombre: "Kim Kardashian", foto: "img/kimkar.jpg" },
{ nombre: "Gustaf", foto: "img/gustaf.jpg" },
{ nombre: "Davo Xeneize", foto: "img/davo.jpg" },
{ nombre: "La Cobra", foto: "img/lacobra.jpg" },
{ nombre: "Ronaldo Nazario", foto: "img/ronaldo.jpg" },
{ nombre: "Harry Styles", foto: "img/harrys.jpg" },
{ nombre: "Tom Holland", foto: "img/tomholland.jpg" },
{ nombre: "Pedro Pascal", foto: "img/pedropascal.jpg" },
{ nombre: "Alessandro Del Piero", foto: "img/delpiero.jpg" },
{ nombre: "Andrea Pirlo", foto: "img/pirlo.jpg" },
{ nombre: "Ángel Correa", foto: "img/correa.jpg" },
{ nombre: "Arjen Robben", foto: "img/robben.jpg" },
{ nombre: "Ashley Cole", foto: "img/ashleycole.jpg" },
{ nombre: "Blaise Matuidi", foto: "img/matuidi.jpg" },
{ nombre: "Cesc Fàbregas", foto: "img/fabregas.jpg" },
{ nombre: "Dani Alves", foto: "img/danialves.jpg" },
{ nombre: "David Beckham", foto: "img/beckham.jpg" },
{ nombre: "David Silva", foto: "img/silva.jpg" },
{ nombre: "Diego Costa", foto: "img/diegocosta.jpg" },
{ nombre: "Edin Džeko", foto: "img/dzeko.jpg" },
{ nombre: "Fernando Torres", foto: "img/torres.jpg" },
{ nombre: "Franck Ribéry", foto: "img/ribery.jpg" },
{ nombre: "Gareth Bale", foto: "img/bale.jpg" },
{ nombre: "Gerard Moreno", foto: "img/gerardmoreno.jpg" },
{ nombre: "Gianluigi Donnarumma", foto: "img/donnarumma.jpg" },
{ nombre: "Giorgio Chiellini", foto: "img/chiellini.jpg" },
{ nombre: "Guti", foto: "img/guti.jpg" },
{ nombre: "Iago Aspas", foto: "img/aspas.jpg" },
{ nombre: "James Rodríguez", foto: "img/james.jpg" },
{ nombre: "Javier Hernández", foto: "img/chicharito.jpg" },
{ nombre: "João Félix", foto: "img/joaofelix.jpg" },
{ nombre: "Juan Mata", foto: "img/mata.jpg" },
{ nombre: "Karim Benzema", foto: "img/benzema.jpg" },
{ nombre: "Kevin-Prince Boateng", foto: "img/boateng.jpg" },
{ nombre: "Luka Jović", foto: "img/jovic.jpg" },
{ nombre: "Marcelo Brozović", foto: "img/brozovic.jpg" },
{ nombre: "Marco Reus", foto: "img/reus.jpg" },
{ nombre: "Mario Götze", foto: "img/gotze.jpg" },
{ nombre: "Mario Mandžukić", foto: "img/mandzukic.jpg" },
{ nombre: "Mats Hummels", foto: "img/hummels.jpg" },
{ nombre: "Memphis Depay", foto: "img/depay.jpg" },
{ nombre: "Michy Batshuayi", foto: "img/batshuayi.jpg" },
{ nombre: "Raheem Sterling", foto: "img/sterling.jpg" },
{ nombre: "Raúl González", foto: "img/raul.jpg" },
{ nombre: "Robert Pires", foto: "img/pires.jpg" },
{ nombre: "Romelu Lukaku", foto: "img/lukaku.jpg" },
{ nombre: "Samuel Eto’o", foto: "img/etoo.jpg" },
{ nombre: "José María Listorti", foto: "img/jose_maria_listorti.jpg" },
{ nombre: "Aníbal Pachano", foto: "img/anibal_pachano.jpg" },
{ nombre: "Jey Mammón", foto: "img/jey_mammon.jpg" },
{ nombre: "Noelia Marzol", foto: "img/noelia_marzol.jpg" },
{ nombre: "Nati Jota", foto: "img/nati_jota.jpg" },
{ nombre: "Gaston Edul", foto: "img/gaston_edul.jpg" },
{ nombre: "Nicolás Vázquez", foto: "img/nico_vazquez.jpg" },
{ nombre: "Gimena Accardi", foto: "img/gime_accardi.jpg" },
{ nombre: "La China Suárez", foto: "img/china_suarez.jpg" },
{ nombre: "Franco Mastantuono", foto: "img/franco_mastantuono.jpg" },
{ nombre: "Jude Bellingham", foto: "img/jude_bellingham.jpg" },
{ nombre: "Vinícius Júnior", foto: "img/vinicius_junior.jpg" },
{ nombre: "Lamine Yamal", foto: "img/lamine_yamal.jpg" },
{ nombre: "Pedri", foto: "img/pedri.jpg" },
{ nombre: "Jamal Musiala", foto: "img/jamal_musiala.jpg" },
{ nombre: "Florian Wirtz", foto: "img/florian_wirtz.jpg" },
{ nombre: "Bukayo Saka", foto: "img/bukayo_saka.jpg" },
{ nombre: "Phil Foden", foto: "img/phil_foden.jpg" },
{ nombre: "Declan Rice", foto: "img/declan_rice.jpg" },
{ nombre: "Trent Alexander-Arnold", foto: "img/trent_alexander_arnold.jpg" },
{ nombre: "Marcus Rashford", foto: "img/marcus_rashford.jpg" },
{ nombre: "Mason Mount", foto: "img/mason_mount.jpg" },
{ nombre: "Kai Havertz", foto: "img/kai_havertz.jpg" },
{ nombre: "Joshua Kimmich", foto: "img/joshua_kimmich.jpg" },
{ nombre: "Leon Goretzka", foto: "img/leon_goretzka.jpg" },
{ nombre: "Alphonso Davies", foto: "img/alphonso_davies.jpg" },
{ nombre: "Theo Hernández", foto: "img/theo_hernandez.jpg" },
{ nombre: "Rafael Leão", foto: "img/rafael_leao.jpg" },
{ nombre: "Khvicha Kvaratskhelia", foto: "img/khvicha_kvaratskhelia.jpg" },
{ nombre: "Lautaro Martínez", foto: "img/lautaro_martinez.jpg" },
{ nombre: "Joško Gvardiol", foto: "img/josko_gvardiol.jpg" },
{ nombre: "Achraf Hakimi", foto: "img/achraf_hakimi.jpg" },
{ nombre: "Son Heung-min", foto: "img/son_heung_min.jpg" },
{ nombre: "Bruno Fernandes", foto: "img/bruno_fernandes.jpg" },
{ nombre: "Casemiro", foto: "img/casemiro.jpg" },
{ nombre: "Antony", foto: "img/antony.jpg" },
{ nombre: "Richarlison", foto: "img/richarlison.jpg" },
{ nombre: "Álisson Becker", foto: "img/alisson_becker.jpg" },
{ nombre: "Thibaut Courtois", foto: "img/thibaut_courtois.jpg" },
{ nombre: "Jan Oblak", foto: "img/jan_oblak.jpg" },
{ nombre: "Raphaël Varane", foto: "img/raphael_varane.jpg" },
{ nombre: "Antonio Rüdiger", foto: "img/antonio_rudiger.jpg" },
{ nombre: "Áymeric Laporte", foto: "img/aymeric_laporte.jpg" },
{ nombre: "João Cancelo", foto: "img/joao_cancelo.jpg" },
{ nombre: "Bernardo Silva", foto: "img/bernardo_silva.jpg" },
{ nombre: "Riyad Mahrez", foto: "img/riyad_mahrez.jpg" },
{ nombre: "Martin Ødegaard", foto: "img/martin_odegaard.jpg" },
{ nombre: "Christian Pulisic", foto: "img/christian_pulisic.jpg" },
{ nombre: "Xavi Simons", foto: "img/xavi_simons.jpg" },
{ nombre: "Federico Chiesa", foto: "img/federico_chiesa.jpg" },
{ nombre: "Ragnar Lothbrok", foto: "img/ragnar_lothbrok.jpg" },
{ nombre: "Lagertha", foto: "img/lagertha.jpg" },
{ nombre: "Floki", foto: "img/floki.jpg" },
{ nombre: "Bjorn Ironside", foto: "img/bjorn_ironside.jpg" },
{ nombre: "Ivar el Deshuesado", foto: "img/ivar.jpg" },
{ nombre: "Tommy Shelby", foto: "img/tommy_shelby.jpg" },
{ nombre: "Arthur Shelby", foto: "img/arthur_shelby.jpg" },
{ nombre: "Alfie Solomons", foto: "img/alfie_solomons.jpg" },
{ nombre: "Michael Gray", foto: "img/michael_gray.jpg" },
{ nombre: "Polly Gray", foto: "img/polly_gray.jpg" },
{ nombre: "Walter White Jr.", foto: "img/walter_white_jr.jpg" },
{ nombre: "Jesse Pinkman", foto: "img/jesse_pinkman.jpg" },
{ nombre: "Saul Goodman", foto: "img/saul_goodman.jpg" },
{ nombre: "Gus Fring", foto: "img/gus_fring.jpg" },
{ nombre: "Mike Ehrmantraut", foto: "img/mike_ehrmantraut.jpg" },
{ nombre: "Tony Soprano", foto: "img/tony_soprano.jpg" },
{ nombre: "Paulie Gualtieri", foto: "img/paulie_gualtieri.jpg" },
{ nombre: "Omar Little", foto: "img/omar_little.jpg" },
{ nombre: "Rick Grimes", foto: "img/rick_grimes.jpg" },
{ nombre: "Daryl Dixon", foto: "img/daryl_dixon.jpg" },
{ nombre: "Negan", foto: "img/negan.jpg" },
{ nombre: "Glenn Rhee", foto: "img/glenn_rhee.jpg" },
{ nombre: "Shane Walsh", foto: "img/shane_walsh.jpg" },
{ nombre: "Yamandú Orsi", foto: "img/yamandu.jpg" },
{ nombre: "Chayanne", foto: "img/chayanne.jpg" },
{ nombre: "Marco Antonio Solís", foto: "img/marco_antonio_solis.jpg" },
{ nombre: "Lola Índigo", foto: "img/lola_indigo.jpg" },
{ nombre: "Aitana", foto: "img/aitana.jpg" },
{ nombre: "Manuel Turizo", foto: "img/manuel_turizo.jpg" },
];
  const famososPorTematica = {
  todos: famosos.map(f => f.nombre),
  
  Uruguay: ["Agustín Canobbio", "Agustín Casanova", "Alberto Sonsol", "Alfonso Espino", "Alfredo Zitarrosa", 
"Alvaro Navia", "Andrés Cunha", "Atilio García", "Álvaro Recoba", "Brian Rodríguez", 
"Bruno Arady", "Cacho Castaña (UY)", "Cacho de la Cruz", "Cecilia Bonino", 
"Chacho Ramos", "China Zorrilla", "Christian Oliva", "Cristina Morán", "Damián Suárez", 
"Daniel Viglietti", "Darwin Núñez", "David Terans", "Denis Elías", "Diego Forlán", 
"Diego Godín", "Diego Lugano", "Eduardo Darias", "Eduardo Galeano", "Edinson Cavani", 
"El Bananero", "El Zaraza", "Emanuel Gularte", "Emiliano Velázquez", "Enzo Francescoli", 
"Esteban Ostojich", "Exequiel Mereles", "Facundo Machado", "Facundo Pellistri", "Federico Buysan", 
"Fede Valverde", "Felipe Carballo", "Felipe Carvalho", "Fernando Morena", "Fernando Muslera", 
"Flavio Perchman", "Franco Fagúndez", "Gastón Silva", "Gonzalo Carneiro", 
"Gonzalo Petit","Gustaf", "GuilleFutbol", "Guillermo Cotugno", "Héctor Scarone", 
"Hugo Burel", "Ignacio Álvarez", "Ignacio Lores", "Ignacio Sosa", 
"Javo Machado", "Javier Cabrera", "Jeremia Recoba", "Jesús Trindade", "Johnny Te Cuento", 
"Jorge Drexler", "José Batlle y Ordóñez", "José Mujica", "Jonathan Rodríguez", "Juan Carlos Scelza", 
"Juan María Bordaberry", "Julio María Sanguinetti", "Kairo Herrera", "Lea Sosa", "Leonardo Fernández", 
"Los Fatales (Fabián Delgado)", "Luana", "Lucas Sugo", "Lucas Torreira", "Lucas Villalba", 
"Lucía Topolansky", "Luciano Boggio", "Luis Artime", "Luis Lacalle Pou", "Luis Suárez", 
"Marcos Da Costa", "Mario Benedetti", "Martín Cáceres", "Martín Charquero", "Martín Kesman", 
"Martín Piña", "María Noel Riccetto", "Matias Valdez", "Matías Arezo", "Matías Viña", 
"Maxi Gómez", "Maxi de la Cruz", "Maximiliano Olivera", "Maximiliano Silvera", "Natalia Oreiro", 
"Nacho Ruglio", "Nico Furtado", "Nico López", "Nicolas Lodeiro", "Nicolás de la Cruz", 
"Obdulio Varela", "Omar Gutiérrez", "Óscar Tabárez", "Paolo Calione", "Pedro Milans", 
"Pepe Guerra", "Peke 77", "Petru Valensky", "Rafa Cotelo", "Raúl Castro (Falta y Resto)", 
"Rodrigo Bentancur", "Rodrigo Romano", "Rubén Sosa", "Ruben Rada", "SantiCAP", 
"Sebastián Abreu", "Sebastián Coates", "Sebastián Giovanelli", "Sergio Gorzy", "Sergio Rochet", 
"Tabaré Cardozo", "Tabaré Vázquez", "The La Planta", "Tussi Warriors", "Vale Sulca", 
"Wilson Ferreira Aldunate", "Yao Cabrera", "Yonatan Rodríguez","Yamandú Orsi",
],
  Futbol: ["Agustín Canobbio", "Alessandro Del Piero", "Alfonso Espino", "Álvaro Recoba", "Ángel Correa", "Ángel Di María", "Andrés Iniesta",
"Antoine Griezmann", "Arjen Robben", "Ashley Cole", "Atilio García", "Blaise Matuidi", "Brayan Cortés", "Brian Ocampo", "Brian Rodríguez",
"Bruno Arady", "Carlo Ancelotti", "Carlos Tévez", "Cesc Fàbregas", "Christian Oliva", "Cole Palmer", "Cristiano Ronaldo", "Damián Suárez",
"Dani Alves", "Darwin Núñez", "David Beckham", "David Silva", "David Terans", "Diego Costa", "Diego Forlán", "Diego Godín", "Diego Lugano",
"Diego Maradona", "Diego Simeone", "Edin Džeko", "Edinson Cavani", "Eduardo Darias", "Eduardo Vargas", "Emanuel Gularte",
"Emiliano Velázquez", "Enzo Francescoli", "Eric Remedi", "Erling Haaland", "Exequiel Mereles", "Facundo Machado", "Facundo Pellistri",
"Fede Valverde", "Felipe Carballo", "Felipe Carvalho", "Fernando Morena", "Fernando Muslera", "Fernando Torres", "Francesco Totti",
"Franco Fagúndez", "Franco Mastantuono", "Franck Ribéry", "Gabriel Báez", "Gabriel Batistuta", "Gareth Bale", "Gastón Silva",
"Gerard Moreno", "Gerard Piqué", "Gianluigi Buffon", "Gianluigi Donnarumma", "Gonzalo Bergessio", "Gonzalo Carneiro", "Gonzalo Petit",
"Guillermo Cotugno", "Guti", "Harry Kane", "Héctor Scarone", "Héctor Villalba", "Iago Aspas", "Ignacio Lores", "Ignacio Sosa",
"Iker Casillas", "Javier Cabrera", "Javier Hernández", "Javier Mascherano", "Jeremia Recoba", "Jesús Trindade", "João Félix",
"Jonathan Rodríguez", "José Mourinho", "Juan Mata", "Juan Román Riquelme", "Karim Benzema", "Keylor Navas", "Kevin De Bruyne",
"Kevin-Prince Boateng", "Kylian Mbappé", "Leonardo Fernández", "Léo Coelho", "Lionel Messi", "Lucas Torreira", "Lucas Villalba",
"Luciano Boggio", "Luis Artime", "Luis Mejía", "Luis Suárez", "Luka Jović", "Luka Modrić", "Manuel Neuer", "Marcelo",
"Marcelo Brozović", "Martín Cáceres", "Martín Palermo", "Matías Arezo", "Matías Viña", "Maxi Gómez", "Maximiliano Olivera",
"Maximiliano Silvera", "Mauro Icardi", "Memphis Depay", "Michy Batshuayi", "Mohamed Salah", "Neymar Jr.", "Nico López",
"Nicolas Lodeiro", "Nicolás de la Cruz", "Obdulio Varela", "Paolo Calione", "Paulo Dybala", "Paulo Ferreira", "Pedro Milans",
"Pelé", "Pep Guardiola", "Raheem Sterling", "Raúl González", "Robert Lewandowski", "Robert Pires", "Rodrigo Bentancur",
"Ronaldinho", "Ronaldo Nazario", "Romelu Lukaku", "Rubén Sosa", "Samuel Eto’o", "Sebastián Abreu", "Sebastián Coates",
"Sergio Agüero", "Sergio Ramos", "Sergio Rochet", "Toni Kroos", "Virgil van Dijk", "Yonatan Rodríguez", "Zinedine Zidane",
"Jude Bellingham", "Vinícius Júnior", "Lamine Yamal", "Pedri", "Jamal Musiala", 
"Florian Wirtz", "Bukayo Saka", "Phil Foden", "Declan Rice", "Trent Alexander-Arnold",
"Marcus Rashford", "Mason Mount", "Kai Havertz", "Joshua Kimmich", "Leon Goretzka",
"Alphonso Davies", "Theo Hernández", "Rafael Leão", "Khvicha Kvaratskhelia", "Lautaro Martínez",
"Joško Gvardiol", "Achraf Hakimi", "Son Heung-min", "Bruno Fernandes", "Casemiro",
"Antony", "Richarlison", "Álisson Becker", "Thibaut Courtois", "Jan Oblak",
"Raphaël Varane", "Antonio Rüdiger", "Áymeric Laporte", "João Cancelo", "Bernardo Silva",
"Riyad Mahrez", "Martin Ødegaard", "Christian Pulisic", "Xavi Simons", "Federico Chiesa"
],
  Cine: ["Abraham Simpson", "Al Pacino", "Angelina Jolie", "Anne Hathaway", "Apu Nahasapeemapetilon", 
"Barney Gómez", "Bart Simpson", "Batman", "Bob Esponja","Bob Patiño", "Brad Pitt", 
"Burro", "Buzz Lightyear", "Calamardo", "Cantinflas", "Capitán América", 
"Chewbacca", "Chespirito", "Chimuelo", "Chris Evans", "Chris Hemsworth", 
"Christian Bale", "Darth Vader", "DeadPool", "Denzel Washington", "Don Ramón", 
"Doña Florinda", "El Chapulín Colorado", "El Chavo del 8", "Emma Stone", "Emma Watson", 
"Fiona", "Freezer", "Garfield", "Gohan", "Goku", 
"Goofy", "Guillermo Francella", "Harley Quinn", "Harry Potter", "Hermione Granger", 
"Homer Simpson", "Hugh Jackman", "Iron Man", "Jennifer Lawrence", "Jerry", 
"Johnny Depp", "Joker", "Julia Roberts", "Keanu Reeves", "Kick Buttowski", 
"Krusty el Payaso", "La Chilindrina", "La Pantera Rosa", "La Sirenita", "Leonardo DiCaprio", 
"Lilo", "Lisa Simpson", "Luigi", "Maggie Simpson", "Mario", 
"Margot Robbie", "Marge Simpson", "Mark Ruffalo", "Matt Damon", "Mickey Mouse", 
"Mike Wazowski", "Milhouse Van Houten", "Minnie Mouse", "Moe Szyslak", "Morgan Freeman", 
"Mr. Burns", "Naruto", "Natalie Portman", "Ned Flanders", "Nelson Muntz", 
"Nicole Kidman", "Patricio", "Pato Donald", "Pedro Picapiedra", "Piccolo", "Pedro Pascal",
"Pikachu", "Pluto", "Popeye", "Profesor Jirafales", "Quico", 
"Ricardo Darín", "Robert De Niro", "Robert Downey Jr.", "Ryan Reynolds", "Samuel L. Jackson", 
"Sandra Bullock", "Sasuke", "Scarlett Johansson", "Scooby Doo", "Shrek", 
"Smithers", "Sonic", "Spider-Man", "Stitch", "Superman", 
"Ted", "The Rock", "Thor", "Tin Tin", "Tom","Tom Holland", 
"Tom Cruise", "Tom Hanks", "Vegeta", "Venom", "Vin Diesel", 
"Walter White", "Will Smith", "Woody", "Yoda", "Zendaya","Ragnar Lothbrok", "Lagertha", "Floki", "Bjorn Ironside", "Ivar el Deshuesado",
"Tommy Shelby", "Arthur Shelby", "Alfie Solomons", "Michael Gray", "Polly Gray",
"Walter White Jr.", "Jesse Pinkman", "Saul Goodman", "Gus Fring", "Mike Ehrmantraut",
"Tony Soprano", "Paulie Gualtieri", "Omar Little","Rick Grimes", "Daryl Dixon",
"Negan", "Glenn Rhee", "Shane Walsh"
  ],
  Musica: [ "50 Cent", "Aitana", "Adele", "Agustín Casanova", "Ariana Grande", "Anuel AA", "Arcangel", 
"Bad Bunny", "Bad Gyal", "Beyoncé", "Billie Eilish", "Bizarrap", "Bruno Mars", "Britney Spears", 
"Camila Cabello", "Camilo", "Carlos Vives", "Cazzu", "Chacho Ramos", "Charly García", 
"Chayanne", "Christina Aguilera", "Daddy Yankee", "Denis Elías", "Diego Torres", "Doja Cat", 
"Don Omar", "Drake", "Dua Lipa", "Duki", "Ed Sheeran", "Eladio Carrión", "Elvis Presley", 
"Eminem", "Enrique Iglesias", "Farruko", "Feid", "Fito Páez", "Freddie Mercury", "Gustavo Cerati", 
"Harry Styles", "J Balvin", "Jay-Z", "Jennifer Lopez", "Joaquín Sabina", "Jorge Drexler", 
"Juanes", "Kanye West", "Karol G", "Katy Perry", "Kendrick Lamar", "Kurt Cobain", "La Joaqui", 
"Lali Esposito", "Lola Índigo", "Luana", "Lucas Sugo", "Luis Fonsi", "Madonna", "Maluma", 
"Marc Anthony", "Marcos Da Costa","Marco Antonio Solís", "María Becerra", "Martín Piña", "Manuel Turizo", 
"Michael Jackson", "Miley Cyrus", "Myke Towers", "Natalia Oreiro", "Nathy Peluso", "Nicki Nicole", 
"Ozuna", "Paula Rubio", "Paulo Londra", "Peke 77", "Peso Pluma", "Pepe Guerra", "Post Malone", 
"Prince Royce", "Quevedo", "Rauw Alejandro", "Residente", "Ricardo Arjona", "Ricardo Montaner", 
"Ricky Martin", "Romeo Santos", "Rosalía", "Ruben Rada", "Sam Smith", "Sech", "Selena Gomez", 
"Shakira", "Shawn Mendes", "Snoop Dogg", "Sofía Reyes", "Taylor Swift", "The La Planta", 
"The Weeknd", "Tiago PZK", "Tini Stoessel", "Travis Scott", "Tussi Warriors", "Whitney Houston", 
"Wisin", "Yandel", "Young Miko",
],
  Farandula: ["Adrián Suar", "Ángel De Brito", "Aníbal Pachano", "Carmen Barbieri", "Flor Jazmín", 
"Florencia Peña", "Gaspi", "Gaston Edul", "Gimena Accardi", "Graciela Alfano", 
"Homero Pettinato", "Jey Mammón", "Jorge Rial", "José María Listorti", "La China Suárez", 
"Lizzy Tagliani", "Luquitas Rodriguez", "Marcelo Tinelli", "Marley", "Martin Cirio", 
"Maxi de la Cruz", "Miguel Granados", "Mirtha Legrand", "Moria Casán", "Moski", 
"Nacho Elizalde", "Nati Jota", "Nico Occhiato", "Nicolás Vázquez", "Noelia Marzol", 
"Pampita", "Susana Giménez", "Wanda Nara", "Yanina Latorre"
  ],
  Politicos: ["Barack Obama", "Bill Clinton", "Donald Trump", "George W. Bush", "Hillary Clinton", 
"Javier Milei", "Joe Biden", "John F. Kennedy", "José Batlle y Ordóñez", "José Mujica", 
"Juan María Bordaberry", "Julio María Sanguinetti", "Kamala Harris", "Kim Jong-un", "Lucía Topolansky", 
"Luis Lacalle Pou", "Michelle Obama", "Nicolás Maduro", "Ronald Reagan", "Tabaré Vázquez", 
"Vladimir Putin", "Wilson Ferreira Aldunate"
  ],
  Influencers: ["AuronPlay", "Coscu", "Davo Xeneize", "DjMaRiiO", "Dross", "El Rubius", 
"Fernanfloo", "GuilleFutbol", "Ibai Llanos", "IShowSpeed", "Javo Machado", 
"Johnny Te Cuento","Kylie Jenner", "Kim Kardashian","La Cobra","Lea Sosa", "Luisito Comunica", "MrBeast", "Peke 77", 
"SantiCAP", "Spreen", "TheGrefg", "Tussi Warriors", "Vale Sulca", "Tomas Mazza",
"Vegetta777", "Willyrex", "Yao Cabrera"
  ],
  Simpsons: ["Abraham Simpson", "Apu Nahasapeemapetilon", "Barney Gómez", "Bart Simpson","Bob Patiño", "Homero Simpson", 
"Krusty el Payaso", "Lisa Simpson", "Maggie Simpson", "Marge Simpson", "Milhouse Van Houten", 
"Moe Szyslak", "Mr. Burns", "Ned Flanders", "Nelson Muntz", "Smithers"
]
};
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

  jugadorActual = 1;
  impostoresArray = [];

  // Elegimos un famoso aleatorio de los disponibles y lo eliminamos de la lista
  const randomIndex = Math.floor(Math.random() * famososDisponibles.length);
  const nombreElegido = famososDisponibles.splice(randomIndex, 1)[0];
  famosoElegido = famosos.find(f => f.nombre === nombreElegido);

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
             <img src="${famosoElegido.foto || 'img/default.jpg'}"
                  alt="${famosoElegido.nombre}"
                  style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px; display:none;">
           </div>
           <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: #2ecc71;">
             ${famosoElegido.nombre}
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
// Mostrar la pantalla de selección de temáticas
function mostrarPantallaSeleccionTematicas() {
  const contenedor = document.getElementById("lista-tematicas");
  contenedor.innerHTML = "";

  // Generar checkboxes para todas las temáticas disponibles
  Object.keys(famososPorTematica).forEach(t => {
    contenedor.innerHTML += `
      <label style="display:block; margin:5px 0;">
        <input type="checkbox" value="${t}">
        ${t.charAt(0).toUpperCase() + t.slice(1)}
      </label>
    `;
  });

  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "block";
}

// Confirmar selección
document.getElementById("btnConfirmarTematicas").addEventListener("click", () => {
  const seleccionadas = Array.from(
    document.querySelectorAll('#lista-tematicas input:checked')
  ).map(cb => cb.value);

  if (seleccionadas.length === 0) {
    alert("Debes seleccionar al menos una temática");
    return;
  }

  // Guardar en variable global
  window.tematicasSeleccionadas = seleccionadas;

  // Volver a pantalla inicial
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});

// Cancelar selección
document.getElementById("btnCancelarTematicas").addEventListener("click", () => {
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});
// Variable global para almacenar las temáticas elegidas
window.tematicasSeleccionadas = [];

// Función para abrir pantalla de selección
function mostrarPantallaSeleccionTematicas() {
  const lista = document.getElementById("lista-tematicas");
  lista.innerHTML = "";

  Object.keys(famososPorTematica).forEach(t => {
    lista.innerHTML += `
      <label style="display:block; margin:6px 0;">
        <input type="checkbox" value="${t}" ${window.tematicasSeleccionadas.includes(t) ? 'checked' : ''}>
        ${t.charAt(0).toUpperCase() + t.slice(1)}
      </label>
    `;
  });

  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "block";
}

// Confirmar selección
document.getElementById("btnConfirmarTematicas").addEventListener("click", () => {
  const seleccionadas = Array.from(document.querySelectorAll('#lista-tematicas input:checked'))
    .map(cb => cb.value);

  if (seleccionadas.length === 0) {
    alert("Debes seleccionar al menos una temática");
    return;
  }

  window.tematicasSeleccionadas = seleccionadas;

  // Mostrar resumen en pantalla inicial
  document.getElementById("tematicasSeleccionadasTexto").textContent = seleccionadas.join(", ");

  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});

// Cancelar selección
document.getElementById("btnCancelarTematicas").addEventListener("click", () => {
  document.getElementById("pantalla-seleccionar-tematicas").style.display = "none";
  document.getElementById("pantalla-inicial").style.display = "block";
});

// Abrir selección desde el botón
document.getElementById("btnSeleccionarTematicas").addEventListener("click", (e) => {
  e.preventDefault();
  mostrarPantallaSeleccionTematicas();
});

});