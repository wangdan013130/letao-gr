$(function() {
    // 检测是否登录
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

    // 获取数据
    $.ajax({
        type:'get',
        url:`${APP.baseUrl}/category/querySecondCategoryPaging`,
        data : {
            page : 1,
            pageSize : 20
        },
        success : function(response) {
            console.log(response);
            if (response.error) {
                location.href = 'login.html';
            }  else {
                var html = template('categoryTpl',
                    {
                        list:response,
                        // api : 'http://fullstack.net.cn:3000'
                        api : 'http://localhost:3000'
                    }
                );
                $('#categoryBox').html(html);
            }

        }
    });

    // 获取一级分类数据, 渲染至弹出框中
    $.ajax({
        type : 'get',
        url : `${APP.baseUrl}/category/queryTopCategoryPaging`,
        data : {
            page : 1,
            pageSize : 100000
        },
        success : function( response) {
            console.log(response);
            if (response.error) {
                location.href = 'login.html'; 
            } else {
                var html = template('optionTpl',response);
                $('#optionBox').append(html);
            }
        }
    })


    // 上传文件   引用插件
    var brandLogo = '';

    $('#fileUpload').fileupload({
	    dataType: 'json',
	    done: function (e, data) {
	    	console.log(data);
	    	// 存储图片地址
	    	brandLogo = data._response.result.picAddr;
	    	// 拼接图片url
	    	var imgUrl= APP.baseUrl + data._response.result.picAddr;
	    	// 将图片渲染到页面中
	     	$("#imgPreview").attr("src",imgUrl);
	    }
	});

    // 发送添加请求
    $('#addCategorySecond').on('click',function() {
        var brandName = $('#brandName').val();
        var categoryId = $('#categoryBox').val();
        var hot = 1;
        $.ajax({
            type : 'post',
            url : `${APP.baseUrl}/category/addSecondCategory`,
            data : {
                brandName,
                categoryId,
                brandLogo,
                hot
            },
            success : function() {
                console.log(success);
            }
        })
    })
});