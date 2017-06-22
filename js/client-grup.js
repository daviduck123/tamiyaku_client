//-----------------------------------------------------------------------------------------------------------------------------------------------------GRUP
function getNearbyGrup(){
	var id_user = getcookie("active_user_id");

	if ( navigator.geolocation )
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		//tidak bisa ambil lat lng
		myApp.alert('Posisi anda tidak dapat diakses', 'Perhatian!');
	}
	
	function showPosition(position) {
		var latKuSekarang = position.coords.latitude;
		var lngKuSekarang = position.coords.longitude;
		
		var link=urlnya+'/api/grup/getGrupNearBy?id_user='+id_user+'&lat='+latKuSekarang+'&lng='+lngKuSekarang;
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
			
			$("#isi_list_grup_disekitar").remove();
			$("#list_grup_disekitar").append('<div id="isi_list_grup_disekitar"></div>');
			
			for(var i=0;i<dataLength;i++)
			{
				var jarak=parseFloat(z[i]['distance']);
				jarak = jarak.toFixed(1);
					var html =			'<li>';
					html += 				'<a href="#" onclick="gotoGroup('+z[i]['id']+');" id="grup_'+z[i]['id']+'" class="item-link">';
					html += 					'<div class="item-content">';
					html += 						'<div class="item-media"><img src="data:image/jpeg;base64,'+z[i]['foto']+'" style="width:35px; height:35px;"></div>';
					html += 						'<div class="item-inner">';
					html += 							'<div class="item-title">'+z[i]['nama']+'</div>';
					html += 							'<div class="item-after">'+z[i]['lokasi']+' <span class="badge">'+jarak+'km</span></div>';
					html += 						'</div>';
					html += 					'</div>';
					html += 				'</a>';
					html += 			'</li>';
					
					$("#isi_list_grup_disekitar").append(html);
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan data grup disekitar gagal", 'Perhatian!');
		});
		/*
		//kalau pake map dibawah ini nyalakan
		var map = new GMaps({
			div: '#mapNearByGrup',
			lat: latKuSekarang,
			lng: lngKuSekarang,
		});
		
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
			
			for(var i=0;i<dataLength;i++)
			{
				map.addMarker({
					lat: z[i]['lat'],
					lng: z[i]['lng'],
					draggable: false,
					infoWindow: {
					  content: '<p>'+z[i]['nama']+', jarak '+ z[i]['distance']+' km'
					}
				});
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan data grup disekitar gagal", 'Perhatian!');
		});
		*/
	}
}

function gotoNearbyGrup(){
	mainView.router.loadPage('nearbyGrup.html');
	myApp.closePanel();
}

function gotoCreateGroup(){
	mainView.router.loadPage('buatGrup.html');
	myApp.closePanel();
}

function gotoGroup(clickedId){
	eraseCookie("id_grup");
	document.cookie = "id_grup="+clickedId+";";
	mainView.router.loadPage('grup.html');
	//getAllGroupPost dipanggil akan dipanggil jika saat ini user buka page grup dan ingin membuka grup yg lain karena element html terbuat dan dapat diakses
	//jika mengakses grup pertama kali fungsi dibawah tidak akan berguna karena element belum dapat diakses, oleh karena itu butuh bantuan myApp.onPageInit pada my-app.js
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
		}
		else
		{
			getInfoGrup(id_grup);
			showButtonJoinGrup(id_grup);
		}
	}).fail(function(x){
		myApp.alert("Pengambilan data grup disekitar gagal", 'Perhatian!');
	});
	
	//===========================
	myApp.closePanel();
}

