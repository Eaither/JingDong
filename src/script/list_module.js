define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            let array_default = []; //排序前的数组，默认数组
            let array = []; //排序中的数组
            let prev = null; //前一个价格
            let next = null; //后一个一个价格
            const $list = $('.list');
            // 请求默认数据
            $.ajax({
                url: "http://192.168.13.24/jingdong/php/listdata.php",
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                let strHtml = '<ul>';
                $.each(data, function(index, value) {
                    strHtml += `
                    <li>
                    <div class="wrap">
                        <div class="p_img">
                            <img class="lazy" data-original="${value.url}" alt="" width=220 height=220>
                        </div>
                        <!-- 价格 -->
                        <div class="p_price">
                            <strong>
                                <em>￥</em>
                                <i>${value.price}</i>
                            </strong>
                        </div>
                        <!-- 标题 -->
                        <div class="p_title">
                            <span>${value.title}</span>
                        </div>
                        <!-- 评论 -->
                        <div class="p_commit">
                            <strong>
                                已有<a href="#">${value.sailnumber}w+</a>人评价
                            </strong>
                        </div>
                        <!-- 自营满减 -->
                        <div class="p_icon">
                            <span>自营</span>
                            <span>满减</span>
                        </div>
                        <!-- 关注加入购物车 -->
                        <div class="p-operate">
                            <a href="#" class="operate">
                                <i></i>关注
                            </a>
                            <a href="#" class="cart">
                                <i></i>加入购物车
                            </a>
                        </div>
                    </div>
                </li>
                    `;
                });

                $list.html(strHtml);
                //重置数组
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素追加到两个数组中。
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
                $(function() { //和拼接的元素放在一起。
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //图片显示方式
                    });
                });
            });


            $('.page').pagination({
                pageCount: 6, //总的页数 - 后端传入的。
                jump: true, //是否开启跳转到指定的页数，布尔值。
                coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                homePage: '首页',
                endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取的页码给后端
                    $.ajax({
                        url: 'http://192.168.13.24/jingdong/php/listdata.php',
                        data: {
                            page: api.getCurrent() //传输页面
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let $strhtml = '<ul>';
                        $.each(data, function(index, value) {
                            $strhtml += `
                            <li>
                            <div class="wrap">
                                <div class="p_img">
                                    <img class="lazy" src="${value.url}" alt="" width=220 height=220>
                                </div>
                                <!-- 价格 -->
                                <div class="p_price">
                                    <strong>
                                        <em>￥</em>
                                        <i>${value.price}</i>
                                    </strong>
                                </div>
                                <!-- 标题 -->
                                <div class="p_title">
                                    <span>${value.title}</span>
                                </div>
                                <!-- 评论 -->
                                <div class="p_commit">
                                    <strong>
                                        已有<a href="#">${value.sailnumber}w+</a>人评价
                                    </strong>
                                </div>
                                <!-- 自营满减 -->
                                <div class="p_icon">
                                    <span>自营</span>
                                    <span>满减</span>
                                </div>
                                <!-- 关注加入购物车 -->
                                <div class="p-operate">
                                    <a href="#" class="operate">
                                        <i></i>关注
                                    </a>
                                    <a href="#" class="cart">
                                        <i></i>加入购物车
                                    </a>
                                </div>
                            </div>
                        </li>
                            `;
                        });
                        $strhtml += '</ul>';
                        $list.html($strhtml);

                        //重置数组
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;
                        //将页面的li元素追加到两个数组中。
                        $('.list li').each(function(index, element) {
                            array[index] = $(this);
                            array_default[index] = $(this);
                        });

                        // $(function() { //和拼接的元素放在一起。
                        //     $("img.lazy").lazyload({
                        //         effect: "fadeIn" //图片显示方式
                        //     });
                        // });
                    });
                }
            });


            // 排序
            let $fs_flag = false; //用于标记是否已经点击
            const $fs = $('.fs');
            // 默认排序 -如果已经排序恢复原样
            $('.f_sort a').eq(0).on('click', function() {
                $.each(array_default, function(index, value) {
                    $('.list ul').append(value);
                });
                return;
            });
            // 升序降序
            // 升序降序方法
            function ascending(option) { //{$arr:array,element,$type:true/false}
                for (let i = 0; i < option.$arr.length - 1; i++) {
                    for (let j = 0; j < option.$arr.length - i - 1; j++) {
                        let prev = parseFloat(option.$arr[j].find(option.$ele).html());
                        let next = parseFloat(option.$arr[j + 1].find(option.$ele).html());
                        if (option.$type) {
                            if (prev > next) {
                                let temp = option.$arr[j];
                                option.$arr[j] = option.$arr[j + 1];
                                option.$arr[j + 1] = temp;
                            }
                        } else {
                            if (prev < next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                }
                $.each(option.$arr, function(index, value) {
                    $('.list ul').append(value);
                });
            }
            $fs.on('click', function() {
                $fs_flag = !$fs_flag;
                // 升序
                if ($fs_flag) {
                    ascending({ $arr: array, $ele: '.p_price i', $type: true });
                } else { //降序

                    ascending({ $arr: array, $ele: '.p_price i', $type: false });
                }
            });

            // 评论数排序
            $('.com').on('click', function() {
                ascending({ $arr: array, $ele: '.p_commit a', $type: false });
            })
        }
    }
});