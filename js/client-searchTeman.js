function autoCariTemanGrup() {
	myApp.showPreloader('Mengambil data...');
	var param = document.getElementById("cariTemanGrup").value;
	var link=urlnya+'/api/user/searchUser?param='+param;

		$.ajax({ dataType: "jsonp",
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
				myApp.closeModal();
			}
		}).fail(function(x){
			myApp.alert("Pengambilan search teman gagal", 'Perhatian!');
		}); 
}

function searchTeman(paramData){
	myApp.showPreloader('Mengambil data...');
	mainView.router.loadPage('searchTemanGrup.html');
	myApp.closePanel();
	var param = paramData;
		var link=urlnya+'/api/user/searchUser?param='+param;
		console.log(link);
		$.ajax({ 
			dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
				var link=urlnya+'/api/grup/searchGrup?param='+param;
				console.log(link);
				$.ajax({ 
					dataType: "jsonp",
					url: link,
					type: 'GET',
					contentType: false,
					processData: false
				}).done(function(zz){
					
					if(z['status']=="FALSE" && zz['status']=="FALSE")
					{
						$("#isi_container_searchTemanGrup").append("<center><p>Tidak ditemukan</p></center>");
					}
					else if(z['status']!="FALSE" && zz['status']=="FALSE")
					{
						//ambil user
						var availableTagsUser=[];
						var dataLengthUser=z['users'].length;
						console.log(dataLengthUser);
						console.log(z);
						for(var i=0; i<dataLengthUser;i++)
						{
							availableTagsUser.push({
								id: z['users'][i]['id'],
								nama: z['users'][i]['nama'],
								foto:  z['users'][i]['foto']
							});
						}
						console.log(availableTagsUser.length);
						
						$("#isi_container_searchTemanGrup").remove();
						$("#container_searchTemanGrup").append('<div id="isi_container_searchTemanGrup"></div>');
						
						var html =	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Users</li>';
						
						for(var i=0;i<availableTagsUser.length;i++)
						{
							console.log(i);
							html +=			'<li>';
							html += 				'<a href="#" onclick="gotoProfilTeman('+availableTagsUser[i]['id']+');" id="grup_'+availableTagsUser[i]['id']+'" class="item-link">';
							html += 					'<div class="item-content">';
							html += 						'<div class="item-media"><img class="lazy" src="data:image/jpeg;base64,'+availableTagsUser[i]['foto']+'" style="width:35px; height:35px;"></div>';
							html += 						'<div class="item-inner">';
							html += 							'<div class="item-title">'+availableTagsUser[i]['nama']+'</div>';
							html += 						'</div>';
							html += 					'</div>';
							html += 				'</a>';
							html += 			'</li>';
						}
						html +=	'	</ul>';
						html +=	'</div>';
						html +=	'<div class="list-group" style="margin-bottom:20px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Grup</li>';
						html +=			'<li>';
						html += 			'<center><div style="height=30px;"><p>Tidak ditemukan</p></div></center>'	
						html += 		'</li>';				
						
						html +=	'	</ul>';
						html +=	'</div>';
						
						$("#isi_container_searchTemanGrup").append(html);
					}
					else if(z['status']=="FALSE" && zz['status']!="FALSE")
					{
						//ambil grup
						var availableTagsGrup=[];
						var dataLengthGrup=0;
						try 
						{
							dataLengthGrup=zz['grups'].length;
						}
						catch(err) {
							dataLengthGrup=0;
						}
						
						for(var i=0; i<dataLengthGrup;i++)
						{
							availableTagsGrup.push({
								id: zz['grups'][i]['id'],
								nama: zz['grups'][i]['nama'],
								foto:  zz['grups'][i]['foto']
							});
						}
						
						$("#isi_container_searchTemanGrup").remove();
						$("#container_searchTemanGrup").append('<div id="isi_container_searchTemanGrup"></div>');
						
						var html =	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Users</li>';
						html +=			'<li>';
						html += 			'<center><div style="height=30px;"><p>Tidak ditemukan</p></div></center>'	
						html += 			'</li>';
						html +=	'	</ul>';
						html +=	'</div>';
						html +=	'<div class="list-group" style="margin-bottom:20px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Grup</li>';
						
						for(var i=0;i<availableTagsGrup.length;i++)
						{
							html +=			'<li>';
							html += 				'<a href="#" onclick="gotoGroup('+availableTagsGrup[i]['id']+');" id="grup_'+availableTagsGrup[i]['id']+'" class="item-link">';
							html += 					'<div class="item-content">';
							html += 						'<div class="item-media"><img class="lazy" src="data:image/jpeg;base64,'+availableTagsGrup[i]['foto']+'" style="width:35px; height:35px;"></div>';
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
					else if(z['status']!="FALSE" && zz['status']!="FALSE")
					{
						//ambil user
						var availableTagsUser=[];
						var dataLengthUser=z['users'].length;
						console.log(dataLengthUser);
						console.log(z);
						for(var i=0; i<dataLengthUser;i++)
						{
							availableTagsUser.push({
								id: z['users'][i]['id'],
								nama: z['users'][i]['nama'],
								foto:  z['users'][i]['foto']
							});
						}
						console.log(availableTagsUser.length);
						
						//ambil grup
						var availableTagsGrup=[];
						var dataLengthGrup=0;
						try 
						{
							dataLengthGrup=zz['grups'].length;
						}
						catch(err) {
							dataLengthGrup=0;
						}
						
						for(var i=0; i<dataLengthGrup;i++)
						{
							availableTagsGrup.push({
								id: zz['grups'][i]['id'],
								nama: zz['grups'][i]['nama'],
								foto:  zz['grups'][i]['foto']
							});
						}
						
						$("#isi_container_searchTemanGrup").remove();
						$("#container_searchTemanGrup").append('<div id="isi_container_searchTemanGrup"></div>');
						
						var html =	'<div class="list-group" style="margin-bottom:20px; margin-top:-30px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Users</li>';
						
						for(var i=0;i<availableTagsUser.length;i++)
						{
							console.log(i);
							html +=			'<li>';
							html += 				'<a href="#" onclick="gotoProfilTeman('+availableTagsUser[i]['id']+');" id="grup_'+availableTagsUser[i]['id']+'" class="item-link">';
							html += 					'<div class="item-content">';
							html += 						'<div class="item-media"><img class="lazy" src="data:image/jpeg;base64,'+availableTagsUser[i]['foto']+'" style="width:35px; height:35px;"></div>';
							html += 						'<div class="item-inner">';
							html += 							'<div class="item-title">'+availableTagsUser[i]['nama']+'</div>';
							html += 						'</div>';
							html += 					'</div>';
							html += 				'</a>';
							html += 			'</li>';
						}
						html +=	'	</ul>';
						html +=	'</div>';
						html +=	'<div class="list-group" style="margin-bottom:20px;">';
						html +=	'	<ul>';
						html +=	'		<li class="list-group-title">Grup</li>';
						
						for(var i=0;i<availableTagsGrup.length;i++)
						{
							html +=			'<li>';
							html += 				'<a href="#" onclick="gotoGroup('+availableTagsGrup[i]['id']+');" id="grup_'+availableTagsGrup[i]['id']+'" class="item-link">';
							html += 					'<div class="item-content">';
							html += 						'<div class="item-media"><img class="lazy" src="data:image/jpeg;base64,'+availableTagsGrup[i]['foto']+'" style="width:35px; height:35px;"></div>';
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
					
					
				}).fail(function(x){
					myApp.showPreloader('Mengambil data...');
					myApp.closeModal();
					myApp.alert("Pengambilan data grup gagal", 'Perhatian!');
				});
				
			myApp.closeModal();
		}).fail(function(x){
			myApp.showPreloader('Mengambil data...');
			myApp.closeModal();
			myApp.alert("Pengambilan data user gagal", 'Perhatian!');
		});
}


