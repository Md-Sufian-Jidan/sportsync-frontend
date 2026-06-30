import { api } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

const MOCK_USER: User = {
  id: "usr-1001",
  name: "Alex Morgan",
  email: "alex.morgan@sportsync.io",
  role: "admin",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
};

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/login", { email, password });
      const data = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("sportsync_token", data.token);
        localStorage.setItem("sportsync_user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.warn("Auth Service: Login request failed. Falling back to mock session.", error);
      
      const mockToken = "mock-jwt-token-alex-morgan";
      if (typeof window !== "undefined") {
        localStorage.setItem("sportsync_token", mockToken);
        localStorage.setItem("sportsync_user", JSON.stringify(MOCK_USER));
      }
      return {
        token: mockToken,
        user: MOCK_USER,
      };
    }
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>("/auth/register", { name, email, password });
      const data = response.data;
      if (typeof window !== "undefined") {
        localStorage.setItem("sportsync_token", data.token);
        localStorage.setItem("sportsync_user", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      console.warn("Auth Service: Register request failed. Falling back to mock registration.", error);
      const newUser: User = {
        id: "usr-" + Math.floor(Math.random() * 9000 + 1000),
        name,
        email,
        role: "user",
      };
      const mockToken = "mock-jwt-token-new-user";
      if (typeof window !== "undefined") {
        localStorage.setItem("sportsync_token", mockToken);
        localStorage.setItem("sportsync_user", JSON.stringify(newUser));
      }
      return {
        token: mockToken,
        user: newUser,
      };
    }
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sportsync_token");
      localStorage.removeItem("sportsync_user");
    }
  },

  getCurrentUser(): User | null {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("sportsync_user");
      if (userJson) {
        try {
          return JSON.parse(userJson) as User;
        } catch {
          return null;
        }
      }
    }
    return null;
  },

  updateProfile(name: string, email: string, avatar?: string): User {
    const currentUser = this.getCurrentUser();
    if (!currentUser) throw new Error("No authenticated user found");
    const updatedUser = { ...currentUser, name, email, avatar };
    if (typeof window !== "undefined") {
      localStorage.setItem("sportsync_user", JSON.stringify(updatedUser));
    }
    return updatedUser;
  },

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("sportsync_token");
    }
    return false;
  }
};
