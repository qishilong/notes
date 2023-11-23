const mongoose = require("mongoose")

module.exports.getMovies = async ({ start = 0, count = 10, state = "hot" }) => {
  const result = {
    start: ~~start,
    count: ~~count,
    state: state
  }
  try {
    const movieModel = mongoose.model("movies")
    result.total = await movieModel.count({
      state: result.state
    });
    result.rows = await
      movieModel.find({
        state: result.state
      })
        .skip(result.start)
        .limit(result.count)
        .exec()
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("")
      }, 2000)
    })
    return result
  } catch (e) {
    console.log('=============== getMovies 异常: =====================');
    console.log(e);
    console.log('====================================');
  }
}

module.exports.searchMovies = async ({ start = 0, count = 10, title }) => {
  console.log(start, count, title)
  const result = {
    start: ~~start,
    count: ~~count,
  }
  try {
    const movieModel = mongoose.model("movies")
    result.total = await movieModel.count({
      title: {
        $regex: new RegExp(title)
      }
    })
    result.rows = await
      movieModel.find({
        title: {
          $regex: new RegExp(title)
        }
      })
        .skip(result.start)
        .limit(result.count)
        .exec()
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("")
      }, 2000)
    })
    return result
  } catch (e) {
    console.log('=============== getMovies 异常: =====================');
    console.log(e);
    console.log('====================================');
  }
}