function gotoPetaGrup(latData, lngData){
	myApp.popup('.popup-grup');
	var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>Letak lokasi grup.</p>'+
					  '<div id="petaLokasiGrup" style="width:330px; height:300px;"></div>'+
                      '<p><a href="#" class="close-popup">Kembali</a></p>'+
                    '</div>'+
                  '</div>'
	myApp.popup(popupHTML);
	
	var map = new GMaps({
		div: '#petaLokasiGrup',
		lat: latData,
		lng: lngData,
	});
	
	if ( navigator.geolocation )
    {
		navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
	{
		//tidak bisa ambil lat lng
		map.addMarker({
			lat: latData,
			lng: lngData,
			draggable: false,
			infoWindow: {
			  content: '<p>Tidak bisa menghitung jarak dikarenakan posisi anda sekarang tidak dapat diambil</p>'
			}
		});
	}
	
	function showPosition(position) {
		console.log("lat:"+position.coords.latitude+"\nlng:"+position.coords.longitude);
        var latKuSekarang = position.coords.latitude;
		var lngKuSekarang = position.coords.longitude;
		
		var dist = Haversine( latData, lngData, latKuSekarang, lngKuSekarang );
		map.addMarker({
			lat: latData,
			lng: lngData,
			draggable: false,
			infoWindow: {
			  content: '<p>Posisi anda sekarang ke lokasi grup '+ dist.toFixed(2)+' km'
			}
		});
	}

    // Convert Degress to Radians
    function Deg2Rad( deg ) {
       return deg * Math.PI / 180;
    }

    // Get Distance between two lat/lng points using the Haversine function
    // First published by Roger Sinnott in Sky & Telescope magazine in 1984 (“Virtues of the Haversine”)
    //
    function Haversine( lat1, lon1, lat2, lon2 )
    {
        var R = 6372.8; // Earth Radius in Kilometers

        var dLat = Deg2Rad(lat2-lat1);  
        var dLon = Deg2Rad(lon2-lon1);  

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                        Math.cos(Deg2Rad(lat1)) * Math.cos(Deg2Rad(lat2)) * 
                        Math.sin(dLon/2) * Math.sin(dLon/2);  
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 

        // Return Distance in Kilometers
        return d;
    }
}

function gotoGoogleMap(){
	myApp.popup('.popup-about');
	var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p>Silahkan pilih peta letak lokasi grup.</p>'+
					  '<div id="petaku" style="width:330px; height:300px;"></div>'+
                      '<p><a href="#" class="close-popup">Kembali</a></p>'+
                    '</div>'+
                  '</div>'
	myApp.popup(popupHTML);
	
	var map;
	function showPosition(position) {
		//console.log("lat:"+position.coords.latitude+"\nlng:"+position.coords.longitude);
		map = new GMaps({
				div: '#petaku',
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				click: function(e) {
				  },
			});
			
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			
			if(lat != null && lng != null)
			{
				var html =	"<div id='isi_latlng_buatGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
				html	+=		"<input type='hidden' id='lat_buatGrup' value='"+lat+"'>";
				html	+=		"<input type='hidden' id='lng_buatGrup' value='"+lng+"'>";
				html	+=	"</div>"
				$("#isi_latlng_buatGrup").remove();
				$("#latlng_buatGrup").append(html);
			}
			
			map.addMarker({

				lat: position.coords.latitude,
				lng: position.coords.longitude,
				draggable: true,
				dragend: function(event) {
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					//myApp.alert('Latitude = '+lat+"\nLongitude = "+lng, 'Lokasi');
					
					if(lat != null && lng != null)
					{
						var html =	"<div id='isi_latlng_buatGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
						html	+=		"<input type='hidden' id='lat_buatGrup' value='"+lat+"'>";
						html	+=		"<input type='hidden' id='lng_buatGrup' value='"+lng+"'>";
						html	+=	"</div>"
						$("#isi_latlng_buatGrup").remove();
						$("#latlng_buatGrup").append(html);
					}
				}
			});
	}
    
	$(document).ready(function(){
		if (navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(showPosition);
		} 
		else 
		{ 
			var lat = -7.2582548000000005;
			var lng = 112.76117359999999;
			
			if(lat != null && lng != null)
			{
				var html =	"<div id='isi_latlng_buatGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
				html	+=		"<input type='hidden' id='lat_buatGrup' value='"+lat+"'>";
				html	+=		"<input type='hidden' id='lng_buatGrup' value='"+lng+"'>";
				html	+=	"</div>"
				$("#isi_latlng_buatGrup").remove();
				$("#latlng_buatGrup").append(html);
			}
			
			map = new GMaps({
				div: '#petaku',
				lat: ﻿﻿-7.2582548000000005,
				lng: 112.76117359999999,
				click: function(e) {
					alert('Silahkan geser marker ke lokasi yang anda inginkan!');
				  },
			});	
			
			map.addMarker({

				lat:  ﻿-7.2582548000000005,
				lng: 112.76117359999999,
				draggable: true,
				dragend: function(event) {
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					//myApp.alert('Latitude = '+lat+"\nLongitude = "+lng, 'Lokasi');
					
					if(lat != null && lng != null)
					{
						var html =	"<div id='isi_latlng_buatGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
						html	+=		"<input type='hidden' id='lat_buatGrup' value='"+lat+"'>";
						html	+=		"<input type='hidden' id='lng_buatGrup' value='"+lng+"'>";
						html	+=	"</div>"
						$("#isi_latlng_buatGrup").remove();
						$("#latlng_buatGrup").append(html);
					}
				}
			});
		}
	});	
}

function getKotaBuatGrup() {
	var link=urlnya+'/api/kota/';
		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var myOptions = z;

			$.each(myOptions, function(i, el) 
			{ 
			   $('#kota_buatGrup').append( new Option(el.nama,el.id) );
			});
			
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal", 'Perhatian!');
		}); 
}

