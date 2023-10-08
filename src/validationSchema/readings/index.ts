import * as yup from 'yup';

export const readingValidationSchema = yup.object().shape({
  date: yup.date().required(),
  duration: yup.number().integer().required(),
  topic: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
