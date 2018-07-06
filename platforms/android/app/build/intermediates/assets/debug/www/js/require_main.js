requirejs.config({
    baseUrl: "./js",
	waitSeconds: 200,
    paths: {
		backbone: "vendor/backbone",
		tpl: "vendor/tpl",
		underscore: "vendor/underscore",
		jquery: "vendor/jquery-2.1.4",
		marionette: "vendor/backbone.marionette",
		validator: "vendor/backbone-validation",
		epoxy:"vendor/backbone.epoxy",
		baseItemView:"apps/config/mixins/baseItemView",
		"backbone.nested":"vendor/backbone.nested",
		localstorage: "vendor/backbone.localstorage",
		ajaxHandler: "apps/utilities/ajaxHandlerServices",
		utils:"apps/utilities/utils",
		cordova:"../cordova",
		bootstrap:"vendor/bootstrap",
		json2: "vendor/json2.min",
		jqueryTouchSwipe:"vendor/jquery.touchSwipe"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["jquery", "underscore", "json2"],
			exports: "Backbone"
		},
		"backbone.nested": ["backbone"],
		epoxy:{
			deps:["backbone","backbone.nested"],
			exports:"Epoxy"
		},
		 marionette: {
			deps: ["backbone"],
			exports: "Marionette"
		},
		validator: {
				deps: ["backbone"],
				exports: "Validator"
			},
		localstorage: ["backbone"],
		bootstrap:{
			deps:["jquery"],
			exports: "$.fn.popover"
		},
		jqueryTouchSwipe:{
			deps:["jquery"]
		}
	}
});

require(["app","cordova", "validator"],function (App) 
{ 
	document.addEventListener("deviceready",onDeviceReady,false);
    
	function onDeviceReady() {
		_.extend(Backbone.Model.prototype, Backbone.Validation.mixin);
	
		console.log("Device ready called");
		App.start();
	}
});