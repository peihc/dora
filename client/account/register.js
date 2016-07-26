Template.register.events({
    'click .regBtn': function() {

        var tel = $("#tel").val();
        var username = $("#username").val();
        var password = $("#password").val();

        if (!facc.checkTel(tel)){
            alert('your mobile number');
            return false;
        }

        if (!facc.checkUsername(username)){
            alert('wrong format');
            return false;
        }

        if (password.length < 6) {
            alert('more than 6');
            return false;
        }

            Meteor.call('accountRegisterGetCode', {
                "tel": tel,
                "password": password,
                "inviteFrom": $("#invite").val(),
                "username": username
            }, function(error, result) {
                if (result == "SUCCESS") {
                    FlowRouter.go("/register/code");
                } else if (result == "ERROR_REPEAT_TEL") {
                    alert('number repeat');
                } else if (result == "ERROR_RIGHT") {
                    alert('none');
                } else if (result == "ERROR_REPEAT_NICK") {
                    alert('nick repeat');
                } else {
                    alert('error');
                }
                $("#page-login-loading").hide();
            });
    },
});
