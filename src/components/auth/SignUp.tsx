import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cfl } from "../../helpers/shared";
import { Validate } from "../../helpers/validations";
import { signUp } from "../../redux/actions/authActions";
import SocialMediaButton, {
  SocialMediaIcon,
} from "../reusable/SocialMediaButton";
import TextInput, { FieldType } from "../reusable/TextInput";
import { containerVariants } from "./Login";

const SignUp = (props: any) => {
  const { signUp, auth } = props;
  const [formState, setFormState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //From fields values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user && auth.user.uid) {
      setIsLoading(false);
      navigate("/");
    } else if (auth.authError && formState === "submitted") {
      setFormState(auth.authError);
    }
  }, [formState, navigate, auth.authError, auth.user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      new Validate(email).email() ||
      new Validate(pwd).password() ||
      new Validate(username).username()
    ) {
      setFormState("All fields are required");
      return;
    }
    setIsLoading(true);
    // console.log("Form Submitted");
    await signUp(username, email, pwd);
    setFormState("submitted");
    setIsLoading(false);
  };
  return (
    <motion.section
      id="signup"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="px-12 py-16 rounded-md md:w-2/5 md:mx-auto md:mt-16 shadow-md shadow-slate-400">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-lg mb-0 mr-4">Sign up with</p>

            <SocialMediaButton icon={SocialMediaIcon.google} />
            <SocialMediaButton icon={SocialMediaIcon.twitter} />
            <SocialMediaButton icon={SocialMediaIcon.github} />
          </div>

          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">Or</p>
          </div>
          {formState && (
            <motion.div
              initial={{ y: "-30px", opacity: 0.65 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-primary text-center text-xs p-1 mb-4 rounded-full"
            >
              {cfl(formState)}
            </motion.div>
          )}
          <TextInput
            type={FieldType.username}
            onChange={(value) => {
              setFormState("");
              setUsername(value);
            }}
            onValidate={(value) => new Validate(value).username()}
          />
          <TextInput
            type={FieldType.email}
            onChange={(value) => {
              setFormState("");
              setEmail(value);
            }}
            onValidate={(value) => new Validate(value).email()}
          />
          <TextInput
            type={FieldType.password}
            onChange={(value) => {
              setFormState("");
              setPwd(value);
            }}
            onValidate={(value) => new Validate(value).password()}
          />

          <div className="text-center">
            <motion.button
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgb(255,255,255)",
                boxShadow: "0px 0px 8px rgb(255,255,255)",
                cursor: "pointer",
              }}
              type="submit"
              className="inline-block px-16 py-2 my-8 bg-yellow-400 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </motion.button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Already have an account?
              <Link
                to="/login"
                className="text-yellow-400 hover:text-yellow-500 focus:text-yellow-500 transition duration-200 ease-in-out"
              >
                &nbsp; Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </motion.section>
  );
};
const mapStateToProps = (state: any) => ({ auth: state.auth });
const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (username: string, email: string, password: string) =>
      dispatch(signUp(username, email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
