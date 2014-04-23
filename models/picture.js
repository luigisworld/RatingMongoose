var Schema = require('mongoose').Schema;

//our collection contains two attributes and that is what we define
var pictureSchema = new Schema({
	img: String,
	pointsByIP: [String]
});

//classic setter for pointsByIP
pictureSchema.methods.setPointsByIP = function(points){
	this.pointsByIP = points;
}

//exporting the schema
module.exports = pictureSchema;