class VideoBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false
      }
  }

  render () {
    var form = (
        <p>
            <label>Vídeo url</label>
            <input type="text" />
        </p>
    );

    var video = (
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

