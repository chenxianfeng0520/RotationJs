(function (window, index) {
    var A = function (a, b, c, w, h) {
        return new A.fn.init(...arguments);
    }
    var s = 0, p = true;
    A.fn = A.prototype = {
        init: function (a, b, c, w, h) {
            if (!document.body) {
                console.error('请在DOM加载完成后调用Rotation()');
                return this;
            }
            if (!window.$) {
                console.error('缺少Jquery.js文件支持');
                return this;
            }
            if (typeof a !== "string") {
                console.error('Rotation()参数类型是否是string');
                return this;
            }
            var r = $(a), m = $(a + " ul"), e = $(a + " ul li"), l = e.length;
            r.css({ width: w ? (w + "px") : "100%", height: h ?? 300 + "px" });
            m.css({ width: l * 100 + "%" });
            e.css({ width: 100 / l + "%" });
            if (l == 1) {
                return this;
            }
            r.append("<div class='Rotation-page'></div>");
            var u = r.children(".Rotation-page");
            for (let index = 0; index < l; index++) {
                u.append("<div></div>");
            }
            var i = true;
            if (!b) {
                setInterval(function () {
                    console.log('i:', i);
                    if (i) {
                        g();
                        s++;
                        s == l && (s = 0);
                    }
                }, c ?? 2000);
            }
            r.append("<div class='Rotation-left'></div>");
            r.append("<div class='Rotation-right'></div>");
            var left = r.children(".Rotation-left");
            var right = r.children(".Rotation-right");
            var t;
            left.on("click", function () {
                clearTimeout(t);
                i = false;
                g();
                s--;
                s == -1 && (s = (l - 1));
                t = setTimeout(function () {
                    i = true;
                }, 8000);
            });
            right.on("click", function () {
                clearTimeout(t);
                i = false;
                g();
                s++;
                s == l && (s = 0);
                t = setTimeout(function () {
                    i = true;
                }, 8000);
            });
            var g = function () {
                e.eq(s).addClass("active").siblings().removeClass("active");
                u.children("div").eq(s).addClass("active").siblings().removeClass("active");
                m.css("left", w ? (-s * w + "px") : (-s * 100 + "%"));
            }
            return this;
        },
        printLog: function () {
            p && console.log(...arguments);
        }
    }
    A.fn.init.prototype = A.fn
    window.Rotation = A
})(window);



