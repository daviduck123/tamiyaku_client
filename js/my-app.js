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
	
	var id_user = getcookie("active_user_id");
	var id_grup = getcookie("id_grup");
	
	var link=urlnya+'/api/grup/checkJoinedGrup?id_user='+id_user+'&id_grup='+id_grup;
	console.log(link);
	$.ajax({
	    url: link,
	    type: 'GET',
	    contentType: false,
	    processData: false
	}).done(function(z){
		var dataLength=0;
		for (var pair of z) {
			dataLength++;
		}
		
		if(dataLength>0)
		{
			getAllGrupPost(id_grup);
			getInfoGrup(id_grup);
			showButtonLeaveGrup(id_grup);
			setPullRefreshGrup();
		}
		else
		{
			getInfoGrup(id_grup);
			showButtonJoinGrup(id_grup);
		}
	}).fail(function(x){
		myApp.alert("Pengambilan data grup disekitar gagal", 'Perhatian!');
	});
	
});

myApp.onPageInit('nearbyGrup', function (page) {
	myApp.closePanel();
	getNearbyGrup();
});

myApp.onPageInit('buatGrup', function (page) {
	getKotaBuatGrup();
});

myApp.onPageInit('buatEvent', function (page) {
	getKotaBuatEvent();
});

myApp.onPageInit('home', function (page) {
	getAllPost();
    setPullRefreshHome();
});

myApp.onPageInit('daftar', function (page) {
	getKota();
});

myApp.onPageInit('lomba', function (page) {
	getAllEventPost();
});

myApp.onPageInit('teman', function (page) {
	getAllTeman();
	myApp.closePanel();
});

myApp.onPageInit('profilTeman', function (page) {
	//var id_teman = getcookie("id_profilTeman");
	//getProfilTeman(id_teman);
});

myApp.onPageInit('searchTemanGrup', function (page) {
	myApp.closePanel();
});

$$('.panel-left').on('panel:opened', function () {
	getAllGrup();
	var username = getcookie("active_user_nama");
	$("#index_name").html("");
	$("#index_name").append(username);
	
	$(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
});

$$('.panel-right').on('panel:opened', function () {
	var id_user = getcookie("active_user_id");
	getAllNotif(id_user);
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

function setPullRefreshProfilTeman(){
    var ptrContent = $$('#pullToRefreshProfileTeman');
    ptrContent.on('refresh', function (e) {
            // Emulate 2s loading
            setTimeout(function () {
				var id_teman=document.getElementById('#id_teman_temp').value;
				console.log(id_teman);
                getAllTemanPost(id_teman);
                myApp.pullToRefreshDone(); // After we refreshed page content, we need to reset pull to refresh component to let user pull it again:
            }, 2000);
        });
}

var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple').split(' ');

var autocompleteDropdownSimple = myApp.autocomplete({
    input: '#autocomplete-dropdown',
    openIn: 'dropdown',
    source: function (autocomplete, query, render) {
        var results = [];
        if (query.length === 0) {
            render(results);
            return;
        }
        // Find matched items
        for (var i = 0; i < fruits.length; i++) {
            if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
        }
        // Render items by passing array with result items
        render(results);
    }
});