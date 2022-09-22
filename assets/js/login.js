$(function () {
    $(".link-login").on('click', 'a', function () {
        $('.regist').hide();
        $('.login').show();
    })

    $(".link-regist").on('click', 'a', function () {
        $('.login').hide();
        $('.regist').show();
    })

    /* 自定义账号input正则 */
    var form = layui.form;
    var layer = layui.layer;
    // var alertbox = layer.open;
    form.verify({
        pass: [(/^[\S]{6,12}$/), '请输入6——12位不含空格密码'],
        repass: function (value) {
            var password = $('.regist [name = password]').val();
            if (value !== password) {
                return '两次密码不同';
            }
        }
    })
    // 提交注册账号
    $(".regist .layui-form").on('submit', function (e) {
        e.preventDefault();
        var urldata = 'api/reguser';
        var data = $(this).serialize();
        $.ajax({
            type: 'post',
            url: urldata,
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                $('.link-login').click();
            }
        })
    })
    // 登录账号
    $(".login .layui-form").on('submit', function (e) {
        var urldata = '/api/login';
        var data = $(this).serialize();
        e.preventDefault();
        $.ajax({
            type: "post",
            url: urldata,
            data: data,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layer.msg('账号或者密码错误');
                }
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            }
        })
    })
    
})

