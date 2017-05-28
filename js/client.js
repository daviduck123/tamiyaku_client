var urlnya="http://localhost/tamiyaku-server";
//var urlnya="http://server.neoalitcahya.com";

var globalCookie = [];


function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=0'
}

function getcookie(cookiename){
	var cookiestring  = document.cookie;
	var cookiearray = cookiestring.split(';');
	for(var i =0 ; i < cookiearray.length ; ++i)
	{ 
		if(cookiearray[i].trim().match(cookiename+'='))
		{ 
			var temparray = cookiearray[i].split('=');
			return temparray[1];
		}
	} return null;
}
	
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function setCookie(){
//pengecekan inputan user
	var username = document.getElementById("username").value;
	var kota = document.getElementById("kota").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	var con_password = document.getElementById("con_password").value;
	var fileinput = document.getElementById("fileInput").value;
	var gender;
	var radios = document.getElementsByName('gender') ;
		console.log($("#fileInput"));
	
	for (var i = 0, length = radios.length; i < length; i++) 
	{
		if (radios[i].checked) 
		{
			// do whatever you want with the checked radio
			//document.cookie = "gender="+radios[i].value+";";
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
		if(kota=="")
		{
			myApp.alert('Silahkan isi kota anda', 'Perhatian!');
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
											var blob=$("#fileInput")[0].files[0];
											var formData = new FormData();
											formData.append("nama", username);
											formData.append("kota", kota);
											formData.append("email", email);
											formData.append("password", password);
											formData.append("jenis_kelamin", gender);
											formData.append("file", blob);
												//pake variable ini tok ckup
											globalCookie["formData"] = formData;
												document.cookie = "username="+username+";";
											document.cookie = "kota="+kota+";";
											document.cookie = "email="+email+";";
											document.cookie = "password="+password+";";		
											document.cookie = "fileInput="+formData+";";
											document.cookie = "gender="+gender+";";
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
				document.cookie = "kelas1="+kelas[i].value+";";
			}
			else if(i==1)
		{
				document.cookie = "kelas2="+kelas[i].value+";";
			}
			else if(i==2)
			{
			document.cookie = "kelas3="+kelas[i].value+";";
			}
		}
	}
}
  
function bacaCookie() {
	setCookie2();
	var x = document.cookie;
	alert(x);
}
 
function registerPost() {
   setCookie2();
	var username = getcookie("username");
	//alert(username);
	var kota = getcookie("kota");
	//alert(kota);
	var email = getcookie("email");
	//alert(email);
	var password = getcookie("password");
	//alert(password);
	var fileInput = getcookie("fileInput");
	//alert(fileInput);
	var gender = getcookie("gender");
	if(gender=="male")
		gender="Laki-laki";
	else if(gender=="female")
		gender="Perempuan";
	//alert(gender);
	var kelas1 = getcookie("kelas1");
	//alert(kelas1);
	var kelas2 = getcookie("kelas2");
	//alert(kelas2);
	var kelas3 = getcookie("kelas3");
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
			//di ambil variable e, pas d tambahin tok
		var formData = globalCookie["formData"];
		formData.append("id_kelas",kelas);
		var link=urlnya+'/api/user/registerNewUser';
		
		//ajax e aku mek iso jalan seng iki kwkwkwkw
		$.ajax({
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			mainView.router.loadPage('login.html');
			myApp.alert('Data anda berhasil dibuat, silahkan login', 'Berhasil!');
			
			eraseCookie("username");
			eraseCookie("kota");
			eraseCookie("email");
			eraseCookie("password");
			eraseCookie("fileInput");
			eraseCookie("gender");
			eraseCookie("kelas1");
			eraseCookie("kelas2");
			eraseCookie("kelas3");
		}).fail(function(x){
			myApp.alert(x.message+" "+x.error, 'Perhatian!');
			
			eraseCookie("username");
			eraseCookie("kota");
			eraseCookie("email");
			eraseCookie("password");
			eraseCookie("fileInput");
			eraseCookie("gender");
			eraseCookie("kelas1");
			eraseCookie("kelas2");
			eraseCookie("kelas3");
			/*
			for (var pair of formData.entries()) {
				console.log(pair[0]+ ', ' + pair[1]); 
			}*/
		});
	}
}

