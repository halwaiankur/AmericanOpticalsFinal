define(["app", "tpl!apps/dashBoard/main/templates/myTripsRowTpl.tpl"], function(App, MyContactsCollectionTpl) {
    var MyContactListingView =  Marionette.ItemView.extend({
		template: MyContactsCollectionTpl,
		events: {
			"click #goContactDetails": "showContactDetails"
		},
		
		onShow:function()
		{
			console.log(JSON.stringify(this.model))
		}
	});
	return MyContactListingView;
});