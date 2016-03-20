function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function transform(jsonText){
    jsonText = replaceAll(jsonText, "'", "\"");
    if(jsonText != ""){
        var json = JSON.parse(jsonText);
        if(json.voxel == "right")
            updateGrid("right");
        if(json.voxel == "up")
            updateGrid("up");
        if(json.voxel == "left")
            updateGrid("left");
        if(json.voxel == "down")
            updateGrid("down");
        if(json.voxel == "in")
            updateGrid("in");
        if(json.voxel == "out")
            updateGrid("out");
        if(json.vertex == "add")
            capturePoint();
        if(json.stage == "yawCCW")
            rotateOrthogonally("right");
        if(json.stage == "pitchCCW")
            rotateOrthogonally("down");
        if(json.stage == "yawCW")
            rotateOrthogonally("left");
        if(json.stage == "pitchCW")
            rotateOrthogonally("up");
        if(json.vertex == "back")
            cycleVoxel('back');
        if(json.vertex == "forward")
            cycleVoxel('forward');
        if(json.vertex == "delete")
            deleteVoxel(1);
        if(json.stage == "reset")
            window.location = "display.html";
        if(json.stage == "center")
            resetStage();
        if(json.stage == "import")
            importMesh(document.getElementById('importExport').value);
        if(json.stage == "export_default")
            saveMesh('export_default');
        if(json.stage == "export_blender")
            saveMesh('export_blender');
        if(json.cloud == "up")
            translateSet("up");
        if(json.cloud == "left")
            translateSet("left");
        if(json.cloud == "right")
            translateSet("right");
        if(json.cloud == "in")
            translateSet("in");
        if(json.cloud == "down")
            translateSet("down");
        if(json.cloud == "out")
            translateSet("out");
        if(json.cloud == "delete")
            translateSet("delete");
    }
}

function pingRadServer(url){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange=function()
    {
        if (xmlHttp.readyState==4 && xmlHttp.status==200){
           transform(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
}

if(isRadDeviceConnected == true){
    window.setInterval(function(){pingRadServer(radUrl);}, pingInterval);
}

function changePanelMode(){
    /*Loops over the right panel's buttons.*/
    for(var i = 0; i < 12; i++){
        var currentButton = document.getElementById("rightPanelButton" + i);
        if(i == 0){
            currentButton.firstChild.innerHTML = "&bull;";
            currentButton.onclick = function(){transform('{\'stage\':\'center\'}');};
        }
        if(i == 1 || i == 3 || i == 5 || i == 6 || i == 7 || i == 8 || i == 10){
            currentButton.firstChild.innerHTML = "&#8756;" + currentButton.firstChild.innerHTML;
            if(i == 1){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'up\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'up\'}');};
            }
            if(i == 3){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'left\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'left\'}');};
            }
            if(i == 5){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'right\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'right\'}');};
            }
            if(i == 6){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'in\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'in\'}');};
            }
            if(i == 7){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'down\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'down\'}');};
            }
            if(i == 8){
                currentButton.onmousedown = function(){transform('{\'cloud\':\'out\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'out\'}');};
            }
            if(i == 10){
                currentButton.onmousedown = function(){transform('{\'stage\':\'reset\'}');};
                currentButton.ontouchstart = function(){transform('{\'cloud\':\'reset\'}');};
            }
        }
    }
}