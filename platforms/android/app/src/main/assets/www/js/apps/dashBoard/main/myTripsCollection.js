define(["app", "apps/dashBoard/main/myTripsModelLocalStorage", "apps/dashBoard/main/myTripsModel"], 
function(App, mycontactModelLocalStore, MyContactListModel) {
	var MyContactCollection = Backbone.Collection.extend({
		localStorage: mycontactModelLocalStore,  
        /* set model type which is without epoxy used for this collection */
        model: MyContactListModel,
	});
	return MyContactCollection;
});