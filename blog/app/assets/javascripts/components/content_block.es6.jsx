class ContentBlock extends React.Component {
  render () {
    return (
      <div>
        <div className="article-content-type" >Content Type: {this.props.contentType}</div>
      </div>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
