window.addEventListener('DOMContentLoaded', () => {
  // Use the injected default page, or fallback to Google.
  const defaultURL = window.__defaultPage || "https://www.google.com/";

  // -------------------------------
  // Create the navbar container.
  // -------------------------------
  const navBar = document.createElement('div');
  navBar.id = 'nav-bar';
  navBar.style.position = 'fixed';
  navBar.style.top = '10px';
  navBar.style.left = '10px';
  navBar.style.right = '10px';
  navBar.style.zIndex = '10000';
  navBar.style.display = 'flex';
  navBar.style.justifyContent = 'space-between';
  navBar.style.alignItems = 'center';
  navBar.style.padding = '5px 10px';
  navBar.style.backgroundColor = 'rgba(255,255,255,0.8)';
  navBar.style.borderRadius = '5px';
  navBar.style.boxShadow = '0px 0px 5px rgba(0,0,0,0.3)';
  navBar.style.transition = 'opacity 0.3s ease';
  navBar.style.opacity = '0'; // start hidden

  // Show navbar on mouseover; hide on mouseout.
  navBar.addEventListener('mouseover', () => {
    navBar.style.opacity = '1';
  });
  navBar.addEventListener('mouseout', () => {
    navBar.style.opacity = '0';
  });

  // -------------------------------
  // Left container: Home icon, Globe icon, and URL input field.
  // -------------------------------
  const leftContainer = document.createElement('div');
  leftContainer.style.display = 'flex';
  leftContainer.style.alignItems = 'center';
  leftContainer.style.gap = '5px';

  // Home Button: returns to the default URL.
  const homeButton = document.createElement('button');
  homeButton.id = 'home-button';
  homeButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  `;
  homeButton.style.width = '30px';
  homeButton.style.height = '30px';
  homeButton.style.cursor = 'pointer';
  homeButton.style.border = 'none';
  homeButton.style.background = 'none';
  homeButton.addEventListener('click', () => {
    window.location.href = defaultURL;
  });

  // Globe Icon: a static icon.
  const globeIcon = document.createElement('div');
  globeIcon.id = 'globe-icon';
  globeIcon.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.93 6h-2.15c-.33-1.32-.85-2.57-1.55-3.71A8.08 8.08 0 0 1 17.93 8zM12 4c.78 0 1.53.1 2.25.29-.58 1.09-1.1 2.34-1.46 3.61H11.2C10.86 6.64 10.34 5.39 9.75 4.29A7.959 7.959 0 0 1 12 4zM4.07 8a8.08 8.08 0 0 1 3.57-3.42c-.7 1.14-1.22 2.39-1.55 3.71H4.07zm-.07 4c0-.34.03-.67.08-1h3.26c.16 1.09.43 2.13.79 3H4.08A7.96 7.96 0 0 1 4 12zm1.54 4h2.15c.33 1.32.85 2.57 1.55 3.71A8.08 8.08 0 0 1 6.07 16zm3.16 0h5.46c-.36.97-.79 1.87-1.27 2.68A7.997 7.997 0 0 1 12 20a7.997 7.997 0 0 1-1.23-.32 16.026 16.026 0 0 1-1.27-2.68zm6.38 0a8.08 8.08 0 0 1-3.57 3.42c.7-1.14 1.22-2.39 1.55-3.71h2.15zm.83-4h-3.26c.05.33.08.66.08 1s-.03.67-.08 1h3.26c.05-.33.08-.66.08-1s-.03-.67-.08-1z"/>
    </svg>
  `;
  globeIcon.style.width = '30px';
  globeIcon.style.height = '30px';
  globeIcon.style.cursor = 'default';
  globeIcon.style.display = 'flex';
  globeIcon.style.alignItems = 'center';
  globeIcon.style.justifyContent = 'center';

  // URL Input Field: always visible.
  const input = document.createElement('input');
  input.id = 'url-input';
  input.type = 'text';
  input.style.width = '200px';
  input.style.padding = '5px';
  input.style.opacity = '1';
  input.style.fontSize = '14px';
  input.style.border = '1px solid #ccc';
  input.style.borderRadius = '3px';
  input.style.outline = 'none';
  input.value = window.location.href;

  leftContainer.appendChild(homeButton);
  leftContainer.appendChild(globeIcon);
  leftContainer.appendChild(input);

  // -------------------------------
  // Middle container: Back and Next buttons.
  // -------------------------------
  const middleContainer = document.createElement('div');
  middleContainer.style.display = 'flex';
  middleContainer.style.alignItems = 'center';
  middleContainer.style.gap = '5px';

  // Back (Previous) Button.
  const backButton = document.createElement('button');
  backButton.id = 'back-button';
  backButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  `;
  backButton.style.width = '30px';
  backButton.style.height = '30px';
  backButton.style.cursor = 'pointer';
  backButton.style.border = 'none';
  backButton.style.background = 'none';
  backButton.addEventListener('click', () => {
    window.history.back();
  });

  // Next Button.
  const nextButton = document.createElement('button');
  nextButton.id = 'next-button';
  nextButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="green" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
    </svg>
  `;
  nextButton.style.width = '30px';
  nextButton.style.height = '30px';
  nextButton.style.cursor = 'pointer';
  nextButton.style.border = 'none';
  nextButton.style.background = 'none';
  nextButton.addEventListener('click', () => {
    window.history.forward();
  });

  middleContainer.appendChild(backButton);
  middleContainer.appendChild(nextButton);

  // -------------------------------
  // Assemble the navbar.
  // -------------------------------
  navBar.appendChild(leftContainer);
  navBar.appendChild(middleContainer);
  document.body.appendChild(navBar);

  // -------------------------------
  // URL Input Field: Update on Enter key.
  // -------------------------------
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      let url = input.value.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }
      window.location.href = url;
    }
  });
});
