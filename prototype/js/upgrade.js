function Upgrade (name, cost, multiplierAdd, baseGatherRateAdd, upgradeType) {
    this.name = name;
    this.cost = cost;
    this.multiplierAdd = multiplierAdd;
    this.baseGatherRateAdd = baseGatherRateAdd;
    this.upgradeType = upgradeType;

    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multiplierAdd + ' ' + this.baseGatherRateAdd + ' ' + this.upgradeType;
    };

    this.clicked = function() {
        var cost = parseInt(this.cost);
        var baseGatherRateAdd = parseInt(this.baseGatherRateAdd);
        var multiplierAdd = parseInt(this.multiplierAdd);
        if (resources >= cost) {
            switch(this.upgradeType) {
                case 'clicker':
                    var toUpgrade = clicker;
                    break;
                //case 'automation':
            }
            resources -= cost;
            Cookies.set('resources', resources);
            toUpgrade.updateBaseGatherRate(baseGatherRateAdd);
            toUpgrade.updateMultiplier(multiplierAdd);
            var buttonID = "#buy-" + this.name;
            $(buttonID).remove();
            var usedUpgrades = Cookies.getJSON('usedUpgrades') ? Cookies.getJSON('usedUpgrades') : [];
            usedUpgrades.push(this.name);
            Cookies.set('usedUpgrades', usedUpgrades);
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-success" >Buy ' + this.name.replace('-', ' ') + ' (' + this.cost + ')' + '</button></br>'; 
    };
}

