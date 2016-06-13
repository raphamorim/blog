class BlockRemove extends React.Component {
  render () {
    const className = this.props.class + " block-remove";
    return (
      <span className={className} onClick={this.props.clickHandler}>x</span>
    );
  }
}

BlockRemove.propTypes = {
  class: React.PropTypes.string
};
