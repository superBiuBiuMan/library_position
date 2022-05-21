var i;

!function(t) {
    void 0 === t.RSAUtils && (i = t.RSAUtils = {});
    var r, e, s, g = t.BigInt = function(i) {
        this.digits = "boolean" == typeof i && 1 == i ? null : r.slice(0), this.isNeg = !1;
    };
    i.setMaxDigits = function(i) {
        r = new Array(i);
        for (var t = 0; t < r.length; t++) r[t] = 0;
        e = new g(), (s = new g()).digits[0] = 1;
    }, i.setMaxDigits(20);
    i.biFromNumber = function(i) {
        var t = new g();
        t.isNeg = i < 0, i = Math.abs(i);
        for (var r = 0; i > 0; ) t.digits[r++] = 65535 & i, i = Math.floor(i / 65536);
        return t;
    };
    var n = i.biFromNumber(1e15);
    i.biFromDecimal = function(t) {
        for (var r, e = "-" == t.charAt(0), s = e ? 1 : 0; s < t.length && "0" == t.charAt(s); ) ++s;
        if (s == t.length) r = new g(); else {
            var d = (t.length - s) % 15;
            for (0 == d && (d = 15), r = i.biFromNumber(Number(t.substr(s, d))), s += d; s < t.length; ) r = i.biAdd(i.biMultiply(r, n), i.biFromNumber(Number(t.substr(s, 15)))), 
            s += 15;
            r.isNeg = e;
        }
        return r;
    }, i.biCopy = function(i) {
        var t = new g(!0);
        return t.digits = i.digits.slice(0), t.isNeg = i.isNeg, t;
    }, i.reverseStr = function(i) {
        for (var t = "", r = i.length - 1; r > -1; --r) t += i.charAt(r);
        return t;
    };
    var d = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ];
    i.biToString = function(t, r) {
        var s = new g();
        s.digits[0] = r;
        for (var n = i.biDivideModulo(t, s), o = d[n[1].digits[0]]; 1 == i.biCompare(n[0], e); ) n = i.biDivideModulo(n[0], s), 
        digit = n[1].digits[0], o += d[n[1].digits[0]];
        return (t.isNeg ? "-" : "") + i.reverseStr(o);
    }, i.biToDecimal = function(t) {
        var r = new g();
        r.digits[0] = 10;
        for (var s = i.biDivideModulo(t, r), n = String(s[1].digits[0]); 1 == i.biCompare(s[0], e); ) s = i.biDivideModulo(s[0], r), 
        n += String(s[1].digits[0]);
        return (t.isNeg ? "-" : "") + i.reverseStr(n);
    };
    var o = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    i.digitToHex = function(t) {
        for (var r = "", e = 0; e < 4; ++e) r += o[15 & t], t >>>= 4;
        return i.reverseStr(r);
    }, i.biToHex = function(t) {
        for (var r = "", e = (i.biHighIndex(t), i.biHighIndex(t)); e > -1; --e) r += i.digitToHex(t.digits[e]);
        return r;
    }, i.charToHex = function(i) {
        return i >= 48 && i <= 57 ? i - 48 : i >= 65 && i <= 90 ? 10 + i - 65 : i >= 97 && i <= 122 ? 10 + i - 97 : 0;
    }, i.hexToDigit = function(t) {
        for (var r = 0, e = Math.min(t.length, 4), s = 0; s < e; ++s) r <<= 4, r |= i.charToHex(t.charCodeAt(s));
        return r;
    }, i.biFromHex = function(t) {
        for (var r = new g(), e = t.length, s = 0; e > 0; e -= 4, ++s) r.digits[s] = i.hexToDigit(t.substr(Math.max(e - 4, 0), Math.min(e, 4)));
        return r;
    }, i.biFromString = function(t, r) {
        var e = "-" == t.charAt(0), s = e ? 1 : 0, n = new g(), d = new g();
        d.digits[0] = 1;
        for (var o = t.length - 1; o >= s; o--) {
            var u = t.charCodeAt(o), a = i.charToHex(u), b = i.biMultiplyDigit(d, a);
            n = i.biAdd(n, b), d = i.biMultiplyDigit(d, r);
        }
        return n.isNeg = e, n;
    }, i.biDump = function(i) {
        return (i.isNeg ? "-" : "") + i.digits.join(" ");
    }, i.biAdd = function(t, r) {
        var e;
        if (t.isNeg != r.isNeg) r.isNeg = !r.isNeg, e = i.biSubtract(t, r), r.isNeg = !r.isNeg; else {
            e = new g();
            for (var s, n = 0, d = 0; d < t.digits.length; ++d) s = t.digits[d] + r.digits[d] + n, 
            e.digits[d] = s % 65536, n = Number(s >= 65536);
            e.isNeg = t.isNeg;
        }
        return e;
    }, i.biSubtract = function(t, r) {
        var e;
        if (t.isNeg != r.isNeg) r.isNeg = !r.isNeg, e = i.biAdd(t, r), r.isNeg = !r.isNeg; else {
            var s, n;
            e = new g(), n = 0;
            for (var d = 0; d < t.digits.length; ++d) s = t.digits[d] - r.digits[d] + n, e.digits[d] = s % 65536, 
            e.digits[d] < 0 && (e.digits[d] += 65536), n = 0 - Number(s < 0);
            if (-1 == n) {
                n = 0;
                for (d = 0; d < t.digits.length; ++d) s = 0 - e.digits[d] + n, e.digits[d] = s % 65536, 
                e.digits[d] < 0 && (e.digits[d] += 65536), n = 0 - Number(s < 0);
                e.isNeg = !t.isNeg;
            } else e.isNeg = t.isNeg;
        }
        return e;
    }, i.biHighIndex = function(i) {
        for (var t = i.digits.length - 1; t > 0 && 0 == i.digits[t]; ) --t;
        return t;
    }, i.biNumBits = function(t) {
        var r, e = i.biHighIndex(t), s = t.digits[e], g = 16 * (e + 1);
        for (r = g; r > g - 16 && 0 == (32768 & s); --r) s <<= 1;
        return r;
    }, i.biMultiply = function(t, r) {
        for (var e, s, n, d = new g(), o = i.biHighIndex(t), u = i.biHighIndex(r), a = 0; a <= u; ++a) {
            e = 0, n = a;
            for (var b = 0; b <= o; ++b, ++n) s = d.digits[n] + t.digits[b] * r.digits[a] + e, 
            d.digits[n] = 65535 & s, e = s >>> 16;
            d.digits[a + o + 1] = e;
        }
        return d.isNeg = t.isNeg != r.isNeg, d;
    }, i.biMultiplyDigit = function(t, r) {
        var e, s, n, d = new g();
        e = i.biHighIndex(t), s = 0;
        for (var o = 0; o <= e; ++o) n = d.digits[o] + t.digits[o] * r + s, d.digits[o] = 65535 & n, 
        s = n >>> 16;
        return d.digits[1 + e] = s, d;
    }, i.arrayCopy = function(i, t, r, e, s) {
        for (var g = Math.min(t + s, i.length), n = t, d = e; n < g; ++n, ++d) r[d] = i[n];
    };
    var u = [ 0, 32768, 49152, 57344, 61440, 63488, 64512, 65024, 65280, 65408, 65472, 65504, 65520, 65528, 65532, 65534, 65535 ];
    i.biShiftLeft = function(t, r) {
        var e = Math.floor(r / 16), s = new g();
        i.arrayCopy(t.digits, 0, s.digits, e, s.digits.length - e);
        for (var n = r % 16, d = 16 - n, o = s.digits.length - 1, a = o - 1; o > 0; --o, 
        --a) s.digits[o] = s.digits[o] << n & 65535 | (s.digits[a] & u[n]) >>> d;
        return s.digits[0] = s.digits[o] << n & 65535, s.isNeg = t.isNeg, s;
    };
    var a = [ 0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535 ];
    function b(t) {
        var r = i, e = r.biDivideByRadixPower(t, this.k - 1), s = r.biMultiply(e, this.mu), g = r.biDivideByRadixPower(s, this.k + 1), n = r.biModuloByRadixPower(t, this.k + 1), d = r.biMultiply(g, this.modulus), o = r.biModuloByRadixPower(d, this.k + 1), u = r.biSubtract(n, o);
        u.isNeg && (u = r.biAdd(u, this.bkplus1));
        for (var a = r.biCompare(u, this.modulus) >= 0; a; ) u = r.biSubtract(u, this.modulus), 
        a = r.biCompare(u, this.modulus) >= 0;
        return u;
    }
    function h(t, r) {
        var e = i.biMultiply(t, r);
        return this.modulo(e);
    }
    function l(t, r) {
        var e = new g();
        e.digits[0] = 1;
        for (var s = t, n = r; 0 != (1 & n.digits[0]) && (e = this.multiplyMod(e, s)), 0 != (n = i.biShiftRight(n, 1)).digits[0] || 0 != i.biHighIndex(n); ) s = this.multiplyMod(s, s);
        return e;
    }
    i.biShiftRight = function(t, r) {
        var e = Math.floor(r / 16), s = new g();
        i.arrayCopy(t.digits, e, s.digits, 0, t.digits.length - e);
        for (var n = r % 16, d = 16 - n, o = 0, u = o + 1; o < s.digits.length - 1; ++o, 
        ++u) s.digits[o] = s.digits[o] >>> n | (s.digits[u] & a[n]) << d;
        return s.digits[s.digits.length - 1] >>>= n, s.isNeg = t.isNeg, s;
    }, i.biMultiplyByRadixPower = function(t, r) {
        var e = new g();
        return i.arrayCopy(t.digits, 0, e.digits, r, e.digits.length - r), e;
    }, i.biDivideByRadixPower = function(t, r) {
        var e = new g();
        return i.arrayCopy(t.digits, r, e.digits, 0, e.digits.length - r), e;
    }, i.biModuloByRadixPower = function(t, r) {
        var e = new g();
        return i.arrayCopy(t.digits, 0, e.digits, 0, r), e;
    }, i.biCompare = function(i, t) {
        if (i.isNeg != t.isNeg) return 1 - 2 * Number(i.isNeg);
        for (var r = i.digits.length - 1; r >= 0; --r) if (i.digits[r] != t.digits[r]) return i.isNeg ? 1 - 2 * Number(i.digits[r] > t.digits[r]) : 1 - 2 * Number(i.digits[r] < t.digits[r]);
        return 0;
    }, i.biDivideModulo = function(t, r) {
        var e, n, d = i.biNumBits(t), o = i.biNumBits(r), u = r.isNeg;
        if (d < o) return t.isNeg ? ((e = i.biCopy(s)).isNeg = !r.isNeg, t.isNeg = !1, r.isNeg = !1, 
        n = biSubtract(r, t), t.isNeg = !0, r.isNeg = u) : (e = new g(), n = i.biCopy(t)), 
        [ e, n ];
        e = new g(), n = t;
        for (var a = Math.ceil(o / 16) - 1, b = 0; r.digits[a] < 32768; ) r = i.biShiftLeft(r, 1), 
        ++b, ++o, a = Math.ceil(o / 16) - 1;
        n = i.biShiftLeft(n, b), d += b;
        for (var h = Math.ceil(d / 16) - 1, l = i.biMultiplyByRadixPower(r, h - a); -1 != i.biCompare(n, l); ) ++e.digits[h - a], 
        n = i.biSubtract(n, l);
        for (var f = h; f > a; --f) {
            var v = f >= n.digits.length ? 0 : n.digits[f], c = f - 1 >= n.digits.length ? 0 : n.digits[f - 1], N = f - 2 >= n.digits.length ? 0 : n.digits[f - 2], m = a >= r.digits.length ? 0 : r.digits[a], M = a - 1 >= r.digits.length ? 0 : r.digits[a - 1];
            e.digits[f - a - 1] = v == m ? 65535 : Math.floor((65536 * v + c) / m);
            for (var y = e.digits[f - a - 1] * (65536 * m + M), p = 4294967296 * v + (65536 * c + N); y > p; ) --e.digits[f - a - 1], 
            y = e.digits[f - a - 1] * (65536 * m | M), p = 65536 * v * 65536 + (65536 * c + N);
            l = i.biMultiplyByRadixPower(r, f - a - 1), (n = i.biSubtract(n, i.biMultiplyDigit(l, e.digits[f - a - 1]))).isNeg && (n = i.biAdd(n, l), 
            --e.digits[f - a - 1]);
        }
        return n = i.biShiftRight(n, b), e.isNeg = t.isNeg != u, t.isNeg && (e = u ? i.biAdd(e, s) : i.biSubtract(e, s), 
        r = i.biShiftRight(r, b), n = i.biSubtract(r, n)), 0 == n.digits[0] && 0 == i.biHighIndex(n) && (n.isNeg = !1), 
        [ e, n ];
    }, i.biDivide = function(t, r) {
        return i.biDivideModulo(t, r)[0];
    }, i.biModulo = function(t, r) {
        return i.biDivideModulo(t, r)[1];
    }, i.biMultiplyMod = function(t, r, e) {
        return i.biModulo(i.biMultiply(t, r), e);
    }, i.biPow = function(t, r) {
        for (var e = s, g = t; 0 != (1 & r) && (e = i.biMultiply(e, g)), 0 != (r >>= 1); ) g = i.biMultiply(g, g);
        return e;
    }, i.biPowMod = function(t, r, e) {
        for (var g = s, n = t, d = r; 0 != (1 & d.digits[0]) && (g = i.biMultiplyMod(g, n, e)), 
        0 != (d = i.biShiftRight(d, 1)).digits[0] || 0 != i.biHighIndex(d); ) n = i.biMultiplyMod(n, n, e);
        return g;
    }, t.BarrettMu = function(t) {
        this.modulus = i.biCopy(t), this.k = i.biHighIndex(this.modulus) + 1;
        var r = new g();
        r.digits[2 * this.k] = 1, this.mu = i.biDivide(r, this.modulus), this.bkplus1 = new g(), 
        this.bkplus1.digits[this.k + 1] = 1, this.modulo = b, this.multiplyMod = h, this.powMod = l;
    };
    var f = function(r, e, s) {
        var g = i;
        this.e = g.biFromHex(r), this.d = g.biFromHex(e), this.m = g.biFromHex(s), this.chunkSize = 2 * g.biHighIndex(this.m), 
        this.radix = 16, this.barrett = new t.BarrettMu(this.m);
    };
    i.getKeyPair = function(i, t, r) {
        return new f(i, t, r);
    }, void 0 === t.twoDigit && (t.twoDigit = function(i) {
        return (i < 10 ? "0" : "") + String(i);
    }), i.encryptedString = function(t, r) {
        for (var e = [], s = r.length, n = 0; n < s; ) e[n] = r.charCodeAt(n), n++;
        for (;e.length % t.chunkSize != 0; ) e[n++] = 0;
        var d, o, u, a = e.length, b = "";
        for (n = 0; n < a; n += t.chunkSize) {
            for (u = new g(), d = 0, o = n; o < n + t.chunkSize; ++d) u.digits[d] = e[o++], 
            u.digits[d] += e[o++] << 8;
            var h = t.barrett.powMod(u, t.e);
            b += (16 == t.radix ? i.biToHex(h) : i.biToString(h, t.radix)) + " ";
        }
        return b.substring(0, b.length - 1);
    }, i.decryptedString = function(t, r) {
        var e, s, g, n = r.split(" "), d = "";
        for (e = 0; e < n.length; ++e) {
            var o;
            for (o = 16 == t.radix ? i.biFromHex(n[e]) : i.biFromString(n[e], t.radix), g = t.barrett.powMod(o, t.d), 
            s = 0; s <= i.biHighIndex(g); ++s) d += String.fromCharCode(255 & g.digits[s], g.digits[s] >> 8);
        }
        return 0 == d.charCodeAt(d.length - 1) && (d = d.substring(0, d.length - 1)), d;
    }, i.setMaxDigits(130);
}({}), module.exports = i;