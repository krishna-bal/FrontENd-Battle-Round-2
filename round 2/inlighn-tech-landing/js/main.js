<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inlighn Tech - Immersive Internship Programs</title>
    <meta name="description" content="Join Inlighn Tech's cutting-edge internship programs in Cybersecurity, Full Stack Development, Data Science, and Data Analysis. Transform your career with hands-on experience.">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="styles/main.css" as="style">
    <link rel="preload" href="styles/animations.css" as="style">
    <link rel="preload" href="js/main.js" as="script">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/animations.css">
    <link rel="stylesheet" href="styles/responsive.css">
    
    <!-- Three.js for 3D effects -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
    <header>
        <!-- Loading Screen with 3D Logo Animation -->
        <div class="loading-screen" id="loadingScreen">
            <div class="loading-content">
                <div class="logo-3d">
                    <div class="logo-face front">IT</div>
                    <div class="logo-face back">IT</div>
                    <div class="logo-face right">IT</div>
                    <div class="logo-face left">IT</div>
                    <div class="logo-face top">IT</div>
                    <div class="logo-face bottom">IT</div>
                </div>
                <div class="loading-text">
                    <h2>Inlighn Tech</h2>
                    <p>Loading immersive experience...</p>
                    <div class="loading-bar">
                        <div class="loading-progress"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <span class="logo-text">Inlighn Tech</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link active">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#programs" class="nav-link">Programs</a></li>
                <li><a href="#verify" class="nav-link">Verify Certificate</a></li>
                <li><a href="#special" class="nav-link">What's Special</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
                <li><a href="#portal" class="nav-link portal-btn" data-modal="portalModal">Portal Login</a></li>
            </ul>
            <div class="mobile-menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="mobile-menu">
            <a href="#home" class="mobile-nav-link">Home</a>
            <a href="#about" class="mobile-nav-link">About</a>
            <a href="#programs" class="mobile-nav-link">Programs</a>
            <a href="#verify" class="mobile-nav-link">Verify Certificate</a>
            <a href="#special" class="mobile-nav-link">What's Special</a>
            <a href="#contact" class="mobile-nav-link">Contact</a>
            <a href="#portal" class="mobile-nav-link portal-btn" data-modal="portalModal">Portal Login</a>
        </div>
    </nav>

    <main>
        <!-- Hero Section with Enhanced 3D Background -->
        <section id="home" class="hero-section parallax-section" data-speed="0.5">
            <div class="hero-background">
                <canvas id="hero-canvas"></canvas>
            </div>
            <div class="hero-content parallax-mouse" data-speed="0.1">
                <div class="hero-text">
                    <h1 class="hero-title">
                        <span class="title-line">Transform Your Future</span>
                        <span class="title-line">With Immersive Tech</span>
                        <span class="title-line">Internships</span>
                    </h1>
                    <p class="hero-subtitle">
                        Join Inlighn Tech's cutting-edge internship programs in Cybersecurity, 
                        Full Stack Development, Data Science, and Data Analysis. 
                        Gain hands-on experience with real-world projects and accelerate your career.
                    </p>
                    <div class="hero-buttons">
                        <a href="#programs" class="btn btn-primary">Explore Programs</a>
                        <a href="#contact" class="btn btn-secondary">Get Started</a>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="floating-cards">
                        <div class="card card-1"></div>
                        <div class="card card-2"></div>
                        <div class="card card-3"></div>
                        <div class="card card-4"></div>
                    </div>
                </div>
            </div>
            <div class="scroll-indicator">
                <div class="scroll-arrow"></div>
            </div>
        </section>

        <!-- Other sections remain unchanged -->
    </main>

    <footer>
        <div class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section"></div>
                    <div class="footer-section"></div>
                    <div class="footer-section"></div>
                    <div class="footer-section"></div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Inlighn Tech. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- Portal Login Modal -->
    <div id="portalModal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Portal Login</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form class="portal-form"></form>
                <div class="portal-links"></div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="js/enhanced-3d.js"></script>
    <script src="js/main.js"></script>
</body>
</html>