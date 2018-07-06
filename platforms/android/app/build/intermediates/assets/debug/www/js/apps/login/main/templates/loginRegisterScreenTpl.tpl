	<div class="row MA-0 main-wrapper PA-15 ">
				<div class="row MA-0">
					<div class="col-xs-12 PA-15">
    					<span class="col-xs-6"><img class="center-block prodriveIcon" src="images/Ao Left.png">
						</span>
    					<span class="col-xs-6"><img class="center-block prodriveIcon" src="images/Ao Right.png">
						</span>
					</div>
				</div>
				<div class="row MA-0 center-block">
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<input id="firstName" class="form-control" type="text" placeholder="First Name" data-bind="value:firstName, events:['keyup']">
						</div>
					</div>
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<input id="lastName" class="form-control" type="text" placeholder="Last Name" data-bind="value:lastName, events:['keyup']">
						</div>
					</div>
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<input id="mobileNumber" class="form-control" type="tel" placeholder="Mobile #" maxlength=10 data-bind="value:phone, events:['keyup']">
						</div>
					</div>
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<input id="emailId" class="form-control" type="text" placeholder="Email" data-bind="value:emailId, events:['keyup']">
						</div>
					</div>
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<input id="feedBackText" class="form-control" type="text" placeholder="Feed Back" data-bind="value:feedBackText, events:['keyup']">
						</div>
					</div>
					<div class="col-xs-12 MT-10">
						<div class="form-group">
							<select id="feedBackRating" class="form-control" data-bind="value:feedBackRating, events:['keyup']">
							<option value="">Rating</option>
							<option value=1>Bad</option>
							<option value=2>Acceptable</option>
							<option value=3>Neutral</option>
							<option value=4>Good</option>
							<option value=5>Excellent</option>
							</select>
						</div>
					</div>
					<div class="col-xs-12 text-center MT-40">
						<div class="form-group">
							<button id="registerBtn" class="btn btn-warning">Register</button>
						</div>
						<div class="form-group">
							<button id="cancelBtn" class="btn btn-warning">Cancel</button>
						</div>
					</div>
				</div>
			</div>