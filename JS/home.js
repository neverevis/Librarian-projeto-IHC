//Trazendo ; Criando Livros do localStorage
let Livros;
let Contas;
let ContaLogada = null;
let opt = 1;

if(localStorage.getItem('Contas') === null)
    Contas = [];
else
    Contas = JSON.parse(localStorage.getItem("Contas"))

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
        document.getElementById('exibir').classList.remove('d-none')
        document.getElementById('btn_conta').classList.remove('d-none')
        document.getElementById('usuario-nome').textContent = ContaLogada.usuario
        document.getElementById('btn_cadastrar').classList.add('d-none')
        document.getElementById('btn_login').classList.add('d-none')

        break;
    }
}

//definir botões
btn_registrar = document.getElementById('btn_registrar');
btn_fechar_registro = document.getElementById('btn_fechar_registro')
btn_enviar_registro = document.getElementById('btn_enviar_registro')
btn_logout = document.getElementById('btn_logout')
btn_todos = document.getElementById('btn_todos')
btn_colecao = document.getElementById('btn_colecao')

//definir elementos
modal_registro = document.getElementById('modal_registro');
catalogo = document.getElementById('catalogo');
input_pesquisa = document.getElementById('pesquisa');
modal_livro = document.getElementById('modal_livro')
btn_fechar_modal_livro = document.getElementById('btn_fechar_modal_livro')
capa_livro = document.getElementById('capa_livro')

//definir eventos
btn_registrar.addEventListener('click',toggle_modal_registro);
btn_fechar_registro.addEventListener('click',toggle_modal_registro);
btn_enviar_registro.addEventListener('click',adicionar);
btn_logout.addEventListener('click',logout)
btn_todos.addEventListener('click',filtrarTodos)
btn_colecao.addEventListener('click',filtrarColecao)
btn_fechar_modal_livro.addEventListener('click',toggleModalLivro)

input_pesquisa.addEventListener('input',filtrar)

//funcões
function logout(){
    for(conta of Contas){
        if(conta.login)
            conta.login = false;
    }

    localStorage.setItem("Contas", JSON.stringify(Contas));
    window.location.href = "home.html";
}

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

            let esta_na_colecao = false;

            if(ContaLogada !== null){
                for(livro of ContaLogada.colecao){
                    if(livro.id === item.id)
                        esta_na_colecao = true;
                }
            }
           
            let card = document.createElement('div');
            card.classList.add("card", "bg-transparent", "m-0", "px-2", "mb-2", "border-0", "card-size");

            let capa = document.createElement('img');
            capa.classList.add("card-img-top", "round-2");
            capa.src = item.capa
            capa.style.width = '100%';
            capa.style.objectFit = 'cover';

            card.appendChild(capa)

            let cardBody = document.createElement('div');
            cardBody.classList.add("card-body")
            cardBody.innerHTML = `<h5 class="card-title text-center mb-2 text-white">${item.titulo}</h5>`

            card.appendChild(cardBody)

            // Criando container flexível para os botões
            let div_botoes = document.createElement('div');
            div_botoes.classList.add("d-flex", "gap-2", "px-2", "pb-2");

            let btn_excluir = document.createElement("button");
            btn_excluir.classList.add("btn", "btn-danger", "w-50");
            btn_excluir.innerHTML = `Excluir <i class="bi bi-trash-fill"></i>`;

            let btn_adicionar_colecao = document.createElement("button");
            if(ContaLogada === null)
                btn_adicionar_colecao.classList.add('disabled')

            if(!esta_na_colecao){
                btn_adicionar_colecao.innerHTML = `Adicionar na coleção <i class="bi bi-bookmark"></i>`;
                btn_adicionar_colecao.classList.add("btn", "btn-success", "w-50");
            }
            else{
                btn_adicionar_colecao.innerHTML = `Remover da coleção <i class="bi bi-bookmark-check-fill"></i>`;
                btn_adicionar_colecao.classList.add("btn", "btn-warning", "w-50");

            }

            div_botoes.appendChild(btn_excluir);
            div_botoes.appendChild(btn_adicionar_colecao);

            card.appendChild(div_botoes);
            catalogo.appendChild(card);

            capa.addEventListener('click', toggleModalLivro)

            btn_excluir.addEventListener("click", () => {
                Livros = Livros.filter(livro => livro.id !== item.id);
                filtrar();
                localStorage.setItem('Livros', JSON.stringify(Livros));
            });

            if (ContaLogada !== null && !esta_na_colecao) {
                btn_adicionar_colecao.addEventListener("click", () => {
                    let livro = {
                        id: item.id,
                        titulo: item.titulo,
                        ano: item.ano,
                        autor: item.autor,
                        categoria: item.categoria,
                        prioridade: item.prioridade,
                        capa: item.capa,
                        edicao: item.edicao,
                        review: item.review
                    };

                    ContaLogada.colecao.push(livro)
                    localStorage.setItem("Contas", JSON.stringify(Contas));
                    filtrar()
                });
            }else{
                btn_adicionar_colecao.addEventListener("click", () => {
                    ContaLogada.colecao = ContaLogada.colecao.filter(livro => livro.id !== item.id);
                    localStorage.setItem("Contas", JSON.stringify(Contas));
                    filtrar()
                });
            }
        }
    } else {
        document.getElementById('mensagem_catalogo').classList.add('d-none');
    }
}


function filtrar(){
    input = pesquisa.value;
    
    if(opt === 1)
        catalogo_filtrado = Livros.filter(livro => livro.titulo.toLowerCase().includes(input.toLowerCase()))
    else
        catalogo_filtrado = ContaLogada.colecao.filter(livro => livro.titulo.toLowerCase().includes(input.toLowerCase()))

    atualizar_catalogo(catalogo_filtrado);
}

function filtrarTodos(){
    opt = 1;
    filtrar();
}

function filtrarColecao(){
    opt = 2;
    filtrar();
}

function toggleModalLivro(){
    modal_livro.classList.toggle('d-none')
}

atualizar_catalogo(Livros)