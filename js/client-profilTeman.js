function gotoProfilTeman(clickedId){
	eraseCookie("id_profilTeman");
	document.cookie = "id_profilTeman="+clickedId+";";
	var id_teman = clickedId;
	mainView.router.loadPage('profilTeman.html');
	var id_user = getcookie("active_user_id");
	
	var link=urlnya+'/api/user/checkIsTeman?id_user='+id_user+'&id_teman='+id_teman;
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
			//getAllTemanPost dipanggil akan dipanggil jika saat ini user buka page teman dan ingin membuka teman yg lain karena element html terbuat dan dapat diakses
			//jika mengakses teman pertama kali fungsi dibawah tidak akan berguna karena element belum dapat diakses, oleh karena itu butuh bantuan myApp.onPageInit pada my-app.js
			getAllTemanPost(id_teman);
			getProfilTeman(id_teman,1);
		}
		else
		{
			getProfilTeman(id_teman,0);
		}
	}).fail(function(x){
		myApp.alert("Pengambilan data profil teman gagal", 'Perhatian!');
	});
	
	//===========================
	myApp.closePanel();
}
function getAllTemanPost(clickedId) {
	var id_teman = clickedId;
	var link=urlnya+'/api/post/getAllPostFriendByUser?id_user='+id_teman;

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
					html += 		"<table id='table__teman_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
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
					html += 		"<div id='kolom_komentar_teman_"+z[i]['id']+"'>";
					html += 		"</div>";
					html += 			"<p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
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
					html += 			"<p><a href='#' class='button' onclick='komentariTemanPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
					html += 			"<p><a href='#' onclick='bacaTemanKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
					html += 	"</div>";
					
					$("#isi_postingan_teman").append(html);
				}
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}
function getProfilTeman(clickedId, statusTeman){
	var id_teman = clickedId;
	var link=urlnya+'/api/user/getUserByIdUser?id_user='+id_teman;
		
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
		
		$("#nama_profilTeman").html("");
		$("#isi_container_info_teman").html("");
		
		for(var i=0;i<dataLength;i++)
		{
			var nama=z[i]['nama'];
			var foto=z[i]['foto'];
			var email=z[i]['email'];
			var telepon=z[i]['telepon'];
			
			if(statusTeman==1)
			{
				var html=	'<table id="infoProfile" style="margin-top:20px;">';
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
				
				html +='					<form action="/action_page.php">';
				html +='						  <div class="item-content">';
				html +='							<div class="item-inner">';
				html +='								<div class="item-input">';
				html +='								<center><textarea id="status" style="resize:none; margin-top:10px; width:90%; height:60px;" ';
				html +='								placeholder="Tulis pesan anda..."></textarea>';
				html +='								</center>';
				html +='								</div>';
				html +='							</div>';
				html +='						</div>';
				html +='						<div class="item-content" style="margin-top:-10px;">';
				html +='						<div class="item-inner" >';
				html +='							<div style="height:0px;overflow:hidden">';
				html +='							<input type="file" id="file_home" accept="image/*"/>';
				html +='							</div>';
				html +='							<p><a href="#" class="button active" onclick="statusPost();" type="submit" style="width:70px; float:right; margin-right:5%;">Kirim</a></p>';
				html +='							<p><a href="#" class="button"  onclick="chooseFile_home();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>';
				html +='				</form>';
				html +='						<br>';
				html +='						<br>';
				html +='						   <div id="pullToRefreshHome" class="page-content pull-to-refresh-content" data-ptr-distance="55">';
				html +='								<!-- Default pull to refresh layer-->';
				html +='								<div class="pull-to-refresh-layer">';
				html +='								  <div class="preloader"></div>';
				html +='								  <div class="pull-to-refresh-arrow"></div>';
				html +='								</div>';
				html +='							<div id="isi_postingan">';
				html +='				  </div>';
				html +='						  </div>';
				html +='				<!--- tutup pull refresh --->';
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
				html +=				'<td colspan="3" style="width:300px;"><a href="#" onclick="" class="button" disabled style="width:100%;">Tambah teman</a></td>';
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
			//if($("#container_info_teman1").length == 0) {
				$("#isi_container_info_teman").append(html);
			//}
			$("#nama_profilTeman").append(nama);
					
		}		
	}).fail(function(x){
		myApp.alert("Pengambilan informasi teman gagal", 'Perhatian!');
	}); 
}

function bacaTemanKomentar(clicked_id) {
	//ON PROGRESS
	var id_post = clicked_id;
	
	if($("#isi_komentar_"+id_post).length == 0) 
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
					var html= "<div  id='isi_komentar_"+id_post+"'>";
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
					$("#kolom_komentar_"+clicked_id).append(html);
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
		$("#isi_komentar_"+id_post).remove();
	}
	
}