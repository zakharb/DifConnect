function ownKeys(e, t) {
    var o = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
        var a = Object.getOwnPropertySymbols(e);
        t &&
            (a = a.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            o.push.apply(o, a);
    }
    return o;
}
function _objectSpread(e) {
    for (var t = 1; t < arguments.length; t++) {
        var o = null != arguments[t] ? arguments[t] : {};
        t % 2
            ? ownKeys(Object(o), !0).forEach(function (t) {
                  _defineProperty(e, t, o[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o))
            : ownKeys(Object(o)).forEach(function (t) {
                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
              });
    }
    return e;
}
function _defineProperty(e, t, o) {
    return t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = o), e;
}
function generateUUID() {
    var e = new Date().getTime();
    window.performance && "function" == typeof window.performance.now && (e += performance.now());
    var t = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
        var o = (e + 16 * Math.random()) % 16 | 0;
        return (e = Math.floor(e / 16)), ("x" == t ? o : (3 & o) | 8).toString(16);
    });
    return t;
}
function getUUID() {
    if (localStorage.getItem("uuid")) return localStorage.getItem("uuid");
    var e = generateUUID();
    return localStorage.setItem("uuid", e), e;
}
function formatText(e) {
    return (e = e.toLowerCase()), (e = e.replace(/ /g, "-"));
}
function sortList(e, t, o) {
    var a, n, i, r;
    for (n = !0; n; ) {
        for (n = !1, i = $(e), a = 0; a < i.length - 1; a++)
            if (((r = !1), "asc" === o)) {
                if (parseInt(i[a].getAttribute(t)) > parseInt(i[a + 1].getAttribute(t))) {
                    r = !0;
                    break;
                }
            } else if ("desc" === o && i[a].getAttribute(t) < i[a + 1].getAttribute(t)) {
                r = !0;
                break;
            }
        r && (i[a].parentNode.insertBefore(i[a + 1], i[a]), (n = !0));
    }
}
window.console || (console = { log: function () {} }),
    (function (e) {
        e.extend(e.ui.tabs.prototype, {
            rotation: null,
            rotationDelay: null,
            continuing: null,
            rotate: function (e, o) {
                var a = this,
                    n = this.options;
                (e > 1 || null === a.rotationDelay) && void 0 !== e && (a.rotationDelay = e), void 0 !== o && (a.continuing = o);
                var i =
                        a._rotate ||
                        (a._rotate = function (t) {
                            clearTimeout(a.rotation),
                                (a.rotation = setTimeout(function () {
                                    var e = n.selected;
                                    a.select(++e < a.anchors.length ? e : 0);
                                }, e)),
                                t && t.stopPropagation();
                        }),
                    r =
                        a._unrotate ||
                        (a._unrotate = o
                            ? function (e) {
                                  (t = n.selected), i();
                              }
                            : function (e) {
                                  e.clientX && a.rotate(null);
                              });
                return (
                    e
                        ? (this.element.bind("tabsshow", i), this.anchors.bind(n.event + ".tabs", r), i())
                        : (clearTimeout(a.rotation), this.element.unbind("tabsshow", i), this.anchors.unbind(n.event + ".tabs", r), delete this._rotate, delete this._unrotate),
                    1 === e && (e = a.rotationDelay),
                    this
                );
            },
            pause: function () {
                var e = this;
                this.options;
                e.rotate(0);
            },
            unpause: function () {
                var e = this;
                this.options;
                e.rotate(1, e.continuing);
            },
        });
    })(jQuery),
    ($.urlParam = function (e) {
        var t = new RegExp("[?&]" + e + "=([^&#]*)").exec(window.location.href);
        return null === t ? null : t[1] || 0;
    });
var lazyLoadScripts = (function () {
        var e = function () {
                window.ocBetslip || ($L = $L.script(oc.widgetBetslipJS));
            },
            t = function () {
                var e = window.ocRenderers || {};
                if ("undefined" == typeof e["myoc-login"]) return window.widgetGDPRJS ? void ($L = $L.script(window.widgetGDPRJS)) : void console.error("myon-login src not in window");
            };
        return { loadBetslip: e, loadMyocLogin: t };
    })(),
    EventEmitter = function () {
        this.events = {};
    };
(EventEmitter.prototype.on = function (e, t) {
    this.events[e] = [t].concat(this.events[e] || []);
}),
    (EventEmitter.prototype.emit = function (e, t) {
        for (var o = this.events[e].length - 1; o >= 0; --o) this.events[e][o](t);
    }),
    (EventEmitter.prototype.once = function (e, t) {
        this.on(e, function o() {
            this.removeListener(e, o), t.apply(this, arguments);
        });
    }),
    (EventEmitter.prototype.removeListener = function (e, t) {
        var o;
        "object" == typeof this.events[e] && ((o = indexOf(this.events[e], t)), o > -1 && this.events[e].splice(o, 1));
    }),
    (EventEmitter.prototype.removeAllListeners = function (e) {
        e ? delete this.events[e] : (this.events = {});
    });
