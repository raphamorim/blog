class ContentBlock extends React.Component {

  propTypes: {
    contentBlocks: React.PropTypes.array,
  }

  constructor (props) {

    super(props);

    this.state = {
      published: this.props.published || false
    };

    this.handleClick = this.handleClick.bind(this);

    if(this.props.contentBlocks.length > 0) {
      this.createComponents();
    }
  }

  createComponents () {

    for (let i=0; i < this.props.contentBlocks.length; i++) {

      const block = this.props.contentBlocks[i];
      const key = Object.keys(blocks)[0];
      this.addBlock(key, i, this.props.contentBlocks[i][key]);
    }
  }

  addBlock(blockType, nBlocks, value) {

    let component = undefined;
    switch (blockType) {
      case "video":
        component = <VideoBlock key={nBlocks} url={value} removeCallback={this.deleteBlock.bind(this, nBlocks)}/>;
        break;
      case "photo":
        component = <PhotoBlock key={nBlocks} removeCallback={this.deleteBlock.bind(this, nBlocks)}/>;
        break;
      case "paragraph":
        component = <ParagraphBlock key={nBlocks} text={value} removeCallback={this.deleteBlock.bind(this, nBlocks)}/>;
        break;
      case "code":
        component = <CodeBlock key={nBlocks} removeCallback={this.deleteBlock.bind(this, nBlocks)}/>;
        break;
      default:
          console.log("Unknown block type");
    }
    this.props.contentBlocks.push(component);
  }

  deleteBlock (index) {
      this.props.contentBlocks.pop(index);
      this.forceUpdate();
  }

  handleClick (event) {

    event.preventDefault();
    event.stopPropagation();

    const blockType = event.currentTarget.className;
    const nBlocks = this.props.contentBlocks.length;

    this.addBlock(blockType, nBlocks);
    this.setState({});
  }

  render () {

    const listBlocks = (
      <div className="article-content-type" >
        <ul>
          <li className="video" onClick={this.handleClick}><a href="#"></a></li>
          <li className="photo" onClick={this.handleClick}><a href="#"></a></li>
          <li className="code" onClick={this.handleClick}><a href="#"></a></li>
          <li className="paragraph" onClick={this.handleClick}><a href="#"></a></li>
        </ul>
      </div>
    );

    return (
      <section className="content-blocks">
        <ContentBlockList blocks={this.props.contentBlocks} />
        {this.state.published ? null : listBlocks}
      </section>
    );
  }
}
