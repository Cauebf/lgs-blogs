export type State = {
  errors?: null | {
    title?: string[];
    description?: string[];
    image?: string[];
    categoryIds?: string[];
    content?: string[];
  };
  message?: string | null;
};
