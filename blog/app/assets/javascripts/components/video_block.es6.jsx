class VideoBlock extends React.Component {

  getInitialState () {
    return {
        visible: false
    };
  }

  onClick () {
    this.setState({visble: true});
  }

  render () {
    var form = (
        <p>
            <label>Vídeo url</label>
            <input type="text" />
        </p>
    );
    return (
        <div className="video-block">
            <video width="640" height="480" controls>
                <source src="{this.props.url}" ></source>
            </video>
        </div>
    );
  }
}

