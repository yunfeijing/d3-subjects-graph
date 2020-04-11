# Interactive Subjects Map

A web component to represent a graph data structure in a 2-dimensional canvas using a force-directed iterative layout.
Uses HTML5 canvas for rendering and [d3-force](https://github.com/d3/d3-force) for the underlying physics engine.

### Demo

<https://yunfeijing.github.io/d3-subjects-graph/>

### Input JSON syntax
```
{
    "nodes": [
        {
          "id": "id1",
          "name": "name1",
          "collapsed": false,
          "childLinks": []
        },
        {
          "id": "id2",
          "name": "name2",
          "collapsed": true,
          "childLinks": []
        },
        (...)
    ],
    "links": [
        {
            "source": "id1",
            "target": "id2",
            "dashed": false
        },
        (...)
    ]
}
```

