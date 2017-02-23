function Clicker (clickerData) {
    this.multiplier = clickerData ? parseInt(clickerData.multiplier) : 1;
    this.baseGatherRate = clickerData ? parseInt(clickerData.baseGatherRate) : 1;
    this.gatherRate = this.baseGatherRate * this.multiplier;
    Cookies.set('clicker', this)

    this.getInfo = function() {
        return this.multiplier + ' ' + this.type + ' ' + this.baseGatherRate;
    };

    this.updateMultiplier = function(multiplier) {
        this.multiplier += multiplier;
        this.gatherRate = this.baseGatherRate * this.multiplier;
        Cookies.set('clicker', this)
    };

    this.updateBaseGatherRate = function(baseGatherRateAdd) {
        this.baseGatherRate += baseGatherRateAdd;
        this.gatherRate = this.baseGatherRate * this.multiplier;
        Cookies.set('clicker', this)
    }
}
