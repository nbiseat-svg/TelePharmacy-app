// serviceWorker.js
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content is available, please refresh.')
    // Show a prompt to the user to update the app
    if (confirm('New content is available. Refresh to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline use.')
    // Show a notification or banner that the app is ready for offline use
  },
  onRegistered(swRegistration) {
    console.log('SW registered: ', swRegistration)
    
    // Periodic background sync for critical data
    if (swRegistration && 'periodicSync' in swRegistration) {
      swRegistration.periodicSync.register('critical-data-sync', {
        minInterval: 24 * 60 * 60 * 1000, // 24 hours
      }).catch((error) => {
        console.log('Periodic background sync failed:', error)
      })
    }
  },
  onRegisterError(error) {
    console.log('SW registration error: ', error)
  }
})

// Function to manually update the service worker
export function updateServiceWorker() {
  updateSW()
}

// Function to handle background sync for critical data
export async function syncCriticalData() {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('critical-data-sync')
    } catch (error) {
      console.log('Background sync failed:', error)
    }
  }
}

export default updateSW