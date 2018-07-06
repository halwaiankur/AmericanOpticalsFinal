/*****
This is the main "App file" for the module. It defines the public API and event-handlers this module is ready
to handle. It manages all sub-controllers
*****/
define(["app", "apps/dashBoard/main/dashBoard_controller"], function(App, dashBoardController){
 
/*** Which events it handles from the main object**/
/****This is a menu component, so it needs to listen to navigation events**/
 /** The main API Object**/
	return {
		/** Our main application will call the onStart Method Automatically**/
		/**
		* This is a description		
		* @method start
		* @return null
		* @Description This function handles all the events triggered by the login views by calling the respective controller functions
		*/	
		start: function() 
		{
			App.on("dashBoard:Drive",function()
			{
				dashBoardController.showDriveScreen(); 
			});	
			App.on("dashBoard:myTrips",function()
			{
				dashBoardController.showMyTripsScreen(); 
			});	
			App.on("dashBoard:stats",function()
			{
				dashBoardController.showStatsScreen(); 
			});
		}
	}
});
