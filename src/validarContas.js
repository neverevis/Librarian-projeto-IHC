function validarConta(usuario, senhaA, senhaB, contasRegistradas = []) {
  const valido1 = !contasRegistradas.some(c => c.usuario === usuario) && usuario.length >= 4;
  const valido2 = senhaA === senhaB && senhaA !== '';
  const valido3 = usuario.length >= 4;
  const valido4 = senhaA.length >= 6;

  return {
    valido1,
    valido2,
    valido3,
    valido4,
    resultado: (valido1 && valido2 && valido3 && valido4)
  };
}

module.exports = validarConta;
