// Google AdSense Integration and Ad Management
// Handles ad loading, fallback detection, and performance optimization

class AdSenseManager {
  constructor() {
    this.adContainers = document.querySelectorAll(".ad-container");
    this.adBlockDetected = false;
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupAds());
    } else {
      this.setupAds();
    }
  }

  setupAds() {
    // Detect ad blockers
    this.detectAdBlocker().then((blocked) => {
      this.adBlockDetected = blocked;
      this.handleAdDisplay();
    });

    // Setup intersection observer for lazy loading
    this.setupIntersectionObserver();

    // Add loading states
    this.addLoadingStates();

    // Monitor ad loading
    this.monitorAdLoading();
  }

  // Detect if ad blocker is present
  async detectAdBlocker() {
    return new Promise((resolve) => {
      const adTest = document.createElement("div");
      adTest.innerHTML = "&nbsp;";
      adTest.className = "adsbox";
      adTest.style.cssText =
        "position:absolute;top:-999px;left:-999px;width:1px;height:1px;";

      document.body.appendChild(adTest);

      setTimeout(() => {
        const isBlocked =
          adTest.offsetHeight === 0 ||
          window.getComputedStyle(adTest).display === "none" ||
          !document.querySelector(".adsbox");

        document.body.removeChild(adTest);
        resolve(isBlocked);
      }, 100);
    });
  }

  // Handle ad display based on ad blocker detection
  handleAdDisplay() {
    this.adContainers.forEach((container) => {
      if (this.adBlockDetected) {
        container.classList.add("ad-blocked");
        this.showFallbackContent(container);
      } else {
        container.classList.add("ad-enabled");
        this.loadAdSenseAds(container);
      }
    });
  }

  // Show fallback content when ads are blocked
  showFallbackContent(container) {
    const fallback = container.querySelector(".ad-fallback");
    if (fallback) {
      fallback.style.opacity = "1";
      fallback.style.pointerEvents = "auto";
    }

    // Add helpful message
    this.logAdBlockerInfo();
  }

  // Load AdSense ads for containers
  loadAdSenseAds(container) {
    const adElements = container.querySelectorAll(".adsbygoogle");

    adElements.forEach((ad) => {
      // Mark as loading
      container.classList.add("loading");

      try {
        // Push ad to AdSense queue
        if (window.adsbygoogle && window.adsbygoogle.push) {
          window.adsbygoogle.push({});
        }

        // Set loaded state after a delay
        setTimeout(() => {
          container.classList.remove("loading");
          container.classList.add("ad-loaded");
        }, 2000);
      } catch (error) {
        console.warn("AdSense loading error:", error);
        container.classList.remove("loading");
        this.showFallbackContent(container);
      }
    });
  }

  // Setup intersection observer for lazy loading
  setupIntersectionObserver() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const container = entry.target;
              if (
                !container.classList.contains("ad-loaded") &&
                !container.classList.contains("ad-blocked")
              ) {
                this.loadAdSenseAds(container);
              }
              observer.unobserve(container);
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.1,
        }
      );

      this.adContainers.forEach((container) => {
        observer.observe(container);
      });
    }
  }

  // Add loading states to ad containers
  addLoadingStates() {
    this.adContainers.forEach((container) => {
      container.setAttribute("aria-busy", "true");
      container.setAttribute("aria-label", "Loading advertisement");
    });
  }

  // Monitor ad loading success/failure
  monitorAdLoading() {
    // Check if AdSense script loaded successfully
    if (typeof window.adsbygoogle === "undefined") {
      console.warn("AdSense script not loaded");
      this.handleAdLoadingFailure();
      return;
    }

    // Monitor for ad loading completion
    setTimeout(() => {
      this.adContainers.forEach((container) => {
        const adElements = container.querySelectorAll(".adsbygoogle");
        let hasLoadedAds = false;

        adElements.forEach((ad) => {
          if (ad.getAttribute("data-adsbygoogle-status") === "done") {
            hasLoadedAds = true;
          }
        });

        if (!hasLoadedAds && !this.adBlockDetected) {
          console.warn("Ad failed to load in container:", container);
          this.showFallbackContent(container);
        }

        // Update accessibility attributes
        container.setAttribute("aria-busy", "false");
        container.setAttribute(
          "aria-label",
          hasLoadedAds ? "Advertisement" : "Advertisement placeholder"
        );
      });
    }, 5000);
  }

  // Handle ad loading failures
  handleAdLoadingFailure() {
    this.adContainers.forEach((container) => {
      container.classList.add("ad-failed");
      this.showFallbackContent(container);
    });
  }

  // Log ad blocker information for analytics
  logAdBlockerInfo() {
    if (this.adBlockDetected) {
      console.log("Ad blocker detected - showing fallback content");

      // You can send this information to your analytics
      if (typeof gtag !== "undefined") {
        gtag("event", "ad_blocker_detected", {
          event_category: "advertising",
          event_label: "user_has_ad_blocker",
        });
      }
    }
  }

  // Refresh ads (useful for SPA navigation)
  refreshAds() {
    this.adContainers.forEach((container) => {
      container.classList.remove("ad-loaded", "ad-blocked", "ad-failed");
      container.classList.add("loading");
    });

    this.setupAds();
  }

  // Get ad performance metrics
  getAdMetrics() {
    const metrics = {
      totalContainers: this.adContainers.length,
      loadedAds: document.querySelectorAll(".ad-container.ad-loaded").length,
      blockedAds: document.querySelectorAll(".ad-container.ad-blocked").length,
      failedAds: document.querySelectorAll(".ad-container.ad-failed").length,
      adBlockerDetected: this.adBlockDetected,
    };

    console.log("Ad Performance Metrics:", metrics);
    return metrics;
  }
}

