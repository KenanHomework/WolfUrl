import Yup from "../validation-localization.js";

export const NewUrlSchema = Yup.object().shape({
  destination: Yup.string().required(),
});
