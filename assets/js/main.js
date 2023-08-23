//No JS
(function (H) {
    H.className = H.className.replace(/\bno-js\b/, 'js');
})(document.documentElement);

//Page transition - opacity
window.transitionToPage = function (href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function () {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function (event) {
    document.querySelector('body').style.opacity = 1;
});

//Animation on scroll (AOS)
$(document).ready(function () {
    AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
        delay: 100
    });
});

//WOW
$(document).ready(function () {
    new WOW().init();
});

//Cursor
$(document).ready(function () {
    var cursor = document.getElementById('cursor');
    window.addEventListener('mousemove', function (e) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
    });

    //Cursor hover zoom
    $("nav a, h1 a, button").hover(function () {
        $("#cursor").addClass("zoom");
        //console.log("is this thing on")
    }, function () {
        $("#cursor").removeClass("zoom");
    });
});

//Back to top
$(document).ready(function () {

    var $backToTop = $(".back-to-top");
    var $footer = $(".contact-footer");
    //var $switch = $(".switch");
    $backToTop.hide();

    $(window).on('scroll', function () {

        if ($(this).scrollTop() > 200) {
            $backToTop.fadeIn(500);
        } else {
            $backToTop.fadeOut(500);
        }

        if ($(window).scrollTop() + $(window).height() < $(document).height() - $footer.height()) {
            $backToTop.css("position", "fixed");
            $backToTop.css("bottom", "0");
            //$switch.css("position", "fixed");
            //$switch.css("bottom", "0");
        }
        if ($(window).scrollTop() + $(window).height() > $(document).height() - $footer.height()) {
            $backToTop.css("position", "relative");
            $backToTop.css("bottom", "50px");
            //$switch.css("position", "relative");
            //$switch.css("bottom", "0");
        }

    });

    $backToTop.click(function (e) {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    });

});

//Morphext
$(document).ready(function () {
    $("#js-rotating").Morphext({
        animation: "animate__animated animate__fadeInUp",
        separator: ",",
        speed: 2500,
        complete: function () {}
    });
});

//Flickity
$(document).ready(function () {
    $('.carousel, .carousel-single-slide').flickity({
        // options
        autoPlay: false,
        adaptiveHeight: true,
        prevNextButtons: true,
        pageDots: true,
        wrapAround: true,
        setGallerySize: true,
        fullscreen: true,
        percentPosition: true,
        imagesLoaded: true,
        pauseAutoPlayOnHover: false,
        lazyLoad: true,
        cellAlign: 'left',
        contain: true
    });

    $(".carousel-single-slide .flickity-prev-next-button").css("display", "none");
    $(".carousel-single-slide .flickity-page-dots").css("display", "none");
});

//Lazyload
$(document).ready(function () {
    var lazyLoadInstance = new LazyLoad({});
});

//Pace Safari iOS (Low Power Mode) Fix
$(document).ready(function () {
    var initDestroyTimeOutPace = function () {
        var counter = 0;
        var refreshIntervalId = setInterval(function () {
            var progress;
            if (typeof document.querySelector('.pace-progress').getAttribute('data-progress-text') !== 'undefined') {
                progress = Number(document.querySelector('.pace-progress').getAttribute('data-progress-text').replace("%", ''));
            }
            if (progress === 99) {
                counter++;
            }
            if (counter > 50) {
                clearInterval(refreshIntervalId);
                Pace.stop();
            }
        }, 100);
    }
    initDestroyTimeOutPace();
});

//Hide logo on scroll 1
$(document).ready(function () {
    window.onscroll = function (e) {
        var logo = document.querySelector('.logo');

        (scrollY <= Math.max(this.lastScroll, 300) /*|| window.innerWidth <= 1200*/ || this.loaded === undefined) ?
        logo.setAttribute('style', 'opacity: 1 !important'): logo.setAttribute('style', 'opacity: 0 !important');

        this.lastScroll = scrollY;
        this.loaded = true;
    }
});

/*//Hide logo on scroll 2
$(document).ready(function () {
    (function ($) {
        var prev = 0;
        var $window = $(window);
        var nav = $('.logo');

        $window.on('scroll', function () {
            var scrollTop = $window.scrollTop();
            nav.toggleClass('hide-logo', scrollTop > prev);
            prev = scrollTop;
        });

        $(window).scroll(function () {
            if ($(this).scrollTop() <= 300) {
                $('.logo').removeClass('hide-logo');
            }
        });

    })(jQuery);
});*/

