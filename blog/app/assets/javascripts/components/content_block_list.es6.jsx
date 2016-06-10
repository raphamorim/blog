class ContentBlockList extends React.Component {

  propTypes: {
    blocks: React.PropTypes.array
  }

  render () {

    return (
      <div className="ContentBlockList">
        {this.props.blocks.map(function (component) {
          return component
        })}
      </div>
    );
  }
};
