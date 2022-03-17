$(document).ready(function() {

    $('.mobile_btn').click(function() {
        $(this).toggleClass('active')
        $('.menu').toggleClass('open');
    });
    $('.logo,.wrapper,.menu a').click(function() {
        if ($('.menu a').width() != 0) {
            $('.menu').removeClass('open');
            $('.mobile_btn').removeClass('active');
        }
    });
    $(".menu").on("click", function(event) {
        event.stopPropagation();
    });
     if ($(window).width() >= 1200) {
        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 50) {
                $('.menuScroll').css('display', 'block');
                $('.toggleMenu').css('display', 'none');
                $('.menu').removeClass('open');
                $('.mobile_btn').removeClass('active');
            } else {
                $('.menuScroll').css('display', 'none');
                $('.toggleMenu').css('display', 'block');
            }
        });
    }
    
    $('.slide1').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        centerMode: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        customPaging: function(slider, i) {
            return '<a ><img src="./assets/images/dots.png" /><img src="./assets/images/dotsActive.png" /></a>';
        },
    });

    $('.slide2').slick({
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        customPaging: function(slider, i) {
            return '<a ><img src="./assets/images/dots.png" /><img src="./assets/images/dotsActive.png" /></a>';
        },
    });
    $('.slideNews').slick({
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
        customPaging: function(slider, i) {
            return '<a ><img src="./assets/images/dots.png" /><img src="./assets/images/dotsActive.png" /></a>';
        },
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });
    $('.slidePartner').slick({
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [{
            breakpoint: 1119,
            settings: {
                slidesToShow: 3,
            },
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
            },

        }]
    });

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.headerTop').addClass('headerScroll');
            $('.imgLogoScroll').css('display', 'block');
            $('.imgLogo').css('display', 'none');
        } else {
            $('.headerTop').removeClass('headerScroll');
            $('.imgLogoScroll').css('display', 'none');
            $('.imgLogo').css('display', 'block');
        }
    });
    // scroll menu
    $('.menu a,.logo a,.menuScroll a,.regisCar a').click(
        function(event) {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 50
            }, 500);
            event.preventDefault();
        });

    // scroll top
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('.scrollTop').fadeIn();
        } else {
            $('.scrollTop').fadeOut();
        }
    });
    $(".scrollTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });

    //API

});