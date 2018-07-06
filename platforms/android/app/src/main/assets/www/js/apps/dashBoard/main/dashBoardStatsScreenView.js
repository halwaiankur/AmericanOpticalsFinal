define(["app","tpl!apps/dashBoard/main/templates/dashBoardStatsScreenTpl.tpl","jqueryTouchSwipe","bootstrap"],function(App, LoginStartTpl){
    var loginitemView=  Marionette.ItemView.extend({
		template:LoginStartTpl,		
		events:{
			'click .gotItBtn' : 'nextScreen',
			'click #Register':'Register'
		},
		
		onShow : function(){
			var ht = $(window).height();
			$(".main-background").css("min-height",ht);
			var imageWidth = ($(".stats-content-box").width())+ 24;
			var imageHeight = imageWidth - 111;
			$(".stats-image img").css("width",imageWidth);
			$(".stats-image img").css("height",imageHeight);
			var statsBoxHt = ht - 200;
			$(".stats-content-box").css("height",statsBoxHt);

			$(".score-div").css("margin-top",imageHeight - 144);

			var scoreJSON = this.options.model.get("score");
			//Zendrive Score
			if(this.model.get("zendrive_score")<70)
			{
				$("#zendriveScoreDiv").addClass("txtOrange");
				$("#zendriveTextDiv").addClass("txtOrange");
				$("#zendriveTextDiv").text("OK");
			}
			else if(this.model.get("zendrive_score")<80)
			{
				$("#zendriveScoreDiv").addClass("txtYellow");
				$("#zendriveTextDiv").addClass("txtYellow");
				$("#zendriveTextDiv").text("Fair");
			}
			else
			{
				$("#zendriveScoreDiv").addClass("txtGreen");
				$("#zendriveTextDiv").addClass("txtGreen");
				$("#zendriveTextDiv").text("Good");
			}

			//Control
			if(this.model.get("control_score")<70)
			{
				$("#controlDiv").addClass("txtOrange");
				$("#controlText").text("OK");
			}
			else if(this.model.get("control_score")<80)
			{
				$("#controlDiv").addClass("txtYellow");
				$("#controlText").text("Fair");
			}
			else
			{
				$("#controlDiv").addClass("txtGreen");
				$("#controlText").text("Good");
			}


			//Caution
			if(this.model.get("cautious_score")<70)
			{
				$("#cautiousDiv").addClass("txtOrange");
				$("#cautiousText").text("OK");
			}
			else if(this.model.get("cautious_score")<80)
			{
				$("#cautiousDiv").addClass("txtYellow");
				$("#cautiousText").text("Fair");
			}
			else
			{
				$("#cautiousDiv").addClass("txtGreen");
				$("#cautiousText").text("Good");
			}

			//Focus
			if(this.model.get("focused_score")<70)
			{
				$("#focusedDiv").addClass("txtOrange");
				$("#focusedText").text("OK");
			}
			else if(this.model.get("focused_score")<80)
			{
				$("#focusedDiv").addClass("txtYellow");
				$("#focusedText").text("Fair");
			}
			else
			{
				$("#focusedDiv").addClass("txtGreen");
				$("#focusedText").text("Good");
			}

			
			




		},
		
		nextScreen : function()
		{
			App.trigger("login:registerScreen");
		}
		
	
		
		
    }); 
    return loginitemView;
});
