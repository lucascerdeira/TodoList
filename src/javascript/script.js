// Seleciona os elementos
const tarefasBtnAdd = document.getElementById('tarefasBtnAdd');
const tarefasEdit = document.getElementById('tarefasEdit');
const tarefasBtnFechar = document.getElementById('tarefasBtnFechar');
const navBarBtnFechar = document.getElementById('nav_bar_btn_fechar');
const tarefas_lista = [];


tarefasBtnAdd.addEventListener('click', function() {
    tarefasEdit.classList.add('open');
});


tarefasBtnFechar.addEventListener('click', function() {
    tarefasEdit.classList.remove('open');
});

navBarBtnFechar.addEventListener('click', function() {
    tarefasEdit.classList.remove('open');
});



