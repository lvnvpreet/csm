import express from 'express';
import bodyParser from 'body-parser';
import { AdminController } from './controllers/adminController';
import { PageController } from './controllers/pageController';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));

// Controllers
const adminController = new AdminController();
const pageController = new PageController();

// Admin routes
app.get('/admin/dashboard', adminController.getDashboard.bind(adminController));
app.get('/admin/editor/:id', adminController.getEditor.bind(adminController));
app.post('/admin/update-content', adminController.updateContent.bind(adminController));

// Public routes
app.get('/page/:slug', pageController.getDynamicPage.bind(pageController));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});