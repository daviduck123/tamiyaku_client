// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});


myApp.onPageInit('index', function (page) {
   
});

myApp.onPageInit('grup', function (page) {
	var id_grup = getcookie("id_grup");
	getAllGrupPost(id_grup);
    setPullRefreshGrup();
});

myApp.onPageInit('buatGrup', function (page) {
	getKotaGrup();
});


myApp.onPageInit('home', function (page) {
	getAllPost();
    setPullRefreshHome();
});

myApp.onPageInit('daftar', function (page) {
	getKota();
});

$$('.panel-left').on('panel:opened', function () {
	getAllGrup();
});


function setPullRefreshHome(){
    var ptrContent = $$('#pullToRefreshHome');
    ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                getAllPost();
                myApp.pullToRefreshDone(); // After we refreshed page content, we need to reset pull to refresh component to let user pull it again:
            }, 2000);
        });
}

function setPullRefreshGrup(){
    var ptrContent = $$('#pullToRefreshGrup');
    ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
                var id_grup = getcookie("id_grup");
                getAllGrupPost(id_grup);
                myApp.pullToRefreshDone(); // After we refreshed page content, we need to reset pull to refresh component to let user pull it again:
            }, 2000);
        });
}