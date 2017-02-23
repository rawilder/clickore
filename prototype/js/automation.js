function Automation (name, cost, multiplier, baseGatherRate) {
    this.name = name;
    this.cost = cost;
    this.multiplier = multiplier;
    this.baseGatherRate = baseGatherRate;
    this.number = 0;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multiplier + ' ' + this.baseGatherRate;
    };

    this.updateMultiplier = function(multiplier) {
        this.multiplier += multiplier;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(name, this)
    };

    this.updateBaseGatherRate = function(baseGatherRateAdd) {
        this.baseGatherRate += baseGatherRateAdd;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(this.name, this)
    }

    this.incrementNumber = function() {
        this.number = parseInt(this.number) + 1;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(this.name, this)
    }

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-info" >Buy ' + this.name + ' (' + this.cost + ')' + '</button></br>'; 
    };

    // Create the .onClick function
    this.clicked = function() {
         resources = parseInt(Cookies.get('resources'));
         cost = parseInt(this.cost);
         
         // If stament is not working...I Gotta fix it :
        if (resources >= cost) {
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);
            this.incrementNumber();
        }
    };
}

$( document ).ready(function() {
    console.log( "ready!" );

    // Array to contain all the games automations
    var automationList = [];
    var minerU = new Automation("Miner", 5, 1, 2); 
    // Push each automations to array
    automationList.push(minerU);

    for(var i = 0; i < automationList.length; i++){

        automation = automationList[i];
        buttonID = "#buy-" + automation.name;
        console.log(buttonID);
        $("#Automation-Shop").append(automation.button());
        $(buttonID).data(automation);
        $(buttonID).click(function () {
            $(buttonID).data().clicked();
        });
    }

});