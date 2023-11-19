import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { schemaValidationLoginData } from "./SchemaValidationLoginData";
export const Login = () => {
  const loginData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: toFormikValidate(schemaValidationLoginData),
  });
  const title = "A La Carta";
  const { email: emailTouched, password: passwordTouched } = loginData.touched;
  return (
    <div className="flex justify-center">
      <div className="w-[600px] text-center p-3 shadow-xl">
        <h3 className="text-4xl">{title}</h3>
        <div className="flex flex-col gap-2 items-start">
          <label>Email</label>
          <InputText
            name="email"
            value={loginData.values.email}
            onChange={loginData.handleChange}
          />
          {}
        </div>
        {/* <InputText /> */}
      </div>
    </div>
  );
};
