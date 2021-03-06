!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.vgFileSaver = t())
    : (e.vgFileSaver = t())
})(this, function() {
  return (function(e) {
    function t(o) {
      if (r[o]) return r[o].exports
      var n = (r[o] = { exports: {}, id: o, loaded: !1 })
      return e[o].call(n.exports, n, n.exports, t), (n.loaded = !0), n.exports
    }
    var r = {}
    return (t.m = e), (t.c = r), (t.p = ''), t(0)
  })([
    function(e, t, r) {
      'use strict'
      Object.defineProperty(t, '__esModule', { value: !0 })
      var o = r(1)
      Object.defineProperty(t, 'saveAs', {
        enumerable: !0,
        get: function() {
          return o.saveAs
        }
      })
      var n = r(2)
      Object.defineProperty(t, 'encodeBase64', {
        enumerable: !0,
        get: function() {
          return n.encodeBase64
        }
      })
    },
    function(e, t) {
      'use strict'
      function r(e, t) {
        var r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = a
        if (r.forceProxy && !r.proxyURL)
          throw new Error('No proxyURL is set, but forceProxy is true')
        r.forceProxy || (c() && (i = n), navigator.msSaveBlob && (i = o)),
          i(e, t, r)
      }
      function o(e, t) {
        var r = e
        if ('string' == typeof e) {
          for (
            var o = e.split(';base64,'),
              n = o[0],
              a = atob(o[1]),
              i = new Uint8Array(a.length),
              c = 0;
            c < a.length;
            c++
          )
            i[c] = a.charCodeAt(c)
          r = new Blob([i.buffer], { type: n })
        }
        navigator.msSaveBlob(r, t)
      }
      function n(e, t) {
        var r = e
        window.Blob && e instanceof Blob && (r = URL.createObjectURL(e))
        var o = i()
        ;(o.download = t), (o.href = r)
        var n = document.createEvent('MouseEvents')
        n.initMouseEvent(
          'click',
          !0,
          !1,
          window,
          0,
          0,
          0,
          0,
          0,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
          o.dispatchEvent(n),
          setTimeout(function() {
            return URL.revokeObjectURL(r)
          })
      }
      function a(e, t, r) {
        if (r.proxyURL) {
          var o = document.createElement('form')
          o.setAttribute('action', r.proxyURL),
            o.setAttribute('method', 'POST'),
            o.setAttribute('target', r.proxyTarget || '_self')
          var n = r.proxyData || {}
          n.fileName = t
          var a = e.split(';base64,')
          ;(n.contentType = a[0].replace('data:', '')), (n.base64 = a[1])
          for (var i in n)
            if (n.hasOwnProperty(i)) {
              var c = document.createElement('input')
              c.setAttribute('type', 'hidden'),
                c.setAttribute('name', i),
                c.setAttribute('value', n[i]),
                o.appendChild(c)
            }
          document.body.appendChild(o), o.submit(), document.body.removeChild(o)
        }
      }
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.saveAs = r)
      var i = function() {
          return document.createElement('a')
        },
        c = function() {
          return 'download' in i()
        }
    },
    function(e, t) {
      'use strict'
      function r(e) {
        for (
          var t = o(e),
            r = '',
            a = void 0,
            i = void 0,
            c = void 0,
            u = void 0,
            d = void 0,
            s = void 0,
            f = void 0,
            v = 0;
          v < t.length;

        )
          (a = t.charCodeAt(v++)),
            (i = t.charCodeAt(v++)),
            (c = t.charCodeAt(v++)),
            (u = a >> 2),
            (d = ((3 & a) << 4) | (i >> 4)),
            (s = ((15 & i) << 2) | (c >> 6)),
            (f = 63 & c),
            isNaN(i) ? (s = f = 64) : isNaN(c) && (f = 64),
            (r = r + n.charAt(u) + n.charAt(d) + n.charAt(s) + n.charAt(f))
        return r
      }
      function o(e) {
        for (var t = '', r = 0; r < e.length; r++) {
          var o = e.charCodeAt(r)
          o < 128
            ? (t += a(o))
            : o < 2048
            ? ((t += a(192 | (o >>> 6))), (t += a(128 | (63 & o))))
            : o < 65536 &&
              ((t += a(224 | (o >>> 12))),
              (t += a(128 | ((o >>> 6) & 63))),
              (t += a(128 | (63 & o))))
        }
        return t
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.encodeBase64 = r)
      var n =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        a = String.fromCharCode
    }
  ])
})
