function getAllTeman() {
	var id_user = getcookie("active_user_id");
	var link=urlnya+'/api/user/getTemanByIdUser?id_user='+id_user;

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
			$("#container_teman").html("");
			
			//munculkan semua teman
			for(var i=0;i<dataLength;i++)
			{						
					var html=	'<li>';
					html +=			'<a href="#" onclick="gotoProfilTeman('+z[i]['id']+');" class="item-link">';
					html += 			'<div class="item-content">';
					html += 				'<div class="item-media"><img src="data:image/jpeg;base64,'+z[i]['foto']+'" style="width:30px; height:30px;"></div>';
					html += 				'<div class="item-inner">';
					html += 					'<div class="item-title">'+z[i]['nama']+'</div>';
					html += 				'</div>';
					html += 			'</div>';
					html += 		'</a>';
					html += 	'</li>';
					
					$("#container_teman").append(html);
			}
			
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}
