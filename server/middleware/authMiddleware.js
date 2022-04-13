import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData; // the data that we want to get from the token itself

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test'); // This is going to give us the data from each specific token (username, id)

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; // sub is google's name for a specific id that differentiate يميز every single google user
      // Basically it's an id that we can differentiate the users with
    }

    next();
  } catch (error) {
    console.log(error);
  }
}

export default auth;