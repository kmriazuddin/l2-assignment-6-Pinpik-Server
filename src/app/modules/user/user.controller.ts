import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.service";

interface JwtPayloadId extends TwtPayload {
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
    const userId = (res.user as JwtPayloadId).id;
    const userData = req.body;

    const result = await UserServices.updateUserIntoDB(userId, userData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User Data Update Successful!",
        data: result
    })
})

export const UserController = {
  createUser,
  loginUser,
  updateUserProfile
};
