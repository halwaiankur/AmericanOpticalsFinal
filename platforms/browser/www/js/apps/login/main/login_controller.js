define(["app", "apps/login/main/loginSplashScreenView", "apps/login/main/loginRegisterScreenView", 
       "apps/login/main/loginOptionScreenView"], 
       function(App, LoginSplashScreenView, LoginRegisterScreenView, LoginOptionScreenView){
    return {
		/**
		* This is a description		
		* @method show
		* @return null
		* @Description This function loads the loginview
		*/
		splashScreen: function()
		{	 
			var loginSplashScreenView = new LoginSplashScreenView();
			App.mainRegion.show(loginSplashScreenView);
		},
		showRegisterScreen:function()
		{
			var loginRegisterScreenView = new LoginRegisterScreenView({model:App.customerModel});
			App.mainRegion.show(loginRegisterScreenView);
		},
        optionScreen:function()
        {
			
            var loginOptionScreenView = new LoginOptionScreenView();
			App.mainRegion.show(loginOptionScreenView);
        }
		
	}
});
