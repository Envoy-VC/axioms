import { WebIrys } from '@irys/sdk';
import type { TaggedFile } from '@irys/sdk/build/cjs/web/upload';
import { providers } from 'ethers';
import React from 'react';

import { env } from '~/env.mjs';
import { useCreateCertificateStore } from '~/stores';
import type {
	BasicCertificateHolder,
	POAPCertificateState,
	POAPHolder,
} from '~/stores/create-certificate';

export interface Tag {
	name: string;
	value: string;
}

const irysConfig = () => {
	if (env.NEXT_PUBLIC_ENV === 'development') {
		return {
			url: 'https://devnet.irys.xyz',
			token: 'matic',
		};
	} else {
		return {
			url: 'https://node1.irys.xyz',
			token: 'matic',
		};
	}
};

const useUploadToArweave = () => {
	const {
		eventName,
		eventDescription,
		eventType,
		holders,
		verificationConfig,
		setArweaveManifestId,
	} = useCreateCertificateStore();
	const certificate = useCreateCertificateStore(
		(state) => (state as POAPCertificateState).certificate
	);

	const [isUploading, setIsUploading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | null>(null);

	const getFiles = () => {
		const defaultTags: Tag[] = [
			{ name: 'App-Name', value: 'Axioms' },
			{ name: 'App-Version', value: '0.1.0' },
			{ name: 'Title', value: eventName },
			{ name: 'Description', value: eventDescription },
			{ name: 'Unix-Time', value: String(Math.round(Date.now() / 1000)) },
		];
		if (certificate) {
			const files: TaggedFile[] = [];
			const certificateFile: TaggedFile = certificate;
			certificateFile.tags = [
				...defaultTags,
				{
					name: 'Content-Type',
					value: certificate.type,
				},
			];

			const metadata = {
				eventName,
				eventDescription,
				eventType,
				holders: holders.map((holder: POAPHolder) => holder),
				verificationConfig,
			};
			// create a new metadata.json file instance  and push to files
			const metadataFile: File = new File(
				[JSON.stringify(metadata)],
				'metadata.json',
				{
					type: 'application/json',
				}
			);
			const metadataFileTagged: TaggedFile = metadataFile;
			metadataFileTagged.tags = [
				...defaultTags,
				{
					name: 'Content-Type',
					value: metadataFile.type,
				},
			];
			files.push(metadataFileTagged);
			files.push(certificateFile);
			return files;
		} else {
			const files: TaggedFile[] = [];

			holders.forEach((holder: BasicCertificateHolder) => {
				if (!holder.certificate) return;
				const certificateFile: TaggedFile = holder.certificate;
				const tagsWithoutsCertificate = Object.entries(holder)
					.map(([key, value]) => {
						if (key !== 'certificate' || typeof value === 'string')
							return { name: key, value };
					})
					.filter((value) => value !== undefined);
				if (!tagsWithoutsCertificate) return;
				certificateFile.tags = [
					...defaultTags,
					...(tagsWithoutsCertificate as Tag[]),
					{
						name: 'Content-Type',
						value: holder.certificate.type,
					},
				];
				files.push(certificateFile);
			});
			const metadata = {
				eventName,
				eventDescription,
				eventType,
				holders: holders.map((holder: BasicCertificateHolder) => {
					const { certificate, ...rest } = holder;
					return rest;
				}),
				verificationConfig,
			};
			const metadataFile: File = new File(
				[JSON.stringify(metadata)],
				'metadata.json',
				{
					type: 'application/json',
				}
			);
			const metadataFileTagged: TaggedFile = metadataFile;
			metadataFileTagged.tags = [
				...defaultTags,
				{
					name: 'Content-Type',
					value: metadataFile.type,
				},
			];
			files.push(metadataFileTagged);
			return files;
		}
	};

	const initialize = async () => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
			await window.ethereum.enable();
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			const provider = new providers.Web3Provider(window.ethereum);
			const wallet = { name: 'ethersv5', provider: provider };
			const { url, token } = irysConfig();
			const webIrys = new WebIrys({ url, token, wallet });
			console.log(webIrys);
			await webIrys.ready();
			return webIrys;
		} catch (error) {
			console.log(error);
		}
	};

	const uploadFiles = async () => {
		try {
			setIsUploading(true);
			const files = getFiles();
			const irys = await initialize();
			if (!irys) return;
			console.log(files);
			const receipt = await irys.uploadFolder(files);
			setArweaveManifestId(receipt.manifestId);
			console.log(
				`Files uploaded. Manifest Id=${receipt.manifestId} Receipt Id=${receipt.id}`
			);
		} catch (error) {
			setError(String(error));
			console.log(error);
		} finally {
			setIsUploading(false);
		}
	};

	return { isUploading, error, uploadFiles, initialize };
};

export default useUploadToArweave;
