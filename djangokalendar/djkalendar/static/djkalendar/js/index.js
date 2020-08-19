// Get an array of days of the previous, current and next month to be
// rendered into a grid of 7x6 cells
const calendarDays = (year, month) => {
    const currentMonthDays = new Date(year, month, 0).getDate();
    const prevMonthDays = new Date(year, month-1, 0).getDate();
    const start_day = new Date(year, month-1, 1).getDay();
    const last_day = new Date(year, month, 0).getDay();
    const days_of_month = Array.from(new Array(currentMonthDays), (val, index) => index+1);


    // console.log("Days of month = ", days_of_month);
    // console.log("Start day (current month) = ", start_day);
    // console.log("Last day (current month) = ", last_day);
    // console.log("Days of month (previous one) = ", prevMonthDays);

    if (start_day != 0) {
        const limit = prevMonthDays - start_day + 1;
        const previous_days = Array.from(new Array(prevMonthDays), (val, index) => index+1).filter(day => day >= limit);
        const next_days = Array.from(new Array(42 - days_of_month.length - previous_days.length ), (val, index) => index+1);
        return previous_days.concat(days_of_month).concat(next_days);
    }
    else {
        const previous_days = Array.from(new Array(prevMonthDays), (val, index) => index+1).filter(day => day > prevMonthDays-7)
        const next_days = Array.from(new Array(6 - last_day), (val, index) => index + 1);
        return previous_days.concat(days_of_month).concat(next_days);
    }

}

const displayDate = (year, month) => {
    const date = new Date(year, month);
    $("#kalendar-date").html(date.toDateString());
}

const createCalendar = (year, month) => {
    const calendar_days = calendarDays(year, month);
    for (let i=1; i<7; i++) {
        $("#kalendar-table-body").append(`<tr id="row-${i}"> </tr>`)
    }
    let row = 1;
    calendar_days.forEach((day, index) => {
        $(`#row-${row}`).append(
            `<td id="kalendar-cell"> ${day} </td>` 
        )
        if ((index+1) % 7 == 0) {
            row ++;
        }
    })
}  

/*
    [
        {
            "day": 0,
            "events": [
                {
                    "id": 1,
                    "title": "Test 1",
                    "description": "Test 1",
                    "start_date": "Test 1",
                    "end_date": "Test 2",
                    "completed": True
                },
                ...
            ]
        },
        ...
    ]

*/

class Event {
    url = 'http://localhost:8000/kalendar/api/events/';
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    fetchEvents = (id) => {
        if (id) {
            fetch(this.url + `${id}/`, {
                method: 'get',
                headers: this.headers
            })
            .then(response => response.json()) 
            .then(data => console.log(data))
            .catch( error => {
                console.log(error)
            })
        }
        else {
            fetch(this.url, {
                method: 'get',
                headers: this.headers,
            })
            .then( response => response.json())
            .then( data => console.log(data))
            .catch( error => {
                console.log(error)
            })
        }
    }
}


const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
console.log(year, month)
console.log(date.toDateString());

$(document).ready( function() {
    console.log("Working 2...!");
    displayDate(year, month);
    createCalendar(year, month+1);
    const event_object = new Event();
    event_object.fetchEvents(1);
});


// -- Events 

$("#kalendar-prev-button").click((event) => {
    event.preventDefault();
    if (month > 0) {
        month--;
    }
    else {
        month = 11;
        year--;
    }
    $("#kalendar-table-body").empty();
    displayDate(year, month);
    createCalendar(year, month+1);
});

$("#kalendar-next-button").click((event) => {
    event.preventDefault();
    if (month < 11) {
        month++;
    }
    else {
        month = 0;
        year++;
    }
    $("#kalendar-table-body").empty();
    displayDate(year, month);
    createCalendar(year, month+1);
});