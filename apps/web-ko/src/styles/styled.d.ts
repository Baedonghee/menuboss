import { type theme } from '@repo/ui/theme';

import 'styled-components';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeInterface {}
}
