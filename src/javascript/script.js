// Seleciona os elementos
const tarefasBtnAdd = document.getElementById('tarefasBtnAdd');
const tarefasEdit = document.getElementById('tarefasEdit');
const tarefasBtnFechar = document.getElementById('tarefasBtnFechar');
const navBarBtnFechar = document.getElementById('navBarBtnFechar');
const titulo = document.getElementById('tarefaNome');
const descricao = document.getElementById('tarefaDescricao');
const tarefasComConteudo = document.querySelector('.tarefas_com_conteudo');
const tarefasSemConteudo = document.getElementById('tarefasSemConteudo');
let tarefasLista = JSON.parse(localStorage.getItem('tarefasLista')) || [];
let tarefaEmEdicao = null;  


function salvarTarefa() {

    if (titulo.value.trim() === "") {
        alert("O campo 'Nome' é obrigatório."); 
        return;
    }

    if (tarefaEmEdicao) {
        
        tarefaEmEdicao.titulo = titulo.value;
        tarefaEmEdicao.descricao = descricao.value;
    } else {
        
        const tarefa = {
            id: Date.now(),
            titulo: titulo.value,
            descricao: descricao.value,
            isChecked: false
        };
        tarefasLista.push(tarefa);
    }

    localStorage.setItem('tarefasLista', JSON.stringify(tarefasLista));
    renderizarTarefas();
    fechar();
}


function renderizarTarefas() {
    if (tarefasLista.length > 0) {
        tarefasSemConteudo.style.display = 'none';
        limparTela()

        tarefasLista.forEach((obj, index) => {
            const novaTarefa = document.createElement('div');
            novaTarefa.classList.add('tarefa');

            novaTarefa.innerHTML = `
                <input type="checkbox" ${obj.isChecked ? 'checked' : ''} data-index="${index}" />
                <div class="tarefa-conteudo ${obj.isChecked ? 'checked' : ''}">
                    <span>${obj.titulo}</span>
                    <span>${obj.descricao}</span>
                </div>
                <div class="tarefa-acoes">
                    <button type="button" class="editarTarefa" dataId="${obj.id}">
                        <img src="./src/images/edit.svg"  title="Editar"/>
                    </button>
                    <button type="button" class="deletarTarefa" dataId="${obj.id}">
                        <img src="./src/images/trash.svg"  title="Deletar" />
                    </button>
                </div>
            `;
            
            tarefasComConteudo.appendChild(novaTarefa);

            
            const checkbox = novaTarefa.querySelector('input[type="checkbox"]');
            const tarefaConteudo = novaTarefa.querySelector('.tarefa-conteudo');

            checkbox.addEventListener('change', function() {
                obj.isChecked = this.checked;
                if (this.checked) {
                    tarefaConteudo.classList.add('checked'); 
                } else {
                    tarefaConteudo.classList.remove('checked'); 
                }
                localStorage.setItem('tarefasLista', JSON.stringify(tarefasLista));
            });
        });

        // Deletar e editar ao clicar no icone
        document.querySelectorAll('.editarTarefa').forEach(button => {
            button.addEventListener('click', editarTarefa);
        });
        document.querySelectorAll('.deletarTarefa').forEach(button => {
            button.addEventListener('click', deletarTarefa);
        });
    } else {
        SemConteudo()
        limparTela()
    }
}


tarefasBtnAdd.addEventListener('click', function() {
    tarefaEmEdicao = null; 
    titulo.value = '';
    descricao.value = '';
    tarefasEdit.classList.add('open');
});


function editarTarefa(event) {
    const tarefaId = event.currentTarget.getAttribute('dataId');
    tarefaEmEdicao = tarefasLista.find(t => t.id == tarefaId);

    titulo.value = tarefaEmEdicao.titulo;
    descricao.value = tarefaEmEdicao.descricao;

    tarefasEdit.classList.add('open');
}


function deletarTarefa(event) {
    const tarefaId = event.currentTarget.getAttribute('dataId');
    tarefasLista = tarefasLista.filter(t => t.id != tarefaId);

    localStorage.setItem('tarefasLista', JSON.stringify(tarefasLista));

    
    if (tarefasLista.length === 0) {
        SemConteudo();
    }

    renderizarTarefas(); 
}

function SemConteudo(){
    tarefasSemConteudo.style.display = 'block';
}

function limparTela(){
    tarefasComConteudo.innerHTML = ''; 
}

function fechar() {
    tarefasEdit.classList.remove('open');
}

tarefasBtnFechar.addEventListener('click', fechar);
navBarBtnFechar.addEventListener('click', fechar);


renderizarTarefas();
