define(["app", "localstorage"], function(App, Localstorage) {
	var mycontactModelLocalStore;
	if(!Localstorage.mycontactModelLocalStore) {
		mycontactModelLocalStore=new Store("visitorDetails");
		Localstorage.mycontactModelLocalStore = mycontactModelLocalStore;
	} else {
		mycontactModelLocalStore=Localstorage.mycontactModelLocalStore;
	}
	return mycontactModelLocalStore;
});