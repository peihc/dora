Meteor.publish("pocks", function(uid) {
    return Pocks.find({userid:uid,status:1});
});
Meteor.publish("needs", function(uid) {
    return Needs.find({userid:uid,status:1,step:1});
});
Meteor.publish("users", function(uid) {
    return Meteor.users.find({},{feilds:{
      isadmin:1,
      avatar:1,
      nickname:1,
    }});
});
Meteor.publish("stats", function(uid) {
    return Stats.find();
});
Meteor.publish("needsFor", function(id) {
    var pa = Pocks.findOne({_id:id})
    if(pa){
      return Needs.find({
        ptype:pa.ptype,
        type:pa.type,
        step:1,
        status:1
      })
    }
});
