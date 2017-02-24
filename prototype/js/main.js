var main = function () {

    var FPS = 30;

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
        resources = 0;
        location.reload();
    });

    var counter = 0;
    setInterval(function() {
        counter += 1;
        
        $("#resources").val(resources);
        if (counter == FPS) {
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
