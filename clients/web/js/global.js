//Global X, Y, and Z positions of the cursor.
var globalCursorX = 0;
var globalCursorY = 0;
var globalCursorZ = -245;

//A boolean that is switched to true
//when the user wishes to use a RAD device.
var isRadDeviceConnected = false;

//Controls the amount of time in milliseconds 
//between voxel translation function calls.
var cursorInterval = 20;

//The background color used for all voxels.
var voxelColor = "black";

//The background color used for the cursor.
var cursorVoxelColor = "red";

//The background color for the currently selected voxel.
var selectedVoxelColor = "white";

//z-index property allows voxels to clip through each other.
var zIndexCount = 0;

//A counter that keeps track of the voxels on screen.
var voxelCount = 0;

//A pointer to the selected voxel, this pointer is 
//referenced when the user is cycling through voxels.
var selectedVoxelPosition = 0;

//The length, width, and height of a voxel.
var voxelDimension = 2;

//The length, width, and height of a voxel's faces.
var voxelSideDimension = voxelDimension / 2;

//The length, width, and height of the stage.
var cubeDimension = 400;

//The length, width, and height of the grid's faces.
var cubeSideDimension = cubeDimension / 2;

//The default z dimension sets a voxel in the middle of the stage.
//However, to aid the user, a conventional z dimension is required, that is,
//set the voxel's start position to the top-left-back of the 3d grid.
var correctedZCoordinate = -((cubeDimension / 2) - (voxelDimension / 2));

//The IP address of the server device and the interval
//of how often the device should be pinged.
var pingInterval = 10;
var radUrl = "http://192.168.1.177/";