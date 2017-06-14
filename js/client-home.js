//------------------------------------------------------------------------------------------------------------------------------------------------HOME

function gotoHome(){
	mainView.router.loadPage('home.html');
	myApp.closePanel();
}

function komentariPost(clicked_id) {
	
	var id_user = getcookie("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_"+id_post;
		var vartable="table_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
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
					mainView.router.loadPage('home.html');
					//myApp.alert('Komentar dibuat', 'Berhasil!');
					getAllPost();
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
				});
			}
		}
	});
}
function bacaKomentar(clicked_id) {
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
function getAllPost() {
	var id_user = getcookie("active_user_id");
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
		for (var pair of z) {
			coba+=pair['id']+"|"; 
			dataLength++;
		}
		$("#isi_postingan").html("");
		for(var i=0;i<dataLength;i++)
		{
			if(z[i]['foto']!="")
			{
				var html=	"<div id='posting_"+z[i]['id']+"' style='margin-bottom:50px;'>";
				html += 		"<table id='table_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
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
				html += 		"<div id='kolom_komentar_"+z[i]['id']+"'>";
				html += 		"</div>";
				html += 			"<p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
				html += 			"<p><a href='#' onclick='bacaKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
				html += 	"</div>";
				
				$("#isi_postingan").append(html);
			}
			else
			{
				
				var html=	"<div id='posting_"+z[i]['id']+"' style='margin-bottom:50px;'>";
				html += 		"<table id='table_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
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
				html += 		"<div id='kolom_komentar_"+z[i]['id']+"'>";
				html += 		"</div>";
				html += 			"<p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p>";
				html += 			"<p><a href='#' onclick='bacaKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
				html += 	"</div>";
				
				$("#isi_postingan").append(html);
			}
		}
		
	}).fail(function(x){
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function statusPost() {
	//ON PROGRESS
	var id_user = getcookie("active_user_id");
	var status = document.getElementById("status").value;
	
	var link=urlnya+'/api/post/createPost/';
	
	if(status=="")
	{
		myApp.alert('Anda belum mengisi status anda', 'Perhatian!');
	}
	else
	{
		var blob=$("#file_home")[0].files[0];
		var formData = new FormData();
		formData.append("id_user", id_user);
		formData.append("deskripsi", status);
		formData.append("file", blob);

		$.ajax({
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			getAllPost();
			$("#status").val("");
			$("#file_home").val("");
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