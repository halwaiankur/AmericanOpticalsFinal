define(["app", "apps/dashBoard/main/myTripsRowView", "tpl!apps/dashBoard/main/templates/dashBoardmyTripsCompositeTpl.tpl"],
function(App, MyContactItemView, ContactRowTemplate) {
	var MyContactCompositeView = Backbone.Marionette.CompositeView.extend({  
		itemView: MyContactItemView,
		template: ContactRowTemplate,
		itemViewContainer: '.list-item',
		events: {
			'click  #cholaSupport': 'cholaSupport',
			'click #addNewContact': 'addContact',
			'click #goBackToOptions':'goBackToOptionsFn'
		},
		onShow : function(){
			var ht = $(window).height();
			var tabsWidth = ($(window).width())/3;
			
			$(".main-background").css("min-height",ht);
			
			$(".main-wrapper .nav-pills > li").css("min-width",tabsWidth);


			var lastScrollTop = 0;
			$(window).scroll(function(event){
			   var st = $(this).scrollTop();
			   console.log("scroll "+st);
			   if (st > lastScrollTop){
				   // downscroll code
				   $(".header-text").css("background","#ddd");
			   } else if(st == 0){
				  // upscroll code
				  
				  $(".header-text").css("background","transparent");
			   }
			   lastScrollTop = st;
			});
			App.CommunicatorModel.idForMyTrips ==0;
		},
		
	    /**
		* This is a description		
		* @method addContact
		* @return null
		* @Description This function triggers the show Add Contact Screen
		*/
		addContact:function() {
			App.trigger("mycontact:addcontactScreen");
		},
		
		/**
		* This is a description		
		* @method cholaSupport
		* @return null
		* @Description This function triggers the show Chola Care Screen
		*/
		cholaSupport:function() {
			console.log('inside cholacare');
			App.trigger("mycontact:CholacontactScreen");
		},
		goBackToOptionsFn:function()
		{
			App.trigger("login:optionScreen");
		}
	});  
	return MyContactCompositeView;
});
