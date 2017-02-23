var main = function () {

    var FPS = 30;
    var automationNames=['Miner']

    $('#mine').click(function (){
        var clicker = new Clicker(Cookies.getJSON('clicker'));
        var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);
        resources += clicker.gatherRate;
        Cookies.set('resources', resources)
    });

    var counter = 0;
    setInterval(function() {
        counter += 1;
        var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);
        $("input").val(resources)
        if (counter == FPS) {
            counter = 0;
            for(var i = 0; i < automationNames.length; i++){
                automationName = automationNames[i];
                automation = Cookies.getJSON(automationName);
                if (automation) {
                    resources += automation.gatherRate;
                    Cookies.set('resources', resources)
                }
            }
        }

    }, 1000/FPS)

};

$(document).ready(main);
