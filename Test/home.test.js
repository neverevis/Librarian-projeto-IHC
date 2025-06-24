test('ATV2 - Deve filtrar entre Todos e Minha Coleção', () => {

  const livroTeste = { id: '1', titulo: 'Livro Teste' };
  const usuarioTeste = {
    usuario: 'testuser',
    colecao: [livroTeste],
    login: true
  };

  global.localStorage = {
    getItem: jest.fn(key =>
      key === 'Livros'
        ? JSON.stringify([livroTeste, { id: '2', titulo: 'Outro Livro' }])
        : JSON.stringify([usuarioTeste])
    )
  };

  //Todos os Livros (2)
  const todosLivros = filtrar('', 1);
  expect(todosLivros.length).toBe(2);

  //Minha Coleção (1)
  const minhaColecao = filtrar('', 2);
  expect(minhaColecao.length).toBe(1);
  expect(minhaColecao[0].titulo).toBe('Livro Teste');
});

test('ATV3 - Deve encontrar livro por pesquisa', () => {
  const livrosTeste = [
    { id: '1', titulo: 'Dom Casmurro' },
    { id: '2', titulo: 'O Alienista' }
  ];

  global.localStorage = {
    getItem: jest.fn(() => JSON.stringify(livrosTeste))
  };

  //Pesquisa parcial
  const resultados = filtrar('casmu', 1);
  expect(resultados.length).toBe(1);
  expect(resultados[0].titulo).toBe('Dom Casmurro');
});

test('ATV4 - Deve adicionar comentário ao livro', () => {
  const livroTeste = {
    id: '1',
    titulo: 'Livro Teste',
    comentarios: []
  };

  global.localStorage = {
    getItem: jest.fn(key =>
      key === 'Livros'
        ? JSON.stringify([livroTeste])
        : JSON.stringify([{ usuario: 'user', login: true }])
    ),
    setItem: jest.fn()
  };

  //Adicionar de comentário
  document.getElementById('comentario_input').value = 'Ótimo livro!';
  btn_comentar.click();

  // Verifica se comentário foi adicionado
  expect(livroTeste.comentarios.length).toBe(1);
  expect(livroTeste.comentarios[0].conteudo).toBe('Ótimo livro!');
});
