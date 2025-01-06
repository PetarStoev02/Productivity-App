type FirebaseAuthError = {
  code: string;
  message: string;
};

export const getAuthError = (error: FirebaseAuthError) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'Невалиден имейл адрес';
    case 'auth/user-disabled':
      return 'Този акаунт е деактивиран';
    case 'auth/user-not-found':
      return 'Не съществува потребител с този имейл';
    case 'auth/wrong-password':
      return 'Грешна парола';
    case 'auth/too-many-requests':
      return 'Твърде много опити. Моля, опитайте по-късно';
    case 'auth/network-request-failed':
      return 'Проблем с връзката. Проверете интернет връзката си';
    default:
      console.error('Unhandled auth error:', error);
      return 'Възникна грешка. Моля, опитайте отново';
  }
}; 