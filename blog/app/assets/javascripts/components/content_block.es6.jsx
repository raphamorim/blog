class ContentBlock extends React.Component {
  render () {
    return (
      <div>
        <div>Content Type: {this.props.contentType}</div>
      </div>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
