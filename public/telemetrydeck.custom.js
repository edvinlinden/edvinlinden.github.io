const script = document.currentScript;
const appId = script.dataset.appId;

const assert = (value, message) => {
  if (!value) {
    throw new Error(`TelemetryDeck: ${message}`);
  }
};

assert(appId, '"data-app-id" missing');

// Opt-out. The key is read by the control on /privacy/, which is the only place
// it is written. Storage throws when the browser blocks it (Safari with cookies
// disabled), and an unreadable flag must not be treated as consent to collect.
const OPT_OUT_KEY = "telemetryDeck-optout";

const isOptedOut = () => {
  if (navigator.globalPrivacyControl === true) {
    return true;
  }

  try {
    return localStorage.getItem(OPT_OUT_KEY) === "true";
  } catch {
    return true;
  }
};

class TelemetryDeck {
  constructor(appId) {
    this.appId = appId;
    this.version = "1.1.0-custom";
    this.locale = navigator.language;
    this.api = "https://nom.telemetrydeck.com/v2/w/";

    this.sendSignal();
  }

  sendSignal(params) {
    // Checked per signal rather than once at startup, so that turning the
    // switch off on /privacy/ stops collection on that same page view.
    if (isOptedOut()) {
      return;
    }

    const isTestMode =
      /^localhost$|^127(\.\d+){0,2}\.\d+$|^\[::1?]$/.test(location.hostname) ||
      "file:" === location.protocol;

    const config = {
      appID: this.appId,
      url: location.href,
      referrer: document.referrer,
      telemetryClientVersion: `WebSDK ${this.version}`,
      locale: this.locale,
    };

    if (isTestMode) {
      config.isTestMode = true;
    }

    const body = { ...params, ...config };

    fetch(this.api, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}

window.TelemetryDeck = new TelemetryDeck(appId);
