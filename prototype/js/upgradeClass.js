$( document ).ready(function() {
    console.log( "ready!" );



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
         console.log("Yep, you clicked me!");
         resources = parseInt(Cookies.get('resources'));
         cost = parseInt(this.cost);
         gather_rate = parseInt(Cookies.get('gather_rate'));
         multiplierAdd = parseInt(Cookies.get('multiplierAdd'));
         baseGatherRateAdd = parseInt(this.baseGatherRateAdd);
         baseGatherRateAdd = parseInt(this.multiplierAdd);
         
         // If stament is not working...I Gotta fix it :
        if (resources >= cost) {
            toUpgrade = Cookies.getJSON(this.upgradeType)
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);
            toUpgrade.updateBaseGatherRate(baseGatherRateAdd);
            toUpgrade.updatemultiplier(multiplierAdd);
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class = "upgradeButton" >Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; 
    };
}
// Array to contain all the games Upgrades
var upgradeList = [];
// Push each upgrade to array 
var pickaxeU = new Upgrade("Pickaxe",5,0,1,"clicker");
upgradeList.push(pickaxeU);



var lengthU = upgradeList.length;

for(var i = 0; i < lengthU; i++){

    upgradeName = upgradeList[i].name;
    buttonU = upgradeList[i].button();
    buttonID = "#buy-" + upgradeName;
    console.log(buttonID);
    $("#Upgrade-Shop").append(upgradeList[i].button());
    $('body').on('click', buttonID, upgradeList[i].clicked);
}

});