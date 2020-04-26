import React from 'react';

const Profile = () => {

    return (
        <div className='content'> 
            <img className='poster' src='https://www.elsetge.cat/myimg/f/55-558384_mountains-wallpapers-high-resolution-yosemite-desktop-background.jpg' />

            <div className='profil-info'>
                <img className='avatar' src='https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png' />
                <div className='description'>
                    <h3 className='myname'>Olexander Ivashenko</h3>
                </div>
            </div>

            <div className='posts'>
                <div>
                    New post
                </div>
                <div>
                    post 1
                </div>
                <div>
                    post 2
                </div>
            </div>



        </div>
    );
};

export default Profile;
