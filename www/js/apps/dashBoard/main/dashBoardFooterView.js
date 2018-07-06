define(["app","tpl!apps/dashBoard/main/templates/dashBoardFooterTpl.tpl","jqueryTouchSwipe","bootstrap"],function(App, LoginStartTpl){
    var loginitemView=  Marionette.ItemView.extend({
		template:LoginStartTpl,
		events:{
			'click #drive' : 'driveScreen',
			'click #mytrips':'myTripsScreen',
			'click #stats':'statsScreen'
		},
		
		onShow : function(){
			var ht = $(window).height();
			$(".main-background").css("min-height",ht);	
			var tabsWidth = ($(window).width())/3;
			$(".main-wrapper .nav li").css("min-width",tabsWidth);
		
		},
		driveScreen : function()
		{
			App.trigger("dashBoard:Drive");
		},
		myTripsScreen : function()
		{
			App.trigger("dashBoard:myTrips");
		},
		statsScreen : function()
		{
			App.trigger("dashBoard:stats");
		}
		
	
		
		
    }); 
    return loginitemView;
});
