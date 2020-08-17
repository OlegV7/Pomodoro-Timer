document.addEventListener('DOMContentLoaded', loadAll);
document.addEventListener('DOMContentLoaded', displayTomatosFromLS);

// Variables
let mins            = 25,
    sec             = '00',
    studyCounter    = 0;

const   tomato        = '<span class="iconify" data-icon="emojione-v1:tomato" data-inline="false"></span>',
        tomatoArr     = [],
        tomatoOutput  = document.querySelector('.tomato-output'),
        minuteDisplay     = document.querySelector('.minutes'),
        secondsDisplay    = document.querySelector('.seconds'),
        // MP3
        ring = new Audio('./shcool-bell.mp3'),
        // Buttons
        startBtn        = document.querySelector('.start'),
        shortBrakeBtn   = document.querySelector('.short-brake'),
        longBrakeBtn    = document.querySelector('.long-brake'),
        backBtn         = document.querySelector('.cancel'),
        clearBtn        = document.querySelector('.clear-btn');



minuteDisplay.textContent   = mins;
secondsDisplay.textContent  = sec;

function loadAll(){
    // Start the study timer
    startBtn.addEventListener('click', studyStart);

    // Start brake click event
    shortBrakeBtn.addEventListener('click', shortBrake);

    // Long brake click event
    longBrakeBtn.addEventListener('click', startLongBrake);

    // Back btn click event
    backBtn.addEventListener('click', cancelBrake);

    // Clear from LS
    clearBtn.addEventListener('click', clearTomato);

    // Hide Brake Btn
    hideBtn();
}

function studyStart(){
    // Change the minutes and seconds
    mins = 24;
    sec  = 59;

    // Generate Random Quote
    generateRandomQuote();

    // Change the display
    minuteDisplay.innerHTML   = mins;
    secondsDisplay.innerHTML  = sec;

    hideOtherBtn();

    // Start the countdown
    const minuteInterval    = setInterval(studyMinutes, 60000);
    const secondsInterval   = setInterval(studySeconds, 1000);

    function studyMinutes(){
        mins -= 1;
        minuteDisplay.innerHTML   = mins;
    }

    function studySeconds(){
        sec -= 1;
        secondsDisplay.innerHTML  = sec;

        if(sec <= 0){
            if(mins <= 0){
                // Cleaer the time intervals
                clearInterval(minuteInterval);
                clearInterval(secondsInterval);
                // Play sounds
                ring.play();

                // Study counter
                studyCounter++;

                // Add icon
                addTomato();
                
                displayTomatosFromLS();

                if(studyCounter % 4 == 0){
                    // Show message 
                    showMessage(`You've been studying for ${studyCounter} straight sessions. Take a long brake!`, 'success')
                } else {
                    // Show message
                    showMessage('Take a brake!', 'success');
                }
                // Show buttons
                brakeBtn();
            }
            sec = 60;
        }
    }
}

function shortBrake(){
    // Change the minutes and seconds
    mins = 4;
    sec  = 59;

    // Generate Random Quote
    generateRandomQuote();

    // Change the display
    minuteDisplay.innerHTML   = mins;
    secondsDisplay.innerHTML  = sec;

    hideOtherBtn();

    // Start the countdown
    const minuteInterval    = setInterval(studyMinutes, 60000);
    const secondsInterval   = setInterval(studySeconds, 1000);

 

    function studyMinutes(){
        mins -= 1;
        minuteDisplay.innerHTML   = mins;
    }

    function studySeconds(){
        sec -= 1;
        secondsDisplay.innerHTML  = sec;

        if(sec <= 57){
            if(mins <= 4){
                // Cleaer the time intervals
                clearInterval(minuteInterval);
                clearInterval(secondsInterval);
                // Play sounds
                ring.play();

                // Show message 
                showMessage('Brake Completed! Get back to work!', 'success');

                // Show buttons
                hideBtn();
            }
            sec = 60;
        }
    }
}

