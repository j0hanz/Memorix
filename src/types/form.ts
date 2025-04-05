export interface ValidationRules {
  [key: string]: (
    value: string,
    formValues?: Record<string, string>,
  ) => string | null;
}
