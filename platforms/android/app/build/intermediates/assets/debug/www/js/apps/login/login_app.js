/*****
This is the main "App file" for the module. It defines the public API and event-handlers this module is ready
to handle. It manages all sub-controllers
*****/
define(["app", "apps/login/main/login_controller"], function(App, LoginController){
 
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
			App.on("login:registerScreen",function()
			{
				LoginController.showRegisterScreen(); 
			});
            App.on("login:optionScreen",function()
			{
				LoginController.optionScreen(); 
			});
			LoginController.splashScreen();
		}
	}
});
