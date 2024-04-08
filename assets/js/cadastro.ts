// Criar o tipo "Cliente"
// Criar o Cliente, remover, atualizar, listar todos os clientes, listar detalhes de um cliente;
// Funcoes que vão ser utilizadas
//adicionarCliente, removerCliente, atualizarCliente, listarClientes, listarClientePorId;
//Validaçoes
//Array de clientes.
// pegar dados do form:
//depois de validados 

let id = -1 // id inicialização do cliente.

type Cliente = {
    id: number,
    cpf: string,
    nome: string,
    endereco: string,
    telefone: string,
    saldo: string,
}

let clientes: Cliente[] = [];
let formulario: any = document.querySelector('.formulario');
let campoTelefone = document.querySelector('#telefone')
let campoCPF = document.querySelector('#cpf');
let tabelaDetalhes: Object | any = document.querySelector('.detalhes-lancamentos')

let clienteAlterar: Object  = {};


campoTelefone?.addEventListener('blur', function(){
    let valorCampo = mascTelefone(this.value)
    this.value = valorCampo;
})

campoCPF?.addEventListener('blur', function(){
    let valorCampo = mascCPF(this.value)
    this.value = valorCampo;
    if (!validaCPF(this.value)) {
        this.value = '';
        this.placeholder = 'Ops, CPF inválido, informe somente números !!!';
        this.focus();
        return false;
    }
})


