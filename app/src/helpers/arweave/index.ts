import type {
	BasicDetailsState,
	CertificateState,
	VerificationState,
} from '~/stores/create-certificate';

type Metadata = Omit<
	BasicDetailsState & CertificateState & VerificationState,
	'certificate' | 'setVerificationConfig'
>;

export const getMetadata = async (manifestId: string) => {
	try {
		const res = await fetch(
			`https://gateway.irys.xyz/${manifestId}/metadata.json`
		);
		const json = (await res.json()) as Metadata;
		return json;
	} catch (error) {
		console.error(error);
		return null;
	}
};
