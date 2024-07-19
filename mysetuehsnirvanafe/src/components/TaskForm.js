import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from '@mui/material';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  priority: Yup.string().required('Priority is required'),
  target_date: Yup.date().required('Target date is required'),
});

const TaskForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={TaskSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form>
        <div>
          <Field name="title" placeholder="Title" />
          {errors.title && touched.title ? <div>{errors.title}</div> : null}
        </div>
        <div>
          <Field name="description" placeholder="Description" />
          {errors.description && touched.description ? <div>{errors.description}</div> : null}
        </div>
        <div>
          <Field name="priority" placeholder="Priority" />
          {errors.priority && touched.priority ? <div>{errors.priority}</div> : null}
        </div>
        <div>
          <Field name="target_date" type="date" />
          {errors.target_date && touched.target_date ? <div>{errors.target_date}</div> : null}
        </div>
        <Button type="submit">Submit</Button>
      </Form>
    )}
  </Formik>
);

export default TaskForm;
