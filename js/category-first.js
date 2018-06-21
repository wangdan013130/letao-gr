$(function() {
    // alert(1);
    $.ajax({
        type : 'get',
        async : 'fasle',
        url : `${APP.baseUrl}/employee/checkRootLogin`,
        success : function(response) {
            if (response.error) {
                location.href = 'login.html';
            } 
        }
    })
    var page = 1;
    var pageSize = 5;
    var pages = 0;
    
    sendAjax();

    // 点击上一页
    $('#prev').click(function() {
        console.log(11);
        page--;
        if (page < 1) {
            page = 1;
            alert('这已经是第1页了'); 
            return;
        } 
        sendAjax();
    });


    // 点击下一页
    $('#next').click(function() {
        page++;
        if (page > pages) {
            page = pages;
            alert('这是最后一页了');
        }
        sendAjax();
    })


    //  获取每页数据
    function sendAjax() {
        $.ajax({
            type : 'get',
            url : `${APP.baseUrl}/category/queryTopCategoryPaging`,
            data : {
                page : page,
                pageSize : pageSize
            },
            success : function(response) {
                console.log(response);
                if (response.error) {
                    location.herf = 'login.html';
                } else {
                    var html = template('categoryTpl',response);
                    $('#categoryBox').html(html);
                }
                pages = Math.ceil(response.total/pageSize);
            }
        });
    }

    // 添加数据
    $('#addCategoryFirst').on('click',function() {
        var categoryName = $.trim($('.form-control').val());
        if (!categoryName) {
            alert('请输入分类名称');
        }
        $.ajax({
            type : 'post',
            url : `${APP.baseUrl}/category/addTopCategory`,
            data : {
                categoryName
            },
            success : function(response) {
                console.log(response);
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        })
    })
})





