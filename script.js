document.addEventListener("DOMContentLoaded", () => {
 localStorage.removeItem('nombresPersonalizados');
 localStorage.removeItem('nombresPersonalizados');
localStorage.removeItem('jugadores');
localStorage.removeItem('impostores');
localStorage.removeItem('tematica');
localStorage.removeItem('duracion');

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
];
  const famososPorTematica = {
  todos: famosos.map(f => f.nombre),
  uruguay: ["El Zaraza","The La Planta","Marcos Da Costa","Rafa Cotelo","Diego Lugano","Sebastián Abreu","Juan Carlos Scelza","Rodrigo Romano","Martin Charquero",
"Maxi Gómez","Nicolás de la Cruz", "Luis Suárez", "Diego Forlán",
"Luciano Boggio", "Nico López", "Gonzalo Petit", "Gonzalo Carneiro",
"Fernando Muslera", "Fede Valverde", "Alfonso Espino","Rodrigo Bentancur",
"Facundo Pellistri","Ruben Rada", "Agustín Casanova", "Natalia Oreiro", "Luana",
"Chacho Ramos", "Martín Piña", "Lucas Sugo", "Edinson Cavani", "Darwin Núñez",
"Sebastián Coates", "Martín Cáceres", "Diego Godín", "Óscar Tabárez", 
"Álvaro Recoba", "Rubén Sosa", "Enzo Francescoli", "Lucas Torreira", "Jonathan Rodríguez", 
"Agustín Canobbio", "Brian Rodríguez", "Jorge Drexler", "Cacho de la Cruz", "Omar Gutiérrez", 
"El Bananero", "Alberto Sonsol", "Martín Kesman", "Sergio Gorzy", "Ignacio Álvarez", "Denis Elías", 
"Nico Furtado", "Pepe Guerra","Lucía Topolansky","José Mujica","Luis Lacalle Pou", "Julio María Sanguinetti", 
"Tabaré Vázquez", "José Batlle y Ordóñez", "Wilson Ferreira Aldunate", "Juan María Bordaberry", 
"Tussi Warriors","SantiCAP","Matias Valdez","Flavio Perchman","Yao Cabrera","Nacho Ruglio",
"Maxi de la Cruz","Vale Sulca","Javo Machado","GuilleFutbol","Johnny Te Cuento","Lea Sosa","Peke 77"],
  futbol: ["Sebastián Abreu","Diego Lugano","Maxi Gómez","Mauro Icardi","Nicolás de la Cruz","Luis Suárez","Lionel Messi","Diego Forlán",
"Cristiano Ronaldo","Keylor Navas","Manuel Neuer","Martín Palermo","Luciano Boggio","Nico López","Gonzalo Petit",
"Eduardo Vargas","Gonzalo Carneiro","Luis Mejía","Diego Maradona","Pelé","Gabriel Batistuta","Andrés Iniesta",
"Sergio Agüero","Fernando Muslera","Carlos Tévez","Javier Mascherano","Juan Román Riquelme","Fede Valverde",
"Paulo Dybala","Ángel Di María","Alfonso Espino","Rodrigo Bentancur","Facundo Pellistri",
"Kylian Mbappé","Neymar Jr.","Erling Haaland","Robert Lewandowski","Cole Palmer",
"Luka Modrić","Toni Kroos","Mohamed Salah","Virgil van Dijk","Kevin De Bruyne","Harry Kane",
"Antoine Griezmann","Gerard Piqué","Sergio Ramos","Marcelo","Gianluigi Buffon","Iker Casillas","Francesco Totti",
"Ronaldinho","Edinson Cavani","Darwin Núñez", "Sebastián Coates", "Martín Cáceres","Diego Godín","Álvaro Recoba",
"Rubén Sosa", "Enzo Francescoli","Lucas Torreira","Jonathan Rodríguez","Agustín Canobbio","Brian Rodríguez","Brian Ocampo"],
  peliculasyseries: [
    "Leonardo DiCaprio","Brad Pitt","Tom Cruise","Robert De Niro","Al Pacino","Morgan Freeman",
    "Denzel Washington","Will Smith","Johnny Depp","Keanu Reeves","Matt Damon","Christian Bale",
    "Tom Hanks","Hugh Jackman","Ryan Reynolds","Chris Hemsworth","Chris Evans","Mark Ruffalo",
    "Robert Downey Jr.","Scarlett Johansson","Natalie Portman","Emma Stone","Jennifer Lawrence",
    "Margot Robbie","Zendaya","Anne Hathaway","Julia Roberts","Angelina Jolie","Sandra Bullock",
    "Nicole Kidman","Emma Watson","Samuel L. Jackson","Vin Diesel","The Rock","Guillermo Francella",
    "Ricardo Darín", "Homero Simpson","Marge Simpson","Bart Simpson","Lisa Simpson","Maggie Simpson","Bob Esponja",
    "Patricio","Calamardo","Goku","Vegeta","Piccolo","Gohan","Freezer","Naruto","Sasuke","Mickey Mouse",
    "Minnie Mouse","Pato Donald","Pluto","Shrek","Burro","Fiona","Buzz Lightyear","Woody","Iron Man",
    "Capitán América","Thor","Hulk","Spider-Man","Batman","Superman","Joker","Harley Quinn","Darth Vader",
    "Yoda","Chewbacca","Harry Potter","Hermione Granger","Lilo","Stitch","Chimuelo","Ted","Mario","Luigi",
    "La Sirenita","DeadPool","Mike Wazowski","Venom","Walter White","Kick Buttowski","Tom","Jerry",
    "Scooby Doo","Pikachu","Sonic","Pedro Picapiedra","Goofy","Popeye","Garfield","La Pantera Rosa"
  ],
  musica: ["Bad Gyal","Young Miko","Tiago PZK","Myke Towers","Eladio Carrión","Peso Pluma","Marcos Da Costa","The La Planta","Shakira","Bad Bunny","María Becerra","Duki","Ricky Martin","Nathy Peluso","Paulo Londra","Bizarrap","Charly García",
"Fito Páez","Matias Valdez","Gustavo Cerati","Alejandro Sanz","Diego Torres","Feid","The Weeknd","Ariana Grande","Ed Sheeran","Bruno Mars","Maluma",
"Farruko","Ozuna","Denis Elías","Jorge Drexler","J Balvin","Tini Stoessel","Agustín Casanova","Karol G","Natalia Oreiro","Don Omar","Joaquín Sabina","Sofía Reyes",
"Daddy Yankee","Pepe Guerra","Luis Fonsi","Chacho Ramos","Tussi Warriors","Camila Cabello","Peke 77","Selena Gomez","Billie Eilish","Dua Lipa","Camilo","Sebastián Yatra","Paulina Rubio",
"Ricardo Montaner","Marc Anthony","Carlos Vives","Rauw Alejandro","Ricardo Arjona","Juanes","Quevedo","Luana","Luck Ra","La Joaqui","Martín Piña",
"Lucas Sugo","Lali Esposito","Nicki Nicole","Cazzu","Ruben Rada","Miley Cyrus"],
  farandula: [
    "Yanina Latorre","Wanda Nara","Marcelo Tinelli","Mirtha Legrand","Susana Giménez","Carmen Barbieri",
    "Graciela Alfano","Pampita","Nico Occhiato","Florencia Peña","Adrián Suar","Marley",
    "Nacho Elizalde","Jorge Rial","Ángel De Brito","Homero Pettinato","Moria Casán","Miguel Granados",
    "Flor Jazmín","Lizy Tagliani","Tomas Mazza","Martin Cirio","Moski","Gaspi","Luquitas Rodriguez",
    "Maxi de la Cruz"
  ],
  politicos: [
    "Lucía Topolansky","José Mujica","Luis Lacalle Pou","Julio María Sanguinetti","Tabaré Vázquez",
    "José Batlle y Ordóñez","Wilson Ferreira Aldunate","Juan María Bordaberry","Joe Biden","Donald Trump",
    "Barack Obama","Hillary Clinton","Bill Clinton","George W. Bush","Ronald Reagan","John F. Kennedy",
    "Kamala Harris","Michelle Obama","Vladimir Putin","Kim Jong-un","Nicolás Maduro","Javier Milei"
  ],
  influencers: [
    "Ibai Llanos","AuronPlay","El Rubius","TheGrefg","Vegetta777","Willyrex","DjMaRiiO","Coscu","SantiCAP",
    "Tussi Warriors","Peke 77","Lea Sosa","Johnny Te Cuento","GuilleFutbol","Javo Machado","Vale Sulca",
    "Dross","Luisito Comunica","Fernanfloo","MrBeast","IShowSpeed","Spreen","Yao Cabrera","Nacho Ruglio"
  ]
};

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


    function comenzarJuego() {
  totalJugadores = parseInt(document.getElementById("jugadores").value);
  totalImpostores = parseInt(document.getElementById("impostores").value);
  tematicaSeleccionada = document.getElementById("tematica").value;
  duracionRonda = parseInt(document.getElementById("duracion").value);

juegoIniciado = true;
// Si es una temática nueva o se agotaron los disponibles, reiniciar la lista
if (tematicaSeleccionada !== tematicaAnterior || famososDisponibles.length === 0) {
  famososDisponibles = [...famososPorTematica[tematicaSeleccionada]];
  tematicaAnterior = tematicaSeleccionada; // actualizamos la anterior
}

  jugadorActual = 1;
  impostoresArray = [];

  const lista = famososPorTematica[tematicaSeleccionada];
  // Elegimos un famoso aleatorio de los disponibles y lo eliminamos de la lista
const randomIndex = Math.floor(Math.random() * famososDisponibles.length);
const nombreElegido = famososDisponibles.splice(randomIndex, 1)[0]; // solo el nombre
famosoElegido = famosos.find(f => f.nombre === nombreElegido); // objeto completo con foto

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

  if (pantallaInicial) pantallaInicial.style.display = "none";
  if (pantallaEditar) pantallaEditar.style.display = "none";
  if (pantallaJuego) pantallaJuego.style.display = "none";

  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".fixed-buttons");
  botonesViejos.forEach(b => b.remove());

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h2>Turno de ${nombresPersonalizados.length ? nombresPersonalizados[jugadorActual - 1] : `Jugador ${jugadorActual}`}</h2>
  `;

  const botones = document.createElement("div");
  botones.classList.add("fixed-buttons");
  botones.innerHTML = `<button onclick="revelar()">Revelar</button>`;

  container.appendChild(card);
  container.appendChild(botones);
}


function revelar() {
  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".fixed-buttons");
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

  // 💡 Responsive: distinto en móvil y escritorio
  if (window.innerWidth < 768) {
    // Celular
    card.style.height = "auto";
    card.style.justifyContent = "flex-start";
  } else {
    // Escritorio
    card.style.height = "calc(100vh - 80px)";
    card.style.justifyContent = "center";
  }

  const nombreJugador = nombresPersonalizados.length
    ? nombresPersonalizados[jugadorActual - 1]
    : `Jugador ${jugadorActual}`;

  card.innerHTML = `
    <h2 style="margin-bottom: 20px;">${nombreJugador}</h2>
    ${
      esImpostor
        ? `<div class="impostor" style="text-align: center;">
             <p style="font-size: 32px; font-weight: bold; color: red;">IMPOSTOR</p>
           </div>`
        : `<div style="width: 52vw; max-width: 290px; height: 280px; overflow: hidden; background: white; padding: 0; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
             <img src="${famosoElegido.foto || 'img/default.jpg'}"
                  alt="${famosoElegido.nombre}"
                  style="width: 100%; height: 100%; object-fit: cover; object-position: center; border-radius: 12px;">
           </div>
           <p style="font-size: 22px; font-weight: bold; text-align: center; margin-top: 14px; color: #2ecc71;">
             ${famosoElegido.nombre}
           </p>`
    }
  `;

  const botones = document.createElement("div");
  botones.classList.add("fixed-buttons");

  botones.innerHTML = jugadorActual < totalJugadores
    ? `<button onclick="siguiente()">Continuar</button>`
    : `<button onclick="mostrarPantallaDeJuego()">¡A jugar!</button>`;

  container.appendChild(card);
  container.appendChild(botones);
}

window.revelar = revelar;

function siguiente() {
  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".fixed-buttons");
  botonesViejos.forEach(b => b.remove());

  if (jugadorActual < totalJugadores) {
    const nombreProximo = nombresPersonalizados.length > 0
      ? nombresPersonalizados[jugadorActual]
      : `jugador ${jugadorActual + 1}`;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h2>Pasá el teléfono</h2>
      <p>Pasá el dispositivo al <strong>${nombreProximo}</strong> sin mostrar tu rol.</p>
    `;

    const botones = document.createElement("div");
    botones.classList.add("fixed-buttons");
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

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());

  jugadorActual++;
  mostrarSiguiente();
}


window.continuarSiguiente = continuarSiguiente;
function reiniciar() {
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

  if (!pantallaJuego) {
    alert("Error: No se encontró el contenedor de juego.");
    return;
  }

  const container = document.getElementById("main");

  const cartasViejas = container.querySelectorAll(".card");
  cartasViejas.forEach(c => c.remove());
  const botonesViejos = container.querySelectorAll(".fixed-buttons");
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
  botones.classList.add("fixed-buttons");
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
  const intervalo = setInterval(actualizarTemporizador, 1000);

  document.getElementById("terminarRondaBtn").addEventListener("click", () => {
    clearInterval(intervalo);

    if (pantallaInicial) pantallaInicial.style.display = "block";
    if (pantallaEditar) pantallaEditar.style.display = "none";
    if (pantallaJuego) pantallaJuego.style.display = "none";

    const botonesViejos = container.querySelectorAll(".fixed-buttons");
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

});