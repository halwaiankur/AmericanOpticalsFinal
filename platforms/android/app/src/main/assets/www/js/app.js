define(["marionette"/*, "apps/config/marionette/regions/dialog"*/],function(Marionette){
	var App = new Marionette.Application();
	
	App.addRegions({
		headerRegion: "#header-Region",
		mainRegion: "#main-Region",
		footerRegion: "#footer-Region"
	});

	require(["apps/common/customerModel"], function(CustomerModel) {
		App.customerModel = new CustomerModel();
	});
	
	App.CommunicatorModel={};
	window.App=App;
	
	/** Global Event Handlers to take care off**/
	App.on("initialize:after", function() { 
		console.log("App start");
		/*** Start the Modules we need. Start the Menu App**/
		require(["apps/common/constants","apps/login/login_app","apps/dashBoard/dashBoard_app"],function(Constant,Login,DashBoard) { 
			Login.start();
			DashBoard.start();
		});
	});     
	return App;
});
