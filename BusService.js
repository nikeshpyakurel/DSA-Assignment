function reverseKGroup(head, k) {
    const result = [];
    const n = head.length;

    for (let i = 0; i < n; i += k) {
        const chunk = head.slice(i, i + k);
        
        // If the chunk is smaller than k, just add it as is
        if (chunk.length < k) {
            result.push(...chunk);
        } else {
            // Reverse the chunk and add it to the result
            result.push(...chunk.reverse());
        }
    }

    return result;
}

// Example 1:
const head1 = [1, 2, 3, 4, 5];
const k1 = 2;
console.log(reverseKGroup(head1, k1)); // Output: [2, 1, 4, 3, 5]

// Example 2:
const head2 = [1, 2, 3, 4, 5];
const k2 = 3;
console.log(reverseKGroup(head2, k2)); // Output: [3, 2, 1, 4, 5]
