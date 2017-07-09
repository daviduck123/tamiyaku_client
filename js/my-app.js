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
	
	var id_user = getData("active_user_id");
	var id_grup = getData("id_grup");
	
	var link=urlnya+'/api/grup/checkJoinedGrup?id_user='+id_user+'&id_grup='+id_grup;
	console.log(link);
	$.ajax({ dataType: "jsonp",
	    url: link,
	    type: 'GET',
	    contentType: false,
	    processData: false
	}).done(function(z){
		var dataLength=0;
		for (var ii = 0 ; ii < z.length ; ii++) {
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

myApp.onPageInit('updateEvent', function (page) {
	var tempIdPost=getData("idPostEvent");
	editEventPost(tempIdPost);
});

myApp.onPageInit('buatGrup', function (page) {
	getKotaBuatGrup();
	$(".select-list-kelas").empty();
	$.each(globalListKelas, function (id, text) {
		var key = Object.keys(text);
		var value = Object.values(text);
	    $(".select-list-kelas").append($('<option>', { 
	        value: key[0],
	        text : value[0]
	    }));
	});
});

myApp.onPageInit('buatEvent', function (page) {
	getKotaBuatEvent();
	$(".select-list-kelas").empty();
	$.each(globalListKelas, function (id, text) {
		var key = Object.keys(text);
		var value = Object.values(text);
	    $(".select-list-kelas").append($('<option>', { 
	        value: key[0],
	        text : value[0]
	    }));
	});
});

myApp.onPageInit('home', function (page) {
	getAllPost();
    setPullRefreshHome();
    $(".select-list-kelas").empty();
	$.each(globalListKelas, function (id, text) {
		var key = Object.keys(text);
		var value = Object.values(text);
	    $(".select-list-kelas").append($('<option>', { 
	        value: key[0],
	        text : value[0]
	    }));
	});
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

myApp.onPageInit('createTrack', function (page) {
	bindDraggableTrack();
	myApp.closePanel();
});

myApp.onPageInit('profilTeman', function (page) {
	//var id_teman = getData("id_profilTeman");
	//getProfilTeman(id_teman);
});

myApp.onPageInit('searchTemanGrup', function (page) {
	myApp.closePanel();
});

myApp.onPageInit('buatJualBarang', function (page) {
	getKotaBuatJualBarang();
	$(".select-list-kelas").empty();
	$.each(globalListKelas, function (id, text) {
		var key = Object.keys(text);
		var value = Object.values(text);
	    $(".select-list-kelas").append($('<option>', { 
	        value: key[0],
	        text : value[0]
	    }));
	});
});

myApp.onPageInit('lapakSaya', function (page) {

});

$$('.panel-left').on('panel:opened', function () {
	getAllGrup();
	var username = getData("active_user_nama");
	$("#index_name").html("");
	$("#index_name").append(username);
	
	$(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
});

$$('.panel-right').on('panel:opened', function () {
	var id_user = getData("active_user_id");
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
                var id_grup = getData("id_grup");
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
				//var id_teman=document.getElementById('#id_teman_temp').value;
				var id_teman = getData("id_teman");
				console.log(id_teman+"aaa");
                getAllTemanPost(id_teman);
                myApp.pullToRefreshDone(); // After we refreshed page content, we need to reset pull to refresh component to let user pull it again:
            }, 2000);
        });
}

function viewRouterBack(){
mainView.router.back();
}