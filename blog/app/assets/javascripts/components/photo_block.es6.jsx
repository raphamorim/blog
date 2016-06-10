class PhotoBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false
      }
  }

  render () {
    const form = (
      <p>
        <label>Add photo</label>
        <input type="file" accept="image/*" />
      </p>
    );

    const photo = (
      <p>{this.props.text}</p>
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
