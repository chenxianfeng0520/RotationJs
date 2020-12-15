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
            r.css({ width: w ? (w + "px") : "100%", height: h ?? 200 + "px" });
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
            if (b) {
                var thar = this;
                setInterval(function () {
                    thar.printLog(s);
                    g();
                    s++;
                    s == l && (s = 0);
                }, c ?? 2000);
            }
            r.append("<div class='Rotation-left'></div>");
            r.append("<div class='Rotation-right'></div>");
            var left = r.children(".Rotation-left");
            var right = r.children(".Rotation-right");
            left.on("click",function(){
                g();
                s--;
                s == -1 && (s = (l-1));
            });
            right.on("click",function(){
                g();
                s++;
                s == l && (s = 0);
            });
            var g = function (){
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
$(function () {
    Rotation("#Rotation1");
})




