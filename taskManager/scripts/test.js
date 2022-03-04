function Dog(name, age){
    this.name = name;
    this.age = age;

}

class Cat{
    //automatically called when creating objects 
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }
}

function objects(){

    //object literal
    let d1 = {
        name: "Fido",
        age: 3
    };
    let d2 ={
        name: "Lola",
        age: 4
    }
    console.log(d1);
    console.log(d2);

    //object constructor
    let d3 = new Dog ("Dude", 1);
    let d4 = new Dog ("Pal", 5);
    console.log(d3, d4);

    // classes
    let c1 = new Cat("Dr. Mewoalot", 3, "white");
    //c1 is a instance of cat
    let c2 = new Cat("Whiskers", 5, "brown");
    //c2 is a instance of cat 

    console.log(c1, c2);


}

function testRequest(){
   
    $.ajax({
        type: "GET",
        url: "https://restclass.azurewebsites.net/api/test",
        success: function(response){
            console.log("Server says: ", response);

        },
        error: function(error){
            console.log("Request failed", error);

        }
    });


}

//exec the fn
objects();
//testRequest();