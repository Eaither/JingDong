define(['sha1'], function() {
    return {
        init: function() {
            // 获取元素
            var $username = $('.username'); //用户名
            var $password = $('.password'); //密码啊
            var $repass = $('.psd_s'); //确认密码
            var $email = $('.email'); //邮箱
            var $mailCode = $('.mailCode');
            var status = $('.i-status'); //对
            var cancel = $('.i-cancel'); //叉
            var span = $('.tip span');
            // console.log($('input').not('.submit'));
            var flag = true;
            // console.log($span)
            // console.log($status);
            // console.log($cancel)
            // 标记
            var $userFlag = false;
            var $passFlag = false;
            var $repassFlag = false;
            var $emailFlag = false;
            var $mailFlag = false;

            // input 有值叉显示

            // $.each(span, function(index, value) {
            //     $(value).on('input', function() {
            //         if ($(this).val() !== '') {
            //             $(cancel[index]).show();
            //         } else {
            //             $(cancel[index]).hide();
            //         }
            //     });
            // });

            // $('input').not('.submit').on('input', function() {
            //     console.log($(this).index());
            //     if ($(this).val() !== '') {
            //         $(cancel[$(this).index()]).show();
            //     } else {
            //         $(cancel[$(this).index()]).hide();
            //     }
            // });
            // // 用户名判断
            // 获得焦点
            $username.on('focus', function() {
                $(status[0]).hide();
                // $userFlag = false;
                if ($username.val() === '') {
                    $(span[0]).html('<i class="i-def"></i>支持中文、英文、数字、“-”、“_”的组合，4-20个字符').css({
                        color: '#c5c5c5'
                    });
                    $userFlag = false;
                }
            });

            // 失去焦点
            $username.on('blur', function() {
                if ($username.val() !== '') {
                    var len = $username.val().replace(/[\u4e00-\u9fa5]/g, '**').length;
                    console.log(len);
                    // 长度
                    if (len >= 4 && len <= 20) {
                        //判断字符 
                        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
                        if (reg.test($(this).val())) {
                            $.ajax({
                                type: 'post',
                                url: 'http://192.168.13.24/jingdong/php/registry.php',
                                data: {
                                    username: $username.val()
                                }
                            }).done(function(data) {
                                if (!data) {
                                    $(status[0]).show();
                                    $(span[0]).html('');
                                    $userFlag = true;
                                } else {

                                    $(span[0]).html('<i class="i-error"></i>该用户名已存在').css({
                                        color: '#f91'
                                    });
                                    $userFlag = false;
                                }
                            });
                        } else {
                            $(span[0]).html('<i class="i-error"></i>格式错误，仅支持汉字、字母、数字、“-”、“_”的组合').css({
                                color: '#f91'
                            });
                            $userFlag = false;
                        }
                    } else {
                        $(span[0]).html('<i class="i-error"></i>长度只能在4-20个字符之间').css({
                            color: '#f91'
                        });
                        $userFlag = false;
                    }
                } else {
                    $(span[0]).html('');
                    $userFlag = false;
                }
            });

            // 密码强度判断
            $password.on('focus', function() {
                $(status[1]).hide();
                if ($password.val() === '') {
                    $(span[1]).html('<i class="i-def"></i>建议使用字母、数字和符号两种及以上的组合，8-20个字符').css({
                        color: '#c5c5c5'
                    });
                    $passFlag = false;
                }
            });
            $password.on('input', function() {
                if ($(this).val().length >= 8) {
                    $(span[1]).html('');
                    var reg1 = /\d+/; //数字
                    var reg2 = /[a-z]+/;
                    var reg3 = /[A-Z]+/;
                    var reg4 = /[\W\_]+/; //特殊字符
                    var count = 0; //统计字符的种类。
                    if (reg1.test(this.value)) { //密码中存在数字。
                        count++;
                    }
                    if (reg2.test(this.value)) { //密码中存在小写字母。
                        count++;
                    }
                    if (reg3.test(this.value)) { //密码中存在大写字母。
                        count++;
                    }
                    if (reg4.test(this.value)) { //密码中存在特殊符号。
                        count++;
                    }

                    switch (count) {
                        case 1:
                            $(span[1]).html('<i class="i-weak"></i>有被盗风险,建议使用字母、数字和符号两种及以上组合').css({
                                color: '#f91'
                            });
                            $passFlag = false;
                            break;
                        case 2:
                            $(span[1]).html('<i class="i-centre"></i>安全强度适中，可以使用三种以上的组合来提高安全强度').css({
                                color: '#c5c5c5'
                            });
                            $passFlag = true;
                            break;
                        case 3:
                            $(span[1]).html('<i class="i-strong"></i>你的密码很安全').css({
                                color: '#c5c5c5'
                            });
                            $passFlag = true;
                            break;
                    }
                } else {
                    $(span[1]).html('<i class="i-error"></i>请将密码设置为8-20位，并且由字母，数字和符号两种以上组合').css({
                        color: '#f91'
                    });
                    $passFlag = false;
                }
            });
            $password.on('blur', function() {
                if ($(this).val()) {
                    if ($passFlag) {
                        $(status[1]).show();
                        $passFlag = true;
                    }
                } else {
                    $(span[1]).html('');
                    $passFlag = false;
                }
            });

            // 验证密码
            $repass.on('focus', function() {
                $(status[2]).hide();
                if ($repass.val() === '') {
                    $(span[2]).html('<i class="i-def"></i>请在次输入密码').css({
                        color: '#c5c5c5'
                    });
                    $repassFlag = false;
                }
            });
            // 确认判断
            $repass.on('blur', function() {
                if ($(this).val() !== '') {
                    if ($repass.val() === $password.val()) {
                        $(status[2]).show();
                        $(span[2]).html('');
                        $repassFlag = true;
                    } else {
                        $(span[2]).html('<i class="i-error"></i>您两次输入的密码不相同,请重试').css({
                            color: '#c5c5c5'
                        });;
                        $repassFlag = false;
                    }
                } else {
                    $(span[2]).html('');
                    $repassFlag = false;
                }
            });

            // 邮箱验证
            $email.on('focus', function() {
                $(status[3]).hide();
                if ($email.val() === '') {
                    $(span[3]).html('<i class="i-def"></i>验证完成后，你可以使用该邮箱登录').css({
                        color: '#c5c5c5'
                    });
                    $emailFlag = false;
                }
            });

            $email.on('blur', function() {
                // $('.email-suggest').hide();
                if ($(this).val() !== '') {
                    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    if (reg.test($(this).val())) {
                        $(span[3]).html('');
                        $(status[3]).show();
                        $emailFlag = true;
                    } else {
                        $(span[3]).html('<i class="i-error"></i>邮箱格式错误').css({
                            color: '#f91'
                        });
                        $emailFlag = false;
                    }
                } else {
                    $(span[3]).html('');
                    $emailFlag = false;
                }
            });
            // 邮箱列表input
            $email.on('input', function() {
                if ($email.val() !== '') {
                    $('.email-suggest').show();
                } else {
                    $('.email-suggest').hide();
                }
                var em = $('.value');
                $.each(em, function(index, value) {
                    $(value).html($(value).find('span'));
                    $(value).html($email.val() + $(value).html());
                });
                // console.log($email.val() + em);
                // $('value').html($email.val() + em);
            });
            // 点击相应的li将邮箱填入input
            // console.log($('.email-suggest').find('li'));
            // var uArr = $('.email-suggest').find('li');

            // 列表鼠标划入划出显示隐藏
            $('.email-suggest').on('mouseover', function() {
                $(this).show();
            });
            $('.email-suggest').find('li').on('click', function() {
                // alert(1)
                var val = $(this).find('.value').html().replace('<span>', '').replace('</span>', '');
                // var val = $(this).find('.value');
                $email.val(val);
                $('.email-suggest').hide();
                var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                if (reg.test($email.val())) {
                    $(span[3]).html('');
                    $(status[3]).show();
                    $emailFlag = true;
                } else {
                    $(span[3]).html('<i class="i-error"></i>邮箱格式错误').css({
                        color: '#f91'
                    });
                    $emailFlag = false;
                }
            });
            // 获取验证码
            function ranNum(min, max) {
                return Math.round(Math.random() * (max - min)) + min;
            }

            function yanzm() {
                var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
                var str = '';
                for (var i = 0; i < 6; i++) {
                    str += arr[ranNum(0, arr.length - 1)];
                }

                return str;
            }
            $('#getMailCode').on('click', function() {
                $mailCode.val(yanzm());
                $mailFlag = true;
            });

            // 表单提交
            $('form').on('submit', function() {
                if ($username.val() === '') {
                    $(span[0]).html('<i class="i-error"></i>请输入账户名').css({
                        color: '#f91'
                    });
                    $userFlag = false;
                }
                if (!$userFlag || !$passFlag || !$repassFlag || !$emailFlag || !$mailFlag) {
                    return false;
                }
            });
            // $('.btn-register').on('click', function() {
            //     if ($username.val() === '') {
            //         $(span[0]).html('<i class="i-error"></i>请输入账户名').css({
            //             color: '#f91'
            //         });
            //         $userFlag = false;
            //     }
            //     if (!$userFlag || !$passFlag || !$repassFlag || !$emailFlag || !$mailFlag) {
            //         return false;
            //     } else {
            //         alert(1);
            //         $.ajax({
            //             url: 'http://192.168.0.101/jingdong/php/registry.php',
            //             data: {
            //                 username: $username.val(),
            //                 password: $password.val(),
            //                 repass: $repass.val(),
            //                 email: $email.val(),
            //             }
            //         })
            //     }
            // })




        }
    }
});