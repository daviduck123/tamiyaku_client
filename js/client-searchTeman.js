function autoCariTemanGrup() {
	var param = document.getElementById("cariTemanGrup").value;
	var link=urlnya+'/api/user/searchUser?param='+param;

		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var availableTags=[];
			var dataLength=z['users'].length;
			for(var i=0; i<dataLength;i++)
			{
				availableTags.push({
					nama: z['users'][i]['nama'],
					foto:  z['users'][i]['foto']
				});
			}
			//console.log(availableTags[2]['nama']);
			//$( "#cariTemanGrup" ).autocomplete({
			 // source: availableTags
			//});
		}).fail(function(x){
			myApp.alert("Pengambilan search teman gagal", 'Perhatian!');
		}); 
}

//$( "#cariTemanGrup" ).keyup(function() {
//	autoCariTemanGrup()
//});

function searchTeman(paramData){
	mainView.router.loadPage('searchTemanGrup.html');
	myApp.closePanel();
	var param = paramData;
		var link=urlnya+'/api/user/searchUser?param='+param;
		$.ajax({
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			
			if(z['status']!="FALSE")
			{
				//ambil user
				var availableTagsUser=[];
				var dataLengthUser=z['users'].length;
				for(var i=0; i<dataLengthUser;i++)
				{
					availableTagsUser.push({
						id: z['users'][i]['id'],
						nama: z['users'][i]['nama'],
						foto:  z['users'][i]['foto']
					});
				}
				
				//ambil grup
				var availableTagsGrup=[];
				var dataLengthGrup=0;
				try {
					dataLengthGrup=z['grup'].length;
				}
				catch(err) {
					dataLengthGrup=0;
				}
				
				for(var i=0; i<dataLengthGrup;i++)
				{
					availableTagsGrup.push({
						id: z['grup'][i]['id'],
						nama: z['grup'][i]['nama'],
						foto:  z['grup'][i]['foto']
					});
				}
				
				$("#isi_container_searchTemanGrup").remove();
				$("#container_searchTemanGrup").append('<div id="isi_container_searchTemanGrup"></div>');
				
				var html =	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
				html +=	'	<ul>';
				html +=	'		<li class="list-group-title">Users</li>';
				
				for(var i=0;i<dataLengthUser;i++)
				{
					html +=			'<li>';
					html += 				'<a href="#" onclick="gotoProfilTeman('+availableTagsUser[i]['id']+');" id="grup_'+availableTagsUser[i]['id']+'" class="item-link">';
					html += 					'<div class="item-content">';
					html += 						'<div class="item-media"><img src="data:image/jpeg;base64,'+availableTagsUser[i]['foto']+'" style="width:35px; height:35px;"></div>';
					html += 						'<div class="item-inner">';
					html += 							'<div class="item-title">'+availableTagsUser[i]['nama']+'</div>';
					html += 						'</div>';
					html += 					'</div>';
					html += 				'</a>';
					html += 			'</li>';
				}
				html +=	'	</ul>';
				html +=	'</div>';
				html +=	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
				html +=	'	<ul>';
				html +=	'		<li class="list-group-title">Grup</li>';
				
				for(var i=0;i<dataLengthGrup;i++)
				{
					html +=			'<li>';
					html += 				'<a href="#" onclick="gotoGroup('+availableTagsGrup[i]['id']+');" id="grup_'+availableTagsGrup[i]['id']+'" class="item-link">';
					html += 					'<div class="item-content">';
					html += 						'<div class="item-media"><img src="data:image/jpeg;base64,'+availableTagsGrup[i]['foto']+'" style="width:35px; height:35px;"></div>';
					html += 						'<div class="item-inner">';
					html += 							'<div class="item-title">'+availableTagsGrup[i]['nama']+'</div>';
					html += 						'</div>';
					html += 					'</div>';
					html += 				'</a>';
					html += 			'</li>';					
				}
				html +=	'	</ul>';
				html +=	'</div>';
				
				$("#isi_container_searchTemanGrup").append(html);
			}
			else
			{
				$("#isi_container_searchTemanGrup").append("<center><p>Tidak ditemukan</p></center>");
			}
		}).fail(function(x){
			myApp.alert("Pengambilan data grup disekitar gagal", 'Perhatian!');
		});
}


