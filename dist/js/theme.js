var $site = {
    navBreakpoint: 992,
    init: function () {
       this.navigation.init();
      //  this.navigation.scroll();
     //   this.sliders();
     //   this.accordion();
     //   this.searchPopup();
    },
    navigation: {
        init: function () {
            /**
             * Open Dropdown submenu on hover for Desktop navigation
             */
            // $(".nav-link.dropdown-toggle").hover(function () {
            $(".nav-item.dropdown").hover(function () {
                // Open up the dropdown
                var link = $(this).find("> .dropdown-toggle").first();
                link.removeAttr('data-toggle'); // remove the data-toggle attribute so we can click and follow link
                link.parent().addClass('show'); // add the class show to the li parent
                link.next().addClass('show'); // add the class show to the dropdown div sibling
                link.next().removeClass('slideOut').addClass('slideIn'); // add the class show to the dropdown div sibling
                setTimeout(function () {
                    link.next().addClass('animate'); // add the class show to the dropdown div sibling
                }, 25)

            }, function () {

                var link = $(this).find("> .dropdown-toggle").first();
                // no longer hovering over either - lets remove the 'show' classes
                link.attr('data-toggle', 'dropdown'); // put back the data-toggle attr
                link.next().removeClass('slideIn').addClass("slideOut");

                setTimeout(function () {
                    link.parent().removeClass('show');
                    link.next().removeClass('show');
                    link.next().removeClass("slideOut").removeClass("animate");
                }, 250);
            });
        },
        scroll: function () {
            var headroom = new Headroom(document.querySelector("#header"), {
                "offset": 205,
                "tolerance": 5,
                "classes": {
                    "unpinned": "navbar-up"
                }
            });
            headroom.init();
        }
    },

    googleMaps: function () {

        $(".map-container").each(function () {

            var $that = $(this);

            var locations = $that.data("locations");
            if (locations.length > 0) {
                var center = new google.maps.LatLng(locations[0]['lat'], locations[0]['long']);
                var mapoptions = {
                    center: center,
                    zoom: 2,
                    scrollwheel: false,
                };

                var map = new google.maps.Map($that[0], mapoptions);

                for (var i = 0; i < Object.keys(locations).length; i++) {
                    // Set markers on the map
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(locations[i]['lat'], locations[i]['long']),
                        map: map,
                        icon: {
                            url: "img/pin.png",
                            scaledSize: new google.maps.Size(151, 120), // size
                        }
                    });
                }
            }
        });
    },

    accordion: function () {
        $(".accordion > div").on('show.bs.collapse', function () {
            $(this).toggleClass("active")
        });

        $(".accordion > div").on('hide.bs.collapse', function () {
            $(this).toggleClass("active")
        })
    },

    searchPopup: function () {
        $('#search-box-modal').on('shown.bs.modal', function (e) {
            $('input[name=s]').focus();
        })
    },

    sliders: function () {

        // Hero slider
        //
        if ($(".hero-slider").length > 0) {
            tns({
                container: ".hero-slider",
                items: 1,
                swipeAngle: 20,
                mouseDrag: true,
                controlsPosition: "bottom",
                center: true,
                gutter: 0,
                navPosition: "bottom",
                controlsText: ['prev<i class="icon-chevron-left-solid"></i>',
                    'next<i class="icon-chevron-right-solid"></i>']
            });
        }

    }
}

$("document").ready(function () {
    $site.init();
});
if (typeof google != "undefined") {
    google.maps.event.addDomListener(window, 'load', $site.googleMaps);
}