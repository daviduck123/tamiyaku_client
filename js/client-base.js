//var urlnya="http://localhost/tamiyaku-server";
var urlnya="http://server.neoalitcahya.com";
//var urlnya = "http://10.0.2.2/tamiyaku-server"

//var urlnya="http://server.domain.com";
//var urlnya = "http://10.0.2.2/tamiyaku-server"
var globalListKelas = [];
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

function saveData(dataName, dataValue) {

    localStorage.setItem(dataName, dataValue);
}

function getData(dataName) {
	return localStorage.getItem(dataName);
}

function eraseData(dataName){
	localStorage.removeItem(dataName);
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
	return "kosong.png";
  }
}
