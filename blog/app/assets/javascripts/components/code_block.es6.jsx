class CodeBlock extends React.Component {

  constructor () {
      super();
      this.state = {
        visible: false,
        published: false
      }
  }

  render () {
    const form = (
      <p className="code-block-form">
        <BlockRemove class="code-block-remove" clickHandler={this.props.removeCallback}/>
        <label>Source Code</label>
        <textarea rows="15" cols="80"></textarea>
      </p>
    );

    const source = (
        <pre className="prettyprint linenums">{this.props.source}</pre>
    );

    if(this.state.published) {
        return source;
    } else {
        return form;
    }
  }
}

CodeBlock.propTypes = {
  source: React.PropTypes.string
};
