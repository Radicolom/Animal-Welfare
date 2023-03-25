let nave = document.querySelector('.nave'); // guardamos la clase nave
let body = document.querySelector('body'); // guardamos el body por que la nave se movera dentro del cuerpo del navegador
let laser = document.getElementById('laser');//  es para guardar el uduio y poder utilizarlo con el disparo que se va a ejecutar
let explosion = document.getElementById('explosion'); // guardamos el audio de la exposion 
let live = document.querySelector('i'); //llamamos a i de html para ir cambiando su valor 
let times = document.getElementById('times');
let pounts = document.getElementById('pounts');


let lives = 5;
let second = 30;
// let validacion = false;
setInterval(()=> {
    second--;
    times.textContent = "Tiempo: " + second; //cambie  de forma dinamica 
    if (second == 0) {
        alert ("Has ganado felicitaciones ");
        alert ( `Total de puntos ${pount}`);
        location.reload();// recargar la pagina

    
    }
    
},1000);

// movimento de la nave con el mouse e devuelve la informacion acerca del evento como el clic o posicion
document.addEventListener('mousemove', (e) => {
    nave.style.left = (e.clientX - 40) + 'px'; // clientX para obtener la posiscion en x, me movera de lado izquierdo
});// 40 para mover en el centro le resta los 40 que mide el left

//generar disparo
document.addEventListener('click', () => { // escuchar el evento click , importante la el parametro e por que nos devuelve toda la informacion 
    let bala = document.createElement('div');// creamos div y el create element es para crear elementos nuevos 
    bala.classList.add('bala'); //le agregamos una clase llamada bala es para esterilizarla
    bala.style.bottom = 70 + 'px'; // parte inferio = buttom y 70 porque la nave esta en el 50 y le agregamos 70 para que salga del centro de la nave el disparo
    bala.style.left = (nave.getBoundingClientRect().left + 40)+'px'; //objjeto get baudin permite saber en tiempo real la posision el tamaño todo lo que necesitamos del elemento seleccionado... left es la esquina superior de la nave y parar saber donde esta le sumamos la mitad de su tamaño o sea 40
    body.append(bala); // agregar el elemento al body,,,, se creo pero queda en la posision donde se de clic tomando el centro de la nave el centro de la nave
    laser.play();

});

//movimiento de disparo
let pount = 0;
setInterval(() => { // funcion de javascrip 
    let balas = document.querySelectorAll('.bala'); // guardamos la variable para poder estilizarla queryselectAll por que selecionamos todos los elementos que tengan la clase bala
    balas.forEach(bala => { // se genero el array y lo recorremos todas  balas creadas  
        bala.style.top = (bala.getBoundingClientRect().top - 20) + 'px'; // top arriba, donde esta la altura del elemento el elemento con getBoundingClientRect.top, y les va a restar 20px a su posision

        if (bala.getBoundingClientRect().top <= 0) {// cuando la bala llega al top 
            bala.remove();// se eliminara el elemento del dom 
        }
        // detectar las colosiones
        let enemigos = document.querySelectorAll('.enemigo'); // saber la posicion de todos los que tengan la clase enemigo 
        enemigos.forEach(enemigo => {                                                    // altura de la roca
            if (bala.getBoundingClientRect().top <= enemigo.getBoundingClientRect().top + 70) { // si la altura de bala top es menor o igual que la de su enemigo,,,, se esta comparando la parte mas alta de la bala con la mas baja de la roca 
                if (bala.getBoundingClientRect().left >= enemigo.getBoundingClientRect().left && bala.getBoundingClientRect().left <= enemigo.getBoundingClientRect().left + 80) {                                                                                                                                      // 80 px es la anchura del enemigo
                    enemigo.style.backgroundImage = 'url("img/explosion.png")';
                    // validacion= false;
                    enemigo.style.width = 120 + "px"; 
                    enemigo.style.height = 120 + "px";
                    explosion.play();
                    setTimeout(() => {
                        enemigo.remove(); // eliminar la imagen
                        explosion.stop(); //detener el audio
                    }, 100); 
                    pount++;
                    pounts.textContent = "Puntuación: " + pount;
                }          
                
            }
        });
    });
}, 100);// tiempo en que queremos que esto se repita cada 100 milesegundos

// genera rocas
let aparecer = 0;
setInterval(() => {
    aparecer++; // contador incrementa de uno en uno
    if (aparecer % 10 == 0) { //este condicional evita que caiga varias rocas sino tiene un intervalo de 10 por medio de un contador
       let enemigo = document.createElement('div');
        enemigo.classList.add('enemigo'); //le agregamos una clase llamada bala es para esterilizarla
        body.append(enemigo);
        enemigo.style.left = (Math.random()*window.innerWidth - 100) + 'px'; //nos sirve para saber cuanto tiene de ancho la pantalla  del navegador 
    }                                             // inner Width ancho interno 100 px para que no se salga de los limetes de la pagina
        let enemigos = document.querySelectorAll('.enemigo');
        enemigos.forEach(element => {                                 // 10 se da para determinar la velocidd con que quiero que caiga la roca
            element.style.top = (element.getBoundingClientRect().top + 10) + 'px'; // nos sirve para obtener el elemento y poder darle un estilo
            if (element.getBoundingClientRect().top > nave.getBoundingClientRect().top) { // element ya supero la altura de la nave desaparezca
                lives--;
                live.textContent = lives; // va camiando el texto
                if (lives == 0) {
                    alert("Te has quedado sin vidas");
                    alert ( `Total de puntos ${pount}`);
                    
                    location.reload();// recargar la pagina
                }
                element.remove();
            }
        });
}, 100);