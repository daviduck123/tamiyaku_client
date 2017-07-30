function gotoBuatJualBarang(){
	mainView.router.loadPage('buatJualBarang.html');
	myApp.closePanel();
}

function gotoJualBeli(){
	mainView.router.loadPage('jualBeli.html');
	getAllJualBeliPost();
	myApp.closePanel();
}

function getKotaBuatJualBarang() {
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
			   $('#kota_buatJualBarang').append( new Option(el.nama,el.id) );
			});
			var id_kota = getData("active_user_kota");
			$("#kota_buatJualBarang").val(id_kota);
			myApp.closeModal();
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 28)", 'Perhatian!');
		}); 
}

function buatJualBarangPost() {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var namaJualBarang = document.getElementById("nama_buatJualBarang").value;
	var kategori = $('#kategori_buatJualBarang').find(":selected").val();
	var kelas = $('#kelas_buatJualBarang').find(":selected").val();
	var harga = document.getElementById("harga_buatJualBarang").value;
	var kota = $('#kota_buatJualBarang').find(":selected").val();
	var deskripsi = document.getElementById("deskripsi_buatJualBarang").value;
	var fileinput = document.getElementById("file_buatJualBarang").value;
	
	if(namaJualBarang=="")
	{
		myApp.alert('Silahkan isi nama barang', 'Perhatian!');
	}
	else
	{
		if(kategori=="" || kategori==0 || kategori=="0")
		{
			myApp.alert('Silahkan pilih kategori anda', 'Perhatian!');
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
							var blob=$("#file_buatJualBarang")[0].files[0];
							var formData = new FormData();
							formData.append("nama", namaJualBarang);
							formData.append("id_kategori", kategori);
							formData.append("harga", harga);
							formData.append("deskripsi", deskripsi);
							formData.append("id_user", id_user);
							formData.append("id_kota", kota);
							formData.append("id_kelas", kelas);
							formData.append("file", blob);
												
							var link=urlnya+'/api/jualBeli/createJualBeli';
							$.ajax({ 
								url: link,
								data: formData,
								type: 'POST',
								contentType: false,
								processData: false
							}).done(function(z){
								myApp.alert('Jual Barang berhasil dibuat', 'Berhasil!');
								viewRouterBack();
								getAllJualBeliPost();
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
}

function getAllJualBeliPost() {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var kelas_dipilih = $('#kelas_dipilih').find(":selected").val();

	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;	
		link=urlnya+'/api/jualBeli/getAllJualBeli?id_user='+id_user;
			$.ajax({ 
				dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				var link=urlnya+'/api/kategori/';
				$.ajax({ dataType: "jsonp",
					url: link,
					type: 'GET',
					contentType: false,
					processData: false
				}).done(function(dataKategori){
					var dataLengthKategori=0;
					for (var aaa = 0 ; aaa < dataKategori.length ; aaa++) {
							dataLengthKategori++;
					}
				
					myApp.closeModal();
					var coba="";
					var dataLength=0;
					for (var ii = 0 ; ii < z.length; ii++) {
						coba+=z[ii]['id']+"|"; 
						dataLength++;
					}
					
					$("#isi_container_jualBeli").html("");
					//munculkan semua post
					for(var i=0;i<dataLength;i++)
					{
						if(kelas_dipilih==z[i]['id_kelas'])
						{
							var tempIdKota=z[i]['id_kota'];
							tempIdKota -=1;
							var html=	"<div id='posting_jualBeli_"+z[i]['id']+"' style='margin-bottom:50px;'>";
							html += 		"<table id='table_jualBeli_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
							html += 			"<tr>";
							html += 				"<td rowspan='2' width='10%'>";
							if(z[i]['user_foto']==getData("active_user_nama"))
							{
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							}
							else
							{
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							}
							html += 				"</td>";
							html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
							if(z[i]['user_nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editPostJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
								html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
							}
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">'+z[i]['nama']+'</div></td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">Rp.'+z[i]['harga']+',-</div></td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kategori</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+dataKategori[z[i]['id_kategori']-1]["nama"]+'</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kelas</div></td>';
							html +=					'<td>: </td>';
							if(z[i]['id_kelas']==1)
								html +=					'<td colspan="2" value="1">STB</td>';
							else if(z[i]['id_kelas']==2)
								html +=					'<td colspan="2" value="2">STO</td>';
							else if(z[i]['id_kelas']==3)
								html +=					'<td colspan="2" value="3">SPEED</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kota</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+arrKota[tempIdKota]['nama']+'</td>';
							html += 			"</tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Deskripsi</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+z[i]['deskripsi']+'</td>';
							html += 			"</tr>";
							html += 			"</tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Email</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2"><a href="mailto:'+z[i]['email']+'?Subject='+z[i]['nama']+'" class="external">'+z[i]['user_email']+'</a></td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				'<td colspan="5" class="q" >';
							html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
							html += 				"</td>";
							html += 			"</tr>";
							html += 		"</table>";
							html += 		"<div id='kolom_komentar_jualBeli_"+z[i]['id']+"'>";
							html += 		"</div>";
							html += 			"<div id='btn_komentari_jualBeli_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
							html += 			"<p><a href='#' onclick='bacaJualBeliKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
							html += 	"</div>";
							
							$("#isi_container_jualBeli").append(html);
						}
					}
					myApp.closeModal();
				}).fail(function(x){
					myApp.closeModal();
					myApp.alert("Pengambilan data kategori gagal", 'Perhatian!');
				}); 
			}).fail(function(x){
				myApp.closeModal();
				myApp.alert("Pengambilan postingan Jual Beli barang gagal", 'Perhatian!');
			}); 
		}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
	}); 
}

function getAllJualBeliPostVar(id_post) {
	myApp.showPreloader('Mengambil data...');
	var id_kategori = $('#show_kategori_jualBeli').find(":selected").val();
	var id_user=getData("active_user_id");
	var kelas_dipilih = $('#kelas_dipilih').find(":selected").val();
	
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;
	
			
		link=urlnya+'/api/jualBeli/getAllJualBeli?id_user='+id_user;		
		
		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			
			var link=urlnya+'/api/kategori/';
				$.ajax({ dataType: "jsonp",
					url: link,
					type: 'GET',
					contentType: false,
					processData: false
			}).done(function(dataKategori){
				var dataLengthKategori=0;
				for (var aaa = 0 ; aaa < dataKategori.length ; aaa++) {
						dataLengthKategori++;
				}
					
				myApp.closeModal();
				var coba="";
				var dataLength=0;
				for (var ii = 0 ; ii < z.length; ii++) {
					coba+=z['id']+"|"; 
					dataLength++;
				}
				$("#isi_container_jualBeli").html("");
				if(id_kategori==0)
				{
					//munculkan semua post
					for(var i=0;i<dataLength;i++)
					{
						if(kelas_dipilih==z[i]['id_kelas'])
						{
							var tempIdKota=z[i]['id_kota'];
							tempIdKota -=1;
							var html=	"<div id='posting_jualBeli_"+z[i]['id']+"' style='margin-bottom:50px;'>";
							html += 		"<table id='table_jualBeli_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
							html += 			"<tr>";
							html += 				"<td rowspan='2' width='10%'>";
							if(z[i]['user_foto']==getData("active_user_nama"))
							{
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							}
							else
							{
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							}
							html += 				"</td>";
							html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
							if(z[i]['user_nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editPostJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
								html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
							}
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
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kategori</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+dataKategori[z[i]['id_kategori']-1]["nama"]+'</td>';
							html += 			"</tr>";
							html += 			"</tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kelas</div></td>';
							html +=					'<td>: </td>';
							if(z[i]['id_kelas']==1)
								html +=					'<td colspan="2" value="1">STB</td>';
							else if(z[i]['id_kelas']==2)
								html +=					'<td colspan="2" value="2">STO</td>';
							else if(z[i]['id_kelas']==3)
								html +=					'<td colspan="2" value="3">SPEED</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kota</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+arrKota[tempIdKota]['nama']+'</td>';
							html += 			"</tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Deskripsi</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+z[i]['deskripsi']+'</td>';
							html += 			"</tr>";
							html += 			"</tr>";
							html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Email</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2"><a href="mailto:'+z[i]['user_email']+'?Subject='+z[i]['nama']+'" class="external">'+z[i]['user_email']+'</a></td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				'<td colspan="5" class="q" >';
							html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
							html += 				"</td>";
							html += 			"</tr>";
							html += 		"</table>";
							html += 		"<div id='kolom_komentar_jualBeli_"+z[i]['id']+"'>";
							html += 		"</div>";
							html += 			"<div id='btn_komentari_jualBeli_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
							html += 			"<p><a href='#' onclick='bacaJualBeliKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
							html += 	"</div>";
							
							$("#isi_container_jualBeli").append(html);
						}
					}
					bacaJualBeliKomentar(id_post);
				}
				else
				{
					//munculkan semua post
					for(var i=0;i<dataLength;i++)
					{
						if(kelas_dipilih==z[i]['id_kelas'])
						{
							if(id_kategori==dataKategori[z[i]['id_kategori']-1]["id"])
							{
								var tempIdKota=z[i]['id_kota'];
								tempIdKota -=1;
								var html=	"<div id='posting_jualBeli_"+z[i]['id']+"' style='margin-bottom:50px;'>";
								html += 		"<table id='table_jualBeli_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
								html += 			"<tr>";
								html += 				"<td rowspan='2' width='10%'>";
								if(z[i]['user_foto']==getData("active_user_nama"))
								{
									html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
								}
								else
								{
									html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
								}
								html += 				"</td>";
								html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
								if(z[i]['user_nama']==getData("active_user_nama"))
								{
									html += 				"<td style='font-weight:bold;'><i onclick='editPostJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
									html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
								}
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
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kategori</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+dataKategori[z[i]['id_kategori']-1]["nama"]+'</td>';
								html += 			"</tr>";
								html += 			"</tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kelas</div></td>';
								html +=					'<td>: </td>';
								if(z[i]['id_kelas']==1)
									html +=					'<td colspan="2" value="1">STB</td>';
								else if(z[i]['id_kelas']==2)
									html +=					'<td colspan="2" value="3">STO</td>';
								else if(z[i]['id_kelas']==3)
									html +=					'<td colspan="2" value="4">SPEED</td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kota</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+arrKota[tempIdKota]['nama']+'</td>';
								html += 			"</tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Deskripsi</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+z[i]['deskripsi']+'</td>';
								html += 			"</tr>";
								html += 			"</tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Email</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2"><a href="mailto:'+z[i]['user_email']+'?Subject='+z[i]['nama']+'" class="external">'+z[i]['user_email']+'</a></td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html += 				'<td colspan="5" class="q" >';
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
								html += 				"</td>";
								html += 			"</tr>";
								html += 		"</table>";
								html += 		"<div id='kolom_komentar_jualBeli_"+z[i]['id']+"'>";
								html += 		"</div>";
								html += 			"<div id='btn_komentari_jualBeli_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
								html += 			"<p><a href='#' onclick='bacaJualBeliKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
								html += 	"</div>";
								
								$("#isi_container_jualBeli").append(html);
							}
						}
					}
					bacaJualBeliKomentar(id_post);
				}
			}).fail(function(x){
				myApp.closeModal();
				myApp.alert("Pengambilan data kategori gagal", 'Perhatian!');
			}); 
		}).fail(function(x){
			myApp.closeModal();
			myApp.alert("Pengambilan postingan Jual Beli barang gagal", 'Perhatian!');
		}); 
	}).fail(function(x){
		myApp.closeModal();
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
	}); 
}

function bacaJualBeliKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_jualBeli_"+id_post).length == 0) 
	{
		
			$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_jualbeli='+id_post;
			$.ajax({ dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				if(z.length>0)
				{
					var html= "<div  id='isi_komentar_jualBeli_"+id_post+"'>";
					for(var i=0;i<z.length;i++)
					{
						//if(z[i]['foto']!="")
						//{
							html += 		"<table style='background-color:#e6e6e6;'  width='100%;'>";
							html += 			"<tr>";
							html += 				"<td rowspan='2' width='10%'>";
							html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							html += 				"</td>";
							html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
							html += 				"<td style='font-size:10px;'>"+z[i]['deskripsi']+"</td>";
							if(z[i]['nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editKomentarJualBeli("+clicked_id+", this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
								html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusKomentarJualBeli("+clicked_id+",this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
							}
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
					$("#kolom_komentar_jualBeli_"+clicked_id).append(html);
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
		$("#isi_komentar_jualBeli_"+id_post).remove();
	}
}

function komentariJualBeliPost(clicked_id) {
	//ON PROGRESS
	var id_user = getData("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_jualBeli_"+id_post;
		var vartable="table_jualBeli_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
		//console.log(vartable);
		
		if($("#" + vardeksripsi).length == 0) {
			$("textarea[id^=deskripsi_]").each(function(e){
				$(this).remove();
			});
			$("#kolom_komentar_jualBeli_"+id_post).after(" <tr> <td colspan='5'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; margin-left:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
			
			$("#btn_komentari_jualBeli_"+id_post).html("");
			
			var html = 			"<p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+id_post+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Send</a></p>";
			
			$("#btn_komentari_jualBeli_"+id_post).append(html);
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
					id_jualbeli:id_post,
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
					//mainView.router.loadPage('jualBeli.html');
					getAllJualBeliPostVar(id_post);
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi (line 1945)', 'Perhatian!');
				});
			}
		}
	});
}

function editKomentarJualBeli(id_jualbeli,clicked_id)
{
	myApp.showPreloader('Mengambil data...');
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	
	$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_jualbeli='+id_jualbeli;
				
			$.ajax({ dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				myApp.closeModal();
				if(z.length>0)
				{
					for(var i=0;i<z.length;i++)
					{
						if(clicked_id==z[i]['id'])
						{
							myApp.popup('.popup-editKomentarJualBeli');
								var popupHTML=	'<div class="popup">'+
											'<div class="content-block">'+
											'<p>Edit Kiriman</p>'+
														'<div class="page-content">'+
														'<center><textarea id="komentarEditJualBeli" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
														'placeholder="Tulis Komentar Anda..">'+z[i]['deskripsi']+'</textarea>'+
														'</center>'+
													'<div style="height:0px;overflow:hidden">'+
													'</div>'+
													'<p><a href="#" class="button active close-popup" onclick="simpanKomentarEditJualBeli('+id_jualbeli+',this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										   ' </div>'+
										   '<p><a href="#" class="close-popup">Kembali</a></p>'+
									'</div>'+
								'</div>';
								myApp.popup(popupHTML);
						}
					}
				}
			}).fail(function(x){
				myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
			});
			
		});
}

