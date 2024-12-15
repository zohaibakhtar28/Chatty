import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

import { io } from "socket.io-client"
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,
    socket: null,

    checkAuth: async () => {

        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error);

            set({ authUser: null });

        } finally {
            set({ isCheckingAuth: false });

        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();


        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");
            if (res) {
                set({ authUser: null });
                toast.success("Logged out successfully");
                get().disconnectSocket();
            }

        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in logout", error);
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try {

            const res = await axiosInstance.post("/auth/login", data);
            console.log("res", res);
            set({ authUser: res.data });
            toast.success("Logged in sucessfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
            console.log("Error in login", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");

        } catch (error) {


            console.log("Error in updateProfile", error);
            if (error.response && error.response.status === 413) {
                toast.error("Image size too large.Select upto 1MB.");
                return;
            } else {
                toast.error("Failed to upload image. Please try again.");
            }


        } finally {

            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(BASE_URL, {
            query: {

                userId: authUser._id,
            },
        }
        );
        socket.connect();
        set({ socket: socket });

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds});
        })
    },

    disconnectSocket: () => {

        if (get().socket?.connected) {
            get().socket.disconnect();

        }

    },



}));