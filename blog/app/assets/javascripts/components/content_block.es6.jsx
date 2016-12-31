class ContentBlock extends React.Component {

  propTypes: {
    contentBlocks: React.PropTypes.array,
  }

  constructor (props) {

    super(props);

    this.state = {
      components: [],
      published: this.props.published || false,
      nextOrder: 0,  // Initialize blocks order on form
    };

    this.handleClick = this.handleClick.bind(this);

    if(this.props.contentBlocks &&
       Object.keys(this.props.contentBlocks).length > 0) {
      this.createComponents();
    }
  }

  createComponents () {

    const objectKeys = Object.keys(this.props.contentBlocks);
    for (let i=0; i < objectKeys.length; i++) {

      const block = this.props.contentBlocks[ objectKeys[i] ];
      const key = Object.keys(block)[0];
      this.addBlock(key, i, block[key]);
    }
  }

  addBlock(blockType, index, value) {

    let component = undefined;
    switch (blockType) {
      case "video":
        component = <VideoBlock
                      key={index}
                      url={value}
                      order={this.state.nextOrder}
                      removeCallback={this.deleteBlock.bind(this, index)}
                      published={this.state.published} />;
        break;
      case "photo":
        component = <PhotoBlock
                      key={index}
                      photo={value}
                      order={this.state.nextOrder}
                      removeCallback={this.deleteBlock.bind(this, index)}
                      published={this.state.published} />;
        break;
      case "paragraph":
        component = <ParagraphBlock
                      key={index}
                      text={value}
                      order={this.state.nextOrder}
                      removeCallback={this.deleteBlock.bind(this, index)}
                      published={this.state.published} />;
        break;
      case "code":
        component = <CodeBlock
                      key={index}
                      code={value}
                      order={this.state.nextOrder}
                      removeCallback={this.deleteBlock.bind(this, index)}
                      published={this.state.published} />;
        break;
      default:
          console.log("Unknown block type");
    }

    this.state.components.push(component);
    this.state.nextOrder++;
  }

  deleteBlock (index) {
      this.state.components.pop(index);
      this.forceUpdate();
  }

  handleClick (event) {

    event.preventDefault();
    event.stopPropagation();

    const blockType = event.currentTarget.className;
    const nBlocks = this.state.components.length;

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
        <ContentBlockList blocks={this.state.components} />
        {this.state.published ? null : listBlocks}
      </section>
    );
  }
}
