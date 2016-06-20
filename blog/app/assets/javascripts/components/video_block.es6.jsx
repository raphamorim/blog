class VideoBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false,
        value: "",
        videoID: undefined,
      }

      this.youtube = {
        IMG_URL: "http://img.youtube.com/vi/",
        IMG_QUALITY: "/0.jpg",
        URL_PATTERN: /v=\w{11}/,
        ID_LENGTH: 11,
      }
  }

  handleKeyUp (event) {

    const value = event.target.value;
    let videoID = undefined;

    if(this.youtube.URL_PATTERN.test(value)) {
        videoID = value.split("v=")[1].substring(0, this.youtube.ID_LENGTH);
    }
    this.setState({value: value, videoID: videoID});
  }

  render () {
    let image = "";
    if(this.state.videoID) {
      const videoThumbURL = this.youtube.IMG_URL + this.state.videoID
                            + this.youtube.IMG_QUALITY;
      image = (
        <figure className="video-thumb">
            <img src={videoThumbURL}/>
        </figure>
      );
    }

    const form = (
        <p className="video-block-form">
          <section>
            <label>Video url</label>
            <input type="text"
                   onChange={this.handleKeyUp.bind(this)}
                   value={this.state.value}
                   name="article[blocks][video]"/>
            <BlockRemove class="video-block-remove" clickHandler={this.props.removeCallback}/>
          </section>
          {image}
        </p>
    );

    const video = (
        <div className="video-block">
            <video width="640" height="480" controls>
                <source src="{this.props.url}" ></source>
            </video>
        </div>
    );

    if (this.state.published) {
        return video;
    } else {
        return form;
    }
  }
}

