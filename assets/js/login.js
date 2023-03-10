$(function(){

    $("#link-reg").on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $("#link-login").on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 获取layui的form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value) {
           var pwd = $('.reg-box [name=password]').val()
           if(pwd !== value) {
             return '两次密码不一致！'
           } 
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        // 阻止默认的提交行为
        e.preventDefault()
        var data = {username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,
        function(res){
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功,请登录！')
            // 模拟人的点击行为
            $('#link-login').click()
        })
    })

    // 监听登录表单的提交
    $('#form_login').submit(function(e){
        // 阻止默认的提交行为
        e.preventDefault()
        $.ajax({
            url:'api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==  0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token)
                // 将登录成功后得到的token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})