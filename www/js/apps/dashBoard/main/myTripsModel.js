define(["app", "apps/dashBoard/main/myTripsModelLocalStorage"], function(App, mycontactModelLocalStore) {
	var ListModel =  Backbone.Model.extend({
		localStorage: mycontactModelLocalStore, 
	});
	return ListModel;
});