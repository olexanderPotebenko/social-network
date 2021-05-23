import * as axios from 'axios';

export const host = '78.140.136.124';
export const port = '8080';

const instance = axios.create({
  baseURL: `http://${host}:${port}/`,
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

  /*
    getAvatar (options) {

        let {user_id} = options;
        return instance.get(`profile/${user_id}/avatar`)
            .then(res => {
                debugger;
                return res.data 
            });
    },
    */

  // posts
  getPosts ({user_id, count, page}) {
    return instance.get(`profile/${user_id}/posts/?page=${page}&count=&{count}`)
      .then(res => res.data);
  },
  getLikersPost ({user_id, post_id}) {
    return instance.get(`likers/?user_id=${user_id}&post_id=${post_id}`)
      .then(res => res.data);
  },
  createPost ({id, token, post}) {
    return instance.post(`profile/${id}/posts/`,
      post,
      { headers: {authorize: token, id, 'Content-Type': 'form/multipart'}, }
    )
      .then( res =>  res.data );
  },

  likedPost ({id, token, user_id, post_id}) {
    return instance.post(`profile/${user_id}/posts/${post_id}/like`,
      {},
      { headers: {authorize: token, id}, })
      .then(res => res.data);
  },
  /*
            id: this.props.auth.id,
            user_id: this.props.profile.id,
            token: this.props.auth.token,
            post_id: this.props.post.id,
            */
  // delete
  deletePost ({id, token, post_id}) {
    return instance.delete(`profile/${id}/posts/${post_id}`,
      { headers: {authorize: token, id}, })
      .then(res => {
        console.log(res);
        return {post: {id: post_id}, result_code: 0};
      },
        rej => {
          console.log(rej);
          return {result_code: 1};
        } 
      )
  },
  // put 
  updateProfile ({id, token, formData}) {
    return instance.put(`profile/${id}/update`,
      formData,
      { headers: {authorize: token, id}, })
      .then(res => {
        return res.data;
      });
  },

};

export const authApi = {
  signIn ({email, password}) {

    return instance.post(`signin`, {password, email} )
      .then( res => {
        return res.data });

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

export const messageApi = {
  getDialogs (options) {
    let {id, token} = options
    return instance.get(`messages/${id}/`,
      {
        headers: {authorize: token, id}
      }).then(res => res.data);
  },
  getDialog (options) {
    let {id, token, dialog_id} = options;
    return instance.get(`messages/${id}/dialog/${dialog_id}/`,
      {
        headers: {authorize: token, id}
      }).then(res => res.data);
  },
  deleteDialog (options) {
    let {id, token, dialog_id} = options;
    return instance.delete(`messages/${id}/dialog/${dialog_id}/`,{
      headers: {authorize: token, id}
    }).then(res => res.data);
  },
  sendMessage (options) {
    let {id, token, user_id, message} = options;
    return instance.post(`messages/${id}/send/${user_id}`, 
      {message},
      {
        headers: {authorize: token, id}
      }).then(res => res.data);
  },
  readMessages (options) {
    let {id, token, dialog_id, messages} = options;
    return instance.put(`messages/${id}/read/${dialog_id}`,
      {messages},
      {
        headers: {authorize: token, id}
      }).then(res => res.data);
  }

};

