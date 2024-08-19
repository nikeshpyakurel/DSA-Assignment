function calculateTourLength(tour, distanceMatrix) {
    let totalDistance = 0;
    for (let i = 0; i < tour.length; i++) {
        const currentCity = tour[i];
        const nextCity = tour[(i + 1) % tour.length];
        totalDistance += distanceMatrix[currentCity][nextCity];
    }
    return totalDistance;
}

function generateNeighbor(tour) {
    // Create a neighbor by swapping two cities in the tour
    const neighbor = [...tour];
    const [i, j] = [Math.floor(Math.random() * tour.length), Math.floor(Math.random() * tour.length)];
    [neighbor[i], neighbor[j]] = [neighbor[j], neighbor[i]];
    return neighbor;
}

function hillClimbingTSP(distanceMatrix, maxIterations = 1000) {
    const numCities = distanceMatrix.length;
    let currentTour = Array.from({ length: numCities }, (_, i) => i);
    let bestTour = [...currentTour];
    let bestLength = calculateTourLength(bestTour, distanceMatrix);

    for (let iter = 0; iter < maxIterations; iter++) {
        const neighborTour = generateNeighbor(currentTour);
        const neighborLength = calculateTourLength(neighborTour, distanceMatrix);

        if (neighborLength < bestLength) {
            currentTour = [...neighborTour];
            bestTour = [...currentTour];
            bestLength = neighborLength;
        }
    }

    return { bestTour, bestLength };
}

// Example usage:
const distanceMatrix = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0]
];

const result = hillClimbingTSP(distanceMatrix);
console.log("Best Tour: ", result.bestTour);
console.log("Best Length: ", result.bestLength);
