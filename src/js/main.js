let $inputtarefa = document.getElementById('inputtarefa');
let $btnadicionar = document.getElementById('btnadicionar');
let $excluir = document.getElementById('excluir');
let $editar = document.getElementById('')
let $janelaedicaofundo = document.getElementById('janelaedicaofundo');
let $lista = document.querySelector('.lista');
let $cancelar = document.getElementById('cancelar');
let $edicaonome = document.getElementById('edicaonome');
let $botaoedicao = document.getElementById('botaoedicao');
let $idtarefaedicao = document.getElementById('idtarefaedicao');

$inputtarefa.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {
        if ($inputtarefa.value == '') {
            alert('Preencha todos os campos antes de criar uma nova tarefa');
            return
        }
        let tarefa = {
            nome: $inputtarefa.value,
            id: GeradorId()
        };
        AdicionarTarefa(tarefa)

    }
})

$btnadicionar.addEventListener('click', (e) => {
    if ($inputtarefa.value == '') {
        alert('Preencha todos os campos antes de criar uma nova tarefa');
        return
    }
    let tarefa = {
        nome: $inputtarefa.value,
        id: GeradorId()
    };
    console.log(tarefa)
    AdicionarTarefa(tarefa)
    $inputtarefa.focus();

})

$cancelar.addEventListener('click', () => {
    alternarJanelaEdicao()
})

$botaoedicao.addEventListener('click', (e) => {
    e.preventDefault();
    let iddatarefa = $idtarefaedicao.innerHTML.replace('#','');
    let tarefa = {
        nome: $edicaonome.value,
        id: iddatarefa
    }

    let tarefaAtual = document.getElementById('' + iddatarefa + '');

    let li = CriarTagli(tarefa);
    $lista.replaceChild(li, tarefaAtual)
    alternarJanelaEdicao()
})


function GeradorId() {
    var id = Math.floor(Math.random() * 5000);
    return id
}

function AdicionarTarefa(tarefa) {
    let li = CriarTagli(tarefa);
    $lista.appendChild(li);
    $inputtarefa.value = '';

}

function CriarTagli(tarefa) {
    let li = document.createElement('li');
    li.classList.add('lista-individual');
    li.classList.add('center');
    li.id = tarefa.id;

    let p = document.createElement('p');
    p.classList.add('tarefa');
    p.innerHTML = tarefa.nome;


    let btnEditar = document.createElement('i');
    btnEditar.classList.add('fa-solid');
    btnEditar.classList.add('fa-pencil');
    btnEditar.setAttribute('onclick', 'editar('+tarefa.id+')')

    let btnExcluir = document.createElement('i');
    btnExcluir.classList.add('fa-solid');
    btnExcluir.classList.add('fa-trash-can');
    btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')')

    li.appendChild(p);
    li.appendChild(btnEditar);
    li.appendChild(btnExcluir)
    return li
}

function excluir(idtarefa) {
    let confirmacao = window.confirm('Tem certeza que deseja remover a tarefa?');
    if (confirmacao) {
        let li = document.getElementById('' + idtarefa + '');
        if (li) {
            $lista.removeChild(li);
        }
    }
}

function editar(idtarefa){
    let li = document.getElementById(''+ idtarefa + '');
    if(li){
        $idtarefaedicao.innerHTML = '#' + idtarefa;
        $edicaonome.value = li.innerText;
        alternarJanelaEdicao(idtarefa);


    }
}

function alternarJanelaEdicao() {
    $janelaedicaofundo.classList.toggle('abrir');
    $janelaedicaofundo.classList.toggle('fechar')
}