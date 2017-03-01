function Upgrade (name, cost, multiplierAdd, baseGatherRateAdd, upgradeType, uAutomationName) {
    this.name = name;
    this.cost = cost;
    this.multiplierAdd = multiplierAdd;
    this.baseGatherRateAdd = baseGatherRateAdd;
    this.upgradeType = upgradeType;
    this.uAutomationName = uAutomationName;

    this.getInfo = function() {
        return this.cost + ' ' + this.type + ' ' + this.multiplierAdd + ' ' + this.baseGatherRateAdd + ' ' + this.upgradeType;
    };

    this.clicked = function() {
        var cost = parseInt(this.cost);
        var baseGatherRateAdd = parseInt(this.baseGatherRateAdd);
        var multiplierAdd = parseInt(this.multiplierAdd);
        if (resources >= cost) {
            var toUpgrade = null;
            switch(this.upgradeType) {
                case 'clicker':
                    toUpgrade = clicker;
                    break;
                //case 'automation':
                case 'automation':
                    toUpgrade = automationList[this.uAutomationName];
                    break;
            }
            resources -= cost;
            Cookies.set('resources', resources);
            toUpgrade.updateBaseGatherRate(baseGatherRateAdd);
            toUpgrade.updateMultiplier(multiplierAdd);
            var buttonID = "#buy-" + this.name;
            $(buttonID + ' + br').remove();
            $(buttonID).remove();
            var usedUpgrades = Cookies.getJSON('usedUpgrades') ? Cookies.getJSON('usedUpgrades') : [];
            usedUpgrades.push(this.name);
            Cookies.set('usedUpgrades', usedUpgrades);
        }
    };

    this.button = function() {
        return '<button id="buy-' + this.name + '" class="btn btn-success" >Buy ' + this.name.replace(/\-/g, ' ') + ' (' + this.cost + ')' + '</button></br>'; 
    };
}

