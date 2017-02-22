$( document ).ready(function() {
    console.log( "ready!" );



function Upgrade (name,cost,multplier) {
    this.name = name;
    this.cost = cost;
    this.multplier = multplier;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multplier;
    };
    // Seeing if this works.
    this.button = function() {
        return '<button id="buy-' + this.name + '">Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; //.format function???
    };
}
// Array to contain all the games Upgrades
var upgradeList = [];
var minerU = new Upgrade("Miner",5,.2); 
// Push each upgrade to array
upgradeList.push(minerU); 
var pickaxeU = new Upgrade("Pickaxe",5,.1);
upgradeList.push(pickaxeU);



var lengthU = upgradeList.length;

for(var i = 0; i < lengthU; i++){

    upgradeName = upgradeList[i].name;
    buttonU = upgradeList[i].button()
    $("#Upgrade-Shop").append(upgradeList[i].button());

}

});