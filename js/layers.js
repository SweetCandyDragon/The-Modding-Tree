//Prestige

addLayer("prestige", {
    name: "Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
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

        11: {
    title: "1",
    description: "x2 your point gain.",
    cost: new Decimal(1),
    
        },

        12: {
            title: "2",
            description: "x6 your point gain.",
            cost: new Decimal(5),

            effect() {
                return player[this.layer].points.add(6).times(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
         },

         13: {
            title: "3",
            description: "x36 your point gain.",
            cost: new Decimal(25),

            effect() {
                return player[this.layer].points.add(36).times(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('prestige', 3)) mult = mult.times(upgradeEffect('prestige', 3))
                return mult
            },
         },

         14: {
            title: "4",
            description: "x1296 your point gain.",
            cost: new Decimal(100),

            effect() {
                return player[this.layer].points.add(1296).times(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('prestige', 4)) mult = mult.times(upgradeEffect('prestige', 4))
                return mult
            },
         },

         15: {
            title: "5",
            description: "x1679616 your point gain.",
            cost: new Decimal(500),

            effect() {
                return player[this.layer].points.add(1679616).times(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('prestige', 5)) mult = mult.times(upgradeEffect('p', 5))
                return mult
            },
         },

         16: {
            title: "6",
            description: "x1679616 your point gain.",
            cost: new Decimal(2500),

            effect() {
                return player[this.layer].points.add(2821109907456).times(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect

            gainMult() {
                let mult = new Decimal(1)
                if (hasUpgrade('prestige', 6)) mult = mult.times(upgradeEffect('prestige', 6))
                return mult
            },
         },
         
    },
})

//rebirth

addLayer("rebirth", {
    name: "Rebirth", 
    symbol: "R", 
    position: 0, 
    row: 1,
    branches: ['prestige'],
    layerShown() { return !hasUpgrade('prestige', 16) ; player.rebirth.unlocked},
    increaseUnlockOrder: ['prestige'],
    resource: "rebirth points",
    color: "#0f52ba",
    type: "normal",
    requires: 10,
    baseResource: "Prestige",
    baseAmount() {return player.prestige.points},
    exponent: 0.5,
    gainMult() { 

        mult = new Decimal(1)
        return mult
        
    },
    startData() { return {
        unlocked: false,
        points: new decimal(0),

    }},

    onPress(){if (canReset(this.layer)) doReset(this.layer)},

})




