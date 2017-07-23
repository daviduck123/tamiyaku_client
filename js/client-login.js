//---------------------------------------------------------------------------------------------------------------------------------------LOGIN
function loginPost() {
	myApp.showPreloader('Mengambil data...');
	var email = document.getElementById("email_login").value;
	var password = document.getElementById("password_login").value;
	
	$(document).ready(function() {
	if(email=="")
	{
		myApp.alert('Silahkan isi E-Mail anda', 'Perhatian!');
	}
	else
	{
		var cekEmail=validateEmail(email);
		if (cekEmail==false) 
		{
			myApp.alert('Format E-Mail anda tidak benar', 'Perhatian!');
		}
		else
		{
			if(password=="")
			{
				myApp.alert('Silahkan isi password anda', 'Perhatian!');
			}
			else
			{
				if(password.length < 8)
				{
					myApp.alert('Password minimal berisi 8 karakter', 'Perhatian!');
				}
				else
				{
					var link=urlnya+'/api/login/index/';
					var formData=JSON.stringify({
						email:email,
						password:password,
					});
					
					$.ajax({
						url: link,
						data: formData,
						type: 'POST',
						contentType: false,
						processData: false
					}).done(function(z){
						if(z.status=="TRUE")
						{
							if(z.user.verified==1)
							{
								var d = new Date();
								//exdays var lama harinya
								var exdays=1;
								d.setTime(d.getTime() + (exdays*24*60*60*1000));
								var expires = d.toGMTString();
									
								mainView.router.loadPage('home.html');
								saveData( "active_user_id",z.user.id);
								saveData( "active_user_email",z.user.email);
								saveData( "active_user_nama",z.user.nama);
								saveData( "active_user_kota",z.user.id_kota);
								saveData( "active_user_jenis_kelamin",z.user.jenis_kelamin);
								saveData( "expires",expires);

								globalListKelas = [];
								$.ajax({ dataType: "jsonp",
									url: urlnya+'/api/kelas/getAllByUserId?id_user='+z.user.id,
									type: 'GET',
									contentType: false,
									processData: false
								}).done(function(data){
									if(data.length > 0){
										for(var zzz = 0 ; zzz < data.length ; zzz++){
											if(data[zzz]['id_kelas'] === "1"){
												globalListKelas.push({"1":"STB"});
											}else if(data[zzz]['id_kelas'] === "2"){
												globalListKelas.push({"2":"STO"});
											}else if(data[zzz]['id_kelas'] === "3"){
												globalListKelas.push({"3":"Speed"});
											}
										}
									}else{
										globalListKelas = [];
									}
								});
								
								myApp.alert('Hi '+getData("active_user_nama")+', cookies berakhir pada='+getData("expires"), 'Selamat datang kembali!');
								storeImage(z.user.foto,'profilePic');
								 $(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
							}
							else
							{
								mainView.router.loadPage('inputCode.html');
								saveData( "temp_active_user_id",z.user.id);
								saveData( "temp_active_email",z.user.email);
								saveData( "temp_active_password",password);
							}
						}
						else
						{
							myApp.alert('Maaf Email dan Password yang anda masukkan tidak sesuai dengan data kami!','Perhatian!');
						}
						myApp.closeModal();
					}).fail(function(x){
						
						myApp.closeModal();
						myApp.alert('Maaf terdapat kesalahan dalam pengisian data, silahkan coba lagi', 'Perhatian!');
						console.log(x);
						//for (var pair of formData.entries()) {
						//	console.log(pair[0]+ ', ' + pair[1]); 
						//}
					});
				}
			}
		}
	}
	});
}

function loginBySavedData() {
	myApp.showPreloader('Mengambil data...');
	var email = getData("temp_active_email");
	var password = getData("temp_active_password");
	
	$(document).ready(function() {
	if(email=="")
	{
		myApp.alert('Silahkan isi E-Mail anda', 'Perhatian!');
	}
	else
	{
		var cekEmail=validateEmail(email);
		if (cekEmail==false) 
		{
			myApp.alert('Format E-Mail anda tidak benar', 'Perhatian!');
		}
		else
		{
			if(password=="")
			{
				myApp.alert('Silahkan isi password anda', 'Perhatian!');
			}
			else
			{
				if(password.length < 8)
				{
					myApp.alert('Password minimal berisi 8 karakter', 'Perhatian!');
				}
				else
				{
					var link=urlnya+'/api/login/index/';
					var formData=JSON.stringify({
						email:email,
						password:password,
					});
					
					$.ajax({
						url: link,
						data: formData,
						type: 'POST',
						contentType: false,
						processData: false
					}).done(function(z){
						myApp.closeModal();
						if(z.status=="TRUE")
						{
							if(z.user.verified==1)
							{
								var d = new Date();
								//exdays var lama harinya
								var exdays=1;
								d.setTime(d.getTime() + (exdays*24*60*60*1000));
								var expires = d.toGMTString();
								
								eraseData("temp_active_user_id");
								eraseData("temp_active_email");
								eraseData("temp_active_password");
									
								mainView.router.loadPage('home.html');
								saveData( "active_user_id",z.user.id);
								saveData( "active_user_email",z.user.email);
								saveData( "active_user_nama",z.user.nama);
								saveData( "active_user_kota",z.user.id_kota);
								saveData( "active_user_jenis_kelamin",z.user.jenis_kelamin);
								saveData( "expires",expires);

								globalListKelas = [];
								$.ajax({ dataType: "jsonp",
									url: urlnya+'/api/kelas/getAllByUserId?id_user='+z.user.id,
									type: 'GET',
									contentType: false,
									processData: false
								}).done(function(data){
									if(data.length > 0){
										for(var zzz = 0 ; zzz < data.length ; zzz++){
											if(data[zzz]['id_kelas'] === "1"){
												globalListKelas.push({"1":"STB"});
											}else if(data[zzz]['id_kelas'] === "2"){
												globalListKelas.push({"2":"STO"});
											}else if(data[zzz]['id_kelas'] === "3"){
												globalListKelas.push({"3":"Speed"});
											}
										}
									}else{
										globalListKelas = [];
									}
								});
								
								myApp.alert('Hi '+getData("active_user_nama")+', cookies berakhir pada='+getData("expires"), 'Selamat datang kembali!');
								storeImage(z.user.foto,'profilePic');
								 $(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
							}
							else
							{
								mainView.router.loadPage('inputCode.html');
								saveData( "temp_active_user_id",z.user.id);
								saveData( "temp_active_email",z.user.email);
								saveData( "temp_active_password",password);
							}
						}
						else
						{
							myApp.alert('Maaf Email dan Password yang anda masukkan tidak sesuai dengan data kami!','Perhatian!');
						}
						myApp.closeModal();
					}).fail(function(x){
						
						myApp.closeModal();
						myApp.alert('Maaf terdapat kesalahan dalam pengisian data, silahkan coba lagi', 'Perhatian!');
						console.log(x);
						//for (var pair of formData.entries()) {
						//	console.log(pair[0]+ ', ' + pair[1]); 
						//}
					});
				}
			}
		}
	}
	});
}
	
function cekLoginAktif() {
	myApp.showPreloader('Mengambil data...');
	var active_user_id="";
	var expires="";
	active_user_id=getData("active_user_id");
	expires=getData("expires");
	
	if(active_user_id!="" && active_user_id!=null)
	{
		var d = new Date();
		var dexpires = new Date(expires);
		if(d.getTime()<dexpires.getTime())
		{
			globalListKelas = [];
			$.ajax({ dataType: "jsonp",
				url: urlnya+'/api/kelas/getAllByUserId?id_user='+active_user_id,
				type: 'GET',
				contentType: false,
				processData: false
			}).done(function(data){
				if(data.length > 0){
					for(var zzz = 0 ; zzz < data.length ; zzz++){
						if(data[zzz]['id_kelas'] === "1"){
							globalListKelas.push({"1":"STB"});
						}else if(data[zzz]['id_kelas'] === "2"){
							globalListKelas.push({"2":"STO"});
						}else if(data[zzz]['id_kelas'] === "3"){
							globalListKelas.push({"3":"Speed"});
						}
					}
				}else{
					globalListKelas = [];
				}
				mainView.router.loadPage('home.html');
				$(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));
				myApp.closeModal();
			});
		}
		else
		{	
			myApp.alert('Sesi waktu anda habis, silahkan lakukan login kembali!');
			mainView.router.loadPage('login.html');
			eraseData("active_user_id");
			eraseData("expires");
		}
	}
	else
	{
		myApp.closeModal();
		mainView.router.loadPage('login.html');
		eraseData("active_user_id");
		eraseData("expires");
	}
}
