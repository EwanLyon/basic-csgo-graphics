import React, { useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import gsap from 'gsap';

import { ComponentAnimation } from '../../../types/animations';
import { stateType } from '../../replicant-store';

const PlayersAliveContainer = styled.div`
	color: white;
	background: var(--bg-col);
	width: 100px;
	padding: 10px;
`;

const Title = styled.div`
	width: 100%;
	text-align: center;
`;

const DataContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
`;

const Alive = styled.span`
	color: ${(props: StyleProps) => (props.ct ? 'var(--ct-col)' : 'var(--t-col)')};
	font-size: 30px;
	font-weight: bold;
`;

const VS = styled.span`
	font-size: 15px;
`;

interface StyleProps {
	ct?: boolean;
}

interface Props {
	className?: string;
	style?: React.CSSProperties;
}

export const PlayersAlive = React.forwardRef<ComponentAnimation, Props>((props, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const allPlayers = useSelector((state: stateType) => state.allPlayers);
	const swapTeams = useSelector((state: stateType) => state.swapTeams);

	useImperativeHandle(ref, () => ({
		show: () => {
			gsap.to(containerRef.current, { opacity: 1, duration: 1 });
		},
		hide: () => {
			gsap.to(containerRef.current, { opacity: 0, duration: 1 });
		},
	}));

	let tPlayers = 0;
	let ctPlayers = 0;
	allPlayers.forEach((player) => {
		if (player.state.health !== 0) {
			if (player.team === 'T') {
				tPlayers++;
			} else {
				ctPlayers++;
			}
		}
	});

	return (
		<PlayersAliveContainer ref={containerRef} className={props.className} style={props.style}>
			<Title>Players alive</Title>
			<DataContainer>
				<Alive ct={swapTeams}>{swapTeams ? ctPlayers : tPlayers}</Alive>
				<VS>VS</VS>
				<Alive ct={!swapTeams}>{swapTeams ? tPlayers : ctPlayers}</Alive>
			</DataContainer>
		</PlayersAliveContainer>
	);
});
