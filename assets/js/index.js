$(function () {
    getUserInformation();
    $(".logOut").on('click',function () {
        layer.confirm('是否退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
          });
         
    })
})

// 用户信息登录
function getUserInformation(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function (res){
            // console.log(res);
            if(res.status !== 0) return layer.msg('获取用户信息失败')
            renderAvatar(res.data)
        },
        complete:function (res) {
            // console.log(res);
            // if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
            //     localStorage.removeItem('token')
            //     location.href = '/login.html'
            // }
        }
        
    })
}

// 用户头像
function renderAvatar(userinfo) {
    const name = userinfo.nickname || userinfo.username
    $('#welcome').html('欢迎您'+name)
    if(userinfo.user_pic !== null){
        $('.default-img-lf').hide()
        $('.default-img-rt').hide()
        $(".layui-nav-img").attr('src',userinfo.user_pic).show()
    }
    $('.layui-nav-img').hide()
    var first = name[0].toUpperCase()
    $('.default-img-lf').text(first).show()
    $('.default-img-rt').text(first).show()

}