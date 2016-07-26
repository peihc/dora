Template.adminReq.helpers({
    types: function() {
        return types;
    },
    types2: function() {
        var pk = Session.get("PC-T");
        if (!pk) {
            pk = "heart";
        }
        for (var i = 0; i < types.length; i++) {
            if (types[i].key == pk) {
                return types[i].child;
            }
        }
    },
    needs:function(){
        return Needs.find();
    }
});
Template.adminReq.events({
    "change #ptype": function() {
        Session.set("PC-T", $("#ptype").val());
    },
    "click #pa-create": function() {
        if (!$("#ptype").val()) {
            alert("type one");
            return false;
        }
        if (!$("#type").val()) {
            alert("type two");
            return false;
        }
        if (!$("#desc").val()) {
            alert("desc");
            return false;
        }
        if (!$("#num").val()) {
            alert("number");
            return false;
        }
        var p = null;
        var t = null;
        for (var i = 0; i < types.length; i++) {

            if (types[i].key == $("#ptype").val()) {
                p = types[i];
                for (var j = 0; j < types[i].child.length; j++) {

                    if (types[i].child[j].key == $("#type").val()) {
                        t = types[i].child[j];
                    }
                }
            }
        }

        var pid = Needs.insert({
            ptype: $("#ptype").val(),
            pname: p.desc,
            type: $("#type").val(),
            tname: t.desc,
            desc: $("#desc").val(),
            num: $("#num").val()*1,
            recive:0,
            userid: facc.user()._id,
            createAt: new Date(),
            status: 1,
            step: 1,
        }, function(err, res) {

        })

        Messages.insert({
            userid: facc.user()._id,
            content: $("#desc").val(),
            data: {
                ptype: $("#ptype").val(),
                pname: p.desc,
                type: $("#type").val(),
                tname: t.desc,
                desc: $("#desc").val(),
                num: $("#num").val()*1,
            },
            createAt: new Date(),
            type: "REQ",
            avatar: facc.user().avatar,
            nick: facc.user().nickname,
        });
        alert("publish!");
        FlowRouter.go("/")
    },

})
Template.adminReq.onCreated(function() {
    Session.set("PC-T", false);
    this.subscribe("needs",facc.user()._id);
});