//Light Mode
$(document).ready(function () {
    var themeSwitch = document.getElementById('themeSwitch');

    function validate() {
        var themeSwitch = document.getElementById("themeSwitch");
        if (themeSwitch.checked) {
            $(".Tooltip").text("Set theme to dark (⇧+L)");
        } else {
            $(".Tooltip").text("Set theme to light (⇧+L)");
        }
    }

    validate();

    if (themeSwitch) {
        initTheme(); // on page load, if user has already selected a specific theme -> apply it

        themeSwitch.addEventListener('change', function (event) {
            resetTheme(); // update color theme
        });

        function initTheme() {
            var darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'light');
            // update checkbox
            themeSwitch.checked = darkThemeSelected;
            // update body data-theme attribute
            darkThemeSelected ? document.body.setAttribute('data-theme', 'light') : document.body.removeAttribute('data-theme');
            validate();
        };

        function resetTheme() {
            if (themeSwitch.checked) { // dark theme has been selected
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('themeSwitch', 'light'); // save theme selection 
            } else {
                document.body.removeAttribute('data-theme');
                localStorage.removeItem('themeSwitch'); // reset theme selection
            }
            validate();
        };

    }

    const checkbox = document.getElementById('themeSwitch');

    document.onkeyup = function (e) {
        var e = e || window.event; // for IE to cover IEs window event-object
        if ("L" === e.key && e.shiftKey) {
            checkbox.click(function (e) {
                var checked;
                if (e.isTrigger) { // Logic when click is triggered
                    checked = true;
                    if (this.checked) {
                        checked = false;
                    }
                } else { // Explicit click 
                    checked = this.checked;
                }
            });
            return false;
        }
    }

});

//Buttons
$(document).ready(function () {

    var $cookieButton = $(".cookieconsent-button");

    $cookieButton.click(function (e) {
        $(".cookieconsent-container").css("transform", "translateY(100%)");
    });

    var $scrollDownButton = $(".fa-caret-down");

    $scrollDownButton.click(function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cpeople-case-study").offset().top
        }, 500);
    });

    var $belowLink = $(".below-link");

    $belowLink.click(function (e) {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#cpeople-case-study").offset().top
        }, 500);
    });
});

//Social Icons Opacity
$(document).ready(function () {
    //Hover
    $(".fa-dribbble").hover(function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").addClass("opacity");
    }, function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").removeClass("opacity");
    });
    $(".fa-instagram").hover(function () {
        $(".fa-dribbble, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").addClass("opacity");
    }, function () {
        $(".fa-dribbble, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").removeClass("opacity");
    });
    $(".fa-spotify").hover(function () {
        $(".fa-dribbble, .fa-instagram, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").addClass("opacity");
    }, function () {
        $(".fa-dribbble, .fa-instagram, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-medium").removeClass("opacity");
    });
    $(".fa-linkedin").hover(function () {
        $(" .fa-dribbble, .fa-instagram, .fa-spotify, .fa-facebook, .fa-twitter, .fa-medium").addClass("opacity");
    }, function () {
        $(" .fa-dribbble, .fa-instagram, .fa-spotify, .fa-facebook, .fa-twitter, .fa-medium").removeClass("opacity");
    });
    $(".fa-facebook").hover(function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-dribbble, .fa-twitter, .fa-medium").addClass("opacity");
    }, function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-dribbble, .fa-twitter, .fa-medium").removeClass("opacity");
    });
    $(".fa-twitter").hover(function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-dribbble, .fa-medium").addClass("opacity");
    }, function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-dribbble, .fa-medium").removeClass("opacity");
    });
    $(".fa-medium").hover(function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-dribbble").addClass("opacity");
    }, function () {
        $(".fa-instagram, .fa-spotify, .fa-linkedin, .fa-facebook, .fa-twitter, .fa-dribbble").removeClass("opacity");
    });
});

//Learn More - Eyes
$(document).ready(function () {
    //Hover
    $(".home-intro-about-button").hover(function () {
        $(".home-intro-about-eyes").addClass("show-eyes");
        $(".home-intro-circle").addClass("hide-circle");
    }, function () {
        $(".home-intro-about-eyes").removeClass("show-eyes");
        $(".home-intro-circle").removeClass("hide-circle");
    });
});

var toggle = true;
setInterval(function () {
    var d = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/Moscow',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });
    var parts = d.split(":");
    $('#hours').text(parts[0]);
    $('#minutes').text(parts[1]);
    $("#colon").css({
        visibility: toggle ? "visible" : "hidden"
    });
    toggle = !toggle;
}, 1000);

var toggle2 = true;
setInterval(function () {
    var d2 = new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/New_York',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });
    var parts = d2.split(":");
    $('#hours2').text(parts[0]);
    $('#minutes2').text(parts[1]);
    $("#colon2").css({
        visibility: toggle2 ? "visible" : "hidden"
    });
    toggle2 = !toggle2;
}, 1000);

var toggle3 = true;
setInterval(function () {
    var d3 = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Europe/London',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });
    var parts = d3.split(":");
    $('#hours3').text(parts[0]);
    $('#minutes3').text(parts[1]);
    $("#colon3").css({
        visibility: toggle3 ? "visible" : "hidden"
    });
    toggle3 = !toggle3;
}, 1000);


/*// Change page title
$(document).ready(function () {
    // Get page title
    var pageTitle = $("title").text();

    // Change page title on blur
    $(window).blur(function () {
        $("title").text("I miss you 💞");
    });

    // Change page title back on focus
    $(window).focus(function () {
        $("title").text(pageTitle);
    });
});*/