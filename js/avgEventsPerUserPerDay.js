//graph out the average number of events that users are sending per project at the project level (overall)

// get jql script params for query
var avgEventsPerDayScript = $('#events-per-user-by-day-jql').html();
avgEventsPerDayScript = $.trim(avgEventsPerDayScript);

//global variable for graph
var avgEventsPerDayData = {}
var dailyobj = {}

//send out api request
MP.api.jql(avgEventsPerDayScript).done(function(results) {

  //add values to header panel for average events today
  var lastValue = results.length -1

  var headerData = addCommas((results[lastValue].value.sum/results[lastValue].value.count).toFixed(2))
  $('#avg-events').text(headerData);
  if(headerData < 11){             //if the number of avg events per user is less than 11 make the box red
    $('#avg-events').parent().parent().parent().parent().attr('class','panel panel-red')
  }

  //transform data to get it ready for charting
  _.each(results, function(value, key){
    dailyobj[value.key[0]] = parseFloat((value.value.sum/value.value.count).toFixed(2))
  })
  //final data transformation befor charting
  avgEventsPerDayData["Average Monthly Events"] = dailyobj

  var data = highchartsTransform(avgEventsPerDayData)
  console.log("avg events", data);
  // Create a line chart
  $(function () {
    Highcharts.setOptions({
        colors: chartColors
    });

    $('#avg-events-per-user-per-day-chart').highcharts({
          chart: {
              type: 'bar'
          },
          title:{
            text: null
          },
          xAxis: {
              categories:data[0],
              title: {
                  text: 'Months'
              },
              labels: {
                enabled: false
              }
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Average Events',
                  align: 'high',
                  style:{
                    fontSize: "8px"
                  }
              },
              labels: {
                  overflow: 'justify'
              }
          },
          plotOptions: {
              bar: {
                  dataLabels: {
                      enabled: true
                  }
              },
              series: {
                borderWidth: null,
                borderColor: null,
                shadow: false
              }
          },
          legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
              x: 0,
              y: 10,
              floating: true,
              borderWidth: 1,
              backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
              shadow: true,
              itemStyle: {
                fontSize: '8px'
              }
          },
          credits: {
              enabled: false
          },
          series: data[1]
      });
  });
  $('#avg-per-user-header').show()
})
