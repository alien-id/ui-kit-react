import { Button } from './button';
import { ButtonSmall } from './button-small';
import type { ButtonProps } from './types';

export { Button } from './button';
export { ButtonSmall } from './button-small';
export type { ButtonProps, ButtonVariant } from './types';

type VariantButtonProps = Omit<ButtonProps, 'variant'>;

export const PrimaryButton = (props: VariantButtonProps) => (
  <Button {...props} variant="primary" />
);

export const SecondaryButton = (props: VariantButtonProps) => (
  <Button {...props} variant="secondary" />
);

export const TertiaryButton = (props: VariantButtonProps) => (
  <Button {...props} variant="tertiary" />
);

export const TintedButton = (props: VariantButtonProps) => (
  <Button {...props} variant="tinted" />
);

export const PrimaryButtonSmall = (props: VariantButtonProps) => (
  <ButtonSmall {...props} variant="primary" />
);

export const SecondaryButtonSmall = (props: VariantButtonProps) => (
  <ButtonSmall {...props} variant="secondary" />
);

export const TertiaryButtonSmall = (props: VariantButtonProps) => (
  <ButtonSmall {...props} variant="tertiary" />
);

export const TintedButtonSmall = (props: VariantButtonProps) => (
  <ButtonSmall {...props} variant="tinted" />
);
