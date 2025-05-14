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

//definir elementos
let btnAdicionar = document.getElementById("btnAdicionar");
let btnFecharReg = document.getElementById("btnFecharReg");
let btnModalAdd = document.getElementById("btnModalAdd");
let pesquisa = document.getElementById('pesquisa');

let ContaLogada;

//verificar se há contas logadas (salva informações da conta logada em Conta)
for(conta of Contas)
{
    if(conta.login == true)
    {
        ContaLogada = conta;
        break;
    }
}

//função que altera os itens da navegação dependendo do estado de login
function atualizarNav()
{
    if(ContaLogada === undefined)
    {
        document.getElementById('listaNav').


        document.getElementById('listaNav').innerHTML =
        `<li class="nav-item">
            <a class="nav-link deslogado" href="cadastro.html">Cadastrar</a>
        </li>
        <li class="nav-item">
            <a class="nav-link deslogado" href="login.html">Fazer login</a>
        </li>`

        btnAdicionar.classList.add('d-none')
    }
    else
    {
        document.getElementById('listaNav').innerHTML =
        `<li class="nav-item text-white my-auto me-3">
            <button id="btnPerfil" class="btn btn-md btn-dark"><i class="bi-person-circle me-2"></i><a>${ContaLogada.usuario}</a></button>
            <div id="perfilDropdown" class="perfilDropdown hide position-fixed bg-gray text-center">
                <ul class="list-unstyled text-start">
                    <li><a onclick="logout()" class="text-decoration-none text-white" href="#"><i class='bi-box-arrow-left me-2'></i>Fazer Logout</a></li>
                </ul>
            </div>
        </li>`
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