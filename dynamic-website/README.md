# dynamic-website/dynamic-website/README.md

# Dynamic Website Project

This project is a dynamic website system that allows users to import a website template and change its content dynamically. The application is built using TypeScript and follows the MVC architecture.

## Project Structure

```
dynamic-website
├── src
│   ├── controllers
│   │   ├── adminController.ts
│   │   └── pageController.ts 
│   ├── models
│   │   ├── content.ts
│   │   └── page.ts
│   ├── services
│   │   └── contentService.ts
│   ├── views
│   │   ├── admin
│   │   │   ├── dashboard.ejs
│   │   │   └── editor.ejs
│   │   ├── layouts
│   │   │   └── main.ejs
│   │   └── pages
│   │       └── dynamic.ejs
│   ├── public
│   │   ├── css
│   │   ├── js
│   │   └── templates
│   └── app.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- Admin dashboard for managing content
- Content editor for updating website content
- Dynamic page rendering based on user input

## Getting Started

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Run the application using `npm start`.

## License

This project is licensed under the MIT License.