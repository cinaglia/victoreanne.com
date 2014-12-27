$(function(){
    // Soundcloud
    $.stratus({
        auto_play: true,
        download: false,
        links: 'https://soundcloud.com/dual_bign/coldplay-paradise, https://soundcloud.com/r3hab/david-guetta-ft-fergie-cw-lmfao-getting-over-you-r3hab-bootleg, https://soundcloud.com/hengzai/psy-gangnam-style',
        random: true,
        buying: false,
        stats: false,
        user: false,
        volume: 40
    });

    // Update scroll spy callback
    function updateScrollSpy () {
        $('body').scrollspy('refresh');
    }

    // Gallery
    var $container = $('#masonry-gallery');
    $container.imagesLoaded( function(){
        $container.isotope({
            filter: '.item',
            masonry: {
                columnWidth: 240
            },
            transformsEnabled: false/*,
            onLayout: updateScrollSpy*/
        });
    });

    // Homage tabs
    $('#homage-tab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
        updateScrollSpy();
    });

    $('#rsvp-form input[type=submit]').click(function(e) {
        e.preventDefault();
        var $form = $('#rsvp-form');
        var $names = $form.find('input[type=text]').val();
        var $errorMsg = 'Desculpe, ocorreu um erro ao processar o(s) nome(s). Tente mais tarde ou envie um e-mail para <strong>casamento@victoreanne.com</strong>.';
        var $confirmation = $form.find('[name=confirmation]:checked').val();

        if (!$names) {
            alertify.error('Por favor, insira ao menos um nome.');
            return;
        }

        $form.addClass('loading');
        $.ajax({
            type: 'POST',
            url: '/rsvp.php',
            data: {'u': $names, 'c': $confirmation},
            success: function (data) {
                console.log(data);
                if (data == '0') {
                    alertify.error($errorMsg);
                } else if (data == '1') {
                    alertify.success( 'Obrigado por fazer a confirmação!' );
                    $form[0].reset();
                }
            },
            error: function() {
                alertify.error($errorMsg);
            },
            complete: function() {
                $form.removeClass('loading');
            }
        });
    });

    var $topElement = $('.go-top');
    evaluatePosition();

    $(window).on('scroll', function() {
        evaluatePosition();
    });

    function evaluatePosition () {
        var $top = $(window).scrollTop();
        var isVisible = $topElement.is(':visible');

        if ($top > 500 && !isVisible) {
            $topElement.show();
        } else if ($top < 500 && isVisible) {
            $topElement.hide();
        }
    }
});