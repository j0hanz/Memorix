export type ValidationRules = Record<
  string,
  (value: string, formValues?: Record<string, string>) => string | null
>;
