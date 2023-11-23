var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
	id: {
		type: String
	},
	// 电影海报图
	movieImg: {
		type: String
	},
	// 中文名
	title: {
		type: String
	},
	// 原名
	originalTitle: {
		type: String
	},
	// 得分
	average: {
		type: String
	},
	// 星星
	stars: {
		type: String
	},
	// 评分人数
	ratingsCount: {
		type: String
	},
	// 想看人数
	wishCount: {
		type: String
	},
	// 看过人数
	collectCount: {
		type: String
	},

	// 片长
	durations: {
		type: String
	},
	// 影片类型
	genres: {
		type: String
	},
	// 年代
	year: {
		type: String
	},
	// 主演
	casts: {
		type: String
	},
	// 导演
	directors: {
		type: String
	},
	// 简介
	summary: String,
	// 视频
	vd: String,
	imgs: [{
		type: Schema.Types.ObjectId,
		ref: "imgs"
	}],
	state: {
		type: String,
	}
});

mongoose.model("movies", MovieSchema, "movies");