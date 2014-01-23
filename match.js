"use strict"

var pool = require("typedarray-pool")
var INF = (1<<28)

module.exports = bipartiteMatching

function bipartiteMatching(n, m, edges) {

  //Initalize adjacency list, visit flag, distance
  var adjN = new Array(n)
  var g1 = pool.mallocInt32(n)
  var dist = pool.mallocInt32(n)
  for(var i=0; i<n; ++i) {
    g1[i] = -1
    adjN[i] = []
    dist[i] = INF
  }
  var adjM = new Array(m)
  var g2 = pool.mallocInt32(m)
  for(var i=0; i<m; ++i) {
    g2[i] = -1
    adjM[i] = []
  }

  //Build adjacency matrix
  var E = edges.length
  for(var i=0; i<E; ++i) {
    var e = edges[i]
    adjN[e[0]].push(e[1])
    adjM[e[1]].push(e[0])
  }

  var dmax = INF

  function dfs(v) {
    if(v < 0) {
      return true
    }
    var adj = adjN[v]
    for(var i=0,l=adj.length; i<l; ++i) {
      var u = adj[i]
      var pu = g2[u]
      var dpu = dmax
      if(pu >= 0) {
        dpu = dist[pu]
      }
      if(dpu === dist[v] + 1) {
        if(dfs(pu)) {
          g1[v] = u
          g2[u] = v
          return true
        }
      }
    }
    dist[v] = INF
    return false
  }

  //Run search
  var toVisit = pool.mallocInt32(n)
  var matching = 0
  while(true) {

    //Initialize queue
    var count = 0
    for(var i=0; i<n; ++i) {
      if(g1[i] < 0) {
        dist[i] = 0
        toVisit[count++] = i
      } else {
        dist[i] = INF
      }
    }

    //Run BFS
    var ptr = 0
    dmax = INF
    while(ptr < count) {
      var v = toVisit[ptr++]
      var dv = dist[v]
      if(dv < dmax) {
        var adj = adjN[v]
        for(var j=0,l=adj.length; j<l; ++j) {
          var u = adj[j]
          var pu = g2[u]
          if(pu < 0) {
            if(dmax === INF) {
              dmax = dv + 1
            }
          } else if(dist[pu] === INF) {
            dist[pu] = dv + 1
            toVisit[count++] = pu
          }
        }
      }
    }


    //Check for termination
    if(dmax === INF) {
      break
    }

    //Run DFS on each vertex in N
    for(var i=0; i<n; ++i) {
      if(g1[i] < 0) {
        if(dfs(i)) {
          matching += 1
        }
      }
    }
  }

  //Construct result
  var count = 0
  var result = new Array(matching)
  for(var i=0; i<n; ++i) {
    if(g1[i] < 0) {
      continue
    }
    result[count++] = [ i, g1[i] ]
  }

  //Clean up
  pool.free(toVisit)
  pool.free(g2)
  pool.free(dist)
  pool.free(g1)

  //Return
  return result
}