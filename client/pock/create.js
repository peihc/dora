Template.pockCreate.helpers({
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
    }
});
Template.pockCreate.events({
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
        if (!$("#uploader").val()) {
            alert("Picture");
            return false;
        }

        var t = null;
        for (var i = 0; i < types.length; i++) {
        
            if (types[i].key == $("#ptype").val()) {
            	
                for (var j = 0; j < types[i].child.length; j++) {
                	
		            if (types[i].child[j].key == $("#type").val()) {
		                t = types[i].child[j];
		            }
		        }
            }
        }
       
        var pid = Pocks.insert({
            ptype: $("#ptype").val(),
            type: $("#type").val(),
            desc: $("#desc").val(),
            thumb: $("#uploader").attr("data-file"),
            point: t.point,
            userid: facc.user()._id,
            createAt: new Date(),
            status: 1,
            step: 1,
        }, function(err,res) {
    		Meteor.call("statics",{
    			ptype: $("#ptype").val(),
            	type: $("#type").val(),
            	num:1
    		});
            Meteor.call("uploadPockPic", { id: res }, function() {
                alert("Thanks ~");
                FlowRouter.go("/");
            });
        })


    },
    "change #uploader": function(event) {
        var that = $(event.currentTarget);
        lrz(event.currentTarget.files[0], {
                width: 480
            }).then(function(rst) {
            	that.attr("data-file",rst.base64);
                that.parent().css({
                    "background-image": "url(" + rst.base64 + ")"
               }).find("i").remove();
            });

    }
})
Template.pockCreate.onCreated(function() {
    Session.set("PC-T", false);
});
