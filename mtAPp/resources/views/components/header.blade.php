<style>
    /* Styles for the Bootstrap Navbar */
    nav {
        /* background: linear-gradient(90deg, rgb(78 237 255) 0%, rgb(94 94 215) 39%, rgb(239 85 91) 100%); */
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        background: linear-gradient(45deg, #0051e5, transparent);
    }

    .nav-link {
        transition: 0.5s ease-in;
        margin-right: 20px;
        font-size: 18px;
        font-weight: 400;
        position: relative;
        transition: 3s ease in out;
    }

    .nav-link::before {
        content: "";
        position: absolute;
        background: #5168b9;
        width: 20px;
        height: 3px;
        top: 100%;
        transform: translate(0%, 0%);
        transition: all 0.3s ease;
    }

    .nav-link:hover::before {
        width: 100%;
    }

    .nav-link.active {
        color: white !important;
        background: #0000006e;
        border-radius: 10px;
    }

    .nav-link.active::before {
        width: 0;
    }

</style>

<nav class="navbar navbar-expand-lg">
    <div class="container ">

        <a class="navbar-brand">Navbar</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarText">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Dropdown
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<script>
    // JavaScript to adjust the ::before element width on hover
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
            const beforeElement = link.querySelector('::before');
            const linkWidth = link.getBoundingClientRect().width;
            if (beforeElement)
                beforeElement.style.width = `${linkWidth}px`;
        });

        link.addEventListener('mouseleave', () => {
            const beforeElement = link.querySelector('::before');
            if (beforeElement)
                beforeElement.style.width = '20px'; // Reset width on mouse leave
        });

        link.addEventListener('click', () => {
            // Remove the 'active' class from all links
            navLinks.forEach((otherLink) => {
                otherLink.classList.remove('active');
            });

            // Add the 'active' class to the clicked link
            link.classList.add('active');
        });
    });

</script>
