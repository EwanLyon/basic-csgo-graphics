/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import Twemoji from 'react-twemoji';
import Grid from '@material-ui/core/Grid';

import { FitText, Text as FitTextText } from '../../components/fit-text';
import { Armour } from '../../components/armour';
import { ProgressBarBox } from '../../components/progress-bar-box';

const Container = styled(ProgressBarBox)`
	height: 64px;
	width: ${606 + 137}px;
	border: 1px solid ${(props: CT): string => (props.ct ? 'var(--ct-col)' : 'var(--t-col)')};
	border-bottom: 0px;
	box-sizing: border-box;
	background: rgba(0, 0, 0, 0.32);
`;

const ArmourBar = styled(ProgressBarBox)`
	width: 100%;
	height: 12px;
	z-index: 1;
`;

const HealthBarInfo = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: space-between;
	margin-top: ${(props: HealthBarInfoProps): string => (props.nonCenterText ? '0' : '5px')};
	padding-left: 10px;
`;

const PlayerName = styled(FitText)`
	justify-content: flex-start !important;
	color: #fff;
	font-size: 40px;
	line-height: 52px;
	max-width: 400px;
	& > ${FitTextText} {
		transform-origin: left !important;
	}
`;

const HealthArmourRaw = styled.div`
	width: 113px;
	height: 52px;
	display: flex;
	align-items: center;
	color: #fff;
	font-size: 40px;
	font-weight: bold;
	margin: 0 12px;
`;

const ArmourImg = styled(Armour)`
	height: 35px;
	width: auto;
	margin-right: 4px;
`;

const HealthImg = styled.img`
	height: 35px;
	width: auto;
	margin-right: 4px;
`;

const RealNamePlayerName = styled(FitText)`
	font-size: 25px;
	max-width: 400px;
	& > ${FitTextText} {
		transform-origin: left !important;
	}
	justify-content: flex-start !important;
`;

const RealName = styled(FitText)`
	& > ${FitTextText} {
		transform-origin: left !important;
	}
	justify-content: flex-start !important;
`;

const CountryFlagWithRealName = styled(Twemoji)`
	& > .emoji {
		height: 24px;
		margin-right: 7px;
		margin-bottom: -5px;
	}
`;

const CountryFlag = styled(Twemoji)`
	& > .emoji {
		height: 50px;
		margin-right: 7px;
		margin-bottom: -5px;
	}
`;

interface HealthBarInfoProps {
	nonCenterText?: boolean;
}

interface CT {
	ct?: boolean;
}

interface Props {
	health: number;
	armour: number;
	player: string;
	ct?: boolean;
	helmet: boolean;
	nonCenterText?: boolean;
	realName?: string;
	country?: string;
}

export const HealthBar: React.FunctionComponent<Props> = (props: Props) => {
	const HealthBarChildren: React.CSSProperties = {
		display: 'flex',
		flexDirection: 'column',
	};

	// BoxShadow: `inset 0 0 10px ${isCT ? 'var(--ct-col)' : 'var(--t-col)'}`,
	const healthBarColour: React.CSSProperties = {
		background: `linear-gradient(to left, ${props.ct ? 'var(--ct-col)' : 'var(--t-col)'}, ${
			props.ct ? 'var(--ct-col)' : 'var(--t-col)'
		} ${100 - props.health + 5}%) `,
	};

	const ArmourBarStyle: React.CSSProperties = {
		border: `1px solid #fff`,
		boxSizing: 'border-box',
		background: '#fff',
		opacity: props.armour === 0 ? '0' : '1',
	};

	let playerNameElement = <></>;
	if (props.realName) {
		if (props.country) {
			// If both real name and country
			playerNameElement = (
				<Grid container direction="column" justify="space-evenly">
					<RealNamePlayerName text={props.player} />
					<Grid container item alignItems="center">
						<CountryFlagWithRealName options={{ folder: 'svg', ext: '.svg' }}>
							{props.country}
						</CountryFlagWithRealName>
						<RealName text={props.realName} />
					</Grid>
				</Grid>
			);
		} else {
			// If just real name
			playerNameElement = (
				<Grid container direction="column" justify="space-evenly">
					<RealNamePlayerName text={props.player} />
					<RealName text={props.realName} />
				</Grid>
			);
		}
	} else if (props.country) {
		// If no real name but country
		playerNameElement = (
			<Grid container alignItems="center">
				<CountryFlag>{props.country}</CountryFlag>
				<PlayerName text={props.player} />
			</Grid>
		);
	} else {
		// Just name
		playerNameElement = <PlayerName text={props.player} />;
	}

	return (
		<Container
			progressBarStyle={healthBarColour}
			childrenStyle={HealthBarChildren}
			progress={props.health}
			ct={props.ct}>
			<HealthBarInfo nonCenterText={props.nonCenterText}>
				{playerNameElement}
				<div style={{ display: 'flex' }}>
					<HealthArmourRaw>
						{/* Health */}
						<HealthImg src={require('../../images/misc/health.svg')} />
						<span>{props.health}</span>
					</HealthArmourRaw>
					<HealthArmourRaw>
						{/* Armour */}
						<ArmourImg helmet={props.helmet} />
						<span>{props.armour}</span>
					</HealthArmourRaw>
				</div>
			</HealthBarInfo>
			<ArmourBar progress={props.armour} progressBarStyle={ArmourBarStyle} />
		</Container>
	);
};
