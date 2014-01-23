"use strict"

var bpm = require("../match")
var tape = require("tape")

tape("bipartite matching", function(t) {

  function verifyMatching(n, m, edges, expectedCount) {
    var match = bpm(n, m, edges)
    for(var i=0; i<n; ++i) {
      var count = match.reduce(function(p, v) {
        return p + (v[0] === i)
      }, 0)
      t.ok(count <= 1, "checking first vertex occurs at most once")
    }
    for(var i=0; i<m; ++i) {
      var count = match.reduce(function(p, v) {
        return p + (v[1] === i)
      }, 0)
      t.ok(count <= 1, "checking second vertex occurs at most once")
    }
    for(var i=0; i<match.length; ++i) {
      var index = -1
      for(var j=0; j<edges.length; ++j) {
        if(edges[j][0] === match[i][0] &&
           edges[j][1] === match[i][1]) {
          index = j
          break
        }
      }
      t.notEqual(index, -1, "checking all matching edges are valid")
    }
    t.equals(match.length, expectedCount, "checking matching length consistent")
  }

  function test(n, m, edges, count) {
    verifyMatching(n, m, edges, count)
    var flipped = new Array(edges.length)
    for(var i=0; i<edges.length; ++i) {
      flipped[i] = [edges[i][1], edges[i][0]]
    }
    verifyMatching(m, n, flipped, count)
  }

  test(5, 5, [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 1],
      [2, 2],
      [3, 2],
      [3, 3],
      [3, 4],
      [4, 4]
    ], 5)

  test(1, 3, [[0, 0], [0,1], [0,2]], 1)

  test(4, 4, [
    [0, 0],
    [0, 1],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 2],
    [2, 1],
    [2, 3],
    [3, 3],
    [3, 0],
    [3, 2]
    ], 4)

  t.end()
})