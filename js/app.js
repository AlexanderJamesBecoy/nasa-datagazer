var transitionEvent = whichTransitionEvent();

$(document).ready(function() {
    $(".sidebar").hover(
        function(e) {
            $('.sidebar-layer').css('visibility', 'visible');
            $('.sidebar-layer').css('background-color', 'rgba(0, 0, 0, 0.8)');
        },
        function(e) {
            $('.sidebar-layer').css('background-color', 'rgba(0, 0, 0, 0)');
            $('.sidebar-layer').one(transitionEvent, function(event) {
                $('.sidebar-layer').css('visibility', 'hidden');
            });
            
        }
    );
});

function whichTransitionEvent() {
    var t,
        el = document.createElement("fakeelement");
    
    var transitions = {
        "transition"        : "transitionend",
        "OTransition"       : "oTransitionEnd",
        "MozTransition"     : "transitionend",
        "WebkitTransition"  : "webkitTransitionEnd"
    }
    
    for (t in transitions){
        if (el.style[t] !== undefined) {
            return transitions[t];
        }
    }
}