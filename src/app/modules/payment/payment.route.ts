import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middleware/validation";
import { paymentValidation } from "./payment.validation";
import { createPaymentIntent } from "./payment.controller";

const router = Router();

router.post(
  "/create=payment-intent",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(paymentValidation),
  createPaymentIntent
);

export const paymentRoute = router;
