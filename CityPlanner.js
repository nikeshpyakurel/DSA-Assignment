function bellmanFord(n, edges, start) {
    const distances = Array(n).fill(Infinity);
    distances[start] = 0;

    // Relax edges up to n-1 times
    for (let i = 0; i < n - 1; i++) {
        for (const [u, v, w] of edges) {
            if (distances[u] !== Infinity && distances[u] + w < distances[v]) {
                distances[v] = distances[u] + w;
            }
        }
    }

    return distances;
}

function findModification(n, roads, source, destination, target) {
    // Prepare edges with current weights
    const edges = roads.map(([u, v, w]) => [u, v, w]);

    // Compute shortest paths from source and to destination
    const distFromSource = bellmanFord(n, edges, source);

    // Reverse the graph for computing distances to destination
    const reversedEdges = edges.map(([u, v, w]) => [v, u, w]);
    const distToDestination = bellmanFord(n, reversedEdges, destination);

    // Compute the current shortest path from source to destination
    const currentShortestPath = distFromSource[destination];

    // If the current shortest path already matches the target, no changes are needed
    if (currentShortestPath === target) {
        return roads;
    }

    // Try to adjust the weights of construction edges
    for (const road of roads) {
        const [u, v, w] = road;
        if (w === -1) {
            const distU = distFromSource[u];
            const distV = distFromSource[v];
            const distFromUToDestination = distToDestination[u];
            const distFromVToDestination = distToDestination[v];

            // Compute the required new weight
            const minRequiredWeight = target - Math.min(distU + distFromUToDestination, distV + distFromVToDestination);

            if (minRequiredWeight > 0) {
                // Update the weight of the construction road
                road[2] = minRequiredWeight;

                // Check if the new weight achieves the target travel time
                const updatedDistFromSource = bellmanFord(n, edges, source);
                if (updatedDistFromSource[destination] === target) {
                    return roads;
                }
                
                // If not valid, reset the weight and continue
                road[2] = -1;
            }
        }
    }

    return []; // No valid modification found
}

// Example 1
const n = 5;
const roads = [[4, 1, -1], [2, 0, -1], [0, 3, -1], [4, 3, -1]];
const source = 0;
const destination = 1;
const target = 5;

console.log(findModification(n, roads, source, destination, target));
