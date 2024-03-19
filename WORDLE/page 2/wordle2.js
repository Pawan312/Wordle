var cha = document.querySelectorAll('#wordSegmant button');
var btn = document.querySelectorAll('#keyboard button');


var arr =['which', 'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound'];
var word = arr[Math.floor(Math.random() * arr.length)].toUpperCase();
console.log(word);

var word2 = '';

var box = 0;

var totalWords = 0;
var clickCount = 0;

var flag = false;


btn.forEach(click => {
    click.addEventListener('click', function(){
        if(click.textContent === 'BACK'){
            if(clickCount>0){
                box--;
                cha[box].textContent = '';
                word2 = word2.slice(0, -1);
                clickCount--;
            }
        }else if (click.textContent === 'ENTER'){
            if(clickCount === 5){

                var greenflag = 0;

                for(var i = 0; i<5 ; i++){
                    var check = word2[i];
                    console.log(check);
                    for(var j = 0; j<5 ; j++){
                        
                        if(word2[i] === word[j]){ // word2 is typed word & word is generated word.
                            if(i === j){
                                console.log('green');
                                let countb1 =  i+(5*totalWords);
                                console.log(countb1);
                                
                                // var colorbutton = cha[countb1];
                                cha[countb1].style.backgroundColor = 'green';
                                
                                greenflag++;
                                break;
                            }else{
                                console.log('yellow');
                                var color = cha[i+(5*totalWords)];
                                console.log(color);
                                color.style.backgroundColor = 'yellow';
                                color.style.color = 'red';
                                break;
                            }
                        }else{
                            var colorbutton2 = cha[i+(5*totalWords)];
                            colorbutton2.style.backgroundColor = 'grey';
                        }
                    }
                }
                word2 = '';
                totalWords++;
                clickCount = 0; 
                console.log(totalWords);

                if(greenflag === 5){
                    flag = true;
                    alert('You WON');
                }
                if(totalWords === 6 && flag === false){
                    alert(`You LOSE, and the word is ${word}`);
                }

            }else{
                alert('write word of 5 length');
            }       
        }else{
            if(clickCount < 5){
                word2 += click.textContent;
                cha[box].textContent = click.textContent;
                box++;
                clickCount++;
            }
        }
    })
    
})

console.log(totalWords);

