$( document ).ready(function() {
    console.log( "ready!" );



function Upgrade (name,cost,multplier,gather_rate,num_objects) {
    this.name = name;
    this.cost = cost;
    this.multplier = multplier;
    this.gather_rate = gather_rate;
    this.num_objects = num_objects;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multplier + ' ' + this.gather_rate;
    };


    // Create the .onClick function
    this.clicked = function() {
         
         resources = Cookies.get('resources');
         console.log(resources);

         if (resources >= this.cost) {
            resources -= this.cost;
            Cookies.set('resources', resources); 
            gather_rate = parseInt(Cookies.get('gather_rate'));
            gather_rate += this.gather_rate;
            Cookies.set('gather_rate', gather_rate);     
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class = "upgradeButton" >Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; 
    };
}
// Array to contain all the games Upgrades
var upgradeList = [];
var minerU = new Upgrade("Miner",5,.2,2,null); 
// Push each upgrade to array
upgradeList.push(minerU); 
var pickaxeU = new Upgrade("Pickaxe",5,.1,1,null);
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