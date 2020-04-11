# Interactive Subjects Map

A web component to represent a graph data structure in a 2-dimensional canvas using a force-directed iterative layout.
Uses HTML5 canvas for rendering and [d3-force](https://github.com/d3/d3-force) for the underlying physics engine.

### Demo

<https://yunfeijing.github.io/d3-subjects-graph/>



### In Progress

- Load subjects from database directly
- Distinguish between **or** and **and** in subjects prerequisites 
  - In order to take "Computer Systems", **either** "Algorithms and Data Structure" **or** "Design of Algorithms" needs to be completed, then use *solid lines* linking the subjects. 
  - In order to take "Web Information Technologies", **both** "Database System" **and** "OOSD" need to be completed, in this case, use *dashed lines* linking the subjects
- Click nodes into official/custom subject handbook pages



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

