$(function() {

    "use strict";

    /* ----------------------------------------------------------- */
    /*  REMOVE # FROM URL
    /* ----------------------------------------------------------- */

    $("a[href='#']").on("click", (function(e) {
        e.preventDefault();
    }));

    /* ----------------------------------------------------------- */
    /*  MENU ANIMATION
    /* ----------------------------------------------------------- */

    $('#navigation li a').on('click', function () {
        setTimeout(function() {
            $('.navigation-trigger').click();
        }, 800);
    });
    var offset = 300;
    var navigationContainer = $('#navigation'),
    mainNavigation = navigationContainer.find('#main-navigation ul');
    checkMenu();
    $('.navigation-trigger').on('click', function(){
        $(this).toggleClass('menu-is-open');
        mainNavigation.off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').toggleClass('is-visible');
        setTimeout(function() {
            ResumeCarousels();
        }, 1200);
    });
    function checkMenu() {
        navigationContainer.find('.navigation-trigger').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
            mainNavigation.addClass('has-transitions');
        });
    }

    /* ----------------------------------------------------------- */
    /*  PORTFOLIO GRID ITEM ANIMATION ON HOVER
    /* ----------------------------------------------------------- */

    $('.grid__item a').each(function() {
        $(this).on('mouseenter', function() {
            var portfolioTitle = $('.item-title-hover');
            if ($(this).data('title')) {
                portfolioTitle.html($(this).data('title') + '<span class="item-category">' + $(this).data('category') + '</span>');
                portfolioTitle.addClass('visible');
            }
            $(document).on('mousemove', function(e) {
                $('.item-title-hover').css({
                    left: e.clientX - 10,
                    top: e.clientY + 25
                });
            });
        }).on('mouseleave', function() {
            $('.item-title-hover').removeClass('visible');
        });
    });

    /* ----------------------------------------------------------- */
    /*  PAGE TRANSITION
    /* ----------------------------------------------------------- */

    var links = [...document.querySelectorAll('.link-page')];
    var breaker = document.querySelector('#transitionblock');
    links.forEach(link => link.addEventListener('click', function (e) {
        var $el = $(this);
        setTimeout(function () {
            $('#main-navigation li a').removeClass('active');
            $el.addClass('active');
        }, 1000);
        e.preventDefault();
        var page = link.getAttribute("href");
        if (document.querySelector(page)) {
            if (page != "#home") {
                setTimeout(function () {
                    $('#wrapper').css('overflow','auto');
                }, 1000);
            } else {
                setTimeout(function () {
                    $('#wrapper').css('overflow','hidden');
                }, 1000);
            }
            function transitionblock() {
                breaker.style.display = 'block';
                breaker.addEventListener('animationend', function () {
                    this.style.display = "none";
                })
            }
            transitionblock()
            function changepage() {
                var pages = links.map(a => a.getAttribute("href"))
                if ($(window).width() > 991) {
                    setTimeout(function () {
                        pages.forEach(a => document.querySelector(a).style.display = 'none');
                        document.querySelector(page).style.display = 'block';
                        $( ".simplebar-content-wrapper" ).scrollTop(0);

                    }, 1000);
                } else {
                    setTimeout(function () {
                        pages.forEach(a => document.querySelector(a).style.display = 'none');
                        document.querySelector(page).style.display = 'block';
                        $("#wrapper").scrollTop(0);

                    }, 1000);
                }
            }
            changepage()
        }
    }))

    /* ----------------------------------------------------------- */
    /*  EXPERIENCE & EDUCATION CAROUSELS
    /* ----------------------------------------------------------- */
    function ResumeCarousels() {
        $('#experience').on('click', function () {
            $('#educationcarousel').owlCarousel('destroy');
            $('#experience').addClass('active');
            $('#education').removeClass('active');
            $('#educationcarousel').removeClass('visiblecarousel').addClass('hiddencarousel');
            $('#experiencecarousel').removeClass('hiddencarousel').addClass('visiblecarousel');
            $('#experiencecarousel').owlCarousel({
                loop: false,
                margin: 30,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        dots: true
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        });
        $('#education').on('click', function () {
            $('#experiencecarousel').owlCarousel('destroy');
            $('#education').addClass('active');
            $('#experience').removeClass('active');
            $('#experiencecarousel').removeClass('visiblecarousel').addClass('hiddencarousel');
            $('#educationcarousel').removeClass('hiddencarousel').addClass('visiblecarousel');
            $('#educationcarousel').owlCarousel({
                loop: false,
                margin: 30,
                nav: false,
                responsive: {
                    0: {
                        items: 1,
                        dots: true
                    },
                    768: {
                        items: 2
                    },
                    992: {
                        items: 3
                    }
                }
            });
        })
    }
    if ($("body").hasClass("index")) {
        $('#experiencecarousel').owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            responsive: {
                0: {
                    items: 1,
                    dots: true
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
        ResumeCarousels();
    }
    /* ----------------------------------------------------------- */
    /*  RE-INITALIZE EXPERIENCE CAROUSEL IF ABOUT SECTION WAS HIDDEN
    /* ----------------------------------------------------------- */

    $('.link-about').on('click', function() {
        setTimeout(function () {
            $('#experiencecarousel').owlCarousel('destroy');
            $('#experiencecarousel').owlCarousel({
                loop:false,
                margin:30,
                nav: false,
                responsive:{
                    0:{
                        items:1,
                        dots:true
                    },
                    768:{
                        items:2
                    },
                    992:{
                        items:3
                    }
                }
            });
        }, 2000);
    });

    /* ----------------------------------------------------------- */
    /*  UPDATE ACTIVE ITEMS IN NAVIGATION
    /* ----------------------------------------------------------- */

    $('#link-about').on('click', function() {
        setTimeout(function () {
            $('#main-navigation li a').removeClass('active');
            $('#main-navigation li a.link-about').addClass('active');
            if ($('.navigation-trigger').hasClass('menu-is-open')) {
                $('.navigation-trigger').click();
            }
            ResumeCarousels();
        }, 1000);
    });

    $(window).on('resize',function(){

        /* ----------------------------------------------------------- */
        /*  RE-INITIALIZE OWL CAROUSEL ON RESIZE
        /* ----------------------------------------------------------- */

        if ($("body").hasClass("index")) {
            $('#experiencecarousel').owlCarousel('destroy');
            $('#educationcarousel').owlCarousel('destroy');
            if ($('#experiencecarousel').hasClass('visiblecarousel')) {
                $('#experiencecarousel').owlCarousel({
                    loop: false,
                    margin: 30,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1,
                            dots: true
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        }
                    }
                });
            } else {
                $('#educationcarousel').owlCarousel({
                    loop: false,
                    margin: 30,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1,
                            dots: true
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        }
                    }
                });
            }
        }
    });
});
$(window).on("load", function() {

    /* ----------------------------------------------------------- */
    /*  PAGE PRELOADER
    /* ----------------------------------------------------------- */

    $("body").toggleClass("loaded");
    setTimeout(function() {
        $("body").addClass("loaded");
    }, 1000);
});
const localTime = new Date().toLocaleString("en-US", {
    timeZone: "America/Denver",
    timeZoneName: "short"
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (typeof grecaptcha === "undefined") {
            alert("reCAPTCHA is not ready yet. Please wait and try again.");
            return;
        }

        const recaptchaToken = grecaptcha.getResponse();

        if (!recaptchaToken) {
            alert("Please complete the reCAPTCHA.");
            return;
        }

        const localTimeInput = document.getElementById("local_time");
        if (localTimeInput) {
            localTimeInput.value = new Date().toLocaleString();
        }

        const fromNameInput = document.getElementById("name");
        const replyToInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        const subjectInput = document.getElementById("subject");

        const formParams = {
            name: fromNameInput ? fromNameInput.value : '',
            reply_to: replyToInput ? replyToInput.value : '',
            subject: subjectInput ? subjectInput.value : '',
            message: messageInput ? messageInput.value : '',
            local_time: localTimeInput ? localTimeInput.value : '',
            'g-recaptcha-response': recaptchaToken
        };

        emailjs.send("service_boy3p0r", "template_miqi1hm", formParams)
            .then(() => {
                alert("Email sent successfully!");
                form.reset();
                grecaptcha.reset();
            })
            .catch((error) => {
                console.error("Email failed:", error);
                alert("Something went wrong. Please try again later.");
            });
    });
});



particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#00c9b7", "#ff6b6b", "#ffd166"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00c9b7",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});