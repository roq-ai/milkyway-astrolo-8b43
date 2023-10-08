import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createBirthchart } from 'apiSdk/birthcharts';
import { birthchartValidationSchema } from 'validationSchema/birthcharts';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { BirthchartInterface } from 'interfaces/birthchart';

function BirthchartCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BirthchartInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBirthchart(values);
      resetForm();
      router.push('/birthcharts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BirthchartInterface>({
    initialValues: {
      sun_sign: '',
      moon_sign: '',
      rising_sign: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: birthchartValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Birthcharts',
              link: '/birthcharts',
            },
            {
              label: 'Create Birthchart',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Birthchart
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.sun_sign}
            label={'Sun Sign'}
            props={{
              name: 'sun_sign',
              placeholder: 'Sun Sign',
              value: formik.values?.sun_sign,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.moon_sign}
            label={'Moon Sign'}
            props={{
              name: 'moon_sign',
              placeholder: 'Moon Sign',
              value: formik.values?.moon_sign,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.rising_sign}
            label={'Rising Sign'}
            props={{
              name: 'rising_sign',
              placeholder: 'Rising Sign',
              value: formik.values?.rising_sign,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/birthcharts')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'birthchart',
    operation: AccessOperationEnum.CREATE,
  }),
)(BirthchartCreatePage);
