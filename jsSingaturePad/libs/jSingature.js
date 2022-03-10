/*
jSignature v2 "2018-11-06T13:56" "commit ID 89c22b348ab2e1d92a928d8fd992f175e8bc5cbd"
Copyright (c) 2012 Willow Systems Corp http://willow-systems.com
Copyright (c) 2010 Brinley Ang http://www.unbolt.net
MIT License <http://www.opensource.org/licenses/mit-license.php>
Simplify.js BSD 
(c) 2012, Vladimir Agafonkin
mourner.github.com/simplify-js
base64 encoder
MIT, GPL
http://phpjs.org/functions/base64_encode
+   original by: Tyler Akins (http://rumkin.com)
+   improved by: Bayron Guevara
+   improved by: Thunder.m
+   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
+   bugfixed by: Pellentesque Malesuada
+   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
+   improved by: Rafal Kukawski (http://kukawski.pl)
jSignature v2 jSignature's Undo Button and undo functionality plugin
jSignature v2 jSignature's custom "base30" format export and import plugins.
jSignature v2 SVG export plugin.
*/
(function () {
    function q(a) {
        var b = a.css("color"), c; a = a[0]; for (var g = !1; a && !c && !g;) { try { var d = $(a).css("background-color") } catch (l) { d = "transparent" } "transparent" !== d && "rgba(0, 0, 0, 0)" !== d && (c = d); g = a.body; a = a.parentNode } a = /rgb[a]*\((\d+),\s*(\d+),\s*(\d+)/; g = /#([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})([AaBbCcDdEeFf\d]{2})/; d = void 0; if (d = b.match(a)) var m = { r: parseInt(d[1], 10), g: parseInt(d[2], 10), b: parseInt(d[3], 10) }; else (d = b.match(g)) && (m = { r: parseInt(d[1], 16), g: parseInt(d[2], 16), b: parseInt(d[3], 16) });
        if (c) if (d = void 0, d = c.match(a)) var e = { r: parseInt(d[1], 10), g: parseInt(d[2], 10), b: parseInt(d[3], 10) }; else (d = c.match(g)) && (e = { r: parseInt(d[1], 16), g: parseInt(d[2], 16), b: parseInt(d[3], 16) }); else e = m ? 127 < Math.max.apply(null, [m.r, m.g, m.b]) ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 } : { r: 255, g: 255, b: 255 }; d = function (a) { return "rgb(" + [a.r, a.g, a.b].join(", ") + ")" }; m && e ? (a = Math.max.apply(null, [m.r, m.g, m.b]), m = Math.max.apply(null, [e.r, e.g, e.b]), m = Math.round(m + -.75 * (m - a)), m = { r: m, g: m, b: m }) : m ? (m = Math.max.apply(null, [m.r, m.g,
        m.b]), a = 1, 127 < m && (a = -1), m = Math.round(m + 96 * a), m = { r: m, g: m, b: m }) : m = { r: 191, g: 191, b: 191 }; return { color: b, "background-color": e ? d(e) : c, "decor-color": d(m) }
    } function k(a, b) {
        this.x = a; this.y = b; this.reverse = function () { return new this.constructor(-1 * this.x, -1 * this.y) }; this._length = null; this.getLength = function () { this._length || (this._length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))); return this._length }; var c = function (a) { return Math.round(a / Math.abs(a)) }; this.resizeTo = function (a) {
            if (0 === this.x && 0 === this.y) this._length =
                0; else if (0 === this.x) this._length = a, this.y = a * c(this.y); else if (0 === this.y) this._length = a, this.x = a * c(this.x); else { var b = Math.abs(this.y / this.x), g = Math.sqrt(Math.pow(a, 2) / (1 + Math.pow(b, 2))); b *= g; this._length = a; this.x = g * c(this.x); this.y = b * c(this.y) } return this
        }; this.angleTo = function (a) { var b = this.getLength() * a.getLength(); return 0 === b ? 0 : Math.acos(Math.min(Math.max((this.x * a.x + this.y * a.y) / b, -1), 1)) / Math.PI }
    } function h(a, b) {
        this.x = a; this.y = b; this.getVectorToCoordinates = function (a, b) {
            return new k(a - this.x,
                b - this.y)
        }; this.getVectorFromCoordinates = function (a, b) { return this.getVectorToCoordinates(a, b).reverse() }; this.getVectorToPoint = function (a) { return new k(a.x - this.x, a.y - this.y) }; this.getVectorFromPoint = function (a) { return this.getVectorToPoint(a).reverse() }
    } function p(a, b, c, g, d) {
        this.data = a; this.context = b; if (a.length) for (var m = a.length, e, l, f = 0; f < m; f++) { e = a[f]; l = e.x.length; c.call(b, e); for (var t = 1; t < l; t++)g.call(b, e, t); d.call(b, e) } this.changed = function () { }; this.startStrokeFn = c; this.addToStrokeFn = g; this.endStrokeFn =
            d; this.inStroke = !1; this._stroke = this._lastPoint = null; this.startStroke = function (a) { if (a && "number" == typeof a.x && "number" == typeof a.y) { this._stroke = { x: [a.x], y: [a.y] }; this.data.push(this._stroke); this._lastPoint = a; this.inStroke = !0; var b = this._stroke, c = this.startStrokeFn, d = this.context; setTimeout(function () { c.call(d, b) }, 3); return a } return null }; this.addToStroke = function (a) {
                if (this.inStroke && "number" === typeof a.x && "number" === typeof a.y && 4 < Math.abs(a.x - this._lastPoint.x) + Math.abs(a.y - this._lastPoint.y)) {
                    var b =
                        this._stroke.x.length; this._stroke.x.push(a.x); this._stroke.y.push(a.y); this._lastPoint = a; var c = this._stroke, d = this.addToStrokeFn, g = this.context; setTimeout(function () { d.call(g, c, b) }, 3); return a
                } return null
            }; this.endStroke = function () { var a = this.inStroke; this.inStroke = !1; this._lastPoint = null; if (a) { var b = this._stroke, c = this.endStrokeFn, d = this.context, g = this.changed; setTimeout(function () { c.call(d, b); g.call(d) }, 3); return !0 } return null }
    } function n(a, b, c, g) {
        if ("ratio" === b || "%" === b.split("")[b.length - 1]) this.eventTokens[c +
            ".parentresized"] = g.subscribe(c + ".parentresized", function (b, m, e, l) { return function () { var d = m.width(); if (d !== e) { for (var l in b) b.hasOwnProperty(l) && (g.unsubscribe(b[l]), delete b[l]); var f = a.settings; a.$parent.children().remove(); for (l in a) a.hasOwnProperty(l) && delete a[l]; l = f.data; d = 1 * d / e; var r = [], D, E; var h = 0; for (D = l.length; h < D; h++) { var k = l[h]; var n = { x: [], y: [] }; var p = 0; for (E = k.x.length; p < E; p++)n.x.push(k.x[p] * d), n.y.push(k.y[p] * d); r.push(n) } f.data = r; m[c](f) } } }(this.eventTokens, this.$parent, this.$parent.width(),
                1 * this.canvas.width / this.canvas.height))
    } function w(a, b, c) {
        var g = this.$parent = $(a); a = this.eventTokens = {}; this.events = new u(this); var d = $.fn.jSignature("globalEvents"), e = { width: "ratio", height: "ratio", sizeRatio: 4, color: "#000", "background-color": "#fff", "decor-color": "#eee", lineWidth: 0, minFatFingerCompensation: -10, showUndoButton: !1, readOnly: !1, data: [], signatureLine: !1 }; $.extend(e, q(g)); b && $.extend(e, b); this.settings = e; for (var f in c) c.hasOwnProperty(f) && c[f].call(this, f); this.events.publish("jSignature.initializing");
        this.$controlbarUpper = $('<div style="padding:0 !important; margin:0 !important;width: 100% !important; height: 0 !important; -ms-touch-action: none; touch-action: none;margin-top:-1em !important; margin-bottom:1em !important;"></div>').appendTo(g); this.isCanvasEmulator = !1; b = this.canvas = this.initializeCanvas(e); c = $(b); this.$controlbarLower = $('<div style="padding:0 !important; margin:0 !important;width: 100% !important; height: 0 !important; -ms-touch-action: none; touch-action: none;margin-top:-1.5em !important; margin-bottom:1.5em !important; position: relative;"></div>').appendTo(g);
        this.canvasContext = b.getContext("2d"); c.data("jSignature.this", this); e.lineWidth = function (a, b) { return a ? a : Math.max(Math.round(b / 400), 2) }(e.lineWidth, b.width); this.lineCurveThreshold = 3 * e.lineWidth; e.cssclass && "" != $.trim(e.cssclass) && c.addClass(e.cssclass); this.fatFingerCompensation = 0; g = function (a) {
            var b, c, d = function (d) { d = d.changedTouches && 0 < d.changedTouches.length ? d.changedTouches[0] : d; return new h(Math.round(d.pageX + b), Math.round(d.pageY + c) + a.fatFingerCompensation) }, g = new v(750, function () { a.dataEngine.endStroke() });
            this.drawEndHandler = function (b) { if (!a.settings.readOnly) { try { b.preventDefault() } catch (A) { } g.clear(); a.dataEngine.endStroke() } }; this.drawStartHandler = function (e) { if (!a.settings.readOnly) { e.preventDefault(); var m = $(a.canvas).offset(); b = -1 * m.left; c = -1 * m.top; a.dataEngine.startStroke(d(e)); g.kick() } }; this.drawMoveHandler = function (b) { a.settings.readOnly || (b.preventDefault(), a.dataEngine.inStroke && (a.dataEngine.addToStroke(d(b)), g.kick())) }; return this
        }.call({}, this); (function (a, b, c) {
            var d = this.canvas, g =
                $(d); if (this.isCanvasEmulator) g.bind("mousemove.jSignature", c), g.bind("mouseup.jSignature", a), g.bind("mousedown.jSignature", b); else {
                    var m = "function" === typeof d.addEventListener; this.ontouchstart = function (g) {
                        d.onmousedown = d.onmouseup = d.onmousemove = void 0; this.fatFingerCompensation = e.minFatFingerCompensation && -3 * e.lineWidth > e.minFatFingerCompensation ? -3 * e.lineWidth : e.minFatFingerCompensation; b(g); m ? (d.addEventListener("touchend", a), d.addEventListener("touchstart", b), d.addEventListener("touchmove", c)) :
                            (d.ontouchend = a, d.ontouchstart = b, d.ontouchmove = c)
                    }; m ? d.addEventListener("touchstart", this.ontouchstart) : d.ontouchstart = ontouchstart; d.onmousedown = function (g) { m ? d.removeEventListener("touchstart", this.ontouchstart) : d.ontouchstart = d.ontouchend = d.ontouchmove = void 0; b(g); d.onmousedown = b; d.onmouseup = a; d.onmousemove = c }; window.navigator.msPointerEnabled && (d.onmspointerdown = b, d.onmspointerup = a, d.onmspointermove = c)
                }
        }).call(this, g.drawEndHandler, g.drawStartHandler, g.drawMoveHandler); a["jSignature.windowmouseup"] =
            d.subscribe("jSignature.windowmouseup", g.drawEndHandler); this.events.publish("jSignature.attachingEventHandlers"); n.call(this, this, e.width.toString(10), "jSignature", d); this.resetCanvas(e.data); this.events.publish("jSignature.initialized"); return this
    } function x(a) {
        if (a.getContext) return !1; var b = a.ownerDocument.parentWindow, c = b.FlashCanvas ? a.ownerDocument.parentWindow.FlashCanvas : "undefined" === typeof FlashCanvas ? void 0 : FlashCanvas; if (c) {
            a = c.initElement(a); c = 1; b && b.screen && b.screen.deviceXDPI && b.screen.logicalXDPI &&
                (c = 1 * b.screen.deviceXDPI / b.screen.logicalXDPI); if (1 !== c) try { $(a).children("object").get(0).resize(Math.ceil(a.width * c), Math.ceil(a.height * c)), a.getContext("2d").scale(c, c) } catch (g) { } return !0
        } throw Error("Canvas element does not support 2d context. jSignature cannot proceed.");
    } var v = function (a, b) { var c; this.kick = function () { clearTimeout(c); c = setTimeout(b, a) }; this.clear = function () { clearTimeout(c) }; return this }, u = function (a) {
        this.topics = {}; this.context = a ? a : this; this.publish = function (a, c, g, d) {
            if (this.topics[a]) {
                var b =
                    this.topics[a], e = Array.prototype.slice.call(arguments, 1), f = [], h = [], t; var k = 0; for (t = b.length; k < t; k++) { var r = b[k]; var D = r[0]; r[1] && (r[0] = function () { }, f.push(k)); h.push(D) } k = 0; for (t = f.length; k < t; k++)b.splice(f[k], 1); k = 0; for (t = h.length; k < t; k++)h[k].apply(this.context, e)
            }
        }; this.subscribe = function (a, c, g) { this.topics[a] ? this.topics[a].push([c, g]) : this.topics[a] = [[c, g]]; return { topic: a, callback: c } }; this.unsubscribe = function (a) {
            if (this.topics[a.topic]) for (var b = this.topics[a.topic], g = 0, d = b.length; g < d; g++)b[g] &&
                b[g][0] === a.callback && b.splice(g, 1)
        }
    }, y = function (a, b, c, g, d) { a.beginPath(); a.moveTo(b, c); a.lineTo(g, d); a.closePath(); a.stroke() }, C = function (a) { var b = this.canvasContext, c = a.x[0]; a = a.y[0]; var g = this.settings.lineWidth, d = b.fillStyle; b.fillStyle = b.strokeStyle; b.fillRect(c + g / -2, a + g / -2, g, g); b.fillStyle = d }, f = function (a, b) {
        var c = new h(a.x[b - 1], a.y[b - 1]), g = new h(a.x[b], a.y[b]), d = c.getVectorToPoint(g); if (1 < b) {
            var e = new h(a.x[b - 2], a.y[b - 2]), f = e.getVectorToPoint(c); if (f.getLength() > this.lineCurveThreshold) {
                var l =
                    2 < b ? (new h(a.x[b - 3], a.y[b - 3])).getVectorToPoint(e) : new k(0, 0); var n = .35 * f.getLength(), t = f.angleTo(l.reverse()), p = d.angleTo(f.reverse()); l = (new k(l.x + f.x, l.y + f.y)).resizeTo(Math.max(.05, t) * n); var r = (new k(f.x + d.x, f.y + d.y)).reverse().resizeTo(Math.max(.05, p) * n); f = this.canvasContext; n = e.x; p = e.y; t = c.x; var D = c.y, A = e.x + l.x; e = e.y + l.y; l = c.x + r.x; r = c.y + r.y; f.beginPath(); f.moveTo(n, p); f.bezierCurveTo(A, e, l, r, t, D); f.closePath(); f.stroke()
            }
        } d.getLength() <= this.lineCurveThreshold && y(this.canvasContext, c.x, c.y,
            g.x, g.y)
    }, e = function (a) { var b = a.x.length - 1; if (0 < b) { var c = new h(a.x[b], a.y[b]), e = new h(a.x[b - 1], a.y[b - 1]), d = e.getVectorToPoint(c); if (d.getLength() > this.lineCurveThreshold) if (1 < b) { a = (new h(a.x[b - 2], a.y[b - 2])).getVectorToPoint(e); var f = (new k(a.x + d.x, a.y + d.y)).resizeTo(d.getLength() / 2); d = this.canvasContext; a = e.x; b = e.y; var E = c.x, l = c.y, n = e.x + f.x; e = e.y + f.y; f = c.x; c = c.y; d.beginPath(); d.moveTo(a, b); d.bezierCurveTo(n, e, f, c, E, l); d.closePath(); d.stroke() } else y(this.canvasContext, e.x, e.y, c.x, c.y) } }; w.prototype.resetCanvas =
        function (a, b) {
            var c = this.canvas, g = this.settings, d = this.canvasContext, m = this.isCanvasEmulator, h = c.width, l = c.height; b || d.clearRect(0, 0, h + 30, l + 30); d.shadowColor = d.fillStyle = g["background-color"]; m && d.fillRect(0, 0, h + 30, l + 30); d.lineWidth = Math.ceil(parseInt(g.lineWidth, 10)); d.lineCap = d.lineJoin = "round"; if (g.signatureLine) {
                if (null != g["decor-color"]) { d.strokeStyle = g["decor-color"]; d.shadowOffsetX = 0; d.shadowOffsetY = 0; var k = Math.round(l / 5); y(d, 1.5 * k, l - k, h - 1.5 * k, l - k) } m || (d.shadowColor = d.strokeStyle, d.shadowOffsetX =
                    .5 * d.lineWidth, d.shadowOffsetY = -.6 * d.lineWidth, d.shadowBlur = 0)
            } d.strokeStyle = g.color; a || (a = []); d = this.dataEngine = new p(a, this, C, f, e); g.data = a; $(c).data("jSignature.data", a).data("jSignature.settings", g); d.changed = function (a, b, d) { return function () { b.publish(d + ".change"); a.trigger("change") } }(this.$parent, this.events, "jSignature"); d.changed(); return !0
        }; w.prototype.initializeCanvas = function (a) {
            var b = document.createElement("canvas"), c = $(b); a.width === a.height && "ratio" === a.height && (a.width = "100%"); c.css({
                margin: 0,
                padding: 0, border: "none", height: "ratio" !== a.height && a.height ? a.height.toString(10) : 1, width: "ratio" !== a.width && a.width ? a.width.toString(10) : 1, "-ms-touch-action": "none", "touch-action": "none", "background-color": a["background-color"]
            }); c.appendTo(this.$parent); "ratio" === a.height ? c.css("height", Math.round(c.width() / a.sizeRatio)) : "ratio" === a.width && c.css("width", Math.round(c.height() * a.sizeRatio)); c.addClass("jSignature"); b.width = c.width(); b.height = c.height(); this.isCanvasEmulator = x(b); b.onselectstart = function (a) {
                a &&
                a.preventDefault && a.preventDefault(); a && a.stopPropagation && a.stopPropagation(); return !1
            }; return b
        }; (function (a) {
            function b(a, b, d) { var c = new Image, e = this; c.onload = function () { var a = e.getContext("2d"), b = a.shadowColor; a.shadowColor = "transparent"; a.drawImage(c, 0, 0, c.width < e.width ? c.width : e.width, c.height < e.height ? c.height : e.height); a.shadowColor = b }; c.src = "data:" + b + "," + a } function c(a, b) { this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").resetCanvas(a, b); return this }
            function e(a, b) { if (void 0 === b && "string" === typeof a && "data:" === a.substr(0, 5) && (b = a.slice(5).split(",")[0], a = a.slice(6 + b.length), b === a)) return; var c = this.find("canvas.jSignature").add(this.filter("canvas.jSignature")); if (l.hasOwnProperty(b)) 0 !== c.length && l[b].call(c[0], a, b, function (a) { return function () { return a.resetCanvas.apply(a, arguments) } }(c.data("jSignature.this"))); else throw Error("jSignature is unable to find import plugin with for format '" + String(b) + "'"); return this } var d = new u; (function (a,
                b, c, d) { var e, g = function () { a.publish(b + ".parentresized") }; c(d).bind("resize." + b, function () { e && clearTimeout(e); e = setTimeout(g, 500) }).bind("mouseup." + b, function (c) { a.publish(b + ".windowmouseup") }) })(d, "jSignature", $, a); var f = {}, h = { "default": function (a) { return this.toDataURL() }, "native": function (a) { return a }, image: function (a) { a = this.toDataURL(); if ("string" === typeof a && 4 < a.length && "data:" === a.slice(0, 5) && -1 !== a.indexOf(",")) { var b = a.indexOf(","); return [a.slice(5, b), a.substr(b + 1)] } return [] } }, l = {
                    "native": function (a,
                        b, c) { c(a) }, image: b, "image/png;base64": b, "image/jpeg;base64": b, "image/jpg;base64": b
                }, k = function (a) { var b = !1; for (a = a.parentNode; a && !b;)b = a.body, a = a.parentNode; return !b }, n = { "export": h, "import": l, instance: f }, p = {
                    init: function (a) { return this.each(function () { k(this) || new w(this, a, f) }) }, destroy: function () {
                        return this.each(function () {
                            if (!k(this)) {
                                var a = $(this).find("canvas").data("jSignature.this"); if (a) {
                                    a.$controlbarLower.remove(); a.$controlbarUpper.remove(); $(a.canvas).remove(); for (var b in a.eventTokens) a.eventTokens.hasOwnProperty(b) &&
                                        d.unsubscribe(a.eventTokens[b])
                                }
                            }
                        })
                    }, getSettings: function () { return this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").settings }, isModified: function () { return null !== this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").dataEngine._stroke }, updateSetting: function (a, b, c) {
                        var d = this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this"); d.settings[a] = b; d.resetCanvas(c ? null : d.settings.data,
                            !0); return d.settings[a]
                    }, clear: c, reset: c, addPlugin: function (a, b, c) { n.hasOwnProperty(a) && (n[a][b] = c); return this }, listPlugins: function (a) { var b = []; if (n.hasOwnProperty(a)) { a = n[a]; for (var c in a) a.hasOwnProperty(c) && b.push(c) } return b }, getData: function (a) { var b = this.find("canvas.jSignature").add(this.filter("canvas.jSignature")); void 0 === a && (a = "default"); if (0 !== b.length && h.hasOwnProperty(a)) return h[a].call(b.get(0), b.data("jSignature.data"), b.data("jSignature.settings")) }, importData: e, setData: e, globalEvents: function () { return d },
                    disable: function () { this.find("input").attr("disabled", 1); this.find("canvas.jSignature").addClass("disabled").data("jSignature.this").settings.readOnly = !0 }, enable: function () { this.find("input").removeAttr("disabled"); this.find("canvas.jSignature").removeClass("disabled").data("jSignature.this").settings.readOnly = !1 }, events: function () { return this.find("canvas.jSignature").add(this.filter("canvas.jSignature")).data("jSignature.this").events }
                }; $.fn.jSignature = function (a) {
                    if (a && "object" !== typeof a) {
                        if ("string" ===
                            typeof a && p[a]) return p[a].apply(this, Array.prototype.slice.call(arguments, 1)); $.error("Method " + String(a) + " does not exist on jQuery.jSignature")
                    } else return p.init.apply(this, arguments)
                }
        })(window)
})();
(function () {
    function q(k, h, p) { k = k.call(this); (function (h, k, p) { h.events.subscribe(p + ".change", function () { h.dataEngine.data.length ? k.show() : k.hide() }) })(this, k, h); (function (h, k, p) { var n = p + ".undo"; k.bind("click", function () { h.events.publish(n) }); h.events.subscribe(n, function () { var k = h.dataEngine.data; k.length && (k.pop(), h.resetCanvas(k)) }) })(this, k, this.events.topics.hasOwnProperty(h + ".undo") ? p : h) } $.fn.jSignature("addPlugin", "instance", "UndoButton", function (k) {
        this.events.subscribe("jSignature.attachingEventHandlers",
            function () { if (this.settings[k]) { var h = this.settings[k]; "function" !== typeof h && (h = function () { var h = $('<input type="button" value="Undo last stroke" style="position:absolute;display:none;margin:0 !important;top:auto" />').appendTo(this.$controlbarLower), k = h.width(); h.css("left", Math.round((this.canvas.width - k) / 2)); k !== h.width() && h.width(k); return h }); q.call(this, h, "jSignature", k) } })
    })
})();
(function () {
    for (var q = {}, k = {}, h = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWX".split(""), p = h.length / 2, n = p - 1; -1 < n; n--)q[h[n]] = h[n + p], k[h[n + p]] = h[n]; var w = function (e) { e = e.split(""); for (var a = e.length, b = 1; b < a; b++)e[b] = q[e[b]]; return e.join("") }, x = function (e) { for (var a = [], b = 0, c = 1, g = e.length, d, f, h = 0; h < g; h++)d = Math.round(e[h]), f = d - b, b = d, 0 > f && 0 < c ? (c = -1, a.push("Z")) : 0 < f && 0 > c && (c = 1, a.push("Y")), d = Math.abs(f), d >= p ? a.push(w(d.toString(p))) : a.push(d.toString(p)); return a.join("") }, v = function (e) {
        var a =
            []; e = e.split(""); for (var b = e.length, c, g = 1, d = [], f = 0, h = 0; h < b; h++)c = e[h], c in q || "Z" === c || "Y" === c ? (0 !== d.length && (d = parseInt(d.join(""), p) * g + f, a.push(d), f = d), "Z" === c ? (g = -1, d = []) : "Y" === c ? (g = 1, d = []) : d = [c]) : d.push(k[c]); a.push(parseInt(d.join(""), p) * g + f); return a
    }, u = function (e) { for (var a = [], b = e.length, c, g = 0; g < b; g++)c = e[g], a.push(x(c.x)), a.push(x(c.y)); return a.join("_") }, y = function (e) { var a = []; e = e.split("_"); for (var b = e.length / 2, c = 0; c < b; c++)a.push({ x: v(e[2 * c]), y: v(e[2 * c + 1]) }); return a }, C = function (e) {
        return ["image/jsignature;base30",
            u(e)]
    }, f = function (e, a, b) { "string" === typeof e && ("image/jsignature;base30" === e.substring(0, 23).toLowerCase() && (e = e.substring(24)), b(y(e))) }; if (null == this.jQuery) throw Error("We need jQuery for some of the functionality. jQuery is not detected. Failing to initialize..."); (function (e) { e = e.fn.jSignature; e("addPlugin", "export", "base30", C); e("addPlugin", "export", "image/jsignature;base30", C); e("addPlugin", "import", "base30", f); e("addPlugin", "import", "image/jsignature;base30", f) })(this.jQuery); this.jSignatureDebug &&
        (this.jSignatureDebug.base30 = { remapTailChars: w, compressstrokeleg: x, uncompressstrokeleg: v, compressstrokes: u, uncompressstrokes: y, charmap: q })
}).call("undefined" !== typeof window ? window : this);
(function () {
    function q(f, e) {
        this.x = f; this.y = e; this.reverse = function () { return new this.constructor(-1 * this.x, -1 * this.y) }; this._length = null; this.getLength = function () { this._length || (this._length = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))); return this._length }; var a = function (a) { return Math.round(a / Math.abs(a)) }; this.resizeTo = function (b) {
            if (0 === this.x && 0 === this.y) this._length = 0; else if (0 === this.x) this._length = b, this.y = b * a(this.y); else if (0 === this.y) this._length = b, this.x = b * a(this.x); else {
                var c = Math.abs(this.y /
                    this.x), e = Math.sqrt(Math.pow(b, 2) / (1 + Math.pow(c, 2))); c *= e; this._length = b; this.x = e * a(this.x); this.y = c * a(this.y)
            } return this
        }; this.angleTo = function (a) { var b = this.getLength() * a.getLength(); return 0 === b ? 0 : Math.acos(Math.min(Math.max((this.x * a.x + this.y * a.y) / b, -1), 1)) / Math.PI }
    } function k(f, e) {
        this.x = f; this.y = e; this.getVectorToCoordinates = function (a, b) { return new q(a - this.x, b - this.y) }; this.getVectorFromCoordinates = function (a, b) { return this.getVectorToCoordinates(a, b).reverse() }; this.getVectorToPoint = function (a) {
            return new q(a.x -
                this.x, a.y - this.y)
        }; this.getVectorFromPoint = function (a) { return this.getVectorToPoint(a).reverse() }
    } function h(f, e) { var a = Math.pow(10, e); return Math.round(f * a) / a } function p(f, e, a) {
        e += 1; var b = new k(f.x[e - 1], f.y[e - 1]), c = new k(f.x[e], f.y[e]); c = b.getVectorToPoint(c); var g = new k(f.x[e - 2], f.y[e - 2]); b = g.getVectorToPoint(b); return b.getLength() > a ? (a = 2 < e ? (new k(f.x[e - 3], f.y[e - 3])).getVectorToPoint(g) : new q(0, 0), f = .35 * b.getLength(), g = b.angleTo(a.reverse()), e = c.angleTo(b.reverse()), a = (new q(a.x + b.x, a.y + b.y)).resizeTo(Math.max(.05,
            g) * f), c = (new q(b.x + c.x, b.y + c.y)).reverse().resizeTo(Math.max(.05, e) * f), c = new q(b.x + c.x, b.y + c.y), ["c", h(a.x, 2), h(a.y, 2), h(c.x, 2), h(c.y, 2), h(b.x, 2), h(b.y, 2)]) : ["l", h(b.x, 2), h(b.y, 2)]
    } function n(f, e) {
        var a = f.x.length - 1, b = new k(f.x[a], f.y[a]), c = new k(f.x[a - 1], f.y[a - 1]); b = c.getVectorToPoint(b); if (1 < a && b.getLength() > e) {
            a = (new k(f.x[a - 2], f.y[a - 2])).getVectorToPoint(c); c = b.angleTo(a.reverse()); var g = .35 * b.getLength(); a = (new q(a.x + b.x, a.y + b.y)).resizeTo(Math.max(.05, c) * g); return ["c", h(a.x, 2), h(a.y, 2), h(b.x,
                2), h(b.y, 2), h(b.x, 2), h(b.y, 2)]
        } return ["l", h(b.x, 2), h(b.y, 2)]
    } function w(f, e, a) { e = ["M", h(f.x[0] - e, 2), h(f.y[0] - a, 2)]; a = 1; for (var b = f.x.length - 1; a < b; a++)e.push.apply(e, p(f, a, 1)); 0 < b ? e.push.apply(e, n(f, a, 1)) : 0 === b && e.push.apply(e, ["l", 1, 1]); return e.join(" ") } function x(f) {
        for (var e = [], a = [["fill", void 0, "none"], ["stroke", "color", "#000000"], ["stroke-width", "lineWidth", 2], ["stroke-linecap", void 0, "round"], ["stroke-linejoin", void 0, "round"]], b = a.length - 1; 0 <= b; b--) {
            var c = a[b][1], g = a[b][2]; e.push(a[b][0] +
                '="' + (c in f && f[c] ? f[c] : g) + '"')
        } return e.join(" ")
    } function v(f, e) {
        var a = ['<?xml version="1.0" encoding="UTF-8" standalone="no"?>', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'], b, c = f.length, g, d = [], h = [], k = g = b = 0, l = 0, p = []; if (0 !== c) {
            for (b = 0; b < c; b++) {
                g = f[b]; var n = [], q = { x: [], y: [] }; l = 0; for (k = g.x.length; l < k; l++)n.push({ x: g.x[l], y: g.y[l] }); n = simplify(n, .7, !0); l = 0; for (k = n.length; l < k; l++)q.x.push(n[l].x), q.y.push(n[l].y); g = q; p.push(g); d = d.concat(g.x); h =
                    h.concat(g.y)
            } c = Math.min.apply(null, d) - 1; b = Math.max.apply(null, d) + 1; d = Math.min.apply(null, h) - 1; h = Math.max.apply(null, h) + 1; k = 0 > c ? 0 : c; l = 0 > d ? 0 : d; b -= c; g = h - d
        } a.push('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + b.toString() + '" height="' + g.toString() + '">'); b = 0; for (c = p.length; b < c; b++)g = p[b], a.push("<path " + x(e) + ' d="' + w(g, k, l) + '"/>'); a.push("</svg>"); return a.join("")
    } function u(f, e) { return ["image/svg+xml", v(f, e)] } function y(f, e) { return ["image/svg+xml;base64", C(v(f, e))] } (function (f, e) {
        "use strict";
        f.simplify = function (a, b, c) {
            b = b !== e ? b * b : 1; if (!c) { var g = a.length, d = a[0], f = [d]; for (c = 1; c < g; c++) { var h = a[c]; var k = h.x - d.x, n = h.y - d.y; k * k + n * n > b && (f.push(h), d = h) } a = (d !== h && f.push(h), f) } h = a; c = h.length; g = new (typeof Uint8Array != e + "" ? Uint8Array : Array)(c); d = 0; f = c - 1; var p, q = [], r = [], y = []; for (g[d] = g[f] = 1; f;) {
                n = 0; for (k = d + 1; k < f; k++) {
                    var A = h[k]; var z = h[d], w = h[f], u = z.x, v = z.y; z = w.x - u; var B = w.y - v; if (0 !== z || 0 !== B) { var x = ((A.x - u) * z + (A.y - v) * B) / (z * z + B * B); 1 < x ? (u = w.x, v = w.y) : 0 < x && (u += z * x, v += B * x) } A = (z = A.x - u, B = A.y - v, z * z + B * B);
                    A > n && (p = k, n = A)
                } n > b && (g[p] = 1, q.push(d), r.push(p), q.push(p), r.push(f)); d = q.pop(); f = r.pop()
            } for (k = 0; k < c; k++)g[k] && y.push(h[k]); return a = y, a
        }
    })(window); if ("function" !== typeof C) var C = function (f) {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""), a = 0, b = 0, c = []; do { var g = f.charCodeAt(a++); var d = f.charCodeAt(a++); var h = f.charCodeAt(a++); var k = g << 16 | d << 8 | h; g = k >> 18 & 63; d = k >> 12 & 63; h = k >> 6 & 63; k &= 63; c[b++] = e[g] + e[d] + e[h] + e[k] } while (a < f.length); e = c.join(""); f = f.length % 3; return (f ? e.slice(0,
            f - 3) : e) + "===".slice(f || 3)
    }; if ("undefined" === typeof $) throw Error("We need jQuery for some of the functionality. jQuery is not detected. Failing to initialize..."); (function (f) { f = f.fn.jSignature; f("addPlugin", "export", "svg", u); f("addPlugin", "export", "image/svg+xml", u); f("addPlugin", "export", "svgbase64", y); f("addPlugin", "export", "image/svg+xml;base64", y) })($)
})();