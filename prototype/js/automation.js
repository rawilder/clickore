function Automation (name, cost, multiplier, baseGatherRate) {
    this.name = name;
    this.cost = cost;
    this.baseCost = cost;
    this.multiplier = multiplier;
    this.baseGatherRate = baseGatherRate;
    this.number = 0;


    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multiplier + ' ' + this.baseGatherRate;
    };

    this.updateMultiplier = function(multiplier) {
        this.multiplier += multiplier;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(name, this);
    };

    this.updateBaseGatherRate = function(baseGatherRateAdd) {
        this.baseGatherRate += baseGatherRateAdd;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(this.name, this);
    };

    this.incrementNumber = function() {
        this.number = parseInt(this.number) + 1;
        this.gatherRate = this.baseGatherRate * this.multiplier * this.number;
        Cookies.set(this.name, this);
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-info" >Buy ' + this.name.replace('-', ' ') + ' (' + this.cost + ')' + '</button></br>'; 
    };

    // Create the .onClick function
    this.clicked = function() {
         var cost = parseInt(this.cost);
         
         // If stament is not working...I Gotta fix it :
        if (resources >= cost) {
            resources -= cost;
            console.log(resources);
            Cookies.set('resources', resources);
            this.incrementNumber();
            this.cost = Math.ceil(this.baseCost * Math.pow(1.15, this.number));
            var buttonID = "#buy-" + this.name;
            $(buttonID).text('Buy ' + this.name + ' (' + this.cost + ')');
        }
    };
}

$( document ).ready(function() {
    console.log( "ready!" );

    // Array to contain all the games automations
    var automationList = [];
    automationList.push(new Automation("Molerat", 5, 1, 1));
    automationList.push(new Automation("Miner", 100, 1, 2));
    automationList.push(new Automation("Autodrill", 1000, 1, 10));
    automationList.push(new Automation("Dwarf", 5000, 1, 20));
    automationList.push(new Automation("HAG-1", 100000, 1, 100));
    automationList.push(new Automation("Space-Laser", 1000000, 1, 1000));

    function callButtonClick() {
        $(this).data().clicked();
    }
    for(var i = 0; i < automationList.length; i++){

        var automation = automationList[i];
        var buttonID = "#buy-" + automation.name;
        console.log(buttonID);
        $("#Automation-Shop").append(automation.button());
        $(buttonID).data(automation);
        $(buttonID).click(callButtonClick);
    }

});