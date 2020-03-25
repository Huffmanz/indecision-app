class Person{
    
    constructor(name = 'Anonymous', age=0){
        this.name = name || 'Anonymous';
        this.age = age
    }

    getGreeting(){
        return `Hi, my name is ${this.name}.`
    }

    getDescription(){
        return `${this.name} is ${this.age} years old.`
    }
}

class Student extends Person {
    constructor(name, age, major){
        super(name, age);
        this.major = major;
    }

    getDescription(){
        let description = super.getDescription();
        if(this.major){
            description+= ` Their major is ${this.major}` 
        }
        return description
    }

    hasMajor(){
        return !!this.major
    }
}

class Traveler extends Person{

    constructor(name, age, home){
        super(name,age);
        this.homeLocation = home;
    }

    getGreeting(){
        let greeting = super.getGreeting();
        if(this.homeLocation){
            greeting+= ` I'm visting from ${this.homeLocation}`
        }
        return greeting;
    }

    
}

let me = new Traveler('Zach Huffman', 29,'Nashua, IA');
let other = new Traveler();
console.log(me.getGreeting());
console.log(other.getGreeting());