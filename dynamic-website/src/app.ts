import "reflect-metadata"
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressLayouts from 'express-ejs-layouts';
import { AdminController } from './controllers/adminController';
import { PageController } from './controllers/pageController';
import { TemplateController } from './controllers/templateController';
import { AuthController } from './controllers/authController';
import { MediaController } from './controllers/mediaController';
import { AppDataSource } from "./config/db"
import { authMiddleware, adminMiddleware } from './middlewares/authMiddleare';
import { upload } from './config/cloudinary';
import path from 'path';

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

// Configure EJS with layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Controllers
const adminController = new AdminController();
const pageController = new PageController();
const templateController = new TemplateController();
const authController = new AuthController();
const mediaController = new MediaController();

// Auth routes
app.get('/login', (req, res) => res.render('auth/login', { title: 'Login', layout: false }));
app.get('/register', (req, res) => res.render('auth/register', { title: 'Register', layout: false }));
app.post('/login', authController.login.bind(authController));
app.post('/register', authController.register.bind(authController));
app.get('/logout', authController.logout.bind(authController));

// Protect admin routes
app.use('/admin', authMiddleware, adminMiddleware);

// Admin routes
app.get('/admin/dashboard', adminController.getDashboard.bind(adminController));
app.get('/admin/editor/:id', adminController.getContentEditor.bind(adminController));
app.post('/admin/update-content', adminController.updateContent.bind(adminController));

// Content management routes
app.get('/admin/content', authMiddleware, adminMiddleware, adminController.getContentList.bind(adminController));
app.get('/admin/content/new', authMiddleware, adminMiddleware, adminController.getContentEditor.bind(adminController));
app.get('/admin/content/edit/:id', authMiddleware, adminMiddleware, adminController.getContentEditor.bind(adminController));
app.post('/admin/content/save', authMiddleware, adminMiddleware, adminController.saveContent.bind(adminController));
app.post('/admin/content/delete/:id', authMiddleware, adminMiddleware, adminController.deleteContent.bind(adminController));

// Template routes
app.get('/admin/templates', templateController.getTemplates.bind(templateController));
app.get('/admin/templates/new', templateController.getTemplateEditor.bind(templateController));
app.get('/admin/templates/edit/:id', templateController.getTemplateEditor.bind(templateController));
app.post('/admin/templates/save', templateController.saveTemplate.bind(templateController));

// Media routes
app.post('/admin/media/upload', 
    authMiddleware, 
    adminMiddleware, 
    upload.single('file'), 
    mediaController.uploadMedia.bind(mediaController)
);

app.delete('/admin/media/:publicId', 
    authMiddleware, 
    adminMiddleware, 
    mediaController.deleteMedia.bind(mediaController)
);

// Public routes
app.get('/page/:slug', pageController.getDynamicPage.bind(pageController));
app.get('/', (req, res) => res.redirect('/admin/dashboard'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});