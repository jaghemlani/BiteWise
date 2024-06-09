const bcrypt = require('bcrypt');

const password = "password123";

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log('Password match:', isMatch);
};

hashPassword();
