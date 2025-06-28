import { EventEmitter } from "node:events";
import { sendEmail } from "../email/send.email.js";
import { customAlphabet } from "nanoid";
import userModel from "../../DB/model/User.model.js";
import { generateHash } from "../security/hash.js";
import { confirmOTP } from "../email/template/confirm.otp.js";
export const emailEvent=new EventEmitter()
emailEvent.on("sendConfirmEmail",async({email}={})=>{
  const otp=customAlphabet("0123456789",4)()
  const hashOtp=generateHash({plainText:otp})
  const html=confirmOTP({code:otp})
  await userModel.updateOne({email},{OTPForConfirmEmail:hashOtp})
    await sendEmail({to:email,subject:"confirm Email",html})
})

emailEvent.on("emailForActiveProfile",async({email}={})=>{
  const otp=customAlphabet("0123456789",4)()
  const hashOtp=generateHash({plainText:otp})
  const html=confirmOTP({code:otp})
  await userModel.updateOne({email},{reActiveProfileOTP:hashOtp})

  await sendEmail({to:email,subject:"Re-active Profile",html})
})

emailEvent.on("emailForVerifyCode",async({email}={})=>{
  const otp=customAlphabet("0123456789",6)()
  const hashOtp=generateHash({plainText:otp})
  const html=confirmOTP({code:otp})
  console.log(hashOtp);
  await userModel.updateOne({email},{verifyCode:hashOtp})

  await sendEmail({to:email,subject:"reset Password",html})
})

