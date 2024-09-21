// Seleciona os elementos
const tarefasBtnAdd = document.getElementById('tarefasBtnAdd');
const tarefasEdit = document.getElementById('tarefasEdit');
const tarefasBtnFechar = document.getElementById('tarefasBtnFechar');
const navBarBtnFechar = document.getElementById('navBarBtnFechar');
const titulo = document.getElementById('tarefaNome');
const descricao = document.getElementById('tarefaDescricao');
const tarefasComConteudo = document.querySelector('.tarefas_com_conteudo');
const tarefasSemConteudo = document.getElementById('tarefasSemConteudo');
const tarefasLista = [];
const id = Date.now();

function salvarTarefa(){
    //console.log(titulo.value);
    //console.log(descricao.value);
    tarefasLista.push({
        id: id,
        titulo: titulo.value,
        descricao: descricao.value,
        isChecked: false
    });


    renderizarTarefas();
    fechar()
    localStorage.setItem('tarefasLista', JSON.stringify(tarefasLista));
    console.log(tarefasLista);
    

}
// fazer primeiro a estrutura statica no html depois só jogar aqui
function renderizarTarefas(){

    if (tarefasLista.length > 0) {
        
        tarefasSemConteudo.style.display = 'none';
        tarefasComConteudo.innerHTML = ''

        tarefasLista.forEach(obj => {
            //console.log(obj);

            const novaTarefa = document.createElement('div');
            novaTarefa.innerHTML = `
            <span>${obj.titulo}</span><br>
            <span>${obj.descricao}</span>
            `
            console.log(tarefasComConteudo);
            tarefasComConteudo.appendChild(novaTarefa);
        });
       
    }
}

tarefasBtnAdd.addEventListener('click', function() {
    tarefasEdit.classList.add('open');
});


tarefasBtnFechar.addEventListener('click', fechar)

navBarBtnFechar.addEventListener('click', fechar)

function fechar() {
    tarefasEdit.classList.remove('open');
}



