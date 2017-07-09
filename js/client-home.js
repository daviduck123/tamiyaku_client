//------------------------------------------------------------------------------------------------------------------------------------------------HOME

function gotoHome(){
	mainView.router.loadPage('home.html');
	myApp.closePanel();
}

function komentariPost(clicked_id) {
	
	var id_user = getData("active_user_id");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_"+id_post;
		var vartable="table_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
		if($("#" + vardeksripsi).length == 0) {
				$("#"+vartable).find('tbody').append(" <tr> <td colspan='5'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; margin-left:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
				
				$("#btn_komentari_"+id_post).html("");
				
				var html = 			"<p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+id_post+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Send</a></p>";
				
				$("#btn_komentari_"+id_post).append(html);
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
					getAllPost(id_post);
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
				
			$.ajax({ dataType: "jsonp",
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
							if(z[i]['nama']==getData("active_user_nama"))
							{
								html += 				"<td style='font-weight:bold;'><i onclick='editKomentarKu("+clicked_id+",this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
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
	var id_user = getData("active_user_id");
	var formData=JSON.stringify({
						id_user:id_user,
					});
	var link=urlnya+'/api/post/getAllPostFriendByUser?id_user='+id_user;

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
		$("#isi_postingan").html("");
		for(var i=0;i<dataLength;i++)
		{
			if(z[i]['foto']!="")
			{
				var html=	"<div id='posting_"+z[i]['id']+"' style='margin-bottom:50px;'>";
				html += 		"<table id='table_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
				html += 			"<tr>";
				html += 				"<td rowspan='2'>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				else
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				html += 				"</td>";
				html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 				"<td style='font-weight:bold;'><i onclick='editPost(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
					html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
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
				html += 		"<div id='kolom_komentar_"+z[i]['id']+"'>";
				html += 		"</div>";
				html += 			"<div id='btn_komentari_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
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
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				else
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				html += 				"</td>";
				html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 				"<td style='font-weight:bold;'><i onclick='editPost(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
					html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
				}
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
				html += 			"<div id='btn_komentari_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
				html += 			"<p><a href='#' onclick='bacaKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
				html += 	"</div>";
				
				$("#isi_postingan").append(html);
			}
		}
		
	}).fail(function(x){
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function getAllPost(id_post) {
	var id_user = getData("active_user_id");
	var formData=JSON.stringify({
						id_user:id_user,
					});
	var link=urlnya+'/api/post/getAllPostFriendByUser?id_user='+id_user;

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
		$("#isi_postingan").html("");
		for(var i=0;i<dataLength;i++)
		{
			if(z[i]['foto']!="")
			{
				var html=	"<div id='posting_"+z[i]['id']+"' style='margin-bottom:50px;'>";
				html += 		"<table id='table_"+z[i]['id']+"' style='background-color:white;'  width='100%;'>";
				html += 			"<tr>";
				html += 				"<td rowspan='2'>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				else
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				html += 				"</td>";
				html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 				"<td style='font-weight:bold;'><i onclick='editPost(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
					html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
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
				html += 		"<div id='kolom_komentar_"+z[i]['id']+"'>";
				html += 		"</div>";
				html += 			"<div id='btn_komentari_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
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
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' class='profilePicture' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				else
				{
					html += 					"<img src='data:image/jpeg;base64,"+z[i]['user_foto']+"' style='padding:0px; margin-right:-20px; margin-bottom:-10px; position:relative; top:-5px;' width='30'>";
				}
				html += 				"</td>";
				html += 				"<td style='font-weight:bold;'>"+z[i]['nama']+"</td>";
				if(z[i]['nama']==getData("active_user_nama"))
				{
					html += 				"<td style='font-weight:bold;'><i onclick='editPost(this.id)' id='"+z[i]['id']+"' class='fa fa-caret-square-o-down' aria-hidden='true'></i></td>";
					html += 				"<td style='font-weight:bold;'><i onclick='pilihanHapusData(this.id)' id='"+z[i]['id']+"' class='fa fa-minus' aria-hidden='true'></i></td>";
				}
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
				html += 			"<div id='btn_komentari_"+z[i]['id']+"'><p><a href='#' class='button' onclick='komentariPost(this.id);' id='"+z[i]['id']+"' style='margin-right:5%; margin-top:-10px; float:right; width:100px;'>Komentari</a></p></div>";
				html += 			"<p><a href='#' onclick='bacaKomentar(this.id);' id='"+z[i]['id']+"' style='margin-top:-5px; float:right; margin-right:10px;'>"+z[i]["count_komentar"]+" Komentar</a></p>";
				html += 	"</div>";
				
				$("#isi_postingan").append(html);
			}
		}
		bacaKomentar(id_post);
	}).fail(function(x){
		myApp.alert("Pengambilan status user gagal", 'Perhatian!');
	}); 
}

function statusPost() {
	//ON PROGRESS
	var id_user = getData("active_user_id");
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
			for (var ii = 0 ; ii < formData.entries().length; ii++) {
				coba+=formData.entries()[ii][0]+ ', '; 
			}
			console.log(coba);
		});
		
	}
}

