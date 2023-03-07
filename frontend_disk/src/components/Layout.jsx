import styles from "../styles/Layout.module.css";
import { useThemeStore } from "../store/theme";
import themeLibrary from "../themes/themeLibrary";

export default function Layout({ children }) {
  const theme = useThemeStore((state) => state.themeMode);
  const color = themeLibrary(theme);

  return (
    <div style={color.layout} className={styles.container}>
      {children}
    </div>
  );
}
