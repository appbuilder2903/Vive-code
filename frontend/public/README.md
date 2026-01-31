# Vive Code Logo

This directory contains the logo assets for Vive Code.

## Files

- `logo.svg` - Main logo with animated cursor (light mode)
- `logo-dark.svg` - Dark mode variant of the logo
- `favicon.svg` - Favicon for the browser tab

## Design Elements

The logo features:
- **Code brackets** (`< >`) representing coding and development
- **V shape** in the center symbolizing "Vive" and victory/success
- **Animated cursor** that blinks, representing active coding
- **AI sparkle** indicator in the top right showing AI capabilities
- **Gradient colors** (blue to purple) representing innovation and technology

## Usage

The Logo component automatically switches between light and dark variants based on the user's theme preference.

```tsx
import { Logo } from '@/components/Logo';

// With text
<Logo size="md" withText={true} />

// Icon only
<Logo size="sm" withText={false} />

// Large variant
<Logo size="lg" />
```

## Sizes

- `sm`: 24px (6 Tailwind units)
- `md`: 40px (10 Tailwind units) 
- `lg`: 64px (16 Tailwind units)
