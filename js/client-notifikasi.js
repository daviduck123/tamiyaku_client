function getAllNotif() {
	var id_user = getcookie("active_user_id");
	var link=urlnya+'/api/notifikasi/getNotifikasiByIdUser?id_user='+id_user;

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
			$("#isi_container_notifikasi").html("");
			
			//munculkan semua post
			for(var i=0;i<dataLength;i++)
			{
				var html=	'<a href="#" onClick="gotoFriendPost('+z[i]['id']+','+z[i]['id_user']+','+z[i]['url']+')" style="color:white;">';
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
