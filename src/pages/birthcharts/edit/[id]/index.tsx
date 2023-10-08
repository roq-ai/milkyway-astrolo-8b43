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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBirthchartById, updateBirthchartById } from 'apiSdk/birthcharts';
import { birthchartValidationSchema } from 'validationSchema/birthcharts';
import { BirthchartInterface } from 'interfaces/birthchart';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function BirthchartEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BirthchartInterface>(
    () => (id ? `/birthcharts/${id}` : null),
    () => getBirthchartById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BirthchartInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBirthchartById(id, values);
      mutate(updated);
      resetForm();
      router.push('/birthcharts');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BirthchartInterface>({
    initialValues: data,
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
              label: 'Update Birthchart',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Birthchart
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(BirthchartEditPage);
