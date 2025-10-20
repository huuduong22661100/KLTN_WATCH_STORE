


export function clearAllStorage() {
  if (typeof window === 'undefined') return;

  
  const keysToRemove = [
    'user-auth-storage',
    'cart-storage',
    'wishlist-storage',
    'token',
    
  ];

  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}


export function clearAuthStorage() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('user-auth-storage');
  localStorage.removeItem('token');
  sessionStorage.removeItem('user-auth-storage');
  sessionStorage.removeItem('token');
}


export function clearCartStorage() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('cart-storage');
  sessionStorage.removeItem('cart-storage');
}


export function clearWishlistStorage() {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('wishlist-storage');
  sessionStorage.removeItem('wishlist-storage');
}


export function isUserAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const authStorage = localStorage.getItem('user-auth-storage');
    if (!authStorage) return false;

    const parsed = JSON.parse(authStorage);
    return parsed?.state?.isAuthenticated === true && !!parsed?.state?.token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}


export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const authStorage = localStorage.getItem('user-auth-storage');
    if (!authStorage) return null;

    const parsed = JSON.parse(authStorage);
    return parsed?.state?.token || null;
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
}


export function cleanupStorage() {
  if (typeof window === 'undefined') return;

  try {
    
    const authStorage = localStorage.getItem('user-auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      const hasValidAuth = parsed?.state?.isAuthenticated && parsed?.state?.token;

      if (!hasValidAuth) {
        
        clearAuthStorage();
        clearCartStorage();
      }
    }

    
    const cartStorage = localStorage.getItem('cart-storage');
    const hasAuth = isUserAuthenticated();
    
    if (cartStorage && !hasAuth) {
      
      clearCartStorage();
    }
  } catch (error) {
    console.error('Error cleaning up storage:', error);
    
    clearAllStorage();
  }
}
