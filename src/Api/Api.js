import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': '738a7b98-0701-4aab-b063-c2ec324fb243'
    },
    baseURL: `https://social-network.samuraijs.com/api/1.0/`
});


export const usersApi = {
    getUsers(currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    }
};

export const authApi = {
    getAuth(){
        return instance.get('auth/me')
            .then(response => response.data);
    },
    login(email, password, rememberMe = false){
        return instance.post('auth/login', {email, password, rememberMe});
    },
    logout(){
        return instance.delete('auth/login');
    }
};

export const followApi = {
    getFollow(id){
        return instance.post(`follow/${id}`, {})
            .then(response => response.data);
    },
    getUnFollow(id){
        return instance.delete(`follow/${id}`)
            .then(response => response.data);
    },
    getStatusFollow(id){
        return instance.get(`follow/${id}`);
    }
};

export const profileApi = {
    getProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, {status: status});
    }
};
