//--------------------------------------------------------------------------------------------------------------------REGISTER
function gotoRegister(){
	mainView.router.loadPage('daftar.html');
}

function getKota() {
	var link=urlnya+'/api/kota/';
		$.ajax({ dataType: "jsonp",
		    url: link,
		    type: 'GET',
		    contentType: false,
		    processData: false
		}).done(function(z){
			var myOptions = z;

			$.each(myOptions, function(i, el) 
			{ 
			   $('#kota_register').append( new Option(el.nama,el.id) );
			});
			
		}).fail(function(x){
			myApp.alert("Pengambilan data kota gagal", 'Perhatian!');
		}); 
}

function setCookie(){
//pengecekan inputan user
	var username = document.getElementById("username").value;
	var kota = $('#kota_register').find(":selected").val();
	//var kota = document.getElementById("kota").value;
	var email = document.getElementById("email_register").value;
	var password = document.getElementById("password_register").value;
	var con_password = document.getElementById("con_password").value;
	var fileinput = document.getElementById("file_register").value;
	var gender;
	var radios = document.getElementsByName('gender') ;
	
	for (var i = 0, length = radios.length; i < length; i++) 
	{
		if (radios[i].checked) 
		{
			// do whatever you want with the checked radio
			// only one radio can be logically checked, don't check the rest
			gender =radios[i].value;
			break;
		}
		else
		{
			gender="";
		}
	}		
	
	if(username=="")
	{
		myApp.alert('Silahkan isi nama anda', 'Perhatian!');
	}
	else
	{
		if(kota=="" || kota==0 || kota=="0")
		{
			myApp.alert('Silahkan pilih kota anda', 'Perhatian!');
		}
		else
		{
			if(email=="")
			{
				myApp.alert('E-Mail harus diisi', 'Perhatian!');
			}
			else
			{
				var cekEmail=validateEmail(email);
				if(cekEmail==false)
				{
					myApp.alert('Format E-Mail anda tidak benar', 'Perhatian!');
				}
				else
				{
					if(password=="")
					{
						myApp.alert('Password harus diisi', 'Perhatian!');
					}
					else
					{
						if(password.length < 8)
						{
							myApp.alert('Password mininal 8 karakter', 'Perhatian!');
						}
						else
						{
							if(con_password=="")
							{
								myApp.alert('Konfirmasi Password harus diisi', 'Perhatian!');
							}
							else
							{
								if(con_password!=password)
								{
									myApp.alert('Password dan Konfirmasi Password tidak sama', 'Perhatian!');
								}
								else
								{
								
									if(fileinput=="")
									{
										myApp.alert('Silahkan pilih foto anda', 'Perhatian!');
									}
									else
									{
										if(gender=="")
										{
											myApp.alert('Silahkan pilih gender anda', 'Perhatian!');
										}
										else
										{
											var blob=$("#file_register")[0].files[0];
											var formData = new FormData();
											formData.append("nama", username);
											formData.append("id_kota", kota);
											formData.append("email", email);
											formData.append("password", password);
											formData.append("jenis_kelamin", gender);
											formData.append("file", blob);
												//pake variable ini tok ckup
											globalCookie["formData"] = formData;
											
											saveData( "username",username);
											saveData( "id_kota",kota);
											saveData( "email",email);
											saveData( "password",password);
											saveData( "fileInput",formData);
											saveData( "gender",gender);
											mainView.router.loadPage('pilihKelas.html');
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
	
	
function setCookie2(){
	var kelas = document.getElementsByName('kelas');
	var i;
	for (i = 0; i < kelas.length; i++) {
		if (kelas[i].checked) 
		{
			if(i==0)
			{
				saveData( "kelas1",kelas[i].value);
			}
			else if(i==1)
			{
				saveData( "kelas2",kelas[i].value);
			}
			else if(i==2)
			{
				saveData( "kelas3",kelas[i].value);
			}
		}
	}
}
 
function registerPost() {
   setCookie2();
	var username = getData("username");
	//alert(username);
	var kota = getData("kota");
	//alert(kota);
	var email = getData("email");
	//alert(email);
	var password = getData("password");
	//alert(password);
	var fileInput = getData("fileInput");
	//alert(fileInput);
	var gender = getData("gender");
	if(gender=="male")
		gender="Laki-laki";
	else if(gender=="female")
		gender="Perempuan";
	//alert(gender);
	var kelas1 = getData("kelas1");
	//alert(kelas1);
	var kelas2 = getData("kelas2");
	//alert(kelas2);
	var kelas3 = getData("kelas3");
		var tempKelas=kelas1+kelas2+kelas3;
	if(tempKelas==0)
	{
		myApp.alert('Anda harus memilih minimal 1 kelas', 'Perhatian!');
	}
	else
	{
		var kelas= new Array();
		if(kelas1!=null && kelas1!="")
		{
			kelas.push(1);
		}
		if(kelas2!=null && kelas2!="")
		{
			kelas.push(2);
		}
		if(kelas3!=null && kelas3!="")
		{
			kelas.push(3);
		}
		myApp.showPreloader('Proses Data...');
		var formData = globalCookie["formData"];
		formData.append("id_kelas",kelas);
		var link=urlnya+'/api/user/registerNewUser';
		
		$.ajax({
		    url: link,
		    type: "POST",
		    data: formData,
		    processData: false,
		    contentType: false
		}).done(function(z){
			myApp.closeModal();
			mainView.router.loadPage('login.html');
			myApp.alert('Data anda berhasil dibuat, silahkan login', 'Berhasil!');
			
			eraseData("username");
			eraseData("kota");
			eraseData("email");
			eraseData("password");
			eraseData("fileInput");
			eraseData("gender");
			eraseData("kelas1");
			eraseData("kelas2");
			eraseData("kelas3");

		}).fail(function(x){
			myApp.closeModal();
			myApp.alert(x.message+" "+x.error, 'Perhatian!');
			
			eraseData("username");
			eraseData("kota");
			eraseData("email");
			eraseData("password");
			eraseData("fileInput");
			eraseData("gender");
			eraseData("kelas1");
			eraseData("kelas2");
			eraseData("kelas3");
			/*
			for (var ii = 0; ii < formData.entries().length; ii++) {
				console.log(formData.entries()[ii][0]+ ', ' + formData.entries()[ii][1]); 
			}*/
		});
	}
}