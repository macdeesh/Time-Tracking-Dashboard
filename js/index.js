const titleCard = document.querySelectorAll(".title");
const cardHours = document.querySelectorAll(".card-hours");
const previousState = document.querySelectorAll(".previous-state");
const defaultChoice = document.querySelector('input[name="period"]:checked');
const periodChoice = document.querySelectorAll('input[name="period"]');


function getData() {
    fetch("./data.json")
        .then((response) => {
            return response.json();
        })
        .then((dataOfHours) => {
            timeSpent(dataOfHours)  // this is the main function where we pass in the data
        })
        .catch((error) => console.log(error));
}

getData();

function timeSpent(dataOfHours) {

    function periodicState(period) { // Access the data file and through loop  give a value for each right card section.
        for (let i = 0; i < titleCard.length; i++) { // 
            for (const section of dataOfHours) {
                if (section.title == titleCard[i].innerText) {// Check the text title of the card if same title in data sections.
                    cardHours[i].innerText = `${section.timeframes[period].current}hrs`;
                    previousState[i].innerText = `Last ${switcher(period)} - ${section.timeframes[period].previous}hrs`;
                }
            }
        }
    }

    function switcher(period) {// To switch the period name for the right text to add when change the previous state.
        switch (period) {
            case "daily":
                return "Day";
                break;
            case "weekly":
                return "Week";
                break;
            case "monthly":
                return "Month";
        }
    }

    periodicState(defaultChoice.id);// For the default checked radio: daily.

    for (let i = 0; i < periodChoice.length; i++) {// For every checked radio event.
        periodChoice[i].addEventListener("change", function () {
            if (this.checked)
                periodicState(this.id);//Pass the name of the checked id which is the same period name in the data.
        })
    }

}

