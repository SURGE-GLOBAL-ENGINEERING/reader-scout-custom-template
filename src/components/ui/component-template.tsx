import { type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

// 1. Define variants using class-variance-authority
const componentVariants = cva(
  // Base styles
  "base-styles-here",
  {
    variants: {
      variant: {
        default: "variant-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "default-size",
        small: "small-size",
        large: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// 2. Define component props
interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  children?: ReactNode;
}

// 3. Create component
export function Component({
  className,
  variant,
  size,
  children,
  ...props
}: ComponentProps) {
  return (
    <div className={componentVariants({ variant, size, className })} {...props}>
      {children}
    </div>
  );
}

// Component Guidelines:
/*
1. File Structure:
   - One component per file
   - Named exports over default exports
   - Place in appropriate directory:
     - ui/: Reusable UI components
     - features/: Feature-specific components
     - layouts/: Layout components

2. Naming Conventions:
   - PascalCase for component names
   - camelCase for props
   - kebab-case for CSS classes
   - Use descriptive, purpose-indicating names

3. Props:
   - Always type props using TypeScript interfaces
   - Use destructuring for props
   - Document complex props with JSDoc
   - Provide default values when appropriate

4. Styling:
   - Use Tailwind CSS utilities
   - Create variants using class-variance-authority
   - Keep responsive design in mind
   - Follow design system tokens

5. Performance:
   - Memoize callbacks with useCallback when passing to children
   - Memoize expensive calculations with useMemo
   - Use dynamic imports for code splitting when appropriate

6. Testing:
   - Write unit tests for complex logic
   - Test different prop combinations
   - Test user interactions
   - Test accessibility

Example Usage:
import { Component } from '@/components/ui/component';

export function FeaturePage() {
  return (
    <Component
      variant="secondary"
      size="large"
      className="custom-styles"
    >
      Content
    </Component>
  );
}
*/
