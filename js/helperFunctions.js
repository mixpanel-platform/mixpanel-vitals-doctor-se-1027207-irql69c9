//formatting to add commas to numbers
function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

//apply data to dataSet variable
function graphValues(eventParam, count){ // helper function for ordering data for marketing table

  _.each(eventParam, function(value, key){ //for top event
    _.each(dataSet, function(datasetValue, datasetKey){
      if(key === datasetValue[0]){
        dataSet[datasetKey][count] = addCommas(value)
        if (eventParam = eventsByCampaign){

        }
      }
    })
  })
}
function highchartsTransform(data){
  var categories = []
  var chartData = []
  var numberOfobjectsInDataSeries = 0
  _.each(data, function(values, category){ //loop to go through mixpanel data as provided via our formatted apis. i.e. {category:{grouping:value}} where category is usually a property value, grouping will be the xAxis (usually date), and Value is the count of the category
    var existenceTest = false
    for (var i = 0; i < categories.length; i++) { //creat a loop to go through the entire data object, find all the "categories" or grouping and store in a array to be used on one of the Axis chart options in highcharts
      if (categories[i] === category) { //make sure we only have unique values and no duplicates
        existenceTest = true
      }
    }
    if(existenceTest === false){
      categories.push(category)
    }/// done creating the Axis categories or groupgins
    //need to loop through all the values and place them in a objec that looks like {name: "some date",
                                                                                     // data:[array of data]
                                                                                     // }
   //need to get the number of keys in the data objects so we can create the correct number of objects for the data series in highcharts series parameter
   numberOfobjectsInDataSeries = Object.keys(values).length
    _.each(values, function(xAxis, yAxis){

    })
  })
  //create the array for the data series in highcharts
  for (var i = 0; i < numberOfobjectsInDataSeries; i++) {
    chartData.push({})
  }
  //loop through the original data object and add the name and data values for each object
  _.each(data, function(values, category){
    var index = 0
    _.each(values, function(data, name){
      if(chartData[index].name === undefined){
        chartData[index].name = name
      }
      if(chartData[index].data === undefined ){
        chartData[index].data = [data]
      }else{
        chartData[index].data.push(data)
      }
      index++
    })
  })
  return [categories, chartData]
}
