var ContentBlockList = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },

  render: function() {
    return (
      <div className="ContentBlockList">{this.props.items}</div>
    );
  }
});
