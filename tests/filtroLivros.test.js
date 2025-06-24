const filtrarLivros = require('../src/filtroLivros');

const livros = [
  { titulo: 'Harry Potter' },
  { titulo: 'Senhor dos Anéis' }
];

const contaMock = {
  colecao: [
    { titulo: 'Harry Potter', wishlist: true },
    { titulo: 'A Arte da Guerra', wishlist: false }
  ]
};

describe('filtragem de livros', () => {
  it('filtra do catálogo geral (opt 1)', () => {
    const resultado = filtrarLivros('harry', 1, livros, contaMock);
    expect(resultado).toHaveLength(1);
  });

  it('filtra da coleção (opt 2)', () => {
    const resultado = filtrarLivros('guerra', 2, livros, contaMock);
    expect(resultado[0].titulo).toBe('A Arte da Guerra');
  });

  it('filtra da wishlist (opt 3)', () => {
    const resultado = filtrarLivros('harry', 3, livros, contaMock);
    expect(resultado[0].wishlist).toBe(true);
  });
});
