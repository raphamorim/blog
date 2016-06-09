class ContentBlock extends React.Component {

  propTypes: {
    contentBlocks: React.PropTypes.array
  }

  constructor () {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {

    event.preventDefault();
    event.stopPropagation();

    const blockType = event.currentTarget.parentNode.className;
    console.log(blockType);

    const nBlocks = this.PropTypes.contentBlocks.size;
    switch (blockType) {
      case "video":
          this.props.contentBlocks.push(<VideoBlock key={nBlocks}/>);
          break;
      default:
          console.log("Unknown block type");
    }
    this.setState({});
  }

  render () {
    return (
      <section className="content-blocks">
        <ContentBlockList blocks={this.props.contentBlocks} />
        <div className="article-content-type" >
          <ul>
            <li className="video"><a href="#" onClick={this.handleClick}></a></li>
            <li className="photo"><a href="#" onClick={this.handleClick}></a></li>
            <li className="code"><a href="#" onClick={this.handleClick}></a></li>
            <li className="paragraph"><a href="#" onClick={this.handleClick}></a></li>
          </ul>
        </div>
      </section>
    );
  }
}

ContentBlock.propTypes = {
  contentType: React.PropTypes.array
};
