let contador
let f=0;

function guardar_valor(){
    contador=contador+1;
    localStorage.setItem("code",contador);

}

function obtener_valor(){
    if(f==0){
        contador = 0;
        localStorage.setItem("code",contador);
        f=1;
    }
    console.log("a");
    let valor = localStorage.getItem("code");
    console.log("a");
    let cantidad = valor.length;
    valor.padStart(5 - cantidad,"0");
    return valor;

}

module.exports = { guardar_valor };
module.exports = { obtener_valor };