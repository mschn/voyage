import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{gray.50}',
      100: '{gray.100}',
      200: '{gray.200}',
      300: '{gray.300}',
      400: '{gray.400}',
      500: '{gray.500}',
      600: '{gray.600}',
      700: '{gray.700}',
      800: '{gray.800}',
      900: '{gray.900}',
      950: '{gray.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{gray.950}',
          inverseColor: '#ffffff',
          hoverColor: '{gray.900}',
          activeColor: '{gray.800}',
        },
        highlight: {
          background: '{gray.300}',
          focusBackground: '{gray.700}',
          color: '{gray.700}',
          focusColor: '#ffffff',
        },
      },
      dark: {
        primary: {
          color: '{gray.50}',
          inverseColor: '{gray.950}',
          hoverColor: '{gray.100}',
          activeColor: '{gray.200}',
        },
        highlight: {
          background: '{gray.600}',
          focusBackground: '{gray.950}',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
      },
    },
  },
});
