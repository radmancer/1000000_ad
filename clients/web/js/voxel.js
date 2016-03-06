//Timer object used between voxel translation calls.
var timer = null;

//Calls the voxel translation function multiple times for the duration that the left mouse button is being held down.
function updateGridOnMouseDown(jsonText, interval){
  timer = setInterval("transform(\"" + jsonText + "\");", interval);
}

//As soon as the user lifts up on the left mouse button, the translation timer needs to be reset.
function updateGridOnMouseUp(){
  window.clearInterval(timer);
}

//Resets the stage to its original orientation.
//In order for the stage to be reset, a page redirect is necessary and all point 
//data must be placed in the query string to be read by the page upon refresh.
function resetStage(){
	var voxelCoordinates = "{";

	for(var i = 0; i < voxelCount; i++){
		var voxel = document.getElementById(i + "");
		var voxelX = voxel.style.paddingLeft;
		var voxelY = voxel.style.paddingTop;
		var voxelZ = voxel.style.transform;

		//Strips the numeric information from the padding 
		//and translation properties of the x, y, and z coordinates.
		voxelX = voxelX.substring(0, voxelX.length - 2);
		voxelX = parseInt(voxelX);
		voxelY = voxelY.substring(0, voxelY.length - 2);
		voxelY = parseInt(voxelY);
		voxelZ = voxelZ.substring(11, voxelZ.length - 3);
		voxelZ = parseInt(voxelZ);

		if(i == voxelCount - 1){
			voxelCoordinates += "(" + voxelX + "," + voxelY + "," + voxelZ + ")";
		}
		else{
			voxelCoordinates += "(" + voxelX + "," + voxelY + "," + voxelZ + ");";
		}
	}

	voxelCoordinates += "}";
	window.location = "display.html?voxel_coordinates=" + voxelCoordinates;
}

//Cycles through all voxels on screen based on if the user wants to cycle forward or backward.
//This allows the user to delete unwanted voxels as they are working on their model.
function cycleVoxel(direction){
	var previousSelectedVoxelPosition = selectedVoxelPosition;

	if(direction == "back"){
		if(selectedVoxelPosition == 0){
			selectedVoxelPosition = voxelCount - 1;
		}
		else{
			selectedVoxelPosition -= 1;
		}
	}
	else if(direction == "forward"){
		if(selectedVoxelPosition == (voxelCount - 1)){
			selectedVoxelPosition = 0;
		}
		else{
			selectedVoxelPosition += 1;
		}
	}

        for(var i = 0; i < 3; i++){ //There are 3 intersecting planes inside a point.
	    document.getElementById(selectedVoxelPosition+"").childNodes[i].style.backgroundColor = selectedVoxelColor;
	    document.getElementById(previousSelectedVoxelPosition+"").childNodes[i].style.backgroundColor = voxelColor;
        }
}

//Deletes a voxel at a specific position.
//This will delete whatever voxel the selectedVoxelPosition global variables is pointed at.
function deleteVoxel(){
	document.getElementById("cube").removeChild(document.getElementById(selectedVoxelPosition+""));
	for(var i = 0; i < voxelCount; i++){
		var tempVoxel = document.getElementById(i+"");
		if(i > selectedVoxelPosition){
			tempVoxel.id = i - 1;
		}
	}
	voxelCount -= 1;
}

