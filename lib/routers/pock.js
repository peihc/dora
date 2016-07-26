FlowRouter.route('/pock/create', {
  action: function(params, queryParams) {
   	FlowLayout.render("pockCreate");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/admin/req', {
  action: function(params, queryParams) {
   	FlowLayout.render("adminReq");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/admin/roles', {
  action: function(params, queryParams) {
   	FlowLayout.render("adminRoles");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/admin/pocker', {
  action: function(params, queryParams) {
   	FlowLayout.render("adminPocker");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/pock/send', {
  action: function(params, queryParams) {
   	FlowLayout.render("pockSend");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
FlowRouter.route('/pock/express', {
  action: function(params, queryParams) {
   	FlowLayout.render("pockExpress");
  },
   triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});