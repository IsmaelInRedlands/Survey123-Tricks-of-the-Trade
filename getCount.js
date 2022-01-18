function getCount(featureLayer,token){
   
	var xmlhttp = new XMLHttpRequest();
	var url = featureLayer + "/query?f=json&where=1=1&returnCountOnly=true";

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
      	 return JSON.stringify(responseJSON.count);
       }
    }
}
