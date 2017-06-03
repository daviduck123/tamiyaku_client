// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: false
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
   
     $$("#1").on('click',function(){
        myApp.alert("home");
    });
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});
myApp.onPageInit('index', function (page) {
    // run createContentPage func after link was clicked
    
    $$('.create-page').on('click', function () {
        createContentPage();
    });																					

});

myApp.onPageInit('buatGrup', function (page) {
    // run createContentPage func after link was clicked
    
	console.log("masuk buat grup");
	getKotaGrup();
	var nama_grup = getcookie("nama_grup");
	var kelas_grup = getcookie("kelas_grup");
	var kota_grup = getcookie("kota_grup");
	var lokasi_grup = getcookie("lokasi_grup");
	var lat = getcookie("lat_grup");
	var lng = getcookie("lng_grup");
	
	if(lat != null && lng != null)
	{
		$("#isi_latlng_grup").remove();
		$("#latlng_grup").append("<div id='isi_latlng_grup'>Latitude = "+lat+"<br>Longitude = "+lng+"</div>");
	}
	
	if(nama_grup != null)
	document.getElementById("nama_grup").value = nama_grup;
	if(kelas_grup != null)
	document.getElementById("kelas_grup").value = kelas_grup;
	if(kota_grup != null)
	document.getElementById("kota_grup").value = kota_grup;
	if(lokasi_grup != null)
	document.getElementById("lokasi_grup").value = lokasi_grup;
});

myApp.onPageInit('bukaPeta', function (page) {
    // run createContentPage func after link was clicked
	var map;
	function showPosition(position) {
		console.log("lat:"+position.coords.latitude+"\nlng:"+position.coords.longitude);
		map = new GMaps({
				div: '#petaku',
				lat: position.coords.latitude,
				lng: position.coords.longitude,
				click: function(e) {
					alert('Silahkan geser marker ke lokasi yang anda inginkan!');
				  },
			});
			
			map.addMarker({

				lat:  ﻿-7.2582548000000005,
				lng: 112.76117359999999,
				draggable: true,
				dragend: function(event) {
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					myApp.alert('Latitude = '+lat+"\nLongitude = "+lng, 'Lokasi');
					document.cookie = "lat_grup="+lat+";";
					document.cookie = "lng_grup="+lng+";";
				}
			});
	}
    
	console.log("masuk buka peta");
	$(document).ready(function(){
		if (navigator.geolocation) 
		{
			navigator.geolocation.getCurrentPosition(showPosition);
		} 
		else 
		{ 
			map = new GMaps({
				div: '#petaku',
				lat: ﻿-24.788333333333,
				lng: -65.410555555556,
				click: function(e) {
					alert('Silahkan geser marker ke lokasi yang anda inginkan!');
				  },
			});	
			
			map.addMarker({

				lat:  ﻿-7.2582548000000005,
				lng: 112.76117359999999,
				draggable: true,
				dragend: function(event) {
					var lat = event.latLng.lat();
					var lng = event.latLng.lng();
					myApp.alert('Latitude = '+lat+"\nLongitude = "+lng, 'Lokasi');
					document.cookie = "lat_grup="+lat+";";
					document.cookie = "lng_grup="+lng+";";
				}
			});
		}
	});	
});

myApp.onPageInit('home', function (page) {
    // run createContentPage func after link was clicked
    
	console.log("masuk home");
	getAllPost();
});

myApp.onPageInit('daftar', function (page) {
    // run createContentPage func after link was clicked
    
	console.log("masuk daftar");
	getKota();
});



// Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');
 
 ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
			console.log("aaa");
            myApp.pullToRefreshDone(); // After we refreshed page content, we need to reset pull to refresh component to let user pull it again:
        }, 2000);
    });
	
myApp.initPullToRefresh("#pullToRefreshHome");

// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
	mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
	return;
}