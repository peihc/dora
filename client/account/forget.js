Template.forget.events({
    'click .codeBtn': function() {

        var tel = $("#tel").val();

        if (!facc.checkTel(tel)) {
            alert('Your Number');
            return false;
        }

        Meteor.call('accountForget', {
            "tel": tel
        }, function(error, result) {
            if (result.indexOf("ERROR") < 0) {
                alert('sended check your sms');
                FlowRouter.go("/forget/code");
            } else {
                alert('unknow user');
            }

        });
    },
});
