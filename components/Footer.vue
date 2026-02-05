<template> 
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-disc">
          <img src="/logo.png" alt="Vishuro Fan Site" class="footer-logo" />
          <p class="disclaimer">
            Vishuro.xyz is not affiliated with Kuro Game or Punishing: Gray Raven.<br>
            All assets belong to their respective owners.
          </p>
        </div>
        <div class="footer-section">
          <div class="first-section">
            <h3>Community</h3>
            <ul>
              <li><a href="https://discord.gg/example" target="_blank">Join our Discord</a></li>
              <li><a href="https://twitter.com/yourusername" target="_blank">Follow me on X</a></li>
            </ul>
          </div>
  
          <div class="second-section">
            <h3>Official Links</h3>
            <ul>
              <li><a href="https://pgr.kurogame.net" target="_blank">PGR Official Website</a></li>
              <li><a href="https://www.youtube.com/c/PunishingGrayRaven/" target="_blank">PGR YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Vishuro Fan Site | <span class="version">Version 1.0.0</span></p>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    width: 100%;
    background-color: #2a103c;

    color: #ddd;
    padding: 20px;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 100px;
  }
  
  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .footer-disc {
    flex: 1;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    gap: 10px;
  }
  
  .footer-logo {
    max-width: 50px;
    opacity: 0.8;
  }
  
  .disclaimer {
    font-size: 0.85rem;
    opacity: 0.8;
  }
  
  .footer-section {
    flex: 1;
    max-width: 50%;
    display: flex;
    justify-content: space-between;
  }
  
  .first-section, .second-section {
    flex: 1;
    text-align: left;
  }
  
  .footer-section h3 {
    font-size: 1rem;
    margin-bottom: 5px;
    color: #fff;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin: 5px 0;
  }
  
  .footer-section a {
    color: #a778c7;
    text-decoration: none;
  }
  
  .footer-section a:hover {
    text-decoration: underline;
  }
  
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 10px;
    margin-top: 20px;
    font-size: 0.8rem;
  }
  
  .version {
    font-weight: bold;
    color: #fff;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  
    .footer-disc, .footer-section {
      max-width: 100%;
      text-align: center;
      align-items: center;
    }
  
  
    .first-section, .second-section {
      text-align: center;

    }
  
    .footer-logo {
      max-width: 40px;
    }
  }
  </style>
  