function Automation (name, cost, multiplier, baseGatherRate, number) {
    this.name = name;
    this.cost = cost;
    this.baseCost = cost;
    this.multiplier = multiplier;
    this.baseGatherRate = baseGatherRate;
    this.number = number;
    this.gatherRate = this.baseGatherRate * this.multiplier * this.number;


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
        var countID = "#" + this.name + "-count";
        $(countID).val(this.number);
    };

    this.button = function() {
        var button = '<button id="buy-' + this.name + '" class="btn btn-info" >Buy ' + this.name.replace('-', ' ') + ' (' + this.cost + ')' + '</button>';
        var span = '<span class="input-group-btn">' + button + '</span>';
        var numberDisplay = '<input id="' + this.name + '-count" type="text" class="form-control" value="' + this.number + '"disabled>';
        var div = '<div class="input-group">' + span + numberDisplay + '</div>';
        return div; 
    };

    this.clicked = function() {
        var cost = parseInt(this.cost);
        if (resources >= cost) {
            resources -= cost;
            Cookies.set('resources', resources);
            this.incrementNumber();
            this.cost = Math.ceil(this.baseCost * Math.pow(1.15, this.number));
            var buttonID = "#buy-" + this.name;
            $(buttonID).text('Buy ' + this.name + ' (' + this.cost + ')');
        }
    };
}
