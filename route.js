const cityPositions = {
    "Buspark": { x: 200, y: 100 },
    "Baneswor": { x: 100, y: 300 },
    "Chabahill": { x: 400, y: 150 },
    "Ratnapark": { x: 300, y: 400 },
    "Lokanthali": { x: 500, y: 300 },
    "Patan": { x: 600, y: 200 }
};

const distances = {
    "Buspark": { "Baneswor": 200, "Chabahill": 200 },
    "Baneswor": { "Buspark": 200, "Ratnapark": 50, "Chabahill": 200 },
    "Chabahill": { "Patan": 55, "Baneswor": 200 },
    "Ratnapark": { "Baneswor": 50, "Patan": 150 },
    "Lokanthali": { "Patan": 50 },
    "Patan": { "Ratnapark": 150, "Lokanthali": 50, "Chabahill": 55 }
};

let shortestPath = null;

function heuristic(city1, city2) {
    const pos1 = cityPositions[city1];
    const pos2 = cityPositions[city2];
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

function drawGraph() {
    const canvas = document.getElementById('graphCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    for (let city1 in distances) {
        for (let city2 in distances[city1]) {
            const pos1 = cityPositions[city1];
            const pos2 = cityPositions[city2];
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            ctx.stroke();

            const midX = (pos1.x + pos2.x) / 2;
            const midY = (pos1.y + pos2.y) / 2;
            ctx.fillText(distances[city1][city2], midX, midY);
        }
    }

    // Draw nodes
    for (let city in cityPositions) {
        const pos = cityPositions[city];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();
        ctx.fillText(city, pos.x + 15, pos.y + 5);
    }

    // Draw shortest path
    if (shortestPath) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        for (let i = 0; i < shortestPath.length - 1; i++) {
            const pos1 = cityPositions[shortestPath[i]];
            const pos2 = cityPositions[shortestPath[i + 1]];
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            ctx.stroke();
        }
    }
}

function aStar(start, end) {
    const openSet = new Set([start]);
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    const cityNames = Object.keys(cityPositions);
    cityNames.forEach(city => {
        gScore[city] = Infinity;
        fScore[city] = Infinity;
    });
    gScore[start] = 0;
    fScore[start] = heuristic(start, end);

    while (openSet.size > 0) {
        let current = [...openSet].reduce((a, b) => fScore[a] < fScore[b] ? a : b);

        if (current === end) {
            const path = [];
            while (current) {
                path.unshift(current);
                current = cameFrom[current];
            }
            return path;
        }

        openSet.delete(current);

        for (let neighbor in distances[current]) {
            const tentativeGScore = gScore[current] + distances[current][neighbor];
            if (tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, end);
                openSet.add(neighbor);
            }
        }
    }

    return null; // No path found
}

document.getElementById('optimizeBtn').addEventListener('click', () => {
    const startCity = document.getElementById('startCity').value;
    const endCity = document.getElementById('endCity').value;

    if (startCity !== endCity) {
        shortestPath = aStar(startCity, endCity);
        if (shortestPath) {
            document.getElementById('pathDisplay').innerText = `Shortest Path: ${shortestPath.join(' -> ')}`;
            drawGraph();
        } else {
            alert('No path found between selected cities.');
        }
    } else {
        alert('Please select different start and end cities.');
    }
});

// Initial draw
drawGraph();
