import { useFormik } from "formik";
import { toFormikValidate } from "zod-formik-adapter";
import { schemaValidationLoginData } from "./SchemaValidationLoginData";
import { FC } from "react";
import { InputTextWithValidation } from "../InputTextValidation";
import { Button } from "primereact/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
export const Login: FC = () => {
  const router = useRouter()
  const loginData = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: toFormikValidate(schemaValidationLoginData),
    onSubmit({ email, password }) {
      signIn("credentials", { redirect: false, password, email }).then((value) => {
        if(!value) return
        const {error,ok,status,url} = value
        //Todo mostrar un error de que no se pudo log
      });
    },
  });
  const { email, password } = loginData.values;
  const { email: emailTouched, password: passwordTouched } = loginData.touched;
  const { email: emailError, password: passwordError } = loginData.errors;
  const { handleBlur, handleChange } = loginData;
  return (
    <form
      className="flex flex-col justify-center items-center h-screen gap-4"
      onSubmit={loginData.handleSubmit}
    >
      <div className="flex flex-col gap-5 w-[600px] text-center p-3 shadow-2xl rounded-2xl">
        <h3 className="text-4xl">A La Carta</h3>
        <hr />
        <div className="flex flex-col gap-3">
          <InputTextWithValidation
            field="EMAIL"
            name="email"
            value={email}
            touched={emailTouched}
            error={emailError}
            handleOnBlur={handleBlur}
            handleOnChange={handleChange}
          />
          <InputTextWithValidation
            field="PASSWORD"
            name="password"
            value={password}
            touched={passwordTouched}
            error={passwordError}
            handleOnBlur={handleBlur}
            handleOnChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            pt={{
              root: {
                style: {
                  fontSize: 20,
                },
              },
            }}
          >
            Login
          </Button>
        </div>
      </div>
      <div className="w-[580px] flex justify-end">
        <Link href={"/registro"} className="text-sm text-blue-600 underline">
          Registrarse
        </Link>
      </div>
    </form>
  );
};
