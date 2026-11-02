const validation = JSON.parse(sessionStorage.getItem("User"));

if(validation == null)
{
    location.replace("home.html");
}

fetch("https://www.fulek.com/data/api/supit/curriculum-list/hr", {
    method: "GET",
    headers: 
    {
        'Authorization': 'Bearer ' + validation.data.token    
    }
})
.then(result => {
    if(result.status != 200)
    {
        sessionStorage.clear();
        location.replace("home.html");
    } 
    else
    {
        return result.json();
    }
})
.then(token => { 
    browser_courses(token.data); 
})

function browser_courses(array)
{
    let course_list = array.map(item => ({
        id: item.id,
        kolegij: item.kolegij
    }));

    const autoCompleteJS = new autoComplete
    (
        {
            data:
            {
                cache: true,
                src: course_list,
                keys: ["kolegij"],
                filter: (list) => 
                {
                    let input = document.getElementById('autoComplete').value.toLowerCase();
                
                    return list.filter(item => item.value.kolegij.toLowerCase().startsWith(input));
                }

            },
            resultsList:
            {
                class: "results_list"
            },

        },

        document.querySelector("#autoComplete").addEventListener("selection", function (event) 
        {
            document.getElementById('autoComplete').value = "";
            
            fetch_full_course(event.detail.selection.value);
        })
    );
}

function fetch_full_course(object)
{
    fetch("https://www.fulek.com/data/api/supit/get-curriculum/" + object.id, {
    method: "GET",
    headers: 
    {
        'Authorization': 'Bearer ' + validation.data.token
    }
    })
    .then(result => result.json())
    .then(token => { 
        process_course(token); 
    })
}

class Course
{
    constructor(id, name, ects, hour, lecture, exercise, type)
    {
        this.id = id;
        this.name = name;
        this.ects = ects;
        this.hour = hour;
        this.lecture = lecture;
        this.exercise = exercise
        this.type = type;
    }
}

let display_list = [];

const display_element = document.getElementById('display-body');

function process_course(object)
{
    let course = new Course(
        object.data.id,
        object.data.kolegij,
        object.data.ects,
        object.data.sati,
        object.data.predavanja,
        object.data.vjezbe,
        object.data.tip
    )

    if(!display_list.some(item => item.id == course.id))
    {
        display_list.push(course);
    }
    else
    {
        course = null;
    }

    if(course != null)
    {
        display_course();
    }
}

function calculate_overall()
{
    let ects_overall = 0;
    let hours_overall = 0;
    let lecture_overall = 0;
    let exercise_overall = 0;

    display_list.forEach(item =>
    {   
        ects_overall += item.ects;
        hours_overall += item.hour;
        lecture_overall += item.lecture;
        exercise_overall += item.exercise;
    })

    document.getElementById('total-ects').innerHTML = ects_overall;
    document.getElementById('total-sati').innerHTML = hours_overall;
    document.getElementById('total-predavanja').innerHTML = lecture_overall;
    document.getElementById('total-vjezbe').innerHTML = exercise_overall;
}

function delete_course()
{
    document.getElementById("display-body").addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-button")) {
            const row = e.target.closest("tr");
            
            display_list = display_list.filter(course => course.name !== row.cells[0].textContent);

            display_course();

        }
    });
}

function display_course()
{   
    if(display_list.length == 0)
    {
        document.getElementById('table-wrapper').style.display ='none';
    }
    else
    {    
        document.getElementById('table-wrapper').style.display ='block'
    }

    display_element.innerHTML = "";

    display_list.forEach(course => 
    {
        display_element.innerHTML += "<tr class=\"Inserted_row\">" + 
        "<td>" + course.name + "</td>" +
        "<td>" + course.ects + "</td>" +
        "<td>" + course.hour + "</td>" +
        "<td>" + course.lecture + "</td>" + 
        "<td>" + course.exercise + "</td>" +
        "<td>" + course.type + "</td>" +
        "<td> <button onclick=\"delete_course()\" class=\"delete-button\" type=\"button\">Delete</button> </td>" + 
        "</tr>";

    })

    calculate_overall();
}