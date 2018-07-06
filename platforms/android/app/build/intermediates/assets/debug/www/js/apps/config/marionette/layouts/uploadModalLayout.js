define(["app","marionette","tpl!apps/common/uploadPicModalTemplate.tpl", "bootstrap","utils", "cameraplugin"], function(App,Marionette,DocModalTemplate,Bootstrap,Util,CameraPlugin){

	var uploadModalLayout = Backbone.Marionette.Layout.extend({
	  template: DocModalTemplate,
	  events:
	  {
		"click #camera-btn":"cameraClick",
		"click #gallery-btn":"galleryClick",
		"click #cancel-btn":"cancelClick"
	  },
	  cameraClick:function()
	  {	
		  console.log("capture photo");
		 
		 CameraPlugin.capturePhoto(Camera.PictureSourceType.CAMERA, App.CommunicatorModel.pathOfFile,App.CommunicatorModel.PicToBeSavedName+".jpg", function success(){
			 if(App.CommunicatorModel.fromScreen=="menu")
			 {
				 require(["apps/menu/menu_app"],function() {	
					App.trigger("menu:showMenu");
				 });
			 }
			 else if (App.CommunicatorModel.fromScreen=="documentWallet")
			 {
				 require(["apps/documentWallet/document_wallet_app"],function() {
					App.trigger("documentwallet:showDocumentWalletPhotoView");
				});
			 }
			 else{
				  require(["apps/policy/policy_app"],function() {	
					App.trigger("policy:policyHomeScreen",App.CommunicatorModel.fromScreen);
				 });
			 }
			 
		 });
		 
		  
	  },
	  galleryClick:function()
	  {
		  console.log("library photo");		   
		    CameraPlugin.capturePhoto(Camera.PictureSourceType.PHOTOLIBRARY, App.CommunicatorModel.pathOfFile,App.CommunicatorModel.PicToBeSavedName+".jpg", function success(){
			 if(App.CommunicatorModel.fromScreen=="menu")
			 {
				 require(["apps/menu/menu_app"],function() {	
					App.trigger("menu:showMenu");
				 });
			 }
			 else if (App.CommunicatorModel.fromScreen=="documentWallet")
			 {
				 require(["apps/documentWallet/document_wallet_app"],function() {
					App.trigger("documentwallet:showDocumentWalletPhotoView");
				});
			 }
			 else{
				  require(["apps/policy/policy_app"],function() {	
					App.trigger("policy:policyHomeScreen",App.CommunicatorModel.fromScreen);
				 });
			 }
			 
		 });
	  },
	  cancelClick:function()
	  {
		  console.log("Modal Closed Clicked");
	  }
	 
	  
	});

	return uploadModalLayout;

});