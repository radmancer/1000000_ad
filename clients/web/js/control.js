function jsonInterpreter(jsonText){
    var jsonText = jsonText.replace(/'/g,"\"");
    var json = JSON.parse(jsonText);

    if(json.translation){
        if(json.translation.voxel == "cursor"){
            updateGrid(json.translation.direction);
        }
        else if(json.translation.voxel == "stage"){
            //translation function for stage.
        }
        else if(json.translation.voxel == "vertex"){
            //translation function for vertex.
        }
    }
}

function pingRadServer(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
            jsonInterpreter(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

//window.setInterval(function(){pingRadServer(radUrl);}, pingInterval);