var homeRoutes = FlowRouter.group({
    prefix: "/home"
});
homeRoutes.route('/', {
	action: function(params, queryParams) {
		FlowLayout.render("home");
	},
  triggersEnter: function(context, redirect) {
        if (facc.isGuest()) {
            FlowRouter.go("/login");
        }
    }
});
