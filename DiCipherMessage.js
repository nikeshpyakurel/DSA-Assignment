function decipherMessage(s, shifts) {
    // Convert the string into an array of characters for easy manipulation
    let message = s.split('');

    // Function to apply a single shift
    function shiftChar(char, direction) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let index = alphabet.indexOf(char);
        if (direction === 1) {
            // Clockwise shift
            return alphabet[(index + 1) % 26];
        } else {
            // Counter-clockwise shift
            return alphabet[(index - 1 + 26) % 26];
        }
    }

    // Apply each shift in the given order
    for (let [start_disc, end_disc, direction] of shifts) {
        for (let i = start_disc; i <= end_disc; i++) {
            message[i] = shiftChar(message[i], direction);
        }
    }

    // Join the array back into a string and return the result
    return message.join('');
}

// Test cases
console.log(decipherMessage("hello", [[0, 1, 1], [2, 3, 0], [0, 2, 1]])); // Output: "jglko"
