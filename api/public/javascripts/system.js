// //TODO: fix Binary, include system feature conditions

//---------------------------------
// Class Structure

class System{
    constructor(){
        
        this.star            = this.starGen(this.d10());
        this.innerElements   = this.innerElemPop(this.systemElem(this.star));
        this.primaryElements = this.primaryElemPop(this.systemElem(this.star));
        this.outerElements   = this.outerElemPop(this.systemElem(this.star));
        this.features        = this.featureGen(this.d10());
    }

    d2(){
        const roll = Math.floor(Math.random()*2)+1
        return roll;    
    }
    
    d3(){
        const roll = Math.floor(Math.random()*3)+1
        return roll;    
    }
    
    d4(){
        const roll = Math.floor(Math.random()*4)+1
        return roll;    
    }
    
    d5(){
        const roll = Math.floor(Math.random()*5)+1
        return roll;    
    }
    
    d7(){
        const roll = Math.floor(Math.random()*7)+1
        return roll;    
    }
    
    d9(){
        const roll = Math.floor(Math.random()*9)+1
        return roll;    
    }
    
    d10(){
        const roll = Math.floor(Math.random()*10)+1
        return roll;    
    }
    
    d100(){
        const roll = Math.floor(Math.random()*100)+1
        return roll;    
    }

    starGen(roll){
        if(roll==1){
            return "Mighty"
        };
        if(roll>=2 && roll<=4){
            return "Vigorous"
        }
        if(roll==5||roll==6||roll==7){
            return "Luminous"
        }
        if(roll==8){
            return "Dull"
        }
        if(roll==9){
            return "Anomalous"
        }
        if(roll==10){
            let starbinary=[];
            starbinary[0]=this.starGen(this.d9());
            starbinary[1]=this.starGen(this.d9());
            return starbinary;
        }
    }

    systemElem(star){
        let innerCount = 0;
        let primCount = 0;
        let outCount = 0;
        if(star === 'Mighty'){
            innerCount = this.d7();
            primCount = this.d3();
            outCount = this.d5();
        } else if(star === 'Vigorous'){
            innerCount = this.d5();
            primCount = this.d5();
            outCount = this.d5();
        } else if(star === 'Luminous'){
            innerCount = this.d3();
            primCount = this.d5();
            outCount = this.d5();
        } else if(star === 'Dull'){
            innerCount = this.d5();
            primCount = this.d5();
            outCount = this.d7();
        } else {
            innerCount = this.d5();
            primCount = this.d5();
            outCount = this.d5();
        }
        return [innerCount, primCount, outCount]
    } 
    
    innerElemPop(count){
        let innerElems = [];
        for(let i=0;i<count[0];i++){
            innerElems.push(this.innerGen(this.d100()));
        } return innerElems;
    }
    primaryElemPop(count){
        let primaryElems = [];
        for(let i=0;i<count[1];i++){
            primaryElems.push(this.primaryGen(this.d100()));
        } return primaryElems;
    }
    outerElemPop(count){
        let outerElems = [];
        for(let i=0;i<count[2];i++){
            outerElems.push(this.outerGen(this.d100()));
        } return outerElems;
    }

    innerGen(initial){
        if(initial >= 89){
            return 'Solar Flares';
        } else if(initial >= 77){
            return 'Radiation Bursts';
        } else if(initial >= 57){
            return 'Planet'; //new InnerPlanet();
        } else if(initial >= 46){
            return 'Gravity Riptide'
        } else if(initial >= 42){
            return 'Gas Giant'; //new InnerGiant();
        } else if(initial >= 30){
            return 'Dust Cloud';
        } else if(initial >= 21){
            return 'Asteroid Cluster';
        } else {
            return 'No Feature';
        }
    }
    
    primaryGen(initial){
        if(initial >= 94){
            return 'Starship Graveyard';
        } else if(initial >= 65){
            return 'Planet';//new PrimaryPlanet();
        } else if(initial >= 59){
            return 'Gravity Riptide';
        } else if(initial >= 48){
            return 'Dust Cloud'
        } else if(initial >= 42){
            return 'Derelict Station';
        } else if(initial >= 31){
            return 'Asteroid Cluster';
        } else if(initial >= 21){
            return 'Asteroid Belt';
        } else {
            return 'No Feature';
        }
    }
    
    outerGen(initial){
        if(initial >= 94){
            return 'Starship Graveyard';
        } else if(initial >= 81){
            return 'Planet'; //new OuterPlanet();
        } else if(initial >= 74){
            return 'Gravity Riptide';
        } else if(initial >= 56){
            return 'Gas Giant'; //new OuterGiant();
        } else if(initial >= 47){
            return 'Dust Cloud';
        } else if(initial >= 41){
            return 'Derelict Station'
        }else if(initial >= 30){
            return 'Asteroid Cluster';
        } else if(initial >= 21){
            return 'Asteroid Belt';
        } else {
            return 'No Feature';
        }
    }

