const autenticarUsuario = require('../src/autenticarUsuario');

const contasMock = [
  { usuario: 'matheus', senha: '123456' },
  { usuario: 'maria', senha: 'abcdef' }
];

describe('autenticação de usuário', () => {
  it('loga corretamente', () => {
    const r = autenticarUsuario('matheus', '123456', contasMock);
    expect(r).toBe('sucesso');
  });

  it('rejeita usuário inexistente', () => {
    const r = autenticarUsuario('joao', '123', contasMock);
    expect(r).toBe('Nome de usuário inválido.');
  });
});
