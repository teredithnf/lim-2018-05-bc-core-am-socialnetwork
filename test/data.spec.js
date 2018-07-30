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
  })
  it('deberia retornar un mensaje FALSE para angie', () => {
    assert.deepEqual(window.validadorNombre('angie'), false);
  })
})
describe('validadorEmail(email)', () => {
  it('deberia retornar un mensaje TRUE para angiecorteztay1@hotmail.com', () => {
    assert.deepEqual(window.validadorNombre('angiecorteztay1@hotmail.com'), true);
  })
  it('deberia retornar un mensaje FALSE para angiecorteztay1', () => {
    assert.deepEqual(window.validadorNombre('angiecorteztay1'), false);
  })
  it('deberia retornar un mensaje FALSE para a@hotmail.com', () => {
    assert.deepEqual(window.validadorNombre('a@hotmail.com'), false);
  })
  it('deberia retornar un mensaje FALSE para 1234567@hotmail.com', () => {
    assert.deepEqual(window.validadorNombre('1234567@hotmail.com'), false);
  })
})
describe('validadorPassword(password)', () => {
  it('deberia retornar un mensaje TRUE para angiecorteztay1@hotmail.com', () => {
    assert.deepEqual(window.validadorNombre('angie123'), true);
  })
  it('deberia retornar un mensaje FALSE para 1234567', () => {
    assert.deepEqual(window.validadorNombre('1234567'), false);
  })
})


}