function simpanKomentarEditJualBeli(id_jualbeli, clicked_id)
{
	myApp.showPreloader('Mengambil data...');
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	var deskripsi=document.getElementById("komentarEditJualBeli").value;
	
	
	var formData = JSON.stringify({
					id_user:id_user,
					id_komentar:id_komentar,
					deskripsi:deskripsi
				});
	
	var link=urlnya+'/api/komentar/updateKomentar/';
	
	$.ajax({
	    url: link,
	    data: formData,
	    type: 'POST',
	    contentType: false,
	    processData: false
	}).done(function(z){
		myApp.closeModal();
		bacaJualBeliKomentar(id_jualbeli);
		bacaJualBeliKomentar(id_jualbeli);
		myApp.closeModal();
	}).fail(function(x){
		myApp.alert('Maaf terjadi kesalahan, silahkan coba lagi', 'Perhatian!');
	});
}

function editPostJualBeli(clicked_id)
{
	myApp.showPreloader('Mengambil data...');
	var id_user = getData("active_user_id");
	var formData=JSON.stringify({
						id_user:id_user,
					});
	var link=urlnya+'/api/jualBeli/getAllJualBeli?id_user='+id_user;

	$.ajax({
	    url: link,
	    type: 'GET',
	    contentType: false,
	    processData: false
	}).done(function(z){
		var link=urlnya+'/api/kota/';
		$.ajax({ dataType: "jsonp",
			dataType: 'jsonp',
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(dataKota){
			
			var link=urlnya+'/api/kategori/';
			$.ajax({ dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(dataKategori){
				var dataLengthKategori=0;
				for (var aaa = 0 ; aaa < dataKategori.length ; aaa++) {
						dataLengthKategori++;
				}
				
					myApp.closeModal();
					var myOptions = dataKota;
					var dataLengthKota=0;
					for (var aaa = 0 ; aaa < dataKota.length ; aaa++) {
						dataLengthKota++;
					}
			
					var coba="";
					var dataLength=0;
					for (var ii = 0 ; ii < z.length ; ii++) {
						coba+=z[ii]['id']+"|"; 
						dataLength++;
					}
					for(var i=0;i<dataLength;i++)
					{
						if(clicked_id==z[i]['id'])
						{
								myApp.popup('.popup-editPostJualBeli');
								var popupHTML=	'<div class="popup">'+
											'<div class="content-block">'+
											'<p>Edit Kiriman</p>'+
														'<div class="page-content">'+
														'<center>'+
															'<table style="margin-top:-0px;">'+
																'<tr>'+
																	'<td><p>Nama</p></td>'+
																	'<td><input id="nama_buatJualBarangEdit" type="text" required value="'+z[i]['nama']+'"></td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Harga</p></td>'+
																	'<td>Rp.<input id="harga_buatJualBarangEdit" type="number" required value="'+z[i]['harga']+'"></td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Kategori</p></td>'+
																	'<td>'+
																	'<select name="kategori_buatJualBarangEdit" id="kategori_buatJualBarangEdit">'+
																	  '<option value="0">Pilih Kategori</option>';
																	 for(var indeksKategori=0;indeksKategori<dataLengthKategori;indeksKategori++)
																		  {
																			var tempIdKategori=dataKategori[indeksKategori]['id'];
																			if(tempIdKategori==z[i]['id_kategori'])
																			{
																			  popupHTML+=	'<option value="'+dataKategori[indeksKategori]['id']+'" selected>'+dataKategori[indeksKategori]['nama']+'</option>';
																			}
																			else
																			{
																			  popupHTML+=	'<option value="'+dataKategori[indeksKategori]['id']+'">'+dataKategori[indeksKategori]['nama']+'</option>';
																			}
																		  }
												popupHTML+=		'</select>'+
																	'</td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Kelas</p></td>'+
																	'<td>'+
																	'<select name="kelas_buatJualBarangEdit" id="kelas_buatJualBarangEdit"  class="select-list-kelas">'+
																	'</select>'+
																	'</td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Kota</p></td>'+
																	'<td>'+
																	'<select name="kota_buatJualBarangEdit" id="kota_buatJualBarangEdit">'+
																	  '<option value="0">Pilih Kota</option>';
																		  for(var indeksKota=0;indeksKota<dataLengthKota;indeksKota++)
																		  {
																			var tempIdKota=dataKota[indeksKota]['id'];
																			if(tempIdKota==z[i]['id_kota'])
																			{
																			  popupHTML+=	'<option value="'+dataKota[indeksKota]['id']+'" selected>'+dataKota[indeksKota]['nama']+'</option>';
																			}
																			else
																			{
																			  popupHTML+=	'<option value="'+dataKota[indeksKota]['id']+'">'+dataKota[indeksKota]['nama']+'</option>';
																			}
																		  }
													popupHTML+=		'</select>'+
																	'</td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Foto</p></td>'+
																	'<div style="height:0px;overflow:hidden">'+
																		'<input type="file" id="file_buatJualBarangEdit" accept="image/*"/>'+
																		'</div>'+
																	'<td>'+
																	"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>"+
																	'<p><a href="#" class="button" onclick="chooseFile_buatJualBarangEdit();" style="width:150px;">Pilih Gambar..</a></p>'+
																	'</td>'+
																'</tr>'+
																'<tr>'+
																	'<td><p>Deskripsi</p></td>'+
																	'<td><textarea id="deskripsi_buatJualBarangEdit" style="resize:none; margin-top:10px; height:60px;">'+z[i]['deskripsi']+'</textarea></td>'+
																'</tr>'+
																
															'</table><td><p><a href="#" class="button"  onclick="simpanBuatJualBarang(this.id);" id='+clicked_id+' style="width:250px;">Selesai..</a></p></td>'+
															'</center>'+
													'<div style="height:0px;overflow:hidden">'+
													'<input type="file" id="file_editHome" accept="image/*"/>'+
													'</div>'+
										   ' </div>'+
										   '<p><a href="#" onclick="tutupModal()" class="close-popup">Kembali</a></p>'+
									'</div>'+
								'</div>';
								myApp.popup(popupHTML);
								
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
					}
					
			}).fail(function(x){
				myApp.closePanel();
				myApp.alert("Pengambilan data kategori gagal (line 28)", 'Perhatian!');
			}); 
		}).fail(function(x){
			myApp.closePanel();
			myApp.alert("Pengambilan data kota gagal (line 1626)", 'Perhatian!');
		}); 
	}).fail(function(x){
		myApp.closePanel();
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function simpanBuatJualBarang(clicked_id) {
	//myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var namaJualBarang = document.getElementById("nama_buatJualBarangEdit").value;
	var kategori = $('#kategori_buatJualBarangEdit').find(":selected").val();
	var kelas = $('#kelas_buatJualBarangEdit').find(":selected").val();
	var harga = document.getElementById("harga_buatJualBarangEdit").value;
	var kota = $('#kota_buatJualBarangEdit').find(":selected").val();
	var deskripsi = document.getElementById("deskripsi_buatJualBarangEdit").value;
	var fileinput = document.getElementById("file_buatJualBarangEdit").value;
	var id_jualbeli= clicked_id;
	if(namaJualBarang=="")
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
				if(deskripsi=="")
				{
					myApp.alert('Silahkan isi deskripsi barang anda', 'Perhatian!');
				}
				else
				{
					if(kategori=="" || kategori==0 || kategori=="0")
					{
						myApp.alert('Silahkan pilih kategori', 'Perhatian!');
					}
					else
					{
							var blob=$("#file_buatJualBarangEdit")[0].files[0];
							var formData = new FormData();
							formData.append("id_jualbeli", id_jualbeli);
							formData.append("nama", namaJualBarang);
							formData.append("id_kategori", kategori);
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
								myApp.closeModal();
								//mainView.router.loadPage('home.html');
								myApp.alert('Jual Barang berhasil diubah', 'Berhasil!');
								//viewRouterBack();
								getAllJualBeliPost();
							}).fail(function(x){
								myApp.alert(x.message+" "+x.error, 'Perhatian!');
							});
						//}
					}
				}
			}
		}
	}
}

function pilihanHapusJualBeli(clicked_id){
  myApp.modal({
    title:  'Pilihan',
    text: 'Apakah anda ingin menghapus kiriman ini?',
    buttons: [
      {
        text: 'Tidak',
        onClick: function() {
          //myApp.alert('You clicked first button!')
        }
      },
      {
        text: 'Ya',
		bold: true,
        onClick: function() {
			hapusJualBeliData(clicked_id);
        }
      },
    ]
  })
}

function hapusJualBeliData(clicked_id)
{
	var link=urlnya+'/api/jualBeli/deleteJualBeli?id_jualbeli='+clicked_id;
	$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllJualBeliPost();
			$("#status").val("");
			$("#file_home").val("");
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menghapus kiriman, silahkan coba lagi', 'Perhatian!');
			
			console.log(x);
		});
}

