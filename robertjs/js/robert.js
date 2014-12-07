/**
 * 
 * author: rorbet
 * 参考：https://gist.github.com/iwek/5599777
 * 		http://www.w3.org/TR/XMLHttpRequest/
 * 	   http://www.w3school.com.cn/xml/xml_http.asp
 * 
 */

( function() {
	
	var robert = {};
	robert.alert = function(str){
		alert(str);
	}
	robert.getById = function(id) {
		return document.getElementById(id)
	}
	robert.getByName = function(name) {
		var returns = document.getElementsByName(name);   
	      if(returns.length > 0) return returns;   
	      returns = new Array();   
	      var e = document.getElementsByTagName("*");   
	      for(var i = 0,len = e.length; i < len; i++) {   
	                if(e[i].getAttribute("name") == name) {   
	                     returns[returns.length] = e[i];   
	                }   
	       }   
	       return returns; 
	}
	robert.getByTag = function(tag) {
		return document.getElementsByTagName(tag)
	}
	robert.attribute = function(elem, attribute){
		return elem.getAttribute(attribute)
    }
	//https://github.com/desandro/get-style-property/blob/master/get-style-property.js
	robert.getStyleProperty = function( propName ) {
		  if ( !propName ) {
		    return;
		  }

		  // test standard property first
		  if ( typeof docElemStyle[ propName ] === 'string' ) {
		    return propName;
		  }

		  // capitalize
		  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

		  // test vendor specific properties
		  var prefixed;
		  for ( var i=0, len = prefixes.length; i < len; i++ ) {
		    prefixed = prefixes[i] + propName;
		    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
		      return prefixed;
		    }
		  }
	}
	robert.ajax = function(url,  callback, parames,method, async) {
		var xhr = null;
		if(typeof XMLHttpRequest !== 'undefined') {
			xhr = new XMLHttpRequest();
		} else {
			var versions = ["MSXML2.XmlHttp.5.0", 
				 	"MSXML2.XmlHttp.4.0",
				 	"MSXML2.XmlHttp.3.0", 
				 	"MSXML2.XmlHttp.2.0",
				 	"Microsoft.XmlHttp"]
	 
			for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
				catch(e){}
			} // end for
		}
		
		if (xhr!=null){
			xhr.onreadystatechange = ensureReadiness;
			var asyncrize = (!async || (async == true)) ? true : false;
			//client.open(method, url [, async = true [, username = null [, password = null]]])
			var data = (parames) ? parames : null;
			xhr.open(method.toUpperCase(), url, asyncrize);
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xhr.send(data);
		  } else{
			  alert("Your browser does not support XMLHTTP.");
		  }
			
		function ensureReadiness() {
			if(xhr.readyState < 4) {
				return;
			}
			if(xhr.status !== 200) {
				return;
			}
			// all is well	
			if(xhr.readyState === 4) {
				if(typeof callback == "function") {
					callback(xhr.responseText);
				}
			}			
		}
	}
	
	
	Array.prototype.indexOf = function( obj ){
	    var result = -1 , length = this.length , i=length - 1;
	    for ( ; i>=0 ; i-- ) {
	        if ( this[i] == obj ) {
	            result = i;
	            break;
	        }
	    }
	    return result;
	}
	Array.prototype.contains = function( obj ) {
	    return ( this.indexOf( obj ) >=0 )
	}
	Array.prototype.append = function( obj , nodup ) {
	    if ( !(nodup && this.contains( obj )) ) {
	        this[this.length] = obj;
	    }
	}
	Array.prototype.remove = function( obj ) {
	    var index = this.indexOf( obj );
	    if ( !index ) return ;
	    return this.splice( index , 1);
	};
	
	function addEvent(element , type , fun){
	    if (!element.events) element.events = {};            
	    var handlers = element.events[type];
	    if (!handlers) {
	        handlers = element.events[type] = [];
	        if(element['on' + type]) {        
	            handlers[0] = element['on' + type];
	        }
	    }
	    handlers.append( fun , true)
	    element['on' + type] = handleEvent;
	}
	function removeEvent(element , type , fun) {
	    if (element.events && element.events[type]) {
	        element.events[type].remove(fun); 
	    }
	}
	function handleEvent(event) {
	    var returnValue = true , i=0;
	    event = event || fixEvent(window.event);
	    var handlers = this.events[event.type] , length = handlers.length;
	    for ( ; i < length ; i++) {
	        if ( handlers[i].call( this , event) === false ){
	            returnValue = false;
	        }
	    }
	    return returnValue;
	}
	function fixEvent(event) {
	    event.preventDefault = fixEvent.preventDefault;
	    event.stopPropagation = fixEvent.stopPropagation;
	    return event;
	}
	fixEvent.preventDefault = function() {
	    this.returnValue = false;
	};
	fixEvent.stopPropagation = function() {
	    this.cancelBubble = true;
	};
	
	robert.addEvent = addEvent;
	robert.removeEvent = removeEvent;
	
	//对输入框的操作
	robert.focus = function(elem , callback) {
		robert.addEvent(elem,'focus',callback)
	}
	//对输入框的操作
	robert.blur = function(elem , callback) {
		robert.addEvent(elem,'blur',callback)
	}
	//对输入框的操作
	robert.click = function(elem , callback) {
		robert.addEvent(elem,'click',callback)
	}
	//对输入框的操作
	robert.hover = function(elem , callback) {
		robert.addEvent(elem,'hover',callback)
	}
	
	//http://www.oschina.net/code/snippet_4873_3394
	robert.getCursortPosition = function (ctrl) {
		var CaretPos = 0;	// IE Support
		if (document.selection) {
		ctrl.focus ();
			var Sel = document.selection.createRange ();
			Sel.moveStart ('character', -ctrl.value.length);
			CaretPos = Sel.text.length;
		}
		// Firefox support
		else if (ctrl.selectionStart || ctrl.selectionStart == '0')
			CaretPos = ctrl.selectionStart;
		return (CaretPos);
	}
	
	robert.setCaretPosition = function(ctrl, pos){
		if(ctrl.setSelectionRange)
		{
			ctrl.focus();
			ctrl.setSelectionRange(pos,pos);
		}
		else if (ctrl.createTextRange) {
			var range = ctrl.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
	
	window.robert = robert;
}
)(window)