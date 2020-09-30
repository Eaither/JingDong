define(['jcookie'], function() {
    return {
        init: function() {
            const smallpic = $('#smallpic'); //小图图片
            const bpic = $('#bpic') //大图
                // 从地址获取sid
            let $num = location.search.toString(1).split('=')[1];
            console.log($num);
            // 从后端获取sid对应的数据
            $.ajax({
                url: "http://192.168.13.24/jingdong/php/getsid.php",
                dataType: 'json',
                data: {
                    sid: $num
                }
            }).done(function(data) {
                console.log(data);
                // 渲染
                smallpic.attr('src', data.url);
                bpic.attr('src', data.url);
                $('.p-price price').attr('src', data.price);
                // 判断是否是字眼
            });

        }
    }
})