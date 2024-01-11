var adminmodel = require('../model/adminmodel');
var studentmodel = require('../model/studentmodel');
var subjectmodel = require('../model/subjectmodel');
var questionmodel = require('../model/questionmodel');
var ansmodel = require('../model/answermodel');
var jwt = require('jsonwebtoken');
const answermodel = require('../model/answermodel');
const storage = require('node-persist');

//****************** admin ****************** */

exports.insert = async (req, res) => {
    var data = await adminmodel.create(req.body);
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.select = async (req, res) => {
    var data = await adminmodel.find();
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.login = async (req, res) => {
    var email = req.body.email;

    var data = await adminmodel.find({ email: email });
    if (data.length > 0) {
        if (data[0].password === req.body.password) {
            res.status(200).json({
                status: 'success',

            })
        }
        else {
            res.status(400).json({
                status: 'please check email and password',

            })
        }
    }
    else {
        res.status(400).json({
            status: 'please check email and password',

        })
    }

}

//****************** subject ****************** */

exports.subject_insert = async (req, res) => {
    var data = await subjectmodel.create(req.body);
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.subject_update = async (req, res) => {
    var id = req.params.id;
    var data = await subjectmodel.findByIdAndUpdate(id, req.body);
    res.status(200).json({
        status: 'update',
        data
    })
}
exports.subject_delete = async (req, res) => {
    var id = req.params.id;
    var data = await subjectmodel.findByIdAndDelete(id);
    res.status(200).json({
        status: 'delete'
    })
}

//****************** questions ****************** */

exports.question_insert = async (req, res) => {
    var data = await questionmodel.create(req.body);

    res.status(200).json({
        status: 'success',
        data
    })
}
exports.question_select = async (req, res) => {
    var data = await questionmodel.find().populate('sub_id');
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.question_update = async (req, res) => {
    var id = req.params.id;
    var data = await questionmodel.findByIdAndUpdate(id, req.body).populate('sub_id');
    res.status(200).json({
        status: 'update',
        data
    })
}
exports.question_delete = async (req, res) => {
    var id = req.params.id;
    var data = await questionmodel.findByIdAndDelete(id).populate('sub_id');
    res.status(200).json({
        status: 'delete'
    })
}
exports.question_pagination = async (req, res) => {

    var page_no = req.query.page_no;
    var limit = 2;
    var d = await questionmodel.find().count();

    var tp = Math.ceil(d / limit);
    if (page_no < 0 || page_no > tp || page_no == 0) {
        page_no = 1;
    }
    var skip = (page_no - 1) * limit;

    var data = await questionmodel.find().populate('sub_id').limit(limit).skip(skip);
    res.status(200).json({
        status: 'success',
        data,
        page_no,
        total_page: tp

    })
}


//****************** student api ****************** */
exports.student_insert = async (req, res) => {

    var data = await studentmodel.create(req.body);
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.student_select = async (req, res) => {
    var data = await studentmodel.find();
    res.status(200).json({
        status: 'success',
        data
    })
}
exports.student_login = async (req, res) => {
    var email = req.body.email;
    var data = await studentmodel.find({ email: email });

    await storage.init();
    var user_id = await storage.getItem('id');

    if (user_id == undefined) {
        if (data.length > 0) {
            if (data[0].password === req.body.password) {
                await storage.init();
                var login = await storage.getItem('login')|| 0;
                await storage.setItem('id', data[0].id);
                await storage.setItem('login',++login);
                var token = jwt.sign({ id: data[0].id }, 'mehul');

                res.status(200).json({
                    status: 'success',
                    token

                })
            }
            else {
                res.status(400).json({
                    status: 'please check email and password',

                })
            }
        }
        else {
            res.status(400).json({
                status: 'please check email and password',

            })
        }
    }
    else {
        res.status(400).json({
            status: 'User already exists'
        })
    }
}

exports.view_subject = async (req, res) => {
    var data = await subjectmodel.find();
    res.status(200).json({
        status: 'success',
        data
    })
}

exports.exam_question = async (req, res) => {
    var id = req.params.id;
    var page_no = req.query.page_no;
    var limit = 2;
    // var d = await questionmodel.find().count().populate('sub_id');
    var d = await questionmodel.countDocuments({ sub_id: id });

    var tp = Math.ceil(d / limit);
    if (page_no < 0 || page_no > tp || page_no == 0) {
        page_no = 1;
    }
    var skip = (page_no - 1) * limit;

    var data = await questionmodel.find({ sub_id: id }).populate('sub_id').limit(limit).skip(skip);
    res.status(200).json({
        status: 'success',
        data,
        Total_data: d,
        page_no,
        total_page: tp
    })
}

// exports.ans = async (req, res) => {
//     var id = req.params.id;
//     var ans = req.body.ans;
//     var data = await questionmodel.findById(id);
   
//     if (data.ans == ans) {
//         await storage.init();
//         await storage.setItem('score', score++);
//         res.status(200).json({

//             status: 'Your answers is correct'

//         })
        
//     }
//     else {
//         res.status(400).json({
//             status: 'Your answers is incorrect'
//         })
//     }await storage.init();
//         var score = await storage.getItem('score');
//         console.log(score)
// }
exports.ans = async (req, res) => {
    var id = req.params.id;
    var ans = req.body.ans;
    var data = await questionmodel.findById(id);

    if (data.ans == ans) {
        await storage.init();
        var score = await storage.getItem('score') || 0;
        await storage.setItem('score', ++score); 
        console.log(score)
        res.status(200).json({
            status: 'Your answer is correct'
        });
    } else {
        res.status(400).json({
            status: 'Your answer is incorrect'
        });
    }
}
exports.score = async(req, res) => {
    await storage.init();
    var score = await storage.getItem('score')  || 0;

    res.status(200).json({
        status:"Your score",
        score
    })

}
exports.login_counter = async(req, res) => {
    await storage.init();
    var login = await storage.getItem('login')  || 0;

    res.status(200).json({
        status:login +" Student gives exam"
    })

}
exports.student_logout = async(req, res) => {
    await storage.init();
    var data = await storage.del('id');
    res.status(200).json({
        status:"Student logout successfully"
    })
}