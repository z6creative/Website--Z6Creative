(function($){
    
    $(document).ready(function () {
        
        /* ---------------------------------------------- /*
         * Anchor
        /* ---------------------------------------------- */

        $('body').scrollspy({
            target: '.navbar-inverse',
            offset: 50
        })

        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
                $(this).collapse('hide');
            }
        });
        
        $('.scroll-me a').bind("click", function(e){
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1000);
            e.preventDefault();
        });
        
        /* ---------------------------------------------- /*
         * Navbar
        /* ---------------------------------------------- */

        var navbar = $('#navbar');
        var navHeight = navbar.height();

        $(window).scroll(function() {
            var navbar2 = $('#navbar');
            var r = $('#services');
            var navHeight2 = r.offset().top-navbar2.height();
            if($(this).scrollTop() >= navHeight2) {
                navbar.addClass('navbar-color');
            }
            else {
                navbar.removeClass('navbar-color');
            }
        });


        if($(window).width() <= 767) {
            navbar.addClass('custom-collapse');
        }

        $(window).resize(function() {
            if($(this).width() <= 767) {
                navbar.addClass('custom-collapse');
            }
            else {
                navbar.removeClass('custom-collapse');
            }
        });
            
        /* ---------------------------------------------- /*
         * Contact form ajax
        /* ---------------------------------------------- */

        function isValidEmailAddress(emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress);
        };

        $("#contact-form").submit(function(e) {

            e.preventDefault();

            var c_name = $("#nome").val();
            var c_email = $("#email").val();
            var c_message = $("#mensagem").val();
            var responseMessage = $('.ajax-response');

            if (( c_name== "" || c_email == "" || c_message == "") || (!isValidEmailAddress(c_email) )) {
                responseMessage.fadeIn(500);
                responseMessage.html('<i class="fa fa-warning"></i> Preencha todos os campos corretamente.');
            }

            else {
                $.ajax({
                    type: "POST",
					crossDomain:"true",
                    url: "../main/php/contato.php",
                    dataType: 'json',
                    data: {
                        "f_email": c_email,
                        "f_nome": c_name,
                        "f_mensagem": c_message
                    },
                    beforeSend: function(result) {
                        $('#contact-form button').empty();
                        $('#contact-form button').append('<i class="fa fa-cog fa-spin"></i> Aguarde...');
                    },
                    complete: function(data) {
                        if(data.responseText == 'sucesso') {
                            responseMessage.html('Mensagem enviada com sucesso :)');
                            responseMessage.fadeIn(500);
                            $("#contact-form")[0].reset();
                            $('#contact-form button').html('<i class="fa fa-bullhorn icon-before"></i> Enviar');
                        } else {
                            $('#contact-form button').empty();
                            $('#contact-form button').append('<i class="fa fa-retweet"></i> Tente novamente.');
                            responseMessage.html('Algo deu errado :(<br>Tente novamente');
                            responseMessage.fadeIn(1000);
                        }
                    }
                });
            }

            return false;

        });
    });
})(jQuery);