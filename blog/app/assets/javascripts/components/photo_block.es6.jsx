class PhotoBlock extends React.Component {

  constructor (props) {
      super(props);

      this.state = {
        visible: false,
        published: this.props.published || false,

        file: undefined,
        imagePreviewURL: undefined,
        imageAlt: undefined,
      }

      if (this.props.path && typeof this.props.path == "string") {
          this.state.imagePreviewURL = this.props.path;
      }
  }

  handleFileChoose (event) {

    let reader = new FileReader();
    let file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewURL: reader.result
      });
    }

    reader.readAsDataURL(file);
  }

  render () {

    let preview = "";
    if(this.state.imagePreviewURL) {
      preview = (
        <figure className="photo-preview">
            <img src={this.state.imagePreviewURL}
                 width="60%"
                 alt={this.state.imageAlt} />
        </figure>
      );
    }

    const form = (
      <p className="photo-block-form">
        <label>Add photo</label>
        <input type="file"
               accept="image/*"
               onChange={this.handleFileChoose.bind(this)}
               name={"article[blocks][" + this.props.order + "][photo]"}/>
        <BlockRemove class="photo-block-remove" clickHandler={this.props.removeCallback}/>
        {preview}
        <input
            type="text"
            name={"article[blocks][" + this.props.order + "][photo][alt]"} />
      </p>
    );

    const photo = (
        <picture className="photo-block-show" >
          <source srcset={this.state.imagePreviewURL} />
          <img
            width="100%"
            src={this.state.imagePreviewURL}
            alt={this.state.imageAlt} />
        </picture>
    );

    if(this.state.published) {
        return photo;
    } else {
        return form;
    }
  }
}

PhotoBlock.propTypes = {
  path: React.PropTypes.string
};
