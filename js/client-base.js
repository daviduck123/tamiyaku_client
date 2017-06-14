var urlnya="http://localhost/tamiyaku-server";
//var urlnya="http://server.domain.com";

var globalCookie = [];

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

function logout() {
	myApp.closePanel();
	mainView.router.loadPage('login.html');
	eraseCookie("active_user_id");
	eraseCookie("active_user_nama");
	eraseCookie("active_user_email");
	eraseCookie("active_user_jenis_kelamin");
	eraseCookie("expires");
}

function getcookie(cookiename){
	var cookiestring  = document.cookie;
	var cookiearray = cookiestring.split(';');
	for(var i =0 ; i < cookiearray.length ; ++i)
	{ 
		if(cookiearray[i].trim().match(cookiename+'='))
		{ 
			var temparray = cookiearray[i].split('=');
			return temparray[1];
		}
	} return null;
}
	
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function storeImage(profilePicData, imageName) {

    localStorage.setItem(imageName,profilePicData);
}

function getImage(imageName) {

  if ( localStorage.getItem(imageName)) 
  {
    return localStorage.getItem(imageName);
  }
  else 
  {
	return "ksosong.png";
  }
}
