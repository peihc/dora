Meteor.methods({
    uploadPockPic: function(args) {
        var po = Pocks.findOne({ _id: args.id });
        if (po) {
            upload(po.thumb, function(data) {
                console.log(data);
                Pocks.update({
                    _id: args.id
                }, {
                    $set: {
                        "thumb": data
                    }
                });

            }, function(e) {
                throw e;
            });
        }

    },

    queryPock: function(args) {
        return Pocks.find({ userid: args.uid, status: 1 }).fetch();
    },
    statics: function(args) {
        var st = Stats.findOne({
            ptype: args.ptype,
            type: args.type
        });
        if (st) {
            Stats.update({ _id: st._id }, {
                $inc: {
                    num: args.num,
                }
            })
        } else {
            Stats.insert({
                ptype: args.ptype,
                type: args.type,
                num: args.num,
            });
        }
    },
    saveExpress: function(args) {

        //失效扑克
        var pa = Pocks.findOne({ _id: args.pock });
        Pocks.update({
            _id: pa._id
        }, {
            $set: {
                status: 0
            }
        });

        //处理需求
        var ne = Needs.findOne({ _id: args.need });
        var step = 1;
        if ((ne.recive + 1) >= ne.num) {
            step = 2;
        }

        Needs.update({
            _id: args.need
        }, {
            $set: {
                "step": step,
            },
            $inc: {
                recive: 1
            }
        });

        //处理统计
        var st = Stats.findOne({
            ptype: pa.ptype,
            type: pa.type
        });
        Stats.update({ _id: st._id }, {
            $inc: {
                num: -1,
            }
        });

        //处理积分
        var user = Meteor.users.findOne({_id:args.userid});
        Meteor.users.update({_id:args.userid},{
            $inc:{
                point:pa.point
            }
        });

        //处理消息

        var mes = Messages.insert({
            userid: args.userid,
            content: args.remark,
            data: {
                ptype: pa.ptype,
                type: pa.type,
                thumb:pa.thumb,
                
                name:pa.name,
            },
            bill: args.thumb,
            createAt: new Date(),
            type: "SEND",
            avatar: user.avatar,
            nick: user.nickname,
        });
         args.createAt = new Date();
        //保存投递记录
        var ex = Express.insert(args);

        //处理快递单
        upload(args.thumb, function(data) {
             
                Express.update({
                    _id: ex
                }, {
                    $set: {
                        "thumb": data
                    }
                });
              
                Messages.update({
                    _id: mes
                }, {
                    $set: {
                        "bill": data
                    }
                });

            }, function(e) {
                throw e;
            });
    }
});
