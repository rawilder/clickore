function Upgrade (name, cost, multiplierAdd, baseGatherRateAdd, upgradeType) {
    this.name = name;
    this.cost = cost;
    this.multiplierAdd = multiplierAdd;
    this.baseGatherRateAdd = baseGatherRateAdd;
    this.upgradeType = upgradeType;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multiplierAdd + ' ' + this.baseGatherRateAdd + ' ' + this.upgradeType;
    };


    // Create the .onClick function
    this.clicked = function() {
         var cost = parseInt(this.cost);
         var baseGatherRateAdd = parseInt(this.baseGatherRateAdd);
         var multiplierAdd = parseInt(this.multiplierAdd);
         
         // If stament is not working...I Gotta fix it :
        if (resources >= cost) {
            switch(this.upgradeType) {
                case 'clicker':
                    var toUpgrade = clicker;
                    break;
                //case 'automation':
            }
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);
            toUpgrade.updateBaseGatherRate(baseGatherRateAdd);
            toUpgrade.updateMultiplier(multiplierAdd);
            var buttonID = "#buy-" + this.name;
            $(buttonID).remove();
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-success" >Buy ' + this.name.replace('-', ' ') + ' (' + this.cost + ')' + '</button></br>'; 
    };
}

$( document ).ready(function() {
    console.log( "ready!" );

    // Array to contain all the games Upgrades
    var upgradeList = [];
    upgradeList.push(new Upgrade("Pickaxe", 10, 0, 1, "clicker"));
    upgradeList.push(new Upgrade("Another-Pickaxe", 80, 0, 2, "clicker"));
    upgradeList.push(new Upgrade("Handheld-Drill", 350, 0, 3, "clicker"));
    upgradeList.push(new Upgrade("Diamond-Drillbit", 1300, 0, 4, "clicker"));
    upgradeList.push(new Upgrade("Strength-Training", 3000, 1, 5, "clicker"));
    upgradeList.push(new Upgrade("Steroids", 6200, 0, 6, "clicker"));
    
    function callButtonClick() {
        $(this).data().clicked();
    }
    for(var i = 0; i < upgradeList.length; i++){

        var upgrade = upgradeList[i];
        var buttonID = "#buy-" + upgrade.name;
        console.log(buttonID);
        $("#Upgrade-Shop").append(upgrade.button());
        $(buttonID).data(upgrade);
        $(buttonID).click(callButtonClick);
    }

});