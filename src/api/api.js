import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8080/',
});

export const userApi = {
    getUsers(options) {

        let {id, token, page_size, page_current} = options;
        return instance.get(`users/?page=${page_current}&count=${page_size}`,
            {
                headers:  id ? { authorize: token, id: id }: {} ,
            }).then(res => res.data);
    },
};

export const profileApi = {
    getProfile (options) {

        let {id, token, user_id} = options;
         return instance.get(`profile/${user_id}`,
            {
                headers:  id ? { authorize: token, id: id }: {} ,
            }).then(res => res.data);
    },
};

export const authApi = {
    signIn ({email, password}) {

        return instance.post(`signin`, {password, email} )
            .then( res => res.data );

    },
    signUp ({email, password, first_name, last_name}) {

        return instance.post(`signup`, 
            {email, password, first_name, last_name})
            .then( res => res.data );
    },
};

export const followApi = {
    follow ({token, id, user_id}) {

         return instance.post(`follow/${user_id}`, {},
            { headers: {authorize: token, id} }
         ).then( res => res.data );
    },
    unfollow ({token, id, user_id}) {

         return instance.delete(`follow/${user_id}/`, 
            { headers: {authorize: token, id} }
        ).then( res => res.data );
    },

};

