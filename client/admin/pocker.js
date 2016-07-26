Template.adminPocker.helpers({
    pockers:function(){
        return Stats.find({},{sort:{ptype:1,type:1}});
    }
});
Template.adminPocker.events({
 

})
Template.adminPocker.onCreated(function() {
    this.subscribe("stats");
});

