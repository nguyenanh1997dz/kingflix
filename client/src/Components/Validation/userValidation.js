import * as Yup from "yup";

const RegisterValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .trim()
    .email("Email is not valid"),
  fullName: Yup.string().required("Full name is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at least 12 characters")
    .trim(),
});
const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .trim()
    .email("Email is not valid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .trim(),
});
const ProfileValidation = Yup.object().shape({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .required("Email is required")
    .trim()
    .email("Email is not valid"),
});
const PasswordValidation = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .trim(),
    newPassword: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters")
    .trim(),
    comfirmPassword: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .trim(),
});
const CategoryValidation = Yup.object().shape({
  name: Yup.string().required("Title Category is required"),
});
const MovieValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  desc: Yup.string().required("Decs is required"),
  titleImage: Yup.string().required("Title Image is required"),
  image: Yup.string().required("Image is required"),
  language: Yup.string().required("Language is required"),
  year: Yup.string().required("Year is required"),
  hour: Yup.string().required("Hour is required"),
  video: Yup.string().required("Movie video is required"),
  category: Yup.string().required("Category is required"),
  casts: Yup.array().required("Cast is required"),
});

const reviewsValidation = Yup.object().shape({
  rating: Yup.string().required("Rate is required"),
  message: Yup.string().required("Message is required").min(5,"Enter a minimum of 5 characters."),
});



export { LoginValidation, RegisterValidation, ProfileValidation ,PasswordValidation ,CategoryValidation,MovieValidation,reviewsValidation};
