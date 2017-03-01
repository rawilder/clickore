// the globalists
var clicker = new Clicker(Cookies.getJSON('clicker'));
var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);

// prep upgrades
var upgradeList = {
    "Pickaxe" : new Upgrade("Pickaxe", 10, 0, 1, "clicker", null),
    "Another-Pickaxe" : new Upgrade("Another-Pickaxe", 80, 0, 2, "clicker", null),
    "Pickaxes-For-All" : new Upgrade("Pickaxes-For-All", 80, 0, 2, "automation", "Miner"),
    "Handheld-Drill" : new Upgrade("Handheld-Drill", 350, 0, 3, "clicker", null),
    "Diamond-Drillbit" : new Upgrade("Diamond-Drillbit", 1300, 0, 4, "clicker", null),
    "Strength-Training" : new Upgrade("Strength-Training", 3000, 1, 5, "clicker", null),
    "Steroids" : new Upgrade("Steroids", 6200, 0, 6, "clicker", null)
};
var usedUpgrades = Cookies.getJSON('usedUpgrades') ? Cookies.getJSON('usedUpgrades') : [];
for (var i = 0; i < usedUpgrades.length; i++) {
    delete(upgradeList[usedUpgrades[i]]);
}

// prep automations
var automationList = {
    "Molerat" : new Automation("Molerat", 5, 1, 1, 0),
    "Miner" : new Automation("Miner", 100, 1, 2, 0),
    "Autodrill" : new Automation("Autodrill", 1000, 1, 10, 0),
    "Dwarf" : new Automation("Dwarf", 5000, 1, 20, 0),
    "HAG-1" : new Automation("HAG-1", 100000, 1, 100, 0),
    "Space-Laser" : new Automation("Space-Laser", 1000000, 1, 1000, 0)
};

for(var automationName in automationList){
    automation = Cookies.getJSON(automationName);
    if (automation) {
        automationList[automationName] = new Automation(
            automation.name, 
            automation.baseCost,
            automation.multiplier,
            automation.baseGatherRate,
            automation.number
        );
    }
}

// prep the buttons
$(document).ready(function () {
    function callUpgradeClick() {
        $(this).data().clicked();
    }
    function callAutomationClick() {
        var automationName = $(this).attr('id').replace('buy-', ''); 
        var automation = automationList[automationName];
        automation.clicked();
    }
    for (var name in upgradeList) {
        upgrade = upgradeList[name];
        var upgradeButtonID = "#buy-" + upgrade.name;
        $("#Upgrade-Shop").append(upgrade.button());
        $(upgradeButtonID).data(upgrade);
        $(upgradeButtonID).click(callUpgradeClick);
    }
    for(var automationName in automationList){
        var automation = automationList[automationName];
        var automationButtonID = "#buy-" + automation.name;
        $("#Automation-Shop").append(automation.button());
        $(automationButtonID).data(automationName);
        $(automationButtonID).click(callAutomationClick);
    }
});
