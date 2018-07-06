define(["app", "epoxy", "localstorage"], function(App, localStorage){
	var registrationItem =  Backbone.Epoxy.Model.extend({
		localStorage: new Store("visitorDetails") ,
		defaults:{
			firstName:"",
			lastName:"",
			emailId:"",
			phone:""
		},
		validation:
		{
			firstName:
			[{
				required:true,
				msg:"FirstName Is required"
			},
			{
				pattern:/^[a-zA-Z\.\' ]+$/,
				msg:"FirstName can be only letters"
			}],
			lastName:
			[{
				required:true,
				msg:"LastName Is required"
			},
			{
				pattern:/^[a-zA-Z\.\' ]+$/,
				msg:"LastName can be only letters"
			}],
			emailId:
			{
				required:true,
				pattern: 'email'
			},
			phone:
			[{
				required:true,	 
			},
			{
				pattern:'number',
				msg:"Mobile No. should contain only digits "
			}],
			feedBackText:
			{
				required:false
			},
			feedBackRating:
			{
				required:true,
				msg:"Please give rating"
			}
		}
	});	
	return registrationItem;
});
