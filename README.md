# Lens

> Lens is an social-media MERN Stack application, built with MongoDB, Express.js, React.js, Node.js, Redux, Material UI.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### Installation:

Clone the repo:

```sh
git clone https://github.com/el-sherbini/Lens.git
```

Run terminal command:

```sh
cd client
npm install
```

```sh
cd server
npm install
```

### Enter your Environment Variables in `.env` file in server folder.

```sh
CONNECTION_URL = "YOUR MONGODB CONNECTION URL"
```

### To Run App:

Server:
```sh
cd server
npm satrt
```

Client:
```sh
cd client
npm satrt
```

### To Visit App:

Client:
```sh
localhost:3000
```

Server:
```sh
localhost:5000/posts
```

## Technologies Used

- React.js
- Redux
- Axios
- React-file-base64
- React-google-login
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- validator
- Bcrypt
- Cors

## Features

- Responsive layout
- SignUp & SignIn (Email - GoogleLogin)
- Create new post (any logined user)
- Edit existing post (By it's user)
- like existing post (any logined user)
- Delete existing post (By it's user)
- Posts list
- Posts pagination
- Search for posts (By title - By tags)
- Post page with it's full details
- Add comments (any logined user)
- Recommendation for other related posts
