$(document).ready(function () {
  $('#login-form').submit(function (event) {
    event.preventDefault();
    //collect the form data using Id Selector what ever data you need to send to server
    let email = $('#email').val();
    let password = $('#password').val()

    $.ajax({
      url: '/api/user/login',
      data: JSON.stringify({
        "email": email,
        "password": password
      }),
      processData: false,
      type: 'POST',
      contentType: 'application/json',
      success: function (data) {
        window.location.replace("/profile");

      },
      error: function () {
        alert("Fail Login");
      }

    });
    return false;

  });
})