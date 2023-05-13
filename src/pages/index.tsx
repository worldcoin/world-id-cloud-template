import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import styles from "../styles/Home.module.css";

export default function Home() {
	const onSuccess = (result: ISuccessResult) => {

		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page

	};

	const handleProof = async (result: ISuccessResult) => {
		const reqBody = {
			merkle_root: result.merkle_root,
			nullifier_hash: result.nullifier_hash,
			proof: result.proof,
			credential_type: result.credential_type,
			action: process.env.WLD_ACTION_NAME,
			signal: "",
		};
		fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		}).then(async (res: Response) => {
			if (res.status == 200) {
				console.log("Successfully verified credential.")
			} else {
				throw new Error("Error: " + (await res.json()).code) ?? "Unknown error.";
			}
		});
	};

	return (
		<div className={styles.container}>
			<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
				<IDKitWidget action={process.env.WLD_ACTION_NAME!} onSuccess={onSuccess} handleVerify={handleProof} app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!} credential_types={[CredentialType.Orb, CredentialType.Phone]}>
					{({ open }) => <button onClick={open}>Verify with World ID</button>}
				</IDKitWidget>
			</div>
		</div>
	);
}
