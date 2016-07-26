Template.login.events({

    "click .loginBtn": function() {

        var tel = $("#tel").val();
        var password = $("#password").val();

        Meteor.call('accountLoginWithTel', {
            "tel": tel,
            "password": password
        }, function(error, result) {
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + ',welcome');
                facc.backto();
            } else if (result == "ERROR_RIGHT") {
                alert('none');
            } else {
                alert('wrong info !!');
            }
        });
    }
});
