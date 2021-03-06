import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import gsap from 'gsap';

import { HLAE } from '../../../types/nodecg-csgo-manager';
import { stateType } from '../../replicant-store';
import { KillIcon } from './kill-icon';

const KillContainer = styled.div`
	height: 0;
	font-size: 18px;
	background: var(--bg-col);
	display: flex;
	align-items: center;
	justify-content: flex-end;
	width: fit-content;
	overflow: hidden;
	margin-top: 8px;
`;

const InfoIcon = styled.img`
	margin: 0 4px;
`;

interface Props {
	data: HLAE.PlayerDeath;
}

export const Kill: React.FC<Props> = (props: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const playerDead = useSelector(
		(state: stateType) => state.game.allplayers[props.data.keys.userid.xuid],
	);
	const attacker = useSelector(
		(state: stateType) => state.game.allplayers[props.data.keys.attacker.xuid],
	);
	const assister = useSelector(
		(state: stateType) => state.game.allplayers[props.data.keys.assister.xuid],
	);

	useEffect(() => {
		const tl = gsap.timeline();

		tl.set(containerRef.current, { height: 0, borderWidth: 0 });
		tl.to(containerRef.current, { height: 42, borderWidth: 1, duration: 0.1 });
		tl.to(containerRef.current, { height: 0, borderWidth: 0, duration: 0.3 }, '+=5');
	}, []);

	return (
		<KillContainer ref={containerRef}>
			{props.data.keys.attackerblind ? (
				<InfoIcon src={require('../../images/weapons/blind_kill.svg')} />
			) : (
				<></>
			)}
			<PlayerName name={attacker?.name || 'Test'} team={attacker?.team || 'CT'} />
			{assister ? (
				<>
					<span style={{ color: '#ffffff' }}>+</span>
					{props.data.keys.assistedflash ? (
						<InfoIcon src={require('../../images/grenades/flashbang.svg')} />
					) : (
						<></>
					)}
					<PlayerName name={assister?.name || 'Test'} team={assister?.team || 'CT'} />
				</>
			) : (
				<></>
			)}
			<KillIcon weapon={props.data.keys.weapon} />
			{props.data.keys.noscope ? (
				<InfoIcon src={require('../../images/weapons/noscope.svg')} />
			) : (
				<></>
			)}
			{props.data.keys.thrusmoke ? (
				<InfoIcon src={require('../../images/weapons/smoke_kill.svg')} />
			) : (
				<></>
			)}
			{props.data.keys.penetrated ? (
				<InfoIcon src={require('../../images/weapons/penetrate.svg')} />
			) : (
				<></>
			)}
			{props.data.keys.headshot ? (
				<InfoIcon src={require('../../images/weapons/icon_headshot.svg')} />
			) : (
				<></>
			)}
			<PlayerName name={playerDead?.name || 'Test'} team={playerDead?.team || 'T'} />
		</KillContainer>
	);
};

const Name = styled.span`
	margin: 0 8px;
`;

interface NameProps {
	name: string;
	team: 'CT' | 'T';
}

const PlayerName: React.FC<NameProps> = (props: NameProps) => {
	const fontColour = props.team === 'CT' ? 'var(--ct-col)' : 'var(--t-col)';

	return <Name style={{ color: fontColour }}>{props.name}</Name>;
};
