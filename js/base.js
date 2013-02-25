if ( !window.Ye ) {
	window.Ye = {};
}

(function (Y, $) {
	var undef;
	var doc = document;
	var ua  = navigator.userAgent;
    var modules = {};
	var Detect = Y.detect = {
		browser : function () {
			var ie = /msie/i.test(ua),
				ff = /firefox/i.test(ua),
				ch = /chrome/i.test(ua),
				sf = /safari/i.test(ua),
				op = /opera/i.test(ua),
				UA = {};
            (function() {
				if ( ie ) {
                    UA.ie = true;
                    UA.ver = parseInt(ua.match(/MSIE (\d+(\.\d+)?);/)[1]);
                    UA.name = ua.match(/MSIE/)[0];
					return;
				}
				if ( ff ) {
                    UA.firefox = true;
                    UA.ver = parseInt(ua.match(/Firefox\/(\d+(\.\d+)?)/)[1]);
                    UA.name = ua.match(/Firefox/)[0];
					return;
				}
				if ( ch ) {
                    UA.chrome = true;
                    UA.ver = parseInt(ua.match(/Chrome\/(\d+(\.\d+)?)/)[1]);
                    UA.name = ua.match(/Chrome/)[0];
					return;
				}
				if ( sf ) {
                    UA.safari = true;
                    UA.ver = parseInt(ua.match(/Safari\/(\d+(\.\d+)?)/)[1]);
                    UA.name = ua.match(/Safari/)[0];
					return;
				}
				if ( op ) {
                    UA.opera = true;
                    UA.ver = parseInt(ua.match(/Opera\/(\d+(\.\d+)?)/)[1]);
                    UA.name = ua.match(/Opera/)[0];
					return;
				}
            })()
			return UA;
		},
		support : function() {
            var vendors = ['webkit','Moz','ms','O'],
                node = doc.body,
                prefix,
                ani = false,
                tsf = false,
                aniProp ='' ,
                tsfProp = '';
            if ( node.style.animation !== undef ) {
                ani = true;
                aniProp = 'animation';
            }
            if ( node.style.transform !== undef ) {
                tsf = true;
                tsfProp = 'transform';
            }
            if ( !ani ) {
                for ( var i = 0, len = vendors.length; i < len; i++ ) {
                    if ( node.style[vendors[i] + 'Animation'] !== undef ) {
                        prefix = vendors[i];
                        aniProp = prefix + 'Animation';
                        ani = true;
                        break;
                    }
                }
            }
            if ( !tsf ) {
                for ( var i = 0, len = vendors.length; i < len; i++ ) {
                    if ( node.style[vendors[i] + 'Transform'] !== undef ) {
                        prefix = vendors[i];
                        tsfProp = prefix + 'Transform';
                        tsf = true;
                        break;
                    }
                }
            }
            return {
                animation : ani,
                animationProp : aniProp,
                transform : tsf,
                transformProp : tsfProp,
                vendor : prefix || 'Moz',
                event : {
                    start : prefix ? prefix + 'AnimationStart' : 'animationstart',
                    end   : prefix ? prefix + 'AnimationEnd' : 'animationend',
                    iteration : prefix ? prefix + 'AnimationIteration' : 'animationiteration'
                }
            }
        },
        isBelowIe10 : function() {
            var ua = this.browser();
            if ( ua.ie && ua.ver < 10 )  return true;
        }
	}

    var Dialog = Y.dialog = function(context,options) {
        this.options = options;
        this.element = $(context)
            .on('click','[data-bind="close"]',$.proxy(this.close,this));
        this.init();
    }
    Dialog.prototype = {
        constructor : Dialog,
        init : function() {
            this.show();
        },
        show : function() {
            this.isShow = true;
            this.element.removeClass('hidden');
            if (this.options.masker) {
                this.backdrop();
            }
        },
        close : function(e) {
            e.preventDefault();
            this.isShow = false;
            this.element.addClass('hidden');
            if (this.$backdrop[0] !== undefined ) {
                this.$backdrop.remove();
                this.$backdrop = null;
            }
        },
        backdrop : function () {
            if ( this.isShow ) {
                this.$backdrop = $('<div class="masker" />').appendTo(this.element.parent());
                if (this.options.static) {
                    this.$backdrop.click($.proxy(this.close,this));
                }
            }
        }
    }

    var Animation = Y.motion = {
        fadeIn : function() {},
        fadeOut : function() {},
        lightSpeedIn : function() {},
        lightSpeedOut : function() {}
    }

    var Canvas = Y.graph = {
        canvasList : [],
        core : function(options) {
            this.id = this.canvasList.push(this) -1;
            this.conf = {
                fps : 60,
                background : 'transparent'
            }
            this.originConfig = $.extend({},this.conf);
            this.conf = $.extend(this.config, typeof options == 'object' && options);

            if ( this.conf.element.nodeName && this.conf.element.nodeName.toLocaleLowerCase() === 'canvas' ) {
                this.canvasObj = this.conf.element;
            } else if ( typeof this.conf.element === 'string' ) {
                this.canvasObj = document.querySelector(this.conf.element)
            } else {
                return false;
            }

            if ( this.canvasObj.getContext('2d') ) {
                this.ctx = this.canvasObj.getContext('2d');
            } else {
                throw Error('Your browser do not support canvas');
            }
            var width = this.canvasObj.width;
            var height = this.canvasObj.height;
        },
        create : function(options) {
            return new Canvas.core(options);
        }
    }

    /**
     * Provides requestAnimationFrame in a cross browser way.
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
})(window.Ye, window.jQuery)



