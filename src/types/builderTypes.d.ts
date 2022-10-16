export interface ConditionalItemProps {
  field?: string;
  operator?: string;
  value?: any;
  or?: any;
  and?: any;
}

export interface FieldsProps {
  key: string;
  label: string;
  type: string | "text" | "number" | "textarea" | "boolean" | "radio";
  default?: any;
}

export interface OptionsProps {
  showLabel?: boolean;
}

export interface BuilderProps {
  fields: Array<FieldsProps>;
  query: any | null;
  onChange: (e: any) => void;
  options?: OptionsProps;
}
