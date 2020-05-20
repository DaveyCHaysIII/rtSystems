//PUT A BIG W ON THE BOARD BOYS, SHE WORKS (EVEN HAB IS UP AND RUNNING)

//Base class for planets, holds all methods NOT SPECIFIC to specific planets
class Planet {
    constructor() {
        this.body            = this.getBody(this.d10()); 
        this.gravity         = this.getGravity(this.d10(), this.getGravitymod(this.body));
    }

        //Roll Functions
        d2(){
        let roll = Math.floor(Math.random()*2)+1;
        return roll;    
    }

        d3(){
        let roll = Math.floor(Math.random()*3)+1;
        return roll;    
    }

        d4(){
        let roll = Math.floor(Math.random()*4)+1;
        return roll;    
    }

        d10(){
        let roll = Math.floor(Math.random()*10)+1;
        return roll;    
    }
        
        d100(){
        let roll = Math.floor(Math.random()*100)+1;
        return roll;    
    }

    //Get Body (Table 1-6 P. 19)
        getBody(roll) {
        if(roll >= 9){
            return 'Vast';
        } else if(roll >= 8){
            return 'Large and Dense';
        }else if(roll >= 5){
            return 'Large';
        }else if(roll >= 4){
            return 'Small and Dense';
        }else if(roll >= 2){
            return 'Small';
        }else {
            return 'Low Mass';
        }
    }

    //Get Gravity (Table 1-7 P. 20)
        getGravitymod(body){
        var gravmod = 0;
        if(body === 'Vast'){
            gravmod = 4;
        } else if(body === 'Large and Dense'){
            gravmod = 5;
        } else if(body === 'Small') {
            gravmod = -5;
        } else if(body === 'Low Mass') {
            gravmod = -7;
        } else {
            gravmod = 0;
        }
        return gravmod;
    }

        getGravity(roll, mod){
        var rollmod = roll + mod;
        if(rollmod >= 9){
            return 'High Gravity';
        } else if(rollmod >= 3){
            return 'Normal Gravity';
        } else {
            return 'Low Gravity'
        }
    }

    //Get Orbital Features (Table 1-8 P. 20)
        getOrbitalFeaturesMod(gravity){
        var mod = 0;
        if(gravity === 'High Gravity'){
            mod = Math.floor(Math.random()*4)+1;
            return mod;
        } else if(gravity === 'Normal Gravity'){
            mod = Math.floor(Math.random()*3)+1;
            return mod;
        } else if(gravity === 'Low Gravity'){
            mod = Math.floor(Math.random()*2)+1;
            return mod;
            }
        }

        getOrbitalFeatures(times){
        var orbitalfeat =[];
        for(let i=0;i<times;i++){
            const roll = Math.floor(Math.random()*100)+1;
            if(roll >= 91){
                orbitalfeat.push(new Moon);
            } else if(roll >= 61 && roll <= 90){
                orbitalfeat.push('Lesser Moon');
            } else if(roll >= 46 && roll <= 60){
                orbitalfeat.push('Large Asteroid');
            } else {
                orbitalfeat.push('No Feature')
            }
        
        }
            return orbitalfeat;
        }


    //Get Atmo (Table 1-9 P. 24)
        getAtmoMod(gravity) {
        if(gravity === 'High Gravity'){
            return 1;
        } else if(gravity === 'Low Gravity'){
            return -2;
        } else {
            return 0;
        }
    }

        getAtmo(roll, mod){
        var rollmod = roll + mod;
        if(rollmod >= 10){
            return 'Heavy';
        } else if(rollmod >= 5){
            return 'Normal';
        } else if(rollmod >= 2){
            return 'Thin';
        } else {
            return 'None';
        }
    }

    //Get Atmo Composition (Table 1-10 P. 24)
        getAtmoComp(roll, atmo){
        if(atmo === 'None'){
            return 'N/A';
        } else {
            if(roll >=8){
                return 'Pure';
            } else if(roll >=6){
                return 'Tainted';
            } else if(roll >=3){
                return 'Toxic';
            } else if(roll >=2){
                return 'Corrosive';
            } else {
                return 'Deadly';
            }
        }
    }

    //Get Habitability (Table 1-12 P. 23)
        getHabMod(climate){
        if(climate ===  'Burning World' || climate === 'Ice World'){
            return -7;
        } else if(climate === 'Hot World' || climate === 'Cold World'){
            return -2;
        } else {
            return 0;
        }

    }