function buatGrupPost() {
	
	var namaGrup = document.getElementById("nama_buatGrup").value;
	var kota = $('#kota_buatGrup').find(":selected").val();
	var kelas = $('#kelas_buatGrup').find(":selected").val();
	var lokasi = document.getElementById("lokasi_buatGrup").value;
	var lat = document.getElementById("lat_buatGrup").value;
	var lng = document.getElementById("lng_buatGrup").value;
	var id_user = getcookie("active_user_id");
	var fileinput = document.getElementById("file_buatGrup").value;
	
	if(namaGrup=="")
	{
		myApp.alert('Silahkan isi nama grup', 'Perhatian!');
	}
	else
	{
		if(kota=="" || kota==0 || kota=="0")
		{
			myApp.alert('Silahkan pilih kota grup', 'Perhatian!');
		}
		else
		{
			if(kelas=="" || kelas==0 || kelas=="0")
			{
				myApp.alert('Silahkan pilih kelas grup', 'Perhatian!');
			}
			else
			{
				if(lokasi=="")
				{
					myApp.alert('Silahkan pilih lokasi grup', 'Perhatian!');
				}
				else
				{
					if(lat == null || lng == null)
					{
						myApp.alert('Silahkan pilih lokasi peta grup', 'Perhatian!');
					}
					else
					{
						if(fileinput=="")
						{
							myApp.alert('Silahkan pilih foto anda', 'Perhatian!');
						}
						else
						{
							var blob=$("#file_buatGrup")[0].files[0];
							var formData = new FormData();
							formData.append("nama", namaGrup);
							formData.append("lokasi", lokasi);
							formData.append("lat", lat);
							formData.append("lng", lng);
							formData.append("id_kota", kota);
							formData.append("id_user", id_user);
							formData.append("id_kelas", kelas);
							formData.append("file", blob);
							
							var link=urlnya+'/api/grup/createGrup';
							//console.log(formData);
							
							//for (var pair of formData.entries()) {
							//	console.log(pair[0]+ ', ' + pair[1]); 
							//}
							$.ajax({
								url: link,
								data: formData,
								type: 'POST',
								contentType: false,
								processData: false
							}).done(function(z){
								mainView.router.loadPage('home.html');
								myApp.alert('Grup berhasil dibuat', 'Berhasil!');
							}).fail(function(x){
								myApp.alert(x.message+" "+x.error, 'Perhatian!');
							});
						}
					}
				}
			}		
		}
	}
}