//Creates the initial cursor voxel.
//NOTE: The following sets the voxel's CSS with concatenated JavaScript strings.
//      Setting the CSS with a JavaScript style property is desired, but I have not had any luck setting the webkit transform property.
//      The concatenation method works across all browsers regardless.
function createCursor(){
	//Creates the cursor.
	var cursor = document.createElement('div');
	cursor.className = 'voxel';

	var face1 = document.createElement('div');
	face1.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateY(0deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face1.setAttribute('style', cssText);

	var face2 = document.createElement('div');
	face2.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateY(90deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face2.setAttribute('style', cssText);

	var face3 = document.createElement('div');
	face3.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateX(90deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face3.setAttribute('style', cssText);

        cursor.appendChild(face1);
	cursor.appendChild(face2);
        cursor.appendChild(face3);

	//Sets the cursor's coordinates.
	cursor.style.paddingLeft = "0px";
	cursor.style.paddingTop = "0px";
	cursor.style.transform = "translateZ(" + correctedZCoordinate + "px)";

	//A z-index is assigned to the cursor so that
	//other voxels can clip through the cursor.
	cursor.style.zIndex = "0";
	cursor.style.position = "absolute";

	//Assigns the cursor's id to the new voxel so that the new 
	//voxel becomes the new cursor.
	//The old cursor is assigned a numeric value starting at zero.
	//As new points are added, the numeric IDs will increase.
	cursor.id = "cursor"

	document.getElementById("cube").appendChild(cursor);
}

//Moves the cursor voxel right, up, left, down, in or out.
function updateGrid(direction){

	//Gets the cursor voxel and its coordinates.
	var cursor = document.getElementById("cursor");
	var cursorX = cursor.style.paddingLeft;
	var cursorY = cursor.style.paddingTop;
	var cursorZ = cursor.style.transform;

	//Strips the numeric information from the padding 
	//and translation properties of the x, y, and z coordinates.
	cursorX = cursorX.substring(0, cursorX.length - 2);
	cursorX = parseInt(cursorX);
	cursorY = cursorY.substring(0, cursorY.length - 2);
	cursorY = parseInt(cursorY);
	cursorZ = cursorZ.substring(11, cursorZ.length - 3);
	cursorZ = parseInt(cursorZ);

	//Depending on what button the user pressed, a right,
	//up, left, down, in, or out translation is made.
	switch(direction){
		case 'right':
			globalCursorX += voxelDimension;
			cursorX = globalCursorX + "px";
			//cursorX = cursorX + magnitude + "px";
			break;
		case 'up':
			globalCursorY -= voxelDimension;
			cursorY = globalCursorY + "px";
			//cursorY = cursorY - magnitude + "px";
			break;
		case 'left':
			globalCursorX -= voxelDimension;
			cursorX = globalCursorX + "px";
			//cursorX = cursorX - magnitude + "px";
			break;
		case 'down':
			globalCursorY += voxelDimension;
			cursorY = globalCursorY + "px";
			//cursorY = cursorY + magnitude + "px";
			break;
		case 'in':
			globalCursorZ -= voxelDimension;
			cursorZ = globalCursorZ + "px";
			cursorZ = "translateZ(" + cursorZ + ")";
			break;
		case 'out':
			globalCursorZ += voxelDimension;
			cursorZ = globalCursorZ + "px";
			cursorZ = "translateZ(" + cursorZ + ")";
			break;
	}

	//Sets the cursor's x, y, and z coordinates to the newly calculated coordinates.
	cursor.style.paddingLeft = cursorX;
	cursor.style.paddingTop = cursorY;
	cursor.style.transform = cursorZ;
}

//The old cursor is now a new point and must be set to the uniform color of the other voxels.
function updateNewPointColor(cursor){
    var cursorChildren = cursor.children;
    for (var i = 0; i < cursorChildren.length; i++) {
        cursorChildren[i].style.backgroundColor=voxelColor;
    }
}

//Captures a voxel-point at the cursor's current position.
//NOTE: The following sets the voxel's CSS with concatenated JavaScript strings.
//      Setting the CSS with a JavaScript style property is desired, but I have not had any luck setting the webkit transform property.
//      The concatenation method works across all browsers regardless.
function capturePoint(){
	//Gets the cursor voxel and its coordinates.
	var cursor = document.getElementById("cursor");
	var cursorX = cursor.style.paddingLeft;
	var cursorY = cursor.style.paddingTop;
	var cursorZ = cursor.style.transform;

	//Creates a new voxel.
	var point = document.createElement('div');
	point.className = 'voxel';

	var face1 = document.createElement('div');
	face1.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateY(0deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face1.setAttribute('style', cssText);

	var face2 = document.createElement('div');
	face2.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateY(90deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face2.setAttribute('style', cssText);

	var face3 = document.createElement('div');
	face3.className = "voxelFace";
	cssText = "width:" + voxelDimension + "px;"
                + "height:" + voxelDimension + "px;"
                + "transform: rotateX(90deg);"
                + "background-color:" + cursorVoxelColor + ";";
	face3.setAttribute('style', cssText);

        point.appendChild(face1);
	point.appendChild(face2);
        point.appendChild(face3);

	//Assigns the cursor's coordinates to the new voxel.
	point.style.paddingLeft = cursorX;
	point.style.paddingTop = cursorY;
	point.style.transform = cursorZ;

	//A new z-index is assigned to the new voxel so that the 
	//voxels may overlap (or clip into) each other on the z axis.
	zIndexCount -= 1;
	point.style.zIndex = zIndexCount + "";
	point.style.position = "absolute";

	//Assigns the cursor's id to the new voxel so that the new 
	//voxel becomes the new cursor.
	//The old cursor is assigned a numeric value starting at zero.
	//As new points are added, the numeric IDs will increase.
	point.id = cursor.id;
	cursor.id = voxelCount + "";
        updateNewPointColor(cursor);
	voxelCount += 1;
	document.getElementById("cube").appendChild(point);
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function customReplaceAll(find, replace, string) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

//Traverses all voxels on screen, strips their coordinates, and stores their coordinates in a textarea element.
//The user is expected to copy and past the coordinates into a text file.
function saveMesh(format){
    var voxelCoordinates = "{";

    for(var i = 0; i < voxelCount; i++){
        var voxel = document.getElementById(i + "");
        var voxelX = voxel.style.paddingLeft;
        var voxelY = voxel.style.paddingTop;
        var voxelZ = voxel.style.transform;

        //Strips the numeric information from the padding 
        //and translation properties of the x, y, and z coordinates.
        voxelX = voxelX.substring(0, voxelX.length - 2);
        voxelX = parseInt(voxelX);
        voxelY = voxelY.substring(0, voxelY.length - 2);
        voxelY = parseInt(voxelY);
        voxelZ = voxelZ.substring(11, voxelZ.length - 3);
        voxelZ = parseInt(voxelZ);

        if(i == voxelCount - 1){
            voxelCoordinates += "(" + voxelX + "," + voxelY + "," + voxelZ + ")";
        }
        else{
            voxelCoordinates += "(" + voxelX + "," + voxelY + "," + voxelZ + ");";
        }
    }

    voxelCoordinates += "}";

    if(format == "export_blender"){
        voxelCoordinates = customReplaceAll("{", "[", voxelCoordinates);
        voxelCoordinates = customReplaceAll("}", "]", voxelCoordinates);
        voxelCoordinates = customReplaceAll("(", "[", voxelCoordinates);
        voxelCoordinates = customReplaceAll(")", "]", voxelCoordinates);
        voxelCoordinates = customReplaceAll(";", ",", voxelCoordinates);
        voxelCoordinates = "from Blender import *\nimport bpy\npoint_cloud = " + voxelCoordinates + "\nmesh = bpy.data.meshes.new(\"rad_mesh\")\nmesh.verts.extend(point_cloud)\nscene = bpy.data.scenes.active\nscene.objects.new(mesh, \"rad_object\")";
    }

    document.getElementById("importExport").value = voxelCoordinates;
}

//Reads coordinates from the import/export text area and populates the stage with voxels based on the supplied coordinates.
//The user is expected to copy and past the coordinates from a text file into the textarea input of the page.
function importMesh(importText){
	importText = importText.replace("{","");
	importText = importText.replace("}","");
	var importArray = importText.split(";");
	for(var i = 0; i < importArray.length; i++){
		var coordinateArray = importArray[i].split(",");
		coordinateArray[0] = coordinateArray[0].replace("(","");
		coordinateArray[2] = coordinateArray[2].replace(")","");
		
		//Gets the cursor voxel and its coordinates.
		var cursor = document.getElementById("cursor");
		cursor.style.paddingLeft = coordinateArray[0] + "px";
		cursor.style.paddingTop = coordinateArray[1] + "px";
		cursor.style.transform = "translateZ(" + coordinateArray[2] + "px)";
		
		capturePoint();
	}
	
	//WARNING!!!
	//It is not known why updating the grid twice solves the issue where the cursor cannot enter its parent's space.
	//The bug in question only happens after an import.
	updateGrid("right")
	updateGrid("down")
}

function translateSet(direction){
    var voxels = document.getElementsByClassName("voxel");
    for(var i = 0; i < voxels.length; i++){
        var cursorX = voxels[i].style.paddingLeft;
	var cursorY = voxels[i].style.paddingTop;
	var cursorZ = voxels[i].style.transform;

	//Strips the numeric information from the padding 
	//and translation properties of the x, y, and z coordinates.
	cursorX = cursorX.substring(0, cursorX.length - 2);
	cursorX = parseInt(cursorX);
	cursorY = cursorY.substring(0, cursorY.length - 2);
	cursorY = parseInt(cursorY);
	cursorZ = cursorZ.substring(11, cursorZ.length - 3);
	cursorZ = parseInt(cursorZ);
/*
        if(direction == "out"){
            cursorZ += voxelDimension;
	    cursorZ = cursorZ + "px";
	    cursorZ = "translateZ(" + cursorZ + ")";
        }

        if(direction == "in"){
            cursorZ -= voxelDimension;
	    cursorZ = cursorZ + "px";
	    cursorZ = "translateZ(" + cursorZ + ")";
        }
*/
	//Depending on what button the user pressed, a right,
	//up, left, down, in, or out translation is made.
	switch(direction){
		case 'right':
		    cursorX += voxelDimension;
		    cursorX = cursorX + "px";
		    break;
		case 'up':
		    cursorY -= voxelDimension;
		    cursorY = cursorY + "px";
		    break;
		case 'left':
		    cursorX -= voxelDimension;
		    cursorX = cursorX + "px";
		    break;
		case 'down':
		    cursorY += voxelDimension;
		    cursorY = cursorY + "px";
		    break;
		case 'in':
                    cursorZ -= voxelDimension;
	            cursorZ = cursorZ + "px";
	            cursorZ = "translateZ(" + cursorZ + ")";
		    break;
		case 'out':
                    cursorZ += voxelDimension;
	            cursorZ = cursorZ + "px";
	            cursorZ = "translateZ(" + cursorZ + ")";
		    break;
	}

	voxels[i].style.paddingLeft = cursorX;
	voxels[i].style.paddingTop = cursorY;
	voxels[i].style.transform = cursorZ;
    }
}