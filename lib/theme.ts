import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const THEME_KEY = 'app-theme';

type Theme = 'light' | 'dark' | 'system';

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem(THEME_KEY) as Theme) || 'system';
};

const setStoredTheme = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

export const useTheme = () => {
  const queryClient = useQueryClient();

  const { data: theme = 'system' } = useQuery({
    queryKey: ['theme'],
    queryFn: getStoredTheme,
    staleTime: Infinity,
  });

  const { mutate: setTheme } = useMutation({
    mutationFn: (newTheme: Theme) => {
      setStoredTheme(newTheme);
      return Promise.resolve(newTheme);
    },
    onSuccess: (newTheme) => {
      queryClient.setQueryData(['theme'], newTheme);
      updateDocumentClass(newTheme);
    },
  });

  return { theme, setTheme };
};

const updateDocumentClass = (theme: Theme) => {
  if (typeof window === 'undefined') return;

  const root = window.document.documentElement;
  root.classList.remove('light', 'dark');

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
};