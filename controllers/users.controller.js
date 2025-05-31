const { sendErrorResponse } = require("../helpers/send_error_response");
const Users = require("../models/users.model");
const bcrypt = require("bcrypt");
const Users_location = require("../models/users_location.model");
const Contract = require("../models/contract.model");
const User_role = require("../models/user-role.model");
const Category = require("../models/category.model");
const Machine = require("../models/machine.models");
const Review = require("../models/review.model");
const Role = require("../models/role.model");
const District = require("../models/district.model");
const Region = require("../models/region.model");
const Image = require("../models/image.models");
const Status = require("../models/status.model");

const sequelize = require("../config/db");
const { fn, col, literal, Op, Sequelize } = require("sequelize");

const add = async (req, res) => {
  try {
    const { full_name, phone, email, password, confirm_password } = req.body;
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      return sendErrorResponse(
        { message: "Bunday foydalanuvchi mavjud" },
        res,
        400
      );
    }
    if (password != confirm_password) {
      return sendErrorResponse({ message: "parollar mos emas" }, res, 400);
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUsers = await Users.create({
      full_name,
      phone,
      email,
      hashed_password,
    });
    res.status(201).send({ message: "New users created!", newUsers });
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getAll = async (req, res) => {
  try {
    const userss = await Users.findAll({
      include: [
        { model: Users_location, attributes: ["name", "address"] },
        { model: Review, attributes: ["rating", "comment"] },
        {
          model: Contract,
          attributes: [
            "id",
            "start_time",
            "end_time",
            "total_price",
            "statusId",
            "userId",
            "machineId",
            "total_time",
          ],
        },
        {
          model: Machine,
          attributes: [
            "id",
            "name",
            "price_per_hour",
            "regionId",
            "districtId",
            "is_available",
          ],
        },
        {
          model: Role,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
      attributes: ["id", "full_name", "phone"],
    });
    res.status(200).send(userss);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const getById = async (req, res) => {
  try {
    let { id } = req.params;
    const userss = await Users.findByPk(id);
    res.status(200).send(userss);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const remove = async (req, res) => {
  try {
    let { id } = req.params;
    const userss = await Users.destroy({ where: { id } });
    res.status(200).send(userss);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const update = async (req, res) => {
  try {
    const userss = await Users.update(
      { ...req.body },
      {
        where: { id: req.params.id },
        returning: true,
      }
    );
    res.status(200).send(userss);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findUsersMachineByTime = async (req, res) => {
  try {
    const { start_time, end_time } = req.body;
    if (!start_time || !end_time) {
      return res
        .status(400)
        .send({ message: "start_time and end_time are required" });
    }

    const users = await Users.findAll({
      include: [
        {
          model: Contract,
          where: {
            start_time: { [Op.gte]: start_time },
            end_time: { [Op.lte]: end_time },
          },
        },
      ],
    });
    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with contracts in time range" });
    }
    res.status(200).send(users);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findUsersByName = async (req, res) => {
  try {
    const { full_name } = req.body;
    if (!full_name) {
      return res.status(400).send({ message: "full_name is required" });
    }

    const users = await Users.findAll({
      include: [
        {
          model: Users,
          where: {
            full_name: { [Op.gte]: full_name },
          },
        },
      ],
    });
    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with contracts in time range" });
    }
    res.status(200).send(users);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

const findUsersByCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ message: "categoryName is required" });
    }

    const users = await Users.findAll({
      include: [
        {
          model: Machine,
          required: true,
          include: [
            {
              model: Category,
              where: {
                name: name,
              },
              required: true,
            },
          ],
        },
      ],
    });

    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found with machines in this category" });
    }

    res.status(200).send(users);
  } catch (error) {
    sendErrorResponse(error, res, 400);
  }
};

//HMW  UYGA VAZIFA✅↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️↘️

//----------------------------------1---------------------------------

const findUsersByRegionDistrict = async (req, res) => {
  try {
    const { region, district } = req.body;

    if (!region || !district) {
      return res
        .status(400)
        .send({ message: "region and district are required" });
    }

    const users = await Users.findAll({
      include: [
        {
          model: Machine,
          required: true,
          include: [
            {
              model: Region,
              where: { name: region },
              required: true,
            },
            {
              model: District,
              where: { name: district },
              required: true,
            },
          ],
        },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).send({
        message: "No users found with machines in this region and district",
      });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    sendErrorResponse(error, res, 400);
  }
};

//------------------------------------2-----------------------------------------

const findUsersWithMachinesHavingMoreThan3Images = async (req, res) => {
  try {
    const users = await sequelize.query(
      `
      SELECT DISTINCT u.*
      FROM users u
      JOIN machine m ON m."userId" = u.id
      JOIN image i ON i."machineId" = m.id
      GROUP BY u.id, m.id
      HAVING COUNT(i.id) > 3
    `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No users found" });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    sendErrorResponse(error, res, 400);
  }
};

// const findUsersWithMachinesHavingMoreThan3Images = async (req, res) => {
//   try {
//     const users = await Users.findAll({
//       include: [
//         {
//           model: Machine,
//           required: true,
//           include: [
//             {
//               model: Image,
//               attributes: [],
//             },
//           ],
//           attributes: {
//             include: [[fn("COUNT", col("machine->image.id")), "imageCount"]],
//           },
//         },
//       ],
//       group: ["users.id", "machine.id"],
//       having: Sequelize.literal(`COUNT(image.id) > 3`),
//     });

//     if (!users || users.length === 0) {
//       return res.status(404).send({ message: "No users found" });
//     }

//     res.status(200).send(users);
//   } catch (error) {
//     console.error("Error:", error);
//     sendErrorResponse(error, res, 400);
//   }
// };

//------------------------------3--------------------------------------

const findUsersStatus = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Contract,
          required: true,
          include: [
            {
              model: Status,
              where: { name: "cancelled" },
              required: true,
            },
          ],
        },
      ],
    });

    if (!users || users.length === 0) {
      return res.status(404).send({ message: "No status found" });
    }

    res.status(200).send(users);
  } catch (error) {
    console.error("Error:", error);
    sendErrorResponse(error, res, 400);
  }
};

module.exports = {
  add,
  getAll,
  getById,
  remove,
  update,
  findUsersMachineByTime,
  findUsersByName,
  findUsersByCategory,
  findUsersByRegionDistrict,
  findUsersWithMachinesHavingMoreThan3Images,
  findUsersStatus,
};

//stackoverflow
