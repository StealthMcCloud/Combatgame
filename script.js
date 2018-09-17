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
    this.imageAdded = false;
    this.fight = function (creature) {
        let message;
        if (Math.random() < this.chanceToMiss) {
            message = this.name + ' missed ' + creature.name + '. '
        } else {
            const damage = Math.random() < this.chanceToCrit
                ? this.baseDamage * 2
                : this.baseDamage
            creature.health -= damage
            message = creature.name + ' has been hit!'
        }
        let newDiv = document.createElement("div");
        let battleMessage = document.createTextNode(message);
        newDiv.appendChild(battleMessage);
        document.body.appendChild(newDiv)
    }
}
let fight = document.getElementById("Fight").addEventListener("click", function () { battle(StealthMcCloud, new goblinKing({name: "Jareth", health: 1000, chanceToCrit: .25, chanceToMiss: .1, baseDamage: 30}))});
// let endBattle = document.getElementById("Fight").removeEventListener("click", function() {battle() });

//have it set to create a special profiles div
function imageAdder(creature) {
    const image = document.createElement('img');
    const creatureStyles = {
        "Goblin": () => image.classList.add("goblin"),
        "Hob Goblin": () => image.classList.add("hobGoblin"),
        "Greknack Clinker": () => image.classList.add("goblinLeader"),
        "Stealth McCloud": () => image.classList.add("StealthMcCloud"),
        "Jareth": () => image.classList.add("goblinKing"),
    }
    creature.imageAdded = true;
    creatureStyles[creature.name]()
    document.body.appendChild(image);
}

Creature.prototype.ability = "Power Attack";

Creature.prototype.item = "Potion";

Creature.prototype.magic = "Heal";

function battle(hero, ...monsters) {
        if (hero.imageAdded === false) imageAdder(hero);
    if (monsters.length === 0) {
        monsters = [new Creature({ name: "Hydra" })]
    }
    monsters.forEach(monster => {
        if (monster.imageAdded === false) imageAdder(monster);
        if (hero.health <= 0 || monster.health <= 0) {
            let newDiv = document.createElement("div");
            let victory = document.createTextNode(hero.health > 0
                ? hero.name + ' came out victorious. '
                : monster.name + ' came out victorious. ')
            newDiv.appendChild(victory);
            document.body.appendChild(newDiv);
        }

        else if (hero.health > 0 && monster.health > 0) {
            hero.fight(monster)
            monster.fight(hero)
            let newDiv = document.createElement("div");
            let battleMessage2 = document.createTextNode(hero.name + ' is at ' + hero.health + ' health and ' + monster.name + ' is at ' + monster.health + ' health. ');
            newDiv.appendChild(battleMessage2);
            document.body.appendChild(newDiv);
        }
        // hero.health = Math.random() > .25
        // ? hero.health
        // : hero.health + 500

    })
}

function ResetBattle() {
    location.reload();
}

//create function to check the profiles to see if they exist in the given div 
function profilesAreLoaded() {
    return false;
}