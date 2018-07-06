<%if(App.customerModel.get("zendrive_score") == null){%>
<div class="row MA-0 main-wrapper MT-50">
<div class="noDataErrorMsg">No Data Available</div>
</div>
<%}else{%>




	<div class="row MA-0 main-wrapper MT-50">
		<div class="row MA-0 stats-details">
			<div class="col-xs-12 PT-10">
			<%=FirstName %>
			</div>
			<div class="col-xs-12">
			<%=Phone %>
			</div>
		</div>
		<div class="row MA-0 stats-content-box pos-rel">
			<div class="row MA-0 stats-image">
				<img src="images/Balloons-01.png">
			</div>
			<div class="row MA-0 score-div">
				<div class="col-xs-12 font45 txtGreen" id="zendriveScoreDiv">
				<%=zendrive_score%>
				</div>
				<div class="col-xs-12 MT-15-neg font24" id="zendriveTextDiv" >
				
				</div>
				<div class="col-xs-12 txtPurple">
				Prodrive Average
				</div>
			</div>
			<div class="row MA-0 MT-10 info-div">
				<div class="col-xs-12 info-sec">
					<div class="disTbl PR-10">
						<div class="tooltip-icon"><i class="icon icon-infotip-01"></i></div>
					</div>
					<div class="disTbl text-left"><%=recommendation%></div>
				</div>
			</div>
			<div class="row MA-0 text-center BTB MT-10 stats-below">
				<div class="data-box ht BR" id="controlDiv">
					<div class="">
						<div class="stats-num"><%=control_score%></div>
						<div class="font20 MT-5-neg" id="controlText"></div>
						<div class="txtPurple">Control</div>
					</div>
				</div>
				<div class="data-box ht BR" id="cautiousDiv">
					<div class="">
						<div class="stats-num"><%=cautious_score%></div>
						<div class="font20 MT-5-neg" id="cautiousText"></div>
						<div class="txtPurple">Caution</div>
					</div>
				</div>
				<div class="data-box ht" id="focusedDiv">
					<div class="">
						<div class="stats-num"><%=focused_score%></div>
						<div class="font20 MT-5-neg" id="focusedText"></div>
						<div class="txtPurple">Focus</div>
					</div>	
				</div>
			</div>
			<div class="clearfix"></div>
		</div>
	</div>
<%}%>
