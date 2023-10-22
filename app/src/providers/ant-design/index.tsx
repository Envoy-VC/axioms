import React from 'react';
import { useIsMounted } from 'usehooks-ts';

import { ConfigProvider, theme } from 'antd';

interface Props {
	children: React.ReactNode;
}

const AntDesignConfigProvider = ({ children }: Props) => {
	const [mounted, setMounted] = React.useState<boolean>(false);

	const isMounted = useIsMounted();

	React.useEffect(() => {
		if (isMounted()) {
			setMounted(true);
		}
	}, [isMounted]);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.defaultAlgorithm,
				token: {
					colorPrimary: '#12A588',
				},
			}}
		>
			{mounted && children}
		</ConfigProvider>
	);
};

export default AntDesignConfigProvider;
