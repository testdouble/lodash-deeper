var assert = require('assert')

var _ = require('./index')

var sample
var expected
module.exports = {
  beforeEach: function () {
    var pair = nestedFilteredPair()
    sample = pair.nestedObject
    expected = pair.filterResult
  },
  filtersStuff: function () {
    var result = _.filterDeep(sample, ['color', 'red'])
    assertEquals(result, expected)
  },
  uniqVisited: function () {
    sample.loop = { uhOh: sample }
    expected.push(sample)
    var result = _.filterDeep(sample, ['color', 'red'])
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

function nestedFilteredPair () {
  var nested = {
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

  var filtered = [
    nested,
    nested.shallow,
    nested.sub[1],
    nested.sub[0].sub[0],
    nested.sub[0].sub[0].sub[0],
    nested.extra.bonus.depth
  ]

  return {
    nestedObject: nested
  , filterResult: filtered
  }
}
