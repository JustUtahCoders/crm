import { sequelize } from "../DB.js";
import Sequelize, { Sequelize as SequelizeType } from "sequelize";
import bcrypt from "bcryptjs";
import { UserModel } from "../DB/models/user.js";

const { Op } = Sequelize;

export async function findOrCreateLocalUser(email) {
  const users = await sequelize.models.User.findAll({
    where: {
      email: email,
    },
  });

  let localUser = users.length > 0 ? users[0] : null;

  const hashLocalDevPass = await bcrypt.hash("localDevPassword", 5);

  if (!localUser) {
    localUser = await sequelize.models.User.create({
      firstName: "localDevFirstName",
      lastName: "localDevLastName",
      email: email,
      password: hashLocalDevPass,
      googleAuthToken: null,
    });
  }

  return localUser;
}

export async function findOrCreateGoogleUser(profile) {
  const users = await sequelize.models.User.findAll({
    where: {
      googleAuthToken: profile.id,
    },
  });

  let googleUser = users.length > 0 ? users[0] : null;

  let userGoogleEmail = undefined;
  if (profile.emails.length > 0) {
    userGoogleEmail = profile.emails[0].value;
  }

  if (!googleUser) {
    googleUser = await sequelize.models.User.create({
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: userGoogleEmail,
      googleAuthToken: profile.id, // googleAuthToken is not a token, it's a Google id
    });
  }

  return googleUser;
}

export async function findUser(email, password) {
  const hashpass = await bcrypt.hash(password, 5);
  const user = await findUserByEmail(email);

  if (user) {
    const hash = user.get("password");
    const isValid = bcrypt.compareSync(password, `${hash}`);

    return isValid ? user : null;
  } else {
    return null;
  }
}

export async function findUserByEmail(
  email: string
): Promise<UserModel | null> {
  const users = await sequelize.models.User.findAll({
    where: {
      email: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("email")),
        Op.eq,
        email.toLowerCase()
      ),
    },
  });
  return users.length > 0 ? users[0] : null;
}
