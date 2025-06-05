# checkInly

**checkInly** is a web-based Listings Management System that enables users to view, create, update, and delete listings (e.g., properties or services) through a web interface. Built with Node.js, Express.js, MongoDB, and EJS, this application provides a user-friendly platform for managing listings efficiently.

## Features

* **User Authentication**: Secure login and registration system.
* **CRUD Operations**: Create, Read, Update, and Delete listings.
* **Responsive Design**: Mobile-friendly interface for seamless user experience.
* **File Uploads**: Support for uploading images associated with listings.
* **Data Validation**: Ensures data integrity with robust validation mechanisms.

## Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **Templating Engine**: EJS
* **Authentication**: Custom session-based authentication
* **File Storage**: Local file system (can be configured for cloud storage)

## Prerequisites

Before running the application, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/) (local or cloud instance)
* [npm](https://www.npmjs.com/) (Node package manager)

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/0xashishtiwari/checkInly.git
   cd checkInly
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   Replace the placeholders with your actual credentials.

4. **Run the Application**

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:8080`.

## Usage

* **Home Page**: View all listings.
* **Dashboard**: Manage your own listings.
* **Create Listing**: Add new listings with images.
* **Edit/Delete Listing**: Modify or remove existing listings.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