var HTTP = (function () {
        function e(e) {
            return !!~(e.headers.get("content-type") || "").indexOf("application/json");
        }
        var t = function (t, o) {
                var a = _objectSpread(_objectSpread({}, o.headers), {}, { "API-KEY": window.oc.apiKey, "Content-Type": "application/json" }),
                    n = _objectSpread(_objectSpread({}, o), {}, { headers: a, method: o.method, mode: "cors" });
                return (
                    n.body && (n.body = JSON.stringify(n.body)),
                    fetch(t, n)
                        .then(function (t) {
                            return e(t) ? t.json() : Promise.resolve(t);
                        })
                        .then(function (e) {
                            return Promise.resolve(e);
                        })
                        ["catch"](function (e) {
                            return Promise.reject({ errorMessage: "An error occurred. Please try again." });
                        })
                );
            },
            o = function (e, o) {
                return t(e, _objectSpread(o, { method: "GET" }));
            },
            a = function (e, o) {
                return t(e, _objectSpread(o, { method: "POST" }));
            };
        return { get: o, isJson: e, post: a };
    })(),
    ocUser = (function () {
        function e(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
                a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            if (t) {
                var n = 31536e3,
                    i = ""
                        .concat(e, "=")
                        .concat("string" != typeof t ? JSON.stringify(t) : t, "; Path=/; Max-Age=")
                        .concat(n);
                o && (i = i.concat("; domain=".concat(o))), a && (i = i.concat("; secure")), (document.cookie = i);
            } else document.cookie = "".concat(e, "=; Max-Age=0");
        }
        var t,
            o = {},
            a = new EventEmitter(),
            n = "touch_",
            i = ("LIVE" !== oc.server ? oc.server + "_" : "") + "myoc",
            r = function () {
                (t = (window.oc.mainUrl || "").replace("www", "api").replace("localhost", "stg")),
                    (o.deviceId = getUUID()),
                    (o.isLoggedIn = window.oc.isLoggedIn),
                    (o.email = window.oc.myOcUserEmail),
                    (o.id = isNaN(window.oc.myOcUserId) ? void 0 : window.oc.myOcUserId),
                    (o.userIdentifier = window.oc.userIdentifier);
                var e = function (e) {
                    (o.deviceId = e["device-id"]), (o.email = e.email), (o.id = e["user-id"]), e.isLoggedIn && (o.isLoggedIn = e.isLoggedIn);
                };
                a.on("onLoginSuccess", e), a.on("onSignupSuccess", e);
            },
            s = function () {
                return o.email;
            },
            c = function () {
                return isNaN(o.id) ? void 0 : o.id;
            },
            l = function () {
                return o;
            },
            d = function () {
                return o.isLoggedIn;
            },
            u = function (e) {
                window.dataLayer && window.dataLayer.push({ hitType: "event", eventCategory: "Oddschecker Account", event: e, eventLabel: "oddschecker" });
            },
            h = { OC_LOG_IN: "oc_log_in", OC_LOG_IN_ATTEMPT: "oc_log_in_attempt", OC_ACCOUNT_CREATED: "oc_account_created", OC_ACCOUNT_CREATED_ATTEMPT: "oc_account_created_attempt" },
            f = function (o, r, s) {
                var c = arguments.length > 3 ? arguments[3] : n;
                return (
                    u(c + h.OC_LOG_IN_ATTEMPT),
                    HTTP.post(t + "api/v1/myoddschecker/login", { body: { email: o, password: r, "remember-me": s }, headers: { "Device-ID": getUUID() } })
                        .then(function (t) {
                            return t.success && (u(c + h.OC_LOG_IN), a.emit("onLoginSuccess", _objectSpread(t, { email: o, isLoggedIn: !0 })), e(i, t.token, oc.cookieDomain, !0)), Promise.resolve(t);
                        })
                        ["catch"](function (e) {
                            return Promise.reject(e);
                        })
                );
            },
            p = function (e, o) {
                var i = arguments.length > 2 ? arguments[2] : n,
                    r = { communications: !0, email: e, password: o };
                return (
                    u(i + h.OC_ACCOUNT_CREATED_ATTEMPT),
                    HTTP.post(t + "api/v1/myoddschecker/register", { body: r, headers: { "Device-ID": getUUID() } }).then(function (t) {
                        return t.success && (u(i + h.OC_ACCOUNT_CREATED), a.emit("onSignupSuccess", _objectSpread(t, { email: e }))), t;
                    })
                );
            },
            g = function (e) {
                var t = document.querySelector("body"),
                    o = angular.element(t).scope();
                o.MainController.loginSignup(null, "SIGN_UP", e);
            };
        return $(document).ready(r), { getCurrentUserEmail: s, getCurrentUserID: c, getUserProfile: l, isLoggedIn: d, login: f, signup: p, viewLoginSignup: g };
    })(),
    hotjar = (function () {
        var e = function () {
                if (null !== $.cookie("session_number_access")) {
                    var e = $.cookie("session_number_access");
                    e.match(/~1$/)
                        ? ((window.hj =
                              window.hj ||
                              function () {
                                  (hj.q = hj.q || []).push(arguments);
                              }),
                          hj("trigger", "first-page-view-in-session"))
                        : e.match(/~4$/) &&
                          ((window.hj =
                              window.hj ||
                              function () {
                                  (hj.q = hj.q || []).push(arguments);
                              }),
                          hj("trigger", "fourth-page-view-in-session")),
                        t();
                }
            },
            t = function () {
                if ("undefined" != typeof uv) {
                    var e = 163794,
                        t = 163797,
                        o = uv.events.find(function (o) {
                            return o.experienceId == t || o.experienceId == e;
                        });
                    "undefined" != typeof o && (1 == o.isControl ? hj("trigger", "offer-popup-shown") : hj("trigger", "offer-popup-hidden"));
                }
            };
        return { init: e };
    })(),
    redeye = (function () {
        var e = function (e, o, a) {
                t(o, a), window.dataLayer.push({ event: e });
            },
            t = function (e, t) {
                var a,
                    n,
                    i = {};
                t = t || $activePanel(".redeye-data");
                for (var r = 0, s = e.length; r < s; r++) (a = e[r]), (n = t.attr("data-" + a)), (i[a] = n);
                o(i);
            },
            o = function (e) {
                (window.dataLayer = window.dataLayer || []), window.dataLayer.push(e);
            },
            a = function () {
                null !== $.cookie("redeyeEvent") && oc.isLoggedIn && e($.cookie("redeyeEvent"), []), $.cookie("redeyeEvent", null, { path: "/", domain: oc.cookieDomain });
            };
        return { triggerEvent: e, addToDataLayer: t, addObjectToDataLayer: o, checkRedeyeEventCookie: a };
    })(),
    takeover = (function () {
        var e = function () {
                var e = $("#beta-ad-container-takeover-left").height() - 80;
                $("#container").height() < e ? $("#container").height(e) : $("#container").height("auto");
                var t = 19,
                    o = oc.adTTHOn || 0 !== oc.takeover.width ? 20 : 10,
                    a = $("#container"),
                    n = a.position().left,
                    i = Math.round(n + a.width() + o),
                    r = window.innerWidth - i - t;
                $("#beta-ad-container-takeover-left").css("right", i + "px"),
                    $("#beta-ad-container-takeover-left").css("max-width", r + "px"),
                    $("#beta-ad-container-takeover-right").css("left", i + "px"),
                    $("#beta-ad-container-takeover-right").css("max-width", r + "px");
                var s = stickyHeader.getHeaderHeight();
                $("#beta-ad-container-takeover-left, #beta-ad-container-takeover-right").css("top", Math.round(s) + "px"), $(".ad-container-wrap").removeClass("hide");
            },
            t = function () {
                for (var e = [], t = new Date().toISOString().replace(/-/g, "").replace("T", "").replace(/:/g, "").substring(0, 14), o = 0; o < localStorage.length; o++)
                    if ("OC_POPUP_" == localStorage.key(o).substring(0, 9)) {
                        var a = 7e6;
                        Number(localStorage.getItem(localStorage.key(o))) < Number(t) - a && e.push(localStorage.key(o));
                    }
                for (var o = 0; o < e.length; o++) localStorage.removeItem(e[o]);
                var n = $("#promo-modal");
                n.removeClass("active"),
                    setTimeout(function () {
                        n.removeClass("display-block");
                    }, 150);
                var i = n.data("takeover-id"),
                    r = n.data("takeover-last-updated");
                localStorage.setItem("OC_POPUP_" + i, r), $.cookie("popup_offer", null, { path: "/" }), $.cookie("takeover_offer", null, { path: "/" });
            },
            o = function () {
                var o = $("#promo-modal");
                o
                    .find(".modal-dialog-overlay, .inside-close-button, .js-close-class")
                    .unbind("click")
                    .click(function (e) {
                        e.preventDefault(), t();
                    }),
                    o
                        .find(".js-close-and-follow-link")
                        .unbind("click")
                        .click(function (e) {
                            t();
                        });
                var a = o.data("takeover-id"),
                    n = o.data("takeover-last-updated");
                return (
                    localStorage.getItem("OC_POPUP_" + a) !== "" + n &&
                        (o.addClass("display-block"),
                        setTimeout(function () {
                            o.addClass("active");
                        }, 150)),
                    oc.isTouchable === !0
                        ? ($("body").removeClass("takeover"), void $("#beta-ad-container-takeover-left, #beta-ad-container-takeover-right").remove())
                        : (e(),
                          void $(window).resize(function () {
                              takeover.positionBackgroundImages();
                          }))
                );
            };
        return { init: o, closePromoModal: t, positionBackgroundImages: e };
    })(),
    stickyHeader = (function () {
        function e() {
            var e = $(window).scrollTop(),
                i = "sticky",
                r = $("#header-top-nav"),
                s = $("#header-sports-nav"),
                c = $("#sub-header"),
                l = $(".floating-betslip-wrapper").offset() ? $(".floating-betslip-wrapper").offset().top : 0;
            "undefined" == typeof t && (c.addClass("loaded"), (t = l + (o ? a : 0)), $("#header-placeholder").css("height", c.height())),
                e >= t ? ($("#header-placeholder").removeClass("hide"), c.addClass(i)) : ($("#header-placeholder").addClass("hide"), c.removeClass(i), c.css("top", "0"));
            var d = $("#beta-ad-container-takeover-right, #beta-ad-container-takeover-left").not(".hide");
            if (d.length > 0) {
                var u = n(),
                    h = $("footer")[0].getBoundingClientRect().top,
                    f = $("#beta-ad-container-takeover-left")[0].getBoundingClientRect().height,
                    p = r.height() + s.height() + c.height();
                1 === $("#beta-ad-container-leaderboard2").length && (bottomAdheight = $("#beta-ad-container-leaderboard2")[0].getBoundingClientRect().height),
                    h - 20 < f + 20 + p ? (d.addClass(i), d.css({ top: h - f - 20 + "px" })) : e > u - p - 20 ? (d.addClass(i), d.css({ top: p + 20 + 3 + "px" })) : (d.removeClass(i), d.css({ top: u + 3 + "px" }));
            }
        }
        var t,
            o = $(".hide-floating-top-nav").length > 0,
            a = $("#top-nav").height(),
            n = function () {
                var e, t, o, a, n, i;
                (e = $(".beta-sub-horizontal-menu").length > 0 ? 46 * $(".beta-sub-horizontal-menu").length : 0),
                    (t = $(".beta-secondary-sub-horizontal-menu").length > 0 ? 46 * $(".beta-secondary-sub-horizontal-menu").length : 0),
                    (a = $("#leaderboard-centre").length > 0 ? 105 : 0),
                    (n = $("#banner-wrapper").length ? $("#banner-wrapper").height() : 0),
                    (o = $("body").hasClass("racing-grid-simplified-hook") && $("#quick-switch").length ? 70 : 0),
                    (i = $("#odds-grid-header-image").length ? $("#odds-grid-header-image").height() : 0);
                var r = 135 + e + t + a + n + o + i;
                return r;
            },
            i = function () {
                e(),
                    $(window).scroll(function () {
                        e();
                    }),
                    $(window).resize(function () {
                        $("#fixed-bs-button").removeClass("loaded"), e();
                    });
            };
        return { init: i, getHeaderHeight: n, placeHeaderNewBeta: e };
    })(),
    navigation = (function () {
        var e = function () {
            var e = $(".bk3-hover");
            oc.isTouchable
                ? (e.on("click", function (e) {
                      e.preventDefault();
                  }),
                  touchableEvents.bindEvents("click", e, function (e) {
                      oddsTable.showOffersThenClickOut(e);
                  }))
                : e.hoverIntent(
                      function () {
                          $(this).addClass("hover");
                      },
                      function () {
                          $(this).removeClass("hover");
                      }
                  ),
                $(".select-wrap").hoverIntent(
                    function () {},
                    function () {
                        var e = angular.element(this).scope(),
                            t = e.MainController.mainNav,
                            o = $(this).attr("data-ng-init");
                        "undefined" != typeof o &&
                            (o.indexOf("showSelectMarketsDropDown") !== -1
                                ? (t.showSelectMarketsDropDown = !1)
                                : o.indexOf("showSelectMatchDropDown") !== -1
                                ? (t.showSelectMatchDropDown = !1)
                                : o.indexOf("showSortByDropDown") !== -1 && (t.showSortByDropDown = !1)),
                            e.MainController.$scope.$apply();
                    }
                ),
                oc.isTouchable &&
                    ((document.onclick = function (e) {}),
                    touchableEvents.bindEvents("click", $(document), function (e) {
                        touchableEvents.hideHoverElementsWhenTouchAway(e);
                    })),
                $("#logout-btn").click(function (e) {
                    e.preventDefault();
                    var t = angular.element(e.target).scope();
                    t.MainController.oddscheckerLogOutRoutine();
                });
            var t = function (e, t) {
                $(".header-panel").removeClass("open-panel"), $(".header-panel").addClass("hide"), $(".header-button").removeClass("panel-open");
                var o = e ? $(".more-items-link").not(e) : $(".more-items-link");
                o.removeClass("panel-open"),
                    e ? $('.more-items-panel[data-more-id!="' + e.getAttribute("data-more-id") + '"]').addClass("hide") : $(".more-items-panel").addClass("hide"),
                    (scope = angular.element($(".icon-item.search")[0]).controller()),
                    scope && scope.showSearchPanel && "#*search" !== t && (scope.toggleSearchPanel(), scope.$scope.$apply());
            };
            $(".header-button").click(function (e) {
                e.stopPropagation(), e.preventDefault();
                var o = "#" + $(this).attr("data-open-panel"),
                    a = $(this).hasClass("panel-open") || "#*" === o.substr(0, 2);
                t(!1, o),
                    a ||
                        ($(o).toggleClass("hide"),
                        $(this).toggleClass("panel-open"),
                        setTimeout(function () {
                            $(o).toggleClass("open-panel");
                        }));
            }),
                $(".more-items-link").click(function (e) {
                    e.preventDefault(), t(this), $(this).toggleClass("panel-open"), $('.more-items-panel[data-more-id="' + $(this).attr("data-more-id") + '"]').toggleClass("hide");
                    var o = $(this).parent().parent();
                    $(this).hasClass("panel-open")
                        ? (o.find(".active").removeClass("active").addClass("non-active"), o.find(".under-slider").addClass("hide"))
                        : (o.find(".under-slider").removeClass("hide"), o.find(".non-active").removeClass("non-active").addClass("active"));
                });
        };
        return { init: e };
    })(),
    touchableEvents = (function () {
        var e = function (e, t, o) {
                t.on(e, function (e) {
                    o(e);
                });
            },
            t = function (e) {
                var t = $(e.target).parents(".touch-nav-hover").length > 0 || e.target.className.indexOf("touch-nav-hover") > -1 || e.target.className.indexOf("popular-sports-a-z") > -1,
                    o = $(e.target).parents(".touch-hover").length > 0 || e.target.className.indexOf("touch-hover") > -1;
                t ? $(".touch-hover").removeClass("touch-show") : o ? $(".touch-nav-hover").removeClass("sfhover") : ($(".touch-nav-hover").removeClass("sfhover"), $(".touch-hover").removeClass("touch-show"));
            };
        return { bindEvents: e, hideHoverElementsWhenTouchAway: t };
    })(),
    gridInfoBanner = (function () {
        var e = function () {
                if (!$.cookie("sky_five_closed")) {
                    var e = $("#grid_info_banner"),
                        o = e.next();
                    $("#close_grid_info_banner").on("click", function () {
                        $.cookie("sky_five_closed", "true", { path: "/", domain: oc.cookieDomain }),
                            (document.cookie = "oc_gib_closed=; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT; domain=" + oc.cookieDomain),
                            t(),
                            e.fadeOut(),
                            o.fadeOut();
                    });
                }
            },
            t = function () {
                "dataLayer" in window && window.dataLayer.push({ event: "GRID_BANNER_CLOSE" });
            };
        return { init: e };
    })(),
    charityPartnerBanner = (function () {
        var e = function () {
                "true" !== oc.charityPartnerAdvertActive ||
                    $.cookie("oc_cpb_closed") ||
                    ($("#charity_partner_close").on("click", function () {
                        $.cookie("oc_cpb_closed", "true", { path: "/", domain: oc.cookieDomain }), t(), $("#charity_partner_banner").fadeOut();
                    }),
                    $(".grid-offers #charity_partner_banner").hoverIntent(
                        function () {
                            $(this).addClass("hover");
                        },
                        function () {
                            $(this).removeClass("hover");
                        }
                    ));
            },
            t = function () {
                "dataLayer" in window && window.dataLayer.push({ event: "CHARITY_PARTNER_BANNER_CLOSE" });
            };
        return { init: e };
    })(),
    quickBetBar = (function () {
        var e = function () {
                var e = $(".quick-bet__row");
                e.children().each(t);
            },
            t = function () {
                var e = $(this),
                    t = $(e.find("div"));
                this.id &&
                    new Tooltip(t, {
                        title: e.data("quick-bet") ? "QuickBet allows customers to place bets with certain bookmakers without leaving the Oddschecker website." : "QuickBet is not currently available with this bookmaker",
                        placement: "bottom",
                    });
            };
        return { init: e };
    })(),
    impressionTracking = (function () {
        var e = function (e) {
                return null === e.offsetParent;
            },
            t = function () {
                if ("LOCALHOST" !== window.oc.server && "IntersectionObserver" in window) {
                    var t = document.querySelectorAll("[data-track-impression]");
                    t.forEach(function (t) {
                        var o = t.dataset.trackImpression.split("::"),
                            a = o[0],
                            n = o[1],
                            i = o[2],
                            r = o[3],
                            s = function (t, o) {
                                var s = t[0];
                                if (s && o && s.intersectionRatio >= 0) {
                                    var c = o.thresholds.some(function (e) {
                                            return s.intersectionRatio >= e;
                                        }),
                                        l = c && s.isIntersecting;
                                    l &&
                                        !e(s.target) &&
                                        fetch(
                                            "https://tracking." +
                                                oc.cookieDomain +
                                                "/uk-offer-impressions-pixel.png?bookmaker=" +
                                                a +
                                                "&offer_location=" +
                                                i +
                                                "&offer_position=" +
                                                n +
                                                "&offer_title=" +
                                                r +
                                                "&referrer=" +
                                                encodeURIComponent(window.location.pathname)
                                        );
                                }
                            },
                            c = new IntersectionObserver(s);
                        c.observe(t);
                    });
                }
            };
        return { init: t };
    })(),
    earlyAccessTracking = (function () {
        function e(e) {
            window.dataLayer && window.dataLayer.push(e);
        }
        function t(e) {
            return null === e.offsetParent;
        }
        function o() {
            if ("LOCALHOST" !== window.oc.server && "IntersectionObserver" in window) {
                var e = document.querySelector(".paywall-banner"),
                    o = document.querySelector(".early-access-cta");
                if (!e && !o) return;
                var a = function (e, o) {
                        var a = e[0];
                        if (a && o && a.intersectionRatio >= 0) {
                            var i = o.thresholds.some(function (e) {
                                    return a.intersectionRatio >= e;
                                }),
                                r = i && a.isIntersecting;
                            if (r && !t(a.target)) {
                                var s = $.cookie("_ga") || "",
                                    c = s.split(".").slice(2).join(".");
                                fetch("https://tracking." + oc.cookieDomain + "/uk-cta-impressions-pixel.png?title=" + encodeURIComponent(n) + "&ga_id=" + encodeURIComponent(c) + "&referrer=" + encodeURIComponent(window.location.pathname));
                            }
                        }
                    },
                    i = new IntersectionObserver(a);
                e && i.observe(e), o && i.observe(o);
            }
        }
        function a() {
            o();
            var t = document.querySelector(".paywall-link");
            t &&
                t.addEventListener("click", function () {
                    e(i.GET_ACCESS_CTA);
                });
            var a = document.querySelector(".early-access-login");
            a &&
                a.addEventListener("click", function () {
                    e(i.EARLYACCESS_LOGIN);
                });
        }
        var n = "get_access_impressions",
            i = { EARLYACCESS_LOGIN: { event: "earlyaccess_login" }, GET_ACCESS_CTA: { event: "get_access_cta" } };
        return { init: a };
    })(),
    timeSeriesChart = (function () {
        var e = function () {
            var e = document.getElementsByClassName("react-time-series-chart");
            e.length > 0 &&
                Array.from(e).forEach(function (e) {
                    e.style.maxHeight = "400px";
                });
        };
        return { init: e };
    })(),
    gridCollapse = (function () {
        var e,
            t = !0,
            o = function () {
                var o = document.getElementById("grid_show_more");
                o &&
                    o.addEventListener("click", function () {
                        (e = window.pageYOffset),
                            (o.innerText = t ? "Hide" : "Show more"),
                            document.getElementsByClassName("diff-row").forEach(function (e, o) {
                                o >= 4 && (e.style.display = t ? "table-row" : "none");
                            }),
                            t && window.scrollTo(0, e),
                            (t = !t);
                    });
            };
        return { init: o };
    })(),
    requestABet = (function () {
        var e = "hide-request-bet-tooltip",
            t = $(".request-bet-tooltip-wrapper"),
            o = function () {
                return "true" !== $.cookie(e);
            },
            a = function () {
                var e = o();
                e && t.css("display", "block");
            },
            n = function () {
                $(".request-bet-tooltip-close").on("click", function () {
                    t.css("display", "none"), $.cookie(e, "true");
                });
            },
            i = function () {
                var e = $(".request-a-bet__bookie-filters-item");
                e.on("click", function () {
                    var t = $(this).attr("data-bookie-group"),
                        o = $('.request-a-bet__bookie-group[data-bookie-group="' + t + '"]'),
                        a = $(".request-a-bet__bookie-group");
                    e.removeClass("active"), a.addClass("hide"), $(this).addClass("active"), o.removeClass("hide");
                });
                var t = {};
                $(".request-a-bet__see-more-link button").on("click", function () {
                    var e = $(this).parent().parent().attr("data-bookie-group"),
                        o = $(this).parent().parent().find(".request-a-bet__bet-item");
                    t[e]
                        ? (o.each(function (e) {
                              e >= 3 && $(this).addClass("hide");
                          }),
                          $(this).text("See more bet builders"),
                          (t[e] = !1))
                        : (o.removeClass("hide"), $(this).text("See less bet builders"), (t[e] = !0));
                }),
                    a(),
                    n();
            };
        return { init: i };
    })(),
    tabs = (function () {
        var e = function () {
            var e = ".splash-markets .tabs, .splash .tabs:not(.fake), .hm1 .tabs";
            $(e).tabs({ event: "mouseover" }),
                $(e).tabs("rotate", 4e3),
                $(".tabs:not(.fake, " + e + ")").tabs({ event: "click" }),
                $(e).hover(
                    function () {
                        $(e).stop();
                    },
                    function () {
                        $(e).tabs("rotate", 6e3);
                    }
                ),
                $(e).click(function () {
                    $(e).stop(!0);
                });
            var t = 0;
            $(e).tabs({
                activate: function (e, o) {
                    var a = $(o.newTab).attr("data-bk");
                    t++, "" != a && t <= 4 && redeye.addObjectToDataLayer({ event: "splashRotate", splashRotate: { bookmaker: a } });
                },
            }),
                $(".splash-arrow").click(function () {
                    totalTabs = $(".splash-offers-content, .splash-responsive-acca-coupon-content").length;
                    var t = numOnly($('.splash-offers-content[aria-hidden="false"], .splash-responsive-acca-coupon-content[aria-hidden="false"]').attr("data-tab-index"));
                    return "splash-left" === this.id ? t-- : t++, (t = t === -1 ? totalTabs - 1 : t % totalTabs), $(e).tabs("select", t), !1;
                });
        };
        return { init: e };
    })(),
    imageSwitcher = (function () {
        var e = function () {
            $("#image-switcher-trigger").click(function (e) {
                e.preventDefault();
                var t = oc.imageSwitcher.position,
                    o = oc.imageSwitcher.images.length;
                if (o > 1) {
                    t < o - 1 ? t++ : (t = 0);
                    var a = $("#image-switcher");
                    1 == a.length && (a.attr("src", oc.imageSwitcher.images[t]), (oc.imageSwitcher.position = t));
                }
            });
        };
        return { init: e };
    })(),
    siteSettings = (function () {
        var e = function () {
            $(".exchange-input").click(function () {
                var e = $(this);
                e.attr("data-value") == oc.oddsType
                    ? e.removeClass("selected")
                    : e.attr("data-value") != oc.oddsType && ($.cookie("odds_type", e.attr("data-value"), { path: "/", expires: 365, domain: oc.cookieDomain }), window.location.reload());
            });
        };
        return { init: e };
    })(),
    exchangeSettings = (function () {
        var e = function () {
            $("#apply-exchange-commission").click(function () {
                $(this).is(":checked") ? $('[id^="exchange-commission-"]').removeAttr("disabled") : $('[id^="exchange-commission-"]').attr("disabled", "disabled");
            });
        };
        return { init: e };
    })(),
    popup = (function () {
        var e = function () {
                $(".popup").click(function (e) {
                    e.preventDefault();
                    var t = 500,
                        o = 510;
                    $(this).hasClass("popout_b") ? ((t = 640), (o = 600)) : ($(this).hasClass("selTxt") || $(this).hasClass("graph-icon")) && ((t = 1e3), (o = 700)), popup.show(this.href, this.title, t, o);
                });
            },
            t = function (e, t, o, a, n, i, r) {
                var s = "";
                r || (s += "width=" + o + ",height=" + a),
                    n && i && (s += ",left=" + n + ",top=" + i),
                    (s += r
                        ? ",toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no"
                        : ",toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,copyhistory=no");
                var c = window.open(e, t.replace(/[:.\+\/\?\&\=\#\%\-\s]/g, "_").toLowerCase(), s);
                return !!c && (c.focus(), c);
            };
        return { init: e, show: t };
    })(),
    fixtures = (function () {
        var e = function () {
                $("#sc .sc").click(function (e) {
                    e.preventDefault();
                    var t = $(this).attr("href").split("#")[1];
                    $("html, body").animate({ scrollTop: $("#" + t).offset().top - 50 }, 200);
                }),
                    s(),
                    oddsTable.positionSelectAnotherRace(),
                    $(".fixture .more").click(function () {
                        $(this).parents(".accumulator-coupon").find(".hide").removeClass("hide"), $(this).parents("tr").remove();
                    }),
                    r(),
                    i(),
                    t();
            },
            t = function () {
                1 == $("#tabs-results").length &&
                    ($("#tabs-result-time").click(function () {
                        $(this).addClass("active"),
                            $("#tabs-result-track").removeClass("active"),
                            $("#mc").addClass("sort-by-time"),
                            sortList(".fast-result", "data-time", "desc"),
                            takeover.positionBackgroundImages(),
                            stickyHeader.placeHeaderNewBeta();
                    }),
                    $("#tabs-result-track").click(function () {
                        $("#mc").removeClass("sort-by-time"),
                            $(this).addClass("active"),
                            $("#tabs-result-time").removeClass("active"),
                            $(".fast-result").not(".first").addClass("hide"),
                            $(".fast-result").removeClass("fast-result-open"),
                            $(".fast-result h3, .fast-result .subevent-content-wrapper").addClass("hide"),
                            sortList(".fast-result", "data-pos", "asc"),
                            takeover.positionBackgroundImages(),
                            stickyHeader.placeHeaderNewBeta();
                    }),
                    $("h2 .venue-details").click(function () {
                        var e = $(this).parents(".fast-result"),
                            t = e.attr("data-map"),
                            o = n();
                        if ("by-track" === o) {
                            var a = $('.fast-result[data-map="' + t + '"]');
                            e.hasClass("fast-result-open")
                                ? (a.removeClass("fast-result-open"), a.not(".first").addClass("hide"), a.find("h3, .subevent-content-wrapper").addClass("hide"))
                                : (a.addClass("fast-result-open"), a.removeClass("hide"), a.find("h3, .subevent-content-wrapper").removeClass("hide"));
                        }
                        takeover.positionBackgroundImages(), stickyHeader.placeHeaderNewBeta();
                    }));
            },
            o = function () {
                $(".collapse-chevron-wrapper").click(function () {
                    var e = $(this).closest(".track-wrapper"),
                        t = $(this).closest(".track-header"),
                        o = e.children(".subevents-group").first();
                    t.toggleClass("track-open"), o.toggleClass("hide");
                });
            },
            a = function () {
                var e = function (e) {
                    var t = $(e.target);
                    0 === t.closest(".track-header").length && $(".subevent-panel-wrapper").removeClass("subevent-panel-open");
                };
                $(".track-header").click(function (e) {
                    e.preventDefault();
                    var t = $(".track-header-arrow").first();
                    t.toggleClass("track-header-arrow-up");
                    var o = $(".subevent-panel-wrapper").first();
                    o && o.toggleClass("subevent-panel-open");
                }),
                    $(".subevent-panel-link").click(function (e) {
                        e.stopPropagation();
                    }),
                    document.addEventListener("click", e);
            },
            n = function () {
                return $(".tab-result.active").attr("data-tab");
            },
            i = function () {
                if (1 == $("#ch-countdown").length) {
                    var e = oc.cheltenhamStartDate.split("T")[0] + "T" + oc.cheltenhamStartTime;
                    (e = new Date(e)), $("#ch-countdown").countdown({ until: e });
                }
            },
            r = function () {
                $(".all-odds-click").click(function () {
                    var e = $(this).parents("tr").find("a.whole-row-link").attr("href");
                    window.location = e;
                });
            },
            s = function () {
                $("#scr .rs").click(function (e) {
                    e.preventDefault();
                    var t = $(this).attr("data-tab-day");
                    "all" === t ? $(".show-times").removeClass("hide") : ($(".show-times:not(.featured-racing)").addClass("hide"), $(".show-times[data-day=" + t + "]").removeClass("hide")),
                        $("#scr .rs").removeClass("beta-h3").addClass("beta-callout"),
                        $(this).removeClass("beta-callout").addClass("beta-h3"),
                        gaTracking.trackEvent(gaTracking.EVENTS.DAY_FILTER_HORSE_RACING);
                }),
                    $(".show-times .race-time").click(function () {
                        gaTracking.trackEvent(gaTracking.EVENTS.NEXT_UP_RACING_EVENTS, { eventName: $(this).data("event-name") });
                    }),
                    $(".scr .bh-a").click(function (e) {
                        e.preventDefault();
                        var t = $(this).attr("data-tab-day");
                        "all" === t ? $(".show-times").removeClass("hide") : ($(".show-times:not(.featured-racing)").addClass("hide"), $(".show-times[data-day=" + t + "]").removeClass("hide")),
                            $(".scr .bh-li").removeClass("active"),
                            $(this).parent().addClass("active");
                    });
            },
            c = function () {
                $("#fbsc .fs").click(function (e) {
                    e.preventDefault();
                    var t = $(this).attr("data-tab-day");
                    "all" === t ? $(".fixtures tr").removeClass("hide") : ($(".fixtures tr").addClass("hide"), $(".fixtures tr[data-day=" + t + "]").removeClass("hide")),
                        $("#fbsc .fs").removeClass("beta-h3").addClass("beta-callout"),
                        $(this).removeClass("beta-callout").addClass("beta-h3"),
                        gaTracking.trackEvent(gaTracking.EVENTS.DAY_FILTER_FOOTBALL);
                }),
                    $("#fixtures .link-right a").click(function () {
                        var e = $(this);
                        gaTracking.trackEvent(gaTracking.EVENTS.ALL_ODDS_CLICK, { eventName: e.data("event-name") });
                    });
            },
            l = function () {
                $(".cheltenham-header-filter").on("click", function () {
                    var e = $(this).attr("data-filter-value"),
                        t = $(this).attr("data-filter-string");
                    $(this).hasClass("active") ||
                        ($(".cheltenham-header-filter").removeClass("active"), $(this).addClass("active"), $(".cheltenham-active-date span").text(t), $(".track-wrapper.active").removeClass("active"), $("#" + e).addClass("active"));
                });
                var e = ".cheltenham-year-picker";
                $(e).on("click", function () {
                    $(this).toggleClass("show-panel");
                }),
                    $(document).on("click", function (t) {
                        0 === $(t.target).closest(e).length && $(e).removeClass("show-panel");
                    });
            },
            d = ".featured-cheltenham-tips-articles",
            u = ".andy-holding-tips",
            h = ".latest-tips",
            f = ".tips-races-grid-links",
            p = function () {
                var e = $(".horizontal-filter-outer.active").attr("data-filter-value");
                g(e),
                    $(".horizontal-filter-outer").on("click", function () {
                        var e = $(this).hasClass(".horizontal-filter-outer") ? $(this) : $(this).closest(".horizontal-filter-outer");
                        if (!e.hasClass("active")) {
                            $(".horizontal-filter-outer").removeClass("active"), e.addClass("active");
                            var t = e.attr("data-filter-value");
                            g(t);
                        }
                    });
            },
            g = function (e) {
                m(d, "article", e),
                    m(u, "article", e),
                    m(h, "article", e),
                    m(f, ".tips-date-block", e),
                    $(".top-featured-articles-section")["road" !== e ? "hide" : "show"](),
                    $(".next-tips-off-module")["road" !== e ? "hide" : "show"](),
                    "road" !== e
                        ? ($(u).removeClass("secondary-tips-list").addClass("featured-cheltenham-tips-articles").parent().css("margin-top", "25px"),
                          $(u + " article").addClass("featured-article"),
                          $(u + " .image-container").css("height", "185px"),
                          $(u + " .tip-text-content .summary").show(),
                          $(".tips-offer-wrapper") && $(".tips-offer-wrapper").length > 0 && $($(".tips-section").get(0)).after($(".tips-offer-wrapper")))
                        : ($(u).removeClass("featured-cheltenham-tips-articles").addClass("secondary-tips-list").parent().css("margin-top", ""),
                          $(u + " article").removeClass("featured-article"),
                          $(u + " .image-container").css("height", "123px"),
                          $(u + " .tip-text-content .summary").hide(),
                          $(".tips-offer-wrapper") && $(".tips-offer-wrapper").length > 0 && $($(".next-tips-off-module").get(0)).before($(".tips-offer-wrapper")));
            },
            m = function (e, t, o) {
                var a = function (e) {
                        e.addClass("no-display"),
                            setTimeout(function () {
                                e.addClass("fadeout-cheltenham-tips");
                            }, 200);
                    },
                    n = function (e) {
                        e.removeClass("fadeout-cheltenham-tips"),
                            setTimeout(function () {
                                e.removeClass("no-display");
                            }, 100);
                    };
                $(e).each(function () {
                    var i = $(this);
                    if ("road" === o)
                        i.find(".fadeout-cheltenham-tips, .no-display").each(function () {
                            var o = $(this),
                                r = i.find(t + ":not(.fadeout-cheltenham-tips)").length;
                            (e === d && r < 2) || (e === u && r < 3) || (e === h && r < 6) ? n(o) : e === f && a(o);
                        }),
                            e === f && a(i);
                    else {
                        var r = i.find(t + ':not([data-cheltenham-date="' + o + '"])');
                        r.each(function () {
                            a($(this));
                        }),
                            setTimeout(function () {
                                if (
                                    (i.find('.fadeout-cheltenham-tips[data-cheltenham-date="' + o + '"], .no-display[data-cheltenham-date="' + o + '"]').each(function () {
                                        var o = $(this),
                                            a = i.find(t + ":not(.fadeout-cheltenham-tips)").length;
                                        ((e === d && a < 2) || (e === u && a < 3) || (e === h && a < 6) || e === f) && n(o);
                                    }),
                                    e === f)
                                ) {
                                    var r = i.find('[data-cheltenham-date="' + o + '"]:not(.fadeout-cheltenham-tips)').length;
                                    (r > 0 ? n : a)(i);
                                }
                            }, 200);
                    }
                });
            };
        return {
            init: e,
            initCheltenhamCountdown: i,
            initCheltenhamDateFilter: p,
            racingShortCut: s,
            footballShortCut: c,
            setLinks: r,
            initDayResults: o,
            initSubeventResults: a,
            initCheltenhamFestivalResults: l,
            initCheltenhamDateFilter: p,
        };
    })(),
    betBasket = (function () {
        var e = function () {
                $("#bet-basket-scroll-left").click(function () {
                    $("#bet-basket-table-others").animate({ left: "0" }, 1e3);
                }),
                    $(".bk3-hover").hoverIntent(
                        function () {
                            $(this).addClass("hover");
                        },
                        function () {
                            $(this).removeClass("hover");
                        }
                    ),
                    $("#bet-basket-scroll-right").click(function () {
                        var e = $("#bet-basket-table-others"),
                            t = e.css("left").substr(0, e.css("left").length - 2),
                            o = $("#bet-basket-table-slider").outerWidth(),
                            a = $("#t2 tr td.odds-total"),
                            n = a.outerWidth(),
                            i = a.outerWidth();
                        a.each(function () {
                            if (n < o) {
                                var e = $(this).outerWidth();
                                (n += e), n + e < o && (i += e);
                            }
                        });
                        var r = t - i;
                        r < (e.outerWidth() - o) * -1 && (r = (e.outerWidth() - o) * -1), e.animate({ left: r + "px" }, 1e3);
                    }),
                    t();
            },
            t = function () {
                var e = $("#bet-basket").outerWidth() - $("#bet-basket-table-best").outerWidth() - 1;
                $("#bet-basket-table-slider").css("width", e + "px");
            };
        return { init: e, setTableWidth: t };
    })(),
    utilityBar = (function () {
        var e = function () {
                t();
            },
            t = function () {
                $(".bet-basket-info-button").hover(function () {
                    var e = $(this).siblings(".bet-basket-info-pop-up");
                    e.toggleClass("active");
                }),
                    $(".bet-basket-delete").click(function () {
                        var t = $(this).parents("[data-mid]"),
                            o = !0;
                        e(t, o);
                    }),
                    $(".bet-basket-delete-all").click(function () {
                        var e = [],
                            t = 0;
                        $(".bet-basket-row[data-mid]").each(function () {
                            var o = $(this).attr("data-bid");
                            e.indexOf(o) === -1 &&
                                (setTimeout(function () {
                                    window.ocBetslip.removeBet(o);
                                }, 5 * t),
                                e.push(o));
                        }),
                            o("", "", "load", !1);
                    });
                var e = function (e, t) {
                    var a = e.attr("data-mid"),
                        n = e.attr("data-bid");
                    t && o(n, a, "delete", !0), window.ocBetslip.removeBet(n);
                };
                $(".bet-basket-checkbox").click(function () {
                    var e = $(this).parents("[data-mid]"),
                        a = e.attr("data-mid"),
                        n = e.attr("data-bid");
                    this.checked === !0 ? (t(), o(n, a, "tick")) : (t(), o(n, a, "untick"));
                    var i = angular.element($('[data-ng-controller="XmlBetController as XmlBetController"]')[0]).controller();
                    i && i.b2BBetslipTickBasket(n, a);
                });
                var t = function () {
                    $(".bet-basket-checkbox").not(":checked").parents("[data-mid]").hasClass("unselected")
                        ? $(".bet-basket-checkbox:checked").parents("[data-mid]").removeClass("unselected")
                        : $(".bet-basket-checkbox").not(":checked").parents("[data-mid]").addClass("unselected");
                };
                t(),
                    oc.isTouchable &&
                        "non-static/bet-basket" == oc.view &&
                        ($(".bk3-hover").click(function (e) {
                            e.preventDefault();
                        }),
                        touchableEvents.bindEvents("click", $(".bk3-hover"), function (e) {
                            oddsTable.showOffersThenClickOut(e);
                        }));
            },
            o = function (e, o, n, i, r) {
                for (var s = e.split("|"), c = o.split("|"), l = s.length, d = 0; d < l; d++) "undefined" !== s[d] && a(s[d], c[d], n);
                $.ajax({
                    url: "/ajax/load-basket?view=" + oc.view,
                    dataType: "html",
                    success: function (e) {
                        if ("non-static/bet-basket" == oc.view) {
                            var t = $("#bet-basket-inner-main", e);
                            if (null !== t) {
                                $("#bet-basket").empty(), $("#bet-basket").append(t);
                                var o = angular.element($('[data-ng-controller="MainController as MainController"]')[0]).controller();
                                o.runOnContentLoad($("#bet-basket"));
                            } else alert("An error has occured. Please refresh your browser");
                        }
                    },
                }).done(function () {
                    void 0 !== r && null !== r && (r.removeClass("loading"), r.removeAttr("disabled")),
                        $("#bet-basket-panel").find(".spinner").hide(),
                        $("#bet-basket-panel").addClass("panel-loaded"),
                        t(),
                        "non-static/bet-basket" == oc.view && betBasket.init(),
                        $("#bet-basket-panel").hasClass("hide") && show("bet-basket");
                });
            },
            a = function (e, t, o) {
                var a = angular.element($('[data-ng-controller="MainController as MainController"]')[0]).controller();
                switch ((a || console.log("Error: No cookie functions have been defined due to MainController missing"), o)) {
                    case "delete":
                        a.deleteCookieArray("basket", e);
                        break;
                    case "tick":
                    case "add":
                        a.addCookieArray("basket", e, t + "-1", 1209600);
                        break;
                    case "untick":
                        a.addCookieArray("basket", e, t + "-0", 1209600);
                        break;
                    case "delete-all":
                        $.cookie("basket", "", { path: "/", expires: 7, domain: oc.cookieDomain });
                        break;
                    case "load":
                }
            };
        return { init: e, betBasketAjax: o };
    })(),
    betSlip = (function () {
        function e(e) {
            if (!e) return e;
            var t = e.split("#"),
                o = t[0],
                a = t[1],
                n = o.split("?")[0];
            if (!a) return n;
            var i = a.split("?")[0],
                r = i.split("&")[0];
            return n + "#" + r;
        }
        var t = function () {
                (oc.isTouchable && "non-static/bet-basket" != oc.view) ||
                    $(document).on("click", ".bk-logo-click", function () {
                        betSlip.bkLogoClick($(this));
                    }),
                    $("#oddsTableContainer").on("mouseenter", ".bs", function () {
                        var e = common.getBookieFromButton($(this));
                        $(this).append($('<span class="bet-now beta-caption6 bookie-bg-' + e.toLowerCase() + " bg-text-" + oc.bookmakersData[e].textColour + '">Bet</span>'));
                    }),
                    $("#oddsTableContainer").on("mouseleave", ".bs", function () {
                        $(this).find(".bet-now").remove();
                    }),
                    $(document).on("click", ".bs", function () {
                        a($(this));
                    }),
                    o(),
                    $(".add-bet-open-slip").click(function (e) {
                        e.stopPropagation(), e.preventDefault(), betSlip.addToBetslipCommon($(this), !0);
                    });
            },
            o = function () {
                $(".basket-add, .add-to-bet-basket, .participant-list:not(.outrights) .participant-info.coupon").click(function (e) {
                    e.stopPropagation(), e.preventDefault(), $(this).hasClass("empty") || betSlip.addToBetslipCommon($(this));
                }),
                    $("#fixtures .match-on td").click(function (e) {
                        if (!$(e.target).hasClass("add-to-bet-basket")) {
                            var t = $(this).find(".add-to-bet-basket");
                            1 === t.length && betSlip.addToBetslipCommon(t);
                        }
                    });
            },
            a = function (t, o, a, n) {
                function i(e) {
                    console.error("Failed to register betslip click...", e);
                }
                var r = angular.element($('[data-ng-controller="XmlBetController as XmlBetController"]')[0]).controller();
                if (r) {
                    1 === t.length ? ((a = common.getBookieFromButton(t)), (n = !!t.attr("data-anonymous-selection"))) : (t = common.getBetButtonObject(o, a)), r.openSingleBetSlip(t, a);
                    var s = encodeURIComponent(e(window.location.pathname + window.location.hash)),
                        c = "/json/ajax-grid-click?bk=" + a + "&mkid=" + t.closest(".eventTable").attr("data-mid") + "&pid=" + common.getBetIdFromButton(t) + "&pageurl=" + s + "&anonymousSelection=" + n;
                    t.data("ew-denom") && t.data("ew-places") && (c = c + "&eachWayDenominator=" + t.data("ew-denom") + "&eachWayPlaces=" + t.data("ew-places")),
                        $.ajax({
                            url: c,
                            dataType: "json",
                            success: function (e) {
                                "true" === e.response ? gaTracking.trackEvent(gaTracking.EVENTS.BETSLIP_CLICK, { elasticDocId: e.id }) : i(e);
                            },
                            error: i,
                        });
                }
            },
            n = function (e) {
                var t = ["KD", "S9", "RK"],
                    o = e.attr("data-bk"),
                    a = e.parents("[data-mid]").attr("data-custom-track") ? e.parents("[data-mid]").attr("data-custom-track") : "bk-logo-click",
                    n = "/clickout.htm?customer=new&type=" + a + "&bk=" + o + "&cg=" + e.parents("[data-mid]").attr("data-cgname");
                if ((oc.debugOn && (n += "&debug"), t.indexOf(o) !== -1)) window.location.href = n;
                else {
                    var i = o + "clickout",
                        r = !0;
                    popup.show(n, i, oc.defaultPopupWidth, oc.defaultPopupHeight, 0, 0, r);
                }
            },
            i = function (e, t, o, a) {
                var n = angular.element($('[data-ng-controller="MainController as MainController"]')[0]).controller();
                n &&
                    (o
                        ? n.addToMultipleBetSlip(Number(e.closest("tr[data-bid]").attr("data-bid")), Number(e.closest("table[data-mid]").attr("data-mid")), Number(e.closest("tr[data-best-dig]").attr("data-best-dig")), e.attr("data-bk"))
                        : e.hasClass("participant-info")
                        ? n.addToMultipleBetSlip(Number(e.attr("data-bid")), Number(e.closest(".subevent-content").attr("data-mid")), Number(e.attr("data-best-dig")), e.attr("data-bk"))
                        : n.addToMultipleBetSlip(Number(e.closest("td").attr("data-bid")), Number(e.closest("tr").attr("data-mid")), Number(e.closest("td").attr("data-best-dig")), e.attr("data-bk")));
            },
            r = function (e) {
                var t = $('<span class="add-to-bet-basket add-to-bet-basket-beta"></span>');
                $("#page-centre-container").append(t);
                var o = e.offset().top + e.outerHeight() / 2 - t.height() / 2,
                    a = e.offset().left + e.outerWidth() / 2 - t.width() / 2;
                t.css("position", "absolute"), t.css("z-index", "9999"), t.offset({ top: o, left: a });
                var n = $(".num-of-bets").offset(),
                    i = (t[0], n.left),
                    r = n.top;
                t.animate({ top: r, left: i }, 700, function () {
                    t.remove();
                });
            };
        return { init: t, handleSingleBetSlipClick: a, bkLogoClick: n, addToBetslipCommon: i, doAddToBetslipAnimation: r, initAllAddToBasketCouponButtons: o };
    })(),
    cardReports = (function () {
        var e = function () {
            $("#report").tablesorter({ widgets: ["zebra"], debug: !1 });
        };
        return { init: e };
    })(),
    oddsTable = (function () {
        var e = function (e) {
                var t = $(e.target).parents(".touch-hover").length > 0 ? $(e.target).parents(".touch-hover") : $(e.target);
                t.hasClass("touch-show")
                    ? (t.removeClass("touch-show"), t.hasClass("bk-logo-click") ? betSlip.bkLogoClick(t) : void 0 !== t.attr("href") && popup.show(t.attr("href"), t.attr("data-bk") + "betslip", oc.defaultPopupWidth, oc.defaultPopupHeight))
                    : ($(".touch-show").removeClass("touch-show"), t.addClass("touch-show"));
            },
            t = function () {
                function e(e) {
                    var o = 66;
                    t.css("transform", "translate3d(" + -e * o + "px, 0, 0)"),
                        t.attr("data-hlist-count", e),
                        e <= 0 ? $(".race-hlist-container .race-hlist-arrow-left").addClass("hide") : $(".race-hlist-container .race-hlist-arrow-left").removeClass("hide"),
                        a - e <= 8 ? $(".race-hlist-container .race-hlist-arrow-right").addClass("hide") : $(".race-hlist-container .race-hlist-arrow-right").removeClass("hide");
                }
                $(".tip-verdict").click(function () {
                    $("html, body").animate({ scrollTop: $("#oc-verdict").offset().top - 100 }, 200);
                }),
                    oddsTable.positionSelectAnotherRace();
                var t = $(".race-hlist-container .race-hlist");
                if (t.length > 0) {
                    var a = Number(t.attr("data-hlist-total"));
                    a < 9 && $(".race-hlist-container").css("width", 66 * a + 20 + "px");
                    var c = t.attr("data-hlist-sel"),
                        l = a - 8,
                        d = a - c,
                        u = 0;
                    l > 0 && c > 0 && ((less = !0), (u = d >= 8 ? c - 1 : a - 8)),
                        e(u),
                        $(".race-hlist-container .race-hlist-arrow").click(function () {
                            var o = 0;
                            (o = $(this).hasClass("race-hlist-arrow-left") ? Number(t.attr("data-hlist-count")) - 1 : Number(t.attr("data-hlist-count")) + 1), e(o);
                        });
                }
                var h = $("#table .sub-horizontal-menu, #table-tabs-row .beta-hlist");
                if (1 == h.length) {
                    var f = $("#more-bets"),
                        p = $("#more-bets-list");
                    if (1 == f.length && 1 == p.length) {
                        var g = f.offset().left,
                            m = g + f.width(),
                            v = h.offset().left + 10,
                            b = p.width();
                        m - v < b ? $("#more-bets-list").css("margin-left", "-" + (g - v) + "px") : $("#more-bets-list").css("margin-left", f.width() - b + "px");
                    }
                }
                $(".sort-participant").click(function () {
                    i();
                }),
                    $(".sort-by").change(function () {
                        $(this)
                            .find("option:selected")
                            .each(function () {
                                ts_resortTab(this.value);
                            });
                    }),
                    n(),
                    o(),
                    $(".video-link").click(function (e) {
                        e.preventDefault();
                        var t = $("#video-container");
                        if (t.length) {
                            var o = $(this).attr("href");
                            $("#video-player").remove();
                            var a = $(
                                '<iframe id="video-player" src="//' + o + '?rel=0&wmode=opaque&autoplay=1" frameborder="0" height="225" width="323" type="text/html" class="video-player" title="Video Player" allowfullscreen=""></iframe>'
                            );
                            t.html(a), $("html, body").animate({ scrollTop: t.offset().top - 100 }, 200);
                        }
                    });
                var k = angular.element($('[data-ng-controller="MainController as MainController"]')[0]).controller();
                k && k.setBookieBetsCookie(!1, 1),
                    $(".view-button").click(function () {
                        r($(this).attr("data-view"));
                    }),
                    $("#racing-card-sort, #racing-odds-sort").click(function () {
                        s($(this).data("sort"));
                    });
            },
            o = function () {
                $(".header_strap:not('.no-close')").click(function () {
                    var e = $(this);
                    e.toggleClass("header_strap_closed"), e.parent().find(".content_strap").toggleClass("hide");
                }),
                    $(".help").click(function () {
                        var e = $(this);
                        e.parent().find("#helpS").toggleClass("hide");
                    }),
                    $(".horseInfo .info .icon").hover(function () {
                        $(this).parent().find(".overRaceComment").toggleClass("hide");
                    });
            },
            a = function () {
                var e = $("#select-all-race-dropdown");
                if (1 === e.length) {
                    var t = $("#select-another-race-container");
                    if (e.parents("#table-tabs").length > 0) t.addClass("rc-left");
                    else {
                        var o = e.position().left,
                            a = t.width(),
                            n = $("#wrapper-content").width();
                        n - a > o ? t.addClass("rc-left") : o - a > 0 && t.addClass("rc-right");
                    }
                }
            },
            n = function () {
                function e() {
                    (r = u.offset().top + u.height() - l.height() - h - ($("#grid_show_more_row") ? 44 : 0)), (s = u.offset().top - l.height() - h - 10);
                }
                function t() {
                    e();
                    var t = $(window).scrollTop(),
                        o = parseInt(t),
                        a = $(l).find(".quick-bet__row"),
                        n = a.next();
                    o < s ? (a.css("display", "none"), n.css("display", "none")) : o < r && o > s ? (a.css("display", "table-row"), n.css("display", "table-row")) : (a.css("display", "none"), n.css("display", "none"));
                }
                function o() {
                    e(),
                        "undefined" == typeof i && 1 === $("#grid_info_banner, .qubit-grid-banner-cell").length
                            ? ((a = s - $("#grid_info_banner, .qubit-grid-banner-cell").outerHeight()), (i = !0))
                            : (i !== !1 && "undefined" != typeof i) || ((a = s), (i = !1));
                    var t = $("#mc").offset().left,
                        o = $(window).scrollTop(),
                        n = $(window).scrollLeft(),
                        c = t - n;
                    l.css("left", c), d.css("left", c);
                    var u = parseInt(o);
                    u < a ? (l.css("display", "none"), d.css("display", "none")) : u < r && u > a ? (l.css("display", "block"), d.css("display", "block")) : (l.css("display", "none"), d.css("display", "none"));
                }
                var a,
                    i,
                    r,
                    s,
                    c = $("#oddsTableContainer table.eventTable");
                if (c.length > 0) {
                    var l = $("#ew_bookie_container"),
                        d = $("#ew_bookie_container_ew");
                    $("#ew_bookie_content").css("width", c.width());
                    var u = $("#t1"),
                        h = $("#nav-sports-menu-wrap").height() + $("#beta-sub-menu-wrap").height();
                    $(window).height() > 600 ? l.css("top", h + "px") : l.css("top", "0px"),
                        l.css("width", u.width()),
                        requestAnimationFrame(function () {
                            o(), t();
                        }),
                        $("#t1") &&
                            (oc.hasBoundBookieBarBindings ||
                                ((oc.hasBoundBookieBarBindings = !0),
                                $(window).resize(
                                    requestAnimationFrame.bind(null, function () {
                                        n();
                                    })
                                ),
                                $(window).scroll(
                                    requestAnimationFrame.bind(null, function () {
                                        o(), t();
                                    })
                                ),
                                $("#close_grid_info_banner").on("click", function () {
                                    i = !1;
                                })));
                }
            },
            i = function () {
                $(".aOSHCBtn" + oc.aOSHCstate).removeClass("selected"), 0 === oc.aOSHCstate ? (oc.aOSHCstate = 1) : (oc.aOSHCstate = 0), $(".aOSHCBtn" + oc.aOSHCstate).addClass("selected"), ts_resortTab(oc.aOSHCstate);
            },
            r = function (e) {
                if (((e = e ? e : $.cookie("all-odds-view")), $(".view-switcher").find(".view-button").removeClass("selected"), "OddsComparison" === e))
                    $('.view-button[data-view="OddsComparison"]').addClass("selected"),
                        $("#table-tabs").removeClass("hide"),
                        $("#form-and-betting-preview .h1").removeClass("hide"),
                        $("#race-card-banner").addClass("hide"),
                        s("card_ascending");
                else {
                    $('.view-button[data-view="BettingView"]').addClass("selected"), $("#table-tabs").addClass("hide"), $("#form-and-betting-preview .h1").addClass("hide"), $("#race-card-banner").removeClass("hide");
                    var t = $(".beta-comments-and-clicks");
                    $(".beta-comments-and-clicks").remove(), $("#HorseRacing").append(t), s("odds_ascending");
                }
                $.cookie("all-odds-view", e, { path: "/", domain: oc.cookieDomain }), (oc.grid_view = e);
            },
            s = function (e) {
                var t = window.oddsTable["sort_horses_" + e];
                $("#horse-rows .hl-row").sort(t).appendTo("#horse-rows");
                var o = $("#racing-card-sort"),
                    a = $("#racing-odds-sort");
                o.removeClass("with-arrow-down with-arrow-up"),
                    a.removeClass("with-arrow-down with-arrow-up"),
                    "odds_ascending" === e
                        ? (a.data("sort", "odds_descending"), a.addClass("with-arrow-down"))
                        : "odds_descending" === e
                        ? (a.data("sort", "odds_ascending"), a.addClass("with-arrow-up"))
                        : "card_ascending" === e
                        ? (o.data("sort", "card_descending"), o.addClass("with-arrow-down"))
                        : "card_descending" === e && (o.data("sort", "card_ascending"), o.addClass("with-arrow-up"));
            },
            c = function (e, t) {
                return Number($(t).data("race-odds")) < Number($(e).data("race-odds"))
                    ? 1
                    : Number($(t).data("race-odds")) > Number($(e).data("race-odds"))
                    ? -1
                    : Number($(t).data("race-number")) < Number($(e).data("race-number"))
                    ? 1
                    : -1;
            },
            l = function (e, t) {
                return Number($(t).data("race-odds")) > Number($(e).data("race-odds")) ? 1 : -1;
            },
            d = function (e, t) {
                return Number($(t).data("race-number")) < Number($(e).data("race-number")) ? 1 : -1;
            },
            u = function (e, t) {
                return Number($(t).data("race-number")) > Number($(e).data("race-number")) ? 1 : -1;
            };
        return {
            init: t,
            initBookiesBar: n,
            sortParticipant: i,
            showOffersThenClickOut: e,
            positionSelectAnotherRace: a,
            setSimpleOrComparisonView: r,
            orderRacingOdds: s,
            sort_horses_odds_ascending: c,
            sort_horses_odds_descending: l,
            sort_horses_card_ascending: d,
            sort_horses_card_descending: u,
        };
    })(),
    numOnly = function (e) {
        if (void 0 === e || "" === e) return 0;
        if (isNaN(parseFloat(e))) {
            if (!e.replace) return 0;
            e = e.replace(/[^0-9.-]/g, "");
        }
        return parseFloat(e);
    },
    oddsMoreFilter = (function () {
        var e = function () {
                $("#all-odds-more-filter").live("keyup", function () {
                    t();
                }),
                    $("#all-odds-more-filter").live("search", function () {
                        t();
                    });
            },
            t = function () {
                var e = $("#all-odds-more-filter").val(),
                    t = $(".more-list-li a, .beta-more-list-li a");
                t.each(function () {
                    $(this).text().match(new RegExp(e, "i")) ? $(this).parent().show() : $(this).parent().hide();
                });
            };
        return { init: e };
    })(),
    Chart = (function () {
        var e = function () {
                for (var e = oc.charts.length, o = 0; o < e; o++) {
                    var a = oc.charts[o];
                    t(a.type, a.container, a.data, a.yaxis, a.title, a.series);
                }
            },
            t = function (e, t, o, a, n, i) {
                if (1 == $("#" + t).length)
                    if ("pie" == e) {
                        var r = o.length;
                        if (r > 5) {
                            for (var s = 0, c = 5; c < r; c++) s += o[c][1];
                            o.splice(5, r - 5, ["Others", s]);
                        }
                        var l = 0;
                        "my_chart" != t && (l = -20),
                            new Highcharts.Chart({
                                credits: !1,
                                chart: { renderTo: t, plotBackgroundColor: null, plotBorderWidth: null, plotShadow: !1, backgroundColor: "none" },
                                colors: ["#5c5c61", "#9fceff", "#a9ff96", "#ffbc75", "#999eff", "#ffdfe7"],
                                title: { text: null, align: "left", style: { color: "#ffffff", fontSize: "20px" } },
                                tooltip: {
                                    formatter: function () {
                                        return this.percentage.toFixed(2) + " % of Bets";
                                    },
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: !0,
                                        cursor: "pointer",
                                        size: "100%",
                                        dataLabels: {
                                            enabled: !1,
                                            color: "#000000",
                                            distance: 5,
                                            y: 5,
                                            style: { "font-weight": "normal", "font-family": "verdana", "font-size": "11px" },
                                            formatter: function () {
                                                return "<b>" + this.point.name + "</b>";
                                            },
                                        },
                                        showInLegend: !0,
                                        borderWidth: 1,
                                        borderColor: "#f9f9f9",
                                        shadow: !1,
                                    },
                                },
                                legend: { align: "left", layout: "vertical", borderWidth: 0, verticalAlign: "top", x: l },
                                series: [{ type: e, name: null, data: o }],
                            });
                    } else
                        "line" == e &&
                            (Highcharts.setOptions({ lang: { shortMonths: oc.charts.shortMonths } }),
                            new Highcharts.Chart({ credits: !1, chart: { renderTo: t, type: "spline" }, title: n, xAxis: { type: "datetime" }, yAxis: a, tooltip: { enabled: !1 }, series: i }));
            };
        return { init: e };
    })(),
    stats = (function () {
        var e = function () {
            $("#market-reports-full .table-market-reports").tablesorter({ widgets: ["zebra"], debug: !1 });
        };
        return { marketReports: e };
    })(),
    myOddsChecker = (function () {
        var e = function () {
            if (oc.view.indexOf("myoddschecker") !== -1) {
                $(".change").click(function (e) {
                    e.preventDefault();
                    var t = $(this),
                        o = t.parents("form").find(".change-content");
                    o.toggleClass("hide"),
                        o.hasClass("hide")
                            ? (t.text(oc.text.change), t.closest("form").find(".error-container,.information-container,.success-container").hide())
                            : (t.text(oc.text.cancel), t.closest("form").parent().find("form").find(".error-container,.information-container,.success-container").hide());
                });
                var e = function () {
                    0 === $("#my-bookmakers li").size()
                        ? $("#my-bookmakers").append('<li class="empty"><img src="' + oc.staticServer + 'i/myoddschecker/empty-bookie-holder.png" /></li>')
                        : 0 !== $("#my-bookmakers").children(".bookie").size() &&
                          ($("#my-bookmakers").children(".empty").remove(), $("#my-bookmakers").append('<li class="empty"><img src="' + oc.staticServer + 'i/myoddschecker/empty-bookie-holder.png" /></li>')),
                        0 === $("#other-bookmakers li").size()
                            ? $("#other-bookmakers").append('<li class="empty"><img src="' + oc.staticServer + 'i/myoddschecker/empty-bookie-holder.png" /></li>')
                            : ($("#other-bookmakers").children(".empty").remove(), $("#other-bookmakers").append('<li class="empty"><img src="' + oc.staticServer + 'i/myoddschecker/empty-bookie-holder.png" /></li>'));
                };
                1 == $("#chosen-bookmakers").length &&
                    (e(),
                    $("#my-bookmakers, #other-bookmakers")
                        .sortable({
                            connectWith: ".connect",
                            cursor: "pointer",
                            stop: function () {
                                e();
                            },
                        })
                        .disableSelection(),
                    $("#apply").click(function (e) {
                        e.preventDefault();
                        var t = "",
                            o = $("#my-bookmakers li a").toArray();
                        if (0 !== o.length) for (var a = 0; ; ) if ((0 !== a && (t += ","), (t += o[a].getAttribute("id")), a++, a == o.length)) break;
                        document.location.href = this.href + t;
                    }));
            }
        };
        return { init: e };
    })(),
    bookieReview = (function () {
        function e() {
            (t = r.scrollTop()),
                (o = t + r.height()),
                (a = d.offset().top),
                (i = s.offset().top - l.height() - 50),
                (n = c.offset().right),
                t > i && o < a ? (u.css({ position: "fixed", right: n, top: "200px", display: "block" }), h.addClass("hide")) : (u.css({ display: "none" }), h.removeClass("hide"));
        }
        var t,
            o,
            a,
            n,
            i,
            r = $(window),
            s = $("#mc"),
            c = $("#rhc"),
            l = $(".float-menu-wrap"),
            d = $("#footer"),
            u = $("#sticky-wrapper"),
            h = $("#offer-conditions"),
            f = function () {
                e(),
                    $(window).scroll(function () {
                        e();
                    });
            };
        return { init: f };
    })(),
    bookieOffers = (function () {
        var e = function () {
            $("#sport-type-beta, #bookmaker-beta, #customer-type-beta").on("change", function () {
                var e = $("#sport-type-beta").val(),
                    t = "" != e ? "[data-sport-type='" + e + "']" : "",
                    o = $("#bookmaker-beta").val(),
                    a = "";
                if ("-1" == o) for (var n = $("#bookmaker-beta option:selected").attr("data-my-bookies").split("-"), i = 0; i < n.length; i++) i > 0 && (a += ","), (a += "[data-bookie-code='" + n[i] + "']");
                else "" != o && (a = "[data-bookie-code='" + o + "']");
                var r = $("#customer-type-beta").val(),
                    s = "" != r ? "[data-customer-type='" + r + "']" : "";
                $(".offer-rows").addClass("hide");
                var c = $(".offer-rows" + t + s);
                "" != a ? c.filter(a).removeClass("hide") : c.removeClass("hide"),
                    redeye.addObjectToDataLayer({ event: "offersFilter", offersFilter: { sport: $("#sport-type-beta option:selected").text(), bookmaker: $("#bookmaker-beta option:selected").text(), customer: r } });
            }),
                $(".casino-rows .offer-rows .bookie-review").click(function (e) {
                    e.preventDefault(), e.stopPropagation(), (window.location.href = $(this)[0].href);
                }),
                $(".casino-rows .offer-rows .claim-now .button").click(function (e) {
                    e.preventDefault(), e.stopPropagation(), window.open($(this)[0].href, $(this)[0].title);
                }),
                $(".casino-rows .offer-rows").click(function (e) {
                    var t = $(this).find(".claim-now .button");
                    window.open(t[0].href, t[0].title);
                });
        };
        return { init: e };
    })(),
    oddsHistory = (function () {
        var e = function () {
            "" === location.hash ? $($(".sub-horizontal-menu li")[0]).addClass("active") : $(".sub-horizontal-menu ." + location.hash.substring(1)).addClass("active"),
                $(".sub-horizontal-menu li").click(function () {
                    $(".sub-horizontal-menu li").not(this).removeClass("active"), $(this).addClass("active");
                });
            var e = "" === location.hash ? "" : location.hash.substring(1);
            $(".history-today-url").click(function () {
                e = "today";
            }),
                $(".history-all-url").click(function () {
                    e = "all-history";
                }),
                $("#selection-drop-down").change(function () {
                    var t = $(this).find("option:selected").val();
                    "" !== t && (document.location.href = $(this).attr("data-pre-url") + t + ("all-history" === e ? "#all-history" : ""));
                });
        };
        return { init: e };
    })(),
    pastOrNextRace = (function () {
        var e = 0,
            t = function () {
                a(), o(), setInterval(a, 6e4);
            },
            o = function () {
                $(".hide-international-races").click(function () {
                    $(".hide-international-races").toggleClass("closed"),
                        $(".international-races .race-details:not([data-priority-meeting])").toggleClass("hide"),
                        $.cookie("showInternationalRaces", "" + !$(this).hasClass("closed"), { path: "/", domain: oc.cookieDomain });
                });
            },
            a = function () {
                var t = new Date(
                    new Date(
                        oc.currentDateTime.substring(0, 4),
                        oc.currentDateTime.substring(5, 7) - 1,
                        oc.currentDateTime.substring(8, 10),
                        oc.currentDateTime.substring(11, 13),
                        oc.currentDateTime.substring(14, 16),
                        oc.currentDateTime.substring(17, 19),
                        0
                    ).getTime() + e
                ).getTime();
                $(".race-time[data-time], .time-to-race[data-time]").each(function () {
                    var e = 1 === $(this).parents(".abandoned").length;
                    $(this).attr("href") &&
                        $(this).attr(
                            "href",
                            $(this)
                                .attr("href")
                                .replace(/\/\/(horse-racing|greyhounds)\/(europe|asia|americas|australasia|world)?\/?.+?\//, "/")
                        );
                    var o = $(this).attr("data-time"),
                        a = new Date(o.substring(0, 4), o.substring(5, 7) - 1, o.substring(8, 10), o.substring(11, 13), o.substring(14, 16), o.substring(17, 19), 0).getTime(),
                        n = new Date(a - 3e5).getTime(),
                        i = new Date(a + 3e5).getTime();
                    if (
                        (e || (t > i ? $(this).removeClass("next-event pulse").addClass("results").removeClass("going") : t > a ? $(this).removeClass("next-event pulse").addClass("going") : t < a && n < t && $(this).addClass("next-event")),
                        "true" === $(this).attr("data-countdown"))
                    ) {
                        var r = Math.floor((a - t) / 864e5),
                            s = Math.floor((a - t) / 36e5 - 24 * r),
                            c = Math.floor((a - t) / 6e4 - 24 * r * 60 - 60 * s),
                            l = (a - t) / 1e3,
                            d = "";
                        r >= 1 ? (d = "In " + r + "d") : l > 0 && s >= 1 && (d = "In " + s + "h "),
                            0 == r && l > 0 && s >= 1 && c >= 1 ? (d += c + "m") : 0 == r && l > 0 && c >= 1 && (d += c + " Mins"),
                            "" === d && l > 0 && (d = "Soon"),
                            "" === d ? (d = "Closed") : ($(this).hasClass("next-event") || $(this).hasClass("next-off__race-card-countdown")) && $(this).hasClass("hidden") && $(this).show(),
                            $(this).text(d);
                    }
                }),
                    (e += 6e4);
            };
        return { init: t };
    })(),
    commonUtils = (function () {
        var e = function (e, t) {
                return $.ajax(e)
                    .done(function (e, o, a) {
                        t(e);
                    })
                    .fail(function (e, t, o) {
                        alert("An error occured. Please try again");
                    });
            },
            t = function () {
                var e = "localCacheBusterSSL";
                null !== $.cookie(e) &&
                    oc.cacheBusterLocalStorage !== $.cookie(e) &&
                    $.cookie("number_access") > 1 &&
                    (window.localStorage.removeItem("GlobalBookieAccountsFactory-" + oc.repub),
                    (oc.refreshingApp = !0),
                    setTimeout(function () {
                        var e = angular.element($('[data-ng-controller="BookieAccountsController as BookieAccountsController"]')[0]).controller();
                        e.rebuildLocalStorageInit();
                    }, 50)),
                    $.cookie(e, oc.cacheBusterLocalStorage, { path: "/", expires: 365, domain: oc.cookieDomain, secure: !0 });
            },
            o = function (e) {
                angular
                    .element(document.body)
                    .injector()
                    .invoke([
                        "$compile",
                        function (t) {
                            var o = angular.element("body").scope();
                            t($("body").find(e))(o), o.$apply();
                        },
                    ]);
            };
        return { cacheBuster: t, ajaxCallHandler: e, angularCompiler: o };
    })(),
    clickout = function (e) {
        setTimeout(function () {
            oc.debugOn ? $("#clickout-center").append("<p>" + e.href + "</p>") : (window.location.href = e.href);
        }, 1500);
    };
$.log = function (e, t) {
    (oc.debugOn || "D" === oc.release) && ((t = t || ""), console.log(e, t));
};
var countries = (function () {
        var e = function () {
            $(".countryLink, .choose-uk").click(function (e) {
                if ((e.preventDefault(), $(this).hasClass("choose-uk")))
                    $("#international-options-modal").addClass("hide"), $(".header-button.country ").removeClass("panel-open"), $.cookie("hideCountryBanner", "true", { path: "/", domain: oc.cookieDomain });
                else {
                    var t = $(this).attr("data-country");
                    dataLayer.push({ countryRedirect: t, event: "internationalRedirect" });
                    var o = $(this).attr("href"),
                        a = t.toLowerCase(),
                        n = $('link[hreflang="' + a + "-" + a + '"]').attr("href");
                    n && (o = n + "?utm_source=oddschecker&utm_medium=referral&utm_campaign=uksite"), popup.show(o, "Oddschecker " + t, oc.defaultPopupWidth, oc.defaultPopupHeight, 0, 0, !0);
                }
            });
        };
        return { init: e };
    })(),
    ui = (function () {
        var e = function (e, t) {
            e && e(),
                $(".custom-select").each(function () {
                    var e = $(this).attr("class"),
                        t = '<div class="' + e + '">';
                    (t += '<span class="custom-select-trigger">' + ("All" === $(this).find("option:selected").text() ? "All Sports" : $(this).find("option:selected").text()) + "</span>"),
                        (t += '<div class="custom-options">'),
                        $(this)
                            .find("option")
                            .each(function () {
                                t += '<span class="custom-option" data-value="' + $(this).attr("value") + '">' + ("All" === $(this).html() ? "All Sports" : $(this).html()) + "</span>";
                            }),
                        (t += "</div></div>"),
                        $(this).wrap('<div class="custom-select-wrapper"></div>'),
                        $(this).after(t);
                }),
                $(".custom-select-trigger").on("click", function (e) {
                    $("html").one("click", function () {
                        $(".custom-select").removeClass("opened");
                    }),
                        $(this).parents(".custom-select").toggleClass("opened"),
                        e.stopPropagation();
                }),
                $(".custom-option").on("click", function () {
                    var e = $(this).data("value");
                    $(this).parents(".custom-select-wrapper").find("select").val(e),
                        $(this).parents(".custom-options").find(".custom-option").removeClass("selection"),
                        $(this).addClass("selection"),
                        $(this).parents(".custom-select").removeClass("opened"),
                        $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text()),
                        t && t(e);
                });
        };
        return { initCustomSelect: e };
    })(),
    ocApp = (function () {
        var e = function (e) {
            for (var t = window.location.search.substring(1), o = t.split("&"), a = 0; a < o.length; a++) {
                var n = o[a].split("=");
                if (n[0] === e) return n[1];
            }
            return !1;
        };
        return { getQueryParam: e };
    })(),
    googletag = window.googletag || { cmd: [] },
    tthAdverts = (function () {
        var e = "22664628094",
            t = "apn_ad_slot",
            o = "div-gpt-ad",
            a = "1",
            n = function () {
                !(function () {
                    var e = document,
                        t = e.createElement("script"),
                        o = e.getElementsByTagName("head")[0];
                    (t.type = "text/javascript"), (t.async = !0), (t.src = "//securepubads.g.doubleclick.net/tag/js/gpt.js"), o.insertBefore(t, o.firstChild);
                })();
            },
            i = function (e) {
                return null !== document.getElementById(e);
            },
            r = function () {
                var e = '[id^="' + o + '"]';
                return document.querySelectorAll(e);
            },
            s = function () {
                if (window.googletag) {
                    var n = oc.urlPath.split("/").slice(1),
                        r = "/" === oc.urlPath ? "homepage" : n[0],
                        s = (oc.eventName || "").replace(/ +|&/g, "-").replace(/--+/g, "-").toLowerCase(),
                        c = r;
                    if (r.indexOf("casino") > -1) c = "casino";
                    else if (("tips" === r || "insight" === r) && n.length > 1) {
                        var l = n[n.length - 1].match(/^\d\d\d\d/);
                        (s = n[0] + "-" + (l ? n[n.length - 2] : n[n.length - 1])), (c = s), u[c] || (c = "other-tips-pages");
                    } else
                        "football" === r
                            ? (n.length > 2 ? ((c = n[0] + "-" + n[2]), u[c] || (c = n[0] + "-" + n[1])) : n.length > 1 && (c = n[0] + "-" + n[1]), u[c] || (c = "other-football-pages"))
                            : "horse-racing" === r
                            ? (n.length > 1 && (c = n[0] + "-" + n[1]), n.length > 1 && "fast-results" === n[1] && (c = "horse-racing-results"), u[c] || (c = "horse-racing"))
                            : (n.length > 1 && (c = n[0] + "-" + n[1]), u[c] || (c = r));
                    var d = u[c],
                        h = "/" + e + "/" + c + "/" + d;
                    d || ((d = u.ros), (h = "/" + e + "/" + d));
                    var f,
                        p,
                        g = "-home-free-bet",
                        m = "-grid-free-bet";
                    switch (!0) {
                        case ("content/sport_homepage" === window.oc.view || "cards/coupon" === window.oc.view || "cards/default" === window.oc.view || "cards/group-all-events" === window.oc.view) && "undefined" != typeof u[c + g]:
                            (f = u[c + g]), (p = "/" + e + "/" + c + g);
                            break;
                        case "odds/all_odds" === window.oc.view && "undefined" != typeof u[c + m]:
                            (f = u[c + m]), (p = "/" + e + "/" + c + m);
                            break;
                        case "content/homepage" === window.oc.view:
                            var v = "homepage-free-bet";
                            (f = u[v]), (p = "/" + e + "/" + v);
                            break;
                        default:
                            var v = "homepage-free-bet";
                            (f = u[v]), (p = "/" + e + "/" + v);
                    }
                    googletag.cmd.push(function () {
                        i(t + "_728_top_generic") && googletag.defineSlot(h, [[728, 90]], t + "_728_top_generic").addService(googletag.pubads()),
                            i(t + "_728_bottom_generic") && googletag.defineSlot(h, [[728, 90]], t + "_728_bottom_generic").addService(googletag.pubads()),
                            i(t + "_left") &&
                                googletag
                                    .defineSlot(
                                        h,
                                        [
                                            [160, 600],
                                            [360, 811],
                                            [530, 650],
                                            [800, 1e3],
                                        ],
                                        t + "_left"
                                    )
                                    .setTargeting("position", ["left"])
                                    .addService(googletag.pubads()),
                            i(t + "_right") &&
                                googletag
                                    .defineSlot(
                                        h,
                                        [
                                            [160, 600],
                                            [360, 811],
                                            [530, 650],
                                            [800, 1e3],
                                        ],
                                        t + "_right"
                                    )
                                    .setTargeting("position", ["right"])
                                    .addService(googletag.pubads()),
                            i(t + "_MPU") && googletag.defineSlot(h, [[300, 250]], t + "_MPU").addService(googletag.pubads());
                        var e = o + "-" + f + "-" + a,
                            n = document.getElementsByClassName("ad-container-wrapper")[0];
                        if (n) {
                            var r = document.createElement("div");
                            (r.id = e), n.insertBefore(r, null);
                        }
                        if (p && i(e)) {
                            var s = googletag.sizeMapping();
                            p.indexOf("home") > -1
                                ? s
                                      .addSize([1025, 1], [680, 45])
                                      .addSize([1024, 1], [994, 45])
                                      .addSize(
                                          [768, 1],
                                          [
                                              [630, 45],
                                              [738, 45],
                                          ]
                                      )
                                      .addSize([375, 1], [340, 45])
                                      .addSize([0, 0], [])
                                : s.addSize([1024, 1], [930, 45]).addSize([768, 1], [718, 45]).addSize([375, 1], [340, 45]).addSize([0, 0], []);
                            var c = s.build(),
                                l =
                                    p.indexOf("home") > -1
                                        ? [
                                              [340, 45],
                                              [630, 45],
                                              [738, 45],
                                              [994, 45],
                                              [680, 45],
                                          ]
                                        : [
                                              [340, 45],
                                              [718, 45],
                                              [930, 45],
                                          ],
                                r = googletag.defineSlot(p, l, o + "-" + f + "-" + a).addService(googletag.pubads());
                            r.defineSizeMapping(c);
                        }
                        googletag.pubads().enableSingleRequest(), googletag.pubads().collapseEmptyDivs(), googletag.enableServices();
                    });
                }
            },
            c = (function () {
                var e = function (e) {
                    Array.from(document.getElementsByClassName("ad-container-wrapper"))
                        .concat(Array.from(document.getElementsByClassName("ad-container-wrap")))
                        .forEach(function (t) {
                            t.style.display = e;
                        });
                    var t = document.getElementById("ad-rhc");
                    t && (t.style.display = e);
                };
                return {
                    hide: function () {
                        e("none");
                    },
                    show: function () {
                        e("block");
                    },
                };
            })(),
            l = function () {
                window.googletag && googletag.destroySlots && (googletag.destroySlots(), c.hide());
            },
            d = function () {
                window.googletag &&
                    (c.show(),
                    window.googletag.cmd.push(function () {
                        i(t + "_728_top_generic") && window.googletag.display(t + "_728_top_generic"),
                            i(t + "_728_bottom_generic") && window.googletag.display(t + "_728_bottom_generic"),
                            i(t + "_left") && window.googletag.display(t + "_left"),
                            i(t + "_right") && window.googletag.display(t + "_right"),
                            i(t + "_MPU") && window.googletag.display(t + "_MPU"),
                            r().forEach(function (e) {
                                window.googletag.display(e.id);
                            });
                    }));
            },
            u = {
                "american-football": 9120595,
                "australian-rules": 9383539,
                awards: 4091240,
                badminton: 2263956,
                baseball: 1874459,
                basketball: 4722359,
                "bet-basket": 2310371,
                "betting-tools": 5036034,
                "bingo-bonuses": 8377073,
                "bookie-offers": 5298189,
                bowls: 3297843,
                boxing: 5922763,
                "boxing-home-free-bet": 5568878,
                "boxing-grid-free-bet": 5923329,
                casino: 7791341,
                "cheltenham-festival": 9343154,
                "cheltenham-festival-grid-free-bet": 4530304,
                chess: 4551268,
                cricket: 5757675,
                cycling: 8989159,
                darts: 1160406,
                "darts-home-free-bet": 4042670,
                "darts-grid-free-bet": 8909160,
                "e-sports": 4427454,
                football: 3598151,
                "football-accumulator": 6695974,
                "football-champions-league": 7114565,
                "football-championship": 9888101,
                "football-europa-league": 3159246,
                "football-home-free-bet": 4462506,
                "football-grid-free-bet": 9972856,
                "football-league-1": 6943738,
                "football-league-2": 8919619,
                "football-premier-league": 2730085,
                "free-bets": 5146932,
                "gaelic-games": 4329572,
                golf: 1221761,
                "golf-home-free-bet": 4330065,
                "golf-grid-free-bet": 7956747,
                "grand-national": 8127826,
                greyhounds: 1555041,
                "greyhounds-home-free-bet": 1326573,
                "greyhounds-grid-free-bet": 9850404,
                handball: 1138060,
                "harness-racing": 7797369,
                homepage: 6727264,
                "homepage-free-bet": 1763247,
                "horse-racing": 8127500,
                "horse-racing-home-free-bet": 2734429,
                "horse-racing-grid-free-bet": 1011862,
                "horse-racing-fast-results": 4471164,
                "horse-racing-results": 4471164,
                "ice-hockey": 4770714,
                insight: 5772199,
                "market-movers": 1515885,
                motorsport: 9161537,
                myoddschecker: 1591054,
                novelty: 7500571,
                "other-football-pages": 8983259,
                "other-tips-pages": 1568457,
                poker: 6916197,
                politics: 4991813,
                "politics-home-free-bet": 5055942,
                "politics-grid-free-bet": 3294924,
                pool: 9456520,
                ros: 2303460,
                "ros-home-free-bet": 9168407,
                "ros-grid-free-bet": 9514791,
                "royal-ascot": 4033391,
                "rugby-league": 2422696,
                "rugby-union": 1502931,
                "safer-gambling": 3769723,
                snooker: 3333776,
                "table-tennis": 1369354,
                tennis: 9100686,
                "tennis-home-free-bet": 4370542,
                "tennis-grid-free-bet": 5885612,
                tips: 5579929,
                "tips-american-football": 8479536,
                "tips-cheltenham-festival": 2499949,
                "tips-nba": 9166652,
                "tips-nfl": 4691923,
                tv: 8697331,
                "tv-home-free-bet": 9734411,
                "tv-grid-free-bet": 7410078,
                "ufc-mma": 2224505,
                volleyball: 3501877,
                "winter-sports": 2445844,
            };
        return { insertScript: n, defineTags: s, displayAds: d, destroyTags: l };
    })();
