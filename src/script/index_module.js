define([], function() {
    return {
        init: function() {

            // 关闭顶部广告
            const $close = $('.top_container .iconfont');
            $close.on('click', function() {
                // console.log(1)
                // alert(1);
                $('#page_top').hide();
            });

            //列表二级菜单
            // ! function() {
            // 菜单元素
            $cate_menu = $('.cate_menu');
            $cateLi = $('.cate_menu li');
            $cartlist = $('.cartlist');
            $item = $('.carlist .item');

            // 鼠标划入改变li样式
            $cateLi.on('mouseover', function() {
                $(this).addClass('active').siblings().removeClass('active');
                $item.eq($(this).index()).show().siblings(".item").hide();
                $cartlist.show();
            });
            // 鼠标划出隐藏
            $cateLi.on('mouseout', function() {
                $(this).removeClass("active");
                $cartlist.hide();
            });

            // 鼠标划入划出item，cartlist状态
            $cartlist.hover(() => {
                $cartlist.show();
            }, () => {
                $cartlist.hide();
            });

            //根据页面卷曲的高度cartlist下移相应位置
            $(window).on('scroll', function() {
                // 页面卷去高度
                let $cTop = $(window).scrollTop();
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
            // }();


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
                const $ban_left = $(".ban_left");
                const $ban_ol = $(".ban_ol li"); //圆圈
                const $bannerLi = $('.banner_list li');
                const $goods_ban_left = $('.goods_ban_left'); //左移按钮
                const $goods_ban_right = $('.goods_ban_right'); //右边移按钮

                let $num = 0; //图片索引标记
                let timer = null;
                for (let i = 0; i < $bannerLi.length; i++) {
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
                timer = setInterval(() => {
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

                $ban_left.hover(() => {
                    clearInterval(timer)
                }, () => {
                    timer = setInterval(() => {
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
                })
            }();
            // 页面大轮播图右边小轮播
            ! function() {
                const $ban_list = $('.ban_list'); //小轮播ul
                const $ban_list_li = $('.ban_list li'); //分类小轮播li
                const $goods_ol_left = $(".goods_ol_left"); //左按钮
                const $goods_ol_right = $(".goods_ol_right"); //右按钮
                let $ban_num = 0;
                let timer = null;
                // 显示隐藏按钮
                $(".ban_right").hover(() => {
                    $goods_ol_left.show();
                    $goods_ol_right.show()
                    clearInterval(timer);
                }, () => {
                    $goods_ol_left.hide();
                    $goods_ol_right.hide();
                    timer = setInterval(() => {
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
                timer = setInterval(() => {
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
            ! function() {
                // 获取后端数据
                $.ajax({
                    url: "http://192.168.13.24/jingdong/php/alldata.php",
                    dataType: "json"
                }).done((data) => {
                    // console.log(data);
                    let $strLi = ''; //定义一个空字符串用于将获取的数据存储
                    // 遍历获取的数据
                    const list = $('.seckill_list');
                    $.each(data, function(index, value) {
                        // alert(1);
                        if (index < 30) {
                            $strLi += `
                            <li>
                            <a href="#">
                                <img src="${value.url}" alt="" width="140" height="140">
                                <h6>${value.title}</h6>
                                <div class="square">
                                    <span class="s_price">
                                        <i>￥</i>
                                        <span>${value.price}</span>
                                    </span>
                                    <span class="s_price">
                                        <i>￥</i>
                                        <span>3</span>
                                    </span>
                                </div>
                            </a>
                        </li> `;
                        }

                    }); //each
                    list.html($strLi);
                    // $('.seckill_list').html($strLi);
                }); //done
            }();


            // 为你推荐列表--元素
            ! function() {
                const $goods_list = $('.goods_list');
                const $goods_list_li = $('.goods_list>li');
                // 利用ajax请求获取接口数据
                // console.log($goods_list)
                $.ajax({
                    url: "http://192.168.13.24/jingdong/php/alldata.php",
                    dataType: "json"
                }).done((data) => {
                    // console.log(data);
                    let $strLi = ''; //定义一个空字符串用于将获取的数据
                    // 遍历获取的数据
                    $.each(data, function(index, value) {
                        let price = value.price.toString().split(".");
                        $strLi += `
                            <li>
                            <div class="rec_goods_img">
                                        <img src="${value.url}" alt="" width="150" height = "150" class="lazy">
                                    </div>
                                    <p>
                                        ${value.title}
                                    </p>
                                    <section>
                                        <div class="rec_price">
                                            <i>￥</i>
                                            <span class="int">${price[0]}.<span class="float">${price[1]}0</span>
                                            </span>
                                        </div>
                                        <div class="similarity">
                                            <span class="iconfont icon-yanjing
                                            "> 找相似</span>
                                            <!-- <aside>找相似</aside> -->
                                        </div>
                                    </section>
                            </li>`;

                        // 将str写入ul

                    }); //each
                    // console.log($strLi);
                    // $('.goods_list').html($strLi);
                    $('.goods_list').html($strLi);
                    // $goods_list.html(1);
                }); //done

                // $(function() { //和拼接的元素放在一起。
                //     $("img.lazy").lazyload({
                //         effect: "fadeIn" //图片显示方式
                //     });
                // });
            }(); //闭包结束




            ; //频道广场
            ! function() {
                $.ajax({
                    url: "http://192.168.13.24/jingdong/php/channeldata.php",
                    dataType: "json"
                }).done((data) => {
                    // console.log(data);
                    let $strLi = ''; //定义一个空字符串用于将获取的数据
                    // 遍历获取的数据
                    $.each(data, function(index, value) {
                        if (!(value.sid == 1 || value.sid == 2)) {
                            $strLi += `
                            <div class="channel_ul${value.sid} channel_ul">
                            <a href="#" class="title">
                                <span>${value.title}</span>
                                <span>${value.info}</span>
                            </a>
                            <div class="channel_img">
                                <a href="#">
                                    <img src="${value.img1}" alt="">
                                </a>
                                <a href="#">
                                    <img src="${value.img2}" alt="">
                                </a>
                            </div>
                        </div>`;
                        } else {
                            $strLi += `
                            <div class="channel_ul${value.sid} channel_ul">
                            <a href="#">
                                <img src="${value.img1}" alt="">
                            </a>
                        </div>`;
                        }
                        // 将str写入ul

                    }); //each
                    $('.square_info').html($strLi);
                }); //done
            }();






        }
    }
})