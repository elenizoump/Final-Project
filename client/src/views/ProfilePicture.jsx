import React, { Component } from "react";

class ProfilePicture extends Component {
    render() {
        return (
            <main>
                <form action="/profile/photoUpload/{{user._id}}" method="POST" enctype="multipart/form-data">
                    <input type="file" id="file" name="photo" />
                    <button class="btn btn-success custom-file-control">Upload</button>
                </form>
            </main>
        );
    }
}

export default ProfilePicture