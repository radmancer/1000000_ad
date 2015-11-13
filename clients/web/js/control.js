function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function jsonInterpreter(jsonText){
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
            rotateOrthogonally("up");
        if(json.stage == "yawCW")
            rotateOrthogonally("left");
        if(json.stage == "pitchCW")
            rotateOrthogonally("down");
        if(json.vertex == "back")
            cycleVoxel('back');
        if(json.vertex == "forward")
            cycleVoxel('forward');
        if(json.vertex == "delete")
            deleteVoxel(1);
        if(json.stage == "reset")
            window.location='display.html';
        if(json.stage == "center")
            resetStage();
        if(json.stage == "import")
            importMesh(document.getElementById('importExport').value);
        if(json.stage == "export")
            saveMesh('blender');
    }
}

function pingRadServer(url){
    if(radDeviceDetectionCounter < radDeviceDetectionLimit){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange=function()
        {
            if (xmlHttp.readyState==4 && xmlHttp.status==200){
                jsonInterpreter(xmlHttp.responseText);
            }
            else if(xmlHttp.status == 0){
                radDeviceDetectionCounter += 1;
            }
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    }
    else if(radDeviceDetectionCounter == radDeviceDetectionLimit){
        alert("Please connect a R.A.D. compatible device and reload this page.  If you do not have a R.A.D. device, use the web controls.");
        radDeviceDetectionCounter += 1;
    }
}

window.setInterval(function(){pingRadServer(radUrl);}, pingInterval);