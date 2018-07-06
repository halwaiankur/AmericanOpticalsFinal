define(["app", "epoxy", "apps/dashBoard/main/myTripsModelLocalStorage"], function(App, epoxy, mycontactModelLocalStore) {
	var MyContactItem = Backbone.Epoxy.Model.extend({
		localStorage: mycontactModelLocalStore,  	
	});	
	return MyContactItem;
});