const validarCampos: boolean = (form: Object) => {
        
    let inputs = getCamposFormulario(form);
    
    let temErro:boolean = false;
   
    inputs.forEach((input:Object) => {
        if (input.name === 'cpf') {
            if (input.value === '' || !validaCPF(input.value)){
                alert("CPF inválido");
                input.focus();
                temErro = true;
            }
        } 
       
        if (input.name === 'nome'){
            if(input.value === null || input.value === '') {
                alert("Nome do cliente é obrigatorio");
                input.focus();
                temErro = true;
            }
        }  
        
        if (input.name === 'endereco'){
            if(input.value === null || input.value === '') {
                alert("Endereço do cliente é obrigatorio");
                input.focus();
                temErro = true;
        } 
        
   })

  return temErro;
}


const limparCamposDoFormulario = (formulario: Object) =>{
    
    let campos = getCamposFormulario(formulario);
    campos.forEach(campo => {
        campo.value = '';
    })

}

// logica de interação com o usuario
formulario.addEventListener('click', function(e){
    const el = e.target;

    if (el.classList.contains('btn-incluir')) {
       if (!validarCampos(formulario)){
            pegaDadosForm(formulario)
            limparCamposDoFormulario(formulario);
       }
         
    }

    if (el.classList.contains('btn-excluir')) {

        excluirCliente()

    }

    if (el.classList.contains('btn-atualizar')) {

        atualizarCliente();
        limparCamposDoFormulario(formulario);

    }
    
    if (el.classList.contains('btn-buscar-cliente')) {
        let clienteAlterar = prompt('Informe id do cliente a alterar: ')
            selecionarCliente(clienteAlterar);
    }

})

const excluirCliente =  () => {
    let idCliente: number = Number(prompt('Informe id do cliente para ser excluido:'));

    let conf: string = confirm(`Confirma a exclusão do id ${idCliente} ???`);


    if (!conf) {
        alert('Exclusão cancelada !!!')
        return;
    } else {

        let clienteARemover = clientes.find(ele => {
            return ele.id === parseInt(idCliente)
        })
    
        let indice = clientes.indexOf(clienteARemover);
        
        if (indice !== -1) {
            clientes.splice(indice, 1)
        } else {
            alert('id do cliente informado não existe!!!')
            return;
        }
    }
   
    trataArray(clientes);
}

// rotina de alteração de usuário
const selecionarCliente: void = (id) => {

    let dadosCliente: Object = clientes.find(ele => {
        return ele.id === parseInt(id)
    })

    let campos = getCamposFormulario(formulario);

    campos.forEach(campo => {

        switch(campo.name){
            case 'cpf':
                campo.value = dadosCliente['cpf'].trim();
                break;
            case 'nome':
                campo.value = dadosCliente.nome;
                break;
            case 'endereco':
                campo.value = dadosCliente.endereco;
                break;
            case 'telefone':
                campo.value = dadosCliente.telefone;
                break;
            case 'saldo':
                campo.value = dadosCliente.saldo;
                break;
            default:
                console.log("Campo não esperado")

        }

    })

    clienteAlterar = dadosCliente;

  }

const atualizarCliente = () =>{

    let id = clienteAlterar.id;
    
    let campos = getCamposFormulario(formulario);

    let cliente: number | any = clientes.find((ele) => {
        return ele.id === parseInt(id)
    })

    let indice = clientes.indexOf(cliente);

    campos.forEach(campo => {
          if (campo.name == 'nome') {
              clientes[indice].nome = campo.value;
          }
        
        if (campo.name == 'endereco') {
            clientes[indice].endereco = campo.value;
        }

        if (campo.name == 'telefone') {
            clientes[indice].telefone = campo.value;
        }

        if (campo.name == 'saldo') {
            clientes[indice].saldo = campo.value;
        }
    })


    trataArray(clientes);
}

//gerador de id 
const geraIdCliente:number = (id:number) => ++id;


const criaTr:Object = () => {
    const tr = document.createElement('tr')
    return tr;
};

const adicionaTdNaTr:Object = (tr:Object, valor: string) => {
    const td = document.createElement('td');
    td.innerText = valor;
    tr.appendChild(td);
    return tr;
};

const adicionaTrNaTabela: void = (tr: Object) => {
    tabelaDetalhes.appendChild(tr);
}


const trataArray: void = (clientes) => {
    // limpa a tabela primeiro para iteirar no array de Clientes
    tabelaDetalhes?.innerHTML = '';

     clientes.forEach(elemento =>{
        let tr = criaTr();
            Object.keys(elemento).forEach(key => {
                adicionaTdNaTr(tr, elemento[key])    
            })
            adicionaTrNaTabela(tr)  
     })
}


const getCamposFormulario: Object = (formulario: Object) {
    return formulario.querySelectorAll('input');
}

const pegaDadosForm = (form) => {
    let campos = getCamposFormulario(form);

    id = geraIdCliente(id);

    let cliente: Cliente  = {
        id: geraIdCliente(id)
    };

    campos.forEach(campo =>{
     
        if ((campo.name).trim() === 'cpf') {
            cliente[campo.name] = mascCPF(campo.value)
        } else if(campo.name.trim() === 'telefone') {
            cliente[campo.name] = mascTelefone(campo.value)
        } else {
            cliente[campo.name] = campo.value;
        }
        
        
    })

    clientes.push(cliente);
    // manda inserir no array Clientes e no display
    trataArray(clientes);
    
}

// VAlidação de CPF.

const validaCPF: boolean = (strCPF: string | any ) => {

    let cpfsInvalidos = [
        "00000000000",
        "11111111111",
        "22222222222",
        "33333333333",    
        "44444444444",
        "55555555555",
        "66666666666",
        "77777777777",
        "88888888888",
        "99999999999"
    ]


    let cpfSemMasc: string = strCPF.replaceAll(/[- \\. a-zA-Z]/g , '');
    let somaDosDigitos:number = 0;
    let multiplicador:number = 10;
   
    
    // se o cpf informado estiver entre os cpfs invalidos encerra rotina
    if ((cpfsInvalidos.indexOf(cpfSemMasc) >= 1)) {
        return false;
    }

    // processa os primeiros 9 numeros para achar o primeiro digito
    for (let i:number = 0; i < 9 ; i++) {
        somaDosDigitos += parseInt(cpfSemMasc[i]) * multiplicador--;
    }

    let restoDaDivisao:number = (somaDosDigitos * 10) % 11;

    console.log('1',restoDaDivisao)

    let primeiroDigito:number = 0;

    if (restoDaDivisao !== 10 || restoDaDivisao !== 11){
        primeiroDigito = restoDaDivisao
    } 

    const cpfComPrimeiroDigitoCalculado:string = cpfSemMasc.slice(0,9)  + primeiroDigito.toString();

    // calculo do segundo digito
    multiplicador = 11;
    somaDosDigitos = 0;

    for (let i:number = 0 ; i < cpfComPrimeiroDigitoCalculado.length; i++){
        somaDosDigitos += parseInt(cpfComPrimeiroDigitoCalculado[i]) * multiplicador--
    }

    restoDaDivisao = (somaDosDigitos * 10) % 11

    console.log('2',restoDaDivisao)

    let segundoDigito:number = 0;
    if (restoDaDivisao !== 10 || restoDaDivisao !== 11)) {
        segundoDigito = restoDaDivisao;
    }

    console.log(segundoDigito)
    const cpfCompleto:string = cpfComPrimeiroDigitoCalculado + segundoDigito.toString();
    return (cpfCompleto === cpfSemMasc) ? true : false;

}

const mascTelefone: string = (telefone: any) => {
    let telefoneStr = telefone.toString().replace(/[- \\(\\)\\.]/gi, '');
    console.log(telefoneStr);
    return `(${telefoneStr.substring(0,2)}) ${telefoneStr.substring(2,7)}-${telefoneStr.substring(7,11)}`; // 31999975708
 }

const mascCPF: string = (cpf: string) => {

    let cpfStr = cpf.toString().replace(/[- \\. a-zA-Z]/g,'');
    return `${cpfStr.substring(0,3)}.${cpfStr.substring(3,6)}.${cpfStr.substring(6,9)}-${cpfStr.substring(9,11}`;  

}

