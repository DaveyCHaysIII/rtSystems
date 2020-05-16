class Super{
    constructor(){
        this.mod = this.getMod();
        this.thing = this.getThing();
        
    }
    getThing() {
        return new Sub();
    }
    getMod() {
        return Math.floor(Math.random()*3)+1;
    }
}

class Sub{
    constructor(){
        this.name = this.getName();
    }
    getName() {
        // if(whatever.mod ==1){
        //     return 'thing1';
        // } else if(whatever.mod == 2){
        //     return 'thing2';
        // } else if(whatever.mod == 3){
        //     return 'thing3';
        // }
        return 'thing1'
    }
}

const whatever = new Super();
console.log(whatever.thing.name);

//testing result:
//cannot access "whatever" before initialization
//we can't access the properties of the parent object from the child object
//this means we have to have to HAVE to use a new set of subclasses or find a work-around