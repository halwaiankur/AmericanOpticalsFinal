define(['jquery'],function(){
	return {
		callService: function (url, type, data, requestHeaderString, sucessFunction, errorFunction) {		
			$.ajax({
				url: url,
				type: type,
				dataType: 'json',
				timeout: 50000,
				data: data,
				contentType :"application/json",		
				beforeSend: function(requestHeader){
					requestHeader.setRequestHeader("X-Authorization", requestHeaderString);
				},				
				success:function(result){
					console.log(JSON.stringify(result));
					sucessFunction(result);
				},
		
				error: function(result){
					if(result.statusText=="timeout")
					 	errorFunction("Please try after some time. If problem persists, contact CholaMS Customer Care.");
				}
			});
		}
	}
});