
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;
    const RESTA_VELOCIDAD = 50 ;
    const serpiente = [
      {x:5,y:9},
      {x:4,y:9},
      {x:3,y:9},
      {x:2,y:9},

    ];
    let intervaloSerpiente 
    let direccionActual = "derecha";
    let comidaPosicionX 
    let comidaPosicionY 
    let puntaje = 0 ;
    let velocidad = 600;

    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    function dibujarTablero(){
      for (let i = 0 ; i<canvas.width;i += TAMANIO_CELDA){
      ctx.strokeStyle = "#1e293b";
      ctx.beginPath()
      ctx.moveTo(i,0)
      ctx.lineTo(i,canvas.height)
      ctx.stroke()   
      } 
      for (let i = 0 ; i<canvas.height; i += TAMANIO_CELDA){
      ctx.strokeStyle = "#1e293b";
      ctx.beginPath()
      ctx.moveTo(0,i)
      ctx.lineTo(canvas.width,i)
      ctx.stroke()   
      }
    }

    function pintarParte(lineaX, lineaY){
      let x = lineaX * TAMANIO_CELDA
      let y = lineaY * TAMANIO_CELDA
      ctx.fillStyle = "#2b9b8c ";
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect (x,y,TAMANIO_CELDA,TAMANIO_CELDA);
    }

    function pintarCabeza(lineaX, lineaY){
      let x = lineaX * TAMANIO_CELDA
      let y = lineaY * TAMANIO_CELDA
      ctx.fillStyle = "#165df5";
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect (x,y,TAMANIO_CELDA,TAMANIO_CELDA);
    }

    function pintarSerpiente(){
      for (let i = 0;i<serpiente.length;i ++){
        let datos = serpiente[i]
        if (i == 0){
          pintarCabeza(datos.x,datos.y)
        }
        else{
        pintarParte(datos.x,datos.y)
        }
      }
    }
    function numeroAleatorio(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function generarComida(){
    comidaPosicionX = numeroAleatorio(0,21);
    comidaPosicionY = numeroAleatorio(0,21);
    }

    function pintarComida(){
    colorComida(comidaPosicionX,comidaPosicionY) 
    }

    function colorComida(lineaX, lineaY){
      let x = lineaX * TAMANIO_CELDA
      let y = lineaY * TAMANIO_CELDA
      ctx.fillStyle = "#c7bb0f";
      ctx.fillRect(x,y,TAMANIO_CELDA,TAMANIO_CELDA);
      ctx.strokeStyle = "#ffffff";
      ctx.strokeRect (x,y,TAMANIO_CELDA,TAMANIO_CELDA);
    }

    // =========================
    function cambiarDireccion(direccion){
      if (direccion=="derecha"){
        if (direccionActual != "izquierda"){
          direccionActual = "derecha";
        }
      }
      else if (direccion == "izquierda"){
        if (direccionActual != "derecha"){
          direccionActual = "izquierda";      
        }
      }
      else if (direccion == "arriba"){
        if (direccionActual != "abajo"){
          direccionActual = "arriba";
        }
      }
      else if (direccion == "abajo"){
        if (direccionActual != "arriba"){
          direccionActual = "abajo";
        }
      }
    }

    function moverAbajo(){
      let cabezaSepiente=serpiente[0]
      let nuevaCabeza = {}
      nuevaCabeza.x = cabezaSepiente.x
      nuevaCabeza.y = cabezaSepiente.y+1 
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverArriba(){
      let cabezaSepiente=serpiente[0]
      let nuevaCabeza = {}
      nuevaCabeza.x = cabezaSepiente.x
      nuevaCabeza.y = cabezaSepiente.y-1 
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverIzquierda(){
      let cabezaSepiente=serpiente[0]
      let nuevaCabeza = {}
      nuevaCabeza.x = cabezaSepiente.x-1
      nuevaCabeza.y = cabezaSepiente .y 
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function moverDerecha(){
      let cabezaSepiente=serpiente[0]
      let nuevaCabeza = {}
      nuevaCabeza.x = cabezaSepiente.x+1
      nuevaCabeza.y = cabezaSepiente .y 
      serpiente.unshift(nuevaCabeza);
      serpiente.pop();
    }

    function verificarBordes(){
    let cabezaSerpiente = serpiente[0];
    if(cabezaSerpiente.x < 0){
     return true;
    }
    else if(cabezaSerpiente.x > 21){
     return true;
    }
    else if(cabezaSerpiente.y < 0){
     return true;
    }
    else if(cabezaSerpiente.y > 21){
     return true;
    }
    else{
     return false;
    }
    }

    function verificarChoqueCuerpo(){
    let cabezaSerpiente = serpiente[0];
      for(let i = 1; i < serpiente.length; i++){
        let parteSerpiente = serpiente[i];
        if(cabezaSerpiente.x == parteSerpiente.x &&
           cabezaSerpiente.y == parteSerpiente.y){
            pausarJuego()
          document.getElementById("estado").textContent = "Game Over"
          document.getElementById("mensaje").textContent = "GAME OVER - Puntaje final: " + puntaje
        }
      }
    }


    function moverSerpiente(){
      let estadoBordes=verificarBordes()
      if (estadoBordes == false){
        let estadoPuntaje 
        let longitud= serpiente.length
        let finalSepriente 
        let cuadroFinal = {}
        if (direccionActual == "derecha"){
          finalSepriente = serpiente[longitud-1]
          moverDerecha();
          dibujarTodo();
          pintarSerpiente();
          verificarChoqueCuerpo()
        estadoPuntaje = atrapaComida()
          if (estadoPuntaje == true){
            puntaje =puntaje+1
            generarComida();
            modificarPuntaje=document.getElementById("puntaje")
            modificarPuntaje.textContent = puntaje
            cuadroFinal.x = finalSepriente.x - 1
            cuadroFinal.y = finalSepriente .y 
            serpiente.push (cuadroFinal)
            velocidad = velocidad - RESTA_VELOCIDAD
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);    
          }
        }
        else if (direccionActual == "izquierda") {
          finalSepriente = serpiente[longitud-1]
          moverIzquierda();
          dibujarTodo();
          pintarSerpiente();
          verificarChoqueCuerpo()
          estadoPuntaje = atrapaComida()
          if (estadoPuntaje == true){
            puntaje =puntaje+1
            generarComida();
            modificarPuntaje=document.getElementById("puntaje")
            modificarPuntaje.textContent = puntaje
            cuadroFinal.x = finalSepriente.x + 1
            cuadroFinal.y = finalSepriente .y 
            serpiente.push (cuadroFinal)
            velocidad = velocidad - RESTA_VELOCIDAD
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);   
          }
        }
        else if (direccionActual == "arriba") {
          finalSepriente = serpiente[longitud-1]
          moverArriba();
          dibujarTodo();
          pintarSerpiente();
          verificarChoqueCuerpo()
          estadoPuntaje = atrapaComida()
          if (estadoPuntaje == true){
            puntaje =puntaje+1
            generarComida();
            modificarPuntaje=document.getElementById("puntaje")
            modificarPuntaje.textContent = puntaje
            cuadroFinal.x = finalSepriente.x 
            cuadroFinal.y = finalSepriente .y+1 
            serpiente.push (cuadroFinal)
            velocidad = velocidad - RESTA_VELOCIDAD
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);   
          }
        }
        else if (direccionActual == "abajo") {
          finalSepriente = serpiente[longitud-1]
          moverAbajo();
          dibujarTodo();
          pintarSerpiente();
          verificarChoqueCuerpo()
          estadoPuntaje = atrapaComida()
          if (estadoPuntaje == true){
            puntaje =puntaje+1
            generarComida();
            modificarPuntaje=document.getElementById("puntaje")
            modificarPuntaje.textContent = puntaje
            cuadroFinal.x = finalSepriente.x 
            cuadroFinal.y = finalSepriente .y-1 
            serpiente.push (cuadroFinal)
            velocidad = velocidad - RESTA_VELOCIDAD
            clearInterval(intervaloSerpiente);
            intervaloSerpiente = setInterval(moverSerpiente, velocidad);   
          }
        } 
      }
      else{
        clearInterval(intervaloSerpiente);
        document.getElementById("estado").textContent = "Game Over"
        document.getElementById("mensaje").textContent = "GAME OVER - Puntaje final: " + puntaje
      }
    }

    function iniciarJuego(){
    document.getElementById("estado").textContent = "Jugando"
      document.getElementById("mensaje").textContent = " "
      generarComida();
      intervaloSerpiente = setInterval(moverSerpiente,velocidad);
  
    }

    function pausarJuego (){
      clearInterval(intervaloSerpiente);
    }

    function atrapaComida(){
      let posicionCabeza = serpiente[0]
      if ( comidaPosicionX == posicionCabeza.x &&
           comidaPosicionY== posicionCabeza.y){
            return true
           }
      else{
        return false
      }
    }

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function crearSerpienteInicial(){
      serpiente.length = 0;
      serpiente.push({x:5,y:9}),
      serpiente.push({x:4,y:9}),
      serpiente.push({x:3,y:9}),
      serpiente.push({x:2,y:9})
    }

    function reiniciarJuego(){
      pausarJuego();
      velocidad = 600;
      crearSerpienteInicial();
      direccionActual = "derecha";
      puntaje = 0 ;
      clearInterval(intervaloSerpiente);
      dibujarTodo();
      iniciarJuego();
      document.getElementById("estado").textContent = "Juego Reiniciado"
      document.getElementById("mensaje").textContent = "Presiona iniciar para comenzar."
      clearInterval(intervaloSerpiente);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarComida();
      pintarSerpiente();
    }





