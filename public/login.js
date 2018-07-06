const newPassword = document.getElementById("newPassword")
const repPassword = document.getElementById("repPassword");

function validatePassword(){
  if(newPassword.value != repPassword.value) {
    repPassword.setCustomValidity("Passwords don't match");
  } else {
    repPassword.setCustomValidity('');
  }
}

newPassword.onchange = validatePassword;
repPassword.onkeyup = validatePassword;
