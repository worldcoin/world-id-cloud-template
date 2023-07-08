import { CredentialType, IDKitWidget } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import type { VerifyReply } from "./api/verify";

export default function Home() {
	const onSuccess = (result: ISuccessResult) => {
		// This is where you should perform frontend actions once a user has been verified, such as redirecting to a new page
		window.alert("Successfully verified with World ID! Your nullifier hash is: " + result.nullifier_hash);
	};

	const handleProof = async (result: ISuccessResult) => {
		console.log("Proof received from IDKit:\n", JSON.stringify(result)); // Log the proof from IDKit to the console for visibility
		const reqBody = {
			merkle_root: result.merkle_root,
			nullifier_hash: result.nullifier_hash,
			proof: result.proof,
			credential_type: result.credential_type,
			action: process.env.NEXT_PUBLIC_WLD_ACTION_NAME,
			signal: "",
		};
		console.log("Sending proof to backend for verification:\n", JSON.stringify(reqBody)) // Log the proof being sent to our backend for visibility
		const res: Response = await fetch("/api/verify", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(reqBody),
		})
		const data: VerifyReply = await res.json()
		if (res.status == 200) {
			console.log("Successful response from backend:\n", data); // Log the response from our backend for visibility
		} else {
			throw new Error(`Error code ${res.status} (${data.code}): ${data.detail}` ?? "Unknown error."); // Throw an error if verification fails
		}
	};

	return (
		<div>
			<div className="flex flex-col items-center justify-center align-middle h-screen">
				<p className="text-2xl mb-5">World ID Cloud Template</p>
				<IDKitWidget
					action={process.env.NEXT_PUBLIC_WLD_ACTION_NAME!}
					app_id={process.env.NEXT_PUBLIC_WLD_APP_ID!}
					onSuccess={onSuccess}
					handleVerify={handleProof}
					credential_types={[CredentialType.Orb, CredentialType.Phone]}
					autoClose
				>
					{({ open }) =>
						<button className="border border-black rounded-md" onClick={open}>
							<div className="mx-3 my-1">Verify with World ID</div>
						</button>
					}
				</IDKitWidget>
			</div>
		</div>
	);
}
