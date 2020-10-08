define(['jlazyload', 'jcookie'], function() {
    return {
        init: function() {
            function showList(sid, num) {
                $.ajax({
                    url: 'http://192.168.1.32/jingdong/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    // 根据sid 克隆相应的选项
                    $.each(data, function(index, value) {
                        if (sid === value.sid) {
                            let $cloneBox = $('.cart-tbody:hidden').clone(true, true);
                            // 图片
                            $cloneBox.find('.goods-pic').find('img').attr('src', value.url);
                            $cloneBox.find('.b-action a').attr('sid', value.sid);
                            // 标题
                            $cloneBox.find('.goods-d-info').find('a').html(value.title);
                            // 价格
                            $cloneBox.find('.b-price').find('strong').html('￥' + value.price);
                            // 输入框数量
                            $cloneBox.find('.quantity-form').find('input').val(num);
                            // 单个商品价格
                            $cloneBox.find('.b-sum').find('strong').html('￥' + (value.price * num).toFixed(2));
                            $cloneBox.css('display', 'block');
                            $('.cart-item-list').append($cloneBox);
                            calcPrice();

                            // //
                            let ori = $cloneBox.find('.quantity-form input').val();
                            let $aSid = $.cookie('cookieSid').split(',');
                            let $aNum = $.cookie('cookieNum').split(',');
                            let i = $aSid.indexOf($cloneBox.find('.b-action a').attr('sid'));

                            console.log(i)
                            $cloneBox.find('.quantity-add').on('click', function() { //给每个克隆的元素的+添加事件
                                ori++;
                                console.log(i)
                                $cloneBox.find('.quantity-form input').val(ori);
                                $aNum[i] = ori;
                                console.log($aNum)
                                $cloneBox.find('.b-sum').find('strong').html('￥' + (value.price * ori).toFixed(2));
                                calcPrice();
                                $.cookie('cookieNum', $aNum, { expires: 100, path: '/' })
                            });
                            //down按钮

                            $cloneBox.find('.quantity-down').on('input', function() {
                                calcPrice();
                            });


                            $cloneBox.find('.quantity-down').on('click', function() { //给每个克隆的元素的+添加事件
                                if (ori > 0) {
                                    ori--;
                                } else {
                                    ori = 0;

                                }
                                $cloneBox.find('.quantity-form input').val(ori);
                                $aNum[i] = ori;
                                $cloneBox.find('.b-sum').find('strong').html('￥' + (value.price * ori).toFixed(2));
                                calcPrice();
                                $.cookie('cookieNum', $aNum, { expires: 100, path: '/' })
                            });

                            // 删除按钮
                            $cloneBox.find('.b-action a').eq(0).on('click', function() { //给每个克隆的元素的+添加事件
                                if (window.confirm('你确定要删除吗？')) {
                                    $cloneBox.remove();
                                    // let $aSid = $.cookie('cookieSid').split(',');
                                    // let $aNum = $.cookie('cookieNum').split(',');
                                    // let i = $aSid.indexOf($('.b-action a').sid)
                                    $aSid.splice(i, 1);
                                    $aNum.splice(i, 1); //删除数组中对应索引的数据
                                    // console.log($aNum);
                                    calcPrice();
                                    $.cookie('cookieNum', $aNum, { expires: 100, path: '/' }); //重新写入cookie
                                    $.cookie('cookieSid', $aSid, { expires: 100, path: '/' }); //重新写入cookie
                                }

                            });

                        } //
                    });
                });
            }

            // 计算总价函数
            function calcPrice() {
                let $sum = 0;
                let $count = 0;
                // 计算选中的商品总价总数
                $('.cart-tbody:visible').each(function(index, element) {
                    if ($(element).find('.cart-checkbox input').prop('checked')) {

                        $sum += parseInt($(element).find('.quantity-form input').val());
                        // console.log()
                        $count += parseFloat($(element).find('.b-sum strong').html().split('￥')[1]);
                    }
                });
                // 写入
                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html('￥' + $count.toFixed(2));
            }
            // 计算单价
            // function calcsingleprice(obj) { //obj元素对象
            //     let $dj = parseFloat(obj.find('.b-price strong').html());
            //     let $num = parseInt(obj.find('.quantity-form input').val());
            //     return ($dj * $num).toFixed(2)
            // }

            // 根据cookie值渲染购物车
            if ($.cookie('cookieSid') && $.cookie('cookieNum')) {
                let sid = $.cookie('cookieSid').split(',');
                let num = $.cookie('cookieNum').split(',');
                $.each(sid, function(index, element) {
                    showList(sid[index], num[index], index);
                });
            }
            // 全选
            $('.allsel').on('change', function() {
                $('.cart-tbody:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
                $('.allsel').prop('checked', $(this).prop('checked'));
                calcPrice(); //计算总价
            });
            let $inputs = $('.goods-item:visible').find(':checkbox');
            $('.item-list').on('change', $inputs, function() {
                //$(this):被委托的元素，checkbox
                if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcPrice(); //计算总价
            });


        }
    }
});