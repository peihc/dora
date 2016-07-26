Template.adminRoles.helpers({
   
    users:function(){
        return Meteor.users.find();
    }
});
Template.adminRoles.events({
    "click .al-item":function(){
        if(this.isadmin){
            Meteor.call("changeRole",{id:this._id,isadmin:0});
        }else{
            Meteor.call("changeRole",{id:this._id,isadmin:1});
        }
        
    }

})
Template.adminRoles.onCreated(function() {
    this.subscribe("users",facc.user()._id);
});

