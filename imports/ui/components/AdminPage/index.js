export { default as AdminPage } from "./AdminPage";
export { default as AddProduct } from "./AddProduct";
export { default as Input } from "./Input";
export { default as RemoveProduct } from "./RemoveProduct";
export { default as UpdateProduct } from "./UpdateProduct";

export const factoryInput = (inputId, title, value, onChange) => ({
  title,
  inputId,
  value,
  onChange,
});
