define(['jcookie'], function() {
    return {
        init: function() {
            // 从地址获取sid
            let $num = location.search.toString(1).split('=')[1];
            console.log($num);
            // 从后端获取sid对应的数据
            $.ajax({
                url: "http://192.168.1.32/jingdong/php/getsid.php",
                dataType: 'json',
                data: {
                    sid: $num
                }
            }).done(function(data) {
                console.log(data);
                // 渲染
                $('#smallpic').attr('src', data.url);
                $('#bpic').attr('src', data.url);
                $('.p-price price').attr('src', data.price);
                // 判断是否是自研;
                if (data.self_support) {
                    $('.title img').attr('src', './img/shop.png');
                    $('.title img').show();
                } else {
                    $('.title img').hide();
                }
                $('.title').append(data.title); //标题
                // 价格
                $('.price').html(data.price);
                // 评论
                $('.counts').html(data.sailnumber + '万+');
                $('title').html(data.title);
                let aImg = data.piclisturl.split(',');
                // console.log(aImg);
                let str = '';
                $.each(aImg, function(index, value) {
                    if (index !== 0) {
                        str += `
                    <li>
                        <img src="${value}" alt="">
                    </li>
                    `;
                    } else {
                        str += `
                        <li class="active">
                            <img src="${value}" alt="">
                        </li>
                        `;
                    }

                });

                $('.spec_list').html(str);
                hideArrow();
            });

            // 放大镜效果
            const $spic = $('#spic'); //小图
            const $sf = $('#sf'); //小放
            const $bf = $('#bf'); //大放
            const $bpic = $('#bpic'); //大图
            const $left = $('.left'); //左箭头
            const $right = $('.right'); //右箭头
            // 大图/小图 = 大放/小放
            // 小放大小
            $sf.width($spic.width() * $bf.width() / $bpic.width());
            $sf.height($spic.height() * $bf.height() / $bpic.height());
            // 缩放比例
            let $scale = $bpic.width() / $spic.width();

            //移入小图大放显示
            $spic.on('mouseover', function() {
                $bf.css({
                    visibility: 'visible'
                });
                $sf.css({
                    visibility: 'visible'
                });

                $spic.on('mousemove', function(ev) {
                    let $left_value = ev.pageX - $spic.offset().left - $sf.width() / 2;
                    let $top_value = ev.pageY - $spic.offset().top - $sf.height() / 2;
                    // 限制小放在框内移动
                    if ($left_value < 0) {
                        $left_value = 0;
                    } else if ($left_value >= $spic.width() - $sf.width()) {
                        $left_value = $spic.width() - $sf.width();
                    }
                    if ($top_value < 0) {
                        $top_value = 0;
                    } else if ($top_value >= $spic.height() - $sf.height()) {
                        $top_value = $spic.height() - $sf.height();
                    }

                    // 小图移动距离
                    $sf.css({
                        left: $left_value,
                        top: $top_value
                    });
                    $bpic.css({
                        left: -$scale * $left_value,
                        top: -$scale * $top_value
                    });
                });
            });

            // 鼠标划出隐藏
            $spic.on('mouseout', function() {
                $bf.css({
                    visibility: 'hidden'
                });
                $sf.css({
                    visibility: 'hidden'
                });
            });
            // 点击列表图片小图替换成相应图片
            $('.spec_list').on('mouseover', 'li', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $('#smallpic').attr('src', $(this).find('img').attr('src'));
                $('#bpic').attr('src', $(this).find('img').attr('src'));
            });

            // 左右箭头按钮


            function hideArrow() {
                if ($('.spec_list li').size() <= 5) {
                    $('.right_arrow').css({
                        backgroundImage: 'url(./img/disabled-next.png)',
                        backgroundPosition: '0 0'
                    });
                }
            }

            // 按钮hover事件
            //购物车跳转
            $('.carts').on('click', function() {
                location.href = 'cart.html';
            });
            if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
                let sid = $.cookie('cookieSid').split(',');
                let num = $.cookie('cookieNum').split(',');
                $('.num').html(sid.length);
            } else {
                $('.num').html('0');
            }


            // $('.right_arrow').hover(() => {
            //     let dd= $('.spec_list').offset().left<$()
            //     if ($('.spec_list li').size() > 5) {
            //         $('.right_arrow').css({
            //             backgroundImage: 'url(./img/__sprite.png)',
            //             backgroundPosition: '-78px 0'
            //         });
            //     }
            // }, () => {
            //     if($index>)
            // });
            let $index = 5; //显示图片数量索引
            // 点击右边按钮
            $right.on('click', function() {
                // alert(1)
                let $specLi = $('.spec_list li');
                console.log($specLi.size())

                if (($specLi.size() - $index) > 5) {
                    $index += 5;
                    console.log($index)
                    $('.left_arrow').css({
                        backgroundImage: 'url(./img/__sprite.png)',
                        backgroundPosition: '0px -54px'
                    });
                    $('.spec_list').animate({
                        left: -($index - 5) * $specLi.eq(0).outerWidth(true)
                    });
                } else {
                    $index += ($specLi.size() - $index);
                    console.log($index)
                    $('.left_arrow').css({
                        backgroundImage: 'url(./img/__sprite.png)',
                        backgroundPosition: '0px -54px'
                    });
                    $('.right_arrow').css({
                        backgroundImage: 'url(./img/disabled-next.png)',
                        backgroundPosition: '0 0'
                    });
                    $('.spec_list').animate({
                        left: -($index - 5) * $specLi.eq(0).outerWidth(true)
                    });
                }


            });
            // 点击左边按钮
            $left.on('click', function() {
                console.log($index)
                let $specLi = $('.spec_list li');
                if ($specLi.size() > 5) {
                    console.log(1)
                    console.log($index)
                    if (($specLi.size() - $index) > 5) {
                        console.log(2)
                        $index -= 5;
                        $('.right_arrow').css({
                            backgroundImage: 'url(./img/__sprite.png)',
                            backgroundPosition: '-78px 0px'
                        });
                        if ($index <= 5) {
                            $left.css({
                                backgroundImage: 'url(./img/disabled-prev.png)',
                            });
                        }
                        $('.spec_list').animate({
                            left: -($index - 5) * $specLi.eq(0).outerWidth(true)
                        });
                    } else {
                        // $index += ($specLi.size() - $index);
                        $('.left_arrow').css({
                            backgroundImage: 'url(./img/disabled-prev.png)',
                            backgroundPosition: '0px 0px'
                        });
                        $('.right_arrow').css({
                            backgroundImage: 'url(./img/__sprite.png)',
                            backgroundPosition: '-78px 0px'
                        });
                        $('.spec_list').animate({
                            left: -($specLi.size() - $index) * $specLi.eq(0).outerWidth(true)
                        });
                    }

                }
            });







            // 存入购物车
            let arrSid = []; //存储商品编号
            let arrNum = []; //存储商品数量

            // 取出cookie值判断是否是多次点击
            function cookieToArray() {
                if ($.cookie('cookieSid') && ($.cookie('cookieNum'))) {
                    arrSid = $.cookie('cookieSid').split(',');
                    arrNum = $.cookie('cookieNum').split(',');
                } else {
                    arrSid = []
                    arrNum = []
                }

            }

            // 加入购物车
            $('.cart').on('click', function() {
                console.log($num);
                // 检测点击次数
                cookieToArray();
                // 根据cookie判断商品是否已经存在
                if ($.inArray($num, arrSid) != -1) { //存在
                    //获取数量+input值
                    let count = parseInt(arrNum[$.inArray($num, arrSid)]) + parseInt($('.input_wrap input').val());
                    arrNum[$.inArray($num, arrSid)] = count;
                    // 重新写入cookie
                    $.cookie('cookieNum', arrNum, { expires: 100, path: '/' });
                } else { //不存在
                    // 添加cookie
                    arrSid.push($num);
                    arrNum.push($('.input_wrap input').val());
                    $.cookie('cookieSid', arrSid, { expires: 100, path: '/' });
                    $.cookie('cookieNum', arrNum, { expires: 100, path: '/' });
                }
            });
            // 点击+ - 按钮改变 input的值
            $('.add').on('click', function() {
                let count = parseInt($('.input_wrap input').val());
                count++;
                $('.input_wrap input').val(count);
            });
            $('.less').on('click', function() {
                let count = parseInt($('.input_wrap input').val());
                if (count > 0) {
                    count--;
                } else {
                    count = 0;
                }
                $('.input_wrap input').val(count);
            });
        }
    }
})