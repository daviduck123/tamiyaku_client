function searchUser() {
	var param = document.getElementById("param").value;
	var link=urlnya+'/api/user/searchUser?param='+param;

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
			$("#container_searchTeman").html("");
			
			var html=	'<div id="list_searchTeman">';
			//munculkan semua teman
			for(var i=0;i<dataLength;i++)
			{						
					html +=		'<li>';
					html +=			'<a href="#" onclick="gotoProfilTeman('+z[i]['id']+');" class="item-link">';
					html += 			'<div class="item-content">';
					html += 				'<div class="item-media"><img src="data:image/jpeg;base64,'+z[i]['foto']+'" style="width:30px; height:30px;"></div>';
					html += 				'<div class="item-inner">';
					html += 					'<div class="item-title">'+z[i]['nama']+'</div>';
					html += 				'</div>';
					html += 			'</div>';
					html += 		'</a>';
					html += 	'</li>';
					
					$("#container_searchTeman").append(html);
			}
			html += 	'</div>';
			
		}).fail(function(x){
			myApp.alert("Pengambilan search teman gagal", 'Perhatian!');
		}); 
}
