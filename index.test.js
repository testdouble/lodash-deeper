var assert = require('assert')

var _ = require('./index')

var sample
module.exports = {
  beforeEach: function () {
    sample = {
      id: 1,
      color: 'red',
      sub: [
        {
          id: 8,
          color: 'blue',
          sub: [
            {
              id: 4,
              color: 'red',
              sub: [
                {
                  id: 5,
                  color: 'red'
                }
              ]
            }
          ]
        },
        {
          id: 3,
          color: 'red'
        }
      ],
      extra: {
        bonus: {
          depth: {
            id: 6,
            color: 'red'
          }
        },
        nope: {
          id: 7,
          color: 'yellow'
        }
      },
      shallow: {
        id: 2,
        color: 'red'
      },
      shallow2: {
        id: 9,
        color: 'gray'
      }
    }
  },
  filtersStuff: function () {
    var result = _.filterDeep(sample, ['color', 'red'])

    var expected = [
      sample,
      {
        id: 2,
        color: 'red'
      },
      {
        id: 3,
        color: 'red'
      },
      {
        id: 4,
        color: 'red',
        sub: [
          {
            id: 5,
            color: 'red'
          }
        ]
      },
      {
        id: 5,
        color: 'red'
      },
      {
        id: 6,
        color: 'red'
      }
    ]
    assertEquals(result, expected)
  },
  uniqVisited: function () {
    sample.loop = { uhOh: sample }

    var result = _.filterDeep(sample, ['color', 'red'])

    var expected = [
      sample,
      {
        id: 2,
        color: 'red'
      },
      {
        id: 3,
        color: 'red'
      },
      {
        id: 4,
        color: 'red',
        sub: [
          {
            id: 5,
            color: 'red'
          }
        ]
      },
      {
        id: 5,
        color: 'red'
      },
      {
        id: 6,
        color: 'red'
      },
      sample
    ]
    assertEquals(result, expected)
  }
}

function assertEquals (actual, expected) {
  try {
    assert.deepStrictEqual(actual, expected)
  } catch (e) {
    console.error('Comparison failed!')
    console.error('actual:', actual)
    console.error('---------')
    console.error('expected:', expected)
    console.error('---------')
    throw e
  }
}
