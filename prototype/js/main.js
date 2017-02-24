var main = function () {

    var FPS = 30;

    function interval(func, wait, times){
        var interv = function(w, t){
            return function(){
                if(typeof t === "undefined" || t-- > 0){
                    setTimeout(interv, w);
                    try{
                        func.call(null);
                    }
                    catch(e){
                        t = 0;
                        throw e.toString();
                    }
                }
            };
        }(wait, times);
        setTimeout(interv, wait);
    }

    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange; 
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }
    
    var autoMine = true;

    // If the page is hidden, pause the video;
    // if the page is shown, play the video
    function handleVisibilityChange() {
        if (document[hidden]) {
            Cookies.set('dateStopped', new Date());
            autoMine = false;
        } else {
            var currDate = new Date();
            var dateStopped = new Date(Cookies.get('dateStopped'));
            Cookies.remove('dateStopped');
            var secondsPassed = parseInt((currDate - dateStopped) / 1000);
            for(var automationName in automationList){
                automation = Cookies.getJSON(automationName);
                if (automation) {
                    resources += automation.gatherRate * secondsPassed;
                }
            }
            Cookies.set('resources', resources);
            autoMine = true;
        }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
        console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
        // Handle page visibility change   
        document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

    // $(window).blur(function() {
    //     Cookies.set('dateStopped', new Date());
    // });

    // $(window).focus(function() {
    //     var currDate = new Date();
    //     var dateStopped = new Date(Cookies.get('dateStopped'));
    //     var secondsPassed = parseInt((currDate - dateStopped) / 1000);
    //     for(var automationName in automationList){
    //         automation = Cookies.getJSON(automationName);
    //         if (automation) {
    //             resources += automation.gatherRate * secondsPassed;
    //         }
    //     }
    //     Cookies.set('resources', resources);
    // });

    $('#mine').click(function (){
        resources += clicker.gatherRate;
        Cookies.set('resources', resources);
    });

    $('#reset').click(function (){
        for(var automationName in automationList){
            Cookies.remove(automationName);
        }
        Cookies.remove('resources');
        Cookies.remove('clicker');
        Cookies.remove('usedUpgrades');
        Cookies.remove('dateStopped');
        resources = 0;
        location.reload();
    });

    var counter = 0;
    interval(function() {
        counter += 1;
        
        $("#resources").val(resources);
        if (counter >= FPS && autoMine) {
            counter = 0;
            for(var automationName in automationList){
                automation = Cookies.getJSON(automationName);
                if (automation) {
                    resources += automation.gatherRate;
                    Cookies.set('resources', resources);
                }
            }
        }

    }, 1000/FPS);

};

$(document).ready(main);
