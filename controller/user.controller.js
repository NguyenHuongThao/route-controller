var db = require('../db');
var shortid = require('shortid');

module.exports.index =  function(req, res) {
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	//biến q là biến tìm kiếm trên tool khi đc req
	var matchedUsers = db.get('users').value().filter(function(user){
		//biến matchesUsers là những giá trị được lọc trong tất cả các users 
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		// trả về giá trị name những user phù hợp với q(k phân biệt viết hoa viết thường)
	});
	res.render( 'users/index',{
		users: matchedUsers
	});
};

module.exports.create = function(req, res){
	res.render('users/create')
};

module.exports.get = function(req, res){
	var id= req.params.id;

	var user = db.get('users').find({ id: id}).value();
	res.render ('users/view',{
		user: user
	}) 
};

module.exports.postCreate = function(req,res){
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	//post lưu trữ thông tin ng dùng gửi lên
	//redirect đưa ng dùng về trang index với những data đã update
	if (!req.body.name) {
		errors.push('name is required.');
	}
	if (!req.body.phone) {
		errors.push('phone is required.');
	}
	if (errors.length) {
		res.render('user/create', {
			errors: errors
			value: req.body
		});
		return;
	}
	res.redirect('/users');
};