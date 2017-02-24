var main = function () {

    var FPS = 30;
    var automationNames=['Molerat', 'Miner', 'Autodrill', 'Dwarf', 'HAG-1', 'Space-Laser'];

    $('#mine').click(function (){
        resources += clicker.gatherRate;
        Cookies.set('resources', resources);
    });

    $('#reset').click(function (){
        for(var i = 0; i < automationNames.length; i++){
            automationName = automationNames[i];
            Cookies.remove(automationName);
        }
        Cookies.remove('resources');
        Cookies.remove('clicker');
        resources = 0;
        location.reload();
    });

    var counter = 0;
    setInterval(function() {
        counter += 1;
        
        $("#resources").val(resources);
        if (counter == FPS) {
            counter = 0;
            for(var i = 0; i < automationNames.length; i++){
                automationName = automationNames[i];
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
