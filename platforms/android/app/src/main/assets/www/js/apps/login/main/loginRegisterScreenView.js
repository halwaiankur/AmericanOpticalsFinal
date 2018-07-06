define(["app", "baseItemView","tpl!apps/login/main/templates/loginRegisterScreenTpl.tpl","apps/dashBoard/main/myTripsModel","jqueryTouchSwipe","bootstrap","utils","apps/common/customerModel"],
	function(App, BaseItemView,LoginStartTpl,MyTripsModel, jqueryTouchSwipe, bootstrap,Utils, CustomerModel){
    var loginitemView=  BaseItemView.extend({
		template:LoginStartTpl,
		events:{
			'click #registerBtn':'doRegistration',
			'click #cancelBtn':'cancelBtnFn'
		},
		
		onShow : function(){
			var ht = $(window).height();	
			$(".main-background").css("min-height",ht);
		},
		doRegistration : function()
		{
			var thisObj = this;
			var dateTemp = Math.floor(Date.now());
			var driverIdValue = $("#FirstName").val();
			if(Utils.validateFields(App.customerModel, arrayCustomerDetails))
			{
				var dateTemp = Date.now();
				App.customerModel.set({
					"id" : App.customerModel.get("phone"),
					"group" : "Test1",
					"registeredDate" : dateTemp,
					"driverId": driverIdValue
				});
				App.customerModel.save();
				console.log(App.customerModel);
				alert ("Thank you "+App.customerModel.get("firstName")+" for your valuable feedback!");
				App.trigger("login:optionScreen");
                //App.trigger("dashBoard:Drive");
				//thisObj.fetchDriverDetails(App.customerModel.get("FirstName"));
				//ActivityIndicator.show(null);
			}
		},
		cancelBtnFn:function(){
			App.trigger("login:optionScreen");
		}
		
		
		
    }); 
    return loginitemView;
});
