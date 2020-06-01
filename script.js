const draggable_list= document.getElementById("draggable-list");
var marks= document.getElementById("marks");
var marks1= document.getElementById("marks1");
const checkbtn= document.getElementById("checkbtn");
const richestPeople=[
    'Mukesh Ambani',
    'Gautam Adani',
    'Hinduja brothers',
    'Pallonji Mistry',
    'Uday Kotak',
    'Shiv Nadar',
    'Radhakishan Damani',
    'Godrej family',
    'Lakshmi Mittal',
    'Kumar Birla'

];
const listItems=[];
let dragStartIndex;
var popup = document.getElementById("popup-container");
var final = document.getElementById("final-message");
var playAgainBtn=document.getElementById("play-button");
var finalMessgeRevealWord=document.getElementById("final-message-revel-word");
createList();

function createList()
{
    richestPeople.map(a=>{
        return {value:a, sort:Math.random()}
    }).sort((a,b)=>a.sort-b.sort)
    .map(a=>a.value)
    .forEach((person, index)=>{
        const listItem= document.createElement("li");
        listItem.setAttribute("data-index", index);
       
        listItem.innerHTML=`
        <span class="number"> ${index+1}</span>
        <div  id="${index}" class="draggable" draggable="true">
       ${person}</div>`;
        listItems.push(listItem);
        draggable_list.appendChild(listItem);
        
    })
}

var ide;
var score=0;
var cor=0;
var incr=0;
function addEventListeners(){
    const draggables= document.querySelectorAll(".draggable");
    
    const dragListItems= document.querySelectorAll(".draggable-list li");
    draggables.forEach(draggabless=>
        {
            draggabless.addEventListener("dragstart", function(event){
                event.target.className += ' hold';
                for (var i = 0; i < draggables.length; i++) 
                    draggables[i].style.backgroundColor="white";
           event.dataTransfer.setData("Text", event.target.id);
          ide = event.dataTransfer.getData("Text");
           event.dataTransfer.setData("Text", event.target.innerHTML);
        });
    });
        dragListItems.forEach(item=>
            {
                item.addEventListener("dragover", function(event){
                    event.preventDefault();
                })
                item.addEventListener("drop", function(event){
                    event.preventDefault();
                    document.getElementById(ide).innerHTML= event.target.innerHTML;
                    let data = event.dataTransfer.getData("Text");
                  //  console.log(data);
                   event.target.innerHTML=data;
            
                });
               
            });
}

addEventListeners();
document.getElementById("check").addEventListener("click", function(){
    wrong=false;
for(let i=0; i<richestPeople.length; i++)
{
  
    let getPerson=document.getElementById(`${i}`).innerHTML;
     if(richestPeople[i]!=getPerson.trim())
    {
        document.getElementById(`${i}`).style.backgroundColor="#ff3838";
        wrong=true;
        incr+=1;
        // score-=1;
    }
    else
    {
    document.getElementById(`${i}`).style.backgroundColor="#3ae374";
    score+=1;
    }
}
localStorage.setItem("corr",score);
localStorage.setItem("incor",incr);
if(wrong==false)
{
    popup.style.display = "flex";
    final.innerText="Congrats, You're really Awesome!!";
    // marks.style.display="block";
    // marks1.style.display="block";
    // marks.innerHTML=`Correct: ${score}<tab>Incorrect: ${incr}`;
    // marks1.innerHTML=`Your Score: ${score-incr}`;
    
}
else{
    popup.style.display = "flex";
    final.innerText="Oops😔!! your score is low. Try Again!!";
    // marks.style.display="block";
    // marks1.style.display="block";
    // marks.innerHTML=`Correct: ${score}<tab>Incorrect: ${incr}`;
    // marks1.innerHTML=`Your Score: ${score-incr}`;
    

}

});



const name=document.getElementById("name");
const email=document.getElementById("email");
const namebtn=document.getElementById("namebtn");
const divtwo=document.getElementById("divtwo");
const divone=document.getElementById("divone");

nflag=false;
eflag=false;

name.addEventListener("input",function(e){
    var playername=e.target.value;
    localStorage.setItem("player",playername);
    if(playername.length!=0){
        nflag=true;
    }
    checkSubmit();
});

email.addEventListener("input",function(e){
    const playeremail=e.target.value;
    var re=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+com/;
    if(!re.test(String(playeremail)))
    {
        eflag=false;
    }
    else{
        eflag=true;
    }
    checkSubmit();
});

function checkSubmit(){
    if(nflag && eflag)
    {
        namebtn.className="btn btn-success";
        namebtn.disabled=false;
        namebtn.addEventListener("click", (e)=>{
            e.preventDefault();
            divtwo.style.display="block";
            divone.style.display="none";

        })

    }
}

playAgainBtn.onclick = function() {
    popup.style.display = "none";
    marks.style.display="block";
    marks1.style.display="block";
    marks.innerHTML=`Correct: ${score}<tab>Incorrect: ${incr}`;
    marks1.innerHTML=`${localStorage.getItem("player")} your score is ${score-(incr/4)}.`;
  }
  checkbtn.onclick=function(){
      location.href='./index.html';
  }