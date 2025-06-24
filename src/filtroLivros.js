function filtrarLivros(input, opt, livros, contaLogada) {
  const termo = input.toLowerCase();
  let resultado = [];

  if (opt === 1) {
    resultado = livros.filter(livro => livro.titulo.toLowerCase().includes(termo));
  } else if (opt === 2) {
    resultado = contaLogada.colecao.filter(livro => livro.titulo.toLowerCase().includes(termo));
  } else if (opt === 3) {
    resultado = contaLogada.colecao
      .filter(livro => livro.titulo.toLowerCase().includes(termo) && livro.wishlist === true);
  }

  return resultado;
}

module.exports = filtrarLivros;