function getAllGrup() {
	var id_user = getcookie("active_user_id");
	var link=urlnya+'/api/grup?id_user='+id_user;
		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			
			$("#isi_kumpulan_grup").remove();
			$("#kumpulan_grup").append('<div id="isi_kumpulan_grup"></div>');
			
			var dataLength=0;
			for (var pair of z) {
							dataLength++;
			}
			
			if(dataLength!=0)
			{
				for(var i=0;i<dataLength;i++)
				{
					var html =	'<a href="#" onclick="gotoGroup('+z[i]['id']+');" id="grup_'+z[i]['id']+'" style="color:white;">';
					html += 				'<li class="item-content">';
					html += 					'<div class="item-media">';
					html += 						"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='padding:0px; margin-right:10px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 					'</div>';
					html += 					'<div class="item-inner">';
					html += 					'<div class="item-title">'+z[i]['nama']+'</div>';
					html += 					'</div>';
					html += 				'</li>';
					html += 			'</a>';
					
					$("#isi_kumpulan_grup").append(html);
				}
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal", 'Perhatian!');
		}); 
}

function showButtonJoinGrup(id){
	
	$("#isi_form_komentari_grup").remove();
	$("#form_komentari_grup").append('<div id="isi_form_komentari_grup"></div>');
			
	var html =	'<p><a href="#" id="joinGrup" class="button active" onclick="joinThisGrup('+id+');" type="submit" style="width:100px; float:right; margin-right:5%;">Join Grup</a></p>';
	
	//jika sudah ada tidak perlu bikin lagi
	if($("#joinGrup").length == 0) {
		$("#isi_form_komentari_grup").append(html);
	}
}

function showButtonLeaveGrup(id){
	$("#isi_leaveGrup").remove();
	$("#leaveGrup").append('<div id="isi_leaveGrup"></div>');
			
	var html =	'<a href="#" id="keluarGrup" class ="badge" onclick="leaveThisGrup('+id+');" type="submit">Keluar grup</a>';
	
	//jika sudah ada tidak perlu bikin lagi
	//if($("#keluarGrup").length == 0) {
		$("#isi_leaveGrup").append(html);
	//}
}

function leaveThisGrup(clickedId){
	var id_grup=clickedId;
	var id_user = getcookie("active_user_id");
	
	var link=urlnya+'/api/grup/leaveGrup?id_grup='+id_grup+'&id_user='+id_user;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			console.log(z.status);
			if(z.status==true)
			{
				$("#isi_leaveGrup").remove();
				$("#isi_postingan_grup").remove();
				myApp.alert("Anda telah keluar dari grup", 'Perhatian!');
				showButtonJoinGrup(clickedId);
			}
		}).fail(function(x){
			myApp.alert("Pengambilan postingan grup gagal", 'Perhatian!');
		}); 
}

function joinThisGrup(clickedId){
	var id_grup=clickedId;
	var id_user = getcookie("active_user_id");
	
	var link=urlnya+'/api/grup/joinGrup?id_grup='+id_grup+'&id_user='+id_user;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			console.log(z.status);
			if(z.status==true)
			{
				myApp.alert("Join grup berhasil", 'Perhatian!');
				showButtonLeaveGrup(clickedId);
				getAllGrupPost(clickedId);
			}
		}).fail(function(x){
			myApp.alert("Pengambilan postingan grup gagal", 'Perhatian!');
		}); 
}

