function getAllNotif() {
	var id_user = getData("active_user_id");
	var link=urlnya+'/api/notifikasi/getNotifikasiByIdUser?id_user='+id_user;

		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var ii = 0 ; ii < z.length; ii++) {
				coba+=z[ii]['id']+"|"; 
				dataLength++;
			}
			$("#isi_container_notifikasi").html("");
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				var tempUrl=z[i]['url'];
				tempUrl=tempUrl.substring(11);
				var html=	'<a href="#" onClick="gotoFriendPost('+z[i]['id_user']+','+tempUrl+')" style="color:white;">';
				html += 		'<li class="item-content" style="margin-bottom:-15px;">';
				html += 			'<div class="item-media"><i class="icon fa fa-circle" style="color:white; font-size: 0.3em;"></i></div>';
				html += 			'<div class="item-inner">';
				html += 				' <div class="item-title" style="font-size:11px;">'+z[i]['deskripsi']+'</div>';
				html += 			'</div>';
				html += 		'</li>';
				html += 	'</a>';
					
					$("#isi_container_notifikasi").append(html);
			}
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}

function gotoFriendPost(id_teman,url) {
	if(url.includes("id_post")==true)
	{
		var link=urlnya+'/api/post/getAllPostFriendByUser?id_user='+id_teman;

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
					html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
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
					html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>";
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
					html += 					"<img class='lazy' src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
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
	else if(url.includes("id_jualbeli")==true)
	{
		
	}
	else if(url.includes("id_grup")==true)
	{
		
	}
}