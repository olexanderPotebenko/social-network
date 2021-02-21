import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {Field, reduxForm} from 'redux-form';
import {requiredFields, maxLengthCreator, minLengthOrNothingCreator, emailValidate, phoneNumberValidate} from '../../../utils/validators.js';
import styles from './ProfileInfo.module.css';
import WithAuthData from '../../../hocs/WithAuthData';
import {updateProfile, getProfile} from '../../../reducers/profileReducer';

import {InputImage, Button, ErrorForm} from '../../commons/FormsControls/FormsControls.jsx';
import poster from '../../../assets/images/space.jpg';
import default_avatar from '../../../assets/images/avatar_default.png';
import FetchingToggle from '../../commons/FetchingToggle/FetchingToggle';

let svg = [
  <svg xmlns="http://www.w3.org/2000/svg" class="rubicons pencil-write" width="36" height="36" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none">
    <path d="M3 21h18M12.8889 5.5556l3.5555 3.5555M7.5556 18L20 5.5556 16.4444 2 4 14.4444V18h3.5556z" stroke-linecap="round"></path>
  </svg>,
];

const maxLength30 = maxLengthCreator(30);

const Input2 = ({input, meta, editMode, ...props}) => {

  let input_styles = [styles.input];
  input_styles.push(styles.input2_text);
  input_styles = input_styles.join(' ');

  return <>
    <div className={styles.input2_wrapper}>
      <div className={styles.input_container}>
        {
          editMode
            && <input className={input_styles} {...input} {...props}/>
      || <div className={styles.input2_text} >{input.value}</div>
      }
      </div>
    </div>
  </>
};

class ProfileInfo extends React.Component {

  state = {
    editMode: false,
    isFetching: false,
  }

  changeEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  }

  changeIsFetching = () => {
    this.setState({isFetching: !this.state.isFetching});
  }

  onSubmit = async ({phone, address, age, picture}) => {
    let formData = new FormData();
    if(phone)
      formData.append('phone', phone);
    if(address)
      formData.append('address', address);
    if(age)
      formData.append('age', age);
    if(picture)
      formData.append('image', picture);

    let options = {
      formData,
      id: this.props.auth.id,
      token: this.props.auth.token,
    };

    this.changeIsFetching();
    this.props.updateProfile(options)
      .then(res => {
        this.changeIsFetching();
        this.changeEditMode();
        this.props.changeVisibleModal(false);
        // toto возможно нужно будет удалить 7 строк снизу
        let user_id = this.props.profile.id;
        user_id = user_id;
        let options = {
          user_id,
          id: this.props.auth? this.props.auth.id: '',
          token: this.props.auth? this.props.auth.token: '',
        };
        this.props.getProfile(options);
      });
  }

  render () {
    let avatar_img = this.props.profile.photos.small || default_avatar;
    let save_button = React.createRef();
    let avatar_ref = React.createRef();
    let change_photo_button = React.createRef();
    return (
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          <img ref={avatar_ref} src={avatar_img} />
          {
            this.state.editMode && <div className={styles['change-photo-button']} >
          <button ref={change_photo_button} >
            {svg[0]}
          </button>
        </div>
        }
      </div>

        <ProfileInfoReduxForm onSubmit={this.onSubmit} 
          auth={this.props.auth}
          profile={this.props.profile}
          changeEditMode={this.changeEditMode.bind(this)}
          state={this.state}
          avatar_ref={avatar_ref}
          change_photo_button={change_photo_button}
          editMode={this.state.editMode} save_button={save_button} />
      </div>
    );
  }
};

class ProfileInfoForm extends React.Component {

  render() {

    this.props.editMode || this.props.reset();
    let info = [
      ['name', 'Enter your name', [requiredFields]],
      ['email', 'Enter your email', [requiredFields, emailValidate]],
      ['phone', 'Enter your phone number', [phoneNumberValidate]],
      ['address', 'Enter your address'],
      ['age', 'Enter your age'],
    ];

    info = info
      .filter(item => 
        this.props.editMode || Object.keys(this.props.initialValues).includes(item[0]))
        .map((item, i) => {
          return <li>
            <span className={styles['item-field']}>
              {item[0] + ': '}
            </span>
            <div className={styles['item-data']}>

              <Field name={item[0]} autoFocus={i === 2} 
                validate={item[2]}
                editMode={ item[0] === 'name' || item[0] === 'email'? false: this.props.editMode}
                component={Input2} 
                placeholder={item[1]} />
            </div>

          </li>
        });
    if(this.props.avatar_ref.current){
      this.props.avatar_ref.current.innerHTML = `<img src="" />`;
    }

    return <form onSubmit={this.props.handleSubmit} 
      className={styles['list-info']} autoFocus={true}>
      <ul>
        {info}
        {
          this.props.state.editMode 
            && <Field name="picture" component={InputImage} 
        change_photo_button={this.props.change_photo_button}
        type="file" value={null} avatar_ref={this.props.avatar_ref} />
      }
      </ul>
      {
        this.props.auth.id == this.props.profile.id
          && <div className={styles['buttons-wrapper']}>
      {
        !this.props.state.editMode 
          && <button className={'commons-modal-button'}
      onClick={(e) => {
        e.preventDefault();
        this.props.changeEditMode();
      }
      } >
      CHANGE
    </button>
      || <button name={'submit'} type='submit' 
        disabled={this.props.state.isFetching}
        className={'commons-modal-button'} >
        SAVE
      </button>
      }
      {
        this.props.state.isFetching
          && <div  style={ {float: 'left', 
            height: '35px', width: '35px',
            padding: '5px', 'box-sizing': 'border-box',
            'margin-right': '10px'} } >
      <FetchingToggle background={true} />
                                    </div>
      }
      {
        this.props.state.editMode && 
          <button 
        className={'commons-modal-button' + ' ' 
          + styles['change-info-cancel']}
      onClick={this.props.changeEditMode} >
      CANCEL
                                            </button>
      }
                                        </div>
      }

                                    </form>
  }
};


let ProfileInfoReduxForm = compose(
  connect(
    state => ({
      initialValues: {
        ...state.profilePage.profile,
        ...state.profilePage.profile.info[0],
      }// pull initial values from account reducer
    })
  ),
  reduxForm({form: 'profile-info'}),
)(ProfileInfoForm)

let mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
  }
};

export default compose(
  connect(mapStateToProps, {updateProfile, getProfile}),
  WithAuthData)
(ProfileInfo);
