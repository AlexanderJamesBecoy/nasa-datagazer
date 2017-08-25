const shell = require('electron').shell;

$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    shell.openExternal(this.href);
});

// Wrapper Nav
$(document).ready(function() {
    $(".wrapper-nav ul li").on('click', function() {
        $('.wrapper-nav ul li.wrapper-nav-active').removeClass('wrapper-nav-active');
        $(this).addClass('wrapper-nav-active');
    });
});

// Functions
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
var transitionEvent = whichTransitionEvent();

// Sidebar
$(document).ready(function() {
    var isHover;

    $(".sidebar").hover(
        function(e) {
            $('.sidebar-layer').css('visibility', 'visible');
            $('.sidebar-layer').css('background-color', 'rgba(0, 0, 0, 0.4)');
            isHover = true;
        },
        function(e) {
            if(isHover) {
                $('.sidebar-layer').css('background-color', 'rgba(0, 0, 0, 0)');
                isHover = false;
                $('.sidebar-layer').one(transitionEvent, function(event) {
                    $('.sidebar-layer').css('visibility', 'hidden');
                });
            }
        }
    );
});
