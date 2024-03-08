import type { Input } from '../input';

export type OnChangeHandler<T> = (args: { curr: T | undefined; next: T | undefined }) => void;
export type ComboboxProps<T> = Partial<
  Pick<Input['$$prop_def'], 'label' | 'id' | 'placeholder' | 'name' | 'value' | 'disabled'>
> & {
  onChangeSelected?: OnChangeHandler<T>;
};
