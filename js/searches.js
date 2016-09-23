MP.api.segment('Search', {from: moment().subtract(30, 'days'), unit: 'day'}).done(function(transferResults) {
	//chart monthly transfer date
    var transferData = transferResults.values()
	//update the transfer header pannel
	var today = moment().format('YYYY-MM-DD')
	var todaysLoans = transferData['Search'][today]
  console.log("loans header", todaysLoans);
	$('#dau-header').text(addCommas(todaysLoans));
});

MP.api.segment('View Doctor', {from: moment().subtract(30, 'days'), unit: 'day'}).done(function(transferResults) {
	//chart monthly transfer date
    var transferData = transferResults.values()
	//update the transfer header pannel
	var today = moment().format('YYYY-MM-DD')
	var todaysLoans = transferData['View Doctor'][today]
  console.log("loans header", todaysLoans);
	$('#revenue-header').text(addCommas(todaysLoans));
});
// MP.api.segment('Search', {from: moment().subtract(30, 'days'), unit: 'month', 'on': 'properties["mp_country_code"]'}).done(function(results) {
// 	//chart monthly transfer date
//   var cityData = results.sum().values()
//   console.log("city data", cityData)
//   $('#searches-map-header').show()
//   var searchesMap = $('#searches-map').MPChart({chartType: 'map', highchartsOptions: {  // Create a line chart
//     legend: {
//       enabled: false,
//       y:-7
//     },
//   }});
//   searchesMap.MPChart('setData', cityData); // Set the chart's data
// });
