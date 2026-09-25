// Web Notification API helpers for Pomodoro & Study Reminders

const STORAGE_KEY_NOTIFICATIONS = 'dsa_tracker_notifications_v1';

export function loadNotificationsEnabled(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (saved !== null) {
      return saved === 'true';
    }
  } catch {
    // ignore
  }
  return false;
}

export function saveNotificationsEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, String(enabled));
  } catch {
    // ignore
  }
}

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) return 'unsupported';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) return false;
  try {
    const permission = await Notification.requestPermission();
    const granted = permission === 'granted';
    saveNotificationsEnabled(granted);
    return granted;
  } catch (err) {
    console.error('Failed to request notification permission:', err);
    return false;
  }
}

export function sendPomodoroCompletedNotification(): void {
  if (!isNotificationSupported() || Notification.permission !== 'granted' || !loadNotificationsEnabled()) {
    return;
  }

  const title = 'Pomodoro Finished! 🍅';
  const options: NotificationOptions = {
    body: '25-minute focus session completed! 25 minutes logged to your daily study total. Time for a 5m break.',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: 'pomodoro-completed',
    vibrate: [200, 100, 200]
  };

  // Try Service Worker registration first (standard for Android PWA notification shade)
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(title, options).catch(() => {
        // Fallback to desktop window Notification
        new Notification(title, options);
      });
    }).catch(() => {
      new Notification(title, options);
    });
  } else {
    // Direct browser notification
    try {
      new Notification(title, options);
    } catch {
      // ignore
    }
  }
}

export function sendTestNotification(): boolean {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return false;
  }

  const title = 'DSA Tracker Notification Active 🔔';
  const options: NotificationOptions = {
    body: 'Browser notifications are working! You will be reminded when your 25-minute Pomodoro study session ends.',
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: 'test-notification'
  };

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(reg => reg.showNotification(title, options)).catch(() => {
        new Notification(title, options);
      });
    } else {
      new Notification(title, options);
    }
    return true;
  } catch {
    return false;
  }
}
