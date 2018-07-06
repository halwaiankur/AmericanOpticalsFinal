define(["app", "marionette", "tpl!apps/common/showPicModalTemplate.tpl", "bootstrap", "utils", "cameraplugin"], function(App, Marionette, showPicModalTemplate, Bootstrap, Utils, CameraPlugin) {
	var uploadModalLayout = Backbone.Marionette.Layout.extend({
		template: showPicModalTemplate,
		events: {
			"click #deletePhoto": "deleteClick",
			"click #cancel-btn": "cancelClick",
			"click #shareOnFacebook": "shareImage"
		},
		  
		onShow:function() {
			$('#imgView').attr('src', App.CommunicatorModel.clickedPicSrc);
			$('#imgView').attr('fileName', App.CommunicatorModel.clickedPicName);
			
			var directoryPath = App.CommunicatorModel.subDirectoryPath;
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotDir, null);
			function gotDir(fileSystem) {
				console.log("Inside gotDir");
				var dirs = directoryPath.split("/").reverse();
				var fileRoot = fileSystem.root;

				var checkDir = function(dir){
					console.log("create dir " + dir);
					fileRoot.getDirectory(dir, {
						create : false,
						exclusive : false
					}, gotDirEntry, null);
				};
					
				var gotDirEntry = function(dirEntry) {
					fileRoot = dirEntry;
					console.log("Dir " + dirs.length);
					if(dirs.length > 0)
					{
						checkDir(dirs.pop());
					}
					else
					{
						var imageName =App.CommunicatorModel.clickedPicName;
						console.log("imagename in function "+ imageName);
						console.log("Dir 0:" + imageName);
						dirEntry.getFile(imageName,{create: false, exclusive: false}, fileEntryFound, null);
					}
				};
				var fileEntryFound = function(fileEntry){
					console.log("Into fileEntryFound...");
					var fullpath=fileEntry.toURL()
					console.log("Full Path :"+fileEntry.fullPath);
					Utils.hideLoader();
					console.log("fullpath :" + fullpath);
					cordova.exec(function(winParam) {}, function(error) {}, "FileOpener", "openFile", [fullpath]);
				};
				checkDir(dirs.pop());
			}
				
			console.log("File path is :: " + directoryPath );
			var fullpath = directoryPath + "/" + App.CommunicatorModel.clickedPicName;
			cordova.exec(function(winParam) {}, function(error) {}, "FileOpener", "openFile", [fullpath]);
		},
		
		deleteClick:function() {
			console.log("delete file called");
			var deletePhoto;
			var thisObject=this;
			deletePhoto=thisObject.confirmPhotoDelete();
			if(deletePhoto==true) {
				var allParents = $('#imgView').parents('#bigViewImg');
				console.log("Modal : Sent Image Name :: " + App.CommunicatorModel.clickedPicName);
			
				CameraPlugin.deletePhoto(App.CommunicatorModel.subDirectoryPath + "/" + App.CommunicatorModel.clickedPicName, function success(){	
					$('#bigViewImg').modal('hide');
					$('body').removeClass('modal-open');
					$('.modal-backdrop').remove();
					App.trigger("documentwallet:showDocumentWalletPhotoView");					
				});
			} else {
				console.log("delete file cancelled");
			}
		},
		  
		confirmPhotoDelete:function() {
			var confirmed;
			var thisObject=this;
			var r = confirm("Do you want to delete ? ");
			if (r == true) {
				confirmed=true;
			} else {
				confirmed=false;
			}
			console.log("confirmPhotoDelete  :"+confirmed);
			return confirmed;
		},
		  
		cancelClick:function() {
			console.log("Modal Closed Clicked");
		},
		
		shareImage: function() {
			var message = "Travel Insurance On The Go";
			if(facebookAccessToken) {
				console.log("if facebookAccessToken");
				Utils.postImageToFacebook(facebookAccessToken, App.CommunicatorModel.clickedPicSrc, message);
			} else {
				console.log("else facebookAccessToken");
				/*FB.getLoginStatus(function(response){
					console.log("Success");
					console.log(JSON.stringify(response));
					facebookAccessToken = response.authResponse.accessToken;
					
				}, function(response){
					console.log("Error");
					console.log(JSON.stringify(response));
				});*/
				var facebookLogin = function() {
					FB.login(function(response) {
						if (response.status && response.status=="connected") {
							//get the userid
							var userId=response.authResponse.userId;
							facebookAccessToken = response.authResponse.accessToken;
							Utils.postImageToFacebook(facebookAccessToken, App.CommunicatorModel.clickedPicSrc, message);
						}
						else {
							alert('Unable to connect/authenticate using facebook. If you are offline, please click on the "Forgot Pin" tab below to re-register and access using a PIN');
						}
					}, { scope: 'email' }, function(){ alert('failed to invoke Fb'); });
				};

				FB.init({ appId: facebookAppId, nativeInterface: CDV.FB, useCachedDialogs: false },facebookLogin);
				Utils.hideLoader();
			}
		}
	});
	return uploadModalLayout;
});