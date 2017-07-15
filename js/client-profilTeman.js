function gotoProfilTeman(clickedId){
	eraseData("id_teman");
	saveData( "id_teman",clickedId);
	//console.log(getData("id_teman"));
	var id_teman = clickedId;
	mainView.router.loadPage('profilTeman.html');
	var id_user = getData("active_user_id");
	
	var link=urlnya+'/api/user/checkIsTeman?id_user='+id_user+'&id_teman='+id_teman;
	$.ajax({ dataType: "jsonp",
	    url: link,
	    type: 'GET',
	    contentType: false,
	    processData: false
	}).done(function(z){
		var dataLength=0;
		for (var ii = 0 ; ii < z.length; ii++) {
			dataLength++;
		}
		
		if(dataLength>0)
		{
			//getAllTemanPost dipanggil akan dipanggil jika saat ini user buka page teman dan ingin membuka teman yg lain karena element html terbuat dan dapat diakses
			//jika mengakses teman pertama kali fungsi dibawah tidak akan berguna karena element belum dapat diakses, oleh karena itu butuh bantuan myApp.onPageInit pada my-app.js
			getAllTemanPost(id_teman);
			//console.log("teman");
			getProfilTeman(id_teman,1);
		}
		else
		{
			if(id_teman != getData("active_user_id"))
			{
				//console.log("belumteman");
				getProfilTeman(id_teman,0);
			}
			else
			{
				//ini buka profile akun sendiri
				getAllTemanPost(id_teman);
				getProfilTeman(id_teman,1);
			}
		}
	}).fail(function(x){
		myApp.alert("Pengambilan data profil teman gagal", 'Perhatian!');
	});
	
	//===========================
	myApp.closePanel();
}

function getAllTemanPost(clickedId) {
	
	console.log("masuk1");
	var id_teman = clickedId;
	var link=urlnya+'/api/post/getAllPostByUser?id_user='+id_teman;
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
			$("#isi_postingan_teman").html("");
			$("#isi_form_komentari_teman").html("");
			
			var html2= '<form action="/action_page.php">';
			html2 +=	'<div class="item-content">';
			html2 +=		'<div class="item-inner">';
			html2 +=			'<div class="item-input">';
			html2 +=				'<center><textarea id="status_teman" style="resize:none; margin-top:10px; width:90%; height:60px;" ';
			html2 +=					'placeholder="Tulis apa yang ingin anda bahas.."></textarea>';
			html2 +=				'</center>';
			html2 +=			'</div>';
			html2 +=		'</div>';
			html2 +=	' </div>';
			html2 +=	'<div class="item-content" style="margin-top:-10px;">';
			html2 +=	'<div class="item-inner" >';
			html2 +=	'<div style="height:0px;overflow:hidden">';
			html2 +=	'<input type="file" id="file_teman" accept="image/*"/>';
			html2 +=	'</div>';
			html2 +=	'<p><a href="#" class="button active" onclick="statusTemanPost();" type="submit" style="width:70px; float:right; margin-right:5%;">Kirim</a></p>';
			html2 +=	'<p><a href="#" class="button"  onclick="chooseFile_teman();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>';
			html2 +=	'</form>';
			
			
			$("#isi_form_komentari_teman").append(html2);
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				if(z[i]['foto']!="")
				{
					var html=	"<div id='posting_teman_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_teman_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					if(z[i]['nama']==getData("active_user_nama"))
					{
						html += 				"<td style='font-weight:bold;'><i onclick='editPostProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
						html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusDataProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
					}
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
					html += 		"<div id='kolom_komentar_teman_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_teman_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaTemanKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_teman").append(html);
				}
				else
				{
					
					var html=	"<div id='posting_teman_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_teman_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					if(z[i]['nama']==getData("active_user_nama"))
					{
						html += 				"<td style='font-weight:bold;'><i onclick='editPostProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
						html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusDataProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
					}
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td colspan='2'>"+z[i]['deskripsi']+"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_teman_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_teman_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaTemanKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_teman").append(html);
				}
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}

