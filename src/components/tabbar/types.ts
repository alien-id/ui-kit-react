export type TabItem<T extends string = string> = {
  value: T;
  label: React.ReactNode;
};

export type TabbarProps<T extends string = string> = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  tabs: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
};
