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

    upgrades: {

        1: {
    title: "Point Boost",
    description: "x2 your point gain.",
    cost: new Decimal(1),
    effect() {
        return player[this.layer].points.add(2).pow(0.5)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"1" }, // Add formatting to the effect
        },

        2: {
            title: "Point Boost 2",
            description: "x3 your point gain.",
            cost: new Decimal(2),

            effect() {
                return player[this.layer].points.add(3).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"2" }, // Add formatting to the effect
         },

         3: {
            title: "Point Boost 3",
            description: "x4 your point gain.",
            cost: new Decimal(2),

            effect() {
                return player[this.layer].points.add(4).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"3" }, // Add formatting to the effect

            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 3))
                return mult
            },
         },

         
    },
})
