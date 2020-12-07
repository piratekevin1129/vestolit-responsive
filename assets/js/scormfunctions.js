/*
Source code created by Rustici Software, LLC is licensed under a 
Creative Commons Attribution 3.0 United States License
(http://creativecommons.org/licenses/by/3.0/us/)

Want to make SCORM easy? See our solutions at http://www.scorm.com.

This example provides for the bare minimum SCORM run-time calls.
It will demonstrate using the API discovery algorithm to find the
SCORM API and then calling Initialize and Terminate when the page
loads and unloads respectively. This example also demonstrates
some basic SCORM error handling.
*/


//Include the standard ADL-supplied API discovery algorithm


///////////////////////////////////////////
//Begin ADL-provided API discovery algorithm
///////////////////////////////////////////
var findAPITries = 0;

function findAPI(win)
{
   // Check to see if the window (win) contains the API
   // if the window (win) does not contain the API and
   // the window (win) has a parent window and the parent window
   // is not the same as the window (win)
   while ( (win.API == null) &&
           (win.parent != null) &&
           (win.parent != win) )
   {
      // increment the number of findAPITries
      findAPITries++;

      // Note: 7 is an arbitrary number, but should be more than sufficient
      if (findAPITries > 7)
      {
         alert("Error finding API -- too deeply nested.");
         return null;
      }

      // set the variable that represents the window being
      // being searched to be the parent of the current window
      // then search for the API again
      win = win.parent;
   }
   return win.API;
}

function getAPI()
{
   // start by looking for the API in the current window
   var theAPI = findAPI(window);

   // if the API is null (could not be found in the current window)
   // and the current window has an opener window
   if ( (theAPI == null) &&
        (window.opener != null) &&
        (typeof(window.opener) != "undefined") )
   {
      // try to find the API in the current window�s opener
      theAPI = findAPI(window.opener);
   }
   // if the API has not been found
   if (theAPI == null)
   {
      // Alert the user that the API Adapter could not be found
      alert("Unable to find an API adapter");
   }
   return theAPI;
}


///////////////////////////////////////////
//End ADL-provided API discovery algorithm
///////////////////////////////////////////
  
  
//Create function handlers for the loading and unloading of the page


//Constants
var SCORM_TRUE = "true";
var SCORM_FALSE = "false";
var SCORM_NO_ERROR = "0";

//Since the Unload handler will be called twice, from both the onunload
//and onbeforeunload events, ensure that we only call LMSFinish once.
var finishCalled = false;

//Track whether or not we successfully initialized.
var initialized = false;

var API = null;

