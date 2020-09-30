define(['sha1', 'jcookie'], function() {
    return {
        init: function() {
            //二维码hover效果

            const $qr_code = $('.qr_code');
            $qr_code.hover(() => {
                $('.qr_img').stop(true).animate({
                    left: 10
                });
                $('.qrcode-help').stop(true).animate({
                    right: 10
                });
            }, () => {
                $('.qr_img').stop(true).animate({
                    left: 85
                });
                $('.qrcode-help').stop(true).animate({
                    right: -144
                });
            });

            const $section = $('.tab>section');


            // tab切换
            $section.on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                if ($(this).index() === 0) {
                    $('QR').show();
                    $('.login_box').hide();
                }
                if ($(this).index() === 1) {
                    $('QR').hide();
                    $('.login_box').show();
                }
            });


            $('.item5').on('click', function() {
                $('.msg-wrap').css({
                    visibility: 'hidden'
                });
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.13.24/jingdong/php/login.php',
                    data: {
                        user: $('.username').val(),
                        pass: hex_sha1($('.password').val())
                    }
                }).done(function(result) {
                    if (result) {
                        location.href = "index1.html";
                        // localStorage.setItem('username', $('.username').val());
                        $.cookie('username', $('.username').val(), {
                            expires: 7,
                            path: "/"
                        });

                    } else {
                        $('.password').val('');
                        $('.msg-wrap').css({
                            visibility: 'visible'
                        });
                    }
                });
            });



        }
    }
})