function editPost(clicked_id)
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
		$("#isi_postingan").html("");
		for(var i=0;i<dataLength;i++)
		{
			if(clicked_id==z[i]['id'])
			{
				if(z[i]['foto']!="")
				{
					myApp.popup('.popup-edit-home');
					var popupHTML=	'<div class="popup">'+
								'<div class="content-block">'+
								'<p>Edit Kiriman</p>'+
											'<div class="page-content">'+
											'<center><textarea id="statusEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
											'placeholder="Tulis Status Anda..">'+z[i]['deskripsi']+'</textarea>'+
											"<img src='data:image/jpeg;base64,"+z[i]['foto']+"' style='width:100%; height:100%;'>"+
											'</center>'+
										'<div style="height:0px;overflow:hidden">'+
										'<input type="file" id="file_editHome" accept="image/*"/>'+
										'</div>'+
										'<p><a href="#" class="button active" onclick="statusEditPost(this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										'<p><a href="#" class="button"  onclick="chooseFile_editHome();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>'+
							   ' </div>'+
							   '<p><a href="#" onclick="tutupModal()" class="close-popup">Kembali</a></p>'+
						'</div>'+
					'</div>';
					myApp.popup(popupHTML);
				}
				else
				{
					myApp.popup('.popup-edit-home');
					var popupHTML=	'<div class="popup">'+
								'<div class="content-block">'+
								'<p>Edit Kiriman</p>'+
											'<div class="page-content">'+
											'<center><textarea id="statusEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
											'placeholder="Tulis Status Anda..">'+z[i]['deskripsi']+'</textarea>'+
											'</center>'+
										'<div style="height:0px;overflow:hidden">'+
										'<input type="file" id="file_editHome" accept="image/*"/>'+
										'</div>'+
										'<p><a href="#" class="button active" onclick="statusEditPost(this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
										'<p><a href="#" class="button"  onclick="chooseFile_editHome();" style=" float:right; margin-right:10px; width:85px;">Gambar..</a></p>'+
							   ' </div>'+
							   '<p><a href="#" onclick="tutupModal()" class="close-popup">Kembali</a></p>'+
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

function pilihanHapusData(clicked_id){
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
			hapusData(clicked_id);
        }
      },
    ]
  })
}

function hapusData(clicked_id)
{
	var link=urlnya+'/api/post/deletePost?id_post='+clicked_id;
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
			var coba="";
			for (var ii = 0 ; ii < formData.entries().length; ii++) {
				coba+=formData.entries()[ii][0]+ ', '; 
			}
			console.log(coba);
		});
}

function statusEditPost(clicked_id) {
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
		var blob=$("#file_editHome")[0].files[0];
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
			getAllPost();
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

function tutupModal() {
	getAllPost();
}

function editKomentarKu(id_post,clicked_id)
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
							myApp.popup('.popup-edit-home');
								var popupHTML=	'<div class="popup">'+
											'<div class="content-block">'+
											'<p>Edit Kiriman</p>'+
														'<div class="page-content">'+
														'<center><textarea id="komentarEdit" style="resize:none; margin-top:10px; width:90%; height:60px;" '+
														'placeholder="Tulis Komentar Anda..">'+z[i]['deskripsi']+'</textarea>'+
														'</center>'+
													'<div style="height:0px;overflow:hidden">'+
													'</div>'+
													'<p><a href="#" class="button active close-popup" onclick="simpanKomentar('+id_post+',this.id);" id='+clicked_id+' type="submit" style="width:70px; float:right; margin-right:5%;">Update</a></p>'+
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

function tutupModalKomentar(id_post) {
	//getAllPost(id_post);
}

function simpanKomentar(id_post, clicked_id)
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
		bacaKomentar(id_post);
		bacaKomentar(id_post);
	}).fail(function(x){
		myApp.alert('Maaf terjadi kesalahan, silahkan coba lagi', 'Perhatian!');
	});
}