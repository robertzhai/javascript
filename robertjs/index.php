<!DOCTYPE html>
<html>
<head>
<title>ajax demo</title>

<script src="js/robert.js"></script>
</head>
<body>
<script>
//	robert.alert("hi ajax");
	// ajax 
	// function(url,  callback, parames,method, async)
//	robert.ajax("server.php" , function(data) {
//           alert(data)
//	},
//	"a=1&b=2",
//	"post"
//	);

	//bind event
  window.onload = function() {
//	  robert.alert("page loaded");
	  //addEvent(element , type , fun)
	  robert.addEvent(
			  robert.getById('test'),
			 'click',
			  function(){
				alert("don't push me too hard")
	 		  }
	  )

//	  alert(robert.getByName("aaa"))
//	  alert(robert.getByTag("input"))
//	  alert(robert.attribute(robert.getById('test'),'id'));
//	  alert(robert.attribute(robert.getById('test'),'name'));
	  robert.focus(robert.getById('1'), 
			  function(){
		  		alert("focused")
		      }
       )
  }
  
</script>
<a id="test" href="javascript:void(0)" name="aaaaa">click me</a>
<input name="aaa"  id="1"/>
<input name="aaa"  id="2"/>
<input name="aaa"  id="2"/>
<input name="aaa"  id="3"/>

</body>
</html>