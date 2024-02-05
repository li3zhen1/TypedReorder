"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hcluster = void 0;
var distance_1 = require("./distance");
// This is a modified implementation of hcluster derived from:
// https://github.com/jasondavies/science.js/blob/master/src/stats/hcluster.js
function hcluster() {
    var distance = distance_1.distance.euclidean;
    // single, complete or average
    var linkage = 'single';
    var distMatrix = null;
    function hcluster(vectors) {
        var n = vectors.length;
        var dMin = [];
        var cSize = [];
        var clusters = [];
        var root;
        var id = 0;
        // Initialise distance matrix and vector of closest clusters.
        // @ts-ignore
        if (distMatrix === null) {
            distMatrix = [];
            var i_1 = -1;
            while (++i_1 < n) {
                dMin[i_1] = 0;
                distMatrix[i_1] = [];
                var j = -1;
                while (++j < n) {
                    distMatrix[i_1][j] =
                        i_1 === j ? Infinity : distance(vectors[i_1], vectors[j]);
                    // @ts-ignore
                    if (distMatrix[i_1][dMin[i_1]] > distMatrix[i_1][j]) {
                        dMin[i_1] = j;
                    }
                }
            }
        }
        else {
            // @ts-ignore
            if (distMatrix.length < n || distMatrix[0].length < n) {
                throw {
                    error: "Provided distance matrix length ".concat(distMatrix.length, " instead of ").concat(n),
                };
            }
            var i_2 = -1;
            while (++i_2 < n) {
                dMin[i_2] = 0;
                var j = -1;
                while (++j < n) {
                    if (i_2 === j) {
                        // @ts-ignore
                        distMatrix[i_2][j] = Infinity;
                    }
                    if (distMatrix[i_2][dMin[i_2]] > distMatrix[i_2][j]) {
                        dMin[i_2] = j;
                    }
                }
            }
        }
        // create leaves of the tree
        var i = -1;
        while (++i < n) {
            if (i != id) {
                console.log('i = %d, id = %d', i, id);
            }
            clusters[i] = {
                left: null,
                right: null,
                dist: 0,
                centroid: vectors[i],
                id: id++, //[jdf] keep track of original data index
                size: 1,
                depth: 0,
            };
            cSize[i] = 1;
        }
        // Main loop
        for (var p = 0; p < n - 1; p++) {
            // find the closest pair of clusters
            var c1 = 0;
            for (i = 0; i < n; i++) {
                if (distMatrix[i][dMin[i]] < distMatrix[c1][dMin[c1]]) {
                    c1 = i;
                }
            }
            var c2 = dMin[c1];
            // create node to store cluster info
            // @ts-ignore
            var c1Cluster = clusters[c1];
            // @ts-ignore
            var c2Cluster = clusters[c2];
            // @ts-ignore
            var newCluster = {
                left: c1Cluster,
                right: c2Cluster,
                dist: distMatrix[c1][c2],
                centroid: calculateCentroid(c1Cluster.size, c1Cluster.centroid, c2Cluster.size, c2Cluster.centroid),
                id: id++,
                size: c1Cluster.size + c2Cluster.size,
                depth: 1 + Math.max(c1Cluster.depth, c2Cluster.depth),
            };
            clusters[c1] = newCluster;
            // overwrite row c1 with respect to the linkage type
            for (var j = 0; j < n; j++) {
                if (j === c1 || j === c2) {
                    // skip since these cases can cause issues with other linkage types
                    // such as 'wards' (not implemented here)
                    continue;
                }
                switch (linkage) {
                    case 'single':
                        if (distMatrix[c1][j] > distMatrix[c2][j]) {
                            distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
                        }
                        break;
                    case 'complete':
                        if (distMatrix[c1][j] < distMatrix[c2][j]) {
                            distMatrix[j][c1] = distMatrix[c1][j] = distMatrix[c2][j];
                        }
                        break;
                    case 'average':
                        distMatrix[j][c1] = distMatrix[c1][j] =
                            (cSize[c1] * distMatrix[c1][j] + cSize[c2] * distMatrix[c2][j]) /
                                (cSize[c1] + cSize[c2]);
                        break;
                }
            }
            cSize[c1] += cSize[c2];
            for (var i_3 = 0; i_3 < n; i_3++) {
                distMatrix[i_3][c2] = distMatrix[c2][i_3] = Infinity;
            }
            // update dmin and replace ones that previous pointed to c2 to point to c1
            if (linkage === 'single') {
                for (var j = 0; j < n; j++) {
                    if (dMin[j] === c2) {
                        dMin[j] = c1;
                    }
                    if (distMatrix[c1][j] < distMatrix[c1][dMin[c1]]) {
                        dMin[c1] = j;
                    }
                }
            }
            else {
                for (var j = 0; j < n; j++) {
                    if (dMin[j] === c2 || dMin[j] === c1) {
                        for (var k = 0; k < n; k++) {
                            if (distMatrix[j][k] < distMatrix[j][dMin[j]]) {
                                dMin[j] = k;
                            }
                        }
                    }
                    if (distMatrix[c1][j] < distMatrix[c1][dMin[c1]]) {
                        dMin[c1] = j;
                    }
                }
            }
            // keep track of the last added cluster
            root = newCluster;
        }
        return root;
    }
    hcluster.linkage = function (x) {
        if (!arguments.length) {
            return linkage;
        }
        linkage = x;
        return hcluster;
    };
    hcluster.distance = function (x) {
        if (!arguments.length) {
            return distance;
        }
        distance = x;
        return hcluster;
    };
    hcluster.distanceMatrix = function (x) {
        if (!arguments.length) {
            // @ts-ignore
            return distMatrix;
        }
        distMatrix = x.map(function (y) { return y.slice(0); });
        return hcluster;
    };
    return hcluster;
}
exports.hcluster = hcluster;
function calculateCentroid(c1Size, c1Centroid, c2Size, c2Centroid) {
    var newCentroid = [];
    var newSize = c1Size + c2Size;
    var n = c1Centroid.length;
    var i = -1;
    while (++i < n) {
        newCentroid[i] =
            (c1Size * c1Centroid[i] + c2Size * c2Centroid[i]) / newSize;
    }
    return newCentroid;
}