function getAllTemanPost(clickedId, id_post) {
	var id_teman = clickedId;
	var link=urlnya+'/api/post/getAllPostByUser?id_user='+id_teman;
	console.log(link);
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
			$("#isi_postingan_teman").html("");
			$("#isi_form_komentari_teman").html("");
			
			var html2= '<form action="/action_page.php">';
			html2 +=	'<div class="item-content">';
			html2 +=		'<div class="item-inner">';
			html2 +=			'<div class="item-input">';
			html2 +=				'<center><textarea id="status_teman" style="resize:none; margin-top:10px; width:90%; height:60px;" ';
			html2 +=					'placeholder="Tulis apa yang ingin anda bahas.."></textarea>';
			html2 +=				'</center>';
			html2 +=			'</div>';
			html2 +=		'</div>';
			html2 +=	' </div>';
			html2 +=	'<div class="item-content" style="margin-top:-10px;">';
			html2 +=	'<div class="item-inner" >';
			html2 +=	'<div style="height:0px;overflow:hidden">';
			html2 +=	'<input type="file" id="file_teman" accept="image/*"/>';
			html2 +=	'</div>';
			html2 +=	'<p><a href="#" class="button active" onclick="statusTemanPost();" type="submit" style="width:70px; float:right; margin-right:5%;">Kirim</a></p>';
			html2 +=	'<p><a href="#" class="button"  onclick="chooseFile_teman();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>';
			html2 +=	'</form>';
			
			
			$("#isi_form_komentari_teman").append(html2);
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				if(z[i]['foto']!="")
				{
					var html=	"<div id='posting_teman_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_teman_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					if(z[i]['nama']==getData("active_user_nama"))
					{
						html += 				"<td style='font-weight:bold;'><i onclick='editPostProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
						html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusDataProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
					}
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
					html += 		"<div id='kolom_komentar_teman_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_teman_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaTemanKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_teman").append(html);
				}
				else
				{
					
					var html=	"<div id='posting_teman_"+z[i]['id']+"' style='margin-bottom:50px;'>";
					html += 		"<table id='table_teman_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
					html += 			"<tr>";
					html += 				"<td rowspan='2'>";
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
					html += 				"</td>";
					html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
					if(z[i]['nama']==getData("active_user_nama"))
					{
						html += 				"<td style='font-weight:bold;'><i onclick='editPostProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
						html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusDataProfile(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
					}
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td style='font-size:10px;'>"+z[i]['created_at']+"</td>";
					html += 			"</tr>";
					html += 			"<tr>";
					html += 				"<td colspan='2'>"+z[i]['deskripsi']+"</td>";
					html += 			"</tr>";
					html += 		"</table>";
					html += 		"<div id='kolom_komentar_teman_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<div id='btn_komentari_teman_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
					html += 			"<p><a href='#' onclick='bacaTemanKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_teman").append(html);
				}
			}
			bacaTemanKomentar(id_post);
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}

