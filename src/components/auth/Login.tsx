import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cfl } from "../../helpers/shared";
import { Validate } from "../../helpers/validations";
import { signIn } from "../../redux/actions/authActions";
import SocialMediaButton, {
  SocialMediaIcon,
} from "../reusable/SocialMediaButton";
import TextInput, { FieldType } from "../reusable/TextInput";

export const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 4px rgb(255,255,255)",
    transition: {
      // duration: 0.4,
      yoyo: Infinity,
    },
  },
};

export const containerVariants = {
  initial: { scale: 0, x: "100vw" },
  animate: { scale: 1, x: 0, transition: { type: "spring", stiffness: 80 } },
  exit: { x: "50vw", opacity: 0 },
};

const Login = (props: any) => {
  const { signIn } = props;
  const [formState, setFormState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //From fields values
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (props.auth.user && props.auth.user.uid) {
      setIsLoading(false);
      navigate("/");
    } else if (props.auth.authError && formState === "submitted") {
      setFormState(props.auth.authError);
    }
  }, [formState, navigate, props.auth.authError, props.auth.user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (new Validate(email).email() || new Validate(pwd).password()) {
      setFormState("All fields are required");
      return;
    }
    setIsLoading(true);
    // console.log("Form Submitted");
    await signIn(email, pwd);
    setFormState("submitted");
    setIsLoading(false);
  };
  return (
    <motion.section
      id="login"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="px-12 py-16 rounded-md md:w-2/5 md:mx-auto md:mt-16 shadow-md shadow-slate-400">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-lg mb-0 mr-4">Login in with</p>

            <SocialMediaButton icon={SocialMediaIcon.google} />
            <SocialMediaButton icon={SocialMediaIcon.twitter} />
            <SocialMediaButton icon={SocialMediaIcon.github} />
          </div>

          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">Or</p>
          </div>
          <AnimatePresence>
            {formState && (
              <motion.div
                initial={{
                  y: formState === "submitted" ? 0 : "-30px",
                  opacity: formState === "submitted" ? 0 : 0.65,
                }}
                animate={{ y: 0, opacity: formState === "submitted" ? 0 : 1 }}
                exit={{ y: "-10px", opacity: 0, scale: 0 }}
                className="bg-primary text-center text-xs p-1 mb-4 rounded-full"
              >
                {cfl(formState)}
              </motion.div>
            )}
          </AnimatePresence>
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

          <div className="flex justify-between items-center mb-6">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-yellow-400 checked:border-yellow-400 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
              />
              <label
                className="form-check-label inline-block "
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
            <Link to="#!" className="hover:text-slate-400">
              Forgot password?
            </Link>
          </div>

          <div className="text-center">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              type="submit"
              className="inline-block px-16 py-2 my-8 bg-yellow-400 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md hover:bg-yellow-500 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
            >
              {isLoading ? "Loading..." : "Login"}
            </motion.button>
            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <Link
                to="/signup"
                className="text-yellow-400 hover:text-yellow-500 focus:text-yellow-500 transition duration-200 ease-in-out"
              >
                &nbsp; Sign Up
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
    signIn: (email: string, password: string) =>
      dispatch(signIn(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
