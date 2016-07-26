Template.pockExpress.helpers({

    pid: function() {
        return FlowRouter.getQueryParam("id");
    }
});
Template.pockExpress.events({
    "click #pa-create": function() {
        if (!$("#remark").val()) {
            alert("remark");
            return false;
        }

        if (!$("#uploader").val()) {
            alert("Picture");
            return false;
        }

        Meteor.call("saveExpress", {
        	pock:FlowRouter.getQueryParam("id"),
        	need:FlowRouter.getQueryParam("need"),
            remark: $("#remark").val(),
            eid: $("#eid").val(),
            ename: $("#ename").val(),
            thumb: $("#uploader").attr("data-file"),
            userid: facc.user()._id,
        }, function() {
            alert("Thanks ~");
            FlowRouter.go("/");
        });



    },
    "change #uploader": function(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
            width: 480
        }).then(function(rst) {
            that.attr("data-file", rst.base64);
            that.parent().css({
                "background-image": "url(" + rst.base64 + ")"
            }).find("i").remove();
        });

    }

})
Template.pockExpress.onCreated(function() {
    // this.subscribe("needsFor",FlowRouter.getQueryParam("id"));
});
