import type {
	BasicDetailsState,
	CertificateState,
	VerificationState,
} from '~/stores/create-certificate';

export type Metadata = Omit<
	BasicDetailsState & CertificateState & VerificationState,
	'certificate' | 'setVerificationConfig'
>;

interface ManifestResponse {
	manifest: string;
	version: string;
	paths: Record<string, { id: string }>;
}

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

export const getCertificateImage = async (manifestId: string) => {
	try {
		const res = await fetch(`https://gateway.irys.xyz/${manifestId}`);
		const json = (await res.json()) as ManifestResponse;
		const fileNames = Object.keys(json.paths);
		const imageExtensions = ['.png', '.jpg', '.gif', '.jpeg', '.svg'];
		const imageFiles = fileNames.filter((fileName) => {
			if (imageExtensions.some((ext) => fileName.endsWith(ext))) {
				return fileName;
			}
		});
		return imageFiles[0] ?? null;
	} catch (error) {
		console.error(error);
		return null;
	}
};
