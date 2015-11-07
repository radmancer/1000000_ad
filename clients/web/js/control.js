function jsonInterpreter(jsonText){
    if(jsonText != ""){
        //alert(jsonText);
        var jsonText = jsonText.replace(/(\r\n|\n|\r)/gm,"");
        switch(jsonText){
            case "right":
                updateGrid(jsonText);
                break;
            case "up":
                updateGrid(jsonText);
                break;
            case "left":
                updateGrid(jsonText);
                break;
            case "down":
                updateGrid(jsonText);
                break;
            case "in":
                updateGrid(jsonText);
                break;
            case "out":
                updateGrid(jsonText);
                break;
            case "x":
                capturePoint();
                break;
            case "dpad_right":
                rotateOrthogonally("right");
                break;
            case "dpad_up":
                rotateOrthogonally("up");
                break;
            case "dpad_left":
                rotateOrthogonally("left");
                break;
            case "dpad_down":
                rotateOrthogonally("down");
                break;
        }
    }
/*
    var jsonText = jsonText.replace(/'/g,"\"");
    var json = JSON.parse(jsonText);

    if(json.translation){
        if(json.translation.voxel == "cursor"){
            updateGrid(json.translation.direction);
        }
        else if(json.translation.voxel == "stage"){
            rotateOrthogonally(json.translation.direction);
        }
        else if(json.translation.voxel == "vertex"){
            //translation function for vertex.
        }
    }
*/
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

window.setInterval(function(){pingRadServer(radUrl);}, pingInterval);