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
         resources = parseInt(Cookies.get('resources'));
         cost = parseInt(this.cost);
         baseGatherRateAdd = parseInt(this.baseGatherRateAdd);
         multiplierAdd = parseInt(this.multiplierAdd);
         
         // If stament is not working...I Gotta fix it :
        if (resources >= cost) {
            switch(this.upgradeType) {
                case 'clicker':
                    var toUpgrade = new Clicker(Cookies.getJSON('clicker'));
                    break;
                //case 'automation':
            }
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);
            toUpgrade.updateBaseGatherRate(baseGatherRateAdd);
            toUpgrade.updateMultiplier(multiplierAdd);
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-success" >Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; 
    };
}

$( document ).ready(function() {
    console.log( "ready!" );

    // Array to contain all the games Upgrades
    var upgradeList = [];
    // Push each upgrade to array 
    var pickaxeU = new Upgrade("Pickaxe", 5, 1, 1,"clicker");
    upgradeList.push(pickaxeU);
    
    for(var i = 0; i < upgradeList.length; i++){

        upgrade = upgradeList[i];
        buttonID = "#buy-" + upgrade.name;
        console.log(buttonID);
        $("#Upgrade-Shop").append(upgrade.button());
        $(buttonID).data(upgrade);
        $(buttonID).click(function () {
            $(buttonID).data().clicked();
        });
    }

});