        getHab(roll, mod, atmo, comp){
        if(atmo === 'None'){
            return 'N/A';
        } else if(comp !== 'Pure' && comp !== 'Tainted'){
            return 'N/A';
        } else {
            var rollmod = roll + mod;
            if(rollmod >=8){
                return 'Verdant';
            } else if(rollmod >= 6){
                return 'Limited Ecosystem';
            } else if(rollmod >= 4){
                return 'Liquid Water';
            } else if(rollmod >=2){
                return 'Trapped Water';
            } else{
                return 'Not suitable for life';
            }
        }
    }

    
}

//Subclass - planets falling in the inner zone (cruical to climate functionality)
class InnerPlanet extends Planet {
    constructor(){
        super(Planet);
        this.orbitalFeatures = this.getOrbitalFeatures(this.getOrbitalFeaturesMod(this.gravity));
        this.atmo            = this.getAtmo(this.d10(), this.getAtmoMod(this.gravity));
        this.atmocomp        = this.getAtmoComp(this.d10(), this.atmo);
        this.climate         = this.getInnerClimate(this.d4(), this.atmo);
        this.hab             = this.getHab(this.d10(), this.getHabMod(this.climate), this.atmo, this.atmocomp);
    };
    //Get Climate (Table 1-11 P. 22)
    getInnerClimate(roll, atmo){
        
        if(atmo === 'None'){
            return 'Burning World'
        }else{
            if(roll > 10){
                return 'Ice World';
            } else if(roll >=8){
                return 'Cold World';
            } else if(roll >=4){
                return 'Temperate World';
            } else if(roll >=1){
                return 'Hot World';
            } else {
                return 'Burning World';
            }
        }
    }
}

//Subclass - planets falling in the Primary zone (cruical to climate functionality)
class PrimaryPlanet extends Planet {
    constructor(){
        super(Planet);
        this.orbitalFeatures = this.getOrbitalFeatures(this.getOrbitalFeaturesMod(this.gravity));
        this.atmo            = this.getAtmo(this.d10(), this.getAtmoMod(this.gravity));
        this.atmocomp        = this.getAtmoComp(this.d10(), this.atmo);
        this.climate         = this.getPrimaryClimate(this.d10(), this.atmo);
        this.hab             = this.getHab(this.d10(), this.getHabMod(this.climate), this.atmo, this.atmocomp);
    }
    //Get Climate (Table 1-11 P. 22)
    getPrimaryClimate(roll, atmo){
        if(atmo === 'None'){
            let choice = this.d2();
            if(choice = 1){
                return 'Ice World'
            } else {
            return 'Burning World'
            }
        } else {
            if(roll > 10){
                return 'Ice World';
            } else if(roll >=8){
                return 'Cold World';
            } else if(roll >=4){
                return 'Temperate World';
            } else if(roll >=1){
                return 'Hot World';
            } else {
                return 'Burning World';
            }
        }
    }
}

//Subclass - planets falling in the Outer zone (cruical to climate functionality)
class OuterPlanet extends Planet {
    constructor(){
        super(Planet);
        this.orbitalFeatures = this.getOrbitalFeatures(this.getOrbitalFeaturesMod(this.gravity));
        this.atmo            = this.getAtmo(this.d10(), this.getAtmoMod(this.gravity));
        this.atmocomp        = this.getAtmoComp(this.d10(), this.atmo);
        this.climate         = this.getOuterClimate(this.d10(), this.atmo);
        this.hab             = this.getHab(this.d10(), this.getHabMod(this.climate), this.atmo, this.atmocomp);
    }
    //Get Climate (Table 1-11 P. 22)
    getOuterClimate(roll, atmo){
        if(atmo === 'None'){
            return 'Ice World'
        }else{
            if(roll+6 > 10){
                return 'Ice World';
            } else if(roll+6 >=8){
                return 'Cold World';
            } else if(roll+6 >=4){
                return 'Temperate World';
            } else if(roll+6 >=1){
                return 'Hot World';
            } else {
                return 'Burning World';
            }
        }
    }
}

//Subclass - planets that are moons (cruical to orbital feature functionality)
class Moon extends Planet {
    constructor(){
        super(Planet);
        this.atmo            = this.getAtmo(this.d10(), this.getAtmoMod(this.gravity));
        this.atmocomp        = this.getAtmoComp(this.d10(), this.atmo);
        this.climate         = this.getMoonClimate(this.d10(), this.atmo);
        this.hab             = this.getHab(this.d10(), this.getHabMod(this.climate), this.atmo, this.atmocomp);
    }
    getMoonClimate(roll, atmo){
        if(atmo === 'None'){
            let choice = this.d2();
            if(choice = 1){
                return 'Ice World'
            } else {
            return 'Burning World'
            }
        } else {
            if(roll > 10){
                return 'Ice World';
            } else if(roll >=8){
                return 'Cold World';
            } else if(roll >=4){
                return 'Temperate World';
            } else if(roll >=1){
                return 'Hot World';
            } else {
                return 'Burning World';
            }
        }
    }
}

