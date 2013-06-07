;(function($){
    $.fn.zuruiLine = function(position, config){
        var target = $(this);
        // default style
        var defaults = {
            lineOpacity: "0.2",
            boxOpacity: "1"
        };
        var option = $.extend(defaults, config);
        position = position || "bottom";

        // CSS Building
        var bdr = "border-"+position;
        var boxrgba = "rgba(255,255,255, "+option.boxOpacity+ ")";
        var bsSize=" 0 1px 0";
        switch (position){
            case "top":
                bsSize=" 0 1px 0 inset";
                break;
            case "left":
                bsSize=" -1px 0 0";
                break;
            case "right":
                bsSize=" -1px 0 0 inset";
                break;
        }
        var boxProp=boxrgba+bsSize;

        // Execute
        target
            .css(bdr, "1px solid rgba(0,0,0, "+option.lineOpacity+")")
            .css({
                "-webkit-box-shadow": boxProp,
                "-moz-box-shadow": boxProp,
                "box-shadow": boxProp
            });

        // return jQuery Obj.
        return target;
    };

    $.fn.zuruiText = function(config) {
        var target = $(this);
        // css val.
        var txprop;

        // default style.
        var defaults = {
            bgType: "light",
            opacity:"1",
            pix:"1"
        };
        var tx = $.extend(defaults, config);

        // configure css value.
        if(tx.bgType==="light"){
            txprop="-"+tx.pix+"px " +tx.pix+"px 0 rgba(255,255,255,"+tx.opacity+")";
        }else if(tx.bgType==="dark") {
            txprop=tx.pix+"px -"+tx.pix+"px rgba(0,0,0,"+tx.opacity+")";
        }
        target.css("text-shadow", txprop);
        // return jQuery Obj.
        return target;
    };

    $.fn.zuruiGradient = function(color, percent){
        var target = $(this);
        // default value.
        percent = percent || 0.2;

        var prefix = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

        var endColor = $.dimming(color, percent);
        var ln ='linear-gradient('+endColor+' 0%, '+color +' 100%)';


        target.css("background-color", color);
        prefix.forEach(function(prf){
            target.css("background-image", prf+ln);
        });


        // return jQuery obj.
        return target;
    };

    $.fn.zuruiRadius = function(r, start, speed){
        var target = $(this);
        // intarval hash
        var intarvl ={
            'slow': 200,
            'middle': 100,
            'fast': 50
        };

        // initialize
        var t = intarvl[speed] || speed;
        r = r || 2;
        start = start || r * 3;

        // Animate
        if(speed){
             var timer = setInterval(function() {
                 var rad = start.toString() + 'px';
                 target.css({
                     "border-radius": rad
                 });

                 // increment or decrement
                 if(start < r){
                     start = start +1;
                     if(start > r)clearInterval(timer);
                 }else{
                     start = start -1;
                     if(start < r)clearInterval(timer);
                 }
             }, t)
        } else{
            target.css({
                "border-radius": r
            });
        }
        return target;
    };

    $.fn.zuruiBox = function(type) {
        var target = $(this);

        type = type || "inner";

        var style = "rgba(0,0,0,";
        var shadowType = {
            "outer": "0.15) 0 0 2px",
            "inner":"0.2) 0 0 20px inset"
        };
        target.css('box-shadow', style+shadowType[type]);

        return target;
    };

    $.fn.zuruiBoss = function(type, config){
        var target = $(this);

        var defaults = {
            "border": "0.1",
            "shadow":"0.1",
            "highlight": "1"
        };
        var tpHash = {
            "deboss": [' -1px 1px 2px inset,', ' -1px 1px 0'],
            "emboss": [' -1px 1px 0,',         ' -1px -1px 0 inset']
        };

        // build style
        var tp = tpHash[type];
        var prop = $.extend(defaults, config);
        var bdProp = "1px solid rgba(0,0,0,"+prop.border+")";
        var bxProp = "rgba(0,0,0,"+ prop.shadow + ")"+tp[0]
                    +"rgba(255,255,255," + prop.highlight+")"+tp[1];
        target.css('border', bdProp).css('box-shadow', bxProp);
        return  target;
    };

    /**
     * Fake method lighten() and darken() in SASS.
     */
    $.dimming = function(hex, percent) {
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        percent = percent || 0;
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * percent)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }
        return rgb;
    }

})(jQuery);

