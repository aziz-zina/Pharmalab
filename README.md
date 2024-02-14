# Project Name: PharmaLab

[![Owner](https://img.shields.io/badge/owner-aziz--zina-blue)](https://github.com/aziz-zina)
[![Admin](https://img.shields.io/badge/admin-aziz--zina-red)](https://github.com/aziz-zina)
[![Open issues](https://img.shields.io/github/issues/aziz-zina/Pharmalab)](https://github.com/aziz-zina/Pharmalab/issues)
[![Analytics](https://img.shields.io/badge/analytics-ossinsight-red)](https://ossinsight.io/analyze/aziz-zina/aziz-zina)
[![Views](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Faziz-zina%2Faziz-zina&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

<br>


## Project 🌐 Overview:

#### 1. Introduction: <br>
  - The culmination of a year dedicated to creating PharmaLab, an innovative web application addressing fragmented processes in pharmaceutical management. <br>

#### 2. Problem Statement: <br>
  - Fragmented processes and direct communication hinder efficiency in pharmaceutical product management. <br>

#### 3. Solution: <br>
  - <b>PharmaLab</b>: A web application automating product management to centralize operations, improve efficiency, and enhance security. <br>

<br>

## Project Features 🚀:

#### Authentication and Authorization:
  - [x] Secure user registration and login.
  - [X] Defined roles and permissions for pharmacies, laboratories, and administrators.

#### Profile Management:
  - [X] User profile creation and management (contact information, address, etc.).
  - [X] Laboratories can submit information, including products and pricing.

#### Product Catalog:
  - [X] Comprehensive display of pharmaceutical products.
  - [X] Detailed product information (name, description, ingredients, price, etc.).

#### Order Management:
- [X] Online ordering for pharmacies.

#### Non-Functional Requirements:

  - Security: Ensuring confidentiality and data security.
  - Ease of Use: Intuitive interface and user assistance.
  - Performance: Meeting criteria for response time, throughput, and efficiency for optimal system performance.

<br>

> These features are designed to enhance efficiency, security, and user experience in pharmaceutical product management within PharmaLab.

<br>

## Technologies Used 🛠️:

#### Backend:
| Tool           | Version  | Description                          | Logo |
| -------------- | -------- | ------------------------------------ | ---- |
| Node.js (back) | 1.0.0    | Server-side JavaScript runtime       | <img height="27" src="https://img.shields.io/badge/node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" title="Node.js"> |
| Express        | 4.18.2   | Web application framework for Node.js | <img height="27" src="https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white" alt="Express" title="Express"> |
| MongoDB        | 8.0.0    | NoSQL database                       | <img height="27" src="https://img.shields.io/badge/mongodb-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" title="MongoDB"> |
| JWT            | 9.0.2    | JSON Web Token for authentication    | <img height="27" src="https://img.shields.io/badge/jwt-%232C3E50.svg?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT" title="JWT">  |
| Cypress        | 13.6.1   | End-to-end testing framework         | <img height="27" src="https://img.shields.io/badge/cypress-%23E44D27.svg?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" title="Cypress"> |
| Bcrypt.js      | 2.4.3    | Password hashing library             | -    |

#### Frontend:
| Tool                      | Version  | Description                             | Logo |
| ------------------------- | -------- | --------------------------------------- | ---- |
| Angular (front)           | 15.1.0   | TypeScript-based web application framework | <img height="27" src="https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" title="Angular"> |
| PrimeNG                   | 15.1.1   | Angular UI component library            | <img height="27" src="https://img.shields.io/badge/primeNG-%23323330.svg?style=for-the-badge&logo=angular&logoColor=white" alt="PrimeNG" title="PrimeNG"> |
| Font Awesome              | 4.7.0    | Icon toolkit                            | <img height="27" src="https://img.shields.io/badge/fontawesome-%23004A5F.svg?style=for-the-badge&logo=font-awesome&logoColor=white" alt="FontAwesome" title="FontAwesome"> |
| Cypress                   | 7.3.0    | End-to-end testing framework            | <img height="27" src="https://img.shields.io/badge/cypress-%23E44D27.svg?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress" title="Cypress"> |

#### Additional Libraries 📚:
  - **Cypress Slow Down**: 1.3.1 - Middleware to slow down responses during testing.
  - **PrimeFlex**: 3.3.0 - A lightweight flexbox CSS utility library.
  - **PrimeIcons**: 6.0.1 - Icon library for PrimeNG.


<br>

## Installation 📥 :

Follow these steps to set up and run the PharmaLab project locally: <br>

#### Clone the Repository:
```
git clone https://github.com/your-username/PharmaLab.git
```

#### Install and Set Up the Backend:

1. Navigate to the Backend Directory:
```
cd PharmaLab/back
```

2. Install Backend Dependencies:
```
npm install
```

3. Configure Environment Variables:
  - Create a .env file in the back directory.
  - Set up necessary variables such as database connection details, JWT secret, etc.

  
4. Run the Express Backend:
```
npm start
```

<br>

> The Express backend should be running at http://localhost:your-backend-port.

#### Install and Set Up the Frontend:

1. Navigate to the Frontend Directory:
```
cd PharmaLab/front
```

2. Install Frontend Dependencies:
```
npm install
```

3. Configure Angular Environment::
  - Update configuration files (environment.ts and environment.prod.ts) with backend API URL, etc.

  
4. Run the Angular Frontend:
```
ng serve --open
```

<br>

> The Angular frontend should be running at http://localhost:4200.

> Now, the PharmaLab project is cloned, and both the Express backend and Angular frontend are set up locally. Adjust the instructions based on your project structure and requirements.

<br>

## Usage Guide 📋 :

Follow these steps to make the most of **PharmaLab**:

- **Login**: 🚪 Access your account securely.
- **Dashboard Overview**: 📊 Explore the key information on the dashboard.
- **Profile Management**: 👤 Update your contact information and address.
- **Product Catalog**: 📦 Browse through the comprehensive list of pharmaceutical products.
- **Order Management**: 🛒 Place online orders for products.
- **Admin Features**: 🛠️ Explore additional features if you have administrative privileges.
- **Security**: 🔒 Ensure data security and confidentiality.
- **Performance Metrics**: ⚙️ Check system performance metrics.


<br>

## Contributing 🤝:

We welcome contributions to PharmaLab! Follow these guidelines to get started:

### Coding Standards:
Follow the coding standards and conventions outlined in the <a href="https://github.com/aziz-zina/Pharmalab/blob/main/CONTRIBUTING.md">CONTRIBUTING.md</a> file. <br>
Maintain code readability and consistency.
<br>

### Submitting Pull Requests:

1. Create a New Branch:
```
git checkout -b feature/your-feature-name
```
   
2. Make Changes and Commit:
  - Implement your changes and commit them.
```
git commit -m "Add feature: your-feature-name"
```
   
3. Push Changes to Your Fork:
```
git push origin feature/your-feature-name
```
   
4. Submit a Pull Request:
  - Open a pull request against the **`main`** branch on the <a href="https://github.com/aziz-zina/Pharmalab">PharmaLab GitHub repository</a>.
   
5. Review and Merge:
   - The maintainers will review your pull request, provide feedback, and merge it once approved.

### GitHub Issues:
If you find any issues or have feature requests, please open an issue on the PharmaLab GitHub Issues page.
<br>

> Thank you for contributing to PharmaLab! Your efforts help make this project better.

<br>

## License 📄 :

This project is licensed under the [MIT License](LICENSE.md).

🚀 **Feel free to use, modify, and distribute the codebase. Contributions are welcome!**

[MIT License](https://opensource.org/licenses/MIT)

<br>

## Acknowledgments 🙏 :

I extend my sincere appreciation to the following tools, libraries, and resources that have been instrumental in shaping and enhancing this project:

- <a href="https://nodejs.org/en">Node.js</a>: The JavaScript runtime that powers the server-side of our application.
- <a href="https://expressjs.com/">Express.js</a>: The fast, unopinionated, minimalist web framework for Node.js.
- <a href="https://angular.io/">Angular</a>: The framework empowering the development of our dynamic frontend.
- <a href="https://www.mongodb.com/">MongoDB</a>: The flexible and scalable NoSQL database that stores our data.
- <a href="https://github.com/">GitHub</a>: The platform that facilitates collaborative coding and version control.
- <a href="https://www.cypress.io/">Cypress</a>: The end-to-end testing framework ensuring the reliability of our application.
- <a href="https://primeng.org/">PrimeNG</a>: The UI component library for Angular that enhances the aesthetics and functionality of our user interface.

> These tools and resources have played a crucial role in bringing our vision to fruition. We express our gratitude to the dedicated individuals behind these projects and the broader open-source community. 🙌

<br>

## Contact 📧:
For any questions, issues, or collaboration inquiries related to PharmaLab, feel free to reach out to us:
  - Email: aziz.zina2001@gmail.com
  - GitHub Issues: <a href="https://github.com/aziz-zina/Pharmalab/issues"> PharmaLab GitHub Issues </a>
  - Collaboration: We welcome contributions! Check out our <a href="https://github.com/aziz-zina/Pharmalab/blob/main/CONTRIBUTING.md">Contribution Guidelines</a> for details.


> Connect with us and be a part of enhancing PharmaLab! We appreciate your feedback and contributions.