function loginPost() {
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
	
	
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
					//var formData = new FormData();
					//formData.append("email",email);
					//formData.append("password",password);
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
							var d = new Date();
							//exdays var lama harinya
							var exdays=1;
							d.setTime(d.getTime() + (exdays*24*60*60*1000));
							var expires = "expires=" + d.toGMTString()+";";
								
							mainView.router.loadPage('home.html');
							document.cookie = "active_user_email="+email+";";
							document.cookie = expires;
							myApp.alert('Hi user_id='+getcookie("active_user_email")+', cookies berakhir pada='+getcookie("expires"), 'Selamat datang kembali!');
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
}
	
function cekLoginAktif() {
	var active_user_email="";
	var expires="";
	active_user_email=getcookie("active_user_email");
	expires=getcookie("expires");
	
	if(active_user_email!="" && active_user_email!=null)
	{
		var d = new Date();
		var dexpires = new Date(expires);
		if(d.getTime()<dexpires.getTime())
		{
			mainView.router.loadPage('home.html');
			myApp.alert('Hi user_id='+getcookie("active_user_email")+', cookies berakhir pada='+getcookie("expires"), 'Selamat datang kembali!');
		}
		else
		{	
			myApp.alert('Sesi waktu anda habis, silahkan lakukan login kembali!');
			mainView.router.loadPage('login.html');
			eraseCookie("active_user_email");
			eraseCookie("expires");
		}
	}
	else
	{
		mainView.router.loadPage('login.html');
		eraseCookie("active_user_email");
		eraseCookie("expires");
	}
}

function logout() {
	myApp.closePanel();
	mainView.router.loadPage('login.html');
	eraseCookie("active_user_email");
	eraseCookie("expires");
}

function komentariPost(clicked_id) {
	//ON PROGRESS
	var email = getcookie("active_user_email");
	var id_post = "";
	$(document).ready(function(){
		
		id_post=clicked_id;
		var vardeksripsi="deskripsi_"+id_post;
			var vartable="table_"+id_post;
		
		var table = document.getElementById(vartable).value;
		
		console.log(vartable);
		
		if($("#" + vardeksripsi).length == 0) {
				$("#"+vartable).find('tbody')
			.append(" <tr> <td colspan='2'><textarea id='"+vardeksripsi+"' style='resize:none; margin-top:10px; width:90%; height:60px;' placeholder='Tulis Komentar Anda..'></textarea> </td></tr>.");
		} 
		else 
		{
			var deskripsi = document.getElementById(vardeksripsi).value;
			if(deskripsi=="")
			{
				myApp.alert('Anda belum mengisi komentar', 'Perhatian!');
			}
			else
			{
				var link=urlnya+'/api/login/index/';
				var formData=JSON.stringify({
					email:email,
					id_post:id_post,
					deskripsi:deskripsi,
				});
				myApp.alert(formData, 'Data Dikirim!');
				
				/*
				$.ajax({
					url: link,
					data: formData,
					type: 'POST',
					contentType: false,
					processData: false
				}).done(function(z){
					mainView.router.loadPage('home.html');
					//myApp.alert('Komentar dibuat', 'Berhasil!');
				}).fail(function(x){
					myApp.alert('Maaf tidak dapat mengomentari status, silahkan coba lagi', 'Perhatian!');
				});
				*/
			}
		}
	});
}

function statusPost() {
	//ON PROGRESS
	var email = getcookie("active_user_email");
	var status = document.getElementById("status").value;
	
	var link=urlnya+'/api/login/index/';
	
	if(status=="")
	{
		myApp.alert('Anda belum mengisi status anda', 'Perhatian!');
	}
	else
	{
		var blob=$("#fileInput")[0].files[0];
		var formData = new FormData();
		formData.append("email", email);
		formData.append("status", status);
		formData.append("file", blob);
		
		var coba="";
		for (var pair of formData.entries()) {
						coba+=pair[0]+ ', ' + pair[1]; 
		}
		
		myApp.alert(coba, 'Data Dikirim!');
		
		/*
		$.ajax({
		    url: link,
		    data: formData,
		    type: 'POST',
		    contentType: false,
		    processData: false
		}).done(function(z){
			mainView.router.loadPage('home.html');
			//myApp.alert('Berrhasil bikin status', 'Berhasil!');
			
		}).fail(function(x){
			myApp.alert('Maaf tidak dapat menambah status, silahkan coba lagi', 'Perhatian!');
		});
		*/
	}
}
   