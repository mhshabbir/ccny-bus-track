function calculateManhattanDistance(coord1, coord2) {
    console.log(coord1[0], coord2);

    // Calculate Manhattan distance (L1 distance)
    return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
}

function calculateEuclideanDistance(coord1, coord2) {
    // Calculate Euclidean distance (L2 distance)
    return Math.sqrt((coord1[0] - coord2[0]) ** 2 + (coord1[1] - coord2[1]) ** 2);
}

module.exports = { calculateEuclideanDistance, calculateManhattanDistance }