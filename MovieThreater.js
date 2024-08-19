function containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff) {
    if (indexDiff <= 0 || valueDiff < 0) return false;
    
    const set = new Set();
    
    for (let i = 0; i < nums.length; i++) {
        // Check if there's a number in the set within valueDiff
        for (let val of set) {
            if (Math.abs(val - nums[i]) <= valueDiff) {
                return true;
            }
        }
        
        // Add the current number to the set
        set.add(nums[i]);
        
        // Ensure the size of the set doesn't exceed indexDiff
        if (set.size > indexDiff) {
            set.delete(nums[i - indexDiff]);
        }
    }
    
    return false;
}

// Example usage:
const nums = [2, 3, 5, 4, 9];
const indexDiff = 3;
const valueDiff = 1;
console.log(containsNearbyAlmostDuplicate(nums, indexDiff, valueDiff)); // Output: true
