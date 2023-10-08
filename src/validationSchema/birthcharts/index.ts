import * as yup from 'yup';

export const birthchartValidationSchema = yup.object().shape({
  sun_sign: yup.string().required(),
  moon_sign: yup.string().required(),
  rising_sign: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
