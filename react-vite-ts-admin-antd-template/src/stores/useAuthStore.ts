// src/store/useAuthStore.ts
import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { apiClientPublic } from '../libs/axiosClient';

export interface UserInfo {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    active: boolean;
    roles: string[];
    fullName: string;
    access_token: string;
    refresh_token: string;
}

interface AuthState {
    user: UserInfo | null;
    isAuthenticated: boolean;
    login: (email: string, password: string, callback?: () => void) => Promise<void>;
    logout: () => void;
    setUser: (user: UserInfo | null) => void;
    updateTokens: (access_token: string, refresh_token?: string) => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set, get) => ({
                user: null,
                isAuthenticated: false,

                setUser: (user) => {
                    set({ user, isAuthenticated: !!user });
                },

                updateTokens: (access_token, refresh_token) => {
                    const currentUser = get().user;
                    if (currentUser) {
                        set({
                            user: {
                                ...currentUser,
                                access_token,
                                refresh_token: refresh_token ?? currentUser.refresh_token,
                            },
                        });
                    }
                },

                login: async (email, password, callback) => {
                    try {
                        // ✅ gọi đúng API login
                        const resLogin = await apiClientPublic.post('/v1/auth/login', { email, password });

                        if (resLogin.status === 200) {
                            const { accessToken, refreshToken, staff } = resLogin.data.data;

                            // ✅ gọi API get-profile (dùng POST chứ không phải GET)
                            const resProfile = await apiClientPublic.post(
                                '/v1/auth/get-profile',
                                {},
                                { headers: { Authorization: `Bearer ${accessToken}` } }
                            );

                            const userData: UserInfo = {
                                ...resProfile.data.data,
                                access_token: accessToken,
                                refresh_token: refreshToken, // ✅ sửa đúng refreshToken
                            };

                            set({ user: userData, isAuthenticated: true });
                            if (callback) callback();
                        }
                    } catch (err: any) {
                        console.error('Login error:', err.response?.data || err.message);
                        throw err;
                    }
                },

                logout: () => {
                    set({ user: null, isAuthenticated: false });
                    localStorage.removeItem('auth-storage');
                },
            }),
            {
                name: 'auth-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);
