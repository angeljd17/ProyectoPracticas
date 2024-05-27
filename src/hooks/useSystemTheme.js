import { useEffect, useState } from 'react';
import { Appearance } from 'react-native';

const useSystemTheme = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  return theme;
};

export default useSystemTheme;