    featureGen(roll){

        //Bountiful
        if(roll==1){
            let zonePlace = this.d3();
            if(zonePlace == 1){
                this.innerElements.push('Asteroid Belt');
                console.log(`An asteroid belt detected in system interior`);
            } else if(zonePlace == 2){
                this.primaryElements.push('Asteroid Belt');
                console.log(`An asteroid belt detected in system primary`);
            } else if(zonePlace == 3){
                this.outerElements.push('Asteroid Belt')
                console.log('An asteroid belt detected in system exterior')
            }
            return "Bountiful"
            //Add 1 Asteroid belt/cluster to any 1 zone
        }

        //Gravity Tides
        if(roll==2){
            let gravTides = this.d5();
            for(let i=0; i < gravTides; i++){
                const randZone = this.d10();
                if(randZone >= 7){
                    console.log('Heavy gravity tides detected in outer zone');
                    this.outerElements.push('Gravity Tide');
                } else if(randZone >= 4){
                    console.log('Heavy gravity tides detected in primary zone');
                    this.primaryElements.push('Gravity Tide');
                } else {
                    console.log('Heavy gravity tides detected in inner zone');
                    this.innerElements.push('Gravity Tide');
                }
            }
            return "Gravity Tides"
            //Add 1d5 Gravity Riptides distributed to any zones
        }

        //Haven
        if(roll==3){
            //Add 1 Planet to each zone
            //this.outerElements.push(new OuterPlanet());
            //this.innerElements.push(new InnerPlanet());
            //this.primaryElements.push(new PrimaryPlanet());
            //Planets in Primary +1 to atmo, +2 to atmocomp, no idea how to implement
            //All planets add +2 to Hab, no idea how to implement --CORRECTION
            //We know how to do it now, it's just gonna involve making a new set of sub classes
            console.log('Possible life-supporting planets detected in this system');
            return "Haven";
        }

        //Ill-Omened
        if(roll==4){
            console.log('Crew cortisol and adrenaline hormones increased by 20%')
            return "Ill-Omened";
            //N/A
        }

        //Pirate Den
        if(roll==5){
            console.log('Warning: Hostile ships detected');
            return "Pirate Den";
            //N/A
        }

        //Ruined Empire
        if(roll==6){
            console.log('Unidentified structures detected');
            return "Ruined Empire";
            //N/A
        }

        //Starfarers
        if(roll==7){
            // //find total number of planets
            // const totalSystemElements = this.innerElements.concat(this.outerElements, this.primaryElements);
            // let planetCount = 0;
            // for(let i=0; i<totalSystemElements; i++){
            //     if(typeof totalSystemElements[i] == 'object'){
            //         if(totalSystemElements[i].type = 'Rocky'){
            //             planetCount++
            //         }
            //     } 
            // }
            // //if total number of Planets < 4, add (4-total) Planets
            // if(planetCount <4){
            //     console.log(planetCount);
            //     for(let i=0; i<4-planetCount; i++){
            //         let place = Math.floor(Math.random()*3)+1;
            //         if( place == 1){
            //             this.innerElements.push(new InnerPlanet());
            //         } else if(place == 2){
            //             this.primaryElements.push(new PrimaryPlanet());
            //         } else {
            //             this.outerElements.push(new OuterPlanet());
            //         }
            //     }
            // }
            console.log('Warning: Space Faring Society Detected');
            return "Starfarers";
            //minimum 4 planets
        }

        //Stellar Anomaly
        if(roll==8){
            //find total number of Planets
            const totalSystemElements = this.innerElements.concat(this.outerElements, this.primaryElements);
            let planetCount = 0;
            for(let i=0;i<totalSystemElements.length;i++){
                if(typeof totalSystemElements[i] == 'object'){
                    if(totalSystemElements[i].type = 'Rocky'){
                        planetCount++
                    }
                } 
            }
            //if total planets >= 2, remove 2 planets
            //if total planets = 1, remove planet
            //if total planets = 0, no change
             
                
                
            console.log('Warning: star flux and luminosity fluctuating outside normal constraints')
            return "Stellar Anomaly"
            //Minus 2 Planets (Min = 0)
        }

        //Warp Stasis
        if(roll==9){
            console.log('Warning: Warp stability exceeds constraints');
            return "Warp Stasis";
            //N/A
        }

        //Warp Turbulence
        if(roll==10){
            console.log('Warning: Warp instability exceeds constraints');
            return "Warp Turbulence";
            //N/A
        }
    }
    
}

const SystemGen = new System();
console.log(SystemGen);

