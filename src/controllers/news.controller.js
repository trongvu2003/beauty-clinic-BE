const newsService = require("../services/implementations/NewsService");

const getBeautyNews = async (req, res, next) => {
  try {
    const newsData = await newsService.fetchBeautyNews();
    return res.status(200).json({
      success: true,
      data: newsData,
      message: "Lấy tin tức thành công",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBeautyNews,
};
