/* ============================================================
   1) TIPOS / FORMAS COMUNES DE ARREGLOS
   ============================================================ */

// 1) Arreglo vacío
const a1 = [];
console.log(a1); // []

// 2) Arreglo simple (mismo tipo)
const a2 = [10, 20, 30];
console.log(a2); // [10, 20, 30]

// 3) Arreglo mixto (JS lo permite)
const a3 = [1, "hola", true, null];
console.log(a3); // [1, "hola", true, null]

// 4) Arreglo de objetos
const a4 = [
  { nombre: "Ana", edad: 20 },
  { nombre: "Luis", edad: 22 }
];
console.log(a4[0].nombre); // Ana

// 5) Arreglo multidimensional (matriz)
const a5 = [[1, 2], [3, 4], [5, 6]];
console.log(a5[1][0]); // 3

// 6) Arreglo "sparse" (con huecos)
const a6 = [1, , 3];
console.log(a6.length); // 3
console.log(a6[1]); // undefined

// 7) Typed Array (numérico optimizado)
const a7 = new Int16Array([100, 200, 300]);
console.log(a7); // Int16Array(3) [100, 200, 300]



/* ============================================================
   2) AGREGAR Y QUITAR ELEMENTOS (MODIFICAN EL ARRAY)
   ============================================================ */

const arr = [1, 2, 3];

// push: agrega al final
arr.push(4);
console.log(arr); // [1, 2, 3, 4]

// pop: quita el último
const ultimo = arr.pop();
console.log(ultimo); // 4
console.log(arr);    // [1, 2, 3]

// unshift: agrega al inicio
arr.unshift(0);
console.log(arr); // [0, 1, 2, 3]

// shift: quita el primero
const primero = arr.shift();
console.log(primero); // 0
console.log(arr);     // [1, 2, 3]



/* ============================================================
   3) UNIR Y COPIAR (NORMALMENTE NO MODIFICAN ORIGINALES)
   ============================================================ */

const a = [1, 2, 3];
const b = [4, 5, 6];

// concat: une arreglos (no modifica originales)
const unido = a.concat(b);
console.log(unido); // [1, 2, 3, 4, 5, 6]

// slice: copia una parte (inicio incluido, fin no incluido)
const parte = unido.slice(1, 4);
console.log(parte); // [2, 3, 4]



/* ============================================================
   4) BÚSQUEDA (ENCONTRAR ELEMENTOS O ÍNDICES)
   ============================================================ */

const nums = [5, 10, 15, 10];

// includes: existe o no
console.log(nums.includes(15)); // true

// indexOf: primera posición
console.log(nums.indexOf(10)); // 1

// find: primer elemento que cumple condición
const encontrado = nums.find(x => x > 9);
console.log(encontrado); // 10

// findIndex: índice del primero que cumpla
const idx = nums.findIndex(x => x === 15);
console.log(idx); // 2

// findLast: último que cumpla
const last = nums.findLast(x => x < 15);
console.log(last); // 10

// findLastIndex: índice del último que cumpla
const lastIdx = nums.findLastIndex(x => x === 10);
console.log(lastIdx); // 3



/* ============================================================
   5) RECORRER Y TRANSFORMAR (CREAN NUEVOS RESULTADOS)
   ============================================================ */

const base = [1, 2, 3, 4];

// forEach: recorre (no devuelve nuevo array)
base.forEach(n => console.log("valor:", n));

// map: transforma y devuelve nuevo array
const dobles = base.map(n => n * 2);
console.log(dobles); // [2, 4, 6, 8]

// filter: filtra por condición
const pares = base.filter(n => n % 2 === 0);
console.log(pares); // [2, 4]

// reduce: acumula a un solo valor
const suma = base.reduce((acc, n) => acc + n, 0);
console.log(suma); // 10
