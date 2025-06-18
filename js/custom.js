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

    /* ----------------------------------------------------------- */
    /*  AJAX CONTACT FORM
    /* ----------------------------------------------------------- */

    $(".formcontact").on("submit", function() {
        $(".output_message").text("Sending...");
        var form = $(this);
        $.ajax({
            url: form.attr("action"),
            method: form.attr("method"),
            data: form.serialize(),
            success: function(result) {
                if (result  ==="success") {
                    $(".contactform").find(".form-message").addClass("d-block");
                    $(".contactform").find(".output_message").addClass("success");
                    $(".output_message").html("Your Message has been Sent!");
                    $(".formcontact")[0].reset();
                } else {
                    $(".contactform").find(".form-message").addClass("d-block");
                    $(".contactform").find(".output_message").addClass("d-block error");
                    $(".output_message").text("Error Sending!");
                }
            }
        });
        return false;
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

        const formParams = {
            name: fromNameInput ? fromNameInput.value : '',
            reply_to: replyToInput ? replyToInput.value : '',
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