function getProfilTeman(clickedId, statusTeman){
	var id_teman = clickedId;
	var link=urlnya+'/api/user/getUserByIdUser?id_user='+id_teman;
	$.ajax({ dataType: "jsonp",
	    url: link,
	    type: 'GET',
	    contentType: false,
	    processData: false
	}).done(function(z){
		var dataLength=0;
		dataLength=1;
		$("#nama_profilTeman").html("");
		$("#isi_container_info_teman").html("");
		$("#isi_form_komentari_teman").html("");
		//$("#isi_container_info_teman").remove();
		//$("#container_info_teman").append('<div id="isi_container_info_teman"></div>');
		//$("#isi_form_komentari_teman").remove();
		//$("#isi_postingan_teman").append('<div id="isi_form_komentari_teman"></div>');
		
		//$("#container_info_teman").remove();
		for(var i=0;i<dataLength;i++)
		{
			/*
			var nama=z[i]['nama'];
			var foto=z[i]['foto'];
			var email=z[i]['email'];
			var telepon=z[i]['telepon'];
			*/
			var id=z.id;
			var nama=z.nama;
			var foto=z.foto;
			var email=z.email;
			var telepon=z.telepon;
			
			if(id_teman != getData("active_user_id"))
			{
				
				if(statusTeman==1)
				{
					var html=	'<input type="hidden" id="id_teman_temp" value="'+id+'">';
					html +=	'<table id="infoProfile" style="margin-top:20px;">';
					html += 		'<tr>';
					html += 			'<td rowspan="3">';
					html += 				'<img src="data:image/jpeg;base64,'+foto+'" style="width:80px; height:80px;">';
					html += 			'</td>';
					html += 	'</tr>';
					html += 		'<tr>';
					html += 			'<td>';
					html += 				'<a><i class="icon fa fa-phone-square"></i><span style="margin:10px;">'+telepon+'</span></a>';
					html += 			'</td>';
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-phone"></i></a></td>';
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-commenting-o"></i></a></td>';
					html += 		'</tr>';
					html += 		'<tr>';
					html += 			'<td colspan="3"><a href="#" ><i class="icon fa fa-envelope-o"></i><span style="margin:10px;">'+email+'</span></a></td>';
					html += 		'</tr>';
					html += 	'</table>';
					html +='						<br>';
					html +='						<br>';
					
					html +='						</div> ';
					html +='					  </div>';
				}
				else
				{
					var html=	'<table id="infoProfile" style="margin-top:20px;">';
					html += 		'<tr>';
					html += 			'<td rowspan="3">';
					html += 				'<img src="data:image/jpeg;base64,'+foto+'" style="width:80px; height:80px;">';
					html += 			'</td>';
					html +=				'<td colspan="3" style="width:300px;"><a href="#" onclick="addFriend('+id+')" class="button" style="width:100%;">Tambah teman</a></td>';
					html += 	'</tr>';
					html += 		'<tr>';
					html += 			'<td>';
					html += 				'<a><i class="icon fa fa-phone-square"></i><span style="margin:10px;">'+telepon+'</span></a>';
					html += 			'</td>';
					
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-phone"></i></a></td>';
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-commenting-o"></i></a></td>';
					html += 		'</tr>';
					html += 		'<tr>';
					html += 			'<td colspan="3"><a href="#" ><i class="icon fa fa-envelope-o"></i><span style="margin:10px;">'+email+'</span></a></td>';
					html += 		'</tr>';
					html += 	'</table>';
				}
				
				//jika sudah ada tidak perlu bikin lagi
				if($("#infoProfile").length == 0) {
					$("#isi_container_info_teman").append(html);
				}
				$("#nama_profilTeman").append(nama);
				
			}
			else
			{
				//buka profile disi sendiri
				var html=	'<input type="hidden" id="id_teman_temp" value="'+id+'">';
					html +=	'<table id="infoProfile" style="margin-top:20px;">';
					html += 		'<tr>';
					html += 			'<td rowspan="3">';
					html += 				'<img src="data:image/jpeg;base64,'+foto+'" style="width:80px; height:80px;">';
					html += 			'</td>';
					html += 	'</tr>';
					html += 		'<tr>';
					html += 			'<td>';
					html += 				'<a><i class="icon fa fa-phone-square"></i><span style="margin:10px;">'+telepon+'</span></a>';
					html += 			'</td>';
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-phone"></i></a></td>';
					html += 			'<td><a href="#" class="button" style="margin-right:0%; border:none; margin-top:0px; width:30px;"><i class="icon fa fa-commenting-o"></i></a></td>';
					html += 		'</tr>';
					html += 		'<tr>';
					html += 			'<td colspan="3"><a href="#" ><i class="icon fa fa-envelope-o"></i><span style="margin:10px;">'+email+'</span></a></td>';
					html += 		'</tr>';
					html += 	'</table>';
					html +='						<br>';
					html +='						<br>';
					
					html +='						</div> ';
					html +='					  </div>';
					
					
				//jika sudah ada tidak perlu bikin lagi
				if($("#infoProfile").length == 0) {
					$("#isi_container_info_teman").append(html);
				}
				$("#nama_profilTeman").append(nama);
			}				
		}		
	}).fail(function(x){
		myApp.alert("Pengambilan informasi teman gagal", 'Perhatian!');
	}); 
}

function bacaTemanKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_teman_"+id_post).length == 0) 
	{
		
			$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_post='+id_post;
				
			$.ajax({ dataType: "jsonp",
				url: link,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(z){
				
				if(z.length>0)
				{
					var html= "<div  id='isi_komentar_teman_"+id_post+"'>";
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
							if(z[i]['nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editKomentarKuProfile("+clicked_id+",this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
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
					$("#kolom_komentar_teman_"+clicked_id).append(html);
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
		$("#isi_komentar_teman_"+id_post).remove();
	}
	
}

function komentariTemanPost(clicked_id) {
	//ON PROGRESS
	var id_user = getData("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_teman_"+id_post;
		var vartable="table_teman_"+id_post;
		
		
		if($("#" + vardeksripsi).length == 0) {
				$("#"+vartable).find('tbody').append(" <tr> <td colspan='5'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; margin-left:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
				
				$("#btn_komentari_teman_"+id_post).html("");
				
				var html = 			"<p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+id_post+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Send</a></p>";
				
				$("#btn_komentari_teman_"+id_post).append(html);
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
					//mainView.router.loadPage('profilTeman.html');
					var id_teman = document.getElementById("id_teman_temp").value;
					getAllTemanPost(id_teman,id_post);
					//getAllTemanPost(id_teman);
					//getProfilTeman(id_teman,1);
					//myApp.alert('Komentar dibuat', 'Berhasil!');
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
				});
			}
		}
	});
}

function statusTemanPost() {
	//ON PROGRESS
	var id_teman = document.getElementById("id_teman_temp").value;
	var status = document.getElementById("status").value;
	
	var link=urlnya+'/api/post/createPost/';
	
	if(status=="")
	{
		myApp.alert('Anda belum mengisi status anda', 'Perhatian!');
	}
	else
	{
		var blob=$("#file_profilTeman")[0].files[0];
		var formData = new FormData();
		formData.append("id_user", id_teman);
		formData.append("deskripsi", status);
		formData.append("file", blob);

		$.ajax({ 
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllTemanPost(id_teman);
			$("#status").val("");
			$("#file_profilTeman").val("");
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat mengirim status pada teman, silahkan coba lagi', 'Perhatian!');
			var coba="";
			for (var pair of formData.entries()) {
				coba+=pair[0]+ ', '; 
			}
			console.log(coba);
		});
		
	}
}

function addFriend(clickedId){
	var id_teman=clickedId;
	var id_user = getData("active_user_id");
	
	var link=urlnya+'/api/user/addFriend?id_teman='+id_teman+'&id_user='+id_user;

		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			console.log(z.status);
			if(z.status==true)
			{
				myApp.alert("Tambah teman berhasil", 'Perhatian!');
				getAllTemanPost(id_teman);
				getProfilTeman(id_teman,1);
			}
		}).fail(function(x){
			myApp.alert("Tambah teman gagal", 'Perhatian!');
		}); 
}

