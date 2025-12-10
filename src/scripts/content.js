// ═══════════════════════════════════════════════════════════════
// 🛡️ PROTECTION UNIVERSELLE ANTI-GRAB IP & DONNÉES
// Protection maximale contre toute forme de récupération de données
// ═══════════════════════════════════════════════════════════════

(function() {
    'use strict';
    
    const siteName = window.location.hostname;
    console.log(`%c🛡️ PROTECTION MAXIMALE ACTIVE sur ${siteName}`, 'color:#00ff00; font-size:14px; font-weight:bold; background:#000; padding:5px;');
    
    let blockedCount = 0;
    let domBlockedCount = 0;
    let fingerprintAttempts = 0;
    
    // ═══════════════════════════════════════════════════════
    // 0. PROTECTION ULTIME - Bloquer toute sauvegarde de l'original
    // ═══════════════════════════════════════════════════════
    
    // GELER immédiatement pour empêcher window.oRTCPeerConnection
    Object.defineProperty(window, 'oRTCPeerConnection', {
        get: function() {
            return undefined;
        },
        set: function() {
            // Bloquer silencieusement
        },
        configurable: false,
        enumerable: false
    });
    
    // ═══════════════════════════════════════════════════════
    // 1. PROTECTION WebRTC - BLOQUE LES FUITES D'IP
    // ═══════════════════════════════════════════════════════
    
    const originalRTCPeerConnection = window.RTCPeerConnection;
    
    if (originalRTCPeerConnection) {
        window.RTCPeerConnection = function(config, ...args) {
            console.log('%c🔒 WebRTC intercepté', 'color:#ff9900; font-weight:bold;');
            
            const pc = new originalRTCPeerConnection(config, ...args);
            
            // Intercepter addIceCandidate
            const originalAddIceCandidate = pc.addIceCandidate;
            pc.addIceCandidate = function(candidate, ...rest) {
                if (candidate && candidate.candidate) {
                    const fields = candidate.candidate.split(' ');
                    
                    // Bloquer les candidats srflx qui révèlent l'IP publique
                    if (fields[7] === 'srflx') {
                        blockedCount++;
                        console.log(`%c🛡️ IP LEAK BLOQUÉE! (${blockedCount} total)`, 'color:#00ff00; font-weight:bold; font-size:12px;');
                        console.log('%cCandidat:', candidate.candidate.substring(0, 60) + '...', 'color:#666;');
                        
                        // Ne pas ajouter le candidat
                        return Promise.resolve();
                    }
                }
                
                return originalAddIceCandidate.call(this, candidate, ...rest);
            };
            
            return pc;
        };
        
        // Préserver le prototype
        Object.setPrototypeOf(window.RTCPeerConnection, originalRTCPeerConnection);
        window.RTCPeerConnection.prototype = originalRTCPeerConnection.prototype;
    }
    
    // ═══════════════════════════════════════════════════════
    // 2. PROTECTION DOM - Bloque UNIQUEMENT les iframes malveillants
    // ═══════════════════════════════════════════════════════
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 && node.tagName === 'IFRAME') {
                    const src = node.src || '';
                    
                    // Bloquer UNIQUEMENT les iframes de services d'IP grabbing connus
                    const maliciousServices = [
                        'iplogger.org', 'grabify.link', 'blasze.tk', 'iplogger.com',
                        'iplogger.ru', '2no.co', 'yip.su', 'iplis.ru'
                    ];
                    
                    const isMalicious = maliciousServices.some(service => 
                        src.toLowerCase().includes(service)
                    );
                    
                    if (isMalicious) {
                        domBlockedCount++;
                        console.warn(`%c🚨 IFRAME malveillant bloqué!`, 'color:#ff0000; font-weight:bold;');
                        console.log('URL bloquée:', src);
                        node.remove();
                    }
                }
            });
        });
    });
    
    // Observer dès que possible
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.body) return;
        observer.observe(document.body, { childList: true, subtree: true });
    });
    
    // ═══════════════════════════════════════════════════════
    // 3. PROTECTION LocalStorage
    // ═══════════════════════════════════════════════════════
    
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        const suspiciousKeys = [
            'fusion', 'scanner', 'recon', 'breach', 'cyber',
            'grabber', 'logger', 'tracker', 'disclaimer'
        ];
        
        if (suspiciousKeys.some(k => key.toLowerCase().includes(k))) {
            return; // Bloquer silencieusement
        }
        
        return originalSetItem.call(this, key, value);
    };
    
    // ═══════════════════════════════════════════════════════
    // 4. PROTECTION GPU/WebGL
    // ═══════════════════════════════════════════════════════
    
    const originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(contextType, ...args) {
        const context = originalGetContext.call(this, contextType, ...args);
        
        if ((contextType === 'webgl' || contextType === 'experimental-webgl') && context) {
            const originalGetParameter = context.getParameter;
            const originalGetExtension = context.getExtension;
            
            // Bloquer WEBGL_debug_renderer_info
            context.getExtension = function(name) {
                if (name === 'WEBGL_debug_renderer_info') {
                    return null;
                }
                return originalGetExtension.call(this, name);
            };
            
            // Falsifier les paramètres GPU
            context.getParameter = function(param) {
                const fakeInfo = {
                    37445: 'Intel Inc.',  // UNMASKED_VENDOR_WEBGL
                    37446: 'Intel(R) UHD Graphics 630'  // UNMASKED_RENDERER_WEBGL
                };
                if (fakeInfo[param]) {
                    return fakeInfo[param];
                }
                return originalGetParameter.call(this, param);
            };
        }
        
        return context;
    };
    
    // ═══════════════════════════════════════════════════════
    // 5. PROTECTION Battery API
    // ═══════════════════════════════════════════════════════
    
    if (navigator.getBattery) {
        navigator.getBattery = function() {
            // Retourner une fausse batterie
            return Promise.resolve({
                charging: false,
                chargingTime: Infinity,
                dischargingTime: Infinity,
                level: 1,
                addEventListener: function() {},
                removeEventListener: function() {},
                dispatchEvent: function() { return true; }
            });
        };
    }
    
    // ═══════════════════════════════════════════════════════
    // 6. PROTECTION console.clear()
    // ═══════════════════════════════════════════════════════
    
    const originalConsoleClear = console.clear;
    console.clear = function() {
        // Ne rien faire - bloquer le clear
    };
    
    // ═══════════════════════════════════════════════════════
    // 7. PROTECTION NAVIGATOR - Spoofing des informations
    // ═══════════════════════════════════════════════════════
    
    // Protéger les informations du navigateur
    try {
        Object.defineProperty(navigator, 'userAgent', {
            get: function() {
                fingerprintAttempts++;
                return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    try {
        Object.defineProperty(navigator, 'platform', {
            get: function() {
                fingerprintAttempts++;
                return 'Win32';
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    try {
        Object.defineProperty(navigator, 'hardwareConcurrency', {
            get: function() {
                fingerprintAttempts++;
                return 4; // Valeur générique
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    try {
        Object.defineProperty(navigator, 'deviceMemory', {
            get: function() {
                fingerprintAttempts++;
                return 8;
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    // Falsifier navigator.connection
    try {
        Object.defineProperty(navigator, 'connection', {
            get: function() {
                return {
                    effectiveType: '4g',
                    downlink: 10,
                    rtt: 50,
                    saveData: false
                };
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    // Bloquer les plugins
    try {
        Object.defineProperty(navigator, 'plugins', {
            get: function() {
                fingerprintAttempts++;
                return []; // Tableau vide
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    // ═══════════════════════════════════════════════════════
    // 8. PROTECTION CANVAS - Anti-Fingerprinting
    // ═══════════════════════════════════════════════════════
    
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    const originalToBlob = HTMLCanvasElement.prototype.toBlob;
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    
    // Ajouter du bruit aux données canvas
    HTMLCanvasElement.prototype.toDataURL = function(...args) {
        fingerprintAttempts++;
        
        const context = this.getContext('2d');
        if (context) {
            const imageData = context.getImageData(0, 0, this.width, this.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = imageData.data[i] ^ 1; // XOR pour modifier légèrement
            }
            context.putImageData(imageData, 0, 0);
        }
        
        return originalToDataURL.apply(this, args);
    };
    
    HTMLCanvasElement.prototype.toBlob = function(...args) {
        fingerprintAttempts++;
        return originalToBlob.apply(this, args);
    };
    
    CanvasRenderingContext2D.prototype.getImageData = function(...args) {
        fingerprintAttempts++;
        const imageData = originalGetImageData.apply(this, args);
        
        // Ajouter un bruit minimal
        for (let i = 0; i < imageData.data.length; i += 100) {
            imageData.data[i] = imageData.data[i] ^ 1;
        }
        
        return imageData;
    };
    
    // ═══════════════════════════════════════════════════════
    // 9. PROTECTION SCREEN - Falsification des dimensions
    // ═══════════════════════════════════════════════════════
    
    // Falsifier screen avec des valeurs communes
    try {
        Object.defineProperty(screen, 'width', {
            get: function() {
                fingerprintAttempts++;
                return 1920;
            },
            configurable: true
        });
        
        Object.defineProperty(screen, 'height', {
            get: function() {
                fingerprintAttempts++;
                return 1080;
            },
            configurable: true
        });
        
        Object.defineProperty(screen, 'availWidth', {
            get: function() { return 1920; },
            configurable: true
        });
        
        Object.defineProperty(screen, 'availHeight', {
            get: function() { return 1040; },
            configurable: true
        });
        
        Object.defineProperty(screen, 'colorDepth', {
            get: function() { return 24; },
            configurable: true
        });
        
        Object.defineProperty(screen, 'pixelDepth', {
            get: function() { return 24; },
            configurable: true
        });
        
        // Falsifier window.devicePixelRatio
        Object.defineProperty(window, 'devicePixelRatio', {
            get: function() { return 1; },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    // ═══════════════════════════════════════════════════════
    // 10. PROTECTION TIMEZONE & LANGUE
    // ═══════════════════════════════════════════════════════
    
    // Masquer le timezone réel
    Date.prototype.getTimezoneOffset = function() {
        fingerprintAttempts++;
        return 300; // UTC-5 (New York)
    };
    
    // Falsifier le timezone dans Intl
    const OriginalDateTimeFormat = Intl.DateTimeFormat;
    Intl.DateTimeFormat = function(...args) {
        return new OriginalDateTimeFormat('en-US', { timeZone: 'America/New_York' });
    };
    Intl.DateTimeFormat.prototype = OriginalDateTimeFormat.prototype;
    
    try {
        Intl.DateTimeFormat.prototype.resolvedOptions = function() {
            return {
                locale: 'en-US',
                timeZone: 'America/New_York',
                calendar: 'gregory',
                numberingSystem: 'latn'
            };
        };
    } catch(e) { /* Déjà défini */ }
    
    // Masquer la langue
    try {
        Object.defineProperty(navigator, 'language', {
            get: function() {
                fingerprintAttempts++;
                return 'en-US';
            },
            configurable: true
        });
        
        Object.defineProperty(navigator, 'languages', {
            get: function() {
                fingerprintAttempts++;
                return ['en-US', 'en'];
            },
            configurable: true
        });
    } catch(e) { /* Déjà défini */ }
    
    // ═══════════════════════════════════════════════════════
    // 11. PROTECTION FETCH & XMLHttpRequest
    // ═══════════════════════════════════════════════════════
    
    const originalFetch = window.fetch;
    window.fetch = function(url, ...args) {
        const urlStr = String(url).toLowerCase();
        
        // Bloquer les requêtes vers les services de géolocalisation IP
        const blockedKeywords = ['ipapi', 'ipify', 'geoip', 'ipinfo', 'myip', 'checkip', 'whatismyip'];
        if (blockedKeywords.some(keyword => urlStr.includes(keyword))) {
            blockedCount++;
            console.error(`%c🚨 REQUÊTE IP BLOQUÉE: ${urlStr}`, 'color:#ff0000; font-weight:bold; font-size:12px;');
            console.error(`%c🛡️ API de géolocalisation détectée et neutralisée`, 'color:#ff0000;');
            // Retourner une fausse réponse au lieu de rejeter
            return Promise.resolve(new Response(JSON.stringify({
                ip: '0.0.0.0',
                city: 'Unknown',
                country: 'Unknown',
                org: 'Protected',
                error: true,
                reason: 'blocked'
            }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
        }
        
        return originalFetch.call(this, url, ...args);
    };
    
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
        const urlStr = String(url).toLowerCase();
        
        // Bloquer les requêtes vers les services de géolocalisation IP
        const blockedKeywords = ['ipapi', 'ipify', 'geoip', 'ipinfo', 'myip', 'checkip', 'whatismyip'];
        if (blockedKeywords.some(keyword => urlStr.includes(keyword))) {
            blockedCount++;
            console.error(`%c🚨 XHR IP BLOQUÉE: ${urlStr}`, 'color:#ff0000; font-weight:bold;');
            throw new Error('Blocked by IP Protection');
        }
        
        return originalXHROpen.call(this, method, url, ...args);
    };
    
    // ═══════════════════════════════════════════════════════
    // 12. PROTECTION GEOLOCATION
    // ═══════════════════════════════════════════════════════
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition = function(success, error) {
            if (error) {
                error({ code: 1, message: 'User denied Geolocation' });
            }
        };
        
        navigator.geolocation.watchPosition = function(success, error) {
            if (error) {
                error({ code: 1, message: 'User denied Geolocation' });
            }
            return 0;
        };
    }
    
    // ═══════════════════════════════════════════════════════
    // 13. PROTECTION MEDIADEVICES - Caméra/Micro
    // ═══════════════════════════════════════════════════════
    
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices = function() {
            return Promise.resolve([]); // Retourne aucun device
        };
    }
    
    // ═══════════════════════════════════════════════════════
    // 14. API PUBLIQUE & STATISTIQUES
    // ═══════════════════════════════════════════════════════
    
    window.IPProtection = {
        getStats: function() {
            return {
                site: siteName,
                webRTCBlocked: blockedCount,
                domBlocked: domBlockedCount,
                fingerprintAttempts: fingerprintAttempts,
                protectionActive: true,
                timestamp: new Date().toISOString()
            };
        },
        status: function() {
            console.log('%c═══════════════════════════════════════════════════', 'color:#00ff99;');
            console.log('%c🛡️ PROTECTION ANTI-GRAB IP & DONNÉES', 'color:#00ff99; font-size:16px; font-weight:bold;');
            console.log('%c═══════════════════════════════════════════════════', 'color:#00ff99;');
            console.log(`%cSite protégé: ${siteName}`, 'color:#1ec8ff; font-weight:bold;');
            console.log(`%c📊 Statistiques de protection:`, 'color:#ffff00; font-weight:bold;');
            console.log(`%c  • Fuites WebRTC/IP bloquées: ${blockedCount}`, 'color:#00ff99;');
            console.log(`%c  • Éléments DOM malveillants: ${domBlockedCount}`, 'color:#00ff99;');
            console.log(`%c  • Tentatives de fingerprinting: ${fingerprintAttempts}`, 'color:#00ff99;');
            console.log('%c', 'color:#fff;');
            console.log('%c🔒 Protections actives:', 'color:#ffff00; font-weight:bold;');
            console.log('%c  ✓ WebRTC IP leak protection', 'color:#fff;');
            console.log('%c  ✓ Canvas fingerprinting protection', 'color:#fff;');
            console.log('%c  ✓ Navigator spoofing', 'color:#fff;');
            console.log('%c  ✓ Screen dimension masking', 'color:#fff;');
            console.log('%c  ✓ Timezone & language masking', 'color:#fff;');
            console.log('%c  ✓ Geolocation blocking', 'color:#fff;');
            console.log('%c  ✓ MediaDevices protection', 'color:#fff;');
            console.log('%c  ✓ IP API requests blocking', 'color:#fff;');
            console.log('%c  ✓ DOM injection blocking', 'color:#fff;');
            console.log('%c  ✓ LocalStorage protection', 'color:#fff;');
            console.log('%c  ✓ GPU/WebGL masking', 'color:#fff;');
            console.log('%c  ✓ Battery API blocking', 'color:#fff;');
            console.log('%c═══════════════════════════════════════════════════', 'color:#00ff99;');
            
            return this.getStats();
        },
        clearStats: function() {
            blockedCount = 0;
            domBlockedCount = 0;
            fingerprintAttempts = 0;
            console.log('%c✅ Statistiques réinitialisées', 'color:#00ff99;');
        }
    };
    
    // Envoyer les stats au background
    setInterval(() => {
        try {
            chrome.runtime.sendMessage({
                type: 'UPDATE_STATS',
                stats: {
                    webRTCBlocked: blockedCount,
                    fingerprintBlocked: fingerprintAttempts
                }
            });
        } catch (e) {
            // Ignore les erreurs si le background n'est pas disponible
        }
    }, 5000);
    
    // Message final
    console.log('%c✅ PROTECTION MAXIMALE ACTIVÉE', 'color:#00ff00; font-weight:bold; font-size:14px;');
    console.log('%cℹ️ Tapez IPProtection.status() pour voir le statut complet', 'color:#1ec8ff;');
    console.log('%cℹ️ Tapez IPProtection.getStats() pour les statistiques', 'color:#1ec8ff;');
    
})();
