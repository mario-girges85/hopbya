import Swal from "sweetalert2";

const showSignupSuccessAlert = async () =>
  Swal.fire({
    icon: "success",
    title: "Account created successfully",
    confirmButtonText: "OK",
    timer: 2000,
    timerProgressBar: true,
  });

export default showSignupSuccessAlert;
