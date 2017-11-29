$("#login").click(function () {
  var login = $("#user_login").val();
  var password = $("#user_password").val();
  var type = $("#type").val();
  var message = {
    user_login: login,
    type: type
  };
  $.ajax({
    url: "../server/serverRouting.php",
    type: "POST",
    data: message,
    success: function(data) {
      if (JSON.parse(data) == "wronglogin") {
        $('#result').html("Неверный логин");
      } else {
        var dataParsed = JSON.parse(data);
        var email = dataParsed[0]["user_email"];
        var resultPassword = login + email + password;
        var sha256Password = sha256(resultPassword);
        var message = {
          user_login: login,
          user_password: sha256Password,
          type: type
        };
        $.ajax({
          url: "../server/serverRouting.php",
          type: "POST",
          data: message,
          success: function(data) {
            if (JSON.parse(data) == "wrongpwd") {
              $('#result').html("Неверный пароль");
            }
            if (JSON.parse(data) == "ok") {
              $('#result').html('<a href="./phpclientchangepass.php">Сменить пароль</a></br><a href="./phpclientdeleteuser.php">Удалить аккаунт</a>');
            }
          }
        })
      }
    }
  })
});