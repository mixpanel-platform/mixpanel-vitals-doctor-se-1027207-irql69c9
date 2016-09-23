// get jql script params for query
var campaignAvgEventScript = $('#events-per-user-per-campaign-by-day-jql').html();
campaignAvgEventScript = $.trim(campaignAvgEventScript);

//global variable for graph
var campaignlist =[]
var avgEventsData = {}

//send out api request
MP.api.jql(campaignAvgEventScript).done(function(results) {
  _.each(results, function(value){    //get all the campaign name and add them to an array to be used later
    campaignlist.push(value.key[0])
  })
  campaignlist = _.uniq(campaignlist) //get unique values
  _.each(campaignlist, function(values, key){
    avgEventsData[values] = {}
  })

  _.each(avgEventsData, function(objValue, objkey){
    var placehoder ={}
    _.each(results, function(values,key){
      if(objkey === values.key[0]){
        placehoder[values.key[1]] = parseFloat((values.value.sum/values.value.count).toFixed(2))
      }
    })
  avgEventsData[objkey] = placehoder
  })

  //transform the data to work with highcharts
  var data = highchartsTransform(avgEventsData)
  ;
  //unhide the header
  $('#avg-campaign-header').show()
  console.log("check chart data",highchartsTransform(avgEventsData));

  $(function () {
    Highcharts.setOptions({
        colors: chartColors
    });
    $('#events-per-user-per-campaign-chart').highcharts({
        chart: {
            type: 'bar'
        },
        title:{
          text: null
        },
        xAxis: {
            categories:data[0],
            title: {
                text: 'Campaigns'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Average Events',
                align: 'high'
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
            shadow: true
        },
        credits: {
            enabled: false
        },
        series:data[1],
    });
  });
})
