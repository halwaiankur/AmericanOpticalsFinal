define(["app","apps/dashBoard/main/dashBoardHeaderModel","apps/dashBoard/main/dashBoardHeaderView","apps/dashBoard/main/dashBoardFooterView", "apps/dashBoard/main/dashBoardDriveScreenView","apps/dashBoard/main/myTripsCollection", "apps/dashBoard/main/dashBoardmyTripsCompositeView","apps/dashBoard/main/dashBoardStatsScreenView","apps/dashBoard/main/myTripsEpoxyModel"],
 function(App, DashBoardHeaderModel, DashBoardHeaderView, DashBoardFooterView ,DashBoardDriveScreenView, MyTripsCollection,DashBoardMyTripsCollectionView, DashBoardStatsScreenView, MyTripsEpoxyModel){
    return {
		/**
		* This is a description		
		* @method show
		* @return null
		* @Description This function loads the loginview
		*/
		showDriveScreen:function()
		{
			var dashBoardHeaderModel = new DashBoardHeaderModel();
			dashBoardHeaderModel.set("headerName","DRIVE");
			var dashBoardHeaderView = new DashBoardHeaderView({model:dashBoardHeaderModel});
			App.headerRegion.show(dashBoardHeaderView);
			var dashBoardDriveScreenView = new DashBoardDriveScreenView();
			App.mainRegion.show(dashBoardDriveScreenView);
			var dashBoardFooterView = new DashBoardFooterView();
			App.footerRegion.show(dashBoardFooterView);
		},
		showMyTripsScreen:function()
		{
			var dashBoardHeaderModel = new DashBoardHeaderModel();
			dashBoardHeaderModel.set("headerName","MY TRIPS");
			//var dashBoardHeaderView = new DashBoardHeaderView({model:dashBoardHeaderModel});
			//App.headerRegion.show(dashBoardHeaderView);
			/*var dashBoardFooterView = new DashBoardFooterView();
			App.footerRegion.show(dashBoardFooterView);*/

           	var myTripsCollection = new MyTripsCollection();	
			myTripsCollection.fetch();
			//console.log(myTripsCollection)
			var dashBoardMyTripsCollectionView = new DashBoardMyTripsCollectionView({collection: myTripsCollection});
			App.mainRegion.show(dashBoardMyTripsCollectionView);
		},
		showStatsScreen:function()
		{
			var dashBoardHeaderModel = new DashBoardHeaderModel();
			dashBoardHeaderModel.set("headerName","STATS");
			var dashBoardHeaderView = new DashBoardHeaderView({model:dashBoardHeaderModel});
			App.headerRegion.show(dashBoardHeaderView);
			/*var dashBoardFooterView = new DashBoardFooterView();
			App.footerRegion.show(dashBoardFooterView);*/
			var objectOfUserData = JSON.parse(localStorage.getItem("customerDetail"));
			var myTripsEpoxyModel = new MyTripsEpoxyModel(objectOfUserData);
			var dashBoardStatsScreenView = new DashBoardStatsScreenView({model : App.customerModel});
			App.mainRegion.show(dashBoardStatsScreenView);
		}
		
	}
});
