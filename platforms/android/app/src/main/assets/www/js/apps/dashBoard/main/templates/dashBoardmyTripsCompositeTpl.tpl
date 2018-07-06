<%if(localStorage.getItem('visitorDetails') == null || localStorage.getItem('visitorDetails') == "" || localStorage.getItem('visitorDetails') == 'undefined') {  %>
	<div class="row MA-0 main-wrapper MT-50">
		<div class="noDataErrorMsg list-item">No Data Available</div>
	</div>
<% } else { %>


<div class="list-item main-wrapper MT-50 MB-50">

</div>

<% } %>	
<div class="row MA-0 center-block">
	<div class="col-xs-12 text-center MT-40">
		<div class="form-group">
			<button id="goBackToOptions" class="btn btn-warning registerBtn">Go Back</button>
		</div>
	</div>
</div>
