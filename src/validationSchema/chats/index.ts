import * as yup from 'yup';

export const chatValidationSchema = yup.object().shape({
  message: yup.string().required(),
  sent_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  astrologer_id: yup.string().nullable().required(),
});
