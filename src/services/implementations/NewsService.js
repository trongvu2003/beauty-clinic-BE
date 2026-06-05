const Parser = require("rss-parser");
const parser = new Parser();

class NewsService {
  async fetchBeautyNews() {
    try {
      const feed = await parser.parseURL(
        "https://vnexpress.net/rss/suc-khoe.rss"
      );

      if (!feed || !feed.items) {
        throw new Error("Không thể lấy dữ liệu từ RSS Feed");
      }

      const formattedNews = feed.items.slice(0, 8).map((item, index) => {
        let imageUrl = "";
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const match = imgRegex.exec(item.content || item.description);
        if (match && match[1]) {
          imageUrl = match[1];
        }
        let cleanExcerpt = item.snippet || item.contentSnippet || "";
        cleanExcerpt = cleanExcerpt.replace(/<\/?[^>]+(>|$)/g, "").trim();
        return {
          id: `vnexpress-${index}`,
          title: item.title,
          excerpt:
            cleanExcerpt ||
            "Cập nhật xu hướng làm đẹp và chăm sóc sức khỏe chuẩn y khoa.",
          url: item.link,
          imageUrl:
            imageUrl ||
            "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800", // Ảnh fallback nếu bài báo không có hình
          publishedAt: item.isoDate || new Date().toISOString(),
          source: "VnExpress",
        };
      });

      return formattedNews;
    } catch (error) {
      console.error("Error parsing RSS Feed:", error.message);
      throw new Error("Thất bại khi đồng bộ tin tức làm đẹp từ báo VN.");
    }
  }
}

module.exports = new NewsService();
