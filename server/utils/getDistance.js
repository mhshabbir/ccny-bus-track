// Calculate Euclidean distance (L2 distance)
function calculateEuclideanDistance(coord1, coord2) {
    return Math.sqrt(Math.pow(coord1[0] - coord2[0], 2) + Math.pow(coord1[1] - coord2[1], 2));
}

module.exports = { calculateEuclideanDistance }