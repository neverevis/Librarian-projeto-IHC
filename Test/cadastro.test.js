const { validar } = require('./cadastro');

test('validar() - usuário e senha válidos', () => {
  const usuario = 'user123';
  const senhaA = 'senha123';
  const senhaB = 'senha123';

global.localStorage = {
    getItem: jest.fn(() => JSON.stringify([]))
  };

  expect(validar(usuario, senhaA, senhaB)).toBe(true);
});

test('validar() - senhas não coincidem', () => {
  const usuario = 'user123';
  const senhaA = 'senha123';
  const senhaB = 'outrasenha';

  expect(validar(usuario, senhaA, senhaB)).toBe(false);
});

test('validar() - usuário muito curto', () => {
  const usuario = 'abc';
  const senhaA = 'senha123';
  const senhaB = 'senha123';

  expect(validar(usuario, senhaA, senhaB)).toBe(false);
});
