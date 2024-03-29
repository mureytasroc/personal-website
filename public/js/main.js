(function ($) {
    "use strict";
    // Subpages resize
    function subpages_resize() {
        let subpagesHeight = $(".pt-page-current").css("height");
        $(".subpages").height(subpagesHeight + 50);
    }

    // Portfolio subpage filters
    function portfolio_init() {
        $("#portfolio_grid").shuffle({
            speed: 450,
            itemSelector: "figure",
        });

        $(".site-main-menu").on("click", "a", function (e) {
            $("#portfolio_grid").shuffle("update");
        });

        $("#portfolio_filters").on("click", ".filter", function (e) {
            $("#portfolio_grid").shuffle("update");
            e.preventDefault();
            $("#portfolio_filters .filter").parent().removeClass("active");
            $(this).parent().addClass("active");
            $("#portfolio_grid").shuffle("shuffle", $(this).attr("data-group"));
            subpages_resize();
        });
    }
    // /Portfolio subpage filters

    // Hide Mobile menu
    function mobileMenuHide() {
        if ($(window).width() < 1024) {
            $("#site_header").addClass("mobile-menu-hide");
        }
    }
    // /Hide Mobile menu

    //On Window load & Resize
    $(window)
        .on("load", function () {
            //Load
            // initializing page transition.
            if ($(".subpages")[0]) {
                PageTransitions.init({
                    menu: "ul.site-main-menu",
                });
            }
        })
        .on("resize", function () {
            //Resize
            mobileMenuHide();

            setTimeout(function () {
                subpages_resize();
            }, 500);
        })
        .scroll(function () {
            if ($(window).scrollTop() < 20) {
                $(".header").removeClass("sticked");
            } else {
                $(".header").addClass("sticked");
            }
        })
        .scrollTop(0);

    // On Document Load
    $(document).on("ready", function () {
        // Initialize Portfolio grid
        $("#portfolio-grid").imagesLoaded(function () {
            portfolio_init(this);
        });

        // Portfolio hover effect init
        $(" #portfolio_grid > figure ").each(function () {
            $(this).hoverdir();
        });

        // Blog grid init
        setTimeout(function () {
            $(".blog-masonry").masonry();
        }, 500);

        // Mobile menu
        $(".menu-toggle").on("click", function () {
            $("#site_header").toggleClass("mobile-menu-hide");
        });

        // Mobile menu hide on main menu item click
        $(".site-main-menu").on("click", "a", function (e) {
            mobileMenuHide();
        });

        // Sidebar toggle
        $(".sidebar-toggle").on("click", function () {
            $("#blog-sidebar").toggleClass("open");
        });

        // Testimonials Slider
        $(".testimonials.owl-carousel").owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 3, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 25,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                // breakpoint from 480 up
                480: {
                    items: 1,
                },
                // breakpoint from 768 up
                768: {
                    items: 2,
                },
                1200: {
                    items: 2,
                },
            },
        });

        // Text rotation
        $(".text-rotation").owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: "zoomOut",
            animateIn: "zoomIn",
        });

        // Lightbox init
        $("body").magnificPopup({
            delegate: "a.lightbox",
            type: "image",
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: "mfp-fade",
            image: {
                // options for image content type
                titleSrc: "title",
                gallery: {
                    enabled: true,
                },
            },

            iframe: {
                markup:
                    '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                    "</div>", // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: "youtube.com/", // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: null, // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: "%id%?autoplay=1", // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: "vimeo.com/",
                        id: "/",
                        src: "//player.vimeo.com/video/%id%?autoplay=1",
                    },
                },

                srcAction: "iframe_src", // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr("title");
                },
            },
        });

        $(".ajax-page-load-link").magnificPopup({
            type: "ajax",
            removalDelay: 300,
            mainClass: "mfp-fade",
            gallery: {
                enabled: true,
            },
        });

        //Form Controls
        $(".form-control")
            .val("")
            .on("focusin", function () {
                $(this).parent(".form-group").addClass("form-group-focus");
            })
            .on("focusout", function () {
                if ($(this).val().length === 0) {
                    $(this)
                        .parent(".form-group")
                        .removeClass("form-group-focus");
                }
            });

        // Coursework accordion
        const acc = document.getElementsByClassName("timeline-item");
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                const itemDescriptions =
                    this.getElementsByClassName("item-description");
                for (let j = 0; j < itemDescriptions.length; j++) {
                    if (itemDescriptions[j].style.display === "block") {
                        itemDescriptions[j].style.display = "none";
                    } else {
                        itemDescriptions[j].style.display = "block";
                    }
                }
            });
        }

        // Add email
        const user = "ccunning";
        const domain = "seas.upenn.edu";
        const email = user + "@" + domain;
        $("#address_field").html(
            '<a href="mailto:' + email + '">' + email + "</a>"
        );
    });
})(jQuery);
