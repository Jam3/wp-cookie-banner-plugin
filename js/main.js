/**
 * Jam3CookieBanner
 *
 * Class to handle core Jam3 Cookie Banner functions
 *
 * @access public
 * @author Ben Moody
 */
var Jam3CookieBanner = function () {

    var self = this;

    /**
     * init
     *
     * Constructor method, called on class instance
     *
     * Boots the process
     *
     * @access public
     * @author Ben Moody
     */
    this.init = function () {

        //vars
        var theBannerContainer = document.getElementById('jam3-cookie-banner');

        //Maybe show banner once page loaded
        if (true === Jam3InitCookieBanner.maybeRenderBanner()) {

            //Show banner
            theBannerContainer.removeAttribute("style");

        }

        //monitoring events to close cookie banner and trigger event
        window.onscroll = this.closeBannerListener;
        window.onclick = this.closeBannerClickListener;
        window.oncontextmenu = this.closeBannerClickListener;
        window.onkeyup = this.closeBannerListener;

    };

  /**
   * closeBannerClickListener
   *
   * @CALLED BY /ACTION '#jam3-close-cookie-banner' CLICK
   *
   * Detect if click was on/inside the cookie banner DOM element, if so ignore close action
   *
   * @access public
   * @author Ben Moody
   */
    this.closeBannerClickListener = function (event) {

      var bannerElement = document.getElementById('jam3-cookie-banner');
      var targetElement = event.target; // clicked element

      if (targetElement === bannerElement) {
        // This is a click inside. Do nothing, just return.
        return;
      }

      if (targetElement.offsetParent === bannerElement) {
        // This is a click inside. Do nothing, just return.
        return;
      }

      self.closeBannerListener();
    };

    /**
    * closeBannerListener
    *
    * @CALLED BY /ACTION '#jam3-close-cookie-banner' CLICK
    *
    * Add css class to hide banner element, set cookie to prevent further appearances
    *
    * @access public
    * @author Ben Moody
    */
    this.closeBannerListener = function () {

        //vars
        var theBannerContainer = document.getElementById('jam3-cookie-banner');

        if (theBannerContainer) {

          self.closeTheBanner();

            var startTrackingEvent = new Event('cookieBannerStartTracking');
            document.dispatchEvent(startTrackingEvent);
        }

    };

    this.closeTheBanner = function () {

      //vars
      var theBannerContainer = document.getElementById('jam3-cookie-banner');

      if (theBannerContainer) {
        //Add closed class to element
        theBannerContainer.classList.add('closed');
        theBannerContainer.parentNode.removeChild(theBannerContainer);
        theBannerContainer = null;

        //Set cookie to log banner as closed
        self.logBannerAsClosed();
      }

    };

    /**
    * logBannerAsClosed
    *
    * Helper to log that banner has been closed by user,
    * sets the cookie in browser
    *
    * @access public
    * @author Ben Moody
    */
    this.logBannerAsClosed = function () {

        //vars
        var cookieName = Jam3InitCookieBanner.pluginCookieName;

        this.setCookie(cookieName, 'true', 365);

    };

    /**
     * setCookie
     *
     * Helper to set cookies in browser
     *
     * @access public
     * @author Ben Moody
     */
    this.setCookie = function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();

        var cookieCommand = cname + "=" + cvalue + ";" + expires + ";path=/;";

        //Detect if cookie should be secure or not
        if ('true' === Jam3InitCookieBanner.isHttps) {
            cookieCommand = cookieCommand + 'secure;';
        }

        document.cookie = cookieCommand;
    };

    return this.init();
};
new Jam3CookieBanner;
