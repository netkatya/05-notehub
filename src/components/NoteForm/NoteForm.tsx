import css from './NoteForm.module.css';
import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from "yup";

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()    
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name is too long")
        .required("Name is required"),
    content: Yup.string()
        .max(500, "Name is too long"),
    tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
})

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const initialFormValues: FormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteFormProps {
  onSubmit: (values: { title: string; content: string; tag: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function NoteForm({ onSubmit, onCancel, isLoading, error }: NoteFormProps) {
  const handleSubmit = (values: FormValues, formikHelpers: FormikHelpers<FormValues>) => {
    onSubmit(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik initialValues={initialFormValues} onSubmit={handleSubmit} validationSchema={NoteFormSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="div" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="div" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </div>

        {error && <div className={css.error}>{error}</div>}

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}