function gotoGoogleMapEdit(){
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
				var html =	"<div id='isi_latlng_editGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
				html	+=		"<input type='hidden' id='lat_editGrup' value='"+lat+"'>";
				html	+=		"<input type='hidden' id='lng_editGrup' value='"+lng+"'>";
				html	+=	"</div>"
				$("#isi_latlng_editGrup").remove();
				$("#latlng_editGrup").append(html);
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
						var html =	"<div id='isi_latlng_editGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
						html	+=		"<input type='hidden' id='lat_editGrup' value='"+lat+"'>";
						html	+=		"<input type='hidden' id='lng_editGrup' value='"+lng+"'>";
						html	+=	"</div>"
						$("#isi_latlng_editGrup").remove();
						$("#latlng_editGrup").append(html);
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
				var html =	"<div id='isi_latlng_editGrupp'>Latitude = "+lat+"<br>Longitude = "+lng;
				html	+=		"<input type='hidden' id='lat_editGrup' value='"+lat+"'>";
				html	+=		"<input type='hidden' id='lng_editGrup' value='"+lng+"'>";
				html	+=	"</div>"
				$("#isi_latlng_editGrup").remove();
				$("#latlng_editGrup").append(html);
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
						var html =	"<div id='isi_latlng_editGrup'>Latitude = "+lat+"<br>Longitude = "+lng;
						html	+=		"<input type='hidden' id='lat_editGrup' value='"+lat+"'>";
						html	+=		"<input type='hidden' id='lng_editGrup' value='"+lng+"'>";
						html	+=	"</div>"
						$("#isi_latlng_editGrup").remove();
						$("#latlng_editGrup").append(html);
					}
				}
			});
		}
	});	
}

function editGrupPost()
{
	//myApp.showPreloader('Mengambil data...');
	var id_user = getData("active_user_id");
	
	var id_grup = document.getElementById("id_editGrup").value;
	var nama = document.getElementById("nama_editGrup").value;
	var id_kelas = $('#kelas_editGrup').find(":selected").val();
	var id_kota = $('#kota_editGrup').find(":selected").val();
	var lokasi = document.getElementById("lokasi_editGrup").value;
	var lat = document.getElementById("lat_editGrup").value;
	var lng = document.getElementById("lng_editGrup").value;
	var fileinput = document.getElementById("file_editGrup").value;
	
	if(nama=="")
	{
		myApp.alert('Silahkan isi nama grup', 'Perhatian!');
	}
	else
	{
		if(id_kota=="" || id_kota==0 || id_kota=="0")
		{
			myApp.alert('Silahkan pilih kota grup', 'Perhatian!');
		}
		else
		{
			if(id_kelas=="" || id_kelas==0 || id_kelas=="0")
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
						var blob=$("#file_editGrup")[0].files[0];
						var formData = new FormData();
						formData.append("id_grup", id_grup);
						formData.append("nama", nama);
						formData.append("lokasi", lokasi);
						formData.append("lat", lat);
						formData.append("lng", lng);
						formData.append("id_kota", id_kota);
						formData.append("id_user", id_user);
						formData.append("id_kelas", id_kelas);
						formData.append("file", blob);
						
						var link=urlnya+'/api/grup/updateGrup';
						//console.log(formData);
						
						//for (var z[ii] of formData.entries()) {
						//	console.log(z[ii][0]+ ', ' + z[ii][1]); 
						//}
						$.ajax({
							url: link,
							data: formData,
							type: 'POST',
							contentType: false,
							processData: false
						}).done(function(z){
							myApp.closeModal();
							mainView.router.loadPage('home.html');
							myApp.alert('Grup berhasil diubah', 'Berhasil!');
						}).fail(function(x){
							myApp.closeModal();
							myApp.alert(x.message+" "+x.error, 'Perhatian!');
						});
					}
				}
			}		
		}
	}
}