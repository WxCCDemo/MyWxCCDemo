html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  min-height: 100vh;
  min-width: 100vw;
  background-color: #000;
  position: relative;
  overflow-x: hidden;
}

/* Navigation bar */
nav {
  width: 100vw;
  background: rgba(20, 26, 58, 0.85);
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  padding: 10px 24px;
  box-sizing: border-box;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 32px;
  align-items: center;
}

nav ul li a {
  color: #fff;
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s ease-in-out;
}

nav ul li a:hover,
nav ul li a:focus {
  background: #3756a7;
  outline: none;
}

/* Scrolling fullscreen image */
img.fullscreen-image {
  display: block;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: relative;
  z-index: 0;
  margin: 0;
  padding: 0;
}

/* Vertical Contact Us button */
.contact-us-button-vertical {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  background-color: #0d6efd;
  color: white;
  padding: 10px 15px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  cursor: pointer;
  z-index: 1050;
  font-weight: 600;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  user-select: none;
}
.contact-us-button-vertical:hover {
  background-color: #084298;
}

/* Responsive adjustment */
@media(max-width: 768px) {
  nav {
    justify-content: center;
  }
  nav ul {
    gap: 16px;
  }
  nav ul li a {
    font-size: 1rem;
    padding: 6px 10px;
  }
}
