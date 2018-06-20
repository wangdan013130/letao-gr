$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});

//  $.fn 
// 将表单数据以 json 的形式传回
$.fn.serializeTojson = function() {
	var formAry = this.serializeArray();
	console.log(formAry);
	var result = {};
	formAry.forEach(function(item) {
		result[item.name] = item.value;
	})
	return result;
}

var APP = {
	// 接口的基础路径
	baseUrl: 'http://fullstack.net.cn:3000'
};



// 允许cookie的写入与发送
$.ajaxSetup({crossDomain: true, xhrFields: {withCredentials: true}});