Template.pockSend.helpers({
    needs:function(){
        return Needs.find();
    },
    pid:function(){
        return FlowRouter.getQueryParam("id");
    }
});
Template.pockSend.events({
    

})
Template.pockSend.onCreated(function() {
    this.subscribe("needsFor",FlowRouter.getQueryParam("id"));
});

