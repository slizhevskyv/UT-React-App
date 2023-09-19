import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Cookie, Engagement } from '../enums';
import { APIService } from '../services';

const useSession = () => {
	const sessionIdCookie = Cookies.get(Cookie.SessionId);

	const [isSessionValid] = useState(!!sessionIdCookie);
	const [avatarURL, setAvatarURL] = useState<string>('');
	const [trackedEngagements, setTrackedEngagements] = useState<Record<Engagement, boolean> | null>(null);

	useEffect(() => {
		if (!isSessionValid) return;

		(async () => {
			const { avatarURL } = await APIService.instance.getUser();
			const engagements = await APIService.instance.getEngagements();

			setAvatarURL(avatarURL);
			setTrackedEngagements(engagements);
		})();
	}, [setTrackedEngagements, setAvatarURL, isSessionValid]);

	return {
		isSessionValid,
		data: {
			avatarURL,
			trackedEngagements,
		},
		handlers: {
			setAvatarURL,
			setTrackedEngagements,
		},
	};
};
export default useSession;
