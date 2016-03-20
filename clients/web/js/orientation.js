var rightViewCounter = 0;
var upViewCounter = 0;
var leftViewCounter = 0;
var downViewCounter = 0;
function getViewCounters(){
    return rightViewCounter + ":" + upViewCounter + ":" + leftViewCounter + ":" + downViewCounter;
}
function updateViewDirection(direction){
    switch (direction) {
        case "right":
            leftViewCounter -= 1;
            if(leftViewCounter < 0){
                leftViewCounter = 3;
            }
            rightViewCounter += 1;
            if(rightViewCounter == 4){
                rightViewCounter = 0;
            }
            break;
        case "up":
            downViewCounter -= 1;
            if(downViewCounter < 0){
                downViewCounter = 3;
            }
            upViewCounter += 1;
            if(upViewCounter == 4){
                upViewCounter = 0;
            }
            break;
        case "left":
            rightViewCounter -= 1;
            if(rightViewCounter < 0){
                rightViewCounter = 3;
            }
            leftViewCounter += 1;
            if(leftViewCounter == 4){
                leftViewCounter = 0;
            }
            break;
        case "down":
            upViewCounter -= 1;
            if(upViewCounter < 0){
                upViewCounter = 3;
            }
            downViewCounter += 1;
            if(downViewCounter == 4){
                downViewCounter = 0;
            }
            break;
    }
}
function changeVoxelDirectionByView(direction){
    if(direction == "right"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "1:2:3:2":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
        }
    }
    else if(direction == "up"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "1:2:3:2":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
        }
    }
    else if(direction == "left"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "3:2:1:2":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:2:3:2":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
        }
    }
    else if(direction == "down"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "1:2:3:2":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
        }
    }
    else if(direction == "in"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
        }
    }
    else if(direction == "out"){
        switch(getViewCounters()){
            case "0:0:0:0":
                updateGridOnMouseDown('{\'voxel\':\'out\'}', cursorInterval);
                break;
            case "1:0:3:0":
                updateGridOnMouseDown('{\'voxel\':\'left\'}', cursorInterval);
                break;
            case "2:0:2:0":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "3:0:1:0":
                updateGridOnMouseDown('{\'voxel\':\'right\'}', cursorInterval);
                break;
            case "0:1:0:3":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "0:2:0:2":
                updateGridOnMouseDown('{\'voxel\':\'in\'}', cursorInterval);
                break;
            case "0:3:0:1":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "1:3:3:1":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "2:3:2:1":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "3:3:1:1":
                updateGridOnMouseDown('{\'voxel\':\'up\'}', cursorInterval);
                break;
            case "1:1:3:3":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "2:1:2:3":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
            case "3:1:1:3":
                updateGridOnMouseDown('{\'voxel\':\'down\'}', cursorInterval);
                break;
        }
    }
}