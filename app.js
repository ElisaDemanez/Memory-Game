var cards = document.querySelectorAll('.card');
var min = 1;
var max = 12;
Materialize.toast('LETS BEG/DIGin', 3000, 'rounded red lighten-1')
var sortedArr;
var randomizedArray;



window.onload = function () {
        sortedArr= sortedArr();
        attribution ()
}

function sortedArr () {
        var a = [];
        for (let i = 0; i < max ; i++) {
                a.push(Math.floor((i)/2)+1) 
        }
        return a   
}


function randomize () {
        for (let i = 0; i < 5; i++) {
                
                for (const i in sortedArr) {
                        var j = Math.floor(Math.random()*max)
                        var temp = sortedArr[i]
                        sortedArr [i] = sortedArr[j];
                        sortedArr[j] = temp;
                }
        }
        randomizedArray = sortedArr;
        return sortedArr
};

function attribution () {
        var p = 0
        cards.forEach(element => {
                var cardText = element.innerHTML
                p++
                // for testing
                // element.firstChild.innerHTML = elementrandom;
                
                show(element,randomize()[p])    
        });
}


function show(TargetedDiv,DivValue) {
        
        TargetedDiv.addEventListener('click', function () { 
                TargetedDiv.firstChild.innerHTML = DivValue;
                TargetedDiv.classList.add('bg'+TargetedDiv.firstChild.innerHTML,'show')
                
                //empty selection
                window.getSelection().removeAllRanges();
                moreThanTwo()    
        }) 
}


function moreThanTwo() {
        console.log('capassezpo')
        var shown = [] ; 
        cards.forEach(el => {
                if ((!el.classList.contains('matched')) && (el.classList.contains('show'))) { 
                        shown.push(el);
                }      
        });
        
        
        if (shown.length >= 2) {
                var x =  window.setTimeout(hide, 500, shown)
                // quand deux carte correctes
                if ( shown[0].firstChild.innerHTML == shown[1].firstChild.innerHTML ) {
                        matched(shown)        
                }
        }      
}

function matched (shown) {
        shown[0].classList.add('matched')
        shown[1].classList.add('matched')
        score(+5)
        if (document.querySelectorAll('.matched').length == max ) Materialize.toast('You did it!', 3000, 'rounded red lighten-2')
        
}

function hide (allshown) {
        
        allshown.forEach ( element => {
                
                if (!element.classList.contains('matched'))  {
                        element.firstChild.innerHTML = '';
                        element.classList.remove('show')
                        for (let i = 0; i < (max+1)/2; i++) {
                                element.classList.remove('bg'+i)   
                        }  
                        score(-1);           
                }
        })
};

function score (x) {
        var old = (parseInt(document.querySelector('.ScoreEntry').innerHTML))
        document.querySelector('.ScoreEntry').innerHTML = old + x ;
}

document.querySelector('.newgame').addEventListener('click',function () {
        
        
        cards.forEach(element => {
                element.classList.remove('show')
                element.classList.remove('matched')
                element.firstChild.innerHTML = '';
                
                for (let i = 0; i < (max+1)/2; i++) {
                        element.classList.remove('bg'+i)   
                } 
        });
        
        document.querySelector('.ScoreEntry').innerHTML = 0;
        attribution();
        
        Materialize.toast('New game ! ', 3000, 'rounded green lighten-1')
})

document.querySelector('.solution').addEventListener('click',function () {
        var p = 0 ;
        cards.forEach(element => {
                // element.removeEventListener
                // console.log(element.firstChild.innerHTML)
                element.firstChild.innerHTML = randomizedArray[p];
                element.classList.add('bg'+element.firstChild.innerHTML,'show')
                
                //empty selection
                window.getSelection().removeAllRanges();
                p++ 
                // console.log(element.firstChild.innerHTML)
                
        })
        
})

//   quand solution : relance random une fois 
// doit remove 'l'vent listener