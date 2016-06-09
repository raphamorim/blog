class ContentBlockList extends React.Component {

  propTypes: {
    blocks: React.PropTypes.array
  }

  render () {

    const contentList = this.props.blocks.map(function (component) {

      switch (component.constructor.displayName) {
        case "VideoBlock":
          return <VideoBlock />
          break;
        default:
          console.log("Component not found");
      }
    });

    return (
      <div className="ContentBlockList">
        {contentList}
      </div>
    );
  }
};