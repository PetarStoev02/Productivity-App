export type AuthErrorCode =
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/too-many-requests'
  | 'auth/network-request-failed'
  | 'auth/invalid-credential'
  | 'auth/internal-error';

interface FirebaseAuthError {
  code: AuthErrorCode;
  message: string;
}

export const getAuthError = (error: FirebaseAuthError) => {
  switch (error.code) {
    // Registration errors
    case 'auth/email-already-in-use':
      return 'Този имейл вече е регистриран';
    case 'auth/weak-password':
      return 'Паролата трябва да бъде поне 6 символа';
    
    // Login errors
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Невалиден имейл или парола';
    
    // Common errors
    case 'auth/invalid-email':
      return 'Невалиден имейл адрес';
    case 'auth/user-disabled':
      return 'Този акаунт е деактивиран';
    case 'auth/too-many-requests':
      return 'Твърде много опити. Моля, опитайте по-късно';
    case 'auth/network-request-failed':
      return 'Проблем с връзката. Проверете интернет връзката си';
    case 'auth/operation-not-allowed':
      return 'Операцията не е разрешена';
    case 'auth/internal-error':
      return 'Възникна вътрешна грешка. Моля, опитайте отново';
    
    default:
      console.error('Unhandled auth error:', error);
      return 'Възникна грешка. Моля, опитайте отново';
  }
}; 