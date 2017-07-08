//---------------------------------------------------------------------------------------------------------------------------------------LOGIN
function loginPost() {
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
						
							console.log(z);
						if(z.status=="TRUE")
						{
							var d = new Date();
							//exdays var lama harinya
							var exdays=1;
							d.setTime(d.getTime() + (exdays*24*60*60*1000));
							var expires = "expires=" + d.toGMTString()+";";
								
							mainView.router.loadPage('home.html');
							saveData( "active_user_id",z.user.id);
							saveData( "active_user_email",z.user.email);
							saveData( "active_user_nama",z.user.nama);
							saveData( "active_user_jenis_kelamin",z.user.jenis_kelamin);
							saveData( "expires",expires);

							globalListKelas = [];
							$.ajax({
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
							
							myApp.alert('Hi '+getcookie("active_user_nama")+', cookies berakhir pada='+getcookie("expires"), 'Selamat datang kembali!');
							storeImage(z.user.foto,'profilePic');
							 $(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));

						}
						else
						{
							myApp.alert('Maaf Email dan Password yang anda masukkan tidak sesuai dengan data kami!','Perhatian!');
						}
						
					}).fail(function(x){
						myApp.alert('Maaf terdapat kesalahan dalam pengisian data, silahkan coba lagi', 'Perhatian!');
						console.log(formData);
						/*for (var pair of formData.entries()) {
							console.log(pair[0]+ ', ' + pair[1]); 
						}*/
					});
				}
			}
		}
	}
	});
}
	
function cekLoginAktif() {
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
			mainView.router.loadPage('home.html');

			globalListKelas = [];
			$.ajax({
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
			});
			
			 $(".profilePicture").attr('src','data:image/jpeg;base64,'+getImage('profilePic'));

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
		mainView.router.loadPage('login.html');
		eraseData("active_user_id");
		eraseData("expires");
	}
}
