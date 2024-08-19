function longestHike(nums, k) {
    let maxLength = 0;
    let start = 0;

    for (let end = 1; end < nums.length; end++) {
        // While the gain between consecutive points in the window exceeds k
        while (nums[end] - nums[end - 1] > k) {
            start = end; // Move the start pointer to the current end position
        }
        
        // Update the maximum length of the valid window
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

// Example usage:
const trail = [4, 2, 1, 4, 3, 4, 5, 8, 15];
const k = 3;
console.log(longestHike(trail, k)); // Output: 5
