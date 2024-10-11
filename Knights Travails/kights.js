function knightMoves(start, end) {
    const knightMoves = [
        [2, 1],
        [2, -1],
        [-2, 1],
        [-2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2]
    ];

    const isWithinBoard = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;

    // BFS to find the shortest path
    function bfs(start, end) {
        const queue = [];
        const visited = new Set();
        const parent = new Map();

        queue.push(start);
        visited.add(`${start[0]},${start[1]}`);
        parent.set(`${start[0]},${start[1]}`, null);

        while (queue.length > 0) {
            const [x, y] = queue.shift();

            if (x === end[0] && y === end[1]) break;

            for (const [dx, dy] of knightMoves) {
                const newX = x + dx;
                const newY = y + dy;

                if (isWithinBoard(newX, newY) && !visited.has(`${newX},${newY}`)) {
                    queue.push([newX, newY]);
                    visited.add(`${newX},${newY}`);
                    parent.set(`${newX},${newY}`, [x, y]);
                }
            }
        }

        // Reconstruct path from end to start
        const path = [];
        let current = end;
        while (current) {
            path.push(current);
            current = parent.get(`${current[0]},${current[1]}`);
        }

        return path.reverse();
    }

    // Convert to 0-indexed
    const startPos = [start[0] - 1, start[1] - 1];
    const endPos = [end[0] - 1, end[1] - 1];

    const path = bfs(startPos, endPos);

    // Convert back to 1-indexed and return the result
    return path.map(([x, y]) => [x + 1, y + 1]);
}

// Example usage
const start = [3, 3]; // a1 in chess notation
const end = [4, 3]; // h8 in chess notation

console.log(knightMoves(start, end));