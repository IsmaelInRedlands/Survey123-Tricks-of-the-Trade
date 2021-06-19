function getMyLastSubmittedRecord(username,token){

    var featureLayer = "https://services2.arcgis.com/fJJEXNgxjn0dpNsi/arcgis/rest/services/service_cf1b205a9a7943fa9d0c9b4801b047a9/FeatureServer/0";

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
				return JSON.stringify(responseJSON.features[0]);
            }
            else{
                return "Never submitted before";
            }
        }
    }
}
