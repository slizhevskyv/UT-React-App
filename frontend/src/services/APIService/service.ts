import axios, { AxiosInstance } from 'axios';
import { Engagement } from '../../enums';
import { APIResponse } from './types/APIResponse';

interface IAPI {
	createUser: () => Promise<{ avatarURL: string }>;
	trackUser: () => Promise<void>;
	trackEngagement: (type: Engagement) => Promise<void>;
	getReport: () => Promise<{ totalUsers: number; engagedUsers: number }>;
	getUser: () => Promise<{ avatarURL: string }>;
	getEngagements: () => Promise<Record<Engagement, boolean> | null>;
}

class API implements IAPI {
	static instance = new API();

	private client: AxiosInstance;
	private readonly apiUrl: string;

	private constructor() {
		if (!process.env.REACT_APP_API_ENDPOINT) {
			throw new Error('REACT_APP_API_ENDPOINT or REACT_APP_API_KEY is missing. Please add them to .env file.');
		}

		this.apiUrl = process.env.REACT_APP_API_ENDPOINT;

		const headers: Record<string, string> = {
			Accept: 'application/json',
		};

		this.client = axios.create({
			baseURL: this.apiUrl,
			headers: headers,
			withCredentials: true,
		});
	}

	async trackEngagement(type: Engagement): Promise<void> {
		try {
			await this.client.post('/tracking/engagements', { type });
		} catch (e) {}
	}

	async trackUser(): Promise<void> {
		try {
			await this.client.post('/tracking/users');
		} catch (e) {}
	}

	async createUser(): Promise<{ avatarURL: string }> {
		try {
			const { data: { data: { avatarURL = '' } = {} } = {} } =
				await this.client.post<APIResponse<{ avatarURL: string }>>('/users');

			return {
				avatarURL,
			};
		} catch (e) {
			return {
				avatarURL: '',
			};
		}
	}

	async getReport(): Promise<{ totalUsers: number; engagedUsers: number }> {
		try {
			const { data: { data: { totalUsers = 0, engagedUsers = 0 } = {} } = {} } =
				await this.client.get<APIResponse<{ totalUsers: number; engagedUsers: number }>>('/tracking/report');

			return {
				totalUsers,
				engagedUsers,
			};
		} catch (e) {
			return {
				totalUsers: 0,
				engagedUsers: 0,
			};
		}
	}

	async getUser(): Promise<{ avatarURL: string }> {
		try {
			const { data: { data: { avatarURL = '' } = {} } = {} } =
				await this.client.get<APIResponse<{ avatarURL: string }>>('/users');

			return {
				avatarURL,
			};
		} catch (e) {
			return {
				avatarURL: '',
			};
		}
	}

	async getEngagements(): Promise<Record<Engagement, boolean> | null> {
		try {
			const {
				data: { data },
			} = await this.client.get<APIResponse<Record<Engagement, boolean>>>('/engagements');

			return data ?? null;
		} catch (e) {
			return null;
		}
	}
}

export default API;
