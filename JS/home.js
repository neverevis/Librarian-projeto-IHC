//Trazendo ; Criando Livros do localStorage
let Livros;
let Contas;

if(localStorage.getItem('Livros') === null)
    Livros = [];
else
    Livros = JSON.parse(localStorage.getItem("Livros"));

//trazer a lista de contas do localStorage
if(JSON.parse(localStorage.getItem("Contas")) !== null)
    Contas = JSON.parse(localStorage.getItem("Contas"));
else
    Contas = [];

//verificar se há contas logadas (salva informações da conta logada em Conta)
for(conta of Contas)
{
    if(conta.login == true)
    {
        ContaLogada = conta;
        break;
    }
}

//definir botões
btn_registrar = document.getElementById('btn_registrar');
btn_fechar_registro = document.getElementById('btn_fechar_registro')

//definir elementos
modal_registro = document.getElementById('modal_registro');

//definir eventos
btn_registrar.addEventListener('click',toggle_modal_registro);
btn_fechar_registro.addEventListener('click',toggle_modal_registro);

//funcões
function toggle_modal_registro(){
    if(modal_registro.classList.contains('d-none')){
        modal_registro.classList.remove('d-none');
    }
    else{
        modal_registro.classList.add('d-none')
    }
}

//adicionar filme registrado
function adicionar()
{
    if(validar() === true)
    {
        let Livro =
        {
            id: null,
            titulo: titulo.value,
            ano: ano.value,
            autor: autor.value,
            categoria: categoria.value,
            prioridade: prioridade,value,
            capa: capa.value,
            edicao: edicao.value,
            review: []
        }

        Livros.push(Livro);
        Livros[Livros.length-1].id = Livros.length-1;
        localStorage.setItem("Livros", JSON.stringify(Livros));
        fecharModalReg();
    }

    atualizarCatalogo(Livros);
}

function validar(){
    valido = true;

    if(titulo.value == '' && titulo.value.length <= 255)
        valido = false;
    if(ano.value > new Date.getFullYear)
        valido = false;
    if(autor.value == '')
        valido = false;

}