$("#register").click(function () {
  var login = $("#user_login").val();
  var email = $("#user_email").val();
  var password = $("#user_password").val();
  var r_password = $("#user_r_password").val();
  var type = $("#type").val();
  if (password != r_password) {
    $('#result').html("Пароли не совпадают!");
  } else {
    var resultPassword = login + email + password;
    var sha256Password = sha256(resultPassword);
    var message = {
      user_login: login,
      user_email: email,
      user_password: sha256Password,
      type: type
    };
    $.ajax({
      url: "http://crudapp/server/serverRouting.php",
      type: "POST",
      data: message,
      success: function(data) {
        if (JSON.parse(data) == "ok") {
          $('#result').html("Регистрация прошла успешно");
        } else if (JSON.parse(data) == "fail") {
          $('#result').html("Имя пользователя занято");
        }
      }
    })
  }
});