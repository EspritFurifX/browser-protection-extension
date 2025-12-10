// ═══════════════════════════════════════════════════════════════
// 🛡️ BACKGROUND SERVICE WORKER - Protection Anti-Grab
// ═══════════════════════════════════════════════════════════════

let stats = {
    webRTCBlocked: 0,
    requestsBlocked: 0,
    fingerprintBlocked: 0,
    ipLeaksBlocked: 0,
    startTime: Date.now()
};

chrome.runtime.onInstalled.addListener(() => {
    console.log('🛡️ Protection Anti-Grab IP & Données installée!');
    console.log('Protection maximale activée sur TOUS les sites.');
    
    // Badge pour montrer que la protection est active
    chrome.action.setBadgeText({ text: 'ON' });
    chrome.action.setBadgeBackgroundColor({ color: '#00ff99' });
    
    // Initialiser les paramètres de confidentialité
    initializePrivacySettings();
});

// ═══════════════════════════════════════════════════════
// PARAMÈTRES DE CONFIDENTIALITÉ CHROME
// ═══════════════════════════════════════════════════════

function initializePrivacySettings() {
    // Bloquer WebRTC au niveau du navigateur
    if (chrome.privacy && chrome.privacy.network) {
        chrome.privacy.network.webRTCIPHandlingPolicy.set({
            value: 'disable_non_proxied_udp'
        });
        
        chrome.privacy.network.networkPredictionEnabled.set({
            value: false
        });
    }
    
    // Protections supplémentaires
    if (chrome.privacy && chrome.privacy.websites) {
        chrome.privacy.websites.thirdPartyCookiesAllowed.set({
            value: false
        });
        
        chrome.privacy.websites.hyperlinkAuditingEnabled.set({
            value: false
        });
        
        chrome.privacy.websites.referrersEnabled.set({
            value: false
        });
    }
    
    console.log('✅ Paramètres de confidentialité configurés');
}

// ═══════════════════════════════════════════════════════
// BLOCAGE DES REQUÊTES MALVEILLANTES
// ═══════════════════════════════════════════════════════

const blockedDomains = [
    'ipapi.co',
    'ipify.org',
    'ip-api.com',
    'geoip-db.com',
    'ipinfo.io',
    'ipgeolocation.io',
    'freegeoip.app',
    'api.myip.com',
    'wtfismyip.com',
    'icanhazip.com',
    'checkip.amazonaws.com',
    'ifconfig.me',
    'ipecho.net',
    'ident.me',
    'whatismyipaddress.com'
];

// Configuration des règles de blocage avec declarativeNetRequest (Manifest V3)
async function setupBlockingRules() {
    try {
        // Supprimer les anciennes règles
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const ruleIds = existingRules.map(rule => rule.id);
        
        if (ruleIds.length > 0) {
            await chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: ruleIds
            });
        }
        
        // Ajouter les nouvelles règles
        await chrome.declarativeNetRequest.updateDynamicRules({
            addRules: blockedDomains.map((domain, index) => ({
                id: index + 1,
                priority: 1,
                action: { type: 'block' },
                condition: {
                    urlFilter: `*${domain}*`,
                    resourceTypes: ['xmlhttprequest', 'script', 'other', 'main_frame', 'sub_frame']
                }
            }))
        });
        
        console.log('✅ Règles de blocage IP configurées:', blockedDomains.length, 'domaines');
        
    } catch (err) {
        console.warn('⚠️ Erreur configuration règles:', err.message);
    }
}

// Configurer les règles au démarrage
setupBlockingRules();

// ═══════════════════════════════════════════════════════
// GESTION DES MESSAGES DU CONTENT SCRIPT
// ═══════════════════════════════════════════════════════

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'UPDATE_STATS') {
        // Mettre à jour les statistiques
        if (message.stats) {
            stats.webRTCBlocked += message.stats.webRTCBlocked || 0;
            stats.fingerprintBlocked += message.stats.fingerprintBlocked || 0;
        }
    } else if (message.type === 'GET_STATS') {
        // Envoyer les statistiques
        sendResponse({
            stats: {
                ...stats,
                uptime: Math.floor((Date.now() - stats.startTime) / 1000)
            }
        });
    }
    return true;
});

// ═══════════════════════════════════════════════════════
// MISE À JOUR DU BADGE
// ═══════════════════════════════════════════════════════

chrome.tabs.onActivated.addListener(() => {
    const totalBlocked = stats.webRTCBlocked + stats.requestsBlocked + stats.fingerprintBlocked;
    
    if (totalBlocked > 0) {
        chrome.action.setBadgeText({ text: String(totalBlocked) });
        chrome.action.setBadgeBackgroundColor({ color: '#ff0000' });
    } else {
        chrome.action.setBadgeText({ text: 'ON' });
        chrome.action.setBadgeBackgroundColor({ color: '#00ff99' });
    }
});

// Mettre à jour le badge toutes les 5 secondes
setInterval(() => {
    const totalBlocked = stats.webRTCBlocked + stats.requestsBlocked + stats.fingerprintBlocked;
    
    if (totalBlocked > 0) {
        chrome.action.setBadgeText({ text: String(totalBlocked) });
        chrome.action.setBadgeBackgroundColor({ color: '#ff0000' });
    }
}, 5000);
