function mostBookedRoom(n, classes) {
    // Sort classes by start time, and if they are the same, by number of students (larger first)
    classes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

    // Array to track when each room will be free
    let rooms = Array(n).fill(0);

    // Array to count how many classes each room holds
    let roomCount = Array(n).fill(0);

    // Go through each class
    for (let i = 0; i < classes.length; i++) {
        let [start, end] = classes[i];

        // Find the earliest available room that can accommodate the class
        let assignedRoom = -1;
        let earliestAvailableTime = Infinity;

        for (let j = 0; j < n; j++) {
            if (rooms[j] <= start && rooms[j] < earliestAvailableTime) {
                assignedRoom = j;
                earliestAvailableTime = rooms[j];
            }
        }

        // If we found a room that can start the class on time
        if (assignedRoom !== -1) {
            rooms[assignedRoom] = end; // Update the room's next available time
            roomCount[assignedRoom]++; // Increment the room's class count
        } else {
            // If no room is available at the start time, delay the class to the earliest available time
            let earliestRoom = rooms.indexOf(Math.min(...rooms));
            rooms[earliestRoom] += end - start; // Delay the class
            roomCount[earliestRoom]++; // Increment the room's class count
        }
    }

    // Find the room with the most classes
    let maxClasses = Math.max(...roomCount);
    for (let i = 0; i < n; i++) {
        if (roomCount[i] === maxClasses) {
            return i;
        }
    }
}

// Test cases
console.log(mostBookedRoom(2, [[0, 10], [1, 5], [2, 7], [3, 4]])); // Output: 0
console.log(mostBookedRoom(3, [[1, 20], [2, 10], [3, 5], [4, 9], [6, 8]])); // Output: 1
