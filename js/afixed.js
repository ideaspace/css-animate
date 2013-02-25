(function($){
    var fixAside = function( element, offset ) {
        this.$node = $( element );
        this.pos = this.$node.offset();
        this.offset = parseInt(offset);
        this.$win  = $( window ).on('scroll', $.proxy( this.checkPos, this ));
    }
    fixAside.prototype = {
        constructor : fixAside,
        checkPos : function () {
            var t = this;
            var scrollTop = this.$win.scrollTop();
            if ( scrollTop + this.offset > this.pos.top ) {
                this.$node.addClass("fixed");
            } else {
                this.$node.removeClass("fixed");
            }
        }
    }
    new fixAside(".span-1 > .inner", 40)

    var scrollSpy = function( element ) {
        this.$node = $( element ).on("click", $.proxy(this.click,this));
        this.$anchor = this.$node.find('a');
        this.$first = this.$node.find('li:first').addClass("active")
        this.$win = $(window).on("scroll", $.proxy(this.spy, this));
    }

    scrollSpy.prototype = {
        constructor : scrollSpy,
        nodeTop : function ( elem ) {
            var id = elem.attr("href");
            var offset = 40;
            return $(id).offset().top - offset;
        },
        click : function(e) {
            var t = this;
            if (e.target.nodeName == "A") {
                $('html, body').stop().animate({
                    scrollTop : t.nodeTop($(e.target))
                },500);
            }
            e.preventDefault();
        },
        spy : function () {
            var t = this;
            var scrollTop = this.$win.scrollTop();
            for ( var i=0, len = this.$anchor.length; i < len; i++) {
                var sect = $(this.$anchor[i]);
                var top  = t.nodeTop(sect);
                if ( scrollTop > top - 40 ) {
                    this.$anchor.parent().removeClass("active");
                    sect.parent().addClass("active");
                }

            }
        }
    }

    new scrollSpy(".span-1 > .inner");
})(window.jQuery)
