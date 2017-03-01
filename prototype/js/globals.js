// the globalists
var clicker = new Clicker(Cookies.getJSON('clicker'));
var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);

// retrieve Clicker Upgrades
var upgradeList = [];

$.getJSON( "js/clickerUpgrades.json", function( data ) {
  var items = [];
  $.each( data, function(i,item ) {
      upgradeName = data[i].id;
      var upgradeName = new Upgrade(data[i].name, data[i].cost, data[i].multiplierAdd, data[i].baseGatherRateAdd, data[i].upgradeType,null); 
      upgradeList.push(upgradeName);
      console.log(data[i].name + ': Has been added.');
  });
 
});

//usedUpgrades

var usedUpgrades = Cookies.getJSON('usedUpgrades') ? Cookies.getJSON('usedUpgrades') : [];
for (var i = 0; i < usedUpgrades.length; i++) {
    delete(upgradeList[usedUpgrades[i]]);
}

// Retrieve Automation Upgrades
var automationList = [];

$.getJSON( "js/automationUpgrades.json", function( data ) {
  var items = [];
  $.each( data, function(i,item ) {
      automationName = data[i].name;
      var automationName = new Automation(data[i].name, data[i].cost, data[i].multiplier, data[i].baseGatherRate, data[i].number); 
      automationList[data[i].name] = automationName;
      console.log(data[i].name + ': Has been added.');
  });
 
});


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
        console.log(automation);
        
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
