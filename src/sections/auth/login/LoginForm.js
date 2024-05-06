// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // @mui
// import {
//   Link,
//   Stack,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Checkbox,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// // components
// import Iconify from "../../../components/iconify";
// import { useDispatch } from "react-redux";
// import { login } from "../../../redux/loginContext/Action";

// // ----------------------------------------------------------------------

// export default function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = (event) => {
//     event.preventDefault();
//     dispatch(login(email, password));
//   };

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <>
//       <Stack spacing={3}>
//         <TextField
//           name="email"
//           label="Email address"
//           value={email}
//           onChange={handleEmailChange}
//         />

//         <TextField
//           name="password"
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           value={password}
//           onChange={handlePasswordChange}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => setShowPassword(!showPassword)}
//                   edge="end"
//                 >
//                   <Iconify
//                     icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
//                   />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ my: 2 }}
//       >
//         <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link>
//       </Stack>

//       <LoadingButton
//         fullWidth
//         size="large"
//         type="submit"
//         variant="contained"
//         onClick={handleLogin}
//         sx={{ mt: 3 }}
//       >
//         Login
//       </LoadingButton>
//     </>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "../../../components/iconify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/loginContext/Action";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseError = useSelector((state)=>state.auth?.loginError)

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Please fill out this field.";
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    if (!password) {
      newErrors.password = "Please fill out this field.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (validateForm()) {
      dispatch(login(email, password));
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        {responseError && <p className="error-message">{responseError}</p>}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleLogin}
        sx={{ mt: 3 }}
      >
        Login
      </LoadingButton>
    </>
  );
}
