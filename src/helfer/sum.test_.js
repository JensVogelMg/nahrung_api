'use strict'

const {sum} = require('./dom')

test('rechne 1 + 2', () => {
  expect(sum(1, 2)).toBe(3)
})