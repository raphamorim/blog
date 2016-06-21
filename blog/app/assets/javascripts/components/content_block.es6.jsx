class ContentBlock extends React.Component {

  propTypes: {
    contentBlocks: React.PropTypes.array,
  }

  constructor (props) {

    super(props);

    this.state = {
      published: false
    };

    this.handleClick = this.handleClick.bind(this);

    if(Object.keys(this.props.blocks).length > 0){
        this.createComponents();
    }
  }

  createComponents () {

    let nBlocks = this.props.contentBlocks.length;
    for (block in this.props.blocks) {

      this.addBlock(block, nBlocks++, this.props.blocks[block]);
    }
    this.state.published = true;
  }

  addBlock(blockType, nBlocks, value) {

    switch (blockType) {
      case "video":
        this.props.contentBlocks.push(<VideoBlock key={nBlocks} url={value}/>);
        break;
      case "photo":
        this.props.contentBlocks.push(<PhotoBlock key={nBlocks} />);
        break;
      case "paragraph":
        this.props.contentBlocks.push(<ParagraphBlock key={nBlocks} text={value}/>);
        break;
      case "code":
        this.props.contentBlocks.push(<CodeBlock key={nBlocks} />);
        break;
      default:
          console.log("Unknown block type");
    }
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