// AdSense Policy Compliance Helper
class AdSensePolicyCompliance {
  static checkPageCompliance() {
    const issues = [];

    // Check for proper ad labeling
    const adContainers = document.querySelectorAll(".ad-container");
    adContainers.forEach((container, index) => {
      if (!container.getAttribute("aria-label")) {
        issues.push(`Ad container ${index + 1} missing aria-label`);
      }
    });

    // Check for content-to-ad ratio
    const contentSections = document.querySelectorAll(
      "main section:not(.ad-container)"
    );
    const adSections = document.querySelectorAll(".ad-container");

    if (adSections.length > contentSections.length) {
      issues.push("Too many ads relative to content");
    }

    // Check for ad placement near navigation
    const navigation = document.querySelector("nav");
    if (navigation) {
      adContainers.forEach((container) => {
        const rect1 = navigation.getBoundingClientRect();
        const rect2 = container.getBoundingClientRect();

        if (Math.abs(rect1.bottom - rect2.top) < 50) {
          issues.push("Ad placed too close to navigation");
        }
      });
    }

    if (issues.length === 0) {
      console.log("✅ Page is compliant with AdSense policies");
    } else {
      console.warn("⚠️ AdSense policy issues found:", issues);
    }

    return issues;
  }

  static generateComplianceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      issues: this.checkPageCompliance(),
      adCount: document.querySelectorAll(".ad-container").length,
      pageType: "qr-generator",
      contentQuality: "high-value-tool",
    };

    return report;
  }
}

// Initialize AdSense manager when script loads
document.addEventListener("DOMContentLoaded", () => {
  // Initialize ad management
  window.adSenseManager = new AdSenseManager();

  // Run compliance check in development
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname.includes("127.0.0.1")
  ) {
    setTimeout(() => {
      AdSensePolicyCompliance.checkPageCompliance();
    }, 2000);
  }
});

// Performance optimization for ad loading
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    // Preload AdSense resources during idle time
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.href =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    preloadLink.as = "script";
    document.head.appendChild(preloadLink);
  });
}

// Export for global access
window.AdSenseManager = AdSenseManager;
window.AdSensePolicyCompliance = AdSensePolicyCompliance;
