$(function() {
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
})

$(function() {
    $.ajax({
        type : 'get',
        url : `${APP.baseUrl}/user/queryUser`,
        data : {
            page : 1,
            pageSize : 5
        },
        success : function(response) {
            console.log(response);
            var html = template('userTpl', response);
            $('#userBox').append(html);
        }
    });

    $('#userBox').on('click','.statubtn',function() {
        //console.log(1);
        var id = $(this).data('id');
        var isdelete1 = $(this).data('delete');
        console.log(id);
        console.log(isdelete1);

        // $.ajax({
        //     type : 'post',
        //     url : `${APP.baseUrl}/user/updateUser`,
        //     data : {
        //         id : id,
        //         isdelete1 : isdelete1 == 1 ? 0 : 1
        //     },
        //     success : function(response) {
        //         console.log(response);
        //     }
        // })
        $.ajax({
            type : 'post',
            url :  `${APP.baseUrl}/user/updateUser`,
            data : {
                id : id,
                isdelete : isdelete1 == 1? 0: 1
            },
            success : function(response) {
                if (response.success) {
                    location.reload();
                } else {
                    alert(response.message);
                }
            }
        })
    })
})
