var vcard;

exports.create = function(req, res){
	var model = req.app.db.model.User;

	var person = {
		nickname: req.query.nickname,
		name: req.query.tel,
		tel: req.query.name
	};

	var card = new model(person);
	card.save();

	res.end();
};

exports.read = function(req, res){
	var model = req.app.db.model.User;

	var vcard = model.find({}, function(err, vcard) {
		res.send({
			users: vcard
		});
		res.end();
	});
};

exports.readByAge = function(req, res){
	var model = req.app.db.model.User;
	var age = req.params.age;

	var vcard = model.find({ Age: age }, function(err, vcard) {
		res.send({
			users: vcard
		});
		res.end();
	});
};

exports.readByAgeRange = function(req, res){
	var model = req.app.db.model.User;
	var from = parseInt(req.params.from);
	var to = parseInt(req.params.to);

	model.aggregate([
	  { $match: { Age: {$gte: from} } },
	  { $match: { Age: {$lte: to} } }, 
	  { $sort: {Age: 1} }
	])
	.exec(function(err, users) {
		res.send({
			users: users
		});
		res.end();
	});
};

exports.createPost = function(req, res){
	var model = req.app.db.model.Post;
	var uid = '545dc0b2a7678639e78366f1';
	var title = req.query.title;
	var content = req.query.content;

	var post = {
		uid: uid,
		title: title,
		content: content
	};

	var postDocument = new model(post);
	postDocument.save();

	res.send({status: 'OK'});
};


exports.update = function(req, res){
	var nickname = req.params.nickname;

	vcard.forEach(function (entry) {
		if (entry.nickname === nickname) {
			console.log('found!');

			entry.name =  req.query.name;
			entry.tel =  req.query.tel;
		}
	});

	res.end();
};

exports.delete = function(req, res){
	res.end();
};

exports.upload = function(req, res) {

    var type = req.params.type;   // 'photo' or 'voice'
    var ext;

    switch (type) {
        case 'photo':
            ext = '.jpg';
            break;
        case 'voice':
            ext = '.mp3';
            break;
    }

    var filename = req.params.nickname + ext;
    var newPath = path.join(__dirname, '../frontend/uploads', filename);

    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var wstream = fs.createWriteStream(newPath);
        file.pipe(wstream);
    });

    req.busboy.on('end', function() {
        res.json({status: 'ok'});
        res.end();
    });
};
