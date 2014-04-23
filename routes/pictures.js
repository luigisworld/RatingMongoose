//mongoose creates the database if doesn't exist
var mongoose = require('mongoose'),
	db = mongoose.createConnection('mongodb://localhost/picturedb');

//by using Picture we can manipulate our collection	
var pictureSchema = require('../models/picture'),
	Picture = db.model('Picture', pictureSchema);
	
db.on('error', console.error);
//the database is populated if is empty
db.once('open', function() {
	//Model.find(query, fields, options, callback)
	Picture.find({}, function(err, pictures){//=findAll pictures
		if(pictures.length==0){
			var picture;
			for(i=1; i<13; i++){
				//Populating the database using mongoose
				//1.creating picture
				picture = new Picture(
				{
					"img":"img"+i+".jpg",
					"pointsByIP":[]
				});
				//2.saving picture in the database
				picture.save(function (err) {
					if(err)
						console.log(err);
				});
			}
		}
	});
	
});

//retrieving all pictures and modify pointsByIP attribute before send it
exports.findAll = function(req, res) {
	//getting user's IP
	var ip = req.ips.length>0? req.ips[0] : req.ip;

	Picture.find({}, function (err, pictures) {//=findAll
		if (err) return handleError(err);
		
		pictures.forEach(function(entry){
			//this array will replace the current pointsByIP
			var arrayPoints = [];
			//first element contains the punctuation
			arrayPoints.push(entry.pointsByIP.length);
			//second element contains 1 if user's IP is in the array or 0 if is not
			arrayPoints.push((entry.pointsByIP.indexOf(ip) > -1)?1:0);
			
			entry.setPointsByIP(arrayPoints);
		});
		
		//sending modified pictures
		res.send(JSON.stringify(pictures));
	});
};

exports.updatePicture = function(req, res) {
    var id = req.params.id;
	//getting user's IP
	var ip = req.ips.length>0? req.ips[0] : req.ip;
	
	//adding new IP in pointsByIP array
	Picture.update({'_id':mongoose.Types.ObjectId(id)}, {$push:{pointsByIP:ip}}, function(err, picture){
		res.redirect('/pictures');
	});
}
 
