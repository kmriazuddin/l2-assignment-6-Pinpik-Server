import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";

interface JwtPayloadId extends JwtPayload {
  id: string;
}

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Create Successful!",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginInfo = req.body;
  const result = await UserServices.loginUserIntoDB(loginInfo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login Successful!",
    token: result.accessToken,
    data: result.result,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const userId = (req.user as JwtPayloadId).id;
  const userData = req.body;

  const result = await UserServices.updateUserIntoDB(userId, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Data Update Successful!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserServices.getAllUserFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Users Retrieved Successfully!",
    data: users,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;

  const result = await UserServices.updateUserRole(userId, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Role updated!",
    data: result,
  });
});

const getPremiumUser = catchAsync(async(req,res)=> {
  const stats = await UserServices.getPremiumUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Premium User Retrieved!",
    data: stats,
  });
})

export const UserController = {
  createUser,
  loginUser,
  updateUserProfile,
  getAllUsers,
  updateUserRole,
  getPremiumUser
};
