addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    buyables: {
        11: {
            cost(x) { return new Decimal(1).mul(x) },
            title: "Point Boost #1",
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
                {
                 player[this.layer].points = player[this.layer].points.sub(this.cost())
                }
            },
             display() 
             { // Everything else displayed in the buyable button after the title
               let data = tmp[this.layer].buyables[this.id]
               return "Cost: " + format(data.cost) + " Prestige Points\n\
               Amount: " + player[this.layer].buyables[this.id] + " \n\
               x" + format(data.effect) + " boost to Points";
             },
            effect() 
            {
                return player[this.layer].buyables[this.id].pow(0.95).mul(player.cc.cookiebibleeffect).add(1)
            },
        },
    }
})
