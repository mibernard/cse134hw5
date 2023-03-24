class ButtonCount extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
        <style>
          button {
            font-size: 16px;
            padding: 10px 20px;
            cursor: pointer;
            display:flex;
            align-items:center;
            background-color: transparent;
            margin-top: 20px;            
          }
        </style>
        <button id="cookie-btn"><img src="assets/cookie.png" alt="Cookie" width="50" height="50">Stop taking cookies. You've already taken this many cookies: <span class="count">0</span></button>
        <button id="upgrade-btn">Buy upgrade for 100 cookies (x2 cookies per click)</button>
        <div class="upgrade-info">Upgrades: 0</div>
        <button id="auto-clicker-btn">Buy old woman for 50 cookies (+10 cookie per second)</button>
        <div class="auto-clicker-info">Cookies/sec: 0</div>

        <button id="reset-btn">Your cookies are probably stale. Toss them.</button>
        <button id="reset-grannies-btn">Throw away your grannies.</button>
        
      `;

    this.cookieButton = this.shadowRoot.querySelector("#cookie-btn");
    this.upgradeButton = this.shadowRoot.querySelector("#upgrade-btn");
    this.autoClickerButton = this.shadowRoot.querySelector("#auto-clicker-btn");
    this.resetButton = this.shadowRoot.querySelector("#reset-btn");
    this.resetGranniesButton = this.shadowRoot.querySelector(
      "#reset-grannies-btn"
    );
    this.countDisplay = this.shadowRoot.querySelector(".count");
    this.upgradeInfo = this.shadowRoot.querySelector(".upgrade-info");
    this.autoClickerInfo = this.shadowRoot.querySelector(".auto-clicker-info");
    this.cookieCount = 0;
    this.upgrades = 0;
    this.autoClickers = 0;
    this.cookiesPerClick = 1;

    this.cookieButton.addEventListener("click", () => {
      this.cookieCount += this.cookiesPerClick;
      this.updateCookieDisplay();
    });

    this.upgradeButton.addEventListener("click", () => {
      if (this.cookieCount >= 100) {
        this.cookieCount -= 100;
        this.upgrades++;
        this.cookiesPerClick *= 2;
        this.updateCookieDisplay();
        this.upgradeInfo.textContent = `Upgrades: ${this.upgrades}`;
      }
    });

    this.autoClickerButton.addEventListener("click", () => {
      if (this.cookieCount >= 50) {
        this.cookieCount -= 50;
        this.autoClickers += 10;
        this.updateCookieDisplay();
        this.autoClickerInfo.textContent = `Cookies/sec: ${this.autoClickers}`;
      }
    });

    this.resetButton.addEventListener("click", () => {
      this.cookieCount = 0;
    });
    this.resetGranniesButton.addEventListener("click", () => {
      this.autoClickers = 0;
    });

    setInterval(() => {
      this.cookieCount += this.autoClickers;
      this.updateCookieDisplay();
    }, 1000);
  }
  updateCookieDisplay() {
    this.countDisplay.textContent = `${this.cookieCount}`;
  }
}

customElements.define("button-count", ButtonCount);
