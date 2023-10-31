<!-- <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
    <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script> -->
    <style>
        .swiper {
            /* width: 600px; */
            height: 40vh;
        }

        .announcement, .notice {
            box-shadow: rgba(99, 99, 255, 0.64) 0px 2px 5px -1px, rgba(112, 148, 255, 0.97) 0px 1px 3px -1px;
            border-radius: 10px;
            padding: 10px;
        }

        .swiper-slide-active {
            color: indianred;
        }

        .swiper-slide {
            border: 1px solid #333;
            padding: 10px;
            border-radius: 10px;
        }
       
    </style>
</head>

<body>
    <div class="row mt-5" style="background:#f4fdff">
        <div class="offset-md-1 col-md-5 announcement" >
            <div class='announcementBtn is-active text-white'>Announcement <i class="fa-solid fa-bullhorn"></i>
            </div>
            <div class="swiper">


                <div class="swiper-wrapper" id="swiper1">
                    <!-- Slides -->


                </div>

                <!-- <div class="swiper-scrollbar"></div> -->
            </div>
        </div>
        <div class="col-md-5 notice">
            <div class='announcementBtn is-notice text-white text-center'> Notices <i
                    class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <div class="swiper">


                <div class="swiper-wrapper" id="swiper2">
                    <!-- Slides -->

                </div>
                <!-- If we need scrollbar -->
                <!-- <div class="swiper-scrollbar"></div> -->
            </div>
        </div>
    </div>

</body>


<script>
    
    let Announcementswiper = [{
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },
        {
            heading: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
        },

    ]

    let NoticesSwiper = [
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
        "Notices Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum is simply dummy text of the printing and typesetting",
    ]

    // announcement
    const setAnnouncements = (data) => {
        let container = document.getElementById('swiper1');
        container.innerHTML = " ";
        data.map((element) => {
            let li = document.createElement("li");
            let a = document.createElement("a");

            li.className = "swiper-slide";
            a.textContent = element.heading;

            li.append(a);
            container.append(li);
        });

    }

    // notices
    const setNotices = (data) => {
        let container = document.getElementById('swiper2');
        container.innerHTML = " ";
        data.map((element) => {
            let li = document.createElement("li");
            let a = document.createElement("a");
            li.className = "swiper-slide";
            a.textContent = element;
            li.append(a);
            container.append(li);
        });



    }

    (() => {
        setAnnouncements(Announcementswiper); // Corrected function name
        setNotices(NoticesSwiper); // Corrected function name
    })();

</script>

<script>
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',

        speed: 1000,

        mousewheel:{
          sensitivity: 5,
          releaseOnEdges: true,
        },
        
        spaceBetween: 1,

        loop: true,
        // Scrollbar drageable
        // scrollbar: {
        //     el: '.swiper-scrollbar',
        //     draggable: true,
        // },
        slidesPerView: 5,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
            type: 'progressbar',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        autoplay: {
            delay: 1500,
        },
    });

</script>
