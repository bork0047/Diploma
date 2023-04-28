let questions = [
    {
        id: 1,
        question: "What an array?",
        answer:"A List",
        options: [
            "Just a bunch of stuff",
            "A programming class",
            "A List",
            "Integer"
        ]   
    },
    {
        id: 2,
        question: "How should you create an array in Java?",
        answer: "dataType [] nameOfArray = new dataType [size]",
        options: [
          "Array list = Array",
          "list []",
          "dataType [] nameOfArray = new dataType [size]",
          "All of them"
        ]
      },
      {
        id: 3,
        question: "What is very important to put in the end of lines in Java?",
        answer: ";",
        options: [
          "A dot",
          ":",
          ";",
          "None of these"
        ]
      },
      {
        id: 4,
        question: "Java is the...",
        answer: "All of these",
        options: [
          "Complicated Language",
          "Hardest Language",
          "Mean of creation",
          "All of these"
        ]
      },
      {
        id: 5,
        question: "What should you do, when you make an array list",
        answer: "Initialize the data stored before the array name",
        options: [
          "Initialize the data stored before the array name",
          "Initialize the data stored after the array name",
          "Initialize the data type stored later on the code",
          "None of these"
        ]
      },
      {
        id: 6,
        question: "How many values can you put in array list?",
        answer: "Any number",
        options: [
          "32",
          "16",
          "8",
          "Any number"
        ]
      },
      {
        id: 7,
        question: "Can you make an array of images?",
        answer: "No because it is not a data variable in Java.",
        options: [
          "Yes, because it is a data type.",
          "No because it is not a data variable in Java.",
          "Not enough space for them.",
        ]
      },
      {
        id: 8,
        question: "When you make an array list of [10] integer values, what does each value contain?",
        answer: "ENIAC",
        options: [
          "Nothing",
          "A number from 1 to 10",
          "A number from 0 to 9",
        ]
      },
      {
        id: 9,
        question: "How do you print text on a new line in java?",
        answer: "System.out.println();",
        options: [
          "PrintLine();",
          "Console.out.println();",
          "System.out.println();",
          "None of these"
        ]
      },
      {
        id: 10,
        question: "What are arrays used for?",
        answer: "All of the above",
        options: [
          "Listing things",
          "Making a list",
          "Calculating or using lists of data",
          "All of the above"
          
        ]
      },
];

let question_count = 0;
let points = 0;


window.onload = function(){
    show(question_count);
};

function show(count){
    let question = document.getElementById("questions");
    let[first, second, third, fourth] = questions[count].options;

    question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
    toggleActive();  
}

function toggleActive(){
    let option = document.querySelectorAll("li.option");
    for(let i=0; i < option.length; i++){
        option[i].onclick = function(){
            for(let i=0; i < option.length; i++){
                if(option[i].classList.contains("active")){
                    option[i].classList.remove("active");
                }
            }
            option[i].classList.add("active");
        }
    }
}

function next(){

    if(question_count == questions.length -1){
        location.href = "final.ejs";
    }
    console.log(question_count);


let user_answer = document.querySelector("li.option.active").innerHTML;

if(user_answer == questions[question_count].answer){
    points += 10;
    sessionStorage.setItem("points",points);
}
console.log(points);

question_count++;
show(question_count);
}
