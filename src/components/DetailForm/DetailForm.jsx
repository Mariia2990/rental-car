import { ErrorMessage, Field, Formik } from "formik";
import css from "./DetailForm.module.css";
import { Form } from "react-router-dom";
import { useEffect, useId, useRef, useState } from "react";
import * as Yup from "yup";
import Calendar from "../Calendar/Calendar.jsx";

export const DetailForm = () => {
    const nameId = useId();
    const emailId = useId();
    const commentFieldId = useId();

      const [isCalendarOpen, setIsCalendarOpen] = useState(false);
      const calendarRef = useRef(null);
    const dateRef = useRef(null);
    
      const initialValues = {
        name: "",
        email: "",
        bookingDate: null,
        comment: "",
    };
    
      const handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
    };
    
    useEffect(() => {
      function handleClickOutside(event) {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target) &&
          !dateRef.current.contains(event.target)
        ) {
          setIsCalendarOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const BookingSchema = Yup.object({
      name: Yup.string()
        .min(3, "The name must be at least 2 characters long!")
        .max(50, "The name must not exceed 50 characters!")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      bookingDate: Yup.date()
        .required("Required booking date")
        .min(new Date(), "Date can't be in the past"),
      comment: Yup.string().max(256, "Comment is too long").optional(),
    });

  return (
    <div className={css.detailForm}>
      <h3 className={css.titleForm}>Book your car now</h3>
      <p className={css.subtitleForm}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={BookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <form className={css.form}>
            <div>
              <Field
                name="name"
                id={nameId}
                className={css.input}
                placeholder="Name*"
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>
            <div>
              <Field
                name="email"
                id={emailId}
                className={css.input}
                placeholder="Email*"
              />
              <ErrorMessage
                name="email"
                component="span"
                className={css.error}
              />
            </div>
            <div className={css.datePickerContainer} ref={calendarRef}>
              <div
                ref={dateRef}
                className={css.input}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {values.bookingDate
                  ? values.bookingDate.toLocaleDateString('uk-UA')
                  : 'Booking date'}
              </div>
              {isCalendarOpen && (
                <div className={css.calendarPopup}>
                  <Calendar
                    selectedDate={values.bookingDate}
                    onDateChange={date => {
                      setFieldValue('bookingDate', date);
                      setIsCalendarOpen(false);
                    }}
                  />
                </div>
              )}
              <Field
                type="hidden"
                name="bookingDate"
                value={values.bookingDate || ''}
                className={css.input}
              />
              <ErrorMessage
                name="bookingDate"
                component="span"
                className={css.error}
              />
            </div>
            <div>
              <Field
                as="textarea"
                name="comment"
                id={commentFieldId}
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
              Send
              {isSubmitting}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};