function getAllGrupPost(clickedId) {
	var id_grup = clickedId;
	var link=urlnya+'/api/post/getAllPostByGrup?id_grup='+id_grup;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var pair of z) {
				coba+=pair['id']+"|"; 
				dataLength++;
			}
			$("#isi_postingan_grup").html("");
			$("#isi_form_komentari_grup").html("");
			
			var html2= '<form action="/action_page.php">';
			html2 +=	'<div class="item-content">';
			html2 +=		'<div class="item-inner">';
			html2 +=			'<div class="item-input">';
			html2 +=				'<center><textarea id="status_grup" style="resize:none; margin-top:10px; width:90%; height:60px;" ';
			html2 +=					'placeholder="Tulis apa yang ingin anda bahas.."></textarea>';
			html2 +=				'</center>';
			html2 +=			'</div>';
			html2 +=		'</div>';
			html2 +=	' </div>';
			html2 +=	'<div class="item-content" style="margin-top:-10px;">';
			html2 +=	'<div class="item-inner" >';
			html2 +=	'<div style="height:0px;overflow:hidden">';
			html2 +=	'<input type="file" id="file_grup" accept="image/*"/>';
			html2 +=	'</div>';
			html2 +=	'<p><a href="#" class="button active" onclick="statusGrupPost();" type="submit" style="width:70px; float:right; margin-right:5%;">Kirim</a></p>';
			html2 +=	'<p><a href="#" class="button"  onclick="chooseFile_grup();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>';
			html2 +=	'</form>';
			
			
			$("#isi_form_komentari_grup").append(html2);
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				if(z[i]['foto']!="")
				{
					var html=	"<div id='posting_grup_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table__grup_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td colspan='2'>"+z[i]['deskripsi']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td colspan='2' >";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>";
					html += 				"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_grup_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<p><a href='#' class='button' onclick='komentariGrupPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
					html += 			"<p><a href='#' onclick='bacaGrupKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_grup").append(html);
				}
				else
				{
					
					var html=	"<div id='posting_grup_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_grup_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td colspan='2'>"+z[i]['deskripsi']+"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_grup_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<p><a href='#' class='button' onclick='komentariGrupPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
					html += 			"<p><a href='#' onclick='bacaGrupKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_grup").append(html);
				}
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan postingan grup gagal", 'Perhatian!');
		}); 
}

function getInfoGrup(clickedId){
	var id_grup = clickedId;
	var link=urlnya+'/api/grup/getGrupInfo?id_grup='+id_grup;
		
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
			var indeks=0;
			$("#isi_detil_grup").html("");
			
			for(var i=0;i<dataLength;i++)
			{
				var nama=z[i]['nama'];
				var foto=z[i]['foto'];
				var lat=z[i]['lat'];
				var lng=z[i]['lng'];
				var lokasi=z[i]['lokasi'];
				var id_kota=z[i]['id_kota'];
				id_kota-=1;
				
				var link=urlnya+'/api/kota/';
				$.ajax({
					url: link,
					type: 'GET',
					contentType: false,
					processData: false
				}).done(function(zz){
					if(indeks==0)
					{
						indeks++;
						var html=	'<table id="detil_grup" style="margin-top:20px;">';
						html += 		'<tr>';
						html += 			'<td rowspan="4"><img src="data:image/jpeg;base64,'+foto+'" style="width:90px; height:90px;  margin-right:10px"></td>';
						html += 			'<td style="font-weight:bold;"><a id="nama_grup">'+nama+'</a></td>';
						html += 		'</tr>';
						html += 		'<tr>';
						html += 			'<td style="font-weight:bold;"><a id="kota_grup">'+zz[id_kota]['nama']+'</a></td>';
						html += 		'</tr>';
						html += 		'<tr>';
						html += 			' <td colspan="2"><a id="alamat_grup"><i class="icon fa fa-map-marker"></i><span style="margin:10px;">'+lokasi+'</span></a></td>';
						html += 		'</tr>';
						html += 		'<tr>';
						html += 			'<td colspan="2"><a href="#" onclick="gotoPetaGrup('+lat+','+lng+');"><i class="icon fa fa-map"></i><span style="margin:10px;">Tap disini untuk melihat peta</span></a></td>';
						html += 		'</tr>';
						html += 	'</table';
						
						//jika sudah ada tidak perlu bikin lagi
						if($("#detil_grup").length == 0) {
							$("#isi_detil_grup").append(html);
						}
					}
				}).fail(function(x){
					myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
				}); 	
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan informasi grup gagal", 'Perhatian!');
		}); 
}