//Gas Giants, 
class GasGiant{
    constructor(){
        
    }
    d5(){
        let roll = Math.floor(Math.random()*5)+1;
        return roll; 
    }
    d7(){
        let roll = Math.floor(Math.random()*7)+1;
        return roll; 
    }
    d10(){
        let roll = Math.floor(Math.random()*10)+1;
        return roll;    
    }
    d100(){
        let roll = Math.floor(Math.random()*100)+1;
        return roll;    
    }
    getGasBody(roll){
        if(roll >= 9){
            return 'Massive Gas Giant';
        } else if(roll >= 3){
            return 'Gas Giant';
        } else{
            return 'Gas Dwarf';
        }
    }
    getTitanCheck(roll){
        if(roll == 10){
            return true;
        } else {
            return false;
        }
    }
    getInnerGasGravMod(body){
        if(body === 'Gas Dwarf'){
            return -5;
        }else if(body === 'Gas Giant'){
            return 0;
        }else if(body === 'Massive Gas Giant'){
            return 3;
        }
    }
    getOuterGasGravMod(body, titanCheck){
        if(titanCheck === true){
            return 10;
        } else if(body === 'Gas Dwarf'){
            return -5;
        }else if(body === 'Gas Giant'){
            return 0;
        }else if(body === 'Massive Gas Giant'){
            return 3;
        }
    }
    getGasGrav(roll, mod){
        let rollmod = roll + mod;
        if(rollmod >= 10){
            return 'Titanic';
        } else if(rollmod >= 7){
            return 'Powerful';
        } else if(rollmod >= 3){
            return 'Strong';
        } else {
            return 'Weak';
        }
    }
    getGasOrbFeatMod(gravity){
        if(gravity === 'Titanic'){
            return 30;
        }else if(gravity === 'Powerful'){
            return 20;
        }else if(gravity === 'Strong'){
            return 15;
        }else {
            return 10;
        }
    }
    getGasOrbFeatNumber(gravity){
        if(gravity == 'Titanic'){
            return this.d5() + this.d5() + this.d5() + 3
        }else if(gravity == 'Powerful'){
            return this.d10() + 2;
        }else if(gravity == 'Strong'){
            return this.d7();
        }else if(gravity == 'Weak'){
            return this.d5();
        }else{
            return this.d5();
        }
    }
    getGasOrbFeat(mod, num){
        let orbFeat = []
        for(let i=0; i<=num; i++){
            let roll = Math.floor(Math.random()*100)+1;
            let rollmod = roll + mod;
            if(rollmod >= 86){
                orbFeat.push(new Moon());
            } else if(rollmod >= 51){
                orbFeat.push('Lesser Moon');
            } else if(rollmod >= 36){
                orbFeat.push('Planetary Rings (Dust)');
            } else if(rollmod >= 21){
                orbFeat.push('Planetary Rings (Debris)');
            } else {
                orbFeat.push('No Feature');
            }
        } return orbFeat;

    }
}

class InnerGiant extends GasGiant{
    constructor(){
        super();
        this.type = 'Gas';
        this.body = this.getGasBody(this.d10());
        this.gravity = this.getGasGrav(this.d10(), this.getInnerGasGravMod(this.body));
        this.orbitalFeatures = this.getGasOrbFeat(this.getGasOrbFeatMod(this.gravity), this.getGasOrbFeatNumber(this.gravity));
    }
}
class OuterGiant extends GasGiant{
    constructor(){
        super();
        this.type = 'Gas';
        this.body = this.getGasBody(this.d10());
        this.gravity = this.getGasGrav(this.d10(), this.getOuterGasGravMod(this.body, this.getTitanCheck()));
        this.orbitalFeatures = this.getGasOrbFeat(this.getGasOrbFeatMod(this.gravity), this.getGasOrbFeatNumber(this.gravity));
    }
}
const genOuterGiant = new OuterGiant();
console.log(genOuterGiant);
const genInnerGiant = new InnerGiant();
console.log(genInnerGiant);

// // Planet Actual
// const genInnerPlanet = new InnerPlanet();
// const genPrimaryPlanet = new PrimaryPlanet();
// const genOuterPlanet = new OuterPlanet();
// const genMoon = new Moon();
    
// console.log(genInnerPlanet);
// console.log(genPrimaryPlanet);
// console.log(genOuterPlanet);
// console.log(genMoon);