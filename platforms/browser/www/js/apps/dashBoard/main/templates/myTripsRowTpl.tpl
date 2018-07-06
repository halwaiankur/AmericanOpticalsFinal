<%
  $("#trip").addClass("txtOrange");
  function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}
var dateRep = formatDate(new Date(registeredDate))

%>

<div class="row MA-0 trip-list">
	<div class="col-xs-2 center-block trip-icon">
		<% if(feedBackRating<3){ %>
		<img src="images/Bronzemedal.png">
		<%}else if(feedBackRating<5){%>
		<img src="images/Silvermedal.png">
		<%}else {%>
		<img src="images/Goldmedal.png">
		<%}%>
	</div>
	<div class="col-xs-10 PA-0">
		<span class="pull-left">
			<div class="font-bold">
				<span ><%=firstName%></span><span ><%=lastName%></span>
			</div>
			<div class="semi-bold">
				Visited On: <span ><%=dateRep%> </span>
			</div>
		</span>
	</div>
	<div>
		Feedback: <%=feedBackText%>
	</div>
</div>