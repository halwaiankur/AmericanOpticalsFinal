define(["app","tpl!apps/login/main/templates/loginSplashScreenTpl.tpl","jqueryTouchSwipe","bootstrap","apps/dashBoard/main/myTripsModel","apps/common/constants"],
	function(App, LoginStartTpl,jqueryTouchSwipe,bootstrap,MyTripsModel){
    var loginitemView=  Marionette.ItemView.extend({
		template:LoginStartTpl,
		events:{
			'click .gotItBtn' : 'checkAvailabilityFunction',
			//'click .fa-angle-right' : 'clearData'
		},
		clearData : function()
		{
			localStorage.clear();
			console.log("cleared")
		},
		
		onShow : function(){
		var sliderWidth = $(".slider-content").innerWidth();
		$(".gotItBtn").css("width",sliderWidth);
		var ht = $(window).height();
		$(".main-background").css("min-height",ht);

		var sliderBoxHt = ht - 150;
		$(".slider-content").css("height",sliderBoxHt);
		var carouselTop = sliderBoxHt - 118;
		$(".main-wrapper .carousel-control").css("top",carouselTop); 

		$(".slider-title").css("height",$(".slider-title").css("height"));
		$(".slider-icon").css("height",$(".slider-icon").css("height"));
		$(".slider-text").css("height",$(".slider-text").css("height"));
		$(".recommend-text").css("height",$(".recommend-text").css("height"));
		
		$('.carousel').carousel({
			interval: false
		});
		$(".carousel-inner").swipe( {
			//Generic swipe handler for all directions
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next'); 
			},
			swipeRight: function() {
				$(this).parent().carousel('prev'); 
			},
			//Default is 75px, set to 0 for demo so any distance triggers swipe
			threshold:0
		});
		},
		checkAvailabilityFunction : function()
		{
            App.trigger("login:optionScreen");
			//App.trigger("dashBoard:Drive");
			/*var thisObj = this;
			App.customerModel.set("id","Reg");
			App.customerModel.fetch();
			if(localStorage.getItem("customerDetails-Reg") == null)
			{
				App.trigger("login:registerScreen");
			}
			else
			{
				
				thisObj.fetchDriverDetails(App.customerModel.get("FirstName"));
				App.trigger("dashBoard:Drive");
				//thisObj.storeDriverData(thisObj,App.customerModel.get("FirstName"),JSON.parse(driversData));
			}*/
			
		},
		fetchDriverDetails : function(driverId)
		{
			var thisObj = this;
			$.ajax({
				url: "https://api.zendrive.com/v2/drivers?apikey=VIexxtODLu3DK5N5ZD1ofhIkfcV2I909&limit=50",
				type: "GET",
				dataType: 'json',
				timeout: 50000,
				//data: data,
				contentType :"application/json",		
				success:function(result){
					console.log(JSON.stringify(result));
					localStorage.clear();
					thisObj.storeDriverData(thisObj,driverId,result);
				},
				error: function(result){
					console.log(JSON.stringify(result));
				}
			});
		},
		storeDriverData : function(thisObj,driverId,driversDataJSON)
		{
			var flag = false;
			for(var i=0 ; i<driversDataJSON.drivers.length ; i++)
			{
				if(driversDataJSON.drivers[i].driver_id == driverId)
				{
					App.customerModel.set({
						"distance_km":driversDataJSON.drivers[i].info.distance_km,
						"FirstName":driversDataJSON.drivers[i].info.attributes.FirstName,
						"LastName":driversDataJSON.drivers[i].info.attributes.LastName,
						"Phone":driversDataJSON.drivers[i].info.attributes.Phone,
						"Email":driversDataJSON.drivers[i].info.attributes.Email,
						"drive_time_hours":driversDataJSON.drivers[i].info.drive_time_hours,
						"driver_start_date":driversDataJSON.drivers[i].info.driver_start_date,
						"num_trips":driversDataJSON.drivers[i].info.num_trips,
						"rank":driversDataJSON.drivers[i].rank,
						"recommendation":driversDataJSON.drivers[i].recommendation,
						"cautious_score":driversDataJSON.drivers[i].score.cautious_score,
						"control_score":driversDataJSON.drivers[i].score.control_score,
						"focused_score":driversDataJSON.drivers[i].score.focused_score,
						"fuel_efficiency_score":driversDataJSON.drivers[i].score.fuel_efficiency_score,
						"zendrive_score":driversDataJSON.drivers[i].score.zendrive_score
					});
					App.customerModel.save();
					flag=true;
				}
				if(i == (driversDataJSON.drivers.length-1))
				{
					if(flag == false)
					{
						
						//App.trigger("dashBoard:Drive");
					}
					else
					{
						thisObj.fetchLatestTripDetails(thisObj,driverId);
					}
				}
			}
		},
		fetchLatestTripDetails : function(thisObj,driverId)
		{
			var urlToSend = "https://api.zendrive.com/v2/driver/"+driverId+"/trips?apikey=VIexxtODLu3DK5N5ZD1ofhIkfcV2I909&limit=50&order_by=start_time&order_type=desc&start_date=2016-01-01&end_date=2016-02-29";
			console.log(urlToSend);
				$.ajax({
				url: urlToSend,
				type: "GET",
				dataType: 'json',
				timeout: 50000,
				contentType :"application/json",		
				success:function(result){
					console.log(JSON.stringify(result));
					thisObj.storeTripData(thisObj,driverId,result);
				},
		
				error: function(result){
					//ActivityIndicator.hide();
					//alert("Please check connectivity !")
					console.log(JSON.stringify(result));
				}
			});
		},
		storeTripData : function(thisObj,driverId,tripDataJSON)
		{
			for(var i = 0 ; i < tripDataJSON.trips.length ; i++)
			{
				tripDataJSON.trips[i].info.distance_mi = thisObj.convertToMiles(tripDataJSON.trips[i].info.distance_km);
				var myTripsModel = new MyTripsModel({});
				myTripsModel.set({"info":tripDataJSON.trips[i].info});
				myTripsModel.set({"score":tripDataJSON.trips[i].score});
				myTripsModel.set({"id":tripDataJSON.trips[i].trip_id});
				myTripsModel.set({"dateOfTrip":thisObj.convertTimeStampToDateString(tripDataJSON.trips[i].trip_id)});
				myTripsModel.save();
				if(i == (tripDataJSON.trips.length-1))
				{
					ActivityIndicator.hide();
					//App.trigger("dashBoard:Drive");
				}
			}
		},
		convertToMiles:function(distanceInKms)
		{
			var temp1 = distanceInKms*0.621371;
			var temp2 = temp1.toFixed(2);
			return temp2;
		},
		convertTimeStampToDateString : function(timeStamp)
		{
			var month = new Array();
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";

			var d = new Date(timeStamp);

			var timeString = d.getHours() + " : " + d.getMinutes();
			var hours = d.getHours();
		  	var minutes = d.getMinutes();
		  	var ampm = hours >= 12 ? 'pm' : 'am';
		  	hours = hours % 12;
		  	hours = hours ? hours : 12; // the hour '0' should be '12'
		  	minutes = minutes < 10 ? '0'+minutes : minutes;
		  	var timeString = hours + ':' + minutes + ' ' + ampm;

			var month = month[d.getMonth()];
			var date = d.getDate();
			var year = d.getFullYear();
			var dateString = month + " " + date + ", " + year;

			return dateString + "  |  "+ timeString;
		},
		convertTimeStampToTimeString : function(timeStamp)
		{
			var month = new Array();
			month[0] = "Jan";
			month[1] = "Feb";
			month[2] = "Mar";
			month[3] = "Apr";
			month[4] = "May";
			month[5] = "Jun";
			month[6] = "Jul";
			month[7] = "Aug";
			month[8] = "Sep";
			month[9] = "Oct";
			month[10] = "Nov";
			month[11] = "Dec";

			var d = new Date(timeStamp);
			

			var timeString = d.getHours() + " : " + d.getMinutes();
			var hours = d.getHours();
		  	var minutes = d.getMinutes();
		  	var ampm = hours >= 12 ? 'pm' : 'am';
		  	hours = hours % 12;
		  	hours = hours ? hours : 12; // the hour '0' should be '12'
		  	minutes = minutes < 10 ? '0'+minutes : minutes;
		  	var timeString = hours + ':' + minutes + ' ' + ampm;


			return timeString;
		}

		
	
		
		
    }); 
    return loginitemView;
});
