<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
	<title>Infinite Scroll Demo 2 - jQuery4u</title>
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<style>
.bsap {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
  z-index: 999;
}
.close_bsap {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  padding: 5px 8px;
}
</style>
	<script type="text/javascript"  src="demo.js"></script>
	<script type="text/javascript">
		$(window).scroll(function(){
		    if($(window).scrollTop() == $(document).height() - $(window).height()){
		    	$('div#loadmoreajaxloader').show();
				$.ajax({
					url: "loadmore.php",
					success: function(html){
						if(html){
							$("#postswrapper").append(html);
							$('div#loadmoreajaxloader').hide();
						}else{
							$('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
						}
					}
				});
		    }
		});
	</script>

	<style>
		body{ margin:0px; }

		#wrapper{
			width:600px;
			margin:auto;
		}
		.spacer{
			clear:both;
			height:5px;
		}
		.txtarea{
			font-size:18px;
			height:50px;
			width:100%;
		}
		#postswrapper{
			border-bottom:1px dotted #555555;
		}
		.item{
			border-top:1px dotted #555555;
			padding:10px 5px;
			font-size: 16px;
		}
		.item:hover{
			background:#EFEFEF;
		}
		#newpostlink{
			display:block;text-align:center;border:2px solid #414141;background:#7D7D7D;color:#fff; margin: 0 0 10px;padding:5px; -moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 5px;font-size:20px;text-decoration:none;
		}
	</style>
</head>
<body>

<div style="display:inline-block;width:100%;padding:10px;background-color:#FFFFFF">
<a href="http://www.jquery4u.com/tutorials/jquery-infinite-scrolling-demos/">< Back to tutorial page</a>
</div>

  <!-- BuySellAds Zone Code -->
<div id="bsap_1285666" class="bsarocks bsap_ea957971a5e1fed9f25dd8e7a8b9f59e"></div>
<!-- End BuySellAds Zone Code -->

	<div id="wrapper">
		<div id="postswrapper">

		<p style="font-size:28px">Infinite Scroll Demo 2</p>




<div class="item">
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>
		</div>

		<div id="loadmoreajaxloader" style="display:none;"><center><img src="ajax-loader.gif" /></center></div>

	</div>

<div id="footer" style="display:inline-block;width:100%;padding:10px;background-color:#FFFFFF">
<p>Copyright <a target="_blank" href="http://www.jquery4u.com">jQuery4u.com</a> 2011</p>
</div>


</body>
</html>