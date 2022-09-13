/*
Algoritmo lista de tarefas (passos que eu fiz antes da aula)

1- Recebe texto (string) e armazena; OK!
2- Um botão é acionado (Adicionar tarefa); OK!
3- Tarefa digitada e enviada é adicinada na página (em elemento); OK!
4- Os resultados continuam na página, se não forem apagados (botão de apagar ao lado) OK!



Elementos novos trazidos nessa aula !!!! 
1- setAttribute() -> Adiciona atributos a um elemento 
2- trim() -> remove espaços em branco de um array 
3- JSON -> formato usado para cruzar informações entre várias plataformas + setItem() + parse()+ getItem() 
4- Local Storange -> Guardar informações no navegador 
 */

/*VARIÁVEIS*/

//Seleção dos elementos HTML para manipulação via JavaScript 
const inputTexto = document.querySelector('.inputTexto')
const btnAdcTarefa = document.querySelector('.btn-adc-tarefa')
const divResultado = document.querySelector('.resultado')
const formulario = document.querySelector('.form')

// Impedindo que o formulário seja enviado
formulario.addEventListener('submit', function (event) {
  event.preventDefault()
})

inputTexto.addEventListener('keypress', function (e) {
  if (e.keycode === 13) {
    if (!inputTexto.value) return
    novaTarefa(inputTexto.value)
  }
})

btnAdcTarefa.addEventListener('click', function () {
  if (!inputTexto.value) return
  novaTarefa(inputTexto.value)
})

function novaTarefa(textoInput) {
  let tarefa = textoInput
  let p = document.createElement('p')
  p.innerHTML = tarefa
  divResultado.appendChild(p)
  limpaInput()
  criaBtnApagar(p)
  salvarTarefas()
}

function criaBtnApagar(p) {
  p.innerHTML += ' '
  const btnApagar = document.createElement('button')
  btnApagar.innerText = 'Apagar'
  p.appendChild(btnApagar)
  btnApagar.setAttribute('class', 'apagar')
}

function limpaInput() {
  inputTexto.value = ''
  inputTexto.focus()
}

document.addEventListener('click', function (e) {
  const el = e.target
  if (el.classList.contains('apagar')) {
    el.parentElement.remove()
    salvarTarefas(); // chama a função de salvar e verifica os itens que foram apagados, simplesmente atualizando o array 
  }
})

function salvarTarefas() {
  const pTarefas = divResultado.querySelectorAll('p') //selecionei os elementos criados
  const listaDeTarefas = [] // criei array (um tipo de lista) que irá armazenar as tarefas digitadas.

  for (let p of pTarefas) {
    let tarefaTexto = p.innerText
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim() //função trim remove espaço em branco entre os elementos do array
    listaDeTarefas.push(tarefaTexto)
  
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); // transformo o array com as tarefas para o formato JSON
  localStorage.setItem('tarefas', tarefasJSON);

}

function adcTarefasSalvas() {

  // Acesso o local Storage e seleciono o item tarefas, salvo com este nome (na linha 86)
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); // transformo o JSON em elemento JS 
  
  // Com o array em formato de JS, uso o for para percorre-lo e usar os elementos para criar as tarefas por meio da função novaTarefa
  for (let tarefa of listaDeTarefas) {
    novaTarefa(tarefa);
  }

}

adcTarefasSalvas();