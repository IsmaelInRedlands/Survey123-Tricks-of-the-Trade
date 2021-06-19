
function getLastSubmittedDate(username,token){

    var featureLayer = "https://services2.arcgis.com/fJJEXNgxjn0dpNsi/ArcGIS/rest/services/service_6ddae3ac2ea947b2ad3e7d057632ce15/FeatureServer/0";

    var xmlhttp = new XMLHttpRequest();
    var url = featureLayer + "/query?outFields=CreationDate&returnHiddenFields=false&returnGeometry=false&returnQueryGeometry=false&orderByFields=OBJECTID+DESC&resultRecordCount=1&f=json";

    if (token && username){
        url = url + "&token=" + token + "&where=Creator='" + username + "'";
    } else {
		return "You must be logged in";
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
	        var d = new Date(parseInt(responseJSON.features[0].attributes.CreationDate));
        	return d.toLocaleDateString();
          }
          else{
              return "Never submitted before";
          }
        }
     }
}
