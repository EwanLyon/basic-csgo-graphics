import React from 'react';

const armourImages = {
	helmet: require('../../images/in-game/icon-armor-helmet-bw-solid.png'),
	normal: require('../../images/in-game/icon-shield-bw-solid.png'),
};

interface Props {
	item: keyof typeof armourImages;
	className?: string;
}

export const Armour: React.FunctionComponent<Props> = (props: Props) => {
	return <img className={props.className} src={armourImages[props.item]} />;
};
