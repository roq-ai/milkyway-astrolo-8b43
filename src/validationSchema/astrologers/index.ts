import * as yup from 'yup';

export const astrologerValidationSchema = yup.object().shape({
  name: yup.string().required(),
  experience_years: yup.number().integer().required(),
  specialization: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
