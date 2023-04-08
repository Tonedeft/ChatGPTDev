// Function to block known ad-serving and tracking JavaScript files
function blockAdScripts() {
    const adServingScripts = [
        /.*googletagmanager\.com\/gtm\.js.*/,
        /.*googleads\.g\.doubleclick\.net\/pagead\/js\/adsbygoogle\.js.*/,
        /.*adsbyisocket\.com\/ads\.min\.js.*/,
        /.*cdn\.taboola\.com\/libtrc\/.*/,
        /.*cdn\.ampproject\.org\/v0\/amp-ad-0\.1\.js.*/,
        /.*s0\.2mdn\.net\/ads\/studio\/Enabler\.js.*/,
        /.*code\.jquery\.com\/jquery-3\.6\.0\.min\.js.*/,
        /.*js\.hsforms\.net\/forms\/v2\.js.*/,
        /.*cdn\.optimizely\.com\/js\/.*/,
        /.*connect\.facebook\.net\/en_US\/sdk\.js.*/,
        /.*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js.*/,
        /.*adservice\.google\.com\/adsid\/integrator\.js.*/,
        /.*securepubads\.g\.doubleclick\.net\/tag\/js\/gpt\.js.*/,
        /.*cdn\.cookielaw\.org\/consent\/2\.0\.0\/consent\.min\.js.*/,
        /.*s3\.amazonaws\.com\/downloads\.mailchimp\.com\/js\/mc-validate\.js.*/,
        /.*cdn\.krxd\.net\/controltag.*/,
        /.*p\.typekit\.net\/p\.min\.js.*/,
        /.*tags\.tiqcdn\.com\/utag\/.*/,
        /.*d\.adroll\.com\/cm\/aol\/outbrain.*/,
        /.*cdn\.mxpnl\.com\/libs\/mixpanel-2-latest\.min\.js.*/,
        /.*pixel\.sitescout\.com\/dmp\/async_pixel_sync.*/,
        /.*js\.hs-analytics\.net\/analytics\/.*/,
        /.*static\.hotjar\.com\/c\/hotjar-.*/,
        /.*assets\.pinterest\.com\/js\/pinit\.js.*/,
        /.*static\.ads-twitter\.com\/uwt\.js.*/,
        /.*ad\.doubleclick\.net.*js.*/,


        /googlesyndication\.com\/.*\.(js|html)/i, // block AdSense ads
        /pagead2\.googlesyndication\.com\/.*\.(js|html)/i, // block AdSense ads
        /ads\.google\.com\/.*\.(js|html)/i, // block AdSense ads
        /doubleclick\.net\/.*\.(js|html)/i, // block DoubleClick ads
        /adnxs\.com\/.*\.(js|html)/i, // block AppNexus ads
        /ads\.twitter\.com\/.*\.(js|html)/i, // block Twitter ads
        /ads\.linkedin\.com\/.*\.(js|html)/i, // block LinkedIn ads
        /facebook\.com\/.*\.(js|html)/i, // block Facebook ads
        /googletagmanager\.com\/.*\.(js|html)/i, // block Google Tag Manager
        /quantserve\.com\/.*\.(js|html)/i, // block Quantcast ads
        /googletagservices\.com\/.*\.(js|html)/i, // block Google Tag Services
        /scorecardresearch\.com\/.*\.(js|html)/i, // block Scorecard Research ads
        /zedo\.com\/.*\.(js|html)/i, // block Zedo ads
        /pubmatic\.com\/.*\.(js|html)/i, // block PubMatic ads
        /rubiconproject\.com\/.*\.(js|html)/i, // block Rubicon Project ads
        /criteo\.net\/.*\.(js|html)/i, // block Criteo ads
        /creativecdn\.com\/.*\.(js|html)/i, // block Creative CDN ads
        /adroll\.com\/.*\.(js|html)/i, // block AdRoll ads
        /yieldmo\.com\/.*\.(js|html)/i, // block Yieldmo ads
        /serving-sys\.com\/.*\.(js|html)/i, // block Atlas ads
        /adform\.net\/.*\.(js|html)/i, // block AdForm ads
        /adswizz\.com\/.*\.(js|html)/i, // block AdsWizz ads
        /gumgum\.com\/.*\.(js|html)/i, // block GumGum ads
        /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i,
        /ads\.yahoo\.com\/js\/rapid-3\.0\.0\.js/i,
        /connect\.facebook\.net\/\w+\/sdk\.js/i,
        /geo\.moatads\.com\/.*\.(js|html)/i,

    ];

    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) {
        const script = scripts[i];
        for (let j = 0; j < adServingScripts.length; j++) {
            if (adServingScripts[j].test(script.src)) {
                console.log(`Blocked ad or script from ${script.src}`);
                script.parentNode.removeChild(script);
                break;
            }
        }
    }
}

// Hide ads by changing the display style property of common ad elements
function hideAds() {
    const adSelectors = [
        // Add selectors for common ad elements here
        'div[id^="ad"]',
        'div[class*="ad"]',
        'div[id^="ads"]',
        'div[class*="ads"]',
        'iframe[src*="ad"]',
        'img[src*="ad"]',
        'img[src*="ads"]',
        'iframe[src*="ads"]'
    ];
    // Hide each ad element
    adSelectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            console.log(`Hiding element: ${element}`);
            element.style.display = 'none';
        });
    });

    // const ads = document.querySelectorAll('div[class*="ad"], div[id*="ad"], div[class*="ads"], div[id*="ads"], div[class*="sponsored"], div[id*="sponsored"], div[class*="banner"], div[id*="banner"], div[class*="pop"], div[id*="pop"], div[class*="modal"], div[id*="modal"], div[class*="overlay"], div[id*="overlay"], iframe[src*="doubleclick"], iframe[src*="advertising"], iframe[src*="ads"], iframe[src*="banner"], iframe[src*="pop"], iframe[src*="modal"], iframe[src*="overlay"], img[src*="doubleclick"], img[src*="advertising"], img[src*="ads"], img[src*="banner"], img[src*="pop"], img[src*="modal"], img[src*="overlay"]');
    // ads.forEach(ad => ad.style.display = 'none');
}

