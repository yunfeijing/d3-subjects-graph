async function getData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function main() {
    const rootId = 0;
    const gData = await getData('./subjects.json');

    // link parent/children
    const nodesById = Object.fromEntries(gData.nodes.map(node => [node.id, node]));
    gData.links.forEach(link => {
        nodesById[link.source].childLinks.push(link);
    });

    const getPrunedTree = () => {
        const visibleNodes = [];
        const visibleLinks = [];

        (function traverseTree(node = nodesById[rootId]) {
        visibleNodes.push(node);
        if (node.collapsed) return;
        visibleLinks.push(...node.childLinks);
        node.childLinks
            .map(link => ((typeof link.target) === 'object') ? link.target : nodesById[link.target]) // get child node
            .forEach(traverseTree);
        })(); // IIFE

        return { nodes: visibleNodes, links: visibleLinks };
    };

    const elem = document.getElementById('graph');

    const dashLen = 5;
    const gapLen = 8;

    const Graph = ForceGraph()(elem)
        .graphData(getPrunedTree())
        .onNodeHover(node => elem.style.cursor = node && node.childLinks.length ? 'pointer' : null)
        .onNodeClick(node => {
        if (node.childLinks.length) {
            node.collapsed = !node.collapsed; // toggle collapse state
            Graph.graphData(getPrunedTree());
        }
        })
        .linkDirectionalParticles(1)
        .linkDirectionalParticleWidth(2.5)
        // .nodeColor(node => !node.childLinks.length ? 'green' : node.collapsed ? 'red' : 'yellow')
        .nodeAutoColorBy('id')
        .nodeLabel('name')
        .linkWidth(2.5)
        .linkLineDash(link => link.dashed && [dashLen, gapLen]);

    // Dash animation
    const st = +new Date();
    const dashAnimateTime = 500; // time to animate a single dash
    (function animate() {
        const t = ((+new Date() - st) % dashAnimateTime) / dashAnimateTime;
        const lineDash = t < 0.5 ? [0, gapLen * t * 2, dashLen, gapLen * (1 - t * 2)] : [dashLen * (t - 0.5) * 2, gapLen, dashLen * (1 - (t - 0.5) * 2), 0];
        Graph.linkLineDash(link => link.dashed && lineDash);

        requestAnimationFrame(animate);
    })(); // IIFE

}

main();