function statusGrupPost() {
	//ON PROGRESS
	var id_user = getcookie("active_user_id");
	var status = document.getElementById("status_grup").value;
	var id_grup = getcookie("id_grup");
	
	var link=urlnya+'/api/post/createPost/';
	
	if(status=="")
	{
		myApp.alert('Anda belum mengisi isi postingan anda', 'Perhatian!');
	}
	else
	{
		var blob=$("#file_grup")[0].files[0];
		var formData = new FormData();
		formData.append("id_user", id_user);
		formData.append("id_grup", id_grup);
		formData.append("deskripsi", status);
		formData.append("file", blob);

		$.ajax({
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			mainView.router.loadPage('grup.html');
			$("#status_grup").val("");
			$("#file_grup").val("");
			myApp.alert("Berhasil post di grup", 'Data Dikirim!');
			getAllGrupPost(id_grup);
			$("#status_grup").val("");
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menambah status, silahkan coba lagi', 'Perhatian!');
			var coba="";
			for (var pair of formData.entries()) {
							coba+=pair[0]+ ', ' + pair[1]; 
			}
			console.log(coba);
		});
		
	}
}

function bacaGrupKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_grup_"+id_post).length == 0) 
	{
		
			$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_post='+id_post;
				
			$.ajax({
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				if(z.length>0)
				{
					var html= "<div  id='isi_komentar_grup_"+id_post+"'>";
					for(var i=0;i<z.length;i++)
					{
						//if(z[i]['foto']!="")
						//{
							html += 		"<table style='background-color:#e6e6e6;'  width='100%;'>";
							html += 			"<tr>";
							html += 				"<td rowspan='2' width='10%'>";
							html += 					"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							html += 				"</td>";
							html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
							html += 				"<td style='font-size:10px;'>"+z[i]['deskripsi']+"</td>";
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
							html += 			"</tr>";
							html += 		"</table>";
							
							//$("#kolom_komentar_"+clicked_id).append(html);
						//}
						//else
						//{																													
							
						//}
					}
					html +=  "</div>";
					//console.log(html);
					$("#kolom_komentar_grup_"+clicked_id).append(html);
				}
				else
				{
					//nggak ada yang komentar
				}
			}).fail(function(x){
				myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
			});
			
		});
	} 
	else 
	{
		$("#isi_komentar_grup_"+id_post).remove();
	}
}

function komentariGrupPost(clicked_id) {
	//ON PROGRESS
	var id_user = getcookie("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_grup_"+id_post;
		var vartable="table_grup_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
		//console.log(vartable);
		
		if($("#" + vardeksripsi).length == 0) {
				$("#"+vartable).find('tbody').append(" <tr> <td colspan='5'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; margin-left:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
		} 
		else 
		{
			var deskripsi = document.getElementById(vardeksripsi).value;
			if(deskripsi=="")
			{
				myApp.alert('Anda belum mengisi komentar', 'Perhatian!');
			}
			else
			{
				var link=urlnya+'/api/komentar/';
				var formData=JSON.stringify({
					id_user:id_user,
					id_post:id_post,
					deskripsi:deskripsi,
				});
				//myApp.alert(formData, 'Data Dikirim!');
				
				$.ajax({
					url: link,
					data: formData,
					type: 'POST',
					contentType: false,
					processData: false
				}).done(function(z){
					mainView.router.loadPage('grup.html');
					getAllGrupPost(id_post);
					//myApp.alert('Komentar dibuat', 'Berhasil!');
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
				});
			}
		}
	});
}