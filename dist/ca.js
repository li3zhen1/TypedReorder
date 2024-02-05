"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ca_order = exports.ca = exports.ca_decorana = void 0;
var aliases_1 = require("./aliases");
var utils_1 = require("./utils");
var core_1 = require("./core");
var sort_order_1 = require("./sort_order");
//Corresponence Analysis
// see http://en.wikipedia.org/wiki/Correspondence_analysis
function sumrows(v) {
    var n = v.length;
    var o = v[0].length;
    var sumrow = Array(n);
    for (var i = 0; i < n; i++) {
        var row = v[i];
        var s = 0;
        for (var j = 0; j < o; j++) {
            s += row[j];
        }
        sumrow[i] = s;
    }
    return sumrow;
}
function sumcols(v) {
    var n = v.length;
    var o = v[0].length;
    var sumcol = (0, aliases_1.zeroes)(o);
    for (var i = 0; i < n; i++) {
        var row = v[i];
        for (var j = 0; j < o; j++) {
            sumcol[j] += row[j];
        }
    }
    return sumcol;
}
// Implementation of the decorana fortran code
// See Hill, M. O. 1979. DECORANA - A FORTRAN program for detrended
// correspondence analysis an reciprocal averaging. Cornell University,
// Ithaca, New York.
// And
// Hill, M. O. 1973. Reciprocal averaging: an eigenvector method of
// ordination. J. Ecol. 61:237-49
// The Fortan implementation is available in the "vegan" R package:
// https://cran.r-project.org/web/packages/vegan/index.html
function decorana(dat) {
    // consider as zero eigenvalue
    var ZEROEIG = 1e-7;
    var nr = dat.length;
    var nc = dat[0].length;
    var adotj = sumcols(dat);
    var aidot = sumrows(dat);
    //console.log('adotj='); printvec(adotj);
    //console.log('aidot='); printvec(aidot);
    var s1 = eigy((0, utils_1.array1d)(nr, 1.0), (0, utils_1.array1d)(nc, 1.0), nr, nc, dat, aidot, adotj);
    if (s1.eig < ZEROEIG) {
        s1.rows = s1.cols = [];
        s1.eig = 0;
    }
    else {
        var x = s1.rows;
        var y = s1.cols;
        yxmult(y, x, nr, nc, dat);
        for (var i = 0; i < nr; i++) {
            x[i] /= aidot[i];
        }
    }
    return s1;
}
function trans(y, yy, x, aidot, mi, n, dat, prt) {
    if (prt) {
        console.log("TRANS ".concat(prt));
    }
    yxmult(y, x, mi, n, dat, prt);
    for (var i = 0; i < mi; i++) {
        x[i] = x[i] / aidot[i]; // 10
    }
    // 100
    // a1 = 0;
    // for (i = 0; i < mi; i++)
    // 	a1 += aidot[i]*x[i]; // 110
    // for (i = 0; i < mi; i++)
    // 	x[i] -= a1; // 120
    // 200
    xymult(x, yy, mi, n, dat, prt);
}
function printvec(y, prec, colperm, line) {
    console.log('');
    for (var i = 0; i < y.length; i++) {
        console.log("i:".concat(i + 1, " v:  ").concat(y[i].toFixed(5)));
    }
}
// @ts-ignore
function xymult(x, y, mi, n, dat, prt) {
    if (prt) {
        console.log('xymult');
        printvec(y, 5, null, 'y=');
    }
    for (var j = 0; j < n; j++) {
        y[j] = 0;
    } // 10
    for (var i = 0; i < mi; i++) {
        var ax = x[i];
        var row = dat[i];
        for (var j = 0; j < n; j++) {
            y[j] += ax * row[j];
        } // 20
    }
    if (prt) {
        //console.log('xymult[1]=');
        printvec(y, 5, null, 'y=');
    }
}
// @ts-ignore
function yxmult(y, x, mi, n, dat, prt) {
    if (prt) {
        console.log('yxmult');
        printvec(x, 5, null, 'x=');
    }
    for (var i = 0; i < mi; i++) {
        var ax = 0;
        var row = dat[i];
        for (var j = 0; j < n; j++) {
            ax += y[j] * row[j]; // 10
        }
        x[i] = ax; // 20
    }
    if (prt) {
        //console.log('yxmult[1]=');
        printvec(x, 5, null, 'x=');
    }
}
// @ts-ignore
function eigy(x, y, mi, n, dat, aidot, adotj) {
    var icount;
    var a;
    var ay;
    var ex;
    var a11;
    var a12;
    var a22;
    var a23;
    var a33;
    var a34;
    var a44;
    var res;
    var ax1;
    var ax2;
    var ax3;
    var ax4;
    var b13;
    var b14;
    var b24;
    var row;
    var y2 = (0, aliases_1.zeroes)(n);
    var y3 = (0, aliases_1.zeroes)(n);
    var y4 = (0, aliases_1.zeroes)(n);
    var y5 = (0, aliases_1.zeroes)(n);
    var tot = 0;
    for (var j = 0; j < n; j++) {
        tot += adotj[j];
        y[j] = j + 1.0; // 10
    }
    y[0] = 1.1;
    var tol = 0.000005;
    trans(y, y, x, aidot, mi, n, dat); //,1);
    icount = 0;
    for (;;) {
        // 20
        a = 0;
        for (var j = 0; j < n; j++) {
            a += y[j] * adotj[j];
        } // 30
        a /= tot;
        ex = 0;
        for (var j = 0; j < n; j++) {
            ay = y[j] - a;
            ex += ay * ay * adotj[j];
            y[j] = ay; // 40
        }
        ex = Math.sqrt(ex);
        for (var j = 0; j < n; j++) {
            y[j] /= ex;
        } // 50
        trans(y, y2, x, aidot, mi, n, dat); //,2);
        a = 0;
        a11 = 0;
        a12 = 0;
        a22 = 0;
        a23 = 0;
        a33 = 0;
        a34 = 0;
        a44 = 0;
        for (var j = 0; j < n; j++) {
            ay = y2[j];
            y2[j] = ay / adotj[j];
            a += ay;
            a11 += ay * y[j]; // 60
        }
        a /= tot;
        for (var j = 0; j < n; j++) {
            ay = y2[j] - (a + a11 * y[j]);
            a12 += ay * ay * adotj[j];
            y2[j] = ay; // 70
        }
        a12 = Math.sqrt(a12);
        for (var j = 0; j < n; j++) {
            y2[j] /= a12;
        } // 80
        if (a12 < tol || icount > 999) {
            break;
        }
        icount++;
        trans(y2, y3, x, aidot, mi, n, dat); //,3);
        a = 0;
        b13 = 0;
        for (var j = 0; j < n; j++) {
            ay = y3[j];
            y3[j] = ay / adotj[j];
            a += ay;
            a22 += ay * y2[j];
            b13 += ay * y[j]; // 90
        }
        a /= tot;
        for (var j = 0; j < n; j++) {
            ay = y3[j] - (a + a22 * y2[j] + b13 * y[j]);
            a23 += ay * ay * adotj[j];
            y3[j] = ay; // 100
        }
        a23 = Math.sqrt(a23);
        if (a23 > tol) {
            // 105
            for (var j = 0; j < n; j++) {
                y3[j] /= a23; // 110
            }
            trans(y3, y4, x, aidot, mi, n, dat); //,4);
            a = 0;
            b14 = 0;
            b24 = 0;
            for (var j = 0; j < n; j++) {
                ay = y4[j];
                y4[j] /= adotj[j];
                a += ay;
                a33 += ay * y3[j];
                b14 += ay * y[j];
                b24 += ay * y2[j]; // 120
            }
            a /= tot;
            for (var j = 0; j < n; j++) {
                ay = y4[j] - (a + a33 * y3[j] + b14 * y[j] + b24 * y2[j]);
                a34 += ay * ay * adotj[j];
                y4[j] = ay; // 130
            }
            a34 = Math.sqrt(a34);
            if (a34 > tol) {
                // 135
                for (var j = 0; j < n; j++) {
                    y4[j] /= a34;
                } // 140
                trans(y4, y5, x, aidot, mi, n, dat); //,5);
                for (var j = 0; j < n; j++) {
                    a44 += y4[j] * y5[j];
                } // 150
            }
            else {
                a34 = 0;
            }
        }
        else {
            a23 = 0;
        }
        // 160
        res = solve_tridiag(tol, a11, a12, a22, a23, a33, a34, a44);
        ax1 = res[0];
        ax2 = res[1];
        ax3 = res[2];
        ax4 = res[3];
        // console.log('i '+icount+
        // 	    ' ax1 '+ax1.toFixed(6)+
        // 	    ' ax2 '+ax2.toFixed(6)+
        // 	    ' ax3 '+ax3.toFixed(6)+
        // 	    ' ax4 '+ax4.toFixed(6));
        // 180
        if (a12 < tol) {
            break;
        }
        for (var j = 0; j < n; j++) {
            y[j] = ax1 * y[j] + ax2 * y2[j] + ax3 * y3[j] + ax4 * y4[j];
        } // 190
        // goto 20
    }
    // 200
    //console.log('eigenvalue',a11.toFixed(6));
    if (a12 > tol && core_1.debug) {
        console.log('residual bigger than tolerance on axis 1');
    }
    var aymax = y[0];
    var aymin = y[0];
    for (var j = 1; j < n; j++) {
        a = y[j];
        if (a < aymin) {
            aymin = a;
        }
        else if (a > aymax) {
            aymax = a;
        }
    }
    if (-aymin > aymax) {
        for (var j = 0; j < n; j++ // 210
        ) {
            y[j] = -y[j];
        }
    }
    yxmult(y, x, mi, n, dat); //,true);
    for (var i = 0; i < mi; i++) {
        x[i] /= aidot[i];
    } // 220
    // 225
    var axlong = 0;
    for (var i = 0; i < mi; i++) {
        axlong += aidot[i] * sqr(x[i]);
    } // 230
    axlong = Math.sqrt(axlong);
    for (var i = 0; i < mi; i++) {
        x[i] /= axlong;
    } // 240
    for (var j = 0; j < n; j++) {
        y[j] /= axlong;
    } // 250
    var sumsq = 0;
    var ax;
    for (var i = 0; i < mi; i++) {
        ax = x[i];
        row = dat[i];
        for (var j = 0; j < n; j++) {
            sumsq += row[j] * sqr(ax - y[j]); // 255
        }
        // 260
    }
    var sd = Math.sqrt(sumsq / tot);
    if (a11 >= 0.999) {
        sd = aymax / axlong;
        var sd1 = -aymin / axlong;
        if (sd1 > sd) {
            sd = sd1;
        }
    }
    // 265
    for (var j = 0; j < n; j++) {
        y[j] /= sd;
    } // 270
    //printvec(x);
    //printvec(y);
    return { rows: x, cols: y, eig: a11 };
}
function sqr(x) {
    return x * x;
}
// @ts-ignore
function solve_tridiag(tol, a11, a12, a22, a23, a33, a34, a44) {
    // 160
    var ax1 = 1.0;
    var ax2 = 0.1;
    var ax3 = 0.01;
    var ax4 = 0.001;
    var axx1;
    var axx2;
    var axx3;
    var axx4;
    var ex;
    var exx;
    var resi;
    //console.log('a11:'+a11+' a12:'+a12+' a22:'+a22);
    //console.log('a23:'+a23+' a33:'+a33+' a34:'+a34+' a44:'+a44);
    for (var itimes = 0; itimes < 100; itimes++) {
        axx1 = a11 * ax1 + a12 * ax2;
        axx2 = a12 * ax1 + a22 * ax2 + a23 * ax3;
        axx3 = a23 * ax2 + a33 * ax3 + a34 * ax4;
        axx4 = a34 * ax3 + a44 * ax4;
        ax1 = a11 * axx1 + a12 * axx2;
        ax2 = a12 * axx1 + a22 * axx2 + a23 * axx3;
        ax3 = a23 * axx2 + a33 * axx3 + a34 * axx4;
        ax4 = a34 * axx3 + a44 * axx4;
        ex = Math.sqrt(sqr(ax1) + sqr(ax2) + sqr(ax3) + sqr(ax4));
        ax1 = ax1 / ex;
        ax2 = ax2 / ex;
        ax3 = ax3 / ex;
        ax4 = ax4 / ex;
        if ((itimes + 1) % 5 === 0) {
            exx = Math.sqrt(ex);
            resi = Math.sqrt(sqr(ax1 - axx1 / exx) +
                sqr(ax2 - axx2 / exx) +
                sqr(ax3 - axx3 / exx) +
                sqr(ax4 - axx4 / exx));
        }
        if (resi < tol * 0.05) {
            break;
        }
        // 170
    }
    // 180
    return [ax1, ax2, ax3, ax4];
}
exports.ca_decorana = decorana;
exports.ca = decorana;
// @ts-ignore
function ca_order(dat) {
    var res = (0, exports.ca)(dat);
    return {
        rows: (0, sort_order_1.sort_order)(res.rows),
        cols: (0, sort_order_1.sort_order)(res.cols),
        details: res,
    };
}
exports.ca_order = ca_order;
