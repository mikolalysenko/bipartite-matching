bipartite-matching
==================
Finds a [maximum bipartite matching](http://en.wikipedia.org/wiki/Matching_\(graph_theory\)#In_unweighted_bipartite_graphs) in an unweighted graph.  The current implementation uses the [Hopcroft-Karp algorithm](http://en.wikipedia.org/wiki/Hopcroft%E2%80%93Karp_algorithm) and runs in O(sqrt(V) * E + V) time.  Works in both node.js and in a browser.

## Example

```javascript
var findMatching = require("bipartite-matching")

console.log(findMatching(5, 5, [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 1],
      [2, 2],
      [3, 2],
      [3, 3],
      [3, 4],
      [4, 4]
    ]))
```

## Install

```
npm install bipartite-matching
```

## `require("bipartite-matching")(n, m, edges)`
Computes a bipartite matching for the graph

* `n` is the number of vertices in the first component
* `m` is the number of vertices in the second component
* `edges` is the list of edges, represented by pairs of integers between 0 and n-1,m-1 respectively.

**Returns** A list of edges representing the matching

## Credits
(c) 2014 Mikola Lysenko. MIT License