import News from '../models/News.js';
import User from '../models/User.js'; 




export const getNews = async (req, res) => {
  try {
    const news = await News.find({}).populate('author_id', 'name');
    res.status(200).json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




export const getNewsBySlug = async (req, res) => {
  try {
    const newsArticle = await News.findOne({ slug: req.params.slug }).populate('author_id', 'name');
    if (!newsArticle) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.status(200).json({ success: true, data: newsArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




export const getNewsById = async (req, res) => {
  try {
    const newsArticle = await News.findById(req.params.id).populate('author_id', 'name');
    if (!newsArticle) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.status(200).json({ success: true, data: newsArticle });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};




export const createNews = async (req, res) => {
  try {
    const { title, slug, content, thumbnail_img, author_id, status } = req.body;

    
    const authorUser = await User.findById(author_id);
    if (!authorUser || authorUser.role !== 'admin') {
      return res.status(400).json({ success: false, message: 'Tác giả phải là người dùng có vai trò admin.' });
    }

    const newNews = new News({
      title,
      slug,
      content,
      thumbnail_img,
      author_id,
      status
    });

    const savedNews = await newNews.save();
    res.status(201).json({ success: true, data: savedNews });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};




export const updateNews = async (req, res) => {
  try {
    const { title, slug, content, thumbnail_img, author_id, status } = req.body;

    
    if (author_id) {
      const authorUser = await User.findById(author_id);
      if (!authorUser || authorUser.role !== 'admin') {
        return res.status(400).json({ success: false, message: 'Tác giả phải là người dùng có vai trò admin.' });
      }
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, slug, content, thumbnail_img, author_id, status },
      { new: true, runValidators: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.status(200).json({ success: true, data: updatedNews });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};



export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.status(200).json({ success: true, message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
