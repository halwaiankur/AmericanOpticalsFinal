define(["app","tpl!apps/dashBoard/main/templates/dashBoardHeaderTpl.tpl","jqueryTouchSwipe","bootstrap"],function(App, LoginStartTpl){
    var loginitemView=  Marionette.ItemView.extend({
		template:LoginStartTpl,
		events:{
			
		}
		
	
	
		
		
    }); 
    return loginitemView;
});
