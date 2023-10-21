import clsx from 'clsx';
import React from 'react';

import { Spin, type SpinProps } from 'antd';

// Icons
import { AiOutlineLoading } from 'react-icons/ai';

interface SpinnerConfig extends SpinProps {
	color?: string;
}

const Spinner = ({
	color = '#fff',
	size = 'small',
	...props
}: SpinnerConfig) => {
	return (
		<Spin
			size={size}
			{...props}
			indicator={
				<AiOutlineLoading
					size={size}
					className={clsx(
						'animate-spin',
						color.startsWith('#') ? `text-[${color}]` : `text-${color}`
					)}
				/>
			}
		/>
	);
};

export default Spinner;
