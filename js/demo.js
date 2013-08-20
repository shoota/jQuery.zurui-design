$(function(){
    $("header")
        .zuruiGradient("#477936", -20)
        .zuruiText({bgType: "dark", opacity:0.4, pix:2});
    $("h2").zuruiText({bgType: "dark", opacity:0.2, pix:1}).zuruiLine();
    $(".example").zuruiRadius(2).zuruiBoss('deboss');
    $(".link > a")
        .zuruiRadius(4)
        .zuruiBoss('deboss');

    //demos----------------------------------------------------------------------

    // zurui line
    $(".line"+".default").zuruiLine();
    $(".line"+".pos").zuruiLine("left");
    $(".line"+".bd-opa").zuruiLine("top", {lineOpacity: "0.1"});
    $(".line"+".right").zuruiLine("bottom", {lineOpacity: "1", shadowOpacity:"0.1"});

    // zurui text-shadow
    $(".txshdw"+".default").zuruiText();
    $(".txshdw"+".l-op").zuruiText({opacity: "0.5"});
    $(".txshdw"+".dark").zuruiText({bgType: "dark"});
    $(".txshdw"+".d-op").zuruiText({bgType: "dark", opacity: "0.5"});

    // zurui gradation
    $(".example"+".default").zuruiGradient("#e6e4ce");
    $(".example"+".lighten").zuruiGradient("#e6e4ce", 30);
    $(".example"+".darken").zuruiGradient("#e6e4ce", -30);
    $('#begin-grad').on('change', function(e){
        var val = $(this).val();
        $(".example"+".default").zuruiGradient(val);
        $(".example"+".lighten").zuruiGradient(val, 30);
        $(".example"+".darken").zuruiGradient(val, -30);
    });

    // zurui radius
    $('.rad-box').zuruiRadius();
    $("#ani-rad").on('click', function() {
        $('.dyna-rad').zuruiRadius(4, 12, 'middle');
    });

    // zurui box
    $("#inner").zuruiBox().zuruiRadius(2);
    $("#outer").zuruiBox("outer").zuruiRadius(2);
    $("#deboss").zuruiBoss("deboss", {"border": "0.15", "shadow":"0.2", "highlight": "0.7"}).zuruiRadius(2);
    $("#emboss").zuruiBoss("emboss", {"border": "0.1", "shadow":"0.2", "highlight": "0.4"}).zuruiRadius(2);

});