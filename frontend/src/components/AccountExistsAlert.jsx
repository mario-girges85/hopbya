import Swal from "sweetalert2";

const showAccountExistsAlert = async ({
  message,
  loginButtonText = "Go to Login",
  stayButtonText = "Stay on Signup",
}) => {
  const result = await Swal.fire({
    icon: "warning",
    title: message,
    showCancelButton: true,
    confirmButtonText: loginButtonText,
    cancelButtonText: stayButtonText,
    allowOutsideClick: false,
  });

  return result.isConfirmed;
};

export default showAccountExistsAlert;
