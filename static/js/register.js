(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;
    var arr = [];

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
      if ($(input[i]).attr("type") == "password") {
        arr.push(i);
      }
    }

    if (arr.length >= 2 && $(input[arr[0]]).val() != $(input[arr[1]]).val()) {
      showValidate(input[arr[1]]);
      showValidate(input[arr[0]]);
      check = false;
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if (
      $(input).attr("type") == "email" ||
      $(input).attr("name") == "email" ||
      $(input).attr("type") == "password"
    ) {
      if ($(input).val().trim() == "") {
        return false;
      }
      return true;
    }
    return true;
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);
