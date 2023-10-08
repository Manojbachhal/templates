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
    <link href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        .carousel-item>img {
            height: 65vh;
            object-fit: cover;
        }

        .splide__slide.is-active {
            padding: 10px 15px;
            background: #22bacb !important;
            border-radius: 10px;
        }

        .splide__slide {
            height: 20% !important;
            transition: 0.4s ease-in;
        }

        .slider {
            margin-left: 15%;
            width: 85%;
            padding: 0;
        }

        .splide {
            position: relative;
        }

        #pauseBtn,
        #startBtn {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }

        button.splide__arrow.splide__arrow {
            position: absolute;
            bottom: 10px;
        }

        button.splide__arrow.splide__arrow--prev {
            top: 87%;
            left: 18%;
        }


        button.splide__arrow.splide__arrow--next {
            left: 25%;
            bottom: 4%;
        }

        .splide__slide--clone.is-active {
            background: unset !important
        }

    </style>
</head>

<body>
    @include('components.header')

    <!-- carousel -->
    <div class="row w-100" style='background:#a0d9ef'>
        <div class="col-md-8 p-3 ps-4" style=' box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;'>
            <div class="container p-0">
                <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators list-unstyled">
                        <li data-bs-target="#myCarousel" data-bs-slide-to="0" class="active"></li>
                        <li data-bs-target="#myCarousel" data-bs-slide-to="1"></li>
                        <li data-bs-target="#myCarousel" data-bs-slide-to="2"></li>
                    </ol>

                    <!-- Slides -->
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="https://images.pexels.com/photos/5913510/pexels-photo-5913510.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                class="d-block w-100" alt="Temporary Image 1">
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.pexels.com/photos/14384762/pexels-photo-14384762.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                class="d-block w-100" alt="Temporary Image 2">
                        </div>
                        <div class="carousel-item">
                            <img src="https://images.pexels.com/photos/5372615/pexels-photo-5372615.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                                class="d-block w-100" alt="Temporary Image 3">
                            <!-- <div class="carousel-caption">
                    <h3>Slide 3</h3>
                    <p>Temporary Image 3 Description</p>
                </div> -->
                        </div>
                    </div>

                    <!-- Controls -->
                    <a class="carousel-control-prev" href="#myCarousel" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#myCarousel" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </a>
                </div>
            </div>

        </div>
        <div class="col-md-4 text-center">
            <div class="col-md-12  my-4">
                <a href="#" class="login">Login</a>
            </div>
            <div class="col-md-12">
                <h1>Watch</h1>
            </div>
        </div>
    </div>
    <div class="row w-100 " style='background:#a0d9ef'>
        <div class="row col-md-6 announcement">
            <div class="slider">
                <section class="splide">
                    <div class="splide__slider">
                        <div class="splide__track">
                            <ul class="splide__list">
                                <li class="splide__slide">Slide 01</li>
                                <li class="splide__slide">Slide 02</li>
                                <li class="splide__slide">Slide 03</li>
                            </ul>
                        </div>
                    </div>

                    <button class="splide__toggle my-3" type="button">
                        <span class="splide__toggle__play">Play</span>
                        <span class="splide__toggle__pause">Pause</span>
                    </button>
                </section>
            </div>
        </div>
        <div class="col-md-6"
            style='height:60vh;background-repeat:no-repeat; background-image:url("https://github.githubassets.com/images/modules/site/home-campaign/lines-hero.svg")'>
            <h1 class='text-dark'>clock</h1>

        </div>

    </div>



    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            var splide = new Splide('.splide', {
                direction: 'ttb',
                height: '50vh',
                perPage: 4,
                autoplay: true,
                wheel: true,
                drag: 'free',
                type: 'loop',
                focus: 'center',
                autoplay: 'play',
                interval: 2000,
                // pauseOnHover: false,
            });

            splide.mount();
        });

    </script>
</body>

</html>