function pilihanHapusKomentarJualBeli(clicked_id, id_komentar){
  myApp.modal({
    title:  'Pilihan',
    text: 'Apakah anda ingin menghapus komentar ini?',
    buttons: [
      {
        text: 'Tidak',
        onClick: function() {
        }
      },
      {
        text: 'Ya',
		bold: true,
        onClick: function() {
			hapusKomentarJualBeliTrue(clicked_id, id_komentar);
        }
      },
    ]
  })
}

function hapusKomentarJualBeliTrue(clicked_id, id_komentar)
{
	var link=urlnya+'/api/komentar/deleteKomentar?id_komentar='+id_komentar;
	$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllJualBeliPostVar(clicked_id);
			myApp.closeModal();
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menghapus komentar, silahkan coba lagi', 'Perhatian!');
			console.log(x);
		});
}

function ubahView()
{
	var id_kategori = $('#show_kategori_jualBeli').find(":selected").val();
	//console.log(id_kategori);
	getAllJualBeliPostByKategori(id_kategori);
}

function getAllJualBeliPostByKategori(id_kategori) {
	myApp.showPreloader('Mengambil data...');
	var id_user=getData("active_user_id");
	var kelas_dipilih = $('#kelas_dipilih').find(":selected").val();
	
	var arrKota=[];
	var link=urlnya+'/api/kota/';
	$.ajax({ dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(zz){
		arrKota=zz;	
		link=urlnya+'/api/jualBeli/getAllJualBeli?id_user='+id_user;
			$.ajax({ 
				dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				var link=urlnya+'/api/kategori/';
				$.ajax({ dataType: "jsonp",
					url: link,
					type: 'GET',
					contentType: false,
					processData: false
				}).done(function(dataKategori){
					var dataLengthKategori=0;
					for (var aaa = 0 ; aaa < dataKategori.length ; aaa++) {
							dataLengthKategori++;
					}
				
					myApp.closeModal();
					var coba="";
					var dataLength=0;
					for (var ii = 0 ; ii < z.length; ii++) {
						coba+=z[ii]['id']+"|"; 
						dataLength++;
					}
					
					$("#isi_container_jualBeli").html("");
					if(id_kategori==0)
					{
						//munculkan semua post
						for(var i=0;i<dataLength;i++)
						{
							if(kelas_dipilih==z[i]['id_kelas'])
							{
								var tempIdKota=z[i]['id_kota'];
								tempIdKota -=1;
								var html=	"<div id='posting_jualBeli_"+z[i]['id']+"' style='margin-bottom:50px;'>";
								html += 		"<table id='table_jualBeli_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
								html += 			"<tr>";
								html += 				"<td rowspan='2' width='10%'>";
								if(z[i]['user_foto']==getData("active_user_nama"))
								{
									html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
								}
								else
								{
									html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
								}
								html += 				"</td>";
								html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
								if(z[i]['user_nama']==getData("active_user_nama"))
								{
									html += 				"<td style='font-weight:bold;'><i onclick='editPostJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
									html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
								}
								html += 			"</tr>";
								html += 			"<tr>";
								html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">'+z[i]['nama']+'</div></td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">Rp.'+z[i]['harga']+',-</div></td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kategori</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+dataKategori[z[i]['id_kategori']-1]["nama"]+'</td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kelas</div></td>';
								html +=					'<td>: </td>';
								if(z[i]['id_kelas']==1)
									html +=					'<td colspan="2" value="1">STB</td>';
								else if(z[i]['id_kelas']==2)
									html +=					'<td colspan="2" value="2">STO</td>';
								else if(z[i]['id_kelas']==3)
									html +=					'<td colspan="2" value="3">SPEED</td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kota</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+arrKota[tempIdKota]['nama']+'</td>';
								html += 			"</tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Deskripsi</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2">'+z[i]['deskripsi']+'</td>';
								html += 			"</tr>";
								html += 			"</tr>";
								html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Email</div></td>';
								html +=					'<td>: </td>';
								html +=					'<td colspan="2"><a href="mailto:'+z[i]['email']+'?Subject='+z[i]['nama']+'" class="external">'+z[i]['user_email']+'</a></td>';
								html += 			"</tr>";
								html += 			"<tr>";
								html += 				'<td colspan="5" class="q" >';
								html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
								html += 				"</td>";
								html += 			"</tr>";
								html += 		"</table>";
								html += 		"<div id='kolom_komentar_jualBeli_"+z[i]['id']+"'>";
								html += 		"</div>";
								html += 			"<div id='btn_komentari_jualBeli_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
								html += 			"<p><a href='#' onclick='bacaJualBeliKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
								html += 	"</div>";
								
								$("#isi_container_jualBeli").append(html);
							}
						}
						myApp.closeModal();
					}
					else
					{
						//munculkan semua post
						for(var i=0;i<dataLength;i++)
						{
							if(kelas_dipilih==z[i]['id_kelas'])
							{
								if(id_kategori==dataKategori[z[i]['id_kategori']-1]["id"])
								{
									var tempIdKota=z[i]['id_kota'];
									tempIdKota -=1;
									var html=	"<div id='posting_jualBeli_"+z[i]['id']+"' style='margin-bottom:50px;'>";
									html += 		"<table id='table_jualBeli_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
									html += 			"<tr>";
									html += 				"<td rowspan='2' width='10%'>";
									if(z[i]['user_foto']==getData("active_user_nama"))
									{
										html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
									}
									else
									{
										html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
									}
									html += 				"</td>";
									html += 				"<td style='font-weight:bold;'>"+z[i]['user_nama']+"</td>";
									if(z[i]['user_nama']==getData("active_user_nama"))
									{
										html += 				"<td style='font-weight:bold;'><i onclick='editPostJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
										html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusJualBeli(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
									}
									html += 			"</tr>";
									html += 			"<tr>";
									html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
									html += 			"</tr>";
									html += 			"<tr>";
									html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">'+z[i]['nama']+'</div></td>';
									html += 			"</tr>";
									html += 			"<tr>";
									html +=					'<td colspan="5" height="30px;" style="font-weight:bold;"><div style="width:100px;">Rp.'+z[i]['harga']+',-</div></td>';
									html += 			"</tr>";
									html += 			"<tr>";
									html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kategori</div></td>';
									html +=					'<td>: </td>';
									html +=					'<td colspan="2">'+dataKategori[z[i]['id_kategori']-1]["nama"]+'</td>';
									html += 			"</tr>";
									html += 			"<tr>";
									html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kelas</div></td>';
									html +=					'<td>: </td>';
									if(z[i]['id_kelas']==1)
										html +=					'<td colspan="2" value="1">STB</td>';
									else if(z[i]['id_kelas']==2)
										html +=					'<td colspan="2" value="2">STO</td>';
									else if(z[i]['id_kelas']==3)
										html +=					'<td colspan="2" value="3">SPEED</td>';
									html += 			"</tr>";
									html += 			"<tr>";
									html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Kota</div></td>';
									html +=					'<td>: </td>';
									html +=					'<td colspan="2">'+arrKota[tempIdKota]['nama']+'</td>';
									html += 			"</tr>";
									html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Deskripsi</div></td>';
									html +=					'<td>: </td>';
									html +=					'<td colspan="2">'+z[i]['deskripsi']+'</td>';
									html += 			"</tr>";
									html += 			"</tr>";
									html +=					'<td colspan="2" height="30px;"><div style="width:100px;">Email</div></td>';
									html +=					'<td>: </td>';
									html +=					'<td colspan="2"><a href="mailto:'+z[i]['email']+'?Subject='+z[i]['nama']+'" class="external">'+z[i]['user_email']+'</a></td>';
									html += 			"</tr>";
									html += 			"<tr>";
									html += 				'<td colspan="5" class="q" >';
									html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
									html += 				"</td>";
									html += 			"</tr>";
									html += 		"</table>";
									html += 		"<div id='kolom_komentar_jualBeli_"+z[i]['id']+"'>";
									html += 		"</div>";
									html += 			"<div id='btn_komentari_jualBeli_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariJualBeliPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
									html += 			"<p><a href='#' onclick='bacaJualBeliKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
									html += 	"</div>";
									
									$("#isi_container_jualBeli").append(html);
								}
							}
							myApp.closeModal();
						}
						myApp.closeModal();
					}
				}).fail(function(x){
					myApp.closeModal();
					myApp.alert("Pengambilan data kategori gagal", 'Perhatian!');
				}); 
			}).fail(function(x){
				myApp.closeModal();
				myApp.alert("Pengambilan postingan Jual Beli barang gagal", 'Perhatian!');
			}); 
		}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal", 'Perhatian!(line 1323)');
	}); 
}