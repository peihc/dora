Template.index.onCreated(function() {
    this.subscribe("messages");
    this.subscribe("pocks", facc.user()._id);
    
});
Template.index.helpers({
    messages: function() {
        return Messages.find({}, {
            sort: {
                createAt: -1
            }
        });
    },
    pocks: function() {
        return Session.get("INDEXPOCK");
    }
});
Template.index.events({
    "click .item": function(event) {
        var o = $(event.currentTarget);

        var t = $(".showItem").removeClass("showItem");
        if (t[0] != o[0]) {
            o.addClass("showItem");
        }

    },
    "click .sendMsg": function(event) {

        if (facc.isGuest()) {
            FlowRouter.go("/login");
            return false;
        }

        if ($("#msg").val()) {
            Meteor.call("saveMsg",{
                userid: facc.user()._id,
                content: $("#msg").val(),
                createAt: new Date(),
                type: "MESSAGE",
                avatar: facc.user().avatar,
                nick: facc.user().nickname,
            },function(err,res){
                if(res == "POINT"){
                    alert("more than 10 point");
                }else if(res == "SUCCESS"){
                     $("#msg").val("")
                }
            })
        }
    },
    "click .left": function() {
        if ($(".menu").hasClass("menuShow")) {
            $(".menu").slideUp();
            $(".menu").removeClass("menuShow")
        } else {
            $(".menu").slideDown();
            $(".menu").addClass("menuShow")
        }

    },
    "click .remove": function(event) {
        var that = this;
        var o = $(event.currentTarget);
        var p = o.parent().addClass("animated").addClass("bounceOutUp");
        window.setTimeout(function() {
            Pocks.update({ _id: that._id }, { $set: { status: 0 } });
            p.remove();
            indexSwiper.update();
            Meteor.call("statics", {
                ptype: that.ptype,
                type: that.type,
                num: -1
            });
        }, 700);

    }
});

indexSwiper = null;

Template.index.onRendered(function() {

    Meteor.call("queryPock", { uid: facc.user()._id }, function(err, res) {

        Session.set("INDEXPOCK", res);
        window.setTimeout(function() {
            indexSwiper = new Swiper('.swiper-container', {
                slidesPerView: 2.2,
                spaceBetween: 10,
                freeMode: true
            });
        }, 500);

    })

});
