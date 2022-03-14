function getMax(field,token){
   
	//Replace with your own feature layer
	var featureLayer = "https://services2.arcgis.com/fJJEXNgxjn0dpNsi/ArcGIS/rest/services/JTv2/FeatureServer/0";

	var xmlhttp = new XMLHttpRequest();
	var url = featureLayer + "/query?f=json&where=1=1&outStatistics=[{'statisticType':'max','onStatisticField':'" + field + "', 'outStatisticFieldName':'MaxValue'}]";
        //Use next line, instead of above, if working with ArcGIS Enterprise
	//var url = featureLayer + "/query?f=json&where=1=1& + encodeURI("outStatistics=[{'statisticType':'max','onStatisticField':'") + field + encodeURI("', 'outStatisticFieldName':'MaxValue'}]");


	if (token){
        url = url + "&token=" + token;
        }

	xmlhttp.open("GET",url,false);
	xmlhttp.send();

     
	if (xmlhttp.status!==200){
         return (xmlhttp.status);
    } else {
	var responseJSON=JSON.parse(xmlhttp.responseText)
	if (responseJSON.error){
         return (JSON.stringify(responseJSON.error));
       } else {
    if (responseJSON.features[0]){
       return JSON.stringify(responseJSON.features[0].attributes.MaxValue);
       } else {
        return ("No Features Found");
       }
    }
  }
}
