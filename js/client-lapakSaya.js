function gotoEditLapakSaya(){
	mainView.router.loadPage('editLapakSaya.html');
	myApp.closePanel();
}

function gotoLapakSaya(){
	mainView.router.loadPage('lapakSaya.html');
	getAllLapakSayaPost();
	myApp.closePanel();
}

function getKotaEditLapakSaya() {
	myApp.showPreloader('Mengambil data...');
	var link=urlnya+'/api/kota/';
		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var myOptions = z;

			$.each(myOptions, function(i, el) 
			{ 
			   $('#kota_editLapakSaya').append( new Option(el.nama,el.id) );
			});
			myApp.closeModal();
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 28)", 'Perhatian!');
		}); 
}

function buatLapakSayaPost() {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var namaLapakSaya = document.getElementById("nama_buatLapakSaya").value;
	var kelas = $('#kelas_buatLapakSaya').find(":selected").val();
	var harga = document.getElementById("harga_buatLapakSaya").value;
	var kota = $('#kota_buatLapakSaya').find(":selected").val();
	var deskripsi = document.getElementById("deskripsi_buatLapakSaya").value;
	var fileinput = document.getElementById("file_buatLapakSaya").value;
	
	if(namaLapakSaya=="")
	{
		myApp.alert('Silahkan isi nama barang', 'Perhatian!');
	}
	else
	{
		if(harga=="" || harga==0 || harga=="0")
		{
			myApp.alert('Silahkan isi harga barang', 'Perhatian!');
		}
		else
		{
			if(kota=="" || kota==0 || kota=="0")
			{
				myApp.alert('Silahkan pilih kota', 'Perhatian!');
			}
			else
			{
				if(kelas=="" || kelas==0 || kelas=="0")
				{
					myApp.alert('Silahkan pilih kelas', 'Perhatian!');
				}
				else
				{
					if(deskripsi=="")
					{
						myApp.alert('Silahkan isi deskripsi barang anda', 'Perhatian!');
					}
					else
					{
						if(fileinput=="")
						{
							myApp.alert('Silahkan pilih foto barang anda', 'Perhatian!');
						}
						else
						{
							var blob=$("#file_buatLapakSaya")[0].files[0];
							var formData = new FormData();
							formData.append("nama", namaLapakSaya);
							formData.append("harga", harga);
							formData.append("deskripsi", deskripsi);
							formData.append("id_user", id_user);
							formData.append("id_kota", kota);
							formData.append("id_kelas", kelas);
							formData.append("file", blob);
							
							console.log(formData);
												
							var link=urlnya+'/api/jualBeli/createJualBeli';
							$.ajax({ 
								url: link,
								data: formData,
								type: 'POST',
								contentType: false,
								processData: false
							}).done(function(z){
								myApp.closeModal();
								myApp.alert('Jual Barang berhasil dibuat', 'Berhasil!');
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

function getAllLapakSayaPost() {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;
	}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1)');
	}); 
			
		link=urlnya+'/api/jualBeli/getUserLapak?id_user='+id_user;		
		
		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var ii = 0 ; ii < z.length; ii++) {
				coba+=z['id']+"|"; 
				dataLength++;
			}
			$("#isi_container_lapakSaya").html("");
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				storeImage(z[i]['foto'], "editFotoLapakSaya_"+z[i]['id']);
				var tempIdKota=z[i]['id_kota'];
				tempIdKota-=1;
				saveData( "editNamaLapakSaya_"+z[i]['id'],z[i]['nama']);
				saveData( "editDeskripsiLapakSaya_"+z[i]['id'],z[i]['nama']);
				saveData( "editHargaLapakSaya_"+z[i]['id'],z[i]['nama']);
				saveData( "editId_kotaLapakSaya_"+z[i]['id'],z[i]['nama']);
				saveData( "editKelasLapakSaya_"+z[i]['id'],z[i]['nama']);
				saveData( "editEmailLapakSaya_"+z[i]['id'],z[i]['nama']);
				
				tempIdKota -=1;
					var html=	"<div id='posting_lapakSaya_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_lapakSaya_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2' width='10%'>";
					html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">'+z[i]['nama']+'</div></td>';
					//html +=					'<td>: </td>';
					//html +=					'<td colspan="2" style="font-weight:bold;">'+z[i]['deskripsi']+'</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">Rp.'+z[i]['harga']+',-</div></td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				'<td colspan="5" class="q" >';
					html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
					html += 				"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					//html += 		'<input type="hidden" name="hidden_id_lapakSaya_'+z[i]['id']+'" value='+z[i]['id']+'>';
					//html += 		'<input type="hidden" name="hidden_nama_lapakSaya_'+z[i]['id']+'" value='+z[i]['nama']+'>';
					//html += 		'<input type="hidden" name="hidden_deskripsi_lapakSaya_'+z[i]['id']+'" value='+z[i]['deskripsi']+'>';
					//html += 		'<input type="hidden" name="hidden_harga_lapakSaya_'+z[i]['id']+'" value='+z[i]['harga']+'>';
					//html += 		'<input type="hidden" name="hidden_foto_lapakSaya_'+z[i]['id']+'" value='+z[i]['foto']+'>';
					//html += 		'<input type="hidden" name="hidden_id_kota_lapakSaya_'+z[i]['id']+'" value='+arrKota[tempIdKota]['id']+'>';
					//html += 		'<input type="hidden" name="hidden_email_lapakSaya_'+z[i]['id']+'" value='+z[i]['email']+'>';
					html += 			"<p><a href='#' class='button' onclick='editLapakSaya(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Edit</a></p>";
					html += 			"<p><a href='#' class='konfirmasiHapusJualan' onclick='hapusLapakSaya(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Hapus</a></p>";
					html += 	"</div>";
					
					$("#isi_container_lapakSaya").append(html);
			}
			myApp.closeModal();
		}).fail(function(x){
			myApp.alert("Pengambilan postingan Jual Beli barang gagal", 'Perhatian!');
		}); 
}

function editLapakSaya(clickedID){
	myApp.showPreloader('Mengambil data...');
	var id_user= getData("active_user_id");
	var id_lapak= clickedID;
	var temp="editNamaLapakSaya_"+id_lapak;
	var nama = getData(temp);
	var deskripsi = getData("editDeskripsiLapakSaya_"+id_lapak);
	var harga = getData("editHargaLapakSaya_"+id_lapak);
	var foto = getImage("editFotoLapakSaya_"+id_lapak);
	var id_kelas = getData("editKelasLapakSaya_"+id_lapak);
	var id_kota = getData("editId_kotaLapakSaya_"+id_lapak);
	var email = getData("editEmailLapakSaya_"+id_lapak);
	
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;
		
		myApp.popup('.popup-edit');
		var popupHTML = '<div class="popup">'+
						'<div class="content-block">'+
						  '<center>'+
							'<table style="margin-top:-0px;">'+
							'<input type="hidden" id="update_id_editLapakSaya_'+id_lapak+'" value='+id_lapak+'>'+
							'	<tr>'+
							'		<td><p>Nama</p></td>'+
							'		<td><input id="nama_editLapakSaya_'+id_lapak+'" type="text" value='+nama+' required></td>'+
							'	</tr>'+
							'	<tr>'+
							'		<td><p>Kelas</p></td>'+
							'		<td>'+
							'		<select name="kelas_editLapakSaya_'+id_lapak+'" id="kelas_editLapakSaya_'+id_lapak+'">'+
							'		  <option value="0">Pilih Kelas</option>';
		if(id_kelas==1)
			popupHTML+=			'		  <option value="1" selected>STB</option>';
		else
			popupHTML+=			'		  <option value="1">STB</option>';
		if(id_kelas==2)
			popupHTML+=			'		  <option value="2" selected>STO</option>';
		else
			popupHTML+=			'		  <option value="2">STO</option>';
		if(id_kelas==3)
			popupHTML+=			'		  <option value="3" selected>SPEED</option>';
		else
			popupHTML+=			'		  <option value="3">SPEED</option>';
		popupHTML+=			'		</select>'+
							'		</td>'+
							'	</tr>'+
							'	<tr>'+
							'		<td><p>Harga</p></td>'+
							'		<td>Rp.<input id="harga_editLapakSaya_'+id_lapak+'" type="number" value='+harga+' required></td>'+
							'	</tr>'+
							'	<tr>'+
							'		<td><p>Kota</p></td>'+
							'		<td>'+
							'		<select id="kota_editLapakSaya_'+id_lapak+'">'+
							'		  <option value="0">Pilih Kota</option>';
							
							for(var i=0;i<arrKota.length;i++)
							{
								if(arrKota[i]['id']==id_kota)
								{
									popupHTML+=	'<option value="'+arrKota[i]['id']+'" selected>'+arrKota[i]['nama']+'</option>';
								}
								else
								{
									popupHTML+=	'<option value="'+arrKota[i]['id']+'">'+arrKota[i]['nama']+'</option>';
								}
							}
							
		popupHTML+=			'		</select>'+
							'		</td>'+
							'	</tr>'+
							'	<tr>'+
							'		<td><p>Foto</p></td>'+
							'		<div style="height:0px;overflow:hidden">'+
							'			<input type="file" id="file_editLapakSaya" accept="image/*"/>'+
							'			</div>'+
							'		<td><p><a href="#" class="button" onclick="chooseFile_editLapakSaya();" style="width:150px;">Pilih Gambar..</a></p></td>'+
							'	</tr>'+
							'	<tr>'+
							'		<td colspan="5" id="container_foto_editLapakSaya">'+
							'			<img id="foto_editLapakSaya" class="lazy" src="data:image/jpeg;base64,'+foto+'" style="width:100%;">'+
							'		</td>'+
							'</tr>'+
							'	<tr>'+
							'		<td><p>Deskripsi</p></td>'+
							'		<td><textarea id="deskripsi_editLapakSaya_'+id_lapak+'" style="resize:none; margin-top:10px; height:60px;">'+deskripsi+'</textarea></td>'+
							'	</tr>'+
							'</table><td><p><a href="#" class="button"  onclick="editLapakSayaPost('+id_lapak+');" style="width:250px;">Simpan perubahan</a></p></td>'+
						'</center>'+
						  '<p><a href="#" class="close-popup">Kembali</a></p>'+
						'</div>'+
					  '</div>';
		myApp.popup(popupHTML);
			myApp.closeModal();
	}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1)');
	});
}

