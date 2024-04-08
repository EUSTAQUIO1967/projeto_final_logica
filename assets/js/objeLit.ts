// enum Estados {
//     'MG',
//     'SP',
//     'RJ',
//     'ES',
//     'DF',
// }

// const retornaNomesEstados: Record<Estados, () => void> = {
//     [Estados.MG]: () => console.log('MINAS GERAIS'),
//     [Estados.SP]: () => console.log('SAO PAULO'),
//     [Estados.RJ]: () => console.log('RIO DE JANEIRO'),
//     [Estados.ES]: () => console.log('ESPIRITO SANTO'),
//     [Estados.DF]: () => console.log('DISTRITO FEDERAL'),
// }

// const resultado = (estado: Estados) : void {
//     return retornaNomesEstados[estado]();
// }

// resultado('MG')

const nomeEstados = {
    MG: 'MINAS GERAIS',
    SP: 'SAO PAULO',
    RJ: 'RIO DE JANEIRO',
    ES: 'ESPIRITO SANTO',
    DF: 'DISTRITO FEDERAL',
};

let estado = "MG"
console.log(`Estado: ${nomeEstados[estado]}`)


