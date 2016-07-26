Meteor.methods({
    saveMsg: function(args) {
        var user = Meteor.users.findOne({_id:args.userid});
        if(user){
        	if(user.point < 10){
        		return "POINT";
        	}else{
        		Messages.insert(args);
        		Meteor.users.update({_id:args.userid},{$inc:{point:-10}});
        		return "SUCCESS";
        	}
        }
    },
});