function editLapakSayaPost(clickedID) {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var id_lapak = document.getElementById("update_id_editLapakSaya_"+clickedID).value;
	var namaLapakSaya = document.getElementById("nama_editLapakSaya_"+clickedID).value;
	var kelas = $('#kelas_editLapakSaya_'+clickedID).find(":selected").val();
	var harga = document.getElementById("harga_editLapakSaya_"+clickedID).value;
	var kota = $('#kota_editLapakSaya_'+clickedID).find(":selected").val();
	var deskripsi = document.getElementById("deskripsi_editLapakSaya_"+clickedID).value;
	var fileinput = document.getElementById("file_editLapakSaya").value;
	
	if(namaLapakSaya=="")
	{
		myApp.alert('Silahkan isi nama barang', 'Perhatian!');
	}
	else
	{
		if(harga=="" || harga==0 || harga=="0")
		{
			myApp.alert('Silahkan isi harga barang', 'Perhatian!');
		}
		else
		{
			if(kota=="" || kota==0 || kota=="0")
			{
				myApp.alert('Silahkan pilih kota', 'Perhatian!');
			}
			else
			{
				if(kelas=="" || kelas==0 || kelas=="0")
				{
					myApp.alert('Silahkan pilih kelas', 'Perhatian!');
				}
				else
				{
					if(deskripsi=="")
					{
						myApp.alert('Silahkan isi deskripsi barang anda', 'Perhatian!');
					}
					else
					{
						if(fileinput=="")
						{
							var formData = new FormData();
							formData.append("id_jualbeli", id_lapak);
							formData.append("nama", namaLapakSaya);
							formData.append("harga", harga);
							formData.append("deskripsi", deskripsi);
							formData.append("id_user", id_user);
							formData.append("id_kota", kota);
							formData.append("id_kelas", kelas);
							
							console.log(formData);
												
							var link=urlnya+'/api/jualBeli/updateJualBeli';
							$.ajax({
								url: link,
								data: formData,
								type: 'POST',
								contentType: false,
								processData: false
							}).done(function(z){
								//mainView.router.loadPage('home.html');
								myApp.alert('Perubahan berhasil disimpan', 'Berhasil!');
								getAllLapakSayaPost();
								myApp.closeModal();
							}).fail(function(x){
								myApp.alert(x.message+" "+x.error, 'Perhatian!');
							});
						}
						else
						{
							var blob=$("#file_editLapakSaya")[0].files[0];
							var formData = new FormData();
							formData.append("id_jualbeli", id_lapak);
							formData.append("nama", namaLapakSaya);
							formData.append("harga", harga);
							formData.append("deskripsi", deskripsi);
							formData.append("id_user", id_user);
							formData.append("id_kota", kota);
							formData.append("id_kelas", kelas);
							formData.append("file", blob);
																			
							var link=urlnya+'/api/jualBeli/updateJualBeli';
							$.ajax({
								url: link,
								data: formData,
								type: 'POST',
								contentType: false,
								processData: false
							}).done(function(z){
								//mainView.router.loadPage('home.html');
								myApp.alert('Perubahan berhasil disimpan', 'Berhasil!');
								getAllLapakSayaPost();
								myApp.closeModal();
							}).fail(function(x){
								myApp.alert(x.message+" "+x.error, 'Perhatian!');
							});
						}
						myApp.closeModal();
					}	
				}
			}
		}
	}
}

function hapusLapakSaya(clickedId)
{
	myApp.confirm('Apakah anda yakin untuk menghapus jualan anda?', 'Hapus data', 
      function () {
        var link=urlnya+'/api/jualBeli/deleteJualBeli?id_jualbeli='+clickedId;
		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			myApp.alert("Anda berhasil menghapus jualan)", 'Berhasil!');
			getAllLapakSayaPost();
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 28)", 'Perhatian!');
		}); 
      },
      function () {
        //myApp.alert('You clicked Cancel button');
      }
    );
}