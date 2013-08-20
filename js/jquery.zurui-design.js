;(function($){
    $.fn.zuruiLine = function(position, config){
        var target = $(this);
        // default style
        var defaults = {
            lineOpacity: "0.2",
            shadowOpacity: "1"
        };
        var option = $.extend(defaults, config);
        position = position || "bottom";

        // CSS Building
        var bdr = "border-"+position;
        var boxrgba = "rgba(255,255,255, "+option.shadowOpacity+ ")";
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
        percent = percent || 20;

        var prefix = ['-webkit-', '-moz-', '-o-', '-ms-', ''];

        var endColor = $.dimming(color, percent);
        console.log(color);
        console.log(endColor);
        var ln ='linear-gradient('+color +' 0%, '+endColor+' 100%)';

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

        type = type || "deboss";

        var defaults = {
            "border": "0.1",
            "shadow":"0.1",
            "highlight": "1"
        };
        var tpHash = {
            "deboss": [' -1px 1px 2px inset,', ' -1px 1px 0'],
            "emboss": [' -1px 1px 0,',' -1px -1px 0 inset']
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
        var hasHash=(hex[0]=='#');
        if(hasHash) hex=hex.slice(1);
        var num=parseInt(hex, 16);

        // Red
        var R = (num>>16)+percent;
        if(R>255) R=255;
        else if(R<0)R=0;

        // Blue
        var B = ((num>>8) & 0x00FF)+percent;
        if(B>255)B=255;
        else if(B<0)B=0;

        // Green
        var G = (num & 0x0000FF)+percent;
        if(G>255)G=255;
        else if(G<0)G=0;
        return '#'+(G|(B<<8)|(R<<16)).toString(16);
    }

})(jQuery);

