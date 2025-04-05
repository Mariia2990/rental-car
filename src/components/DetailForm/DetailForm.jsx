import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import css from './DetailForm.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import '../../../src/styles/datepicker-custom.css';

export const DetailForm = () => {
  const [startDate, setStartDate] = useState(null);

  const initialValues = {
    name: '',
    email: '',
    detailDate: null,
    comment: '',
  };

  useEffect(() => {
    const trianglePath = document.querySelector(
      '.react-datepicker__triangle path',
    );
    if (trianglePath) {
      trianglePath.setAttribute('d', 'M0 8 H16 L8 0 8 8'); 
    }
  }, []);

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, 'The name must be at least 3 characters long!')
    .max(50, 'The name must not exceed 50 characters!')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  detailDate: Yup.date() 
    .nullable()
    .required('Booking date is required')
    .min(new Date(), "Date can't be in the past"),
  comment: Yup.string().max(256, 'Comment is too long'),
});

  const handleSubmit = (values, { resetForm }) => {
    toast.success('Successful car reservation!');
    setStartDate(null);
    resetForm();
  };

  return (
    <div className={css.detailForm}>
      <h3 className={css.titleForm}>Book your car now</h3>
      <p className={css.subtitleForm}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className={css.form}>
            <div>
              <Field name="name" className={css.input} placeholder="Name*" />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div>
              <Field
                name="email"
                type="email"
                className={css.input}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>

            <div>
              <DatePicker
                selected={values.detailDate}
                onChange={date => {
                  setFieldValue('detailDate', date);
                  setStartDate(date);
                }}
                placeholderText="Detail date"
                className={css.input}
                dateFormat="dd.MM.yyyy"
                minDate={new Date()}
              />
              <ErrorMessage
                name="detailDate"
                component="span"
                className={css.error}
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="comment"
                className={css.inputComment}
                placeholder="Comment"
              />
              <ErrorMessage
                name="comment"
                component="span"
                className={css.error}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={css.buttonSend}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

