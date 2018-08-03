describe('data', () => {

  it('debería exponer función validadorNombre en objeto global', () => {
    assert.isFunction(validadorNombre);
  });
  it('debería exponer función validadorEmail en objeto global', () => {
    assert.isFunction(validadorEmail);
  });
  it('debería exponer función validadorPassword en objeto global', () => {
    assert.isFunction(validadorPassword);
  });

describe('validadorNombre(name)', () => {
  it('deberia retornar un mensaje TRUE para angie cortez', () => {
    assert.deepEqual(window.validadorNombre('angie cortez'), true);
  });
  it('deberia retornar un mensaje FALSE para angie', () => {
    assert.deepEqual(window.validadorNombre('angie'), false);
  });
});

describe('validadorEmail(email)', () => {
  it('deberia retornar un mensaje TRUE para angiecorteztay1@hotmail.com', () => {
    assert.deepEqual(window.validadorEmail('angiecorteztay1@hotmail.com'), true);
  });
  it('deberia retornar un mensaje FALSE para angiecorteztay1', () => {
    assert.deepEqual(window.validadorEmail('angiecorteztay1'), false);
  });
  it('deberia retornar un mensaje FALSE para a@hotmail.com', () => {
    assert.deepEqual(window.validadorEmail('a@hotmail.com'), false);
  });
  it('deberia retornar un mensaje FALSE para 1234567@hotmail.com', () => {
    assert.deepEqual(window.validadorEmail('1234567@hotmail.com'), true);
  });
});
describe('validadorPassword(password)', () => {
  it('deberia retornar un mensaje TRUE para angie123', () => {
    assert.deepEqual(window.validadorPassword('angie123'), true);
  });
  it('deberia retornar un mensaje FALSE para 1234567', () => {
    assert.deepEqual(window.validadorPassword('1234567'), false);
  });
});

});

// describe('post', () => {
//
//   it('debería exponer listar en objeto global', () => {
//     assert.isFunction(listar);
//   });
//
//   it('debería exponer editarPost en objeto global', () => {
//     assert.isFunction(editarPost);
//   });
//
//   it('debería exponer función guardarPost en objeto global', () => {
//     assert.isFunction(guardarPost);
//   });
//
//   it('debería exponer función eliminarPost en objeto global', () => {
//     assert.isFunction(eliminarPost);
//   });
//
//   it('deberia exponer funcion countLikes', () => {
//     assert.isFunction(countLikes);
//   });
//
//   it('deberia exponer funcion guardar ',() => {
//     assert.isFunction(guardar);
//   });
// })
