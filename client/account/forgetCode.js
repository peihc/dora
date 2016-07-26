Template.forgetCode.events({
    'click .regComBtn': function() {
        if ($("#code").val() == "") {
            alert("your code");
        }

        Meteor.call('accountLoginWithCode', {
            "code": $("#code").val()
        }, function(error, result) {
            console.log(result);
            if (typeof result == "object") {
                facc.set(result);
                alert(result.nickname + '：welcome~');
                facc.backto();
            } else if (result == "ERROR_RIGHT") {
                alert('none');
            } else if (result == "ERROR_REPEAT_TEL") {
                alert('number repeat');
            } else if (result == "ERROR_REPEAT_NICK") {
                alert('nick repeat');
            } else {
                alert('Error');
            }

        });
    },
});
