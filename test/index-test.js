var lodash = require('../index')
var assertEquals = require('./support/assert-equals')
var nestedFilteredPair = require('./support/generate-nested-and-expected-filtered-object-pair')

var sample
var expected
var tests = {
  beforeEach: function () {
    var pair = nestedFilteredPair()
    sample = pair.nestedObject
    expected = pair.filterResult
  },
  filtersStuff: function () {
    var result = _.filterDeep(sample, predicate)
    assertEquals(result, expected)
  },
  uniqVisited: function () {
    sample.loop = { uhOh: sample }
    expected.push(sample)
    var result = _.filterDeep(sample, ['color', 'red'])
    assertEquals(result, expected)
  }
}

var _
var predicate
module.exports = {
  withLodashFull: {
    beforeEach: function () {
      _ = lodash
      predicate = ['color', 'red']
    }
  , test: tests
  }
}
