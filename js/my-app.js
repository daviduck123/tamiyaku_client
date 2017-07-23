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

myApp.onPageInit('jualBeli', function (page) {
	
	var link=urlnya+'/api/kategori/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(dataKategori){
		console.log("masuk");
		var dataLengthKategori=0;
		for (var aaa = 0 ; aaa < dataKategori.length ; aaa++) {
			 $('#show_kategori_jualBeli').append('<option value="'+aaa+'">'+dataKategori[aaa]["nama"]+'</option>');
		}
	}).fail(function(x){
		myApp.closePanel();
		myApp.alert("Pengambilan data kategori gagal", 'Perhatian!');
	});	
	
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
	$(".active_user_email").empty();
	$email=getData("active_user_email");
	$data='<input id="email_buatJualBarang" type="text" value="'+$email+'" disabled>';
	$(".active_user_email").append($data);
	
	var link=urlnya+'/api/kategori/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(dataKategori){
		var myOptions = dataKategori;
		//var lengthKategori=0;
		//for (var dataI = 0 ; dataI < arrKategori.length; dataI++) {
		//	lengthKategori++;
		//}
		$.each(myOptions, function(i, el) 
		{ 
		   $('#kategori_buatJualBarang').append( new Option(el.nama,el.id) );
		});
		mainView.router.loadPage('buatJualBarang.html');
		myApp.closePanel();
	}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 28)", 'Perhatian!');
	}); 
});

myApp.onPageInit('lapakSaya', function (page) {

});

$$('.panel-left').on('panel:opened', function () {
	getAllGrup();
	var username = getData("active_user_nama");
	var idUser=getData("active_user_id");
	$("#index_name").html("");
	$("#index_name").append(username);
	
	$(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
	
	document.getElementById("masukProfileKu").setAttribute("onclick", "gotoProfilTeman("+idUser+");");
	
	//ubah kelas=========================
		$(".select-list-kelas").empty();
		$.each(globalListKelas, function (id, text) {
			var key = Object.keys(text);
			var value = Object.values(text);
			$(".select-list-kelas").append($('<option>', { 
				value: key[0],
				text : value[0]
			}));
		});
	//==============================================
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