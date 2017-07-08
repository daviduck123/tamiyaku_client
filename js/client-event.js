var list_id_kelas=getcookie("list_id_kelas");
function gotoBuatEvent(){
	mainView.router.loadPage('buatEvent.html');
	myApp.closePanel();
}

function gotoLomba(){
	mainView.router.loadPage('lomba.html');
	getAllEventPost();
	myApp.closePanel();
}

function getKotaBuatEvent() {
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
			   $('#kota_buatEvent').append( new Option(el.nama,el.id) );
			});
			
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 1626)", 'Perhatian!');
		}); 
}

function buatEventPost() {
	var id_user=getData("active_user_id");
	var namaEvent = document.getElementById("nama_buatEvent").value;
	var tanggal = document.getElementById("tanggal_buatEvent").value;
	var kelas = $('#kelas_buatEvent').find(":selected").val();
	var juara1 = document.getElementById("total_juara1Event").value;
	var juara2 = document.getElementById("total_juara2Event").value;
	var juara3 = document.getElementById("total_juara3Event").value;
	var ticket = document.getElementById("ticket_buatEvent").value;
	var kota = $('#kota_buatEvent').find(":selected").val();
	var lokasi = document.getElementById("lokasi_buatEvent").value;
	var deskripsi = document.getElementById("deskripsi_buatEvent").value;
	var fileinput = document.getElementById("file_buatEvent").value;
	
	if(namaEvent=="")
	{
		myApp.alert('Silahkan isi nama Event', 'Perhatian!');
	}
	else
	{
		if(tanggal=="")
		{
			myApp.alert('Silahkan isi tanggal Event', 'Perhatian!');
		}
		else
		{
			if(kelas=="" || kelas==0 || kelas=="0")
			{
				myApp.alert('Silahkan pilih kelas Event', 'Perhatian!');
			}
			else
			{
				if(juara1=="" || juara1==0 || juara1=="0")
				{
					myApp.alert('Silahkan isi total hadiah juara 1', 'Perhatian!');
				}
				else
				{
							if(ticket=="" || ticket==0 || ticket=="0")
							{
								myApp.alert('Silahkan isi biaya ticket masuk', 'Perhatian!');
							}
							else
							{
								if(kota=="" || kota==0 || kota=="0")
								{
									myApp.alert('Silahkan pilih kota Event', 'Perhatian!');
								}
								else
								{
									if(lokasi=="")
									{
										myApp.alert('Silahkan pilih lokasi Event', 'Perhatian!');
									}
									else
									{
										if(deskripsi=="")
										{
											myApp.alert('Silahkan isi deskripsi event lomba', 'Perhatian!');
										}
										else
										{
											if(fileinput=="")
											{
												myApp.alert('Silahkan pilih foto track event lomba', 'Perhatian!');
											}
											else
											{
												var blob=$("#file_buatEvent")[0].files[0];
												var formData = new FormData();
												formData.append("nama", namaEvent);
												formData.append("tanggal", tanggal);
												formData.append("tempat", lokasi);
												formData.append("hadiah1", juara1);
												formData.append("hadiah2", juara2);
												formData.append("hadiah3", juara3);
												formData.append("harga_tiket", ticket);
												formData.append("deskripsi", deskripsi);
												formData.append("id_user", id_user);
												formData.append("id_kota", kota);
												formData.append("id_kelas", kelas);
												formData.append("file", blob);
												
												console.log(formData);
												
												var link=urlnya+'/api/event/createEvent';
												
												$.ajax({
													url: link,
													data: formData,
													type: 'POST',
													contentType: false,
													processData: false
												}).done(function(z){
													//mainView.router.loadPage('home.html');
													myApp.alert('Event berhasil dibuat', 'Berhasil!');
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
		}
	}
}

function getAllEventPost() {
	var id_user=getData("active_user_id");
	var link=urlnya+'/api/event/getAllEvent?id_user='+id_user;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var ii = 0 ; ii < z.length ; ii++) {
				coba+=z[ii]['id']+"|"; 
				dataLength++;
			}
			$("#isi_container_event").html("");
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
					var html=	"<div id='posting_event_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_event_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2' width='10%'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;" style="font-weight:bold;"><div style="width:100px;">Judul Lomba</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2" style="font-weight:bold;">'+z[i]['deskripsi']+'</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Tanggal</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2">16/03/2016</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Kota</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2">Surabaya</td>';
					html += 			"</tr>";
					for (var indeks=0;indeks<3;indeks++)
					{
						var tempIndeks=indeks+1;
						if(indeks==0)
						{
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Hadiah</div> </td>';
							html +=					'<td>: </td>';
							html +=					'<td width="20px;" style="font-weight:bold;">'+tempIndeks+'. </td>';
							html +=					'<td colspan="1">'+z[i]['hadiah1']+'</td>';
							html += 			"</tr>";
						}
						else if(indeks==1)
						{
							if( z[i]['hadiah2']!=0)
							{
								html += 			"<tr>";
								html +=					'<td colspan="2" width="100px;" height="30px;"</td>';
								html +=					'<td>: </td>';
								html +=					'<td width="20px;" style="font-weight:bold;">'+tempIndeks+'. </td>';
								html +=					'<td colspan="1">'+z[i]['hadiah2']+'</td>';
								html += 			"</tr>";
							}
						}
						else
						{
							if( z[i]['hadiah3']!=0)
							{
								html += 			"<tr>";
								html +=					'<td colspan="2" width="100px;" height="30px;"</td>';
								html +=					'<td>: </td>';
								html +=					'<td width="20px;" style="font-weight:bold;">'+tempIndeks+'. </td>';
								html +=					'<td colspan="1">'+z[i]['hadiah3']+'</td>';
								html += 			"</tr>";
							}
						}
					}
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;" style="font-weight:bold;"><div style="width:100px;">Kelas Lomba</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2" style="font-weight:bold;">Speed '+z[i]['hadiah3']+'</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				'<td colspan="5" class="q" >';
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
					html += 				"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_event_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_event_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariEventPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaEventKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					
					$("#isi_container_event").append(html);
					
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan postingan Event gagal", 'Perhatian!');
		}); 
}

function getAllEventPostVar(id_post) {
	var id_user=getData("active_user_id");
	var link=urlnya+'/api/event/getAllEvent?id_user='+id_user;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var ii = 0 ; ii < z.length ; ii++) {
				coba+=z[ii]['id']+"|"; 
				dataLength++;
			}
			$("#isi_container_event").html("");
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
					var html=	"<div id='posting_event_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_event_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2' width='10%'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;" style="font-weight:bold;"><div style="width:100px;">Judul Lomba</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2" style="font-weight:bold;">'+z[i]['deskripsi']+'</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Tanggal</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2">16/03/2016</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Kota</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2">Surabaya</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Hadiah</div> </td>';
					html +=					'<td>: </td>';
					html +=					'<td width="20px;" style="font-weight:bold;">1. </td>';
					html +=					'<td colspan="1">'+z[i]['hadiah1']+'</td>';
					html += 			"</tr>";
					if(z[i]['hadiah2'] !== 0 && z[i]['hadiah2'] !== "0"){
						html += 			"<tr>";
						html +=					'<td colspan="2" width="100px;" height="30px;"></td>';
						html +=					'<td>: </td>';
						html +=					'<td width="20px;" style="font-weight:bold;">2. </td>';
						html +=					'<td colspan="1">'+z[i]['hadiah2']+'</td>';
						html += 			"</tr>";
					}
					if(z[i]['hadiah3'] !== 0 && z[i]['hadiah3'] !== "0"){
						html += 			"<tr>";
						html +=					'<td colspan="2" width="100px;" height="30px;"></td>';
						html +=					'<td>: </td>';
						html +=					'<td width="20px;" style="font-weight:bold;">3. </td>';
						html +=					'<td colspan="1">'+z[i]['hadiah3']+'</td>';
						html += 			"</tr>";
					}
					html += 			"<tr>";
					html +=					'<td colspan="2" width="100px;" height="30px;"><div style="width:100px;font-weight:bold;">Tiket</div></td>';
					html +=					'<td>: </td>';
					html +=					'<td colspan="2">'+z[i]['harga_tiket']+'</td>';
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				'<td colspan="5" class="q" >';
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
					html += 				"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_event_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_event_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariEventPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaEventKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					
					$("#isi_container_event").append(html);
					
			}
			bacaEventKomentar(id_post);
		}).fail(function(x){
			myApp.alert("Pengambilan postingan Event gagal", 'Perhatian!');
		}); 
}

function bacaEventKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_event_"+id_post).length == 0) 
	{
		
			$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_event='+id_post;
				
			$.ajax({
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				if(z.length>0)
				{
					var html= "<div  id='isi_komentar_event_"+id_post+"'>";
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
					$("#kolom_komentar_event_"+clicked_id).append(html);
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
		$("#isi_komentar_event_"+id_post).remove();
	}
}

function komentariEventPost(clicked_id) {
	//ON PROGRESS
	var id_user = getData("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_event_"+id_post;
		var vartable="table_event_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
		//console.log(vartable);
		
		if($("#" + vardeksripsi).length == 0) {
				$("#"+vartable).find('tbody').append(" <tr> <td colspan='5'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; margin-left:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
				
				$("#btn_komentari_event_"+id_post).html("");
				
				var html = 			"<p><a href='#' class='button' onclick='komentariEventPost(this.id);' id='"+id_post+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Send</a></p>";
				
				$("#btn_komentari_event_"+id_post).append(html);
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
					id_event:id_post,
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
					//mainView.router.loadPage('lomba.html');
					getAllEventPostVar(id_post);
					//myApp.alert('Komentar dibuat', 'Berhasil!');
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi (line 1945)', 'Perhatian!');
				});
			}
		}
	});
}

function pilihanTrack(){
  myApp.modal({
    title:  'Pilihan',
    text: 'Anda bisa membuat track sendiri (Create) atau mengambil dari gambar yang sudah ada (Load).',
    buttons: [
      {
        text: 'Cancel',
        onClick: function() {
          //myApp.alert('You clicked first button!')
        }
      },
      {
        text: 'Load',
		bold: true,
        onClick: function() {
			chooseFile_buatEvent();
        }
      },
      {
        text: 'Create',
        bold: true,
        onClick: function() {
          mainView.router.loadPage('createTrack.html');
        }
      },
    ]
  })
}