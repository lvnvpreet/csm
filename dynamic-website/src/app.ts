import "reflect-metadata"
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { AdminController } from './controllers/adminController';
import { PageController } from './controllers/pageController';
import { TemplateController } from './controllers/templateController';
import { AuthController } from './controllers/authController';
import { AppDataSource } from "./config/db"
import { authMiddleware, adminMiddleware } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3000;

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('src/public'));

// Controllers
const adminController = new AdminController();
const pageController = new PageController();
const templateController = new TemplateController();
const authController = new AuthController();

// Auth routes
app.get('/login', (req, res) => res.render('auth/login'));
app.get('/register', (req, res) => res.render('auth/register'));
app.post('/login', authController.login.bind(authController));
app.post('/register', authController.register.bind(authController));
app.get('/logout', authController.logout.bind(authController));

// Protect admin routes
app.use('/admin', authMiddleware, adminMiddleware);

// Admin routes
app.get('/admin/dashboard', adminController.getDashboard.bind(adminController));
app.get('/admin/editor/:id', adminController.getEditor.bind(adminController));
app.post('/admin/update-content', adminController.updateContent.bind(adminController));

// Template routes
app.get('/admin/templates', templateController.getTemplates.bind(templateController));
app.get('/admin/templates/new', templateController.getTemplateEditor.bind(templateController));
app.get('/admin/templates/edit/:id', templateController.getTemplateEditor.bind(templateController));
app.post('/admin/templates/save', templateController.saveTemplate.bind(templateController));

// Public routes
app.get('/page/:slug', pageController.getDynamicPage.bind(pageController));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});