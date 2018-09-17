const goblin = new Creature({
    name: "Goblin",
})

const hobGoblin = new Creature({
    name: "Hob Goblin",
    health: 200,
    chanceToMiss: .2,
    baseDamage: 40,
})

const goblinLeader = new Creature({
    name: "Greknack Clinker",
    health: 500,
    chanceToCrit: .2,
    chanceToMiss: .2,
    baseDamage: 25,
})

function goblinKing(options) {
    Creature.call(this, options);
}
goblinKing.prototype = Object.create(Creature.prototype);
goblinKing.prototype.constructor = goblinKing;