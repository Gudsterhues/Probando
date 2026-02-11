
function RegularPar(numero) {
  if (numero % 2 === 0) {
    console.log(`Regular: ${numero} es PAR`);
  } else {
    console.log(`Regular: ${numero} es IMPAR`);
  }
}

const FlechaPar = (numero) => {
  if (numero % 2 === 0) {
    console.log("Es par");
  } else {
    console.log("Es impar");
  }
};


RegularPar(8);   
FlechaPar(7);     
