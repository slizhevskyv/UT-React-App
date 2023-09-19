import React, { useEffect, useRef } from 'react';
import { Container, Grid } from '@mui/material';
import { LoremIpsumTypography, NavigationBar } from '../../components';
import { APIService } from '../../services';
import { useTrackElement, useSession } from '../../hooks';
import { Engagement } from '../../enums';

const AVATAR_INDEX = 9;
const PARAGRAPH_AMOUNT = 20;

const TrackingView = () => {
	const imageRef = useRef<HTMLImageElement>(null);
	const isAvatarEngagementTracked = useTrackElement(imageRef);
	const {
		isSessionValid,
		data: { avatarURL, trackedEngagements },
		handlers: { setAvatarURL, setTrackedEngagements },
	} = useSession();

	useEffect(() => {
		if (isSessionValid) return;

		async function createUser() {
			const { avatarURL } = await APIService.instance.createUser();

			setAvatarURL(avatarURL);
		}
		async function trackUser() {
			await APIService.instance.trackUser();
		}

		createUser().then(trackUser).catch(console.error);
	}, [isSessionValid, setAvatarURL]);

	useEffect(() => {
		if (!isAvatarEngagementTracked || trackedEngagements?.[Engagement.avatar]) {
			return;
		}
		async function trackAvatarEngagement() {
			await APIService.instance.trackEngagement(Engagement.avatar);

			setTrackedEngagements(prevValue => ({ ...prevValue, [Engagement.avatar]: true }));
		}

		trackAvatarEngagement();
	}, [isAvatarEngagementTracked, trackedEngagements, setTrackedEngagements]);

	return (
		<>
			<NavigationBar />
			<Container>
				<Grid container spacing={2}>
					{Array.from({ length: PARAGRAPH_AMOUNT }).map((_, index) =>
						index === AVATAR_INDEX ? (
							<Grid item key={index}>
								<LoremIpsumTypography />
								<img ref={imageRef} width={300} height={300} alt="avatar_image" src={avatarURL} />
							</Grid>
						) : (
							<Grid item key={index}>
								<LoremIpsumTypography />
							</Grid>
						),
					)}
				</Grid>
			</Container>
		</>
	);
};

export default TrackingView;
