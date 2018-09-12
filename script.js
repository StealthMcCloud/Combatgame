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

const StealthMcCloud = new Creature({
    name: "Stealth McCloud",
    health: 500,
    chaneToCrit: .2,
    chanceToMiss: .2,
    baseDamage: 25,
})

function Creature(options) {
    if (!options.name) {
        throw (new Error("Please name your creature."))
    } else {
        this.name = options.name;
    }
    this.health = options.health || 100;
    this.maxHealth = this.health * 1.25;
    this.chanceToCrit = options.chanceToCrit || .1;
    this.chanceToMiss = options.chanceToMiss || .25;
    this.baseDamage = options.baseDamage || 20;
    this.fight = function(creature) {
        let message;
        if (Math.random() < this.chanceToMiss) {
            message = this.name + ' missed ' + creature.name + '. <br>'
        } else {
            const damage = Math.random() < this.chanceToCrit
            ? this.baseDamage * 2
            : this.baseDamage
            creature.health -= damage
            message = creature.name + ' has been hit! They are now at ' + creature.health + ' health. <br>'
        }
        document.write(message)
        return message;
    }
}

function battle(hero, ...monsters) {
    if (monsters.length === 0) {
        monsters = [new Creature({ name: "Hydra"})]
    }
    monsters.forEach(monster => {
        while (hero.health > 0 && monster.health > 0) {
            hero.fight(monster)
            monster.fight(hero)
        }
        hero.health = Math.random() > .25
        ? hero.health
        : hero.health + 1000

        document.write(hero.name + " has cast heal and has healed 100 points of damage. <br>")
        document.write( hero.name +  ' is at ' +  hero.health + ' health and ' + monster.name + ' is at ' + monster.health + ' health. <br>')
        document.write(hero.health > 0 
            ? hero.name + ' came out victorious. <br><br>'
            : monster.name + ' came out victorious. <br><br>')
    })
}


battle(StealthMcCloud, goblin, hobGoblin, goblinLeader)