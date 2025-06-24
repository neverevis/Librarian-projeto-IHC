test('ATV1 - Deve permitir cadastro e login com novas credenciais', () => {

  const usuarioValido = 'novousuario';
  const senhaValida = 'senha123';

  global.localStorage = {
    getItem: jest.fn(() => null),
    setItem: jest.fn()
  };

  expect(validar(usuarioValido, senhaValida, senhaValida)).toBe(true);


  global.localStorage.getItem = jest.fn(() =>
    JSON.stringify([{ usuario: usuarioValido, senha: senhaValida }])
  );

  global.window = { location: { href: '' } };

  login(usuarioValido, senhaValida);
  expect(window.location.href).toBe('home.html');
});