function ScormProcessInitialize(){
    var result;
    
    API = getAPI();
    
    if (API == null){
        alert("ERROR - Could not establish a connection with the LMS.\n\nYour results may not be recorded.");
        return;
    }
    
    result = API.LMSInitialize("");
    
    if (result == SCORM_FALSE){
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        alert("Error - Could not initialize communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    }
    
    initialized = true;
}

function ScormProcessFinish(){
    
    var result;
    
    //Don't terminate if we haven't initialized or if we've already terminated
    if (initialized == false || finishCalled == true){return;}
    
    result = API.LMSFinish("");
    
    finishCalled = true;
    
    if (result == SCORM_FALSE){
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        alert("Error - Could not terminate communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    }
}


/*
The onload and onunload event handlers are assigned in launchpage.html because more processing needs to 
occur at these times in this example.
*/
//window.onload = ScormProcessInitialize;
//window.onunload = ScormProcessTerminate;
//window.onbeforeunload = ScormProcessTerminate;


function ScormProcessGetValue(element){
    
    var result;
    
    if (initialized == false || finishCalled == true){return;}
    
    result = API.LMSGetValue(element);
    
    if (result == ""){
    
        var errorNumber = API.LMSGetLastError();
        
        if (errorNumber != SCORM_NO_ERROR){
            var errorString = API.LMSGetErrorString(errorNumber);
            var diagnostic = API.LMSGetDiagnostic(errorNumber);
            
            var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
            
            alert("Error - Could not retrieve a value from the LMS.\n\n" + errorDescription);
            return "";
        }
    }
    
    return result;
}

function ScormProcessSetValue(element, value){
   
    var result;
    
    if (initialized == false || finishCalled == true){return;}
    
    result = API.LMSSetValue(element, value);
    
    if (result == SCORM_FALSE){
        var errorNumber = API.LMSGetLastError();
        var errorString = API.LMSGetErrorString(errorNumber);
        var diagnostic = API.LMSGetDiagnostic(errorNumber);
        
        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;
        
        alert("Error - Could not store a value in the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
        return;
    }
    
}

function ScormProcessCommit(){
    var result;
    
    if (initialized == false || finishCalled == true){return;}

    result = API.LMSCommit("");
    if (result == SCORM_FALSE){
        //var err = ErrorHandler();
        alert("Error trying save status")
        return;
    }
}

var processedUnload = false
var reachedEnd = false
var startTimeStamp = new Date();
function doUnload(pressedExit){
        
    //don't call this function twice
    if (processedUnload == true){return;}
    
    processedUnload = true;
    
    //record the session time
    var endTimeStamp = new Date();
    console.log(startTimeStamp)
    var totalMilliseconds = (endTimeStamp.getTime() - startTimeStamp.getTime());
    var scormTime = ConvertMilliSecondsToSCORMTime(totalMilliseconds, false);
    
    ScormProcessSetValue("cmi.core.session_time", scormTime);
    //ScormProcessCommit()
    
    //if the user just closes the browser, we will default to saving 
    //their progress data. If the user presses exit, he is prompted.
    //If the user reached the end, the exit normall to submit results.
    if (pressedExit == false && reachedEnd == false){
        ScormProcessSetValue("cmi.core.exit", "suspend");
    }
    
    ScormProcessFinish();
}

function ConvertMilliSecondsToSCORMTime(intTotalMilliseconds, blnIncludeFraction){
    var intHours;
    var intintMinutes;
    var intSeconds;
    var intMilliseconds;
    var intHundredths;
    var strCMITimeSpan;
    
    if (blnIncludeFraction == null || blnIncludeFraction == undefined){
        blnIncludeFraction = true;
    }
    
    //extract time parts
    intMilliseconds = intTotalMilliseconds % 1000;
    intSeconds = ((intTotalMilliseconds - intMilliseconds) / 1000) % 60;
    intMinutes = ((intTotalMilliseconds - intMilliseconds - (intSeconds * 1000)) / 60000) % 60;
    intHours = (intTotalMilliseconds - intMilliseconds - (intSeconds * 1000) - (intMinutes * 60000)) / 3600000;

    /*
    deal with exceptional case when content used a huge amount of time and interpreted CMITimstamp 
    to allow a number of intMinutes and seconds greater than 60 i.e. 9999:99:99.99 instead of 9999:60:60:99
    note - this case is permissable under SCORM, but will be exceptionally rare
    */

    if (intHours == 10000){	
        intHours = 9999;
        intMinutes = (intTotalMilliseconds - (intHours * 3600000)) / 60000;
        if (intMinutes == 100){
            intMinutes = 99;
        }
        intMinutes = Math.floor(intMinutes);
        intSeconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000)) / 1000;
        if (intSeconds == 100){
            intSeconds = 99;
        }
        intSeconds = Math.floor(intSeconds);
        intMilliseconds = (intTotalMilliseconds - (intHours * 3600000) - (intMinutes * 60000) - (intSeconds * 1000));
    }

    //drop the extra precision from the milliseconds
    intHundredths = Math.floor(intMilliseconds / 10);

    //put in padding 0's and concatinate to get the proper format
    strCMITimeSpan = ZeroPad(intHours, 4) + ":" + ZeroPad(intMinutes, 2) + ":" + ZeroPad(intSeconds, 2);
    
    if (blnIncludeFraction){
        strCMITimeSpan += "." + intHundredths;
    }

    //check for case where total milliseconds is greater than max supported by strCMITimeSpan
    if (intHours > 9999){
        strCMITimeSpan = "9999:99:99";
        
        if (blnIncludeFraction){
            strCMITimeSpan += ".99";
        }
    }

    return strCMITimeSpan;
}

function ZeroPad(intNum, intNumDigits){
    var strTemp;
    var intLen;
    var i;
    
    strTemp = new String(intNum);
    intLen = strTemp.length;
    
    if (intLen > intNumDigits){
        strTemp = strTemp.substr(0,intNumDigits);
    }
    else{
        for (i=intLen; i<intNumDigits; i++){
            strTemp = "0" + strTemp;
        }
    }
    
    return strTemp;
}