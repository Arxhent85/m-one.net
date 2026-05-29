"use client";

import React, { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Prüfen, ob der Nutzer bereits eine Entscheidung getroffen hat
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true); // Banner zeigen, wenn keine Entscheidung vorliegt
    } else if (consent === 'accepted') {
      loadThirdPartyScripts(); // Skripte laden, falls bereits akzeptiert
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    loadThirdPartyScripts();
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowBanner(false);
  };

  const loadThirdPartyScripts = () => {
    // Hier können Drittanbieter-Skripte wie Google Analytics geladen werden
    console.log("Einwilligung erteilt. Drittanbieter-Skripte geladen.");
  };

  if (!showBanner) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.banner}>
        <div style={styles.content}>
          <h3 style={styles.title}>Wir verwenden Cookies</h3>
          <p style={styles.text}>
            Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern. Sie können Ihre Einwilligung jederzeit widerrufen.
          </p>
        </div>
        <div style={styles.buttons}>
          <button style={styles.acceptBtn} onClick={acceptCookies}>
            Alle akzeptieren
          </button>
          <button style={styles.declineBtn} onClick={declineCookies}>
            Nur essenzielle
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(3px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: '20px',
    zIndex: 999999,
  },
  banner: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '24px',
    maxWidth: '900px',
    width: '100%',
    display: 'flex',
    flexDirection: 'row' as const,
    gap: '20px',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '1px solid #eee',
  },
  content: {
    flex: 1,
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#111',
  },
  text: {
    margin: 0,
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.5',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
    minWidth: '180px',
  },
  acceptBtn: {
    backgroundColor: '#FF6B00', // M-ONE Orange
    color: '#ffffff',
    border: 'none',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  declineBtn: {
    backgroundColor: '#f5f5f5',
    color: '#333333',
    border: '1px solid #ddd',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    transition: 'background-color 0.2s',
  }
};