function editPostProfile(clicked_id)
{
	var id_user = getData("active_user_id");
	var formData=JSON.stringify({
						id_user:id_user,
					});
	var link=urlnya+'/api/post/getAllPostFriendByUser?id_user='+id_user;

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
		for(var i=0;i<dataLength;i++)
		{
			if(clicked_id==z[i]['id'])
			{
				if(z[i]['foto']!="")
				{
					myApp.popup('.popup-edit-profileTeman');
					var popupHTML=	'<div class="popup">'+
								'<div class="content-block">'+
								'<p>Edit Kiriman</p>'+
											'<div class="page-content">'+
											'<center><textarea id="statusEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
											'placeholder="Tulis Status Anda..">'+z[i]['deskripsi']+'</textarea>'+
											"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>"+
											'</center>'+
										'<div style="height:0px;overflow:hidden">'+
										'<input type="file" id="file_editProfile" accept="image/*"/>'+
										'</div>'+
										'<p><a href="#" class="button active" onclick="statusEditPostProfile(this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										'<p><a href="#" class="button"  onclick="chooseFile_editProfile();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>'+
							   ' </div>'+
							   '<p><a href="#" onclick="tutupModalProfile()" class="close-popup">Kembali</a></p>'+
						'</div>'+
					'</div>';
					myApp.popup(popupHTML);
				}
				else
				{
					myApp.popup('.popup-edit-profileTeman');
					var popupHTML=	'<div class="popup">'+
								'<div class="content-block">'+
								'<p>Edit Kiriman</p>'+
											'<div class="page-content">'+
											'<center><textarea id="statusEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
											'placeholder="Tulis Status Anda..">'+z[i]['deskripsi']+'</textarea>'+
											'</center>'+
										'<div style="height:0px;overflow:hidden">'+
										'<input type="file" id="file_editProfile" accept="image/*"/>'+
										'</div>'+
										'<p><a href="#" class="button active" onclick="statusEditPostProfile(this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										'<p><a href="#" class="button"  onclick="chooseFile_editProfile();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>'+
							   ' </div>'+
							   '<p><a href="#" onclick="tutupModalProfile()" class="close-popup">Kembali</a></p>'+
						'</div>'+
					'</div>';
					myApp.popup(popupHTML);
				}
			}
		}
	}).fail(function(x){
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function pilihanHapusDataProfile(clicked_id){
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
			hapusDataProfile(clicked_id);
        }
      },
    ]
  })
}

function hapusDataProfile(clicked_id)
{
	var link=urlnya+'/api/post/deletePost?id_post='+clicked_id;
	$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllTemanPost(clicked_id);
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menghapus kiriman, silahkan coba lagi', 'Perhatian!');
			var coba="";
			for (var ii = 0 ; ii < formData.entries().length; ii++) {
				coba+=formData.entries()[ii][0]+ ', '; 
			}
			console.log(coba);
		});
}

function statusEditPostProfile(clicked_id) {
	//ON PROGRESS
	var id_user = getData("active_user_id");
	var status = document.getElementById("statusEdit").value;
	
	var link=urlnya+'/api/post/updatePost/';
	
	if(status=="")
	{
		myApp.alert('Status tidak boleh kosong', 'Perhatian!');
	}
	else
	{
		var blob=$("#file_editProfile")[0].files[0];
		var formData = new FormData();
		formData.append("id_user", id_user);
		formData.append("deskripsi", status);
		formData.append("id_post", clicked_id);
		formData.append("file", blob);

		$.ajax({
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			myApp.closeModal();
			getAllTemanPost(id_user,null);
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menambah status, silahkan coba lagi', 'Perhatian!');
			var coba="";
			for (var ii = 0 ; ii < formData.entries().length; ii++) {
				coba+=formData.entries()[ii][0]+ ', '; 
			}
			console.log(coba);
		});
		
	}
}

function tutupModalProfile() {
	getAllTemanPost(getData("active_user_id"),null);
}

function editKomentarKuProfile(id_post,clicked_id)
{
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	
	$(document).ready(function(){
			var link=urlnya+'/api/komentar?id_post='+id_post;
				
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
							myApp.popup('.popup-edit-profileTeman');
								var popupHTML=	'<div class="popup">'+
											'<div class="content-block">'+
											'<p>Edit Kiriman</p>'+
														'<div class="page-content">'+
														'<center><textarea id="komentarEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
														'placeholder="Tulis Komentar Anda..">'+z[i]['deskripsi']+'</textarea>'+
														'</center>'+
													'<div style="height:0px;overflow:hidden">'+
													'</div>'+
													'<p><a href="#" class="button active close-popup" onclick="simpanKomentarProfile('+id_post+',this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
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

function simpanKomentarProfile(id_post, clicked_id)
{
	var id_user = getData("active_user_id");
	var id_komentar = clicked_id;
	var deskripsi=document.getElementById("komentarEdit").value;
	
	
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
		bacaTemanKomentar(id_post);
		bacaTemanKomentar(id_post);
	}).fail(function(x){
		myApp.alert('Maaf terjadi kesalahan, silahkan coba lagi', 'Perhatian!');
	});
}