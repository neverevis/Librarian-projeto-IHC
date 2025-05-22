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

if(ContaLogada === null)
{
    document.getElementById('btn_comentar').classList.add('disabled')
    document.getElementById('btn_comentar').textContent = "Enviar"
}

//definir botões
btn_registrar = document.getElementById('btn_registrar');
btn_fechar_registro = document.getElementById('btn_fechar_registro')
btn_enviar_registro = document.getElementById('btn_enviar_registro')
btn_logout = document.getElementById('btn_logout')
btn_todos = document.getElementById('btn_todos')
btn_colecao = document.getElementById('btn_colecao')
btn_nao_excluir = document.getElementById('btn_nao_excluir')
btn_sim_excluir = document.getElementById('btn_sim_excluir')

//definir elementos
modal_registro = document.getElementById('modal_registro');
modal_excluir = document.getElementById('modal_excluir');
catalogo = document.getElementById('catalogo');
input_pesquisa = document.getElementById('pesquisa');
modal_livro = document.getElementById('modal_livro')
btn_fechar_modal_livro = document.getElementById('btn_fechar_modal_livro')
btn_comentar = document.getElementById('btn_comentar')
capa_livro = document.getElementById('capa_livro')
comentario_input = document.getElementById('comentario_input')

titulo_field = document.getElementById('titulo_field')
sinopse_field = document.getElementById('sinopse_field')
categoria_field = document.getElementById('categoria_field')
autor_field = document.getElementById('autor_field')
edicao_field = document.getElementById('edicao_field')
ano_field = document.getElementById('ano_field')
comentarios_field = document.getElementById('comentarios_field')

//definir eventos
btn_registrar.addEventListener('click',toggle_modal_registro);
btn_fechar_registro.addEventListener('click',toggle_modal_registro);
btn_enviar_registro.addEventListener('click',adicionar);
btn_logout.addEventListener('click',logout)
btn_todos.addEventListener('click',filtrarTodos)
btn_colecao.addEventListener('click',filtrarColecao)
btn_fechar_modal_livro.addEventListener('click',toggleModalLivro)
btn_nao_excluir.addEventListener('click',toggleModalExcluir)

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
    sinopse = document.getElementById('sinopse');
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
            sinopse: sinopse.value,
            ano: ano.value,
            autor: autor.value,
            categoria: categoria.value,
            prioridade: 0,
            capa: capa.value,
            edicao: edicao.value,
            review: [],
            comentarios: []
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
                for(let livro of ContaLogada.colecao){
                    if(livro.id === item.id)
                        esta_na_colecao = true;
                }
            }
           
            let card = document.createElement('div');
            card.classList.add("card", "bg-transparent", "m-0", "px-2", "mb-2", "border-0", "card-size");

            let capa = document.createElement('img');
            capa.classList.add("img-capa", "round-2","ms-2");
            capa.src = item.capa

            card.appendChild(capa)

            let cardBody = document.createElement('div');
            cardBody.classList.add("card-body")
            cardBody.innerHTML = `<h5 class="card-title text-center mb-2 text-white">${item.titulo}</h5>`

            card.appendChild(cardBody)

            // Criando container flexível para os botões
            let div_botoes = document.createElement('div');
            div_botoes.classList.add("d-flex", "gap-2", "px-2", "pb-2");

            let btn_excluir = document.createElement("button");
            btn_excluir.classList.add("btn", "btn-danger", "w-50","p-0","m-0");
            btn_excluir.innerHTML = `<p class="textopequeno mt-2">Excluir <i class="bi bi-trash-fill"></i></p>`;

            let btn_adicionar_colecao = document.createElement("button");
            if(ContaLogada === null)
                btn_adicionar_colecao.classList.add('disabled')

            if(!esta_na_colecao){
                btn_adicionar_colecao.innerHTML = `<p class="textopequeno mt-2">Adicionar a coleção <i class="bi bi-bookmark"></i></p>`;
                btn_adicionar_colecao.classList.add("btn", "btn-success", "w-50","p-0","m-0");
            }
            else{
                btn_adicionar_colecao.innerHTML = `<p class="textopequeno mt-2">Remover da coleção <i class="bi bi-bookmark-check-fill"></i></p>`;
                btn_adicionar_colecao.classList.add("btn", "btn-warning", "w-50","p-0","m-0");

            }

            div_botoes.appendChild(btn_excluir);
            div_botoes.appendChild(btn_adicionar_colecao);

            card.appendChild(div_botoes);
            catalogo.appendChild(card);

            capa.addEventListener('click', () => {
                toggleModalLivro();

                capa_field.src = item.capa
                titulo_field.textContent = item.titulo
                sinopse_field.textContent = item.sinopse
                categoria_field.textContent = item.categoria
                autor_field.textContent = item.autor
                edicao_field.textContent = item.edicao
                ano_field.textContent = item.ano

                atualizar_comentarios(item)
                

                btn_comentar.onclick = function(){
                    let comentarioAtual = {
                        usuario: ContaLogada.usuario,
                        conteudo: comentario_input.value
                    }

                    item.comentarios.push(comentarioAtual)
                    localStorage.setItem('Livros', JSON.stringify(Livros));
                    localStorage.setItem('Contas', JSON.stringify(Contas));

                    atualizar_comentarios(item)
                }
            })

            btn_excluir.addEventListener("click", () => {
                toggleModalExcluir();

                btn_sim_excluir.onclick = function(){
                    Livros = Livros.filter(livro => livro.id !== item.id);
                    filtrar();
                    localStorage.setItem('Livros', JSON.stringify(Livros));
                    toggleModalExcluir()
                }
            });

            if (ContaLogada !== null && !esta_na_colecao) {
                btn_adicionar_colecao.addEventListener("click", () => {
                    let livro = {
                        id: item.id,
                        titulo: item.titulo,
                        comentarios: item.comentarios,
                        sinopse: item.sinopse,
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

function toggleModalExcluir(){
    modal_excluir.classList.toggle('d-none')
}

function atualizar_comentarios(item){
    comentarios_field.innerHTML = ''
    for(comentario of item.comentarios){
        comentarios_field.innerHTML += 
        `<div class="d-flex align-items-start mb-4">
            <div class="bg-escuro p-3 rounded-3 w-100">
                <p class="mb-1 fw-bold text-white"><i class="bi bi-person-circle"> </i> ${comentario.usuario}</p>
                <p class="textopequeno text-secondary mb-0">
                ${comentario.conteudo}
                </p>
            </div>
        </div>`
    }
}

atualizar_catalogo(Livros)