const validarConta = require('../src/validarContas');

describe('validação de conta', () => {
  it('deve ser válida com dados corretos', () => {
    const resultado = validarConta('matheus', 'senha123', 'senha123', []);
    expect(resultado.resultado).toBe(true);
  });

  it('deve recusar usuário repetido', () => {
    const contas = [{ usuario: 'matheus' }];
    const resultado = validarConta('matheus', 'senha123', 'senha123', contas);
    expect(resultado.resultado).toBe(false);
    expect(resultado.valido1).toBe(false);
  });
});
