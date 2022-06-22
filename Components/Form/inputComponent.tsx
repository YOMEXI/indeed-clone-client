import React from "react";

import ReactDOM from "react-dom";

import { Formik, Form, useField } from "formik";

export const MyTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>

      <input className="text-input" {...field} {...props} />

      {meta.touched && meta.error ? (
        <div style={{ color: "white" }}>{meta.error}</div>
      ) : null}
    </>
  );
};
