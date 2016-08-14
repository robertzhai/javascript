var search_flag = true ;

var share_number = '',share_info ='';
$(document).ready(function() {
	 $('#input_num').keydown(function() {
		 var code = parseInt(event.keyCode);
		 if(search_flag && code == 13) {
			 search_flag = false;
			 search_number();
		 }
		 search_flag = true;
	 })
	 $('#phonenumberfrom').css("margin-bottom","25px");
	 
	 $('#input_num').focus(function() {
		 var phone_number = $('#input_num').val();
		 if(phone_number == '输入电话号码进行查询') {
			 $('#input_num').val(''); 
			 $('#input_num').css('color','rgb(0, 0, 0)');
		 }
	 })
	 $('#input_num').blur(function() {
		 var phone_number = $('#input_num').val();
		 if(phone_number == '') {
			 $('#input_num').val('输入电话号码进行查询'); 
			 $('#input_num').css('color','rgb(136, 136, 136)');
		 }
	 })
 })

function hid_middle(str) {
	var len = str.length;
	if(len<=6) {
		return str.substr(0,1)+'**'+str.substr(3);
	}
	if(len<=8) {
		return str.substr(0,3)+'***'+str.substr(6);
	}
	return str.substr(0,3)+'****'+str.substr(7);
} 

function  search_number() {
	 $('#phonenumberfrom').css("margin-bottom","5px");
	 var phone_number = $('#input_num').val();
	 share_number = hid_middle(phone_number);
	 if(!phone_number || phone_number == '输入电话号码进行查询' || phone_number.length <5) {
		 $('#inputerror').show();
		 $('#phonenumberfrom').hide();
		 $('#numberbelongs').hide();
		 share_info = '';
		 return false;
	 }else {
		 
		 $('#inputerror').hide();
		 $('#phonenumberfrom').show(); 
	 }
	 var result = load_number_info(phone_number);
	 load_place_info(phone_number);
	 return false;
 }
function load_number_info(phone_number) {
	 var url = "http://data.haoma.sogou.com/vrapi/query_number.php?number=" + phone_number + "&type=json&callback=show_number";
	 try{
		var oldE = document.getElementById("script_id");
		if(oldE)
		{
			document.body.removeChild(oldE);
		}
		var e = document.createElement("script");
		e.id = "script_id";
		e.type = 'text/javascript';
		e.src = url;
		document.body.appendChild(e);
	}catch(e)
	{
	}
}
function show_number(data) {
	if(data && data.NumInfo ) {
		var amount = parseInt(data.Amount); 
		var info = data.NumInfo;
		var index = info.search('：');
		if(index != -1) {
			info = info.substr(index+1);
		}
		
		$('#number_mark').html(info);
		$('#number_mark').show();
		if(amount > 0) {
			str = '(该信息由' + amount + '位搜狗号码通用户标记,可供参考)'; 
		} else if(info != '该号码暂无标记') {
			str = '(该信息由搜狗号码通用户标记,可供参考)'; 
			
		}
		if(info != '该号码暂无标记') {
			$('#number_source').html(str); 
			$('#number_source').show(); 
			share_info = info;
		} else {
			$('#number_source').hide(); 
			share_info = '';
		}
		console.log(share_info);
	} else {
		share_info = '';
		$('#inputerror').hide();
		$('#noexistnumber').show();
		$('#phonenumberfrom').hide();
		$('#numberbelongs').hide();
	}
}
function load_place_info(phone_number) {
	 var url = "http://www.sogou.com/websearch/phoneAddress.jsp?phoneNumber="+ phone_number + "&cb=show_place";
	 try{
		var oldE = document.getElementById("script_place");
		if(oldE)
		{
			document.body.removeChild(oldE);
		}
		var e = document.createElement("script");
		e.id = "script_place";
		e.type = 'text/javascript';
		e.src = url;
		document.body.appendChild(e);
	}catch(e)
	{
	}
}

function show_place(data) {
	if(data) {
		$('#phonenumberdetail').html(data);
		$('#numberbelongs').show();
		hide_number_tip();
	}else {
		$('#numberbelongs').hide();
	}
	
}
function hide_number_tip() {
	$('#inputerror').hide();
	$('#noexistnumber').hide();
}
var string_haomatong = '';
function open_share(s,d,e,r,l,p,t,z,c){
	var f='http://v.t.sina.com.cn/share/share.php?appkey=2322889166',u=z||d.location,p=['&url=',e(u),'&title=',e(t||d.title),'&source=',e(r),'&sourceUrl=',e(l),'&content=',c||'utf-8','&pic=',e(p||'')].join('');
	window.close();
	function a(string_haomatong){
		if(!window.open([f,p].join(''),'mb',['toolbar=0,status=0,resizable=1,width=440,height=130,left=',(s.width-440)/2,',top=',(s.height-430)/2].join('')))u.href=[f,p].join('');};if(/Firefox/.test(navigator.userAgent))
			setTimeout(a,0);
		else a();
}
function share_haomatong() {
	if( share_number && share_info) {
		string_haomatong = '我正在使用搜狗浏览器应用#搜狗号码通#，查询陌生来电'+ share_number + '，原来它是' + share_info + '电话，大家一起来行动，让骚扰电话无处藏匿！体验地址：http://ie.sogou.com/tools/tool_2936.html 分享到微博还能赢50元手机话费！@搜狗浏览器 @搜狗号码通 ';
	} else {
		string_haomatong = '我正在使用搜狗浏览器应用#搜狗号码通#，查询陌生来电，大家一起来行动，让骚扰电话无处藏匿！体验地址：http://ie.sogou.com/tools/tool_2936.html 分享到微博还能赢50元手机话费！@搜狗浏览器 @搜狗号码通 ';
	}
	
	open_share(screen,document,encodeURIComponent,'','','http://haoma.sogou.com/images/logo.png?v=0.2',string_haomatong,'','utf-8');
	
}

