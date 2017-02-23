$( document ).ready(function() {
    console.log( "ready!" );



function Automation (name,cost,multplier,gather_rate) {
    this.name = name;
    this.cost = cost;
    this.multplier = multplier;
    this.gather_rate = gather_rate;
    this.num_objects = this.num_objects ? parseInt(this.num_objects) + 1 : 1;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multplier + ' ' + this.gather_rate;
    };


    // Create the .onClick function
    this.clicked = function() {
         console.log("Yep, you clicked me!");
         resources = parseInt(Cookies.get('resources'));
         gather_rate = parseInt(Cookies.get('gather_rate'));
         cost = parseInt(this.cost);
         gather_rate = parseInt(this.gather_rate);
         
         // If stament is not working...I Gotta fix it :
         if (resources >= cost) {
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);  
            gather_rate = parseInt(Cookies.get('gather_rate'));
            gather_rate += gather_rate;
            Cookies.set('gather_rate', gather_rate);     
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class = "upgradeButton" >Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; 
    };
}
// Array to contain all the games Upgrades
var upgradeList = [];
var minerU = new Automation("Miner",5,.2,2,null); 
// Push each upgrade to array
upgradeList.push(minerU);


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