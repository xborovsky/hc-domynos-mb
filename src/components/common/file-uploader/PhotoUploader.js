import React, { Component } from 'react';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';

import firebase from '../../../util/firebase';

import './PhotoUploader.css';

export default class PhotoUploader extends Component {

    state = {
        isUploading: false,
        progress : 0,
        error : null,
        imageUrl : null
    }

    handleUploadStart = () => {
        this.props.onUploadStart();
        if (this.state.imageUrl) {
            firebase.storage()
                .refFromURL(this.state.imageUrl)
                .delete();
        }

        this.setState({
            isUploading : true,
            progress : 0,
            imageUrl : null
        });
    }

    handleUploadError = err => {
        this.setState({
            isUploading : false,
            error : err
        });
    }

    handleUploadProgress = progress => {
        this.setState({ progress });
    }

    handleUploadSuccess = fileName => {
        this.setState({
            isUploading : false,
            progress : 100
        });

        firebase.storage()
            .ref("players")
            .child(fileName)
            .getDownloadURL()
            .then(url => {
                this.setState({ imageUrl : url });
                this.props.onUploadFinish(url);
            });
    }

    render() {
        const { isUploading, imageUrl, progress } = this.state;

        return (
            <div className="photo-uploader">
                <CustomUploadButton
                    accept="image/*"
                    name="player_image"
                    randomizeFilename
                    storageRef={firebase.storage().ref("players")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onProgress={this.handleUploadProgress}
                    style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, cursor: 'pointer' }}
                >
                    Select your photo
                </CustomUploadButton>
                {
                    isUploading &&
                        <LinearProgress
                            className="progress"
                            variant="determinate"
                            value={progress}
                            color="secondary" />
                }
                {
                    imageUrl &&
                    <Avatar
                        alt="Player"
                        src={imageUrl}
                        className="image" />
                }
            </div>
        );
    }

}

PhotoUploader.propTypes = {
    onUploadStart : PropTypes.func.isRequired,
    onUploadFinish : PropTypes.func.isRequired
}