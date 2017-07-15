var list_id_kelas=getData("list_id_kelas");
var ctx = null;
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
		$.ajax({ dataType: "jsonp",
			dataType: 'jsonp',
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
											if(ctx === null && fileinput === "")
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
												formData.append('file',blob);
												if(ctx !== null){
													formData.append("canvas",ctx.canvas.toDataURL());
												}
												
												var link=urlnya+'/api/event/createEvent';
												
												$.ajax({
													url: link,
													data: formData,
													type: 'POST',
													contentType: false,
													processData: false
												}).done(function(z){
													myApp.alert('Event berhasil dibuat', 'Berhasil!');
													ctx = null;
													viewRouterBack();
													getAllEventPost();
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
	
	var link=urlnya+'/api/kota/';
		$.ajax({ dataType: "jsonp",
			dataType: 'jsonp',
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(dataKota){
			var link=urlnya+'/api/event/getAllEvent?id_user='+id_user;

			$.ajax({ dataType: "jsonp",
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
						if(z[i]['user_nama']==getData("active_user_nama"))
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
							html += 				"<td style='font-weight:bold;'><i onclick='gotoUpdateEvent(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
							html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusEventData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
						}
						html += 			"</tr>";
						html += 			"<tr>";
						html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
						html += 			"</tr>";
						html += 			"<tr>";
						html +=					'<td colspan="2" height="30px;" style="font-weight:bold;"><div style="width:100px;">Judul Lomba</div></td>';
						html +=					'<td>: </td>';
						html +=					'<td colspan="2" style="font-weight:bold;">'+z[i]['nama']+'</td>';
						html += 			"</tr>";
						html += 			"<tr>";
						html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Tanggal</div></td>';
						html +=					'<td>: </td>';
						html +=					'<td colspan="2">'+z[i]['tanggal']+'</td>';
						html += 			"</tr>";
						html += 			"<tr>";
						html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Kota</div></td>';
						html +=					'<td>: </td>';
						tempIndeks=z[i]['id_kota']-1;
						html +=					'<td colspan="2">'+dataKota[tempIndeks]['nama']+'</td>';
						html += 			"</tr>";
						var tempIndeks=0;
						for (var indeks=0;indeks<3;indeks++)
						{
							if(indeks==0)
							{
								tempIndeks=tempIndeks+1;
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
									tempIndeks=tempIndeks+1;
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
									tempIndeks=tempIndeks+1;
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
						html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
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
			
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 170)", 'Perhatian!');
		});
}

function getAllEventPostVar(id_post) {
	var id_user=getData("active_user_id");
	
	var link=urlnya+'/api/kota/';
		$.ajax({ dataType: "jsonp",
			dataType: 'jsonp',
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(dataKota){
	
			var link=urlnya+'/api/event/getAllEvent?id_user='+id_user;

				$.ajax({ dataType: "jsonp",
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
							if(z[i]['user_nama']==getData("active_user_nama"))
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
								html += 				"<td style='font-weight:bold;'><i onclick='gotoUpdateEvent(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
								html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusEventData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
							}
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;" style="font-weight:bold;"><div style="width:100px;">Judul Lomba</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2" style="font-weight:bold;">'+z[i]['nama']+'</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Tanggal</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">16/03/2016</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Tanggal</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+z[i]['tanggal']+'</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html +=					'<td colspan="2" height="30px;"style="font-weight:bold;"><div style="width:100px;">Kota</div></td>';
							html +=					'<td>: </td>';
							tempIndeks=z[i]['id_kota']-1;
							html +=					'<td colspan="2">'+dataKota[tempIndeks]['nama']+'</td>';
							html += 			"</tr>";
							var tempIndeks=0;
							for (var indeks=0;indeks<3;indeks++)
							{
								if(indeks==0)
								{
									tempIndeks=tempIndeks+1;
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
										tempIndeks=tempIndeks+1;
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
										tempIndeks=tempIndeks+1;
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
							html +=					'<td colspan="2" width="100px;" height="30px;"><div style="width:100px;font-weight:bold;">Tiket</div></td>';
							html +=					'<td>: </td>';
							html +=					'<td colspan="2">'+z[i]['harga_tiket']+'</td>';
							html += 			"</tr>";
							html += 			"<tr>";
							html += 				'<td colspan="5" class="q" >';
							html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%;'>";
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
				
		}).fail(function(x){
		myApp.alert("Pengambilan data kota gagal (line 170)", 'Perhatian!');
	});			
}

function bacaEventKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_event_"+id_post).length == 0) 
	{
		
			$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_event='+id_post;
				
			$.ajax({ dataType: "jsonp",
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
							html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
							html += 				"</td>";
							html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
							html += 				"<td style='font-size:10px;'>"+z[i]['deskripsi']+"</td>";
							if(z[i]['nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editKomentarKuEvent("+clicked_id+",this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
								html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusKomentarEvent("+clicked_id+",this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
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

function pilihanTrackEdit(){
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
			chooseFile_buatEventEdit();
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

function gotoUpdateEvent(clicked_id)
{
	saveData("idPostEvent",clicked_id);
	mainView.router.loadPage('updateEvent.html');
}

function editEventPost(clicked_id)
{
	var id_user = getData("active_user_id");
	
	var link=urlnya+'/api/event/getAllEvent?id_user='+id_user;

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
					var popupHTML="";
					$("#isiDataUpdateEvent").append("");
					for(var i=0;i<dataLength;i++)
					{
						if(clicked_id==z[i]['id'])
						{
								//myApp.popup('.popup-editEvent');
			popupHTML=	'<div class="content-block">'+
								'<table style="margin-top:-0px;">'+
									'<tr>'+
										'<td><p>Nama Event Lomba</p></td>'+
										'<td><input id="nama_buatEventEdit" type="text" required value="'+z[i]['nama']+'"></td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Tanggal</p></td>'+
										'<td><input type="date" id="tanggal_buatEventEdit" name="tanggal_buatEventEdit"  value="'+z[i]['tanggal']+'"></td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Kelas</p></td>'+
										'<td>'+
										'<select name="kelas_buatEventEdit" id="kelas_buatEventEdit"  class="select-list-kelas">'+
										  '<option value="0">Pilih Kelas</option>'+
										  '<option value="1">STB</option>'+
										  '<option value="2">STO</option>'+
										  '<option value="3">Speed</option>'+
										'</select>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Hadiah</p></td>'+
										'<td>'+
											'1. Rp<input id="total_juara1EventEdit" type="number" required value="'+z[i]['hadiah1']+'"></td>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td height="48"></td>'+
										'<td>'+
											'2. Rp<input id="total_juara2EventEdit" type="number" required value="'+z[i]['hadiah2']+'"></td>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td height="48"></td>'+
										'<td>'+
											'3. Rp<input id="total_juara3EventEdit" type="number" required value="'+z[i]['hadiah3']+'"></td>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Harga Tiket</p></td>'+
										'<td>&nbsp;&nbsp;&nbsp;&nbsp;Rp<input id="ticket_buatEventEdit" type="number" required value="'+z[i]['harga_tiket']+'"></td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Kota</p></td>'+
										'<td>'+
										'<select name="kota_buatEventEdit" id="kota_buatEventEdit">'+
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
										'<td><p>Detil Lokasi</p></td>'+
										'<td><input id="lokasi_buatEventEdit" type="text" required value="'+z[i]['tempat']+'"></td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Track</p></td>'+
										'<div style="height:0px;overflow:hidden">'+
											'<input type="file" id="file_buatEventEdit" accept="image/*"/>'+
											'</div>'+
										'<td>'+
											"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>"+
											
											'<p><a href="#" class="button" onclick="pilihanTrackEdit();" style="width:150px;">Pilih Track..</a></p>'+
										'</td>'+
									'</tr>'+
									'<tr>'+
										'<td><p>Deskripsi</p></td>'+
										'<td><textarea id="deskripsi_buatEventEdit" style="resize:none; margin-top:10px; height:60px;">'+z[i]['deskripsi']+'</textarea></td>'+
									'</tr>'+
									
								'</table><center><td><p><a href="#" class="button"  onclick="saveEventEditPost('+z[i]['id']+');" style="width:250px;">Update</a></p></td></center>'+
								'</div>';
				
						}
					}
							$("#isiDataUpdateEvent").append(popupHTML);
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
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal (line 1626)", 'Perhatian!');
		}); 
		
		
	}).fail(function(x){
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function pilihanHapusEventData(clicked_id){
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
			hapusEventData(clicked_id);
        }
      },
    ]
  })
}

function hapusEventData(clicked_id)
{
	var link=urlnya+'/api/event/deleteEvent?id_event='+clicked_id;
	$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllPost();
			$("#status").val("");
			$("#file_home").val("");
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menghapus kiriman, silahkan coba lagi', 'Perhatian!');
			
			console.log(x);
		});
}

function saveEventEditPost(clicked_id) {
	//ON PROGRESS
	var id_user = getData("active_user_id");
	
	var link=urlnya+'/api/post/updateEven/';
	
	var id_event = clicked_id;
	var namaEvent = document.getElementById("nama_buatEventEdit").value;
	var tanggal = document.getElementById("tanggal_buatEventEdit").value;
	var kelas = $('#kelas_buatEventEdit').find(":selected").val();
	var juara1 = document.getElementById("total_juara1EventEdit").value;
	var juara2 = document.getElementById("total_juara2EventEdit").value;
	var juara3 = document.getElementById("total_juara3EventEdit").value;
	var ticket = document.getElementById("ticket_buatEventEdit").value;
	var kota = $('#kota_buatEventEdit').find(":selected").val();
	var lokasi = document.getElementById("lokasi_buatEventEdit").value;
	var deskripsi = document.getElementById("deskripsi_buatEventEdit").value;
	var fileinput = document.getElementById("file_buatEventEdit").value;
	
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
											//if(ctx === null && fileinput === "")
											//{
											//	myApp.alert('Silahkan pilih foto track event lomba', 'Perhatian!');
											//}
											//else
											//{
												var blob=$("#file_buatEventEdit")[0].files[0];
												
												
												formData = new FormData();
												formData.append("id_event", id_event);
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
												if(ctx !== null){
													formData.append("canvas",ctx.canvas.toDataURL());
												}
												console.log(formData);
												var link=urlnya+'/api/event/updateEvent/';
												
												$.ajax({
													url: link,
													data: formData,
													type: 'POST',
													contentType: false,
													processData: false
												}).done(function(z){
													viewRouterBack();
													//tutupModalEvent();
													getAllEventPost();
													myApp.alert('Event berhasil diubah!', 'Berhasil!');
													ctx = null;
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
		}
	}
}

function editKomentarKuEvent(id_event,clicked_id)
{
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	
	$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_event='+id_event;
			$.ajax({ dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				if(z.length>0)
				{
					for(var i=0;i<z.length;i++)
					{
						if(clicked_id==z[i]['id'])
						{
							myApp.popup('.popup-editKomentarKuEvent');
								var popupHTML=	'<div class="popup">'+
											'<div class="content-block">'+
											'<p>Edit Kiriman</p>'+
														'<div class="page-content">'+
														'<center><textarea id="komentarEventEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
														'placeholder="Tulis Komentar Anda..">'+z[i]['deskripsi']+'</textarea>'+
														'</center>'+
													'<div style="height:0px;overflow:hidden">'+
													'</div>'+
													'<p><a href="#" class="button active close-popup" onclick="simpanKomentarEvent('+id_event+',this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										   ' </div>'+
										   '<p><a href="#" class="close-popup">Kembali</a></p>'+
									'</div>'+
								'</div>';
								myApp.popup(popupHTML);
						}
					}
				}
			}).fail(function(x){
				myApp.alert('Maaf update komentar gaga, coba lagi!', 'Perhatian!');
			});
			
		});
}

function simpanKomentarEvent(id_event, clicked_id)
{
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	var deskripsi=document.getElementById("komentarEventEdit").value;
	
	
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
		bacaEventKomentar(id_event);
		bacaEventKomentar(id_event);
	}).fail(function(x){
		myApp.alert('Maaf terjadi kesalahan, silahkan coba lagi', 'Perhatian!');
	});
}

function tutupModalEvent()
{
	myApp.closeModal();
}

function pilihanHapusKomentarEvent(clicked_id, id_komentar){
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
			hapusKomentarEventTrue(clicked_id, id_komentar);
        }
      },
    ]
  })
}

function hapusKomentarEventTrue(clicked_id, id_komentar)
{
	var link=urlnya+'/api/komentar/deleteKomentar?id_komentar='+id_komentar;
	$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllEventPostVar(clicked_id);
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menghapus komentar, silahkan coba lagi', 'Perhatian!');
			console.log(x);
		});
}