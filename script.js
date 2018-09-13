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
    this.fight = function (creature) {
        let message;
        if (Math.random() < this.chanceToMiss) {
            message = this.name + ' missed ' + creature.name + '. '
        } else {
            const damage = Math.random() < this.chanceToCrit
                ? this.baseDamage * 2
                : this.baseDamage
            creature.health -= damage
            message = creature.name + ' has been hit! They are now at ' + creature.health + ' health. '
        }
        let newDiv = document.createElement("div");
        let battleMessage = document.createTextNode(message);
        newDiv.appendChild(battleMessage);
        document.body.appendChild(newDiv)
    }
}
Creature.prototype.attack = document.getElementById("Fight").addEventListener("click", function () {battle(StealthMcCloud, goblin)});

function imageAdder(creature) {
    const image = document.createElement('img');
    if (creature.name === "Goblin") {
        image.classList.add("goblin");
        document.body.appendChild(image);

    }
    if (creature.name === "Hob Goblin") {
        image.classList.add("hobGoblin");
        image.style.transform = "scaleX(-1)"
        document.body.appendChild(image);
    }
    if (creature.name === "Greknack Clinker") {
        image.classList.add("goblinLeader");
        document.body.appendChild(image);
    }
    if (creature.name === "Stealth McCloud") {
        image.classList.add("StealthMcCloud");
        document.body.appendChild(image);
    }
    return image;
}

Creature.prototype.ability = "Power Attack";

Creature.prototype.item = "Potion";

function battle(hero, ...monsters) {
    console.log(monsters);
    imageAdder(hero);
    // imageAdder()
    if (monsters.length === 0) {
        monsters = [new Creature({ name: "Hydra" })]
    }
    monsters.forEach(monster => {
        imageAdder(monster);
        while (hero.health > 0 && monster.health > 0) {
            hero.fight(monster)
            monster.fight(hero)
        }
        // hero.health = Math.random() > .25
        // ? hero.health
        // : hero.health + 500

        let newDiv = document.createElement("div");
        let battleMessage2 = document.createTextNode(hero.name + ' is at ' + hero.health + ' health and ' + monster.name + ' is at ' + monster.health + ' health. ');
        let victory = document.createTextNode(hero.health > 0
            ? hero.name + ' came out victorious. '
            : monster.name + ' came out victorious. ')
        newDiv.appendChild(battleMessage2,);
        newDiv.appendChild(victory);
        document.body.appendChild(newDiv);
    })
}

function ResetBattle() {
    location.reload();
}