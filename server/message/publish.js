Meteor.publish("messages", function(id) {
    return Messages.find({},{sort:{createAt:-1},limit:30});
});
