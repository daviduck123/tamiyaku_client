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

function setCookie(){
	//pengecekan inputan user
		var username = document.getElementById("username").value;
		var kota = document.getElementById("kota").value;
		var hp = document.getElementById("hp").value;
		var password = document.getElementById("password").value;
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
				if(hp=="")
				{
					myApp.alert('Silahkan isi nomor HP anda', 'Perhatian!');
				}
				else
				{
					if (isNaN(parseFloat(hp)) && !isFinite(hp)) 
					{
						myApp.alert('Nomor HP harus angka', 'Perhatian!');
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
									    formData.append("no_hp", hp);
									    formData.append("password", password);
									    formData.append("jenis_kelamin", gender);
									    formData.append("file", blob);

									    //pake variable ini tok ckup
									    globalCookie["formData"] = formData;

										document.cookie = "username="+username+";";
										document.cookie = "kota="+kota+";";
										document.cookie = "hp="+hp+";";
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
		var hp = getcookie("hp");
		//alert(hp);
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

			//ajax e aku mek iso jalan seng iki kwkwkwkw
			$.ajax({
			    url: 'http://localhost/tamiyaku-server/api/user/registerNewUser',
			    data: formData,
			    type: 'POST',
			    contentType: false,
			    processData: false
			}).done(function(z){
				mainView.router.loadPage('login.html');
				myApp.alert('Data anda berhasil dibuat, silahkan login', 'Berhasil!');
				
				eraseCookie("username");
				eraseCookie("kota");
				eraseCookie("hp");
				eraseCookie("password");
				eraseCookie("fileInput");
				eraseCookie("gender");
				eraseCookie("kelas1");
				eraseCookie("kelas2");
				eraseCookie("kelas3");
			}).error(function(x){
				myApp.alert('Maaf terdapat kesalahan dalam pengisian data, silahkan coba lagi', 'Perhatian!');
			});

			/*var xhr = new XMLHttpRequest();
			xhr.open("POST", urlnya+"/api/user/registerNewUser/", true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(formData);

			
			
			
			xhr.onreadystatechange = function() 
			{ 
				// If the request completed, close the extension popup
				if (xhr.readyState == 4)
				  if (xhr.status == 200)
				  {
					var json_data = xhr.responseText; 
					var jsonObj = JSON.parse(json_data);
					if(jsonObj.status==true)
					{
						mainView.router.loadPage('login.html');
						myApp.alert('Data anda berhasil dibuat, silahkan login', 'Berhasil!');
					}
					else
					{
						myApp.alert('Maaf terdapat kesalahan dalam pengisian data, silahkan coba lagi', 'Perhatian!');
					}
				  }
				eraseCookie("username");
				eraseCookie("kota");
				eraseCookie("hp");
				eraseCookie("password");
				eraseCookie("fileInput");
				eraseCookie("gender");
				eraseCookie("kelas1");
				eraseCookie("kelas2");
				eraseCookie("kelas3");
			};*/
		}
	}
	
	function loginPost() {
		var no_hp = document.getElementById("no_hp").value;
		var password = document.getElementById("password").value;
		
		
		if(no_hp=="")
		{
			myApp.alert('Silahkan isi nomor HP anda', 'Perhatian!');
		}
		else
		{
			if (isNaN(parseFloat(no_hp)) && !isFinite(no_hp)) 
			{
				myApp.alert('Nomor HP harus angka', 'Perhatian!');
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
						var xhr = new XMLHttpRequest();
						xhr.open("POST", urlnya+"/api/login/index/", true);
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.send(JSON.stringify({
							no_hp:no_hp,
							password:password,
						}));
						
						xhr.onreadystatechange = function() 
						{ 
							// If the request completed, close the extension popup
							if (xhr.readyState == 4)
							  if (xhr.status == 202)
							  {
								var json_data = xhr.responseText; 
								var jsonObj = JSON.parse(json_data);
								if(jsonObj.status=="TRUE")
								{
									var d = new Date();
									//exdays var lama harinya
									var exdays=1;
									d.setTime(d.getTime() + (exdays*24*60*60*1000));
									var expires = "expires=" + d.toGMTString()+";";
									
									mainView.router.loadPage('home.html');
									document.cookie = "active_user_id="+jsonObj.id+";";
									document.cookie = expires;
									//var x = document.cookie;
									//alert(x);
									myApp.alert('Hi user_id='+getcookie("active_user_id")+', cookies berakhir pada='+getcookie("expires"), 'Selamat datang kembali!');
								}
								else
								{
									myApp.alert('Maaf data yang anda masukkan tidak cocok dengan data kami', 'Tidak ditemukan!');
								}
							  }
						};
					}
				}
			}
		}
	}
	
	function cekLoginAktif() {
		var active_user_id="";
		var expires="";
		active_user_id=getcookie("active_user_id");
		expires=getcookie("expires");
		
		if(active_user_id!="")
		{
			var d = new Date();
			var dexpires = new Date(expires);
			if(d.getTime()<dexpires.getTime())
			{
				mainView.router.loadPage('home.html');
				myApp.alert('Hi user_id='+getcookie("active_user_id")+', cookies berakhir pada='+getcookie("expires"), 'Selamat datang kembali!');
			}
			else
			{
				mainView.router.loadPage('login.html');
				eraseCookie("active_user_id");
				eraseCookie("expires");
			}
		}
		else
		{
			mainView.router.loadPage('login.html');
			eraseCookie("active_user_id");
			eraseCookie("expires");
		}
	}
	
	function logout() {
		myApp.closePanel();
		mainView.router.loadPage('login.html');
		eraseCookie("active_user_id");
		eraseCookie("expires");
	}
   
   