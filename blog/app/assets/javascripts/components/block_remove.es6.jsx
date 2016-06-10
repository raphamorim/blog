class BlockRemove extends React.Component {
  render () {
    const className = this.props.class + " block-remove";
    return (
      <span className={className}>x</span>
    );
  }
}

BlockRemove.propTypes = {
  class: React.PropTypes.string
};
