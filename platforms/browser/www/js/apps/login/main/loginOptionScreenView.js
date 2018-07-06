define(["app", "baseItemView","tpl!apps/login/main/templates/loginOptionScreenTpl.tpl","apps/dashBoard/main/myTripsModel","jqueryTouchSwipe","bootstrap","utils","apps/common/customerModel"],
	function(App, BaseItemView,LoginStartTpl,MyTripsModel, jqueryTouchSwipe, bootstrap,Utils, CustomerModel){
    var loginitemView=  BaseItemView.extend({
		template:LoginStartTpl,
		events:{
			'click #openWebSite':'openWebSiteFn',
			'click #openBarCode':'openBarCodeFn',
			'click #openFeedback':'openFeedbackFn',
			'click #openTable':'openTableFn'
			
		},
		
		onShow : function(){
			var ht = $(window).height();	
			$(".main-background").css("min-height",ht);
			var done = function(err, status){
				if(err){
				  console.error(err._message);
				} 
				else {
				  console.log('QRScanner is initialized. Status: '+ JSON.stringify(status));
				}
			  };
			QRScanner.prepare(done);
			console.log("QRScanner : "+ JSON.stringify(QRScanner));
		},
		openWebSiteFn : function(){
			//App.trigger("login:registerScreen");
			url = "http://www.opticalheritagemuseum.com/";
			//window.open(url, '_blank');

			var target = "_blank";
    		var options = "location=no,hidden=no";
    		inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
		},
		openBarCodeFn :  function(){
			QRScanner.show(function(status){
				console.log(status);
				$('#cordova-plugin-qrscanner-video-preview').addClass('browserSH');
				$('.main-background').addClass('mobileSH');
				});
			QRScanner.scan(function(err, contents){
				if(err){
					console.error(err._message);
				}
				alert('Contact Details of OHM: ' + contents);
				$('.main-background').removeClass('mobileSH');
				$('#cordova-plugin-qrscanner-video-preview').removeClass('browserSH');
				App.trigger("login:optionScreen");
				QRScanner.hide(function(status){
					console.log(status);
				});
			});
			
		},
		openFeedbackFn:function(){
			App.trigger("login:registerScreen");
			
		},
		openTableFn:function(){
			App.trigger("dashBoard:myTrips");
		}

		
	
		
		
    }); 
    return loginitemView;
});
