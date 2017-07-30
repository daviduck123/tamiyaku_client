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
	$("textarea[id^=deskripsi_]").each(function(e){
		$(this).remove();
	});
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

myApp.onPageInit('editGrup', function (page) {
	var id_grup = document.getElementById("temp_id_grup").value;
	var nama = document.getElementById("temp_nama_grup").value;
	var id_kelas = document.getElementById("temp_kelas_grup").value;
	var id_kota = document.getElementById("temp_kota_grup").value;
	var alamat = document.getElementById("temp_alamat_grup").value;
	var foto = document.getElementById("temp_foto_grup").value;
	var lat = document.getElementById("temp_lat_grup").value;
	var lng = document.getElementById("temp_lng_grup").value;
	
	$('#id_editGrup').val(id_grup);
	$('#nama_editGrup').val(nama);
	$("#kelas_editGrup").empty();
	$.each(globalListKelas, function (id, text) {
		var key = Object.keys(text);
		var value = Object.values(text);
		if(id_kelas==key)
		{
			$("#kelas_editGrup").append($('<option>', { 
				selected:true,
				value: key[0],
				text : value[0]
			}));
		}
		else
		{
			$("#kelas_editGrup").append($('<option>', { 
				value: key[0],
				text : value[0]
			}));
		}
	});
	
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;	
		$("#kota_editGrup").empty();
		$("#kota_editGrup").append('<option value="0">Pilih Kota</option>');
		
		for(var i=0;i<arrKota.length;i++)
		{
			var tempIdKota=1+i;
			if(arrKota[i]["id"]==id_kota)
			{
				$("#kota_editGrup").append('<option value="'+tempIdKota+'" selected>'+arrKota[i]["nama"]+'</option>');
			}
			else
			{
				$("#kota_editGrup").append('<option value="'+tempIdKota+'">'+arrKota[i]["nama"]+'</option>');
			}
		}
		
		$('#lokasi_editGrup').val(alamat);
		
		var html =	"<div id='isi_latlng_editGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
		html	+=		"<input type='hidden' id='lat_editGrup' value='"+lat+"'>";
		html	+=		"<input type='hidden' id='lng_editGrup' value='"+lng+"'>";
		html	+=	"</div>"
		$("#isi_latlng_editGrup").remove();
		$("#latlng_editGrup").append(html);
		
		$("#isi_foto_editGrup").remove();
		$('#foto_editGrup').append('<img class="lazy" src="data:image/jpeg;base64,'+foto+'" style="width:240px; height:120px;">');
		
	}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
	}); 
});

myApp.onPageInit('editProfile', function (page) {
	var nama = getData("active_user_nama");
	var id_kota =  getData("active_user_kota");
	var foto =getImage('profilePic')
	var gender = getData("active_user_jenis_kelamin");
	$('#nama_editProfile').val(nama);
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;	
		$("#kota_editProfile").empty();
		$("#kota_editProfile").append('<option value="0">Pilih Kota</option>');
		
		for(var i=0;i<arrKota.length;i++)
		{
			var tempIdKota=1+i;
			if(arrKota[i]["id"]==id_kota)
			{
				$("#kota_editProfile").append('<option value="'+tempIdKota+'" selected>'+arrKota[i]["nama"]+'</option>');
			}
			else
			{
				$("#kota_editProfile").append('<option value="'+tempIdKota+'">'+arrKota[i]["nama"]+'</option>');
			}
		}
		
		$("#isi_foto_editProfile").remove();
		$('#foto_editProfile').append('<img class="lazy" src="data:image/jpeg;base64,'+foto+'" style="width:240px; height:120px;">');
		
		if(gender=="Laki-laki")
		{
			$("#laki_editProfile").attr('checked', 'checked');
		}
		else
		{
			$("#perempuan_editProfile").attr('checked', 'checked');
		}
		
	}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
	}); 
});

myApp.onPageInit('buatEvent', function (page) {
	$("textarea[id^=deskripsi_]").each(function(e){
		$(this).remove();
	});
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
	$("textarea[id^=deskripsi_]").each(function(e){
		$(this).remove();
	});
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
	$("textarea[id^=deskripsi_]").each(function(e){
		$(this).remove();
	});
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
			var tempA=aaa+1;
			 $('#show_kategori_jualBeli').append('<option value="'+tempA+'">'+dataKategori[aaa]["nama"]+'</option>');
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
	var kelas_dipilih = $('#kelas_dipilih').find(":selected").val();
	if(kelas_dipilih==""||kelas_dipilih==null)
	{
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
	}
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