//var urlnya="http://localhost/tamiyaku-server";
var urlnya="http://server.neoalitcahya.com";
//var urlnya = "http://10.0.2.2/tamiyaku-server"
var globalListKelas = [];
var globalCookie = [];
var globalLapak = [];

function logout() {
	myApp.closePanel();
	mainView.router.loadPage('login.html');
	eraseData("active_user_id");
	eraseData("active_user_nama");
	eraseData("active_user_email");
	eraseData("active_user_jenis_kelamin");
	eraseData("expires");
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
