$("#changePass").click(function () {
  var login = $("#user_login").val();
  var password = $("#user_password").val();
  var new_password = $("#user_new_password").val();
  var type = $("#type").val();
  if (password == new_password) {
    $('#result').html("Пароли совпадают!");
  } else {
    var message = {
      user_login: login,
      type: type
    };
    $.ajax({
      url: "http://crudapp/server/serverRouting.php",
      type: "POST",
      data: message,
      success: function(data) {
        var dataParsed = JSON.parse(data);
        var email = dataParsed[0]["user_email"];
        var oldResultPassword = login + email + password;
        var oldsha256Password = sha256(oldResultPassword);
        var resultPassword = login + email + new_password;
        var sha256Password = sha256(resultPassword);
          var message = {
            user_login: login,
            user_password: oldsha256Password,
            user_new_password: sha256Password,
            type: type
          };
          $.ajax({
            url: "http://crudapp/server/serverRouting.php",
            type: "POST",
            data: message,
            success: function(data) {
              if (JSON.parse(data) == "ok") {
                $('#result').html("Пароль успешно изменен");
              } else if (JSON.parse(data) == "wronglogin") {
                $('#result').html("Логин введен неверно");
              } else if (JSON.parse(data) == "wrongoldpwd") {
                $('#result').html("Старый пароль введен неверно");
              }
            }
          })
      }
    })
  }
});