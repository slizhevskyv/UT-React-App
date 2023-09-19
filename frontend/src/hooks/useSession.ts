import { useState } from 'react';
import Cookies from 'js-cookie';
import { Cookie } from '../enums';

const useSession = () => {
	const sessionIdCookie = Cookies.get(Cookie.SessionId);
	const [isSessionActive] = useState(!!sessionIdCookie);

	return isSessionActive;
};
export default useSession;
