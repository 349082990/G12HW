[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/lc5wScvN)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-7f7980b617ed060a017424585567c406b6ee15c891e84e1186181d67ecf80aa0.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=15104087)
# Instructions  

## Marking Scheme
- **10A** Code functionality (code reusability, redundant code, property/method names, etc)
- **10K** Design (use of design patterns, classes, and OOP principles)
- **25%** of the mark will be based on an in class quiz. 
- Weighted out of 5.

Continuing from animal battle 1...

#### Game
- Users pick one animal. The user can pick an animal for the computer or the computer can randomly pick an animal.
- When the battle is over, the user can choose to play again.

#### Animals
- Animal now perform special attacks
- Every turn animals have a 10% chance to use their special instead of their attack
- Add the animal Bear.  The Bear should have 100 attack and 100 defense.  It should have 300 health.  Override the Attack so that it has a random damage, between the maximum which is twice that of the normal damage calculation with a minimum possible damage of 10.  In addition, it should have a defense that will allow the bear to receive a maximum damage of 35.
    - Bears has a special which lets it sleep for one turn and recovers 35 HP
- Create a GrizzlyBear.  The GrizzlyBear should have 150 attack and 150 defense, and 400 health.  Override the Attack so that it does random damage with a minimum value of 15, and a defense with a maximum damage of 30.
    - GrizzlyBear has a special which lets it sleep for one turn and recover 50 HP
- Add the animal Skunk. The Skunk should have 70 attack, 70 defense, and 120 health.
    - Skunks have a special which deals 5% of the opponent's max health. 
- Create a AlbinoSkunk with an extra 20 attack, 20 defense, and 50 extra hp. 
  - Special deals 10% of opponent's max health.
- There is a MegaBull with 20 extra defense and 150 extra hp
- There is a GiantTiger with 15 extra attack and 50 extra hp
- There is a BaldEagle with 10 extra attack, 10 extra defences, and 100 extra hp
- The bulls can moo which reduces the opponent's defense 15
  - MegaBulls megamoos which reduces the opponent's defense by 25
- Tigers have a special called roar, increasing its attack by 15
  - GiantTigers have a special where it giantRoars, increasing its attack by 25
- Eagles have a special called dive which allows it to dodge the next attack and deal its attack in damage
  - BaldEagles have a special called aerial assault where it dodges the next attack and deal its attack with 15 extra damage
- Create two other animals to the game (perhaps something that can actually beat the grizzly bear)
- Create two other mechanics to the game (up to you what to add, perhaps a crit systems, items, etc)