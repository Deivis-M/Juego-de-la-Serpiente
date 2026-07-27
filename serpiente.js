
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMANIO_CELDA = 25;
    const serpiente = [
      {x:20,y:9},
      {x:20,y:10},
      {x:20,y:11},
      {x:20,y:12},
      {x:20,y:13},
      {x:19,y:13},
      {x:18,y:13},
      {x:18,y:14},
      {x:17,y:14},
      {x:16,y:14},
      {x:16,y:13},
      {x:16,y:12},
      {x:16,y:11},
    ];
    

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
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarSerpiente();
    }





