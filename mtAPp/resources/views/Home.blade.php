<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/login.css') }}">
    <script src="
        https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js">
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

    <link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        /* Import Google font - Poppins */




        .wrapper {
            width: 450px;
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
        }

        .wrapper header {
            display: flex;
            align-items: center;
            padding: 25px 30px 10px;
            justify-content: space-between;
        }

        header .icons {
            display: flex;
        }

        header .icons span {
            height: 38px;
            width: 38px;
            margin: 0 1px;
            cursor: pointer;
            color: #878787;
            text-align: center;
            line-height: 38px;
            font-size: 1.9rem;
            user-select: none;
            border-radius: 50%;
        }

        .icons span:last-child {
            margin-right: -10px;
        }

        header .icons span:hover {
            background: #f2f2f2;
        }

        header .current-date {
            font-size: 1.45rem;
            font-weight: 500;
        }

        .calendar {
            padding: 20px;
        }

        .calendar ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            text-align: center;
        }

        .calendar .days {
            margin-bottom: 20px;
        }

        .calendar li {
            color: #333;
            width: calc(100% / 7);
            font-size: 1.07rem;
        }

        .calendar .weeks li {
            font-weight: 500;
            cursor: default;
        }

        .calendar .days li {
            z-index: 1;
            cursor: pointer;
            position: relative;
            margin-top: 30px;
        }

        .days li.inactive {
            color: #aaa;
        }

        .days li.active {
            color: #fff;
        }

        .days li::before {
            position: absolute;
            content: "";
            left: 50%;
            top: 50%;
            height: 40px;
            width: 40px;
            z-index: -1;
            border-radius: 50%;
            transform: translate(-50%, -50%);
        }

        .days li.active::before {
            background: #3859e5;
        }

        .days li:not(.active):hover::before {
            background: #f2f2f2;
        }

    </style>

</head>

<body>
    @include('components.header')

    <!-- carousel -->
    <div class="row">
        <div class="col-md-7">
            <h1 class='text-primary'>Carousel</h1>
        </div>
        <div class="col-md-5">
            <div class="calender-container d-flex" style='background:#2ECC71'>
                <div style='padding:30px;text-align:center'>
                    <h5 class='todays-date' style='font-size:60px;color:white'></h5>
                    <h5 class='todays-monthandyear'></h5>

                    <h2>Event</h2>
                </div>


                <div class="wrapper">
                    <header>
                        <p class="current-date"></p>
                        <div class="icons">
                            <span id="prev" class="material-symbols-rounded">
                                < </span>
                                    <span id="next" class="material-symbols-rounded">></span>
                        </div>
                    </header>
                    <div class="calendar">
                        <ul class="weeks">
                            <li>Sun</li>
                            <li>Mon</li>
                            <li>Tue</li>
                            <li>Wed</li>
                            <li>Thu</li>
                            <li>Fri</li>
                            <li>Sat</li>
                        </ul>
                        <ul class="days"></ul>
                    </div>
                </div>
            </div>
        </div>



        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <script>
            $('#myModal').on('shown.bs.modal', function () {
                $('#myInput').trigger('focus')
            })

        </script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
        </script>
        <script>
            const daysTag = document.querySelector(".days"),
                currentDate = document.querySelector(".current-date"),
                todaysDate = document.querySelector(".todays-date"),
                todaysMonthandyear = document.querySelector(".todays-monthandyear"),
                prevButton = document.getElementById("prev"),
                nextButton = document.getElementById("next");

            // getting new date, current year, and month
            let date = new Date(),
                currYear = date.getFullYear(),
                currMonth = date.getMonth();

            // storing the full names of all months in an array
            const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ];

            const renderCalendar = () => {
                let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
                    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
                    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
                    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
                let liTag = "";

                for (let i = firstDayofMonth; i > 0; i--) {
                    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
                }

                for (let i = 1; i <= lastDateofMonth; i++) {
                    let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear ===
                        new Date().getFullYear() ? "active" : "";
                    liTag += `<li class="${isToday}">${i}</li>`;
                }

                for (let i = lastDayofMonth; i < 6; i++) {
                    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
                }
                currentDate.innerText = `${months[currMonth]} ${currYear}`;
                daysTag.innerHTML = liTag;

                todaysDate.innerText = date.getDate();
                todaysMonthandyear.innerText = `${months[currMonth]} ${currYear}`;
            }

            renderCalendar();

            // Attach click event handlers to the previous and next buttons
            prevButton.addEventListener("click", () => {
                currMonth = currMonth - 1;
                if (currMonth < 0) {
                    currYear--;
                    currMonth = 11;
                }
                renderCalendar();
            });

            nextButton.addEventListener("click", () => {
                currMonth = currMonth + 1;
                if (currMonth > 11) {
                    currYear++;
                    currMonth = 0;
                }
                renderCalendar();
            });

        </script>

</body>

</html>
