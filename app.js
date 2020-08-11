document.addEventListener('DOMContentLoaded', loadAll)
// Variables
let mins = 25;
let sec  = 0;

// Buttons
    startBtn        = document.querySelector('.start');
    shortBrakeBtn   = document.querySelector('.short-brake');
    longBrakeBtn    = document.querySelector('.long-brake');
    backBtn         = document.querySelector('.cancel');

// MP3
const ring = new Audio('./shcool-bell.mp3');

const minuteDisplay     = document.querySelector('.minutes');
const secondsDisplay    = document.querySelector('.seconds');

function loadAll(){
    // Start the study timer
    startBtn.addEventListener('click', studyStart);

    // Start brake click event
    shortBrakeBtn.addEventListener('click', shortBrake);

    // Long brake click event
    longBrakeBtn.addEventListener('click', startLongBrake);

    // Back btn click event
    backBtn.addEventListener('click', cancelBrake);

    // Hide Brake Btn
    hideBtn();
}

function studyStart(){
    // Change the minutes and seconds
    mins = 24;
    sec  = 59;

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

                // Show buttons
                hideBtn();
            }
            sec = 60;
        }
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