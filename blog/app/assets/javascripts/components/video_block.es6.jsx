class VideoBlock extends React.Component {

  constructor (props) {
      super(props);

      this.state = {
        published: this.props.published || false,
        value: "",
        videoID: null,
      }

      this.youtube = {
        IMG_URL: "http://img.youtube.com/vi/",
        IMG_QUALITY: "/0.jpg",
        URL_PATTERN: /v=\w{11}/,
        ID_LENGTH: 11,
        YOUTUBE_EMBED_URL: "http://www.youtube.com/embed/",
      }

      if(typeof this.props.url == "string" && this.props.url.length > 0) {

        const videoID = this.getVideoID(this.props.url);

        this.state.value = this.props.url;
        this.state.videoID = videoID;
      }
  }

  getVideoID (url) {

    if(this.youtube.URL_PATTERN.test(url)) {
        return url.split("v=")[1].substring(0, this.youtube.ID_LENGTH);
    }
    return null;
  }

  handleKeyUp (event) {

    const value = event.target.value;
    const videoID = this.getVideoID(value);
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
                   name={"article[blocks][" + this.props.order + "][video]"} />
            <BlockRemove class="video-block-remove" clickHandler={this.props.removeCallback}/>
          </section>
          {image}
        </p>
    );

    const video = (
        <div className="video-block">
            <iframe id="ytplayer" type="text/html" width="800" height="600"
              src={this.youtube.YOUTUBE_EMBED_URL + this.state.videoID}
              frameborder="0" />
        </div>
    );

    if (this.state.published) {
        return video;
    } else {
        return form;
    }
  }
}

