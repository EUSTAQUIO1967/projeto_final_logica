function meuMap(funcao, lista) {
    let resultado = [];
    for (let i = 0; i < lista.length; i++) {
        resultado.push(funcao(lista[i]))
    }
    return resultado;
  }

  let resultado =  ([2, 4, 6], meuMap(x => x * 2, [1, 2, 3]));
  console.log(resultado);


const result1 = [1,2,3,4,5,6,7,8,9,10]
console.log(result1.filter(n => n % 2 === 0)
.map(a => a * 10 )
.reduce( (a, b) => a + b, 0 ));

// implementando  
const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let result = 0;
for (let i = 0; i < numList.length; i++) {
  if (numList[i] % 2 === 0) {
    result += numList[i] * 10;
  }
}

console.log(result)