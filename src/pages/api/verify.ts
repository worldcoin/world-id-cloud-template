import type { NextApiRequest, NextApiResponse } from "next";
import {
  type IVerifyResponse,
  VerificationLevel,
  verifyCloudProof,
} from "@worldcoin/idkit";

export type VerifyReply = {
  code?: string;
  detail?: string;
};

interface IVerifyRequest {
  proof: {
    nullifier_hash: string;
    merkle_root: string;
    proof: string;
    verification_level: VerificationLevel;
  };
  signal?: string;
}

const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyReply>
) {
  const { proof, signal } = req.body as IVerifyRequest;
  const verifyRes: IVerifyResponse = await verifyCloudProof(proof, app_id, action, signal);
  verifyRes.success
    ? res.status(200).send({ code: "success", detail: "This action verified correctly!" })
    : res.status(400).send({ code: verifyRes.code, detail: verifyRes.detail });
}
