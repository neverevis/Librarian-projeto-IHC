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
btn_enviar_registro = document.getElementById('btn_enviar_registro')

//definir elementos
modal_registro = document.getElementById('modal_registro');
catalogo = document.getElementById('catalogo');

//definir eventos
btn_registrar.addEventListener('click',toggle_modal_registro);
btn_fechar_registro.addEventListener('click',toggle_modal_registro);
btn_enviar_registro.addEventListener('click',adicionar);

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
    titulo = document.getElementById('titulo');
    titulo = document.getElementById('ano');
    titulo = document.getElementById('autor');
    titulo = document.getElementById('categoria');
    titulo = document.getElementById('capa');
    titulo = document.getElementById('edicao');

    if(validar() === true)
    {
        let Livro =
        {
            titulo: titulo.value,
            ano: ano.value,
            autor: autor.value,
            categoria: categoria.value,
            prioridade: 0,
            capa: capa.value,
            edicao: edicao.value,
            review: []
        }

        Livros.push(Livro);
        console.log(Livro)
        localStorage.setItem("Livros", JSON.stringify(Livros));
        toggle_modal_registro();
        atualizar_catalogo(Livros);
    }
}

function validar(){
    valido = true;

    if(titulo.value === '' && titulo.value.length <= 255)
        valido = false;
    if(ano.value >= new Date(Date.now()).getFullYear())
        valido = false;
    if(autor.value === '')
        valido = false;

    return valido;
}

function atualizar_catalogo(lista){
    if(lista.length > 0){

    }else{
        mensagem = document.createElement('p');
        mensagem.classList.add('text-muted')
        mensagem.textContent = "Não há livros a serem exibidos aqui";
        
        mensagem1 = document.createElement('p');
        mensagem1.classList.add('text-muted');
        mensagem1.textContent = "Não há livros a serem exibidos aqui";

        catalogo.appendChild(mensagem);
        catalogo.appendChild(mensagem1);
    }
}

atualizar_catalogo(Livros)