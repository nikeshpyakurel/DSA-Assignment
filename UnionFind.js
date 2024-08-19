class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, i) => i);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);  // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

function friendRequests(n, restrictions, requests) {
    const uf = new UnionFind(n);
    const result = [];

    for (let [a, b] of requests) {
        let rootA = uf.find(a);
        let rootB = uf.find(b);
        let canApprove = true;

        for (let [r1, r2] of restrictions) {
            let rootR1 = uf.find(r1);
            let rootR2 = uf.find(r2);

            // Check if making a and b friends would violate any restrictions
            if ((rootA === rootR1 && rootB === rootR2) || (rootA === rootR2 && rootB === rootR1)) {
                canApprove = false;
                break;
            }
        }

        if (canApprove) {
            uf.union(a, b);
            result.push("approved");
        } else {
            result.push("denied");
        }
    }

    return result;
}

// Example 1:
let n = 3;
let restrictions = [[0, 1]];
let requests = [[0, 2], [2, 1]];
console.log(friendRequests(n, restrictions, requests)); // Output: ["approved", "denied"]

// Example 2:
n = 5;
restrictions = [[0, 1], [1, 2], [2, 3]];
requests = [[0, 4], [1, 2], [3, 1], [3, 4]];
console.log(friendRequests(n, restrictions, requests)); // Output: ["approved", "denied", "approved", "denied"]
