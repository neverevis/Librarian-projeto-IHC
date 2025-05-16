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
input_pesquisa = document.getElementById('pesquisa');

//definir eventos
btn_registrar.addEventListener('click',toggle_modal_registro);
btn_fechar_registro.addEventListener('click',toggle_modal_registro);
btn_enviar_registro.addEventListener('click',adicionar);

input_pesquisa.addEventListener('input',filtrar)

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
    ano = document.getElementById('ano');
    autor = document.getElementById('autor');
    categoria = document.getElementById('categoria');
    capa = document.getElementById('capa');
    edicao = document.getElementById('edicao');

    if(validar() === true)
    {
        let Livro =
        {
            id: crypto.randomUUID(),
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
    catalogo.innerHTML = '';

    if(lista.length > 0){
        for(let item of lista){

            card = document.createElement('div');
            card.classList.add("card","bg-transparent","m-0","px-2","mb-2","border-0","card-size");

            card.innerHTML +=   `
                                <img src= "${item.capa}" class="card-img-top round-2" alt="Capa do filme" style="width: 100%; object-fit: cover;">
                                <div class="card-body">
                                    <h5 class="card-title text-center mb-0 text-white">${item.titulo}</h5>
                                </div>
                                `

            catalogo.appendChild(card)

            btn_excluir = document.createElement("button");
            btn_excluir.classList.add("btn","btn-danger");
            btn_excluir.innerHTML = `<i class="bi bi-trash-fill"></i>`
            card.appendChild(btn_excluir)
            btn_excluir.addEventListener("click", ()=> 
                {
                    Livros = Livros.filter(livro => livro.id !== item.id);
                    filtrar();
                    localStorage.setItem('Livros',JSON.stringify(Livros))

                })
        }

    }else{
        document.getElementById('mensagem_catalogo').classList.add('d-none');
    }
}

function filtrar(){
    input = pesquisa.value;
    
    catalogo_filtrado = Livros.filter(livro => livro.titulo.toLowerCase().includes(input.toLowerCase()))

    atualizar_catalogo(catalogo_filtrado);
}

atualizar_catalogo(Livros)