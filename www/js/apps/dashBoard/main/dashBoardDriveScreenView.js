define(["app","tpl!apps/dashBoard/main/templates/dashBoardDriveScreenTpl.tpl","jqueryTouchSwipe","bootstrap"],function(App, LoginStartTpl){
    var loginitemView=  Marionette.ItemView.extend({
        template:LoginStartTpl,
        events:{
            'click .main-button' : 'buttonClicked',
        },
        
        onShow : function(){
            var ht = $(window).height();    
            $(".main-background").css("min-height",ht);
            var metrixBlockHt = ht/2 - 130;
            var tabsWidth = ($(window).width() - 4)/3;
            $(".metrix-block").css("margin-top",metrixBlockHt);
            $("li").css("width",tabsWidth);
            
            /*$(".inner-circle").click(function(){
                $(this).toggleClass("active");
            });
            $(".main-button").click(function(){
                $(".main-button").toggleClass("startAnim");
            });*/
            if(App.CommunicatorModel.tracking != null)
            {
                $(".inner-circle").addClass("active");
                $(".main-button").addClass("startAnim");
            }
        },
        buttonClicked : function()
        {
            var thisObj = this;
            if(App.CommunicatorModel.tracking == null)
            {
                thisObj.activityStart();
            }
            else
            {
                thisObj.activityStop();
            }
            
        },
        activityStart : function()
        {
            var thisObj = this;
            ActivityIndicator.show(null);
            console.log("Driver Id : "+App.customerModel.get("driverId"));
            var config = new Zendrive.ZendriveConfiguration(applicationKey, App.customerModel.get("driverId"));
            var driverAttributes = new Zendrive.ZendriveDriverAttributes();
            driverAttributes.firstName = App.customerModel.get("FirstName");
            driverAttributes.lastName = App.customerModel.get("LastName");
            driverAttributes.email = App.customerModel.get("Email");
            driverAttributes.group = App.customerModel.get("Group");
            driverAttributes.phoneNumber = App.customerModel.get("Phone");
            driverAttributes.driverStartDate = 1451606400;
            console.log("driverAttributes : "+JSON.stringify(driverAttributes));
            config.driverAttributes = driverAttributes;
            config.driveDetectionMode = Zendrive.ZendriveDriveDetectionMode.ZendriveDriveDetectionModeAutoON;

            Zendrive.setup(config, new Zendrive.ZendriveCallback(processStartOfDrive,
                processEndOfDrive, processLocationDenied), function() {
                App.CommunicatorModel.tracking = "tracking";
                App.CommunicatorModel.integerForSeconds = 0;
                $(".inner-circle").addClass("active");
                $(".main-button").addClass("startAnim");
                thisObj.callStartDrive(thisObj);
            },
            function (error) {
                ActivityIndicator.hide();
                console.log("Setup failed: " + error);
                alert("Setup failed: " + error +" Please check connectivity");
            });


                 function processStartOfDrive(zendriveDriveStartInfo) {
                console.log("processStartOfDrive: " + JSON.stringify(zendriveDriveStartInfo));
            }

            function processEndOfDrive(zendriveDriveInfo) {
                function convertIntoMiles(distInKms)
                    {
                        var temp1 = distInKms*0.621371;
                        var temp2 = temp1.toFixed(1);
                        return temp2;
                    }
                $("#timeLapsed").text(convertIntoMiles(zendriveDriveInfo.distance)+" mi");
                $(".inner-circle").removeClass("active");
                $(".main-button").removeClass("startAnim");
                console.log("processEndOfDrive: " + JSON.stringify(zendriveDriveInfo));          
            }

            function processLocationDenied() {
                alert("Location denied, please enable location services to keep Zendrive working");
            }

        },
        activityStop: function()
        {
            window.clearInterval(App.CommunicatorModel.variableForClock);
            delete App.CommunicatorModel.tracking;
            Zendrive.stopDrive(App.CommunicatorModel.trackingId);
            App.CommunicatorModel.trackingId = null;
        },
        callStartDrive:function(thisObj){
            App.CommunicatorModel.trackingId = generateDriveTrackingId();
            Zendrive.startDrive(App.CommunicatorModel.trackingId);
            App.CommunicatorModel.variableForClock=self.setInterval(function(){thisObj.clock()},1000);
            ActivityIndicator.hide();

              function generateDriveTrackingId(){
                var d = new Date();
                var n = d.getTime();
                return n.toString();
            }


        },
        clock:function()
        {
            var min1 = Math.floor( App.CommunicatorModel.integerForSeconds/60);
            var sec1=   App.CommunicatorModel.integerForSeconds-min1*60;
            min1 = (min1 < 10) ? ("0"+min1) : min1;
            sec1= (sec1 < 10) ? ("0"+sec1) : sec1;
            $(".BB").text(min1+":"+sec1);
            App.CommunicatorModel.integerForSeconds =  App.CommunicatorModel.integerForSeconds + 1;
        }
        
    
        
        
    }); 
    return loginitemView;
});