function startLongBrake(){
    // Change the minutes and seconds
    mins = 14;
    sec  = 59;

    // Generate Random Quote
    generateRandomQuote();

    // Change the display
    minuteDisplay.innerHTML   = mins;
    secondsDisplay.innerHTML  = sec;

    hideOtherBtn();

    // Start the countdown
    const minuteInterval    = setInterval(studyMinutes, 60000);
    const secondsInterval   = setInterval(studySeconds, 1000);

    function studyMinutes(){
        mins -= 1;
        minuteDisplay.innerHTML   = mins;
    }

    function studySeconds(){
        sec -= 1;
        secondsDisplay.innerHTML  = sec;

        if(sec <= 0){
            if(mins <= 0){
                // Cleaer the time intervals
                clearInterval(minuteInterval);
                clearInterval(secondsInterval);
                // Play sounds
                ring.play();

                // Show message
                showMessage('Long brake is completed, I hope it was enough rest.', 'success')

                // Show buttons
                hideBtn();
            }
            sec = 60;
        }
    }
}

// Add tomato
function addTomato(){
    // Add icon to array
    tomatoArr.push(tomato);

    // Add tomato to local storage
    addTomatoToLS(tomato);
    
    // console.log(tomatoArr);
}

function addTomatoToLS(tomato){
    let tomatos;

    if(localStorage.getItem('tomatos') === null){
        tomatos = [];
    } else {
        tomatos = JSON.parse(localStorage.getItem('tomatos'));
    }

    tomatos.push(tomato);

    localStorage.setItem('tomatos', JSON.stringify(tomatos));
}

function displayTomatosFromLS(){
    let tomatos;

    if(localStorage.getItem('tomatos') === null){
        tomatos = [];
    } else {
        tomatos = JSON.parse(localStorage.getItem('tomatos'));
    }
     
    let output = '';
    tomatos.forEach(tomato => output += tomato);

    // Add icons to HTML
    tomatoOutput.innerHTML = output;
}

function clearTomato(){
    // Clear from LS
    localStorage.clear();

    // Clear from UI
    tomatoOutput.innerHTML = '';

    // Set counter back to 0
    studyCounter = 0;

    // Show message
    showMessage('Progress deleted', 'danger');
}

// Show Message
function showMessage(message, className){
    // Remove existing messages for new
    clearMessage();

    // Create a div
    const div = document.createElement('div');
    // Add text
    div.appendChild(document.createTextNode(message));
    // Add class
    div.className = `alert ${className}`;

    // Add to HTML
    // Get parent
    const divTimer = document.querySelector('.div-timer');
    // Get timer div
    const timerContainer = document.querySelector('.timer');    
    // Insert in timerContainer before pomodoroTimer
    divTimer.insertBefore(div, timerContainer);

    // Remove after 5 seconds
    setTimeout(() => clearMessage(), 5000);
}

function clearMessage(){
    const currentMessage = document.querySelector('.alert');

    if(currentMessage){
        currentMessage.remove();
    }
}

function cancelBrake(){
    window.location.reload();
}

function hideBtn(){
    shortBrakeBtn.style.display = 'none';
    longBrakeBtn.style.display  = 'none';
    backBtn.style.display       = 'none';
    startBtn.style.display      = 'flex';
}

function brakeBtn(){
    shortBrakeBtn.style.display = 'flex';
    longBrakeBtn.style.display  = 'flex';
    backBtn.style.display       = 'flex';
    startBtn.style.display      = 'none';
}

function hideOtherBtn(){
    shortBrakeBtn.style.display = 'none';
    longBrakeBtn.style.display  = 'none';
    backBtn.style.display       = 'flex';
    startBtn.style.display      = 'none';
}

async function getQuote(){
    const response = await fetch(`https://type.fit/api/quotes`);
    
    const data = await response.json();
    return data;
 }
 
function generateRandomQuote(){
    getQuote()
    .then(res => res)
    .then(data => {
        const randomQuote = Math.round(Math.random() * data.length);

        const output = `
            <h3 class="quote-header">Get your qute down here!</h3>
            <p>${data[randomQuote].text} -${data[randomQuote].author}
            </p>
        `;

        document.querySelector('.quote-container').innerHTML = output;
    })
    .catch(err => console.log(err));
}