// Call the blockAdScripts and hideAds functions when the page loads
window.addEventListener('load', () => {
    blockAdScripts();
    hideAds();
});

window.addEventListener('beforeload', function (event) {
    const tag = event.target.tagName.toLowerCase();
    if (tag === 'script') {
        const src = event.target.src;
        if (src) {
            const adServingScripts = [
                /.*googletagmanager\.com\/gtm\.js.*/,
                /.*googleads\.g\.doubleclick\.net\/pagead\/js\/adsbygoogle\.js.*/,
                /.*adsbyisocket\.com\/ads\.min\.js.*/,
                /.*cdn\.taboola\.com\/libtrc\/.*/,
                /.*cdn\.ampproject\.org\/v0\/amp-ad-0\.1\.js.*/,
                /.*s0\.2mdn\.net\/ads\/studio\/Enabler\.js.*/,
                /.*code\.jquery\.com\/jquery-3\.6\.0\.min\.js.*/,
                /.*js\.hsforms\.net\/forms\/v2\.js.*/,
                /.*cdn\.optimizely\.com\/js\/.*/,
                /.*connect\.facebook\.net\/en_US\/sdk\.js.*/,
                /.*pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js.*/,
                /.*adservice\.google\.com\/adsid\/integrator\.js.*/,
                /.*securepubads\.g\.doubleclick\.net\/tag\/js\/gpt\.js.*/,
                /.*cdn\.cookielaw\.org\/consent\/2\.0\.0\/consent\.min\.js.*/,
                /.*s3\.amazonaws\.com\/downloads\.mailchimp\.com\/js\/mc-validate\.js.*/,
                /.*cdn\.krxd\.net\/controltag.*/,
                /.*p\.typekit\.net\/p\.min\.js.*/,
                /.*tags\.tiqcdn\.com\/utag\/.*/,
                /.*d\.adroll\.com\/cm\/aol\/outbrain.*/,
                /.*cdn\.mxpnl\.com\/libs\/mixpanel-2-latest\.min\.js.*/,
                /.*pixel\.sitescout\.com\/dmp\/async_pixel_sync.*/,
                /.*js\.hs-analytics\.net\/analytics\/.*/,
                /.*static\.hotjar\.com\/c\/hotjar-.*/,
                /.*assets\.pinterest\.com\/js\/pinit\.js.*/,
                /.*static\.ads-twitter\.com\/uwt\.js.*/,
                /.*ad\.doubleclick\.net.*js.*/,


                /googlesyndication\.com\/.*\.(js|html)/i, // block AdSense ads
                /pagead2\.googlesyndication\.com\/.*\.(js|html)/i, // block AdSense ads
                /ads\.google\.com\/.*\.(js|html)/i, // block AdSense ads
                /doubleclick\.net\/.*\.(js|html)/i, // block DoubleClick ads
                /adnxs\.com\/.*\.(js|html)/i, // block AppNexus ads
                /ads\.twitter\.com\/.*\.(js|html)/i, // block Twitter ads
                /ads\.linkedin\.com\/.*\.(js|html)/i, // block LinkedIn ads
                /facebook\.com\/.*\.(js|html)/i, // block Facebook ads
                /googletagmanager\.com\/.*\.(js|html)/i, // block Google Tag Manager
                /quantserve\.com\/.*\.(js|html)/i, // block Quantcast ads
                /googletagservices\.com\/.*\.(js|html)/i, // block Google Tag Services
                /scorecardresearch\.com\/.*\.(js|html)/i, // block Scorecard Research ads
                /zedo\.com\/.*\.(js|html)/i, // block Zedo ads
                /pubmatic\.com\/.*\.(js|html)/i, // block PubMatic ads
                /rubiconproject\.com\/.*\.(js|html)/i, // block Rubicon Project ads
                /criteo\.net\/.*\.(js|html)/i, // block Criteo ads
                /creativecdn\.com\/.*\.(js|html)/i, // block Creative CDN ads
                /adroll\.com\/.*\.(js|html)/i, // block AdRoll ads
                /yieldmo\.com\/.*\.(js|html)/i, // block Yieldmo ads
                /serving-sys\.com\/.*\.(js|html)/i, // block Atlas ads
                /adform\.net\/.*\.(js|html)/i, // block AdForm ads
                /adswizz\.com\/.*\.(js|html)/i, // block AdsWizz ads
                /gumgum\.com\/.*\.(js|html)/i, // block GumGum ads
                /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i,
                /ads\.yahoo\.com\/js\/rapid-3\.0\.0\.js/i,
                /connect\.facebook\.net\/\w+\/sdk\.js/i,
                /geo\.moatads\.com\/.*\.(js|html)/i,
            ];

            for (let j = 0; j < adServingScripts.length; j++) {
                if (src.match(adServingScripts[j])) {
                    console.log(`Blocked ad or script from ${src}`);
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
            }
        }
    }
}, true);
