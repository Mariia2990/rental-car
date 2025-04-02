import css from "./SearchCarForm.module.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SearchCarForm = ({ onFilter }) => {
  return (
    <Formik
      initialValues={{
        brand: "",
        price: "",
        from: "",
        to: "",
      }}
      validationSchema={Yup.object({
        brand: Yup.string().required("Choose a brand"),
        price: Yup.number()
          .required("Choose a price")
          .positive("Price must be greater than 0"),
        from: Yup.number()
          .required("Fill in the field")
          .min(1990, "Minimum value - 1990"),
        to: Yup.number()
          .required("Fill in the field")
          .when("from", (from, schema) =>
            from ? schema.min(from, "Cannot be less than 'From'") : schema
          ),
      })}
      onSubmit={(values) => {
        onFilter(values);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          className={css.formCar}
          style={{
            display: "flex",
            gap: "16px",
            width: "924px",
            height: "68px",
          }}
        >
          <div className={css.labelWrapper}>
            <label htmlFor="brand" className={css.label}>
              Car brand
            </label>
            <Field as="select" name="brand" className={css.field} id="brand">
              <option value="">Choose a brand</option>
              <option value="aston">Aston Martin</option>
              <option value="audi">Audi</option>
              <option value="bmw">BMW</option>
              <option value="bentley">Bentley</option>
              <option value="buick">Buick</option>
              <option value="chevrolet">Chevrolet</option>
              <option value="chrysler">Chrysler</option>
              <option value="gmc">GMC</option>
              <option value="hummer">HUMMER</option>
            </Field>
          </div>
          <div className={css.labelWrapper}>
            <label htmlFor="price" className={css.label}>
              Price/ 1 hour
            </label>
            <Field as="select" name="price" className={css.field} id="price">
              <option value="">Choose a price</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
              <option value={60}>60</option>
              <option value={70}>70</option>
              <option value={80}>80</option>
            </Field>
          </div>

          <div className={css.labelWrapper1}>
            <div className={css.labelWrapper}>
              <label htmlFor="from" className={css.label}>
                Сar mileage / km
              </label>
            </div>
            <div className={css.inputNb}>
              <Field
                type="number"
                name="from"
                placeholder="From"
                className={css.leftInput}
                id="from"
              />

              <Field
                type="number"
                name="to"
                placeholder="To"
                className={css.rightInput}
                id="to"
              />
            </div>
          </div>
          <button type="submit" disabled={isSubmitting} className={css.btnForm}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchCarForm;
