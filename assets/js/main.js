
const inputTexto = document.querySelector('.inputTexto')
const btnAdcTarefa = document.querySelector('.btn-adc-tarefa')
const divResultado = document.querySelector('.resultado')
const formulario = document.querySelector('.form')


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
    salvarTarefas(); 
  }
})

function salvarTarefas() {
  const pTarefas = divResultado.querySelectorAll('p'); 
  const listaDeTarefas = [];

  for (let p of pTarefas) {
    let tarefaTexto = p.innerText
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
    listaDeTarefas.push(tarefaTexto);
  
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas); 
  localStorage.setItem('tarefas', tarefasJSON);

}

function adcTarefasSalvas() {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas); 
  
  for (let tarefa of listaDeTarefas) {
    novaTarefa(tarefa);
  }

}

adcTarefasSalvas();