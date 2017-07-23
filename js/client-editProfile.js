function editProfileSimpan()
{
	//myApp.showPreloader('Mengambil data...');
	var id_user = getData("active_user_id");
	
	var nama = document.getElementById("nama_editProfile").value;
	var password = document.getElementById("password_editProfile").value;
	var con_password = document.getElementById("con_password_editProfile").value;
	var id_kota = $('#kota_editProfile').find(":selected").val();
	var fileinput = document.getElementById("file_editProfile").value;
	
	
	var gender = "";
	var radios = document.getElementsByName('gender_editProfile') ;
	for (var i = 0, length = radios.length; i < length; i++) 
	{
		if (radios[i].checked) 
		{
			gender =radios[i].value;
			break;
		}
		else
		{
			gender="";
		}
	}
	
	if(nama=="")
	{
		myApp.alert('Silahkan isi nama anda', 'Perhatian!');
	}
	else
	{
		if(id_kota=="" || id_kota==0 || id_kota=="0")
		{
			myApp.alert('Silahkan pilih kota anda', 'Perhatian!');
		}
		else
		{
			if(password.length < 8 && password.length >=1)
			{
				myApp.alert('Password mininal 8 karakter', 'Perhatian!');
			}
			else
			{
				if(con_password!=password)
				{
					myApp.alert('Password dan Konfirmasi Password tidak sama', 'Perhatian!');
				}
				else
				{
					if(gender=="")
					{
						myApp.alert('Silahkan pilih gender anda', 'Perhatian!');
					}
					else
					{
						var blob=$("#file_editProfile")[0].files[0];
						var formData = new FormData();
						formData.append("nama", nama);
						formData.append("jenis_kelamin", gender);
						formData.append("id_kota", id_kota);
						formData.append("id_user", id_user);
						formData.append("file", blob);
						
						var link=urlnya+'/api/user/updateUser';
						//console.log(formData);
						
						//for (var z[ii] of formData.entries()) {
						//	console.log(z[ii][0]+ ', ' + z[ii][1]); 
						//}
						$.ajax({
							url: link,
						data: formData,
								type: 'POST',
						contentType: false,
							processData: false
						}).done(function(z){
							saveData("active_user_nama",nama);
							saveData("active_user_kota",id_kota);
							saveData("active_user_jenis_kelamin",gender);
							
							var link=urlnya+'/api/user/getUserByIdUser?id_user='+id_user;
							console.log(link);
							$.ajax({ dataType: "jsonp",
								url: link,
								type: 'GET',
								contentType: false,
								processData: false
							}).done(function(z){
								
								saveData("profilePic",z.foto);
								myApp.closeModal();
								mainView.router.loadPage('home.html');
								myApp.alert('Profil berhasil diubah', 'Berhasil!');
							}).fail(function(x){
								myApp.alert("Pengambilan profile gagal", 'Perhatian!');
							}); 
						}).fail(function(x){
							myApp.closeModal();
							myApp.alert(x.message+" "+x.error, 'Perhatian!');
						});
					}
				}
			}		
		}
	}
}