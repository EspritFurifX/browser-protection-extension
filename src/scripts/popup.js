// ═══════════════════════════════════════════════════════════════
// 🛡️ POPUP SCRIPT - Affichage des statistiques en temps réel
// ═══════════════════════════════════════════════════════════════

function updateStats() {
    chrome.runtime.sendMessage({ type: 'GET_STATS' }, (response) => {
        if (response && response.stats) {
            const stats = response.stats;
            
            // Calculer le total
            const total = stats.webRTCBlocked + stats.requestsBlocked + 
                         stats.fingerprintBlocked + stats.ipLeaksBlocked;
            
            // Mettre à jour les valeurs
            document.getElementById('totalBlocked').textContent = total;
            document.getElementById('webrtcBlocked').textContent = stats.webRTCBlocked;
            document.getElementById('fingerprintBlocked').textContent = stats.fingerprintBlocked;
            document.getElementById('requestsBlocked').textContent = stats.requestsBlocked;
            document.getElementById('ipLeaksBlocked').textContent = stats.ipLeaksBlocked;
            
            // Mettre à jour l'uptime
            const uptime = stats.uptime;
            let uptimeStr;
            if (uptime < 60) {
                uptimeStr = `${uptime}s`;
            } else if (uptime < 3600) {
                uptimeStr = `${Math.floor(uptime / 60)}m ${uptime % 60}s`;
            } else {
                const hours = Math.floor(uptime / 3600);
                const minutes = Math.floor((uptime % 3600) / 60);
                uptimeStr = `${hours}h ${minutes}m`;
            }
            document.getElementById('uptime').textContent = uptimeStr;
        }
    });
}

// Mettre à jour immédiatement
updateStats();

// Mettre à jour toutes les secondes
setInterval(updateStats, 1000);

// Afficher un message dans la console
console.log('%c🛡️ Protection Anti-Grab IP & Données', 'color:#00ff99; font-size:16px; font-weight:bold;');
console.log('%cPopup chargé avec succès', 'color:#1ec8ff;');
