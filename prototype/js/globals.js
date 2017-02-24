// the globalists
var clicker = new Clicker(Cookies.getJSON('clicker'));
var resources = (Cookies.get('resources') ? parseInt(Cookies.get('resources')) : 0);



// retrieve Clicker Upgrades
var upgradeList = [];

$.getJSON( "js/clickerUpgrades.json", function( data ) {
  var items = [];
  $.each( data, function(i,item ) {
      console.log(data[i].name);
      upgradeName = data[i].id;
      var upgradeName = new Upgrade(data[i].name, data[i].cost, data[i].muliplierAdd, data[i].baseGatherRateAdd, data[i].upgradeType); 
      upgradeList.push(upgradeName);
      console.log(data[i].name + ': Has been added.');
  });
 
});


var usedUpgrades = Cookies.getJSON('usedUpgrades') ? Cookies.getJSON('usedUpgrades') : [];
for (var i = 0; i < usedUpgrades.length; i++) {
    delete(upgradeList[usedUpgrades[i]]);
}

// Retrieve Automation Upgrades
var automationList = [];

$.getJSON( "js/automationUpgrades.json", function( data ) {
  var items = [];
  $.each( data, function(i,item ) {
      console.log(data[i].name);
      upgradeName = data[i].id;
      var upgradeName = new Upgrade(data[i].name, data[i].cost, data[i].muliplier, data[i].baseGatherRate, data[i].number); 
      automationList.push(upgradeName);
      console.log(data[i].name + ': Has been added.');
  });
 
});


for(var automationName in automationList){
    automation = Cookies.getJSON(automationName);
    if (automation) {
        automationList[automationName] = new Automation(
            automation.name, 
            automation.baseCost,
            automationList.muliplier,
            automationList.baseGatherRate,
            automation.number
        );
    }
}

// prep the buttons
$(document).ready(function () {
    function callButtonClick() {
        $(this).data().clicked();
    }
    for (var name in upgradeList) {
        upgrade = upgradeList[name];
        var upgradeButtonID = "#buy-" + upgrade.name;
        $("#Upgrade-Shop").append(upgrade.button());
        $(upgradeButtonID).data(upgrade);
        $(upgradeButtonID).click(callButtonClick);
    }
    for(var automationName in automationList){
        var automation = automationList[automationName];
        var automationButtonID = "#buy-" + automation.name;
        $("#Automation-Shop").append(automation.button());
        $(automationButtonID).data(automation);
        $(automationButtonID).click(callButtonClick);
    }
});
