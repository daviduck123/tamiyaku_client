function aktivasi(clickedId){
	var id_user=getData("temp_active_user_id");
	var code = document.getElementById("input_code").value;
	var link=urlnya+'/api/user/updateVerified?id_user='+id_user+'&uniqueId='+code;
	$.ajax({ 
	dataType: "jsonp",
		url: link,
		type: 'GET',
		contentType: false,
		processData: false
	}).done(function(z){
		if(z.status==true)
		{
			loginBySavedData();
		}
		else
		{
			alert(z.message);
		}
	}).fail(function(x){
		myApp.alert("Pengiriman data gagal", 'Perhatian!');
	});
	
}