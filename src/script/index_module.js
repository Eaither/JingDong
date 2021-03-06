define(['jlazyload'], function() {
    return {
        init: function() {
            // 关闭顶部广告
            var $close = $('.top_container .iconfont');
            $close.on('click', function() {
                // console.log(1)
                // alert(1);
                $('#page_top').hide();
            });


            // $(window).scrollTop() >= 500 ? $('.search-fix').show() : $('.search-fix').hide();

            $(window).on('scroll', function() {
                if ($(window).scrollTop() >= 900) {
                    $('.search-logo').show()
                    $('.suspension_wrap').addClass('search-fix');

                } else {
                    $('.search-logo').hide()
                    $('.suspension_wrap').removeClass('search-fix');
                }
            });





            //列表二级菜单
            ! function() {
                // 菜单元素
                $cate_menu = $('.cate_menu');
                $cateLi = $('.cate_menu li');
                $cartlist = $('.cartlist');
                $item = $('.cartlist .item1');

                // 鼠标划入改变li样式
                $cateLi.on('mouseover', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    $item.eq($(this).index()).show().siblings(".item1").hide();
                    $cartlist.show();
                });
                // 鼠标划出隐藏
                $cateLi.on('mouseout', function() {
                    $(this).removeClass("active");
                    $cartlist.hide();
                });

                // 鼠标划入划出item，cartlist状态
                // $cartlist.hover(() => {
                //     $cartlist.show();
                // }, () => {
                //     $cartlist.hide();
                // });
                $cartlist.on('mouseover', function() {
                    $cartlist.show();
                });
                $cartlist.on('mouseout', function() {
                    $cartlist.hide();
                });
                //根据页面卷曲的高度cartlist下移相应位置
                $(window).on('scroll', function() {
                    // 页面卷去高度
                    var $cTop = $(window).scrollTop();
                    if ($cTop > $('.inner_left').offset().top) {
                        $cartlist.css({
                            top: $cTop - $('.inner_left').offset().top
                        });
                    } else {
                        $cartlist.css({
                            top: 0
                        });
                    }
                });
            }();


            // 大轮播图切换动画函数
            function tabChange(option) { //{$num:num值，$oi:圆圈li选择器，$li元素集合选择器}
                if (option.$ol) {
                    $(option.$ol).removeClass("active");
                    $(option.$ol).eq(option.$num).addClass("active");
                }
                $(option.$li).stop(true).animate({
                    opacity: 0,
                    speed: option.$speed
                });
                // 给对于li加透明度
                $(option.$li).eq(option.$num).stop(true).animate({
                    opacity: 1,
                    speed: option.$speed
                });
            }

            // 页面大轮播图
            ! function() {
                var $ban_left = $(".ban_left");
                var $ban_ol = $(".ban_ol li"); //圆圈
                var $bannerLi = $('.banner_list li');
                var $goods_ban_left = $('.goods_ban_left'); //左移按钮
                var $goods_ban_right = $('.goods_ban_right'); //右边移按钮

                var $num = 0; //图片索引标记
                var timer = null;
                for (var i = 0; i < $bannerLi.length; i++) {
                    num = i;
                    $bannerLi[i].index = num;
                }

                // 划入圆圈相应的图片显示
                $ban_ol.on("mouseover", function() {
                    $num = $(this).index();
                    //将圆圈索引给num,使索引与圆圈绑定;
                    // 清除图片透明度
                    // tabChange($num);
                    tabChange({
                        $num: $num,
                        $ol: '.ban_ol li',
                        $li: '.banner_list li',
                        $speed: 500
                    });
                });

                // 右边按钮
                $goods_ban_right.on('click', function() {
                    $num++;
                    if ($num >= $ban_ol.length) {
                        $num = 0;
                    }
                    // tabChange($num);
                    tabChange({
                        $num: $num,
                        $ol: '.ban_ol li',
                        $li: '.banner_list li',
                        $speed: 500
                    });
                    // console.log($num);
                });
                $goods_ban_left.on('click', function() {
                    $num--;
                    if ($num < 0) {
                        $num = $ban_ol.length - 1;
                    }
                    // tabChange($num);
                    tabChange({
                        $num: $num,
                        $ol: '.ban_ol li',
                        $li: '.banner_list li',
                        $speed: 500
                    });
                    // console.log($num);
                });
                // timer = setInterval(() => {
                //     $num++;
                //     if ($num >= $ban_ol.length) {
                //         $num = 0;
                //     }
                //     // tabChange($num)
                //     tabChange({
                //         $num: $num,
                //         $ol: '.ban_ol li',
                //         $li: '.banner_list li',
                //         $speed: 500
                //     });
                // }, 3000);
                timer = setInterval(function() {
                    $num++;
                    if ($num >= $ban_ol.length) {
                        $num = 0;
                    }
                    // tabChange($num)
                    tabChange({
                        $num: $num,
                        $ol: '.ban_ol li',
                        $li: '.banner_list li',
                        $speed: 500
                    });
                }, 3000);
                // $ban_left.hover(() => {
                //     clearInterval(timer)
                // }, () => {
                //     timer = setInterval(() => {
                //         $num++;
                //         if ($num >= $ban_ol.length) {
                //             $num = 0;
                //         }
                //         // tabChange($num)
                //         tabChange({
                //             $num: $num,
                //             $ol: '.ban_ol li',
                //             $li: '.banner_list li',
                //             $speed: 500
                //         });
                //     }, 3000);
                // });
                $ban_left.on('mouseover', function() {
                    clearInterval(timer)
                });
                $ban_left.on('mouseout', function() {
                    timer = setInterval(function() {
                        $num++;
                        if ($num >= $ban_ol.length) {
                            $num = 0;
                        }
                        // tabChange($num)
                        tabChange({
                            $num: $num,
                            $ol: '.ban_ol li',
                            $li: '.banner_list li',
                            $speed: 500
                        });
                    }, 3000);
                });
            }();
            // 页面大轮播图右边小轮播
            ! function() {
                var $ban_list = $('.ban_list'); //小轮播ul
                var $ban_list_li = $('.ban_list li'); //分类小轮播li
                var $goods_ol_left = $(".goods_ol_left"); //左按钮
                var $goods_ol_right = $(".goods_ol_right"); //右按钮
                var $ban_num = 0;
                var timer = null;
                // 显示隐藏按钮
                $(".ban_right").on('mouseover', function() {
                    $goods_ol_left.show();
                    $goods_ol_right.show()
                    clearInterval(timer);
                });
                $(".ban_right").on('mouseout', function() {
                    $goods_ol_left.hide();
                    $goods_ol_right.hide();
                    timer = setInterval(function() {
                        $ban_num++;
                        if ($ban_num > $ban_list_li.length - 1) {
                            $ban_num = 0;
                        }
                        tabChange({
                            $num: $ban_num,
                            $li: '.ban_list li',
                            $speed: 300
                        });
                    }, 5000);
                });
                // $(".ban_right").hover(() => {
                //     $goods_ol_left.show();
                //     $goods_ol_right.show()
                //     clearInterval(timer);
                // }, () => {
                //     $goods_ol_left.hide();
                //     $goods_ol_right.hide();
                //     timer = setInterval(() => {
                //         $ban_num++;
                //         if ($ban_num > $ban_list_li.length - 1) {
                //             $ban_num = 0;
                //         }
                //         tabChange({
                //             $num: $ban_num,
                //             $li: '.ban_list li',
                //             $speed: 300
                //         });
                //     }, 5000);
                // });
                // 
                $goods_ol_right.on('click', function() {
                    $ban_num++;
                    if ($ban_num > $ban_list_li.length - 1) {
                        $ban_num = 0;
                    }
                    // console.log($ban_num);
                    tabChange({
                        $num: $ban_num,
                        $li: '.ban_list li',
                        $speed: 300
                    });
                });
                $goods_ol_left.on('click', function() {
                    $ban_num--;
                    if ($ban_num < 0) {
                        $ban_num = $ban_list_li.length - 1;
                    }
                    // console.log($ban_num);
                    tabChange({
                        $num: $ban_num,
                        $li: '.ban_list li',
                        $speed: 300
                    });
                });
                timer = setInterval(function() {
                    $ban_num++;
                    if ($ban_num > $ban_list_li.length - 1) {
                        $ban_num = 0;
                    }
                    tabChange({
                        $num: $ban_num,
                        $li: '.ban_list li',
                        $speed: 300
                    });
                }, 5000);
            }();

            // 京东秒杀幻灯片效果
            // 获取后端数据
            ! function() {
                $.ajax({
                    url: "http://192.168.13.24/jingdong/php/alldata.php",
                    dataType: "json"
                }).done(function(data) {
                    var $strLi = ''; //定义一个空字符串用于将获取的数据存储
                    // 遍历获取的数据
                    var $seckill_list = $('.seckill_list');
                    // 把ul改成定位
                    $seckill_list.css({
                        position: 'absolute',
                        top: 0,
                        left: 0
                    });
                    $.each(data, function(index, value) {
                        // alert(1);
                        if (index < 16) {
                            $strLi +=
                                '<li>' +
                                '<a href="#">' +
                                '<img src="' + value.url + '" alt="" width="140" height="140">' +
                                '<h6>' + value.title + '</h6>' +
                                '<div class="square">' +
                                '<span class="s_price">' +
                                '<i>￥</i>' +
                                '<span>' + value.price + '</span>' +
                                '</span>' +
                                '<span class="s_price">' +
                                '<i>￥</i>' +
                                '<span>3</span>' +
                                '</span>' +
                                '</div>' +
                                '</a>' +
                                '</li>';
                        }
                    }); //each
                    $seckill_list.html($strLi);
                    // 克隆前四个li追加给ul
                    var $seckill_li = $('.seckill_list li');
                    $.each($seckill_li, function(index, value) {
                        if (index < 4) {
                            var $clone_li = $seckill_li.eq(index).clone(true, true);
                            $seckill_list.append($clone_li)
                        } else {
                            return false;
                        }
                    });

                    // 单个li长度
                    var $liLen = $seckill_li.eq(1).width();
                    // 给ul设置宽度
                    $seckill_list.width($liLen * ($seckill_li.length + 4));
                    var num_li = 0;
                    $('.goods_seckill_right').on('click', function() {
                        num_li += 4;
                        if (num_li > $seckill_li.length) {
                            num_li = 4;
                            // li回到原点
                            $seckill_list.css({
                                left: 0
                            });
                        };
                        $seckill_list.stop(true).animate({
                            left: -num_li * $liLen
                        });
                    });
                    $('.goods_seckill_left').on('click', function() {
                        num_li -= 4;
                        if (num_li < 0) {
                            num_li = ($seckill_li.length) - 4;
                            $seckill_list.css({
                                left: -($seckill_li.length) * $liLen
                            });
                        }
                        console.log(num_li);
                        $seckill_list.stop(true).animate({
                            left: -num_li * $liLen
                        });
                    });
                }); //done
            }();

            // 秒杀右边



            // 楼梯效果
            var $elevator = $('.elevator'); //楼梯外层盒子
            var $stairs = $('.ele_item'); //楼梯
            var $level = $('.level'); //楼层


            // 回到顶部
            $('.back').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                });
            });
            // 添加点击事件滚动到对应的楼层
            $stairs.not('.back').on('click', function() {
                $(this).addClass('active').siblings().removeClass('active');
                // 获取楼层top
                if ($level.eq($(this).index())) {
                    var $levelTop = $level.eq($(this).index()).offset().top - 74;
                    $('html,body').animate({
                        scrollTop: $levelTop
                    });
                }
            });

            $(window).on('scroll', function() {
                var $top = $(window).scrollTop();
                // 拖动滚动条给楼层
                $level.each(function(index, element) {
                    // alert(1)
                    var $levelTop = $(element).offset().top + $(element).height() / 3;

                    if ($levelTop > $top) {
                        $stairs.removeClass('active');
                        $stairs.eq(index).addClass('active');
                        return false;
                    }
                });
            });


            $('.cart').on('click', function() {
                location.href = 'cart.html';
            });
            if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
                var sid = $.cookie('cookieSid').split(',');
                var num = $.cookie('cookieNum').split(',');
                $('.num').html(sid.length);
            } else {
                $('.num').html('0');
            }

            // 每日特价tab
            $('.tab_head').find('li').on('mouseover', function() {
                $(this).addClass('active').siblings().removeClass('active');

                $('.items').eq($(this).index()).show().siblings('.items').hide();
            });
            // 排行榜
            $('.tab_top').find('li').on('mouseover', function() {
                $(this).addClass('active').siblings().removeClass('active');

                $('.rank_item').eq($(this).index()).show().siblings('.rank_item').hide();
            });



            // 发现好货
            var $find_list = $('.find_list');
            $.ajax({
                url: 'http://192.168.13.24/jingdong/php/nicegoods.php',
                dataType: 'json'
            }).done(function(data) {

                var $strLi = '';
                $.each(data, function(index, value) {
                    if (index % 2 !== 0) {
                        $strLi +=
                            '<li>' +
                            '<div class="find_title">' +
                            value.title +
                            '</div>' +
                            '<img class="lazy" src="${value.url}" alt="" width="150" height = "150">' +
                            '</li>';
                    } else {
                        $strLi +=
                            '<li>' +
                            '<div class="find_title">' +
                            value.title +
                            '</div>' +
                            '<img class="lazy" src="${value.url}" alt="" width="150" height = "150">' +
                            '</li>';
                    }
                });
                $strLi += $strLi;
                $find_list.html($strLi);
                // $(function() { //和拼接的元素放在一起。
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn" //图片显示方式
                //     });
                // });

                $find_li = $('.find_list li');
                //单个li长度
                var $liLen = $find_li.eq(0).width();
                // 给ul设置宽度
                $find_list.width($liLen * ($find_li.length / 2));

                var find_num = 0;
                var timer1 = setInterval(function() {
                    find_num++;
                    // console.log(find_num)
                    if (find_num === 2000) {
                        $find_list.css({
                            left: 0
                        })
                        find_num = 0;
                    }
                    $find_list.css({
                        transform: 'translateX(-' + find_num + 'px)'
                    })
                }, 1000 / 60);
                $('.find_right').on('mouseover', function() {
                    clearInterval(timer1)
                });
                $('.find_right').on('mouseout', function() {
                    timer1 = setInterval(function() {
                        find_num++;
                        // console.log(find_num)
                        if (find_num === 2000) {
                            $find_list.css({
                                left: 0
                            })
                            find_num = 0;
                        }
                        $find_list.css({
                            transform: 'translateX(-' + find_num + 'px)'
                        })
                    }, 1000 / 60);
                });
                // $('.find_right').hover(() => {
                //     clearInterval(timer1)
                // }, () => {
                //     timer1 = setInterval(() => {
                //         find_num++;
                //         // console.log(find_num)
                //         if (find_num === 2000) {
                //             $find_list.css({
                //                 left: 0
                //             })
                //             find_num = 0;
                //         }
                //         $find_list.css({
                //             transform: `translateX(-${find_num}px)`
                //         })
                //     }, 1000 / 60);
                // })
            });

            // hover效果
            $tabLi = $('.tab_service li');
            $tabLi.on('mouseover', function() {
                $(this).find('.img1').hide();
                $(this).find('.img2').show();
            });
            $tabLi.on('mouseout', function() {
                $(this).find('.img2').hide();
                $(this).find('.img1').show();
            });


            // 新品首发

            var slider_list = $('.slider_wrap ul');
            var slider_li = $('.lis');
            var new_left = $('.goods_new_left');
            var new_right = $('.goods_new_right');
            // 给li添加索引
            var sli_num = 0;
            $.each(slider_li, function(index, value) {
                sli_num = index;
                $(value).attr('data-index', index);
            });
            var slider_num = parseInt($('.slider_active').attr('data-index'));
            new_right.on('click', function() {
                slider_num++;
                if (slider_num === 4) {
                    slider_list.css({
                        transition: 'none',
                        left: -60,
                    })
                    slider_num = 0
                }
                slider_li.eq(slider_num).addClass('slider_active').siblings().removeClass('slider_active');
                slider_list.css({
                    transition: '.5s ease',
                    transform: 'translateX(-' + slider_num * 130 + 'px)'
                });
            });
            // new_left.on('click', function() {
            //     slider_num--;
            //     if (slider_num === -1) {
            //         slider_list.css({
            //             transition: 'none',
            //             left: -300,
            //         })
            //         slider_num = 3
            //     }
            //     slider_li.eq(slider_num).addClass('slider_active').siblings().removeClass('slider_active');
            //     slider_list.css({
            //         transition: '.5s ease',
            //         transform: `translateX(${-slider_num * 130}px)`
            //     });
            // });




            var $goods_list = $('.goods_list');
            var $goods_list_li = $('.goods_list>li');
            // 利用ajax请求获取接口数据
            // console.log($goods_list)
            $.ajax({
                url: "http://192.168.13.24/jingdong/php/alldata.php",
                dataType: "json"
            }).done(function(data) {
                // console.log(data);
                var $strLi = ''; //定义一个空字符串用于将获取的数据
                // 遍历获取的数据
                $.each(data, function(index, value) {
                    var price = value.price.toString().split(".");
                    $strLi +=
                        '<li>' +
                        '<div class="rec_goods_img">' +
                        '<img class="lazy" data-original="' + value.url + '" alt="" width="150" height = "150" >' +
                        '</div>' +
                        '<p>' +
                        value.title +
                        '</p>' +
                        '<section>' +
                        '<div class="rec_price">' +
                        '<i>￥</i>' +
                        '<span class="int">' + price[0] + '.<span class="float">' + price[1] + '0</span>' +
                        '</span>' +
                        '</div>' +
                        '<div class="similarity">' +
                        '<span class="iconfont icon-yanjing">找相似</span>' +
                        '</div>' +
                        '</section>' +
                        '</li>';

                    // 将str写入ul

                }); //each
                // console.log($strLi);
                // $('.goods_list').html($strLi);
                $('.goods_list').html($strLi);
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
                // $goods_list.html(1);
            }); //done







            ; //频道广场

            $.ajax({
                url: "http://192.168.13.24/jingdong/php/channeldata.php",
                dataType: "json"
            }).done(function(data) {
                // console.log(data);
                var $strLi = ''; //定义一个空字符串用于将获取的数据
                // 遍历获取的数据
                $.each(data, function(index, value) {
                    if (!(value.sid == 1 || value.sid == 2)) {
                        $strLi +=
                            '<div class="channel_ul' + value.sid + 'channel_ul">' +
                            '<a href="#" class="title">' +
                            '<span>' + value.title + '</span>' +
                            '<span>' + value.info + '</span>' +
                            '</a>' +
                            '<div class="channel_img">' +
                            '<a href="#">' +
                            '<img data-original="' + value.img1 + '" alt="" class="lazy">' +
                            '</a>' +
                            '<a href="#">' +
                            '<img data-original="' + value.img2 + '" alt="" class="lazy">' +
                            '</a>' +
                            '</div>' +
                            '</div>';
                    } else {
                        $strLi +=
                            '<div class="channel_ul' + value.sid + 'channel_ul">' +
                            '<a href="#">' +
                            '<img data-original="' + value.img1 + '" alt="" class="lazy">' +
                            '</a>' +
                            '</div>';
                    }
                    // 将str写入ul

                }); //each
                $('.square_info').html($strLi);
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            }); //done
            $(window).on('scroll', function() {
                console.log($(window).scrollTop());
                $(window).scrollTop() > 800 ? $('.elevator').addClass('elevator_fix') : $('.elevator').removeClass('elevator_fix');
                // $('.elevator_fix').stop(true).animate({
                //     top: 75
                // });
            });
            $(window).scrollTop() > 800 ? $('.elevator').addClass('elevator_fix') : $('.elevator').removeClass('elevator_fix');

            // if ($(window).scrollTop() < 200) {
            //     $('.elevator').stop(true).animate({
            //         top: $('.login_wrap').offset().top
            //     })
            // } else {
            //     $('.elevator').stop(true).animate({
            //         top: 74
            //     })
            // }

            //根据本地存储，显示用户信息
            if (localStorage.getItem('username')) {
                $('.log').hide();
                $('.log2').show();
                $('.name').html('Hi~' + localStorage.getItem('username'));
            }

            $('.bao3').on('click', function() {
                $('.log').show();
                $('.log2').hide();
                localStorage.removeItem('username');
                $('.name').html('Hi~欢迎逛京东');
            });

            $(function() { //和拼接的元素放在一起。
                $("img.lazy").lazyload({
                    effect: "fadeIn" //图片显示方式
                });
            });


        }
    }
})