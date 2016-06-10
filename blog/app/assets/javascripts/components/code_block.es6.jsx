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
      <p>
        <label>Source Code</label>
        <textarea rows="5" columns="60"></textarea>
      </p>
    );

    const source = (
        <pre>{this.props.source}</pre>
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
