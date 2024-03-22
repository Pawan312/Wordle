var cha = document.querySelectorAll('#wordSegmant button');
var btn = document.querySelectorAll('#keyboard button');


// var arr =['which', 'there', 'their', 'about', 'would', 'these', 'other', 'words', 'could', 'write', 'first', 'water', 'after', 'where', 'right', 'think', 'three', 'years', 'place', 'sound'];
// var word = arr[Math.floor(Math.random() * arr.length)].toUpperCase();
// console.log(word);

var word;
const getWord = async () => {
    var gettingWord = await fetch(`https://random-word-api.vercel.app/api?words=1&length=5`)
    var jsongettingWord = await gettingWord.json();

    console.log(jsongettingWord[0]);
    word = jsongettingWord[0].toUpperCase();;
    console.log(word);
};

Promise.resolve(getWord()).then(() => {
    console.log("words", word);

    const getData = async (generatedWord) => {
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${generatedWord}`);
        let jsonData = await data.json();


        console.log(jsonData);
        console.log(jsonData[0].word);
        console.log(jsonData[0].meanings[0].partOfSpeech);
        console.log(jsonData[0].meanings[0].definitions[0].definition);
        console.log(jsonData[0].meanings[0].definitions[0].example);
        console.log(jsonData[0].meanings[0].synonyms);
    };

    getData(word);


    var word2 = '';

    var box = 0;

    var totalWords = 0;
    var clickCount = 0;

    var flag = 0;




    btn.forEach(click => {


        click.addEventListener('click', function () {
            if (click.textContent === 'BACK') {
                if (clickCount > 0) {
                    box--;
                    cha[box].textContent = '';
                    word2 = word2.slice(0, -1);
                    clickCount--;
                }
            } else if (click.textContent === 'ENTER') {
                if (clickCount === 5) {

                    var greenflag = 0;

                    for (var i = 0; i < 5; i++) {
                        var check = word2[i];
                        // console.log(check);
                        for (var j = 0; j < 5; j++) {

                            if (word2[i] === word[j]) { // word2 is typed word & word is generated word.
                                if (i === j) {
                                    // console.log('green');
                                    let countb1 = i + (5 * totalWords);
                                    // console.log(countb1);

                                    // var colorbutton = cha[countb1];
                                    cha[countb1].style.backgroundColor = 'green';

                                    greenflag++;
                                    break;
                                } else {
                                    if (word2[i] === word[i]) {
                                        // console.log('green');
                                        var color = cha[i + (5 * totalWords)];
                                        // console.log(color);
                                        color.style.backgroundColor = 'green';
                                        greenflag++;
                                        break;
                                    } else {
                                        // console.log('yellow');
                                        var color = cha[i + (5 * totalWords)];
                                        // console.log(color);
                                        color.style.backgroundColor = 'yellow';
                                        color.style.color = 'red';
                                        break;
                                    }
                                }
                            } else {
                                var colorbutton2 = cha[i + (5 * totalWords)];
                                colorbutton2.style.backgroundColor = 'grey';
                            }
                        }
                    }
                    word2 = '';
                    totalWords++;
                    clickCount = 0;
                    // console.log(totalWords);

                    if (greenflag === 5) {
                        flag = 1;
                        alert('You WON');
                    }
                    if (totalWords === 6 && flag === 0) {
                        alert(`You LOSE, and the word is ${word}`);
                    }

                } else {
                    if(totalWords !== 6){
                        alert('write word of 5 length');
                    }
                    
                }
            } else {

                if (totalWords === 6 && flag === 0) {
                    // console.log('word completion');
                    alert(`You LOSE and word is ${word}`);
                } else if (flag === 1) {
                    // console.log('pawan inside flag');
                    alert('You Won');
                } else {
                    if (clickCount < 5) {
                        word2 += click.textContent;
                        cha[box].textContent = click.textContent;
                        box++;
                        clickCount++;
                    }
                }
            }
        })

    })
}
);



