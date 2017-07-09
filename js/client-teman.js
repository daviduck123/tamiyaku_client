function getAllTeman() {
	var id_user = getData("active_user_id");
	var link=urlnya+'/api/user/getTemanByIdUser?id_user='+id_user;

		$.ajax({ 
		    url: link,
		    type: 'GET',
		    dataType: "jsonp",
		    contentType: false,
		    processData: false
		}).done(function(z){
			var coba="";
			var dataLength=0;
			for (var ii = 0 ; ii < z.length ; ii++) {
				coba+=z[ii]['id']+"|"; 
				dataLength++;
			}
			$("#container_teman").html("");
			
			var html=	'';
			var tempHurufAwal='';
			var tambahTutupdiv=0;
			//munculkan semua teman
			for(var i=0;i<dataLength;i++)
			{			
				var hurufDepan=z[i]['nama'].substring(1, 0).toUpperCase();
				if(tempHurufAwal!=hurufDepan)
				{
					if(tambahTutupdiv==1)
					{
						html +=		'</ul>';
						html +=	'</div>';
						tambahTutupdiv=0;
					}
					html +=	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
					html +=		'<ul>';
					html +=			'<li class="list-group-title" >'+hurufDepan+'</li>';
					html +=	'';
					
					tambahTutupdiv=1;
					tempHurufAwal=hurufDepan;
				}
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
			}
			
			html +=		'</ul>';
			html +=	'</div>';
			$("#container_teman").append(html);
		}).fail(function(x){
			myApp.alert("Pengambilan postingan teman gagal", 'Perhatian!');
		}); 
}
